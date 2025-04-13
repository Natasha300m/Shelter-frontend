import { useAtomValue, useSetAtom } from "jotai";
import { currentUserAtom, currentUserIdAtom } from "../../../store/atoms";
import {
   Avatar,
   Button,
   RadioCards,
   Separator,
   Spinner,
   Table
} from "@radix-ui/themes";
import { Navigate } from "react-router";
import { routes } from "../../../global/config/routes";
import { useState } from "react";
import { User } from "../../../api/mutations";
import { Modal } from "../../../components/theme/Modal";
import Volunteer from "./Volunteer";
import { Manager } from "./Manager";
import toast from "react-hot-toast";

function AccountPage() {
   const currentUser = useAtomValue(currentUserAtom);

   const currentUserId = useAtomValue(currentUserIdAtom);

   if (!currentUserId) return <Navigate to={routes.login} />;
   if (currentUser?.isPending)
      return (
         <section className="containerX pt-10 md:pt-20">
            <div className="max-w-[600px] mx-auto">
               <h1 className="text-center">Особистий кабінет</h1>
               <div className="flex justify-center mt-4">
                  <Spinner size="3" className="!scale-150" />
               </div>
            </div>
         </section>
      );
   if (currentUser?.data) {
      const userData = currentUser.data;
      return <AccountPageContent {...{ userData }} />;
   }
}

function AccountPageContent({ userData }: { userData: User }) {
   const [role, setRole] = useState<"MANAGER" | "VOLUNTEER" | undefined>(
      userData?.role ? userData?.role : undefined
   );

   const setCurrentUserId = useSetAtom(currentUserIdAtom);

   const handleLogOut = () => {
      setCurrentUserId("");
   };

   return (
      <section className="containerX pt-10 md:pt-20">
         <div className="max-w-[600px] mx-auto">
            <h1 className="text-center">Особистий кабінет</h1>
            <div className="flex flex-col items-center md:items-start md:flex-row gap-4 justify-center mt-4">
               <Avatar
                  size="9"
                  fallback={userData.name[0]}
                  src={userData.photoURL}
                  className="!rounded-full order-2 md:order-1"
               />
               <div className="flex flex-col gap-2 order-1 md:order-2">
                  <Table.Root>
                     <Table.Row>
                        <Table.RowHeaderCell>Імʼя:</Table.RowHeaderCell>
                        <Table.Cell>{userData.name}</Table.Cell>
                     </Table.Row>
                     <Table.Row>
                        <Table.RowHeaderCell>Пошта:</Table.RowHeaderCell>
                        <Table.Cell>{userData.email}</Table.Cell>
                     </Table.Row>
                  </Table.Root>
                  <p className="text-(--gray-10)">Авторизовано через</p>
                  <Button disabled>
                     Google <i className="pi pi-google" />
                  </Button>
               </div>
            </div>

            <div>
               {userData.role ? (
                  ""
               ) : (
                  <p className="mt-8 text-(--accent-10) flex items-center justify-center gap-1">
                     Ваш аккаунт майже готовий! Залишилось обрати
                     <Modal
                        trigger={
                           <Button variant="ghost" className="!font-bold">
                              роль
                           </Button>
                        }
                        content={
                           <div>
                              <h3>Волонтер:</h3>
                              <p>
                                 Lorem ipsum dolor sit, amet consectetur
                                 adipisicing elit. Neque doloribus molestias
                                 vitae repudiandae nobis exercitationem dolor
                                 consectetur illum? Architecto quo aperiam
                                 perferendis distinctio asperiores repudiandae
                                 laboriosam expedita, veniam quos perspiciatis.
                                 Ex sint aspernatur qui optio eligendi molestias
                                 esse beatae ab.
                              </p>
                              <Separator className="!w-full !my-2" />
                              <h3>Менеджер Притулку:</h3>
                              <p>
                                 Lorem, ipsum dolor sit amet consectetur
                                 adipisicing elit. Vitae, iusto nam. Labore
                                 fugiat rerum asperiores mollitia similique rem,
                                 debitis quasi minus veniam atque neque natus
                                 aspernatur eveniet magni earum. Magni.
                              </p>
                           </div>
                        }
                     />
                  </p>
               )}
               <div className="mt-4">
                  <RadioCards.Root
                     value={role}
                     onValueChange={(val: "MANAGER" | "VOLUNTEER") =>
                        setRole(val)
                     }
                     disabled={userData.role ? true : false}
                  >
                     <RadioCards.Item value="VOLUNTEER">
                        <b>Волонтер</b>
                     </RadioCards.Item>
                     <RadioCards.Item value="MANAGER">
                        <b>Менеджер притулку</b>
                     </RadioCards.Item>
                  </RadioCards.Root>
               </div>
               <div className="mt-4">
                  {role === "VOLUNTEER" && <Volunteer />}
                  {role === "MANAGER" && <Manager />}
               </div>
               <div className="mt-4">
                  <div className="flex gap-3 items-center">
                     <h3>Небезпечна зона</h3>
                     <Separator className="!grow" />
                  </div>
                  <div className="mt-2 flex gap-2 justify-end">
                     <Button variant="soft" color="gray" onClick={handleLogOut}>
                        Вийти з акаунту <i className="pi pi-sign-out" />
                     </Button>
                     <Button
                        variant="soft"
                        onClick={() => {
                           toast.error("Функція поки не реалізована ((");
                        }}
                     >
                        Видалити акаунт <i className="pi pi-trash" />
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export { AccountPage };
