/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useEffect} from 'react';
import {DailyMissions} from './components/DailyMissions';
import {UserProfile} from './components/UserProfile';
import {WeaponShop} from './components/WeaponShop';
import {seedMissions} from './services/userService';

export default function App() {
  useEffect(() => {
    seedMissions();
  }, []);

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Arena Strike</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UserProfile />
        <DailyMissions />
        <WeaponShop />
      </div>
    </div>
  );
}
