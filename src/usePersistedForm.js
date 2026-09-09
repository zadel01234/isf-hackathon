import { useEffect, useState } from "react";

const STORAGE_KEY = "buildathon2026-application-v1";

function readSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Persists form data + current step to localStorage so a dropped connection
// or a closed tab doesn't lose progress. Falls back silently if storage is
// unavailable (private browsing, quota exceeded, etc).
export function usePersistedForm(initialData) {
  const [saved] = useState(readSaved);

  const [data, setData] = useState(() => (saved ? { ...initialData, ...saved.data } : initialData));
  const [step, setStep] = useState(() => saved?.step ?? 0);
  const [lastSavedAt, setLastSavedAt] = useState(() => saved?.savedAt ?? null);
  const [isRestored] = useState(() => Boolean(saved));

  useEffect(() => {
    try {
      const savedAt = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step, savedAt }));
      setLastSavedAt(savedAt);
    } catch {
      // storage full or unavailable — form still works, just unsaved
    }
  }, [data, step]);

  const clearPersisted = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setLastSavedAt(null);
  };

  return { data, setData, step, setStep, lastSavedAt, clearPersisted, isRestored };
}
