import {doc, getDoc, setDoc, updateDoc, increment} from 'firebase/firestore';
import {db} from '../firebase';

const USER_ID = "guest_user"; // Should be retrieved from auth

export const saveHighScore = async (score: number, wave: number) => {
  const userRef = doc(db, 'users', USER_ID);
  await setDoc(userRef, { 
    highScore: score, 
    highWave: wave 
  }, {merge: true});
};

export const getHighScore = async () => {
  const userRef = doc(db, 'users', USER_ID);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? {
    score: docSnap.data().highScore || 0,
    wave: docSnap.data().highWave || 1
  } : { score: 0, wave: 1 };
};

export const updateMissionProgress = async (missionId: string, progressIncrement: number) => {
  const missionRef = doc(db, 'users', USER_ID, 'missions', missionId);
  
  // Using Firestore's increment() ensures atomic updates, 
  // even if multiple updates happen while offline.
  await updateDoc(missionRef, {
    current: increment(progressIncrement)
  });
};
