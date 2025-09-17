import { Client } from "@notionhq/client";
import { PageStub } from "../../types";
import { renderBlock } from "./blocks";
import { slugify } from "../util";

/**
 * Render a Notion page into Markdown and return its slug.
 * Recursively fetches child blocks and converts them using renderBlock.
 * @param client Notion API client
 * @param page A page stub with id and title
 */
export async function renderPage(
  client: Client,
  page: PageStub
): Promise<{ markdown: string; slug: string }> {
  const slug = page.title ? slugify(page.title) : page.id;
  const lines: string[] = [];
  // Add H1 heading for the page title, if available
  if (page.title) {
    lines.push(`# ${page.title}\n\n`);
  }
  // Helper to render children recursively
  async function renderChildren(blockId: string, indent = 0): Promise<void> {
    let cursor: string | undefined = undefined;
    do {
      const res: any = await client.blocks.children.list({ block_id: blockId, start_cursor: cursor });
      for (const block of res.results) {
        lines.push(renderBlock(block, indent));
        if (block.has_children) {
          await renderChildren(block.id, indent + 2);
        }
      }
      cursor = res.has_more ? (res.next_cursor as string | undefined) : undefined;
    } while (cursor);
  }
  // Render top‑level blocks
  await renderChildren(page.id);
  const markdown = lines.join("");
  return { markdown, slug };
}
