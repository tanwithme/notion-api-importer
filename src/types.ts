/**
 * Options controlling how the Notion import behaves.
 */
export interface ImportOptions {
  vaultPath?: string;
  attachmentsDir?: string;
}

/**
 * Lightweight representation of a discovered page.
 */
export interface PageStub {
  id: string;
  title?: string;
}

/**
 * Lightweight representation of a discovered database.
 */
export interface DatabaseStub {
  id: string;
  title?: string;
}

/**
 * Result of workspace discovery. Stubs can be extended later.
 */
export interface DiscoveryResult {
  pages: PageStub[];
  databases: DatabaseStub[];
}
