import { Button } from "@radix-ui/themes";
import { PostCard } from "./PostCard";
import { ShelterGroup } from "./ShelterGroup";

function HomePage() {
   return (
      <>
         <div className="containerX flex gap-8 pt-8 flex-col md:flex-row">
            <section className="grow order-2 md:order-1 shrink-0 space-y-4">
               <ShelterGroup>
                  <PostCard
                     title="Пес коргі"
                     imageURLs={[
                        "https://i.pinimg.com/736x/86/66/00/866600bad20c99547bb03420a18d4b67.jpg"
                     ]}
                     description="Слухняній пес, знає команди вміє стрибати"
                  />

                  <PostCard
                     title="Піца Маззерати"
                     imageURLs={[
                        "https://i.pinimg.com/736x/6e/57/54/6e5754af335ed10df3b08b136ec67457.jpg"
                     ]}
                     description="Слухняній пес, знає команди вміє стрибати"
                  />
               </ShelterGroup>
               <ShelterGroup title="Львівський приют ім. Зеленського">
                  <PostCard
                     title="Пес коргі"
                     imageURLs={[
                        "https://i.pinimg.com/736x/ac/5a/30/ac5a300b8191e0895e32f501fec49d9f.jpg"
                     ]}
                     description="Слухняній пес, знає команди вміє стрибати"
                  />

                  <PostCard
                     title="Піца Маззерати"
                     imageURLs={[
                        "https://i.pinimg.com/736x/e8/20/8f/e8208f9ebe2338d55dd4bbaf92ddac3f.jpg"
                     ]}
                     description="Слухняній пес, знає команди вміє стрибати"
                  />

                  <PostCard
                     title="Гібон"
                     imageURLs={[
                        "https://i.pinimg.com/736x/41/ce/b7/41ceb7bdeb4b8cdbd4ba81816ed80cdf.jpg"
                     ]}
                     description="Слухняній пес, знає команди вміє стрибати"
                  />
               </ShelterGroup>
               <ShelterGroup title="Пости волонтерів: ">
                  <PostCard
                     title="Хочю піцци"
                     imageURLs={[
                        "https://i.pinimg.com/736x/ac/5a/30/ac5a300b8191e0895e32f501fec49d9f.jpg"
                     ]}
                     description="Слухняній пес, знає команди вміє стрибати"
                  />
               </ShelterGroup>
            </section>
            <section className="w-[250px] grow-0 shrink-0 order-1 md:order-2">
               <h2 className="text-xl">Фільтри пошуку:</h2>
               <div className="mt-2">
                  <h3>Тварина:</h3>
                  <div className="flex gap-2 flex-wrap mt-1">
                     <Button variant="outline">Песик</Button>
                     <Button variant="outline">Котик</Button>
                     <Button variant="outline">Інше</Button>
                  </div>
               </div>
               <div className="mt-2">
                  <h3>Вік:</h3>
                  <div className="flex gap-2 flex-wrap mt-1">
                     <Button variant="outline">Менше року</Button>
                     <Button variant="outline">Від року</Button>
                     <Button variant="outline">Від 2х років</Button>
                     <Button variant="outline">Від 3х років</Button>
                  </div>
               </div>

               <div className="mt-2">
                  <h3>Шукає:</h3>
                  <div className="flex gap-2 flex-wrap mt-1">
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
