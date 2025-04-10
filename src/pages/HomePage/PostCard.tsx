import { Button, Card } from "@radix-ui/themes";
import { ImageWithLoader } from "../../components/theme/ImageWithLoader";

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
   return (
      <Card>
         <h3>{post?.title}</h3>
         {post.imageURLs && (
            <div className="w-full aspect-square mt-2">
               <ImageWithLoader src={post.imageURLs[0]} />
            </div>
         )}
         <div className="mt-3  flex flex-col gap-2">
            <Button className="!w-full">Стати хозяїном</Button>
            <Button className="!w-full" variant="soft">
               Деталі
            </Button>
         </div>
      </Card>
   );
}
