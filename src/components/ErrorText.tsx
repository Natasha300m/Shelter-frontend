import { PropsWithChildren } from "react";

export function ErrorText({ children }: PropsWithChildren) {
   return <small className="text-(--red-10)">{children}</small>;
}
