const queryKeys = {
   user: (id: string) => ["currentUser", id],
   posts: ["posts"],
   news: ["news"],
   shelter: (id: string) => ["shelter", id],
   shelters: ["shelters"]
};

export { queryKeys };
