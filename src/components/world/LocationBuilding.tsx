import { Check, Layers, type LucideIcon } from "lucide-react";

interface LocationBuildingProps {
  label: string;
  width: number;
  height: number;
  visited: boolean;
  hasChildren: boolean;
  Icon?: LucideIcon;
  onClick: () => void;
}

/**
 * A clickable "building" on a location's landing screen. Same visual
 * language as the old walk-to-enter street, but always interactive — there
 * is no proximity/walking concept at this level, just tap to open.
 */
const LocationBuilding = ({ label, width, height, visited, hasChildren, Icon, onClick }: LocationBuildingProps) => {
  const windows = Math.max(2, Math.round(height / 90));

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative shrink-0 text-left"
      style={{ width }}
      aria-label={`Open ${label}`}
    >
      <div
        className="relative rounded-t-xl border-2 border-border bg-card/70 transition-colors duration-300 group-hover:border-primary group-hover:bg-card group-focus-visible:border-primary"
        style={{ height }}
      >
        {/* Rooftop icon. top is -82 (not -60) so its ~40px box clears the
            signboard below (-top-9, ~28px tall) instead of overlapping it. */}
        {Icon && (
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-xl border-2 border-border bg-card p-2 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110"
            style={{ top: -82 }}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}

        {/* Has-more-inside badge */}
        {hasChildren && (
          <span
            className="absolute -top-2 -right-2 z-10 inline-flex items-center gap-1 rounded-full border-2 border-background bg-accent text-accent-foreground px-1.5 py-0.5 text-[10px] font-mono font-bold"
            title="Has more inside"
          >
            <Layers className="h-2.5 w-2.5" />
          </span>
        )}

        {/* Signboard */}
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full border text-xs font-semibold bg-secondary text-secondary-foreground border-border transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:scale-105">
          <span className="inline-flex items-center gap-1">
            {visited && <Check className="h-3 w-3" />}
            {label}
          </span>
        </div>

        {/* Windows */}
        <div className="absolute inset-x-4 top-5 grid grid-cols-2 gap-3">
          {Array.from({ length: windows * 2 }).map((_, i) => (
            <div
              key={i}
              className={`h-6 rounded-sm border transition-colors duration-500 ${
                visited ? "bg-primary/25 border-primary/40" : "bg-muted border-border/60"
              }`}
            />
          ))}
        </div>

        {/* Door */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-md bg-background border-2 border-b-0 border-border overflow-hidden"
          style={{ width: 58, height: 84 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          <div className="absolute inset-0 border-2 border-b-0 border-primary/60 rounded-t-md" />
        </div>
      </div>
    </button>
  );
};

export default LocationBuilding;
