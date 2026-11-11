/** UTC calendar day (`YYYY-MM-DD`) used as the public publish date. */
export function utcPublishDate(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Publish dates are the UTC day an article is written.
 * A missing or future value falls back to today so content-plan dates
 * cannot land in `datePublished`.
 */
export function resolvePublishDate(requested?: string, now: Date = new Date()): string {
  const today = utcPublishDate(now);
  if (requested && ISO_DAY.test(requested) && requested <= today) return requested;
  return today;
}

const PUBLISHED_LINE = /^[ \t]*datePublished:\s*.+$/m;
const MODIFIED_LINE = /^[ \t]*dateModified:\s*.+$/m;

/**
 * Write `datePublished` and `dateModified` inside MDX frontmatter.
 * `plannedDate` on the content plan only orders the queue. Published
 * articles use the UTC day they are generated. Safe fallbacks do not
 * call this; they keep the date embedded in their filename.
 */
export function stampPublishDates(mdx: string, date: string): string {
  const fence = mdx.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fence) return mdx;

  let frontmatter = fence[1];
  const publishedLine = `datePublished: "${date}"`;
  const modifiedLine = `dateModified: "${date}"`;

  if (PUBLISHED_LINE.test(frontmatter)) {
    frontmatter = frontmatter.replace(PUBLISHED_LINE, publishedLine);
  } else {
    frontmatter = `${publishedLine}\n${frontmatter}`;
  }

  if (MODIFIED_LINE.test(frontmatter)) {
    frontmatter = frontmatter.replace(MODIFIED_LINE, modifiedLine);
  } else {
    frontmatter = frontmatter.replace(PUBLISHED_LINE, `${publishedLine}\n${modifiedLine}`);
  }

  return mdx.replace(fence[0], `---\n${frontmatter}\n---`);
}

export function readPublishedDate(mdx: string): string | null {
  const match = mdx.match(/^[ \t]*datePublished:\s*["']?(\d{4}-\d{2}-\d{2})["']?/m);
  return match?.[1] ?? null;
}
