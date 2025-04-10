import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "../components/Layout";
import { HomePage } from "../pages/HomePage/HomePage";
function AppRouter() {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route element={<Layout />}>
                  <Route path="/" element={<HomePage />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </>
   );
}

export { AppRouter };
