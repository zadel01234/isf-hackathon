import { Field, TextInput, ToggleGroup, Checkbox } from "../components/Field";

export default function AcademicStep({ data, update, errors }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl text-paper">Academic & experience profile</h2>
        <p className="text-sm text-muted mt-1">A little about your background so far.</p>
      </div>

      <Field label="Are you a student?" required error={errors.isStudent}>
        <ToggleGroup
          value={data.isStudent}
          onChange={(v) => update({ isStudent: v, institution: v === "No" ? "" : data.institution })}
        />
      </Field>

      {data.isStudent === "Yes" && (
        <Field label="Institution / University" required error={errors.institution} htmlFor="institution">
          <TextInput
            id="institution"
            placeholder="e.g. University of Ibadan"
            value={data.institution}
            onChange={(e) => update({ institution: e.target.value })}
            error={errors.institution}
          />
        </Field>
      )}

      <Field label="Previous hackathon experience?" required error={errors.hasExperience}>
        <ToggleGroup value={data.hasExperience} onChange={(v) => update({ hasExperience: v })} />
      </Field>

      <Checkbox
        id="finalAvailability"
        label="I confirm I'll be available for the final stage in November 2026."
        checked={data.finalAvailability}
        onChange={(e) => update({ finalAvailability: e.target.checked })}
        error={errors.finalAvailability}
      />
    </div>
  );
}
