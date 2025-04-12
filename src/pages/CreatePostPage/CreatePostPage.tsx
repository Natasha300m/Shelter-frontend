import { Select, TextArea, TextField } from "@radix-ui/themes";
import { useState } from "react";

function CreatePostPage() {
   const [petType, setPetType] = useState("Dog");
   const [customPetType, setCustomPetType] = useState("");

   const resultPetType = petType !== "Other" ? petType : customPetType;

   return (
      <section className="containerX pt-8">
         <div className="flex items-center gap-2">
            <span>Тип тварини</span>
            <Select.Root value={petType} onValueChange={setPetType}>
               <Select.Trigger />
               <Select.Content>
                  <Select.Group>
                     <Select.Item value="Dog">Пес</Select.Item>
                     <Select.Item value="Cat">Кіт</Select.Item>
                  </Select.Group>
                  <Select.Separator />
                  <Select.Item value="Other">Інший</Select.Item>
               </Select.Content>
            </Select.Root>
            {petType === "Other" && (
               <div>
                  <TextField.Root
                     placeholder="Хомʼячок"
                     onChange={({ target }) => setCustomPetType(target.value)}
                  />
               </div>
            )}
         </div>
         <div className="mt-4">
            <TextField.Root placeholder="Бобр" />
         </div>
         <div className="mt-4">
            <TextArea placeholder="Бобр" />
         </div>
         <p>Result: {resultPetType}</p>
      </section>
   );
}

export { CreatePostPage };
