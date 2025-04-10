import { Separator } from "@radix-ui/themes";
import { PostCard } from "./PostCard";
import { PropsWithChildren } from "react";

export function ShelterGroup({ children }: PropsWithChildren) {
   return (
      <div>
         <div className="flex gap-2 items-center">
            <h2>Приют київських бобрів</h2>
            <Separator className="!grow" />
         </div>
         <div className="grid grid-cols-5 p-4 gap-4">{children}</div>
      </div>
   );
}
