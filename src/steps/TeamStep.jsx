import { Field, TextInput, ToggleGroup } from "../components/Field";

export default function TeamStep({ data, update, errors }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl text-paper">Team structure</h2>
        <p className="text-sm text-muted mt-1">Solo builders welcome too.</p>
      </div>

      <Field label="Do you have a team?" required error={errors.hasTeam}>
        <ToggleGroup
          value={data.hasTeam}
          onChange={(v) => update({ hasTeam: v, teamSize: v === "No" ? "" : data.teamSize })}
        />
      </Field>

      {data.hasTeam === "Yes" && (
        <Field label="Team size" required error={errors.teamSize} htmlFor="teamSize" hint="Including yourself">
          <TextInput
            id="teamSize"
            type="number"
            min="2"
            max="10"
            placeholder="e.g. 4"
            value={data.teamSize}
            onChange={(e) => update({ teamSize: e.target.value })}
            error={errors.teamSize}
            className="max-w-[140px]"
          />
        </Field>
      )}
    </div>
  );
}
