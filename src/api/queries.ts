import { collection, getDoc, getDocs } from "firebase/firestore";
import { db, userRef } from "../global/config/firebase";
import { Shelter, User } from "./mutations";

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

const APIGetShelter = async () => {};

const APIGetAllPosts = async () => {};

const APIGetAllNewsItems = async () => {};

export {
   APIGetUser,
   APIGetShelter,
   APIGetAllPosts,
   APIGetAllNewsItems,
   APIGetAllShelters
};
