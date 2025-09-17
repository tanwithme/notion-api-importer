/**
 * Render a set of Notion table rows into a Markdown table.
 * Each row contains a `cells` property with an array of rich text arrays.
 * The first row is treated as the header. Subsequent rows are table body.
 * @param rows Table row blocks from the Notion API
 */
import { renderInline } from "./inline";

export function renderTable(rows: any[]): string {
  if (!rows || rows.length === 0) return "";
  // Extract header cells from the first row
  const headerRow = rows[0];
  const headerCells: string[] = headerRow.cells.map((cell: any[]) => renderInline(cell));
  const headerLine = `| ${headerCells.join(" | ")} |`;
  const separatorLine = `| ${headerCells.map(() => "---").join(" | ")} |`;
  const bodyLines: string[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.cells.map((cell: any[]) => renderInline(cell));
    bodyLines.push(`| ${cells.join(" | ")} |`);
  }
  return [headerLine, separatorLine, ...bodyLines].join("\n");
}
