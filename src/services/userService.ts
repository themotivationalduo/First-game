import {doc, getDoc, setDoc, updateDoc, increment, arrayUnion} from 'firebase/firestore';
import {db} from '../firebase';

const USER_ID = "guest_user"; 

export const getUserProfile = async () => {
  const userRef = doc(db, 'users', USER_ID);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // Initialize profile if it doesn't exist
    const defaultProfile = {
      username: "PlayerOne",
      currency: 0,
      highScore: 0,
      highWave: 1
    };
    await setDoc(userRef, defaultProfile);
    return defaultProfile;
  }
};

export const updateCurrency = async (amount: number) => {
  const userRef = doc(db, 'users', USER_ID);
  await updateDoc(userRef, {
    currency: increment(amount)
  });
};

export const purchaseSkin = async (skinId: string, cost: number) => {
    const userRef = doc(db, 'users', USER_ID);
    // 1. Deduct currency
    await updateDoc(userRef, {
        currency: increment(-cost),
        purchasedSkins: [...(await getUserProfile()).purchasedSkins || [], skinId]
    });
};

export const updateMissionProgress = async (missionId: string, progressIncrement: number) => {
  const missionRef = doc(db, 'users', USER_ID, 'missions', missionId);
  await updateDoc(missionRef, {
    current: increment(progressIncrement)
  });
};

export const seedMissions = async () => {
    const missions = [
        { id: 'kill_50_bots', description: 'Eliminate 50 bots', target: 50, current: 0, reward: 'Tactical Camo' },
        { id: 'survive_10_waves', description: 'Survive 10 waves', target: 10, current: 0, reward: 'Golden Rifle Skin' }
    ];
    
    for (const mission of missions) {
        const missionRef = doc(db, 'users', USER_ID, 'missions', mission.id);
        await setDoc(missionRef, mission, {merge: true});
    }
};

export const equipSkin = async (skinId: string) => {
    const userRef = doc(db, 'users', USER_ID);
    await updateDoc(userRef, {
        equippedSkin: skinId
    });
};
