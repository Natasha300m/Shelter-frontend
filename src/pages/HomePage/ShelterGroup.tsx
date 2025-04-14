import { Separator } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import { Post, Shelter } from "../../api/mutations";
import { PostCard } from "./PostCard";
import { Link } from "react-router";
import { routes } from "../../global/config/routes";

export function ShelterGroup({
   disableTitle,
   id,
   name,
   posts
}: PropsWithChildren & Shelter & { posts: Post[]; disableTitle?: boolean }) {
   const displayPosts = posts.filter((post) => post.shelterID === id);

   if (displayPosts.length === 0) return <></>;

   return (
      <div className="w-full">
         <div className="flex gap-2 items-center">
            {disableTitle ? (
               <h3>Обʼяви</h3>
            ) : (
               <h3 className="flex gap-2 items-center">
                  {name}
                  <Link
                     to={routes.toShelter(id)}
                     className="text-(--gray-10) hover:text-(--gray-12)"
                  >
                     <i className="pi pi-arrow-right" />
                  </Link>
               </h3>
            )}
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
