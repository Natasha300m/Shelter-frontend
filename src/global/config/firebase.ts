import { initializeApp } from "firebase/app";

import { doc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: import.meta.env.SHELTER_API_KEY,
   authDomain: import.meta.env.SHELTER_AUTH_DOMAIN,
   projectId: import.meta.env.SHELTER_PROJECT_ID,
   storageBucket: import.meta.env.SHELTER_STORAGE_BUCKET,
   messagingSenderId: import.meta.env.SHELTER_MESSAGING_SENDER_ID,
   appId: import.meta.env.OHARA_APP_ID
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

const auth = getAuth(app);

const userRef = (id: string) => doc(db, "users", id);
const shelterRef = (id: string) => doc(db, "shelters", id);

export { db, storage, auth, userRef, shelterRef };
