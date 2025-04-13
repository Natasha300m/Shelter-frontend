import { getDoc } from "firebase/firestore";
import { userRef } from "../global/config/firebase";
import { User } from "./mutations";

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

const APIGetShelter = async () => {};

const APIGetAllPosts = async () => {};

const APIGetAllNewsItems = async () => {};

export { APIGetUser, APIGetShelter, APIGetAllPosts, APIGetAllNewsItems };
