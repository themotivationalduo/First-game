import {useEffect, useState} from 'react';
import {db} from '../firebase';
import {collection, onSnapshot} from 'firebase/firestore';
import {updateMissionProgress} from '../services/userService';

interface Mission {
  id: string;
  description: string;
  target: number;
  current: number;
  reward: string;
}

export const DailyMissions = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const userId = "guest_user"; // Should be retrieved from auth

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users', userId, 'missions'), (snapshot) => {
      const missionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Mission));
      setMissions(missionsData);
    });
    return () => unsubscribe();
  }, [userId]);

  const handleUpdateProgress = async (missionId: string) => {
    await updateMissionProgress(userId, missionId, 1);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded">
      <h2 className="text-xl font-bold mb-4">Daily Missions</h2>
      {missions.map(m => (
        <div key={m.id} className="mb-2 flex justify-between items-center">
          <div>
            <p>{m.description} ({m.current}/{m.target})</p>
            <p className="text-sm text-gray-400">Reward: {m.reward}</p>
          </div>
          <button 
            onClick={() => handleUpdateProgress(m.id)}
            className="bg-blue-600 px-2 py-1 rounded text-sm"
          >
            +1
          </button>
        </div>
      ))}
    </div>
  );
};
