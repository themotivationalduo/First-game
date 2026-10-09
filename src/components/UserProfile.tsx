import {useEffect, useState} from 'react';
import {getUserProfile} from '../services/userService';

export const UserProfile = () => {
  const [profile, setProfile] = useState<{username: string, currency: number} | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile();
      setProfile({username: data.username, currency: data.currency});
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-zinc-900 text-white rounded shadow-lg border border-slate-700">
      <h2 className="text-lg font-bold">Profile</h2>
      <p>Username: {profile.username}</p>
      <p>Currency: {profile.currency}</p>
    </div>
  );
};
