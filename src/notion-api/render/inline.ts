/**
 * Render inline rich text to Markdown. This stub returns the raw string or a
 * JSON representation of the given value.
 */
export function renderInline(text: any): string {
  return typeof text === "string" ? text : JSON.stringify(text);
}
