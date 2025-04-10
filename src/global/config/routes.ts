const routes = {
   home: "/",

   login: "/login",  // post
   signup: "/signup",  // post
   account: "/account",  // get

   post: "/post/:id",
   toPost: (id: number) => `/post/${id}`,
   createPost: "/create/post",

   news: "/news",
   newsItem: "/news-item/:id",
   toNewsItem: (id: number) => `/news-item/${id}`,
   createNewsItem: "/create/news-item",

   shelter: "/shelter/:id",
   toShelter: (id: number) => `/shelter/${id}`
};

export { routes };
