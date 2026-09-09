import { useState } from "react";
import Stepper, { STEPS } from "./components/Stepper";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import AcademicStep from "./steps/AcademicStep";
import ProjectStep from "./steps/ProjectStep";
import TeamStep from "./steps/TeamStep";
import SuccessScreen from "./components/SuccessScreen";
import { validateStep, INITIAL_DATA } from "./validation";

const STEP_COMPONENTS = [PersonalInfoStep, AcademicStep, ProjectStep, TeamStep];

export default function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (patch) => setData((d) => ({ ...d, ...patch }));

  const goNext = () => {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setSubmitting(true);
    // Simulated network submission — wire this up to a real endpoint.
    console.log("Submitting application:", data);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const reset = () => {
    setData(INITIAL_DATA);
    setErrors({});
    setStep(0);
    setSubmitted(false);
  };

  const CurrentStep = STEP_COMPONENTS[step];
  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-10 sm:py-14">
        <header className="mb-10 flex flex-col gap-3 border-b border-ink-line pb-8">
          <p className="text-sm text-gold font-medium tracking-wide">ISF'26 · ATC Africa</p>
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.05]">
            BuildAthon 2026
          </h1>
          <p className="text-paper-dim max-w-xl leading-relaxed">
            A hands-on innovation challenge for designers, developers and problem-solvers ready to build
            real-world solutions. Build, compete, collaborate.
          </p>
          <p className="text-xs text-muted">isf.atcafrica.com · A regional hackathon</p>
        </header>

        <div className="grid md:grid-cols-[220px_1fr] gap-10">
          <div>
            <Stepper current={submitted ? STEPS.length : step} />
          </div>

          <div className="border border-ink-line rounded-lg bg-ink-soft px-6 py-8 sm:px-9 sm:py-10">
            {submitted ? (
              <SuccessScreen fullName={data.fullName} projectName={data.projectName} onReset={reset} />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <CurrentStep data={data} update={update} errors={errors} />

                <div className="mt-9 flex items-center justify-between border-t border-ink-line pt-6">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 0}
                    className="text-sm font-medium text-paper-dim hover:text-paper transition-colors disabled:opacity-0 disabled:pointer-events-none"
                  >
                    Back
                  </button>

                  {isLastStep ? (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 rounded-md bg-gold text-ink font-medium text-sm px-5 py-2.5 hover:bg-gold-soft transition-colors disabled:opacity-70 disabled:cursor-wait"
                    >
                      {submitting && (
                        <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                          <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      )}
                      {submitting ? "Submitting…" : "Submit application"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={goNext}
                      className="rounded-md bg-gold text-ink font-medium text-sm px-5 py-2.5 hover:bg-gold-soft transition-colors"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
