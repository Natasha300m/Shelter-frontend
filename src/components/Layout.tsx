import { Button } from "@radix-ui/themes";
import { NavLink, Outlet } from "react-router";
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
               `fixed bottom-8 left-1/2 -translate-x-1/2 p-3 
               bg-(--color-panel-solid) rounded-(--radius-4) 
               border-1 border-(--gray-4)`,
               {
                  "opacity-50": isNavClosed
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
                        icon="pi-calendar-plus"
                        name="Новини"
                        to={routes.news}
                     />
                     <NavBarItem
                        icon="pi-plus-circle"
                        name="Додати обʼяву"
                        to={routes.createPost}
                     />
                     <NavBarItem
                        icon="pi-user"
                        name="Авторизація"
                        to={routes.signup}
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
};

function NavBarItem({ icon, to, name }: NavBarItemProps) {
   return (
      <NavLink {...{ to }}>
         <Button color="gray" variant="soft" className="!block !h-auto !p-2">
            <div className="flex gap-2 items-center flex-nowrap">
               <i className={`text-xl pi ${icon}`} />
               <span className="text-sm text-nowrap">{name}</span>
            </div>
         </Button>
      </NavLink>
   );
}

export { Layout };
