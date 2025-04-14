const routes = {
   home: "/",

   login: "/login",
   signup: "/signup",
   account: "/account",

   // post: "/post/:id",
   // toPost: (id: number) => `/post/${id}`,
   createPost: "/create/post",

   news: "/news",
   // newsItem: "/newsItem/:id",
   // toNewsItem: (id: number) => `/newsItem/${id}`,
   createNewsItem: "/create/newsItem",

   shelter: "/shelter/:id",
   toShelter: (id: string) => `/shelter/${id}`
};

export { routes };
