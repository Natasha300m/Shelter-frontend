import { Button, Card, Spinner } from "@radix-ui/themes";
import { ImageWithLoader } from "../../components/theme/ImageWithLoader";
import { Modal } from "../../components/theme/Modal";
import { APIDeletePost, Post } from "../../api/mutations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../global/config/queryKeys";
import { APIGetShelter, APIGetUser } from "../../api/queries";
import { Link } from "react-router";
import { routes } from "../../global/config/routes";

import removeMarkdown from "markdown-to-text";
import { MarkdownBox } from "../../components/MarkdownBox";
import { MessageForm } from "../../components/MessageForm";
import { Popup } from "../../components/theme/Popup";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../store/atoms";
import { useMemo } from "react";
import { PostDetails } from "./PostDetails";

export function PostCard(post: Post) {
   const displayDesription = post.description
      ? removeMarkdown(post.description.slice(0, 40)) + "..."
      : undefined;

   const renderNeed = () => {
      if (post.needs === "owner") return "Нового хозяїна";
      if (post.needs === "shelter") return "Притулок";
      if (post.needs === "rescue") return "Порятунку";
   };

   const currentUser = useAtomValue(currentUserAtom);

   const isDeletable = useMemo(() => {
      if (!currentUser) return false;
      if (currentUser.data?.shelterID === post.shelterID) return true;
      if (currentUser.data?.id === post.userID) return true;
   }, [post, currentUser]);

   const queryClient = useQueryClient();
   const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
      mutationFn: APIDeletePost,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      }
   });

   return (
      <Card className="!flex !flex-col">
         <div className="flex gap-2 grow">
            <div className="grow">
               <h3>{post?.title}</h3>

               <p className="text-(--gray-10)">Потребує: {renderNeed()}</p>
               <p className="text-(--gray-10)">{displayDesription}</p>
            </div>
            {post.imageURL ? (
               <div className="w-30 h-30 aspect-square shrink-0">
                  <ImageWithLoader src={post.imageURL} />
               </div>
            ) : (
               <div className="w-30 h-30 aspect-square shrink-0 opacity-60">
                  <ImageWithLoader src="https://i.pinimg.com/736x/55/b2/7b/55b27bbd5670a64a82ebde947095ac0a.jpg" />
               </div>
            )}
         </div>
         <div className="mt-3 flex gap-2 flex-row-reverse">
            <Modal
               trigger={
                  <div className="flex gap-2">
                     {post.needs === "owner" && <Button>Стати хозяїном</Button>}
                     {post.needs === "shelter" && <Button>Деталі</Button>}
                     {post.needs === "rescue" && <Button>Допомогти</Button>}
                     <Button variant="soft">Деталі</Button>
                  </div>
               }
               content={<PostDetails post={post} />}
            />
            <Popup
               trigger={
                  <Button
                     variant="soft"
                     color="gray"
                     className="!px-1 !mr-auto !opacity-80"
                  >
                     <i className="pi pi-ellipsis-v" />
                  </Button>
               }
               content={
                  <div className="-m-1 flex flex-col gap-2">
                     <Button
                        className="!flex !gap-2 !w-full !justify-between"
                        variant="ghost"
                        color="gray"
                        onClick={() => {
                           toast.success("Скаргу успішно надіслано");
                        }}
                     >
                        <span>Поскаржитися</span>
                        <i className="pi pi-flag-fill" />
                     </Button>
                     {isDeletable && (
                        <Button
                           onClick={() => deletePost(post.id)}
                           className="!flex !gap-2 !w-full !justify-between"
                           variant="ghost"
                           color="red"
                           loading={isDeletingPost}
                        >
                           <span>Видалити</span>
                           <i className="pi pi-trash" />
                        </Button>
                     )}
                  </div>
               }
            />
         </div>
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
         <div className="flex justify-center mt-4">
            <Spinner size="3" />
         </div>
      );
   if (data)
      return (
         <MarkdownBox
            title="Контактна інформація волонтера"
            text={data.contacts || ""}
         />
      );
}

function ShelterDetails({ shelterID }: { shelterID: string }) {
   const { data, isPending } = useQuery({
      queryKey: queryKeys.shelter(shelterID),
      queryFn: APIGetShelter(shelterID)
   });

   if (isPending)
      return (
         <div className="flex justify-center mt-4">
            <Spinner size="3" />
         </div>
      );
   if (data)
      return (
         <div className="mt-2">
            <MarkdownBox
               title={`${data.name} м. ${data.location}`}
               text={data?.contacts}
            />
            <div className="flex mt-2 gap-2 justify-end">
               <Link to={routes.toShelter(data.id)}>
                  <Button variant="soft" color="gray">
                     Перейти до притулку
                  </Button>
               </Link>
               <Modal
                  trigger={<Button variant="soft">Написати в притулок</Button>}
                  content={<MessageForm shelter={data} />}
               />
            </div>
         </div>
      );
}

export { AuthorDetails, ShelterDetails };
