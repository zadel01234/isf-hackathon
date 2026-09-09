export function Field({ label, hint, error, required, htmlFor, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-paper">
        {label}
        {required && <span className="text-rust ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted">{hint}</p>}
      {error && <p className="text-xs text-rust">{error}</p>}
    </div>
  );
}

export function TextInput({ id, error, className = "", ...props }) {
  return (
    <input
      id={id}
      className={`field-input rounded-md px-3.5 py-2.5 text-sm transition-colors placeholder:text-muted ${
        error ? "border-rust" : ""
      } ${className}`}
      {...props}
    />
  );
}

export function TextArea({ id, error, className = "", ...props }) {
  return (
    <textarea
      id={id}
      className={`field-input rounded-md px-3.5 py-2.5 text-sm transition-colors placeholder:text-muted resize-y min-h-[120px] ${
        error ? "border-rust" : ""
      } ${className}`}
      {...props}
    />
  );
}

export function Select({ id, error, className = "", children, ...props }) {
  return (
    <div className="relative">
      <select
        id={id}
        className={`field-input appearance-none rounded-md px-3.5 py-2.5 pr-9 text-sm w-full transition-colors ${
          error ? "border-rust" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function ToggleGroup({ value, onChange, options = ["Yes", "No"], name }) {
  return (
    <div className="inline-flex rounded-md border border-ink-line overflow-hidden w-fit">
      {options.map((opt, i) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            name={name}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
              active ? "bg-gold text-ink" : "bg-transparent text-paper-dim hover:text-paper"
            } ${i > 0 ? "border-l border-ink-line" : ""}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export function Checkbox({ id, label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group">
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
            props.checked ? "bg-gold border-gold" : "border-ink-line group-hover:border-gold-soft"
          }`}
        >
          {props.checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6.2l2.6 2.6L10 3" stroke="#10131A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <input id={id} type="checkbox" className="sr-only" {...props} />
        <span className="text-sm text-paper-dim leading-snug">{label}</span>
      </label>
      {error && <p className="text-xs text-rust pl-8">{error}</p>}
    </div>
  );
}
