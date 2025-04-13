import { Modal } from "../../../components/theme/Modal";
import { Button, ScrollArea, TextArea } from "@radix-ui/themes";
import { MardownGuide } from "../../../components/MardownGuide";
import { useForm } from "react-hook-form";
import { ErrorText } from "../../../components/ErrorText";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIUpdateUser } from "../../../api/mutations";
import { useAtomValue } from "jotai";
import { currentUserAtom, currentUserIdAtom } from "../../../store/atoms";
import { queryKeys } from "../../../global/config/queryKeys";
import { useState } from "react";
import Markdown from "react-markdown";
import toast from "react-hot-toast";

const volenteerSchema = yup.object({
   contacts: yup.string().required("Contacts field is required")
});

function Volunteer() {
   const currentUser = useAtomValue(currentUserAtom);

   const {
      register,
      handleSubmit,
      formState: { errors },
      getValues
   } = useForm<{ contacts: string }>({
      resolver: yupResolver(volenteerSchema),
      defaultValues: {
         contacts: currentUser?.data?.contacts
      }
   });

   const currentUserId = useAtomValue(currentUserIdAtom);

   const queryClient = useQueryClient();

   const { mutate, isPending } = useMutation({
      mutationFn: APIUpdateUser,
      onSuccess: (id) => {
         toast.success("Інформацію успішно оновлено");
         if (id)
            queryClient.invalidateQueries({ queryKey: queryKeys.user(id) });
      }
   });

   const onSubmit = async (data: { contacts: string }) => {
      mutate({
         id: currentUserId,
         role: "VOLUNTEER",
         ...data
      });
   };

   const [isPreview, setIsPreview] = useState(false);

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div>
            <p className="flex items-center gap-1">
               Ваша контактна інформація{" "}
               <Modal
                  trigger={
                     <Button variant="ghost">
                        (Markdown <i className="pi pi-info-circle" /> )
                     </Button>
                  }
                  content={<MardownGuide />}
               />
            </p>
            <div className="mt-1">
               {!isPreview ? (
                  <>
                     <TextArea
                        placeholder="# Мова Markdown"
                        className="!h-40"
                        {...register("contacts")}
                     />
                     {errors.contacts && (
                        <ErrorText>{errors.contacts.message}</ErrorText>
                     )}
                  </>
               ) : (
                  <ScrollArea className="!h-40">
                     <Markdown>{getValues("contacts")}</Markdown>
                  </ScrollArea>
               )}
            </div>
         </div>
         <div className="mt-2 flex justify-end gap-2">
            <Button
               variant="soft"
               color="gray"
               onClick={(e) => {
                  e.preventDefault;
                  setIsPreview((isP) => !isP);
               }}
               type="button"
            >
               {!isPreview ? "Превью" : "Редагувати"}
            </Button>
            <Button loading={isPending} type="submit">
               Підтвердити
            </Button>
         </div>
      </form>
   );
}

export default Volunteer;
