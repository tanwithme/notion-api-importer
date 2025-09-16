import { App } from "obsidian";
import { Client } from "@notionhq/client";
import { createNotionClient } from "./notion-api/client";
import { ImportOptions } from "./types";

/**
 * Stub implementation for the Notion importer. This connects to Notion using
 * the provided token and logs a confirmation. Future work should discover
 * pages/databases and convert them to Markdown and Bases.
 */
export async function importFromNotion(
  app: App,
  token: string,
  options: ImportOptions
): Promise<void> {
  const notion: Client = createNotionClient(token);
  // Example API call to verify authentication
  await notion.users.me({});
  console.info("Connected to Notion API; import logic not yet implemented.");
}
