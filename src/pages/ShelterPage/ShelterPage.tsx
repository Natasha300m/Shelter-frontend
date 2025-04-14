import { useParams } from "react-router";
import { queryKeys } from "../../global/config/queryKeys";
import { APIGetAllPosts, APIGetShelter } from "../../api/queries";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

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

   const displayPosts = posts
      ? posts?.filter((post) => {
           if (!post.shelterID) return false;
           return post.shelterID === id;
        })
      : [];

   return (
      <section className="containerX pt-8">
         <p>{JSON.stringify(shelter)}</p>
         <p>{JSON.stringify(displayPosts)}</p>
      </section>
   );
}

export { ShelterPage };
