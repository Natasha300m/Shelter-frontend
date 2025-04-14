function MardownGuide() {
   return (
      <div>
         <p className="text-(--gray-10)">Приклад використання мови Markdown:</p>
         <p className="bg-(--color-surface) border border-(--gray-6) p-2 space-y-2 mt-2">
            <h2>## Heading 2</h2>
            <h3>### Heading 3 </h3>
            <p>
               <b>**Bold**</b> <em>*Italic*</em>
            </p>
            <p>
               <code>`code`</code>
            </p>
            <p>- Buller list</p>
            <p>1. Numbered list</p>
            <u>[Link](https://example.com) </u>
         </p>
      </div>
   );
}

export { MardownGuide };
