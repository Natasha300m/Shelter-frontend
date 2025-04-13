// USERS

import { setDoc, updateDoc } from "firebase/firestore";
import { postRef, shelterRef, userRef } from "../global/config/firebase";

type User = {
   id: string;
   name: string;
   email: string;
   photoURL: string;
   role?: "VOLUNTEER" | "MANAGER";
   shelterID?: string; // required for manager
   contacts?: string; // markdown required for volunteer
};

const APICreateUser = async (user: User) => {
   try {
      await setDoc(userRef(user.id), user);
      return user.id;
   } catch (err) {
      console.log("Failed to create user:", err);
   }
};

const APIUpdateUser = async (partialUser: Partial<User> & { id: string }) => {
   try {
      const { id, ...updateFields } = partialUser;
      await updateDoc(userRef(id), updateFields);
      return id;
   } catch (err) {
      console.log("Failed to update user:", err);
   }
};

// SHELTERS

type Shelter = {
   id: string;
   name: string;
   location: string;
   contacts: string; // markdown
};

const APICreateShelter = async (shelter: Shelter) => {
   try {
      await setDoc(shelterRef(shelter.id), shelter);
      return shelter.id;
   } catch (err) {
      console.log("Failed to create shelter:", err);
   }
};

// Posts

type Post = {
   id: string;
   imageURL?: string;
   title: string;
   description?: string; // markdown

   petType: string;
   petAge: string;

   needs: string; //interface display: "Шукаємо власника", "Шукаємо притулок", "Шукаємо загубленого улюбленця"

   authorRole: "VOLUNTEER" | "MANAGER";
   shelterID?: string; // required for manager
   userID?: string; // required for volunteer
};

const APICreatePost = async (post: Post) => {
   try {
      await setDoc(postRef(post.id), post);
      return post.id;
   } catch (err) {
      console.log("Failed to create shelter:", err);
   }
};
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
