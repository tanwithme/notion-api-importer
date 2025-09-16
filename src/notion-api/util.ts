/**
 * Slugify a string for use as a filename. Removes invalid characters and
 * collapses whitespace into hyphens.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
