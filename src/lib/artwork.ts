import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting artwork:', error);
    throw error;
  }
};

export const uploadImage = async (file: File) => {
  checkAuth();
  try {
    const storageRef = ref(storage, `artworks/${auth.currentUser!.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};