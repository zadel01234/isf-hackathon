import { Field, TextInput, Select } from "../components/Field";
import { GENDERS, COUNTRIES, REGIONS_BY_COUNTRY, REGIONAL_LOCATIONS } from "../data/options";

export default function PersonalInfoStep({ data, update, errors }) {
  const regionOptions = REGIONS_BY_COUNTRY[data.country];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl text-paper">Personal information</h2>
        <p className="text-sm text-muted mt-1">Tell us who's building.</p>
      </div>

      <Field label="Full name" required error={errors.fullName} htmlFor="fullName">
        <TextInput
          id="fullName"
          placeholder="e.g. Adaeze Okonkwo"
          value={data.fullName}
          onChange={(e) => update({ fullName: e.target.value })}
          error={errors.fullName}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Gender" required error={errors.gender} htmlFor="gender">
          <Select
            id="gender"
            value={data.gender}
            onChange={(e) => update({ gender: e.target.value })}
            error={errors.gender}
          >
            <option value="">Select gender</option>
            {GENDERS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Country" required error={errors.country} htmlFor="country">
          <Select
            id="country"
            value={data.country}
            onChange={(e) => update({ country: e.target.value, city: "" })}
            error={errors.country}
          >
            <option value="">Select country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="City / State"
          required
          error={errors.city}
          htmlFor="city"
          hint={!regionOptions && data.country ? "Type your city or state" : undefined}
        >
          {regionOptions ? (
            <Select id="city" value={data.city} onChange={(e) => update({ city: e.target.value })} error={errors.city}>
              <option value="">Select city / state</option>
              {regionOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Select>
          ) : (
            <TextInput
              id="city"
              placeholder={data.country ? "e.g. your city or state" : "Select a country first"}
              value={data.city}
              onChange={(e) => update({ city: e.target.value })}
              error={errors.city}
              disabled={!data.country}
            />
          )}
        </Field>

        <Field label="Regional location" required error={errors.region} htmlFor="region">
          <Select
            id="region"
            value={data.region}
            onChange={(e) => update({ region: e.target.value })}
            error={errors.region}
          >
            <option value="">Select region</option>
            {REGIONAL_LOCATIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </Field>
      </div>
    </div>
  );
}
