/**
 * Convert a Notion block into a Markdown string. This stub simply stringifies
 * the block; real rendering would switch on block.type and format accordingly.
 */
export function renderBlock(block: any): string {
  return JSON.stringify(block);
}
