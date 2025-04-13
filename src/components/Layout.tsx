import { Avatar, Button } from "@radix-ui/themes";
import { NavLink, Outlet, useLocation } from "react-router";
import { routes } from "../global/config/routes";
import { useState } from "react";

import clsx from "clsx";
import { Popup } from "./theme/Popup";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../store/atoms";

function Layout() {
   const [isNavClosed, setIsNavClosed] = useState(false);

   const toggleNav = () => {
      setIsNavClosed((isC) => !isC);
   };

   return (
      <>
         <main className="mb-24">
            <Outlet />
         </main>

         <footer
            className={clsx(
               `fixed p-3 
               bottom-4 left-1/2 -translate-x-1/2
               bg-(--color-panel-solid) rounded-(--radius-4) 
               border-1 border-(--gray-4)`,
               {
                  "!opacity-50 !p-1.5": isNavClosed
               }
            )}
         >
            <nav className="flex gap-3 ">
               {!isNavClosed && (
                  <>
                     <NavBarItem
                        icon="pi-home"
                        name="Головна"
                        to={routes.home}
                     />
                     <NavBarItem
                        icon="pi-calendar"
                        name="Новини"
                        to={routes.news}
                     />
                     <Popup
                        trigger={
                           <Button
                              variant="soft"
                              color="gray"
                              className="!block !h-auto !p-2"
                           >
                              <div className="flex gap-2 items-center flex-nowrap">
                                 <i className="text-xl pi pi-plus-circle" />
                                 <span className="text-sm text-nowrap hidden md:block">
                                    Створити
                                 </span>
                              </div>
                           </Button>
                        }
                        content={
                           <div className="flex flex-col gap-2 -m-1">
                              <NavPopupItem
                                 icon="pi-plus-circle"
                                 name="Додати обʼяву"
                                 to={routes.createPost}
                              />
                              <NavPopupItem
                                 icon="pi-calendar-plus"
                                 name="Додати новину"
                                 to={routes.createNewsItem}
                              />
                           </div>
                        }
                     />

                     <NavBarAuthItem />
                  </>
               )}
               <Button
                  variant="ghost"
                  color="gray"
                  size="4"
                  className="!m-0"
                  onClick={toggleNav}
               >
                  {isNavClosed ? (
                     <i className="text-xl pi pi-bars" />
                  ) : (
                     <i className="text-xl pi pi-times" />
                  )}
               </Button>
            </nav>
         </footer>
      </>
   );
}

type NavBarItemProps = {
   icon: string;
   to: string;
   name: string;
   activeURLs?: string[];
};

function NavBarItem({ icon, to, name, activeURLs }: NavBarItemProps) {
   const { pathname } = useLocation();

   let buttonColor: "gray" | undefined = "gray";
   if (activeURLs && activeURLs.includes(pathname)) buttonColor = undefined;
   else if (pathname === to) buttonColor = undefined;

   return (
      <NavLink {...{ to }}>
         <Button
            color={buttonColor}
            variant="soft"
            className="!block !h-auto !p-2"
         >
            <div className="flex gap-2 items-center flex-nowrap">
               <i className={`text-xl pi ${icon}`} />
               <span className="text-sm text-nowrap hidden md:block">
                  {name}
               </span>
            </div>
         </Button>
      </NavLink>
   );
}

function NavPopupItem({ icon, to, name, activeURLs }: NavBarItemProps) {
   const { pathname } = useLocation();

   let buttonColor: "gray" | undefined = "gray";
   if (activeURLs && activeURLs.includes(pathname)) buttonColor = undefined;
   else if (pathname === to) buttonColor = undefined;
   return (
      <NavLink {...{ to }} className="w-full">
         <Button
            color={buttonColor}
            variant="ghost"
            className="!block !h-auto !p-2 !w-full"
         >
            <div className="flex gap-2 items-center flex-nowrap">
               <i className={`text-xl pi ${icon}`} />
               <span className="text-sm text-nowrap">{name}</span>
            </div>
         </Button>
      </NavLink>
   );
}

function NavBarAuthItem() {
   const { pathname } = useLocation();

   const currentUser = useAtomValue(currentUserAtom);

   let buttonColor: "gray" | undefined = [
      routes.account,
      routes.login
   ].includes(pathname)
      ? undefined
      : "gray";

   const renderInner = () => {
      if (currentUser && currentUser.data)
         return (
            <>
               <Avatar
                  size="1"
                  fallback={currentUser?.data?.name[0]}
                  className="-m-0.5"
               />
               <span className="text-sm text-nowrap hidden md:block">
                  Кабінет
               </span>
            </>
         );
      return (
         <>
            <i className="text-xl pi pi-user" />
            <span className="text-sm text-nowrap hidden md:block">
               Авторизація
            </span>
         </>
      );
   };

   return (
      <NavLink
         to={currentUser && currentUser.data ? routes.account : routes.login}
      >
         <Button
            color={buttonColor}
            variant="soft"
            className="!block !h-auto !p-2"
            loading={currentUser?.isPending ? true : false}
         >
            <div className="flex gap-2 items-center flex-nowrap">
               {renderInner()}
            </div>
         </Button>
      </NavLink>
   );
}

export { Layout };
