import { Button } from "@radix-ui/themes";
import { Modal } from "../../../components/theme/Modal";
import { useMutation } from "@tanstack/react-query";
import { signInWithGoogle } from "../../../api/auth";
import { useSetAtom } from "jotai";
import { currentUserIdAtom } from "../../../store/atoms";
import { useNavigate } from "react-router";
import { routes } from "../../../global/config/routes";

function LoginPage() {
   const setCurrentUserId = useSetAtom(currentUserIdAtom);

   const navigate = useNavigate();

   const { mutate: handleLogin, isPending } = useMutation({
      mutationFn: signInWithGoogle,
      onSuccess: (data) => {
         if (data) setCurrentUserId(data.id);
         navigate(routes.account);
      }
   });

   return (
      <section className="containerX pt-10 md:pt-20">
         <h1 className="containerX text-center">
            Ласкаво просимо до <b className="text-(--accent-10)">Baratie</b>
         </h1>
         <p className="containerX text-center mt-1 text-(--gray-10)">
            Увійдіть нижче (ніяких розсилок не буде, обіцяємо)
         </p>
         <div className="flex justify-center mt-4">
            <Button
               loading={isPending}
               variant="soft"
               color="gray"
               size="3"
               onClick={() => handleLogin()}
            >
               Продовжити з Google <i className="pi pi-google" />
            </Button>
         </div>
         <div className="text-center mt-4 max-w-[40ch] mx-auto text-(--gray-10)">
            <small>
               Продовжуючи, ви погоджуєтесь з нашими{" "}
               <Modal
                  trigger={
                     <u className="cursor-pointer text-(--gray-11)">
                        Умовами користування
                     </u>
                  }
                  content={
                     <>
                        <h3>Умови користування</h3>
                        <p>
                           Авторизуючись через Google, ви погоджуєтесь з нашими
                           умовами. Ми отримуємо ваш нікнейм, email та публічні
                           дані.
                        </p>
                        <p>
                           Не використовуйте сервіс у незаконний спосіб. Ми
                           можемо призупинити доступ за порушення.
                        </p>
                        <p>
                           Умови можуть змінюватися. Питання:{" "}
                           <a href="mailto:support@sabaody.space">
                              support@sabaody.space
                           </a>
                        </p>
                     </>
                  }
               />{" "}
               та{" "}
               <Modal
                  trigger={
                     <u className="cursor-pointer text-(--gray-11)">
                        Політикою конфіденційності
                     </u>
                  }
                  content={
                     <>
                        <h3>Політика конфіденційності</h3>
                        <p>
                           Ми збираємо ваш Google нікнейм, email і публічну
                           інформацію — для авторизації та покращення сервісу.
                        </p>
                        <p>
                           Дані не передаються третім особам без вашої згоди
                           (крім вимог закону). Ви можете змінити або видалити
                           свої дані.
                        </p>
                        <p>
                           Питання:{" "}
                           <a href="mailto:support@sabaody.space">
                              support@sabaody.space
                           </a>
                        </p>
                     </>
                  }
               />
            </small>
         </div>
      </section>
   );
}

export { LoginPage };
