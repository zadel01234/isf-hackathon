export default function SuccessScreen({ fullName, projectName, onReset }) {
  return (
    <div className="flex flex-col items-start gap-6 py-4">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-signal text-signal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 12.5l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div>
        <h2 className="font-display text-3xl text-paper">Application received</h2>
        <p className="text-sm text-paper-dim mt-3 max-w-md leading-relaxed">
          Thanks{fullName ? `, ${fullName.split(" ")[0]}` : ""} — "{projectName || "Your project"}" is in. We review
          applications on a rolling basis and will email you about the final stage in November 2026.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="text-sm font-medium text-gold hover:text-gold-soft transition-colors underline underline-offset-4"
      >
        Submit another application
      </button>
    </div>
  );
}
