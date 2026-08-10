import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useExplorer, SECTIONS, CASE_STUDIES } from "@/context/ExplorerContext";
import { Map as MapIcon, X, Trophy } from "lucide-react";

const AVATAR_URL = "/lovable-uploads/19c0388a-baf8-4196-8858-d6de2cbf18ce.png";

type Station = { id: string; label: string; fraction: number };

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

const ExplorerTrail = () => {
  const location = useLocation();
  const {
    visitedSections,
    activeSection,
    setActiveSection,
    visitSection,
    showMap,
    toggleMap,
    progress,
    isComplete,
  } = useExplorer();

  const reducedMotion = usePrefersReducedMotion();
  const [stations, setStations] = useState<Station[]>([]);
  const [journey, setJourney] = useState(0); // 0..1 position along the trail
  const [walking, setWalking] = useState(false);
  const [lean, setLean] = useState(0); // -1 up, 1 down
  const [hopKey, setHopKey] = useState(0);
  const [flashLabel, setFlashLabel] = useState<string | null>(null);

  const lastScrollY = useRef(0);
  const walkTimer = useRef<number | null>(null);
  const lastStation = useRef<string | null>(null);
  const rafId = useRef<number | null>(null);

  const onCaseStudy = CASE_STUDIES.find((s) => s.path === location.pathname);

  const measure = useCallback(() => {
    const docH = document.documentElement.scrollHeight;
    if (!docH) return;
    const next: Station[] = [];
    SECTIONS.forEach(({ id, label }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      next.push({ id, label, fraction: Math.min(1, Math.max(0, (top + rect.height / 2) / docH)) });
    });
    setStations(next);
  }, []);

  useEffect(() => {
    measure();
    const t = window.setTimeout(measure, 400);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [measure, location.pathname]);

  // rAF-throttled scroll -> journey fraction
  useEffect(() => {
    const update = () => {
      rafId.current = null;
      const docH = document.documentElement.scrollHeight;
      const y = window.scrollY;
      const frac = docH > 0 ? Math.min(1, Math.max(0, (y + window.innerHeight / 2) / docH)) : 0;
      setJourney(frac);

      const delta = y - lastScrollY.current;
      if (Math.abs(delta) > 1) {
        lastScrollY.current = y;
        setLean(delta > 0 ? 1 : -1);
        setWalking(true);
        if (walkTimer.current) window.clearTimeout(walkTimer.current);
        walkTimer.current = window.setTimeout(() => {
          setWalking(false);
          setLean(0);
        }, 180);
      }
    };

    const onScroll = () => {
      if (rafId.current === null) rafId.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (walkTimer.current) window.clearTimeout(walkTimer.current);
    };
  }, [location.pathname]);

  // Nearest station -> hop + visit + label flash
  useEffect(() => {
    if (onCaseStudy || stations.length === 0) return;
    let nearest = stations[0];
    let best = Infinity;
    stations.forEach((s) => {
      const d = Math.abs(s.fraction - journey);
      if (d < best) {
        best = d;
        nearest = s;
      }
    });
    if (best > 0.06) return;
    if (lastStation.current === nearest.id) return;
    lastStation.current = nearest.id;
    visitSection(nearest.id as never);
    setActiveSection(nearest.id as never);
    setHopKey((k) => k + 1);
    setFlashLabel(nearest.label);
    const t = window.setTimeout(() => setFlashLabel(null), 1400);
    return () => window.clearTimeout(t);
  }, [journey, stations, onCaseStudy, visitSection, setActiveSection]);

  const characterTop = onCaseStudy ? 0 : journey;
  const travelTransition = reducedMotion
    ? "none"
    : "top 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)";

  return (
    <div className="fixed left-2 md:left-4 top-24 bottom-8 z-40 w-10 md:w-12 pointer-events-none select-none">
      {/* Trail track (only on the main portfolio page) */}
      {!onCaseStudy && (
        <>
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 rounded-full bg-border/70" />
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 rounded-full bg-primary"
            style={{ height: `${characterTop * 100}%`, transition: travelTransition.replace("top", "height") }}
          />
        </>
      )}

      {/* Stations */}
      {!onCaseStudy &&
        stations.map((s) => {
          const visited = visitedSections.has(s.id as never);
          const active = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
              className="pointer-events-auto group absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${s.fraction * 100}%` }}
              aria-label={`Go to ${s.label}`}
            >
              <span
                className={`block rounded-full border-2 transition-all duration-300 ${
                  active
                    ? "w-3.5 h-3.5 border-primary bg-primary scale-110"
                    : visited
                    ? "w-2.5 h-2.5 border-primary bg-primary"
                    : "w-2.5 h-2.5 border-border bg-background"
                }`}
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-card/90 backdrop-blur px-2 py-0.5 rounded-full border border-border/50">
                {s.label}
              </span>
            </button>
          );
        })}

      {/* Walking character */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
        style={{ top: `${characterTop * 100}%`, transition: travelTransition }}
      >
        <button
          onClick={toggleMap}
          aria-label={showMap ? "Close journey map" : "Open journey map"}
          className="relative block"
        >
          <span
            className="block"
            style={{
              transform: reducedMotion ? undefined : `rotate(${lean * 8}deg)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <span
              className={`block ${!reducedMotion && walking ? "animate-walk-bob" : ""}`}
            >
              <span
                key={hopKey}
                className={`relative block w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-primary/30 bg-card shadow-glow ${
                  reducedMotion ? "" : "animate-bobble"
                }`}
              >
                <img src={AVATAR_URL} alt="Explorer" className="w-full h-full object-cover object-top" />
                {isComplete && <span className="absolute inset-0 bg-primary/20 animate-pulse" />}
              </span>
            </span>
          </span>
          <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-secondary text-secondary-foreground border border-border/50">
            {showMap ? <X className="h-3 w-3" /> : <MapIcon className="h-3 w-3" />}
          </span>
        </button>


        {/* Station name flash */}
        {(flashLabel || onCaseStudy) && (
          <span className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-semibold text-foreground bg-card/95 backdrop-blur px-3 py-1 rounded-full border border-border/50 shadow-glow animate-scale-in">
            {onCaseStudy ? `Side trip: ${onCaseStudy.label}` : flashLabel}
          </span>
        )}
      </div>

      {/* Progress readout */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        {isComplete && (
          <span className="p-1.5 rounded-full bg-primary text-primary-foreground animate-bounce-in">
            <Trophy className="h-3.5 w-3.5" />
          </span>
        )}
        <span className="text-[10px] font-mono font-bold text-muted-foreground bg-card/80 backdrop-blur px-1.5 py-0.5 rounded-full border border-border/50">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default ExplorerTrail;
