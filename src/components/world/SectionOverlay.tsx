import { ReactNode, useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";

interface SectionOverlayProps {
  label: string;
  children: ReactNode;
  onClose: () => void;
  backLabel?: string;
  onExitWorld?: () => void;
}

// Back control lives top-left here, same spot as every other Game Mode
// screen (the globe, LocationLanding) — it used to float bottom-center,
// which made "back" jump to a different corner depending on what was open.
const SectionOverlay = ({ label, children, onClose, backLabel = "Back", onExitWorld }: SectionOverlayProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "ArrowDown") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-30 bg-background animate-fade-in flex flex-col">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border bg-card/80 backdrop-blur">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/90 border border-border text-sm font-medium text-foreground hover:bg-card transition-colors max-w-[40vw] sm:max-w-none shrink-0"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          <span className="truncate">{backLabel}</span>
        </button>
        <span className="hidden md:block font-display font-bold text-foreground truncate">{label}</span>
        <button
          onClick={onExitWorld}
          aria-label="Exit game mode"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors shrink-0"
        >
          <X className="h-4 w-4" />
          <span className="hidden sm:inline">Exit game mode</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
    </div>
  );
};


export default SectionOverlay;
