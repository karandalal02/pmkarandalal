import { useEffect, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import type { WorldPlace } from "@/data/explorerWorld";
import { useTimeOfDay } from "@/context/TimeOfDayContext";
import SkyLayer from "./SkyLayer";
import LocationBuilding from "./LocationBuilding";

interface LocationLandingProps {
  title: string;
  items: WorldPlace[];
  visitedIds: Set<string>;
  onSelect: (place: WorldPlace) => void;
  onBack: () => void;
  backLabel: string;
  onExit: () => void;
}

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
};

/**
 * Title + landscape + directly-clickable buildings for one location (or one
 * level deeper inside a place that has more inside it). No walking, no
 * proximity — every item here is reachable with a single click, since the
 * globe already carries the "explore" gameplay feeling.
 */
const LocationLanding = ({ title, items, visitedIds, onSelect, onBack, backLabel, onExit }: LocationLandingProps) => {
  const { phase } = useTimeOfDay();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="absolute inset-0 bg-background overflow-hidden animate-fade-in">
      {/* Sky */}
      <div
        className="absolute inset-0 transition-[background] duration-1000"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--sky-top)) 0%, hsl(var(--sky-bottom)) 65%, hsl(var(--background)) 100%)",
        }}
      />
      <SkyLayer phase={phase} camera={0} worldWidth={typeof window !== "undefined" ? window.innerWidth : 1024} reducedMotion={reducedMotion} />

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-24 border-t-2 border-border bg-muted" />

      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur border border-border text-sm font-medium text-foreground hover:bg-card transition-colors max-w-[40vw] sm:max-w-none"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          <span className="truncate">{backLabel}</span>
        </button>
        <button
          onClick={onExit}
          aria-label="Exit game mode"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          <X className="h-4 w-4" />
          <span className="hidden sm:inline">Exit game mode</span>
        </button>
      </div>

      {/* Title */}
      <div className="absolute top-20 left-0 right-0 z-20 text-center px-4">
        <h1 className="font-display text-4xl md:text-6xl font-black text-foreground drop-shadow-sm">{title}</h1>
      </div>

      {/* Buildings row. Fixed height matters here: overflow-x-auto without an
          explicit height makes the browser clip the y-axis too (a well-known
          CSS overflow quirk), which was cropping the signboards/icons that
          sit above a tall building via negative offsets. Giving the row a
          height tall enough to contain those means nothing pokes outside its
          own box, so the clip never kicks in. */}
      <div className="absolute bottom-24 left-0 right-0 z-10 flex items-end justify-center gap-8 md:gap-14 px-6 overflow-x-auto h-[300px]">
        {items.map((place, i) => (
          <LocationBuilding
            key={place.id}
            label={place.label}
            Icon={place.icon}
            width={place.children ? 170 : 150}
            height={place.children ? 200 : 160 + ((i * 29) % 50)}
            visited={visitedIds.has(place.id)}
            hasChildren={!!place.children}
            onClick={() => onSelect(place)}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationLanding;
