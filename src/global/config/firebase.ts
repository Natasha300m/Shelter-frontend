import { initializeApp } from "firebase/app";

import { doc, getFirestore } from "firebase/firestore";
import {
   getDownloadURL,
   getStorage,
   ref,
   StorageReference,
   uploadBytes
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 } from "uuid";

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
const postRef = (id: string) => doc(db, "posts", id);
const newsItemRef = (id: string) => doc(db, "newsItems", id);

const uploadFile = (folderRef: StorageReference) => async (file: File) => {
   const id = v4();
   const name = file.name || "unknown";
   const coverRef = ref(folderRef, `${name}-${id}`);
   const result = await uploadBytes(coverRef, file);
   if (result) {
      const uploadedFileUrl = await getDownloadURL(coverRef);
      return uploadedFileUrl;
   }
   return null;
};

const petImagesRef = ref(storage, "petsImages");

const uploadPetImage = uploadFile(petImagesRef);

export {
   db,
   storage,
   auth,
   userRef,
   shelterRef,
   postRef,
   uploadPetImage,
   newsItemRef
};
