import { Client } from "@notionhq/client";
import { DiscoveryResult } from "../types";

/**
 * Discover pages and databases visible to the integration. This stub returns
 * empty arrays; full discovery will require pagination through the Notion API.
 */
export async function discoverWorkspace(client: Client): Promise<DiscoveryResult> {
  return { pages: [], databases: [] };
}
