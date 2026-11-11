import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EUROPEAN_COUNTRIES } from '@/lib/demo/config';
import { cn } from '@/lib/utils';

export function Field({ id, label, hint, error, children }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({ id, error, className, ...props }) {
  return (
    <Input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={cn('h-10', error && 'border-destructive', className)}
      {...props}
    />
  );
}

export function SelectInput({ id, error, className, children, ...props }) {
  return (
    <select
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-destructive',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function TextArea({ id, error, className, ...props }) {
  return (
    <textarea
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={cn(
        'flex min-h-28 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-destructive',
        className,
      )}
      {...props}
    />
  );
}

export function CountryOptions() {
  return EUROPEAN_COUNTRIES.map((country) => (
    <option key={country} value={country}>
      {country}
    </option>
  ));
}
