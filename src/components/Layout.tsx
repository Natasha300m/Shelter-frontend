import { Button } from "@radix-ui/themes";
import { NavLink, Outlet, useLocation } from "react-router";
import { routes } from "../global/config/routes";
import { useState } from "react";

import clsx from "clsx";

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
         <aside
            className={clsx(
               `fixed bottom-4 left-1/2 -translate-x-1/2 p-3 
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
                     <NavBarItem
                        icon="pi-plus-circle"
                        name="Додати обʼяву"
                        to={routes.createPost}
                     />
                     <NavBarItem
                        icon="pi-calendar-plus"
                        name="Додати новину"
                        to={routes.createNewsItem}
                     />
                     <NavBarItem
                        icon="pi-user"
                        name="Авторизація"
                        to={routes.signup}
                        activeURLs={["login", "signup"]}
                     />
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
         </aside>
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
               <span className="text-sm text-nowrap">{name}</span>
            </div>
         </Button>
      </NavLink>
   );
}

export { Layout };
