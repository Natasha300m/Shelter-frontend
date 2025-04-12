import { Separator } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export function ShelterGroup({
   children,
   title
}: PropsWithChildren & { title?: string }) {
   return (
      <div className="w-full">
         <div className="flex gap-2 items-center">
            <h2>{title || "Приют київських бобрів"}</h2>
            <Separator className="!grow" />
         </div>
         <div className="grid325px1fr gap-4 p-4">{children}</div>
      </div>
   );
}
