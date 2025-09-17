import { Client } from "@notionhq/client";
import { PageStub } from "../../types";

/**
 * Render a page into Markdown and return its slug. Real implementation
 * should fetch block children and iterate through them.
 */
export async function renderPage(
  client: Client,
  page: PageStub
): Promise<{ markdown: string; slug: string }> {
  const slug = page.title ? page.title.replace(/\s+/g, "-") : page.id;
  const markdown = `# ${page.title || page.id}\n\n*Content not yet implemented*`;
  return { markdown, slug };
}
