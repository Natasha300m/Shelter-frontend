import { Button, TextArea, TextField } from "@radix-ui/themes";
import * as yup from "yup";
import { ErrorText } from "../../components/ErrorText";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../store/atoms";
import { v4 } from "uuid";
import { APICreateNewsItem } from "../../api/mutations";
import toast from "react-hot-toast";
import { Modal } from "../../components/theme/Modal";
import { MardownGuide } from "../../components/MardownGuide";

const postSchema = yup.object({
   title: yup.string().required("Вкажіть назву обʼяви"),
   description: yup.string()
});

export type PostFormData = yup.InferType<typeof postSchema>;

function CreateNewsItemPage() {
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm<PostFormData>({
      resolver: yupResolver(postSchema),
      defaultValues: {}
   });

   const currentUser = useAtomValue(currentUserAtom);

   const onSubmit = async (data: PostFormData) => {
      if (!currentUser?.data?.role) {
         toast.error("Тільки менеджер притулку може створювати новини");
         return;
      }

      if (currentUser?.data?.role !== "MANAGER") {
         toast.error("Тільки менеджер притулку може створювати новини");
         return;
      }

      const newNewsItemId = v4();
      await APICreateNewsItem({
         id: newNewsItemId,
         shelterID: currentUser.data.shelterID || "",
         title: data.title,
         content: data.description || ""
      });
      toast.success("Новину успішно створено");
   };

   return (
      <section className="containerX pt-8">
         <form
            className="max-w-[450px] mx-auto space-y-2"
            onSubmit={handleSubmit(onSubmit)}
         >
            <h2>Створення новини</h2>
            <label className="block">
               <p>Назва новини</p>
               <TextField.Root
                  placeholder="Загублений бобр"
                  {...register("title")}
               />
               {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
            </label>
            <label className="mt-4 block">
               <p className="flex items-center gap-1">
                  Опис новини{" "}
                  <Modal
                     trigger={
                        <Button variant="ghost" type="button">
                           (Markdown <i className="pi pi-info-circle" /> )
                        </Button>
                     }
                     content={<MardownGuide />}
                  />
               </p>
               <TextArea
                  className="!h-40 !overflow-y-scroll"
                  placeholder="# Необовʼязково*"
                  {...register("description")}
               />
            </label>
            <div className="flex justify-end gap-2">
               <Button variant="soft" color="gray" type="button">
                  Превʼю
               </Button>
               <Button>Створити обʼяву</Button>
            </div>
         </form>
      </section>
   );
}

export { CreateNewsItemPage };
