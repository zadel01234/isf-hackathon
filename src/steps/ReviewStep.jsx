import { Checkbox } from "../components/Field";
import { TERMS_SECTIONS } from "../data/terms";

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-ink-line/60 last:border-0">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="text-sm text-paper text-right max-w-[65%]">{value || "—"}</dd>
    </div>
  );
}

export default function ReviewStep({ data, update, errors, onEditStep }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl text-paper">Review & terms</h2>
        <p className="text-sm text-muted mt-1">Check your details, then accept the terms to submit.</p>
      </div>

      <div className="rounded-md border border-ink-line divide-y divide-ink-line overflow-hidden">
        <SummaryBlock title="Personal information" onEdit={() => onEditStep(0)}>
          <SummaryRow label="Full name" value={data.fullName} />
          <SummaryRow label="Gender" value={data.gender} />
          <SummaryRow label="Country" value={data.country} />
          <SummaryRow label="City / State" value={data.city} />
          <SummaryRow label="Region" value={data.region} />
        </SummaryBlock>

        <SummaryBlock title="Academic & experience" onEdit={() => onEditStep(1)}>
          <SummaryRow label="Student?" value={data.isStudent} />
          {data.isStudent === "Yes" && <SummaryRow label="Institution" value={data.institution} />}
          <SummaryRow label="Prior hackathon experience?" value={data.hasExperience} />
          <SummaryRow label="Available for Nov 2026 final?" value={data.finalAvailability ? "Confirmed" : "—"} />
        </SummaryBlock>

        <SummaryBlock title="Project details" onEdit={() => onEditStep(2)}>
          <SummaryRow label="Project name" value={data.projectName} />
          <SummaryRow label="Category" value={data.category} />
          <SummaryRow label="Overview" value={truncate(data.overview)} />
          <SummaryRow label="Value proposition" value={truncate(data.valueProposition)} />
        </SummaryBlock>

        <SummaryBlock title="Team" onEdit={() => onEditStep(3)}>
          <SummaryRow label="Has team?" value={data.hasTeam} />
          {data.hasTeam === "Yes" && <SummaryRow label="Team size" value={data.teamSize} />}
        </SummaryBlock>
      </div>

      <div>
        <p className="text-sm font-medium text-paper mb-2">Terms & conditions</p>
        <div className="rounded-md border border-ink-line bg-ink px-4 py-3 max-h-56 overflow-y-auto flex flex-col gap-3">
          {TERMS_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-medium text-gold">{section.title}</p>
              <p className="text-xs text-paper-dim leading-relaxed mt-0.5">{section.body}</p>
            </div>
          ))}
        </div>
      </div>

      <Checkbox
        id="acceptedTerms"
        label="I have read and agree to the BuildAthon 2026 terms and conditions above."
        checked={data.acceptedTerms}
        onChange={(e) => update({ acceptedTerms: e.target.checked })}
        error={errors.acceptedTerms}
      />
    </div>
  );
}

function SummaryBlock({ title, onEdit, children }) {
  return (
    <div className="px-4 py-3 bg-ink-soft">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-medium text-paper-dim">{title}</p>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs text-gold hover:text-gold-soft transition-colors"
        >
          Edit
        </button>
      </div>
      <dl>{children}</dl>
    </div>
  );
}

function truncate(text, max = 90) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
}
