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
    throw error;
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
    throw error;
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
    throw error;
  }
};

export const uploadImage = async (file: File) => {
  checkAuth();
  try {
    // Create a unique filename using timestamp
    const timestamp = new Date().getTime();
    const uniqueFileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `artworks/${auth.currentUser!.uid}/${uniqueFileName}`);
    
    // Upload the file with metadata
    const metadata = {
      contentType: file.type,
      customMetadata: {
        uploadedBy: auth.currentUser!.email || 'unknown',
        uploadedAt: new Date().toISOString()
      }
    };
    
    await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to upload file');
  }
};