import { Spinner } from "@radix-ui/themes";
import { useState } from "react";

type ImageWithLoaderProps = {
   src: string;
};

const ImageWithLoader = ({ src }: ImageWithLoaderProps) => {
   const [isLoaded, setIsLoaded] = useState(false);

   const handleLoad = () => {
      setIsLoaded(true);
   };

   return (
      <div className={`h-full w-full`}>
         {!isLoaded && (
            <div className="flex items-center justify-center h-full">
               <Spinner size="3" />
            </div>
         )}
         <img
            src={src}
            onLoad={handleLoad}
            className={`object-cover h-full w-full transition ${
               isLoaded ? "opacity-100" : "opacity-0"
            }`}
         />
      </div>
   );
};

export { ImageWithLoader };
