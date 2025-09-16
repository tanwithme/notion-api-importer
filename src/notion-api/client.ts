import { Client } from "@notionhq/client";

/**
 * Create a Notion client from an integration token. This token should have
 * read-only permissions on the workspace you intend to import.
 */
export function createNotionClient(token: string): Client {
  return new Client({ auth: token });
}
