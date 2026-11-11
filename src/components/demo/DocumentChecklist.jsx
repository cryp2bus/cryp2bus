import { Button } from '@/components/ui/button';
import { KYB_DOCUMENTS } from '@/lib/demo/config';
import { formatBytes } from '@/lib/demo/format';

function attachmentFor(documents, requirementId) {
  return documents.find((item) => item.requirementId === requirementId && item.name) || null;
}

export default function DocumentChecklist({ documents, onChange }) {
  const replace = (requirementId, next) => {
    const rest = documents.filter((item) => item.requirementId !== requirementId);
    onChange(next ? [...rest, next] : rest);
  };

  const onFile = (requirementId, file) => {
    if (!file) return;
    replace(requirementId, {
      id: crypto.randomUUID(),
      requirementId,
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
      placeholder: false,
    });
  };

  const fillPlaceholders = () => {
    const next = KYB_DOCUMENTS.map((item) => {
      const existing = attachmentFor(documents, item.id);
      if (existing) return existing;
      return {
        id: crypto.randomUUID(),
        requirementId: item.id,
        name: `${item.id}-placeholder.pdf`,
        size: 0,
        type: 'application/pdf',
        placeholder: true,
      };
    });
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Files stay in this browser as a name and size only. Nothing is uploaded.
        </p>
        <Button type="button" variant="outline" size="sm" onClick={fillPlaceholders}>
          Use placeholder names
        </Button>
      </div>
      <ul className="space-y-3">
        {KYB_DOCUMENTS.map((item) => {
          const attached = attachmentFor(documents, item.id);
          const inputId = `doc-${item.id}`;
          return (
            <li key={item.id} className="rounded-xl border border-border bg-background/40 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.hint}</p>
                  {attached ? (
                    <p className="mt-2 text-sm break-all">
                      {attached.name}
                      {attached.placeholder ? (
                        <span className="ml-2 text-xs text-muted-foreground">Placeholder</span>
                      ) : null}
                      {formatBytes(attached.size) ? (
                        <span className="ml-2 text-xs text-muted-foreground">{formatBytes(attached.size)}</span>
                      ) : null}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">No file selected</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  <label
                    htmlFor={inputId}
                    className="inline-flex h-8 cursor-pointer items-center rounded-md border border-input px-3 text-xs font-medium hover:bg-secondary"
                  >
                    {attached ? 'Replace' : 'Choose file'}
                  </label>
                  <input
                    id={inputId}
                    className="sr-only"
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      onFile(item.id, file);
                      event.target.value = '';
                    }}
                  />
                  {attached ? (
                    <Button type="button" variant="ghost" size="sm" onClick={() => replace(item.id, null)}>
                      Remove
                    </Button>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
