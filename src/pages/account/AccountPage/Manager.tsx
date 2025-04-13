import { Button, Select, Spinner, TextArea, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { APICreateShelter, APIUpdateUser } from "../../../api/mutations";

import { v4 } from "uuid";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUserAtom, currentUserIdAtom } from "../../../store/atoms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../global/config/queryKeys";
import { ErrorText } from "../../../components/ErrorText";
import { Modal } from "../../../components/theme/Modal";
import { MardownGuide } from "../../../components/MardownGuide";
import { APIGetAllShelters } from "../../../api/queries";

const managerSchema = yup.object({
   name: yup
      .string()
      .required("Name is required")
      .max(20, "Name must be at most 20 characters"),
   location: yup
      .string()
      .required("City is required")
      .max(20, "City must be at most 20 characters"),
   contacts: yup.string().required("Contacts field is required")
});

export type ManagerFormData = yup.InferType<typeof managerSchema>;

function Manager() {
   const currentUser = useAtomValue(currentUserAtom);

   const [shelterId, setShelterId] = useState(currentUser?.data?.shelterID);

   const {
      register,
      handleSubmit,
      formState: { errors },
      getValues
   } = useForm<ManagerFormData>({ resolver: yupResolver(managerSchema) });

   const [isPreview, setIsPreview] = useState(false);

   const currentUserId = useAtomValue(currentUserIdAtom);

   const queryClient = useQueryClient();

   const onNewShelterSubmit = async (data: ManagerFormData) => {
      const newShelterId = v4();
      await APICreateShelter({ id: newShelterId, ...data });
      toast.success("Притулок успішно створено");
      await APIUpdateUser({
         id: currentUserId,
         shelterID: newShelterId,
         role: "MANAGER"
      });
      toast.success("Інформацію успішно оновлено");
      queryClient.invalidateQueries({
         queryKey: queryKeys.user(currentUserId)
      });
      queryClient.invalidateQueries({
         queryKey: queryKeys.shelters
      });
      setShelterId(newShelterId);
   };

   const onExistingShelterSubmit = async () => {
      await APIUpdateUser({
         id: currentUserId,
         shelterID: shelterId,
         role: "MANAGER"
      });
   };

   const { mutate, isPending } = useMutation({
      mutationFn: onExistingShelterSubmit
   });

   const { data: shelters, isPending: isSheltersPending } = useQuery({
      queryKey: queryKeys.shelters,
      queryFn: APIGetAllShelters
   });

   return (
      <>
         <label className="flex flex-col md:flex-row gap-2 items-center">
            <p>Оберіть притулок в якому працюєте:</p>
            {isSheltersPending && <Spinner size="3" />}
            {!isSheltersPending && shelters && (
               <Select.Root
                  value={shelterId}
                  onValueChange={setShelterId}
                  disabled={currentUser?.data?.shelterID ? true : false}
               >
                  <Select.Trigger />
                  <Select.Content>
                     <Select.Group>
                        {shelters.map((shelter) => (
                           <Select.Item value={shelter.id}>
                              {shelter.name} {shelter.location}
                           </Select.Item>
                        ))}
                     </Select.Group>
                     <Select.Separator />
                     <Select.Item value="zxc">Інший</Select.Item>
                  </Select.Content>
               </Select.Root>
            )}
         </label>

         {shelterId === "zxc" && (
            <form onSubmit={handleSubmit(onNewShelterSubmit)}>
               <div className="flex flex-col">
                  <label className="mt-2">
                     <p>Назва</p>
                     <TextField.Root
                        {...register("name")}
                        placeholder="Притулок для бездомних"
                     />
                     {errors.name && (
                        <ErrorText>{errors.name.message}</ErrorText>
                     )}
                  </label>
                  <label className="mt-2">
                     <p>Місто</p>
                     <TextField.Root
                        {...register("location")}
                        placeholder="м. Київ"
                     />
                     {errors.location && (
                        <ErrorText>{errors.location.message}</ErrorText>
                     )}
                  </label>
                  <div className="mt-2">
                     <p className="flex items-center gap-1">
                        Контактна інформація{" "}
                        <Modal
                           trigger={
                              <Button variant="ghost">
                                 (Markdown <i className="pi pi-info-circle" /> )
                              </Button>
                           }
                           content={<MardownGuide />}
                        />
                     </p>
                     <TextArea {...register("contacts")} className="!h-40" />
                     {errors.contacts && (
                        <ErrorText>{errors.contacts.message}</ErrorText>
                     )}
                  </div>
               </div>
               <div className="mt-4 flex justify-end gap-2">
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

                  <Button type="submit">Підтвердити</Button>
               </div>
            </form>
         )}

         {shelterId !== "zxc" && (
            <div className="flex justify-center mt-4">
               <Button onClick={() => mutate()} loading={isPending}>
                  Підтвердити
               </Button>
            </div>
         )}
      </>
   );
}

export { Manager };
