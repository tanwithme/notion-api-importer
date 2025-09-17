import { App } from "obsidian";
import { Client } from "@notionhq/client";
import { createNotionClient } from "./notion-api/client";
import { ImportOptions } from "./types";
import { discoverWorkspace } from "./notion-api/discovery";
import { renderPage } from "./notion-api/render/page";
import { mapProperties } from "./notion-api/mapping/properties";
import { slugify } from "./notion-api/util";

/**
 * Import pages from Notion into the current Obsidian vault. This function
 * discovers pages via the Notion API, converts each page into Markdown
 * with frontmatter, and writes them into a "Notion Import" folder in
 * the user's vault. Attachments and databases are not yet supported.
 */
export async function importFromNotion(
  app: App,
  token: string,
  options: ImportOptions
): Promise<void> {
  const notion: Client = createNotionClient(token);
  // Discover pages (databases ignored for now)
  const { pages } = await discoverWorkspace(notion);
  // Ensure import folder exists
  const importFolder = "Notion Import";
  // Create folder if it doesn't exist
  try {
    await app.vault.adapter.mkdir(importFolder);
  } catch (e) {
    // Folder may already exist; ignore errors
  }
  for (const page of pages) {
    try {
      // Retrieve full page to access properties
      const pageObj: any = await notion.pages.retrieve({ page_id: page.id });
      const properties = mapProperties(pageObj.properties);
      // Render page content
      const { markdown, slug } = await renderPage(notion, page);
      // Build YAML frontmatter
      const frontmatterLines: string[] = ["---"];
      for (const key of Object.keys(properties)) {
        const value = properties[key];
        if (Array.isArray(value)) {
          if (value.length === 0) continue;
          frontmatterLines.push(`${key}:`);
          for (const item of value) {
            frontmatterLines.push(`  - ${item}`);
          }
        } else if (value === undefined || value === null) {
          continue;
        } else {
          frontmatterLines.push(`${key}: ${value}`);
        }
      }
      frontmatterLines.push("---\n");
      const content = frontmatterLines.join("\n") + markdown;
      const filename = `${slug || page.id}.md`;
      const filePath = `${importFolder}/${filename}`;
      // Write file to vault; if file exists, append a number
      let finalPath = filePath;
      let counter = 1;
      while (await app.vault.adapter.exists(finalPath)) {
        finalPath = `${importFolder}/${slug || page.id}-${counter}.md`;
        counter++;
      }
      await app.vault.create(finalPath, content);
      console.info(`Imported Notion page ${page.title || page.id} -> ${finalPath}`);
    } catch (err) {
      console.error(`Failed to import page ${page.id}`, err);
    }
  }
}
