import { useAtomValue } from "jotai";
import { currentUserAtom, currentUserIdAtom } from "../../../store/atoms";
import { Avatar, Button, Spinner, Table } from "@radix-ui/themes";
import { Navigate } from "react-router";
import { routes } from "../../../global/config/routes";

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
      return (
         <section className="containerX pt-10 md:pt-20">
            <div className="max-w-[600px] mx-auto">
               <h1 className="text-center">Особистий кабінет</h1>
               <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
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
            </div>
         </section>
      );
   }
}

export { AccountPage };
