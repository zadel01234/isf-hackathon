import { Field, TextInput, TextArea, Select } from "../components/Field";
import { PROJECT_CATEGORIES } from "../data/options";

const MAX_OVERVIEW = 600;
const MAX_VALUE = 400;

export default function ProjectStep({ data, update, errors }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl text-paper">Project details</h2>
        <p className="text-sm text-muted mt-1">What are you bringing to build?</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Project name" required error={errors.projectName} htmlFor="projectName">
          <TextInput
            id="projectName"
            placeholder="e.g. Farmlink"
            value={data.projectName}
            onChange={(e) => update({ projectName: e.target.value })}
            error={errors.projectName}
          />
        </Field>

        <Field label="Project category" required error={errors.category} htmlFor="category">
          <Select
            id="category"
            value={data.category}
            onChange={(e) => update({ category: e.target.value })}
            error={errors.category}
          >
            <option value="">Select category</option>
            {PROJECT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        label="Brief solution overview & uniqueness"
        required
        error={errors.overview}
        htmlFor="overview"
        hint={`${data.overview.length}/${MAX_OVERVIEW} characters`}
      >
        <TextArea
          id="overview"
          placeholder="What does it do, and what makes it different from what already exists?"
          value={data.overview}
          maxLength={MAX_OVERVIEW}
          onChange={(e) => update({ overview: e.target.value })}
          error={errors.overview}
        />
      </Field>

      <Field
        label="Value proposition"
        required
        error={errors.valueProposition}
        htmlFor="valueProposition"
        hint={`Why should your project be selected? · ${data.valueProposition.length}/${MAX_VALUE} characters`}
      >
        <TextArea
          id="valueProposition"
          placeholder="Make the case for your team."
          value={data.valueProposition}
          maxLength={MAX_VALUE}
          onChange={(e) => update({ valueProposition: e.target.value })}
          error={errors.valueProposition}
        />
      </Field>
    </div>
  );
}
