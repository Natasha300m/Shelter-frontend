import { atom } from "jotai";
import { User } from "../api/mutations";

type CurrentUser = {
   data?: User;
   isPending: boolean;
};

const currentUserAtom = atom<CurrentUser | null>(null);

const getCurrentUserIdFromStorage = () => {
   const currentUserId = localStorage.getItem("currentUserId") || "";
   return currentUserId;
};

const currentUserIdAtom = atom<string>(getCurrentUserIdFromStorage());

export { currentUserAtom, currentUserIdAtom };
