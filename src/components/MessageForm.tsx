import { Button, TextArea } from "@radix-ui/themes";
import { Modal } from "./theme/Modal";
import { MardownGuide } from "./MardownGuide";
import { Shelter } from "../api/mutations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
type MessageFormProps = {
   shelter: Shelter;
};

const messageSchema = yup.object({
   content: yup.string().required("Contacts field is required")
});

function MessageForm({ shelter }: MessageFormProps) {
   const { register } = useForm<{ content: string }>({
      resolver: yupResolver(messageSchema)
   });

   return (
      <form className="-m-2">
         <p className="flex items-center gap-1">
            Повідомлення{" "}
            <Modal
               trigger={
                  <Button variant="ghost" type="button">
                     (Markdown <i className="pi pi-info-circle" /> )
                  </Button>
               }
               content={<MardownGuide />}
            />
         </p>
         <p className="text-(--gray-10)">
            Адресат: <b>{shelter.name}</b>
         </p>

         <label>
            <TextArea {...register("content")} />
            {}
         </label>
      </form>
   );
}

export { MessageForm };
