import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "../components/Layout";
import { HomePage } from "../pages/HomePage/HomePage";
import { routes } from "../global/config/routes";
import { CreatePostPage } from "../pages/CreatePostPage/CreatePostPage";
import { LoginPage } from "../pages/account/LoginPage/LoginPage";
import { SignupPage } from "../pages/account/SignupPage/SignupPage";
import { AccountPage } from "../pages/account/AccountPage/AccountPage";
import { NewsPage } from "../pages/NewsPage/NewsPage";
import { CreateNewsItemPage } from "../pages/CreateNewsItemPage/CreateNewsItemPage";
function AppRouter() {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route element={<Layout />}>
                  <Route path={routes.home} element={<HomePage />} />
                  <Route path={routes.news} element={<NewsPage />} />
                  <Route
                     path={routes.createPost}
                     element={<CreatePostPage />}
                  />
                  <Route
                     path={routes.createNewsItem}
                     element={<CreateNewsItemPage />}
                  />

                  <Route path={routes.shelter} element/>

                  {/* Auth */}
                  <Route path={routes.login} element={<LoginPage />} />
                  <Route path={routes.signup} element={<SignupPage />} />
                  <Route path={routes.account} element={<AccountPage />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </>
   );
}

export { AppRouter };
