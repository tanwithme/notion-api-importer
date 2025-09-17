import { Client } from "@notionhq/client";
import { DiscoveryResult, PageStub, DatabaseStub } from "../types";

/**
 * Discover pages and databases visible to the integration.
 * Uses Notion search and databases.list with pagination.
 */
export async function discoverWorkspace(client: Client): Promise<DiscoveryResult> {
  const pages: PageStub[] = [];
  const databases: DatabaseStub[] = [];

  // Discover databases
  let dbCursor: string | undefined = undefined;
  do {
    const response = await client.databases.list({ start_cursor: dbCursor });
    for (const db of response.results) {
      const titleArray: any = (db as any).title;
      const title = Array.isArray(titleArray) && titleArray.length > 0 ? titleArray.map((t: any) => t.plain_text).join("") : undefined;
      databases.push({ id: db.id, title });
    }
    dbCursor = response.has_more ? (response.next_cursor as string | undefined) : undefined;
  } while (dbCursor);

  // Discover pages via search (filter object type page)
  let pageCursor: string | undefined = undefined;
  do {
    const res: any = await client.search({
      start_cursor: pageCursor,
      page_size: 100,
      filter: { value: "page", property: "object" }
    });
    for (const result of res.results) {
      if (result.object === "page") {
        let title: string | undefined = undefined;
        const properties: any = (result as any).properties;
        if (properties) {
          for (const key of Object.keys(properties)) {
            const prop: any = properties[key];
            if (prop.type === "title") {
              const texts = prop.title;
              if (Array.isArray(texts) && texts.length > 0) {
                title = texts.map((t: any) => t.plain_text).join("");
              }
              break;
            }
          }
        }
        pages.push({ id: result.id, title });
      }
    }
    pageCursor = res.has_more ? (res.next_cursor as string | undefined) : undefined;
  } while (pageCursor);

  return { pages, databases };
}
