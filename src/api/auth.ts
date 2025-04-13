import {
   getAdditionalUserInfo,
   GoogleAuthProvider,
   signInWithPopup,
   signOut
} from "firebase/auth";
import { auth } from "../global/config/firebase";
import { APICreateUser, User } from "./mutations";

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
   try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userUnfo: User = {
         id: user.uid,
         name: user.displayName || "",
         email: user.email || "",
         photoURL: user.photoURL || ""
      };
      const { isNewUser } = getAdditionalUserInfo(result) as any;
      if (isNewUser) {
         await APICreateUser(userUnfo);
      }
      return userUnfo;
   } catch (error) {
      console.error("Error signing in with Google", error);
   }
};

const logOut = async () => {
   try {
      await signOut(auth);
   } catch (error) {
      console.error("Error signing in with Google", error);
   }
};

export { signInWithGoogle, logOut };
