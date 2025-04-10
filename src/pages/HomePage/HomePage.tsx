import { Button } from "@radix-ui/themes";
import { PostCard } from "./PostCard";
import { ShelterGroup } from "./ShelterGroup";

function HomePage() {
   return (
      <>
         <div className="containerX flex gap-2 pt-8">
            <section className="grow">
               <ShelterGroup>
                  <PostCard
                     title="Пес коргі"
                     imageURLs={[
                        "https://i.pinimg.com/736x/f9/b1/2a/f9b12a7f46213e74ac16f0efe64b71bd.jpg"
                     ]}
                  />

                  <PostCard
                     title="Піца Маззерати"
                     imageURLs={[
                        "https://i.pinimg.com/736x/af/a7/3b/afa73b6c43b8a5f11e76245be49d7b5c.jpg"
                     ]}
                  />
               </ShelterGroup>
               <ShelterGroup>
                  <PostCard
                     title="Пес коргі"
                     imageURLs={[
                        "https://i.pinimg.com/736x/6e/53/f0/6e53f042d58d262edd1cc56957ffd2c2.jpg"
                     ]}
                  />

                  <PostCard
                     title="Піца Маззерати"
                     imageURLs={[
                        "https://i.pinimg.com/736x/1b/9e/2f/1b9e2f401bcc7364ba356bde6b4a40fb.jpg"
                     ]}
                  />

                  <PostCard
                     title="Гібон"
                     imageURLs={[
                        "https://i.pinimg.com/736x/10/85/95/108595342970587f13a0a8950e4db81d.jpg"
                     ]}
                  />
               </ShelterGroup>
            </section>
            <section className="w-[250px] grow shrink-0">
               <h2 className="text-xl">Фільтри пошуку:</h2>
               <div className="mt-2">
                  <h3>Тварина:</h3>
                  <div className="flex gap-2 flex-wrap">
                     <Button variant="outline">Песик</Button>
                     <Button variant="outline">Котик</Button>
                  </div>
               </div>
               <div className="mt-2">
                  <h3>Вік:</h3>
                  <div className="flex gap-2 flex-wrap">
                     <Button variant="outline">Менше року</Button>
                     <Button variant="outline">Від року</Button>
                     <Button variant="outline">Від 2х років</Button>
                     <Button variant="outline">Від 3х років</Button>
                  </div>
               </div>

               <div className="mt-2">
                  <h3>Шукає:</h3>
                  <div className="flex gap-2 flex-wrap">
                     <Button variant="outline">Хозяїна</Button>
                     <Button variant="outline">Притулок</Button>
                     <Button variant="outline">Загублена тварина</Button>
                  </div>
               </div>
            </section>
         </div>
      </>
   );
}

export { HomePage };
