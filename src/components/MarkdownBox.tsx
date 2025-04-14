import { ScrollArea } from "@radix-ui/themes";
import Markdown from "react-markdown";

function MarkdownBox({ title, text }: { title: string; text: string }) {
   return (
      <div className="p-2 bg-(--accent-1) border-1 border-(--accent-6) rounded-(--radius-4) mt-1">
         <p className="text-(--accent-8)">{title}</p>
         <ScrollArea className="!h-40 !text-(--gray-11)">
            <Markdown>{text}</Markdown>
         </ScrollArea>
      </div>
   );
}

export { MarkdownBox };
