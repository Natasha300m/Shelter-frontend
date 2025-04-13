import { useMemo, useState } from "react";

type FileInputProps = {
   setFileState: (file: File) => void;
};

function FilePicker({ setFileState }: FileInputProps) {
   const [file, setfile] = useState<File | null>(null);

   const fileSrcCopy = useMemo(
      () => (file ? URL.createObjectURL(file) : null),
      [file]
   );

   const fileError = file ? file?.size > 2_000_000 : null;

   const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      if (target.files?.length && target.files[0]) {
         setfile(target.files[0]);
         if (!fileError) {
            setFileState(target.files[0]);
         }
      }
   };

   return (
      <label>
         <div
            className="border border-dashed border-(--accent-10) cursor-pointer h-60
     rounded-(--radius-4) flex flex-col gap-3
     justify-center items-center text-(--accent-10)
     hover:border-(--accent-11) hover:text-(--accent-11)"
         >
            {fileSrcCopy ? (
               <div className="h-full p-2">
                  <img
                     src={fileSrcCopy}
                     className="object-contain block h-full"
                  />
               </div>
            ) : (
               <>
                  <p className="pi pi-image text-5xl"></p>
                  <p className="font-bold">Додайте фото</p>
               </>
            )}
         </div>
         <input
            type="file"
            className="hidden"
            onChange={onChange}
            accept="file/*"
         />
         <p className="text-(--accent-10)">{file?.name}</p>
         {fileError && <p>file must be smaller than 2 megabytes</p>}
      </label>
   );
}

export { FilePicker };
