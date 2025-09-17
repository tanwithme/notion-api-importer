import { renderInline } from "./inline";

/**
 * Convert a Notion block into a Markdown string. Handles headings,
 * paragraphs, lists, to‑dos, quotes, code blocks, dividers, callouts
 * and toggles. Unrecognized block types return an empty string.
 * @param block The Notion block object
 * @param indent Indentation level (used for nested lists)
 */
export function renderBlock(block: any, indent = 0): string {
  const prefix = indent > 0 ? " ".repeat(indent) : "";
  const type = block.type;
  switch (type) {
    case "heading_1":
      return `# ${renderInline(block.heading_1.rich_text)}\n\n`;
    case "heading_2":
      return `## ${renderInline(block.heading_2.rich_text)}\n\n`;
    case "heading_3":
      return `### ${renderInline(block.heading_3.rich_text)}\n\n`;
    case "paragraph":
      return `${renderInline(block.paragraph.rich_text)}\n\n`;
    case "bulleted_list_item":
      return `${prefix}- ${renderInline(block.bulleted_list_item.rich_text)}\n`;
    case "numbered_list_item":
      return `${prefix}1. ${renderInline(block.numbered_list_item.rich_text)}\n`;
    case "to_do":
      const checked = block.to_do.checked;
      return `${prefix}- [${checked ? "x" : " "}] ${renderInline(block.to_do.rich_text)}\n`;
    case "quote":
      return `${prefix}> ${renderInline(block.quote.rich_text)}\n\n`;
    case "code":
      const lang = block.code.language || "";
      const codeText = block.code.rich_text.map((t: any) => t.plain_text).join("");
      return `\u0060\u0060\u0060${lang}\n${codeText}\n\u0060\u0060\u0060\n\n`;
    case "divider":
      return `---\n\n`;
    case "callout":
      // Use note style callout; icon is ignored
      return `> [!note] ${renderInline(block.callout.rich_text)}\n\n`;
    case "toggle":
      const summary = renderInline(block.toggle.rich_text);
      return `<details><summary>${summary}</summary></details>\n\n`;
    default:
      return "";
  }
}
