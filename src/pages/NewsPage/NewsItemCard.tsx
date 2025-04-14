import { useQuery } from "@tanstack/react-query";
import { NewsItem } from "../../api/mutations";
import { queryKeys } from "../../global/config/queryKeys";
import { APIGetShelter } from "../../api/queries";
import Markdown from "react-markdown";
import { Separator, Spinner } from "@radix-ui/themes";
import { Link } from "react-router";
import { routes } from "../../global/config/routes";

function NewsItemCard({ newsItem }: { newsItem: NewsItem }) {
   const shelterId = newsItem.shelterID || "";

   const { data: shelter, isPending: isShelterFetching } = useQuery({
      queryKey: queryKeys.shelter(shelterId),
      queryFn: APIGetShelter(shelterId),
      enabled: !!shelterId
   });

   return (
      <div className="w-full">
         <h2>{newsItem.title}</h2>
         <div className="text-(--gray-10) p-2">
            <Markdown>{newsItem.content}</Markdown>
         </div>
         {isShelterFetching && (
            <div className="flex justify-end text-(--gray-10) gap-2">
               <Spinner size="3" />
            </div>
         )}
         {shelter && (
            <div className="flex justify-end text-(--gray-10) gap-2">
               <p>
                  <Link
                     to={routes.toShelter(shelter.id)}
                     className="hover:text-(--gray-12) flex gap-2 items-center"
                  >
                     <p>{shelter.name}</p>
                     <p>м. {shelter.location}</p>
                     <i className="pi pi-arrow-right" />
                  </Link>
               </p>
            </div>
         )}
         <div>
            <Separator className="!w-full !mt-2" />
         </div>
      </div>
   );
}

export { NewsItemCard };
