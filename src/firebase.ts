import {initializeApp} from 'firebase/app';
import {getFirestore, enableIndexedDbPersistence} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB7MmOHBdZFgum2egN822zmbex395Ax5lg",
  authDomain: "gen-lang-client-0100622736.firebaseapp.com",
  projectId: "gen-lang-client-0100622736",
  storageBucket: "gen-lang-client-0100622736.firebasestorage.app",
  messagingSenderId: "351182596569",
  appId: "1:351182596569:web:e471bc385b19ab23ff51c8",
  firestoreDatabaseId: "ai-studio-arenastrike3dmob-84382c3a-c38f-4067-8d42-d0b2f602665d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one
    console.warn("Persistence failed: multiple tabs open.");
  } else if (err.code === 'unimplemented') {
    // Browser doesn't support persistence
    console.warn("Persistence not supported by browser.");
  }
});
