import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const getSettings = async (userId: string) => {
    const docRef = doc(db, 'users', userId, 'settings', 'userSettings');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    }
    return { graphicsQuality: 'medium', audioVolume: 50 };
};

export const updateSettings = async (userId: string, settings: { graphicsQuality: string, audioVolume: number }) => {
    await setDoc(doc(db, 'users', userId, 'settings', 'userSettings'), settings);
};
