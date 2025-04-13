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

type NewsItem = {
   id: number;
   title: string;
   content: string; //markdown
   shelterID: number;
};

// // AUTH:
// /api/login - POST
// /api/registartion - POST
// /api/currentAccount - GET
// api/deleteAccount - DELETE

// // POSTS:
// /api/posts - GET & POST
type PostRequestParams = {
   page?: number;
   petType?: "Dog" | "Cat" | "Neither"; // "Neither" will show pets other than cats and dogs
   petAge?: "1-" | "1+" | "2+" | "4+";
   needs?: "Owner" | "Shelter" | "Rescue";
   shelterID?: number; // Show posts from a specific shelter
   volunteers?: "true" | "false"; //Show posts only from volunteers
};
// Use case example:
// /api/posts?petType=Dog&needs=Owner
// /api/posts?shelterID=3
// /api/posts?petType=Cat&volunteers=true

// /api/posts/1 GET & PUT & DELETE

// // NEWS_ITEMS:
// /api/newsItems - GET & POST
// /api/newsItems/1 GET & PUT & DELETE

// // SHELTERS:
// /api/shelter POST
// /api/shelter/1 GET & DELETE
