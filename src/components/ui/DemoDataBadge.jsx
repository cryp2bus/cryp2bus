/** Muted but legible marker for sections that show illustrative (non-real) figures or reviews. */
export default function DemoDataBadge({ className = "" }) {
  return (
    <span
      data-demo-data-label
      className={`inline-flex items-center rounded-md border border-border bg-secondary/60 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground ${className}`}
    >
      ДЕМО-ДАННЫЕ / DEMO DATA
    </span>
  );
}
