function MardownGuide() {
   return (
      <div>
         <h2>Мова Markdown</h2>
         <p className="text-(--gray-10)">Приклад використання:</p>
         <p className="bg-(--color-surface) border border-(--gray-6) p-2">
            <h1># Heading 1</h1>
            <h2>## Heading 2 </h2>
            <b>**Bold**</b>
            <em>*Italic*</em>
            <code>`code`</code>
            <p>- Buller list</p>
            <p>1. Numbered list</p>
            <u>[Link](https://example.com) </u>
         </p>
      </div>
   );
}

export { MardownGuide };
