import { Separator } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import { Post, Shelter } from "../../api/mutations";
import { PostCard } from "./PostCard";

export function ShelterGroup({
   id,
   name,
   posts
}: PropsWithChildren & Shelter & { posts: Post[] }) {
   return (
      <div className="w-full">
         <div className="flex gap-2 items-center">
            <h2>{name}</h2>
            <Separator className="!grow" />
         </div>
         <div className="grid325px1fr gap-4 p-4">
            {posts.map((post) => {
               if (post.shelterID === id) return <PostCard {...post} />;
               return <></>;
            })}
         </div>
      </div>
   );
}
