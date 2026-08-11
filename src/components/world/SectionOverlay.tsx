import { ReactNode, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

interface SectionOverlayProps {
  label: string;
  children: ReactNode;
  onClose: () => void;
  backLabel?: string;
  onExitWorld?: () => void;
}

const SectionOverlay = ({ label, children, onClose, backLabel = "Back to street", onExitWorld }: SectionOverlayProps) => {
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
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card/80 backdrop-blur">
        <span className="font-display font-bold text-foreground">{label}</span>
        <button
          onClick={onExitWorld}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          <X className="h-4 w-4" />
          Exit game mode
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>

      <button
        onClick={onClose}
        aria-label={backLabel}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity"
      >
        <ChevronDown className="h-4 w-4" />
        Exit
      </button>
    </div>
  );
};


export default SectionOverlay;
