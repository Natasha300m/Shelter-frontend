import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import { ToasterProvider } from "./components/theme/ToasterProvider";
import { AppRouter } from "./router/AppRouter";
function App() {
   return (
      <Theme
         appearance="dark"
         accentColor="purple"
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
      <App />
   </StrictMode>
);
