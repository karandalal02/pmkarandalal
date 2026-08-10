import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { CASE_STUDIES, useExplorer } from "@/context/ExplorerContext";
import { useWorldControls } from "@/hooks/useWorldControls";
import { CASE_STUDY_ICONS } from "./worldIcons";
import WorldCharacter from "./WorldCharacter";

interface ProjectsHallProps {
  onEnterCaseStudy: (id: string) => void;
  reducedMotion?: boolean;
}

const SPEED = 300;

const ProjectsHall = ({ onEnterCaseStudy, reducedMotion = false }: ProjectsHallProps) => {
  const { visitedCaseStudies } = useExplorer();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1024);
  const [x, setX] = useState(0.5);
  const [facing, setFacing] = useState(1);
  const [walking, setWalking] = useState(false);
  const [openDoor, setOpenDoor] = useState<string | null>(null);

  const xRef = useRef(0.5);
  const rafRef = useRef<number | null>(null);
  const lastTs = useRef(0);

  useEffect(() => {
    const measure = () => setWidth(wrapRef.current?.clientWidth || window.innerWidth);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Door positions as a fraction of the hall width
  const doors = useMemo(
    () =>
      CASE_STUDIES.map((c, i) => ({
        ...c,
        pos: (i + 1) / (CASE_STUDIES.length + 1),
      })),
    []
  );

  const nearest = useMemo(() => {
    let best = doors[0];
    let bestD = Infinity;
    doors.forEach((d) => {
      const dist = Math.abs(d.pos - x);
      if (dist < bestD) {
        bestD = dist;
        best = d;
      }
    });
    return bestD * width <= 110 ? best : null;
  }, [doors, x, width]);

  const nearestRef = useRef(nearest);
  nearestRef.current = nearest;

  const handleEnter = useCallback(() => {
    const door = nearestRef.current;
    if (!door || openDoor) return;
    setOpenDoor(door.id);
    window.setTimeout(() => onEnterCaseStudy(door.id), 450);
  }, [onEnterCaseStudy, openDoor]);

  const { dirRef, setTouchDir, touchDir } = useWorldControls(!openDoor, handleEnter, () => {});

  useEffect(() => {
    const step = (ts: number) => {
      const dt = lastTs.current ? Math.min(0.05, (ts - lastTs.current) / 1000) : 0;
      lastTs.current = ts;
      const dir = dirRef.current;
      if (dir !== 0 && width > 0) {
        const next = Math.min(0.95, Math.max(0.05, xRef.current + (dir * SPEED * dt) / width));
        if (next !== xRef.current) {
          xRef.current = next;
          setX(next);
        }
        setFacing(dir);
        setWalking(true);
      } else {
        setWalking(false);
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTs.current = 0;
    };
  }, [dirRef, width]);

  return (
    <div ref={wrapRef} className="relative h-full min-h-[520px] overflow-hidden bg-muted/40">
      {/* Back wall */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 to-background" />
      <div className="absolute inset-x-0 bottom-0 h-24 border-t-2 border-border bg-muted" />

      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center px-4">
        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">Featured Projects</h2>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Walk to a door with ← → and press ↑ to open a case study
        </p>
      </div>

      {/* Doors */}
      {doors.map((d) => {
        const Icon = CASE_STUDY_ICONS[d.id];
        const isNear = nearest?.id === d.id;
        const visited = visitedCaseStudies.has(d.id as never);
        return (
          <div
            key={d.id}
            className="absolute bottom-24 -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${d.pos * 100}%` }}
          >
            <div
              className={`mb-2 px-3 py-1 rounded-full border text-[11px] md:text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                isNear
                  ? "bg-primary text-primary-foreground border-primary scale-105"
                  : "bg-card text-foreground border-border"
              }`}
            >
              <span className="inline-flex items-center gap-1">
                {visited && <Check className="h-3 w-3" />}
                {d.label}
              </span>
            </div>

            <div
              className={`relative w-[92px] md:w-[120px] h-[150px] md:h-[190px] rounded-t-xl border-2 border-b-0 transition-colors duration-300 ${
                isNear ? "border-primary bg-card" : "border-border bg-card/70"
              }`}
              style={{ perspective: "700px" }}
            >
              {/* Doorway */}
              <div className="absolute inset-0 rounded-t-xl bg-background overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>
              {/* Door panel */}
              <div
                className="absolute inset-0 rounded-t-xl border-2 border-b-0 border-primary bg-secondary origin-left transition-transform duration-500 ease-out flex flex-col items-center justify-center gap-2"
                style={{ transform: openDoor === d.id ? "rotateY(-105deg)" : "rotateY(0deg)" }}
              >
                {Icon && <Icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />}
                <span className="px-2 text-center text-[10px] md:text-[11px] font-mono font-semibold text-foreground leading-tight">
                  {d.label}
                </span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
            </div>

            {isNear && !openDoor && (
              <span className="absolute -top-9 whitespace-nowrap text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-foreground text-background animate-scale-in">
                Enter ↑
              </span>
            )}
          </div>
        );
      })}

      {/* Character */}
      <div className="absolute bottom-24 -translate-x-1/2 z-10" style={{ left: `${x * 100}%` }}>
        <WorldCharacter walking={walking} facing={facing} reducedMotion={reducedMotion} />
      </div>

      {/* Touch controls */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-6 z-20 md:hidden">
        <div className="flex gap-3">
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              onPointerDown={() => setTouchDir(dir)}
              onPointerUp={() => setTouchDir(0)}
              onPointerLeave={() => setTouchDir(0)}
              onPointerCancel={() => setTouchDir(0)}
              aria-label={dir < 0 ? "Walk left" : "Walk right"}
              className={`p-4 rounded-full border border-border backdrop-blur transition-colors ${
                touchDir === dir ? "bg-primary text-primary-foreground" : "bg-card/90 text-foreground"
              }`}
            >
              {dir < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          ))}
        </div>
        <button
          onClick={handleEnter}
          disabled={!nearest}
          className="px-5 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-40"
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default ProjectsHall;
