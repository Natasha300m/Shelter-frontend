import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db, userRef } from "../global/config/firebase";
import { Post, Shelter, User } from "./mutations";

const APIGetUser = (id: string) => async () => {
   try {
      const snapshot = await getDoc(userRef(id));
      if (!snapshot.exists()) {
         throw new Error(`User with id "${id}" does not exist.`);
      }
      return snapshot.data() as User;
   } catch (err) {
      console.log(err);
   }
};

const APIGetAllShelters = async (): Promise<Shelter[]> => {
   try {
      const snapshot = await getDocs(collection(db, "shelters"));
      const shelters: Shelter[] = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data()
      })) as Shelter[];
      return shelters;
   } catch (err) {
      console.log("Failed to get shelters:", err);
      return [];
   }
};

const APIGetShelter = (id: string) => async () => {
   try {
      const docRef = doc(db, "shelters", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
         return {
            id: docSnap.id,
            ...docSnap.data()
         } as Shelter;
      } else {
         console.log(`No shelter found with id: ${id}`);
         return null;
      }
   } catch (err) {
      console.log("Failed to get shelter:", err);
      return null;
   }
};

const APIGetAllPosts = async () => {
   try {
      const snapshot = await getDocs(collection(db, "posts"));
      const posts: Post[] = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data()
      })) as Post[];
      return posts;
   } catch (err) {
      console.log("Failed to get posts:", err);
      return [];
   }
};

const APIGetAllNewsItems = async () => {};

export {
   APIGetUser,
   APIGetShelter,
   APIGetAllPosts,
   APIGetAllNewsItems,
   APIGetAllShelters
};
