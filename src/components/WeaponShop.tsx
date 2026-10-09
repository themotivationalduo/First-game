import {useState, useEffect} from 'react';
import {db} from '../firebase';
import {doc, getDoc} from 'firebase/firestore';
import {purchaseSkin, equipSkin} from '../services/userService';

const AVAILABLE_SKINS = [
  {id: 'skin1', name: 'Desert Camo', cost: 100},
  {id: 'skin2', name: 'Gold Plated', cost: 500},
];

export const WeaponShop = () => {
  const [currency, setCurrency] = useState(0);
  const [ownedSkins, setOwnedSkins] = useState<string[]>([]);
  const [purchasingSkinId, setPurchasingSkinId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const userRef = doc(db, 'users', 'guest_user');
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        setCurrency(snap.data().currency || 0);
        setOwnedSkins(snap.data().ownedSkins || []);
      }
    };
    loadData();
  }, []);

  const handleEquip = async (skinId: string) => {
    await equipSkin(skinId);
    window.dispatchEvent(new CustomEvent('equipSkin', { detail: { skinId } }));
  };

  const handlePurchase = async (skin: typeof AVAILABLE_SKINS[0]) => {
    if (currency >= skin.cost && !ownedSkins.includes(skin.id)) {
      setPurchasingSkinId(skin.id);
      await purchaseSkin(skin.id, skin.cost);
      setCurrency(prev => prev - skin.cost);
      setOwnedSkins(prev => [...prev, skin.id]);
      setTimeout(() => setPurchasingSkinId(null), 500);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-4">Weapon Skins Shop</h2>
      <p className="mb-2">Currency: {currency}</p>
      {AVAILABLE_SKINS.map(skin => (
        <div key={skin.id} className="flex justify-between p-2 border-b border-gray-700">
          <span>{skin.name} - {skin.cost}</span>
          <div className="flex gap-2">
            <button 
                disabled={ownedSkins.includes(skin.id) || currency < skin.cost || purchasingSkinId === skin.id}
                onClick={() => handlePurchase(skin)}
                className={`bg-blue-500 px-2 py-1 rounded ${purchasingSkinId === skin.id ? 'animate-purchased' : ''}`}
            >
                {purchasingSkinId === skin.id ? 'Purchasing...' : ownedSkins.includes(skin.id) ? 'Owned' : 'Buy'}
            </button>
            {ownedSkins.includes(skin.id) && (
              <button 
                onClick={() => handleEquip(skin.id)}
                className="bg-green-600 px-2 py-1 rounded"
              >
                Equip
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
