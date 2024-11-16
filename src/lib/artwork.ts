import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';
import { auth } from './firebase';
import { Artwork } from '../types';

const COLLECTION_NAME = 'artworks';

const checkAuth = () => {
  if (!auth.currentUser) {
    throw new Error('Authentication required');
  }
};

export const addArtwork = async (artwork: Omit<Artwork, 'id'>) => {
  checkAuth();
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...artwork,
      createdAt: new Date().toISOString(),
      userId: auth.currentUser!.uid
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding artwork:', error);
    throw new Error('Failed to add artwork to database');
  }
};

export const getArtworks = async (): Promise<Artwork[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Artwork));
  } catch (error) {
    console.error('Error getting artworks:', error);
    throw new Error('Failed to fetch artworks');
  }
};

export const deleteArtwork = async (id: string) => {
  checkAuth();
  try {
    // Get the artwork data first to get the mediaUrl
    const artworks = await getArtworks();
    const artwork = artworks.find(a => a.id === id);
    
    if (artwork) {
      // Delete the file from Storage
      try {
        const fileRef = ref(storage, new URL(artwork.mediaUrl).pathname);
        await deleteObject(fileRef);
      } catch (error) {
        console.error('Error deleting file from storage:', error);
      }
    }
    
    // Delete the document from Firestore
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting artwork:', error);
    throw new Error('Failed to delete artwork');
  }
};

export const uploadImage = async (file: File) => {
  checkAuth();
  
  // Validate file type
  if (!file.type.match(/^(image|video)\//)) {
    throw new Error('Invalid file type. Only images and videos are allowed.');
  }

  // Validate file size (100MB max)
  const MAX_SIZE = 100 * 1024 * 1024; // 100MB in bytes
  if (file.size > MAX_SIZE) {
    throw new Error('File size exceeds 100MB limit.');
  }

  try {
    // Create a unique filename using timestamp and random string
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${timestamp}_${randomString}.${fileExtension}`;
    
    // Create storage reference
    const storageRef = ref(storage, `artworks/${auth.currentUser!.uid}/${uniqueFileName}`);
    
    // Upload metadata
    const metadata = {
      contentType: file.type,
      customMetadata: {
        originalName: file.name,
        uploadedBy: auth.currentUser!.email || 'unknown',
        uploadedAt: new Date().toISOString()
      }
    };
    
    // Upload file with metadata
    const snapshot = await uploadBytes(storageRef, file, metadata);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    if (error instanceof Error) {
      if (error.message.includes('unauthorized')) {
        throw new Error('Unauthorized. Please check if you are logged in.');
      } else if (error.message.includes('quota')) {
        throw new Error('Storage quota exceeded. Please contact administrator.');
      }
    }
    throw new Error('Failed to upload file. Please try again.');
  }
};