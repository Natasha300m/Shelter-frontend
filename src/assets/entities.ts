type User = {
   id: number;
   email: string;
   password: string;
   role: "VOLUNTEER" | "MANAGER";
   shelterID?: number; // required for manager
   contacts?: string; // markdown required for volunteer
};

type Shelter = {
   id: number;
   name: string;
   location: "Kyiv" | "Lviv" | "Odessa" | "Kharkiv" | "Dnipro";
   contacts: string; // markdown
};

type Post = {
   id: number;
   imageURLs: string[];
   title: string;
   description: string; // markdown

   petType: "Cat" | "Dog" | string;
   petAge: "1-" | "1+" | "2+" | "4+";

   needs: "Owner" | "Shelter" | "Rescue"; //interface display: "Шукаємо власника", "Шукаємо притулок", "Шукаємо загубленого улюбленця"

   authorRole: "VOLUNTEER" | "MANAGER";
   shelterID?: number; // required for manager
   userID?: number; // required for volunteer
};

type NewsItem = {
   id: number;
   title: string;
   content: string; //markdown
   shelterID: number;
};
