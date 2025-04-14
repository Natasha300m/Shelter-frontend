import { Button, Separator, Spinner } from "@radix-ui/themes";
import { PostCard } from "./PostCard";
import { ShelterGroup } from "./ShelterGroup";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../global/config/queryKeys";
import { APIGetAllPosts, APIGetAllShelters } from "../../api/queries";
import { PropsWithChildren, useMemo, useState } from "react";

function HomePage() {
   const [petType, setPetType] = useState("");
   const [petAge, setPetAge] = useState("");
   const [needs, setNeeds] = useState("");

   const resetFilters = () => {
      setPetType(""), setPetAge(""), setNeeds("");
   };

   const { data: posts, isPending: isPostsFetching } = useQuery({
      queryKey: queryKeys.posts,
      queryFn: APIGetAllPosts
   });

   const dispalyPosts = useMemo(
      () =>
         posts?.filter((post) => {
            if (petType === "Інше") {
               if (["пес", "кіт"].includes(post.petType.toLocaleLowerCase()))
                  return false;
            } else if (petType) {
               if (
                  post.petType.toLocaleLowerCase() !==
                  petType.toLocaleLowerCase()
               )
                  return false;
            }
            if (petAge) {
               if (post.petAge !== petAge) return false;
            }
            if (needs) {
               if (post.needs !== needs) return false;
            }
            return true;
         }),
      [posts, petAge, petType, needs]
   );

   const volunteersPosts = useMemo(() => {
      if (!dispalyPosts) return [];
      if (dispalyPosts.length === 0) return [];
      return dispalyPosts.filter((post) => post.authorRole === "VOLUNTEER");
   }, [dispalyPosts]);

   const { data: shelters, isPending: isSheltersFetching } = useQuery({
      queryKey: queryKeys.shelters,
      queryFn: APIGetAllShelters
   });

   const isFetching = isPostsFetching || isSheltersFetching;
   console.log(posts);

   return (
      <>
         <div className="containerX flex gap-8 pt-8 flex-col md:flex-row">
            <section className="grow order-2 md:order-1 shrink-0 space-y-4">
               {isFetching && (
                  <div className="flex justify-center mt-8">
                     <Spinner size="3" className="!scale-150" />
                  </div>
               )}
               {!isFetching && shelters && dispalyPosts && (
                  <>
                     {shelters.map((shelter) => (
                        <ShelterGroup {...shelter} posts={dispalyPosts} />
                     ))}
                     {volunteersPosts && volunteersPosts.length > 0 && (
                        <div className="w-full">
                           <div className="flex gap-2 items-center">
                              <h3>Обвʼяви волонтерів</h3>
                              <Separator className="!grow" />
                           </div>
                           <div className="grid325px1fr gap-4 p-4">
                              {volunteersPosts.map((post) => (
                                 <PostCard {...post} />
                              ))}
                           </div>
                        </div>
                     )}
                  </>
               )}
               {dispalyPosts && dispalyPosts?.length === 0 && (
                  <p className="text-(--gray-10) text-center">
                     Обʼяв за заданим фільтром немає((
                  </p>
               )}
            </section>
            <section className="w-full md:w-[250px] grow-0 shrink-0 order-1 md:order-2">
               <h2 className="text-xl">Фільтри пошуку:</h2>
               <div className="mt-2">
                  <h3>Тварина:</h3>
                  <div className="flex gap-2 flex-wrap mt-1">
                     <ToggleButton
                        value="Пес"
                        state={petType}
                        setState={setPetType}
                     >
                        Песик
                     </ToggleButton>
                     <ToggleButton
                        value="Кіт"
                        state={petType}
                        setState={setPetType}
                     >
                        Кіт
                     </ToggleButton>
                     <ToggleButton
                        value="Інше"
                        state={petType}
                        setState={setPetType}
                     >
                        Інше
                     </ToggleButton>
                  </div>
               </div>
               <div className="mt-2">
                  <h3>Вік:</h3>
                  <div className="flex gap-2 flex-wrap mt-1">
                     <ToggleButton
                        value="less1"
                        state={petAge}
                        setState={setPetAge}
                     >
                        Менше року
                     </ToggleButton>
                     <ToggleButton
                        value="more1"
                        state={petAge}
                        setState={setPetAge}
                     >
                        Від 1 року
                     </ToggleButton>
                     <ToggleButton
                        value="more2"
                        state={petAge}
                        setState={setPetAge}
                     >
                        Від 2х років
                     </ToggleButton>
                     <ToggleButton
                        value="more4"
                        state={petAge}
                        setState={setPetAge}
                     >
                        Від 4х років
                     </ToggleButton>
                  </div>
               </div>

               <div className="mt-2">
                  <h3>Потребує:</h3>
                  <div className="flex gap-2 flex-wrap mt-1">
                     <ToggleButton
                        value="owner"
                        state={needs}
                        setState={setNeeds}
                     >
                        Хозяїна
                     </ToggleButton>
                     <ToggleButton
                        value="shelter"
                        state={needs}
                        setState={setNeeds}
                     >
                        Притулок
                     </ToggleButton>
                     <ToggleButton
                        value="rescue"
                        state={needs}
                        setState={setNeeds}
                     >
                        Порятунку
                     </ToggleButton>
                  </div>
               </div>
               <div className="mt-4">
                  <Button
                     variant="soft"
                     color="gray"
                     className="!w-full"
                     onClick={resetFilters}
                  >
                     Скинути фільтри
                  </Button>
               </div>
            </section>
         </div>
      </>
   );
}

type ToggleButtonProps = {
   state: string;
   setState: (a: string) => void;
   value: string;
};

function ToggleButton({
   state,
   setState,
   value,
   children
}: ToggleButtonProps & PropsWithChildren) {
   return (
      <Button
         variant={state === value ? "solid" : "outline"}
         onClick={() => setState(value)}
      >
         {children}
      </Button>
   );
}

export { HomePage };
