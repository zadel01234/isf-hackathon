import Stepper, { STEPS } from "./components/Stepper";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import AcademicStep from "./steps/AcademicStep";
import ProjectStep from "./steps/ProjectStep";
import TeamStep from "./steps/TeamStep";
import ReviewStep from "./steps/ReviewStep";
import SuccessScreen from "./components/SuccessScreen";
import { validateStep, INITIAL_DATA } from "./validation";
import { usePersistedForm } from "./usePersistedForm";
import { useState } from "react";

const STEP_COMPONENTS = [PersonalInfoStep, AcademicStep, ProjectStep, TeamStep, ReviewStep];

export default function App() {
  const { data, setData, step, setStep, lastSavedAt, clearPersisted, isRestored } = usePersistedForm(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dismissedRestoreNotice, setDismissedRestoreNotice] = useState(false);

  const update = (patch) => setData((d) => ({ ...d, ...patch }));

  const goNext = () => {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep(Math.min(step + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setStep(Math.max(step - 1, 0));
  };

  const goToStep = (target) => {
    setErrors({});
    setStep(target);
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
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitting(false);
    setSubmitted(true);
    clearPersisted();
  };

  const reset = () => {
    setData(INITIAL_DATA);
    setErrors({});
    setStep(0);
    setSubmitted(false);
    clearPersisted();
  };

  const CurrentStep = STEP_COMPONENTS[step];
  const isLastStep = step === STEPS.length - 1;
  const showRestoreNotice = isRestored && !dismissedRestoreNotice && !submitted;

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

        {showRestoreNotice && (
          <div className="mb-6 flex items-start gap-3 rounded-md border border-gold/40 bg-gold/10 px-4 py-3">
            <svg className="mt-0.5 shrink-0 text-gold" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 8v5m0 3.5h.01M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm text-paper-dim flex-1">
              We picked up where you left off — your answers were saved on this device.
            </p>
            <button
              type="button"
              onClick={() => setDismissedRestoreNotice(true)}
              className="text-sm text-gold hover:text-gold-soft transition-colors"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-[220px_1fr] gap-10">
          <div>
            <Stepper current={submitted ? STEPS.length : step} />
          </div>

          <div className="border border-ink-line rounded-lg bg-ink-soft px-6 py-8 sm:px-9 sm:py-10">
            {submitted ? (
              <SuccessScreen fullName={data.fullName} projectName={data.projectName} onReset={reset} />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <CurrentStep data={data} update={update} errors={errors} onEditStep={goToStep} />

                <div className="mt-9 flex items-center justify-between border-t border-ink-line pt-6">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 0}
                    className="text-sm font-medium text-paper-dim hover:text-paper transition-colors disabled:opacity-0 disabled:pointer-events-none"
                  >
                    Back
                  </button>

                  <div className="flex items-center gap-4">
                    <SaveIndicator lastSavedAt={lastSavedAt} />
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
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SaveIndicator({ lastSavedAt }) {
  if (!lastSavedAt) return null;
  return (
    <span className="hidden sm:flex items-center gap-1.5 text-xs text-muted">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M4 12.5l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Draft saved
    </span>
  );
}
