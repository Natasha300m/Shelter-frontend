import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../global/config/queryKeys";
import { APIGetAllNewsItems } from "../../api/queries";
import { Separator, Spinner } from "@radix-ui/themes";
import { NewsItemCard } from "./NewsItemCard";

function NewsPage() {
   const { data: newsItems, isPending: isNewsItemsFetching } = useQuery({
      queryKey: queryKeys.news,
      queryFn: APIGetAllNewsItems
   });

   return (
      <section className="containerX">
         <h2 className="text-center mt-8 mb-2">
            Новини <b className="text-(--accent-10)">Baratie</b>
         </h2>
         <div className="max-w-[800px] mx-auto mb-2">
            <Separator className="!w-full" />
         </div>
         {isNewsItemsFetching && (
            <div className="flex justify-center mt-3">
               <Spinner size="3" />
            </div>
         )}
         {newsItems &&
            newsItems.map((newsItem) => <NewsItemCard {...{ newsItem }} />)}
      </section>
   );
}

export { NewsPage };
