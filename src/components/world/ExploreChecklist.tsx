import { Check, Circle, X } from "lucide-react";
import { WORLD_LOCATIONS, type WorldLocation, type WorldPlace } from "@/data/explorerWorld";

interface ExploreChecklistProps {
  visitedIds: Set<string>;
  onJumpToLocation: (loc: WorldLocation) => void;
  onJumpToPlace: (loc: WorldLocation, parent: WorldPlace | null, place: WorldPlace) => void;
  onClose: () => void;
}

const Row = ({
  visited,
  label,
  onClick,
  size = "sm",
}: {
  visited: boolean;
  label: string;
  onClick: () => void;
  size?: "sm" | "xs";
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 text-left transition-colors py-0.5 ${
      size === "sm" ? "text-sm font-bold text-foreground hover:text-primary" : "text-xs text-foreground/90 hover:text-primary"
    }`}
  >
    {visited ? (
      <Check className={`${size === "sm" ? "h-3.5 w-3.5" : "h-3 w-3"} text-primary shrink-0`} />
    ) : (
      <Circle className={`${size === "sm" ? "h-3.5 w-3.5" : "h-3 w-3"} text-muted-foreground/50 shrink-0`} />
    )}
    <span className="truncate">{label}</span>
  </button>
);

/**
 * The clickable "X% explored" checklist — tap any row to jump straight
 * there, same idea as the old street's quick-jump panel, rebuilt for the
 * location -> place -> child tree.
 */
const ExploreChecklist = ({ visitedIds, onJumpToLocation, onJumpToPlace, onClose }: ExploreChecklistProps) => (
  <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 w-[min(36rem,calc(100%-2rem))] max-h-[70vh] overflow-y-auto rounded-2xl border border-border bg-card/95 backdrop-blur shadow-xl p-4 animate-scale-in">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-semibold text-foreground">Explore checklist</span>
      <button onClick={onClose} aria-label="Close checklist" className="p-1 rounded-full text-muted-foreground hover:bg-secondary transition-colors">
        <X className="h-4 w-4" />
      </button>
    </div>
    <div className="flex flex-col gap-4">
      {WORLD_LOCATIONS.map((loc) => (
        <div key={loc.id}>
          <Row visited={visitedIds.has(loc.id)} label={loc.label} onClick={() => onJumpToLocation(loc)} />
          {loc.places.length > 0 && (
            <div className="flex flex-col gap-0.5 pl-5 mt-1">
              {loc.places.map((place) => (
                <div key={place.id}>
                  <Row visited={visitedIds.has(place.id)} label={place.label} onClick={() => onJumpToPlace(loc, null, place)} size="xs" />
                  {place.children && (
                    <div className="flex flex-col gap-0.5 pl-5">
                      {place.children.map((child) => (
                        <Row
                          key={child.id}
                          visited={visitedIds.has(child.id)}
                          label={child.label}
                          onClick={() => onJumpToPlace(loc, place, child)}
                          size="xs"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ExploreChecklist;
