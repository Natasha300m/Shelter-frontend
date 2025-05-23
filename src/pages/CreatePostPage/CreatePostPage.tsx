import {
   Button,
   RadioCards,
   Select,
   TextArea,
   TextField
} from "@radix-ui/themes";
import { useMemo, useState } from "react";
import * as yup from "yup";
import { FilePicker } from "../../components/theme/FilePicker";
import { ErrorText } from "../../components/ErrorText";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../store/atoms";
import { v4 } from "uuid";
import { APICreatePost } from "../../api/mutations";
import { uploadPetImage } from "../../global/config/firebase";
import toast from "react-hot-toast";
import { Modal } from "../../components/theme/Modal";
import { MardownGuide } from "../../components/MardownGuide";
import { PostDetails } from "../HomePage/PostDetails";
import { useNavigate } from "react-router";
import { routes } from "../../global/config/routes";

const postSchema = yup.object({
   title: yup.string().required("Вкажіть назву обʼяви"),
   description: yup.string()
});

export type PostFormData = yup.InferType<typeof postSchema>;

function CreatePostPage() {
   const [petType, setPetType] = useState("Пес");
   const [petAge, setPetAge] = useState("less1");
   const [needs, setNeeds] = useState("shelter");
   const [customPetType, setCustomPetType] = useState("");

   const [image, setImage] = useState<File | null>(null);

   const imageSrcCopy = useMemo(
      () => (image ? URL.createObjectURL(image) : null),
      [image]
   );

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      watch
   } = useForm<PostFormData>({
      resolver: yupResolver(postSchema),
      defaultValues: {}
   });

   const resultPetType = petType !== "zxc" ? petType : customPetType;

   const previewTitle = watch("title");
   const previewDescription = watch("description");

   const currentUser = useAtomValue(currentUserAtom);

   const navigate = useNavigate();

   const onSubmit = async (data: PostFormData) => {
      if (!currentUser?.data?.role) {
         toast.error(
            "Авторизуйтесь та оберіть роль для створення нової обʼяви"
         );
         return;
      }

      let imageURL: string | null = null;
      if (image) {
         imageURL = await uploadPetImage(image);
         toast.success("Фотогрфію успішно завантажено");
      }

      const newPostId = v4();
      console.log();
      await APICreatePost({
         id: newPostId,
         imageURL: imageURL || "",
         petAge,
         petType: resultPetType,
         needs,
         authorRole: currentUser.data.role,
         shelterID: currentUser.data.shelterID || "",
         userID: currentUser.data.shelterID ? "" : currentUser.data.id,
         ...data
      });
      toast.success("Обʼяву успішно створено");
      navigate(routes.home);
   };

   return (
      <section className="containerX pt-8">
         <form
            className="max-w-[450px] mx-auto space-y-2"
            onSubmit={handleSubmit(onSubmit)}
         >
            <h2>Створення нової обʼяви</h2>
            <label className="block">
               <p>Назва обʼяви</p>
               <TextField.Root
                  placeholder="Загублений бобр"
                  {...register("title")}
               />
               {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
            </label>
            <div className="">
               <FilePicker setFileState={setImage} />
            </div>
            <div className="flex items-center gap-2">
               <span>Тип тварини</span>
               <Select.Root value={petType} onValueChange={setPetType}>
                  <Select.Trigger />
                  <Select.Content>
                     <Select.Group>
                        <Select.Item value="Пес">Пес</Select.Item>
                        <Select.Item value="Кіт">Кіт</Select.Item>
                     </Select.Group>
                     <Select.Separator />
                     <Select.Item value="zxc">Інший</Select.Item>
                  </Select.Content>
               </Select.Root>
               {petType === "zxc" && (
                  <div>
                     <TextField.Root
                        placeholder="Хомʼячок"
                        value={customPetType}
                        onChange={({ target }) =>
                           setCustomPetType(target.value)
                        }
                     />
                  </div>
               )}
            </div>
            <label className="flex items-center gap-2">
               <p>Вік тварини: </p>
               <Select.Root value={petAge} onValueChange={setPetAge}>
                  <Select.Trigger />
                  <Select.Content>
                     <Select.Group>
                        <Select.Item value="less1">Менше 1 року</Select.Item>
                        <Select.Item value="more1">Від 1 року</Select.Item>
                        <Select.Item value="more2">Від 2х років</Select.Item>
                        <Select.Item value="more4">Від 4х років</Select.Item>
                     </Select.Group>
                  </Select.Content>
               </Select.Root>
            </label>
            <label>
               <p>Чого потребує тварина?</p>
               <RadioCards.Root
                  value={needs}
                  onValueChange={setNeeds}
                  className="!flex !flex-col !gap-2"
               >
                  <RadioCards.Item value="shelter">
                     <b>Притулок</b>
                  </RadioCards.Item>
                  <RadioCards.Item value="owner">
                     <b>Хозяїна</b>
                  </RadioCards.Item>
                  <RadioCards.Item value="rescue">
                     <b>Порятунку</b>
                  </RadioCards.Item>
               </RadioCards.Root>
            </label>
            <div className="mt-4 block">
               <p className="flex items-center gap-1">
                  Опис обʼяви{" "}
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
            </div>
            <div className="flex justify-end gap-2">
               {currentUser?.data?.role && (
                  <Modal
                     trigger={
                        <Button variant="soft" color="gray" type="button">
                           Превʼю
                        </Button>
                     }
                     content={
                        <PostDetails
                           post={{
                              id: "oleg",
                              imageURL: imageSrcCopy || undefined,
                              authorRole: currentUser?.data?.role || petAge,
                              petType: resultPetType,
                              petAge,
                              needs,
                              title: previewTitle,
                              description: previewDescription,
                              shelterID: currentUser.data.shelterID || "",
                              userID: currentUser.data.shelterID
                                 ? ""
                                 : currentUser.data.id
                           }}
                        />
                     }
                  />
               )}

               <Button loading={isSubmitting}>Створити обʼяву</Button>
            </div>
         </form>
      </section>
   );
}

export { CreatePostPage };
