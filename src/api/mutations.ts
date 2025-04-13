// USERS

import { setDoc } from "firebase/firestore";
import { userRef } from "../global/config/firebase";

type User = {
   id: string;
   name: string;
   email: string;
   photoURL: string;
   role?: "VOLUNTEER" | "MANAGER";
   shelterID?: number; // required for manager
   contacts?: string; // markdown required for volunteer
};

const APICreateUser = async (user: User) => {
   try {
      await setDoc(userRef(user.id), user);
      return user.id;
   } catch (err) {
      console.log(err);
   }
};

const APIUpdateUser = async () => {};

// SHELTERS

type Shelter = {
   id: string;
   name: string;
   location: string;
   contacts: string; // markdown
};

const APICreateShelter = async () => {};

// Posts

type Post = {
   id: string;
   imageURL: string;
   title: string;
   description: string; // markdown

   petType: "Cat" | "Dog" | string;
   petAge: "less1" | "more1" | "more2" | "more4";

   needs: "Owner" | "Shelter" | "Rescue"; //interface display: "Шукаємо власника", "Шукаємо притулок", "Шукаємо загубленого улюбленця"

   authorRole: "VOLUNTEER" | "MANAGER";
   shelterID?: number; // required for manager
   userID?: number; // required for volunteer
};

const APICreatePost = async () => {};
const APIUpdatePost = async () => {};

// News

type NewsItem = {
   id: string;
   title: string;
   content: string; //markdown
   shelterID: number;
};

const APICreateNewsItem = async () => {};

export {
   APICreateUser,
   APIUpdateUser,
   APICreateShelter,
   APICreatePost,
   APIUpdatePost,
   APICreateNewsItem
};

export type { User, Shelter, Post, NewsItem };
