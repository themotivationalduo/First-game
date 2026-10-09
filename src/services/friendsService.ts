import { db } from '../firebase';
import { collection, query, where, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

export const searchUsers = async (username: string) => {
    const q = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addFriend = async (userId: string, friendId: string, friendUsername: string) => {
    await setDoc(doc(db, 'users', userId, 'friends', friendId), { username: friendUsername, userId: friendId });
};

export const removeFriend = async (userId: string, friendId: string) => {
    await deleteDoc(doc(db, 'users', userId, 'friends', friendId));
};
