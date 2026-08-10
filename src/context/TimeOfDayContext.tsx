import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type Phase = "dawn" | "day" | "sunset" | "night";
export type PhaseSetting = Phase | "auto";

const STORAGE_KEY = "tod-setting";
const PHASE_CLASSES = ["tod-dawn", "tod-day", "tod-sunset", "tod-night"];
const CYCLE: PhaseSetting[] = ["auto", "dawn", "day", "sunset", "night"];

export const phaseFromDate = (d: Date): Phase => {
  const h = d.getHours();
  if (h >= 5 && h < 8) return "dawn";
  if (h >= 8 && h < 17) return "day";
  if (h >= 17 && h < 20) return "sunset";
  return "night";
};

export const PHASE_LABEL: Record<PhaseSetting, string> = {
  auto: "Auto",
  dawn: "Dawn",
  day: "Day",
  sunset: "Sunset",
  night: "Night",
};

interface TimeOfDayValue {
  phase: Phase;
  setting: PhaseSetting;
  cyclePhase: () => void;
  label: string;
}

const TimeOfDayContext = createContext<TimeOfDayValue | undefined>(undefined);

export const useTimeOfDay = () => {
  const ctx = useContext(TimeOfDayContext);
  if (!ctx) throw new Error("useTimeOfDay must be used within a TimeOfDayProvider");
  return ctx;
};

export const TimeOfDayProvider = ({ children }: { children: ReactNode }) => {
  const [setting, setSetting] = useState<PhaseSetting>(() => {
    if (typeof window === "undefined") return "auto";
    const stored = window.localStorage.getItem(STORAGE_KEY) as PhaseSetting | null;
    return stored && CYCLE.includes(stored) ? stored : "auto";
  });
  const [autoPhase, setAutoPhase] = useState<Phase>(() => phaseFromDate(new Date()));

  useEffect(() => {
    const tick = () => setAutoPhase(phaseFromDate(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const phase = setting === "auto" ? autoPhase : setting;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...PHASE_CLASSES);
    root.classList.add(`tod-${phase}`);
    root.classList.toggle("dark", phase === "night");
  }, [phase]);

  const cyclePhase = useCallback(() => {
    setSetting((prev) => {
      const next = CYCLE[(CYCLE.indexOf(prev) + 1) % CYCLE.length];
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      phase,
      setting,
      cyclePhase,
      label: setting === "auto" ? `Auto · ${PHASE_LABEL[phase]}` : PHASE_LABEL[setting],
    }),
    [phase, setting, cyclePhase]
  );

  return <TimeOfDayContext.Provider value={value}>{children}</TimeOfDayContext.Provider>;
};
