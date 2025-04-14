import { useParams } from "react-router";
import { queryKeys } from "../../global/config/queryKeys";
import {
   APIGetAllNewsItems,
   APIGetAllPosts,
   APIGetShelter
} from "../../api/queries";
import { useQuery } from "@tanstack/react-query";
import { ShelterGroup } from "../HomePage/ShelterGroup";
import { ScrollArea, Spinner, Table } from "@radix-ui/themes";
import { NewsItemCard } from "../NewsPage/NewsItemCard";
import Markdown from "react-markdown";

function ShelterPage() {
   const { id } = useParams();

   const { data: posts, isPending: isPostsFetching } = useQuery({
      queryKey: queryKeys.posts,
      queryFn: APIGetAllPosts
   });

   const shelterId = id || "";
   const { data: shelter, isPending: isShelterFetching } = useQuery({
      queryKey: queryKeys.shelter(shelterId),
      queryFn: APIGetShelter(shelterId),
      enabled: !!shelterId
   });

   const { data: newsItems, isPending: isNewsItemsFetching } = useQuery({
      queryKey: queryKeys.news,
      queryFn: APIGetAllNewsItems
   });

   const isFetching =
      isPostsFetching && isShelterFetching && isNewsItemsFetching;

   const displayPosts = posts
      ? posts?.filter((post) => {
           if (!post.shelterID) return false;
           return post.shelterID === id;
        })
      : [];

   if (isFetching || !shelter || !newsItems || !posts)
      return (
         <section className="containerX pt-8">
            <div className="flex justify-center mt-4">
               <Spinner size="3" />
            </div>
         </section>
      );

   return (
      <section className="containerX pt-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
               <h2 className="text-center mb-2">
                  <span className="text-(--accent-10)">Інформація</span>{" "}
                  Притулку
               </h2>
               {/* <h2>
                  {shelter.name} м.{shelter.location}
               </h2> */}
               <div className=" ">
                  <Table.Root className="!min-w-[375px]">
                     <Table.Row>
                        <Table.RowHeaderCell>Назва:</Table.RowHeaderCell>
                        <Table.Cell>
                           <b>{shelter.name}</b>
                        </Table.Cell>
                     </Table.Row>
                     <Table.Row>
                        <Table.RowHeaderCell>Місто:</Table.RowHeaderCell>
                        <Table.Cell>{shelter.location}</Table.Cell>
                     </Table.Row>
                  </Table.Root>
               </div>
               <p className="text-(--gray-10) mt-4">
                  Контакта інформація притулку
               </p>
               <ScrollArea className="!text-(--gray-11) !h-40">
                  <Markdown>{shelter.contacts}</Markdown>
               </ScrollArea>
            </div>
            <div>
               <h2 className="text-center mb-2">
                  <span className="text-(--accent-10)">Новини</span>{" "}
               </h2>
               <div className="space-y-4">
                  {newsItems.map((newsItem) => {
                     if (newsItem.shelterID === shelterId)
                        return <NewsItemCard {...{ newsItem }} />;
                     return <></>;
                  })}
               </div>
            </div>
         </div>
         <div className="mt-4">
            <ShelterGroup {...shelter} posts={displayPosts} disableTitle />
         </div>
      </section>
   );
}

export { ShelterPage };
