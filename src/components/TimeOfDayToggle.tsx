import { Sun, Sunrise, Sunset, Moon } from "lucide-react";
import { useTimeOfDay } from "@/context/TimeOfDayContext";

const ICONS = {
  dawn: Sunrise,
  day: Sun,
  sunset: Sunset,
  night: Moon,
} as const;

interface TimeOfDayToggleProps {
  className?: string;
}

const TimeOfDayToggle = ({ className = "" }: TimeOfDayToggleProps) => {
  const { phase, label, cyclePhase } = useTimeOfDay();
  const Icon = ICONS[phase];

  return (
    <button
      onClick={cyclePhase}
      aria-label={`Time of day: ${label}. Click to change.`}
      title={`Time of day: ${label}`}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors ${className}`}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
};

export default TimeOfDayToggle;
