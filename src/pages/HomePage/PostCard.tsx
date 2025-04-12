import { Button, Card } from "@radix-ui/themes";
import { ImageWithLoader } from "../../components/theme/ImageWithLoader";
import { Modal } from "../../components/theme/Modal";

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

type TemporaryPostProps = Partial<Post>;

export function PostCard(post: TemporaryPostProps) {
   const displayDesription = post.description
      ? post.description.slice(0, 40) + "..."
      : undefined;
   return (
      <Card>
         <div className="grid gap-2 grid-cols-[2fr_1fr]">
            <div>
               <h3>{post?.title}</h3>

               <p className="text-(--gray-10)">Вік: більше року</p>
               <p className="text-(--gray-10)">{displayDesription}</p>
            </div>
            {post.imageURLs && (
               <div className="w-25 aspect-square mt-2">
                  <ImageWithLoader src={post.imageURLs[0]} />
               </div>
            )}
         </div>
         <div className="mt-3 flex gap-2">
            <Button>Стати хозяїном</Button>
            <Modal
               trigger={<Button variant="soft">Деталі</Button>}
               content={
                  <>
                     <div className="flex gap-2">
                        <div>
                           {post.imageURLs && (
                              <div className="w-40 aspect-square">
                                 <ImageWithLoader src={post.imageURLs[0]} />
                              </div>
                           )}
                           <h2 className="mt-2">Член</h2>
                        </div>
                        <div></div>
                     </div>
                  </>
               }
            />
         </div>
      </Card>
   );
}
