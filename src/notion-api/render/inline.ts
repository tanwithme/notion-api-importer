/**
 * Render an array of Notion rich text items into Obsidian‑flavoured Markdown.
 * Applies annotations (bold, italic, code, strikethrough, underline) and links.
 * @param rich An array of rich text objects from the Notion API
 */
export function renderInline(rich: any[]): string {
  if (!rich || !Array.isArray(rich)) return "";
  return rich
    .map((text) => {
      if (!text) return "";
      const content: string = text.plain_text || "";
      let result: string = content;
      const ann = text.annotations || {};
      // Apply code first to avoid nested formatting inside backticks
      if (ann.code) {
        result = `\`${result}\``;
      }
      if (ann.bold) {
        result = `**${result}**`;
      }
      if (ann.italic) {
        result = `_${result}_`;
      }
      if (ann.strikethrough) {
        result = `~~${result}~~`;
      }
      if (ann.underline) {
        // Use HTML underline to preserve formatting
        result = `<u>${result}</u>`;
      }
      if (text.href) {
        result = `[${result}](${text.href})`;
      }
      return result;
    })
    .join("");
}
