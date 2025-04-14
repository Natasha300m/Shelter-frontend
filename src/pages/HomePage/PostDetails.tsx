import { ScrollArea } from "@radix-ui/themes";
import { Post } from "../../api/mutations";
import { ImageWithLoader } from "../../components/theme/ImageWithLoader";
import Markdown from "react-markdown";
import { AuthorDetails, ShelterDetails } from "./PostCard";

function PostDetails({ post }: { post: Post }) {
   const renderAge = () => {
      if (post.petAge === "less1") return "Менше року";
      if (post.petAge === "more1") return "Більше року";
      if (post.petAge === "more2") return "Більше 2х років";
      if (post.petAge === "more4") return "Більше 4х років";
   };

   const renderNeed = () => {
      if (post.needs === "owner") return "Нового хозяїна";
      if (post.needs === "shelter") return "Притулок";
      if (post.needs === "rescue") return "Порятунку";
   };
   return (
      <>
         <div className="flex gap-4">
            <div>
               {post.imageURL ? (
                  <div className="w-40 aspect-square">
                     <ImageWithLoader src={post.imageURL} />
                  </div>
               ) : (
                  <div className="w-40 h-40 bg-red-100 opacity-60">
                     <ImageWithLoader src="https://i.pinimg.com/736x/55/b2/7b/55b27bbd5670a64a82ebde947095ac0a.jpg" />
                  </div>
               )}
            </div>
            <div>
               <h3>{post.title}</h3>
               <div className="text-(--gray-10)">
                  <p>Вік: {renderAge()}</p>
                  <p>Вид: {post.petType}</p>
                  <p>Потребує: {renderNeed()}</p>
               </div>
            </div>
         </div>
         {post.description && (
            <div className="mt-2 p-2">
               <p className="text-(--gray-10)">Опис</p>
               <ScrollArea className="!h-40 !text-(--gray-11)">
                  <Markdown>{post.description}</Markdown>
               </ScrollArea>
            </div>
         )}
         {post.userID && <AuthorDetails userID={post.userID} />}
         {post.shelterID && <ShelterDetails shelterID={post.shelterID} />}
      </>
   );
}

export { PostDetails };
