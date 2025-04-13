import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import { ToasterProvider } from "./components/theme/ToasterProvider";
import { AppRouter } from "./router/AppRouter";
import {
   QueryClient,
   QueryClientProvider,
   useQuery
} from "@tanstack/react-query";
import { APIGetUser } from "./api/queries";
import { useAtomValue, useSetAtom } from "jotai";
import { currentUserAtom, currentUserIdAtom } from "./store/atoms";
import { queryKeys } from "./global/config/queryKeys";

const queryClient = new QueryClient();

function App() {
   const currentUserId = useAtomValue(currentUserIdAtom);

   useEffect(() => {
      localStorage.setItem("currentUserId", currentUserId);
   }, [currentUserId]);

   const setCurrentUser = useSetAtom(currentUserAtom);

   const { data, isError, isFetching } = useQuery({
      queryKey: queryKeys.user(currentUserId),
      queryFn: APIGetUser(currentUserId),
      enabled: !!currentUserId
   });

   useEffect(() => {
      if (data) setCurrentUser({ data, isPending: false });
      else if (isFetching) setCurrentUser({ isPending: true, data: undefined });
      else if (isError) setCurrentUser({ isPending: false, data: undefined });
   }, [data, isFetching, isError]);

   return (
      <Theme
         appearance="dark"
         accentColor="crimson"
         radius="medium"
         panelBackground="translucent"
      >
         <AppRouter />
         <ToasterProvider />
      </Theme>
   );
}

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <QueryClientProvider client={queryClient}>
         <App />
      </QueryClientProvider>
   </StrictMode>
);
