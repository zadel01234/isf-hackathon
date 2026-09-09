const STEPS = [
  { label: "Personal Info" },
  { label: "Academic & Experience" },
  { label: "Project Details" },
  { label: "Team Structure" },
  { label: "Review & Terms" },
];

export default function Stepper({ current }) {
  return (
    <>
      {/* Desktop vertical rail */}
      <ol className="hidden md:flex flex-col gap-0.5">
        {STEPS.map((step, i) => {
          const state = i < current ? "done" : i === current ? "active" : "upcoming";
          return (
            <li key={step.label} className="flex gap-4 py-3">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm border transition-colors ${
                    state === "active"
                      ? "border-gold text-gold"
                      : state === "done"
                      ? "border-signal text-signal"
                      : "border-ink-line text-muted"
                  }`}
                >
                  {state === "done" ? (
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6.2l2.6 2.6L10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                {i < STEPS.length - 1 && (
                  <span className={`w-px flex-1 mt-1 ${state === "done" ? "bg-signal" : "bg-ink-line"}`} />
                )}
              </div>
              <div className="pt-1">
                <p className={`text-sm font-medium ${state === "upcoming" ? "text-muted" : "text-paper"}`}>
                  {step.label}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Mobile horizontal progress */}
      <ol className="flex md:hidden items-center gap-2">
        {STEPS.map((step, i) => {
          const state = i < current ? "done" : i === current ? "active" : "upcoming";
          return (
            <li key={step.label} className="flex-1">
              <div
                className={`h-1.5 rounded-full ${
                  state === "upcoming" ? "bg-ink-line" : state === "active" ? "bg-gold" : "bg-signal"
                }`}
              />
            </li>
          );
        })}
      </ol>
      <p className="md:hidden text-xs text-muted mt-2">
        Step {current + 1} of {STEPS.length} · {STEPS[current].label}
      </p>
    </>
  );
}

export { STEPS };
