import { Button, Card, ScrollArea, Separator, Spinner } from "@radix-ui/themes";
import { ImageWithLoader } from "../../components/theme/ImageWithLoader";
import { Modal } from "../../components/theme/Modal";
import { Post } from "../../api/mutations";
import Markdown from "react-markdown";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../global/config/queryKeys";
import { APIGetShelter, APIGetUser } from "../../api/queries";

export function PostCard(post: Post) {
   const displayDesription = post.description
      ? post.description.slice(0, 40) + "..."
      : undefined;

   const renderAge = () => {
      if (post.petAge === "less1") return "Менше року";
      if (post.petAge === "more1") return "Більше року";
      if (post.petAge === "more2") return "Більше 2х років";
      if (post.petAge === "more4") return "Більше 4х років";
   };
   return (
      <Card>
         <div className="grid gap-2 grid-cols-[2fr_1fr]">
            <div>
               <h3>{post?.title}</h3>

               <p className="text-(--gray-10)">Вік: більше року</p>
               <p className="text-(--gray-10)">{displayDesription}</p>
            </div>
            {post.imageURL && (
               <div className="w-25 aspect-square mt-2">
                  <ImageWithLoader src={post.imageURL} />
               </div>
            )}
         </div>

         <Modal
            trigger={
               <div className="mt-3 flex gap-2">
                  {post.needs === "owner" && <Button>Стати хозяїном</Button>}
                  {post.needs === "shelter" && <Button>Деталі</Button>}
                  {post.needs === "rescue" && <Button>Допомогти</Button>}
                  <Button variant="soft">Деталі</Button>
               </div>
            }
            content={
               <>
                  <div className="flex gap-2">
                     <div>
                        {post.imageURL && (
                           <div className="w-40 aspect-square">
                              <ImageWithLoader src={post.imageURL} />
                           </div>
                        )}
                        <h3 className="mt-2">{post.title}</h3>
                     </div>
                     <div>
                        <ScrollArea className="!h-40">
                           <Markdown>{post.description}</Markdown>
                        </ScrollArea>
                        <div className="text-(--gray-10)">
                           <p>Вік: {renderAge()}</p>
                           <p>Вид: {post.petType}</p>
                        </div>
                     </div>
                  </div>
                  <div>
                     <Separator className="!w-full !my-2" />
                  </div>
                  {post.userID && <AuthorDetails userID={post.userID} />}
                  {post.shelterID && (
                     <ShelterDetails shelterID={post.shelterID} />
                  )}
               </>
            }
         />
      </Card>
   );
}

function AuthorDetails({ userID }: { userID: string }) {
   const { data, isPending } = useQuery({
      queryKey: queryKeys.user(userID),
      queryFn: APIGetUser(userID)
   });
   if (isPending)
      return (
         <div>
            <Spinner size="3" />
         </div>
      );
   if (data)
      return (
         <div className="mt-4">
            <p className="mb-2">Контактна інформація волонтера:</p>
            <Markdown>{data?.contacts}</Markdown>
         </div>
      );
}

function ShelterDetails({ shelterID }: { shelterID: string }) {
   const { data, isPending } = useQuery({
      queryKey: queryKeys.shelter(shelterID),
      queryFn: APIGetShelter(shelterID)
   });

   if (isPending)
      return (
         <div>
            <Spinner size="3" />
         </div>
      );
   if (data)
      return (
         <div className="mt-2">
            <div className="flex gap-2 text-(--gray-10)">
               <p>{data.name}</p>
               <p>Місто: {data.location}</p>
            </div>
            <Markdown>{data?.contacts}</Markdown>
         </div>
      );
}
