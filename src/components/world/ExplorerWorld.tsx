import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Circle, X } from "lucide-react";
import { useExplorer, SECTIONS, CASE_STUDIES } from "@/context/ExplorerContext";
import { useWorldControls } from "@/hooks/useWorldControls";
import WorldCharacter from "./WorldCharacter";
import WorldBuilding from "./WorldBuilding";
import SectionOverlay from "./SectionOverlay";
import WorldLinkInterceptor from "./WorldLinkInterceptor";
import ProjectsHall from "./ProjectsHall";
import { SECTION_ICONS, CASE_STUDY_ICONS } from "./worldIcons";
import SkyLayer from "./SkyLayer";
import { useTimeOfDay } from "@/context/TimeOfDayContext";
import TimeOfDayToggle from "@/components/TimeOfDayToggle";


import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Mentorship from "@/components/Mentorship";
import Contact from "@/components/Contact";

import GoldiesGrandMatch from "@/pages/GoldiesGrandMatch";
import Shockwave from "@/pages/Shockwave";
import AiJobSearchSystem from "@/pages/AiJobSearchSystem";
import TvTime2 from "@/pages/TvTime2";

const SPACING = 340;
const START_X = 300;
const SPEED = 340; // px per second
const NEAR_DISTANCE = 150;

type Spot = {
  key: string;
  label: string;
  x: number;
  width: number;
  height: number;
  variant: "section" | "shop";
  sectionId?: string;
  caseStudyId?: string;
  path?: string;
};

const sectionContent: Record<string, JSX.Element> = {
  home: <Hero />,
  about: <About />,
  experience: <Experience />,
  projects: <Projects />,
  education: <Education />,
  skills: <Skills />,
  mentorship: <Mentorship />,
  contact: <Contact />,
};

const caseStudyContent: Record<string, JSX.Element> = {
  goldies: <GoldiesGrandMatch />,
  shockwave: <Shockwave />,
  "ai-job-search": <AiJobSearchSystem />,
  "tv-time": <TvTime2 />,
};


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

const ExplorerWorld = () => {
  const {
    worldOpen,
    closeWorld,
    visitSection,
    visitCaseStudy,
    visitedSections,
    visitedCaseStudies,
    progress,
    totalLocations,
    completedLocations,
  } = useExplorer();

  const { phase } = useTimeOfDay();
  const navigate = useNavigate();
  // Exit via the URL so GameModeSync closes the world and the session is tracked
  const exitWorld = useCallback(() => navigate("/"), [navigate]);
  const reducedMotion = usePrefersReducedMotion();
  const [x, setX] = useState(START_X);
  const [facing, setFacing] = useState(1);
  const [walking, setWalking] = useState(false);
  const [openDoorKey, setOpenDoorKey] = useState<string | null>(null);
  const [spotStack, setSpotStack] = useState<Spot[]>([]);
  const activeSpot = spotStack.length ? spotStack[spotStack.length - 1] : null;
  const [viewportW, setViewportW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [checklistOpen, setChecklistOpen] = useState(false);

  const xRef = useRef(START_X);
  const rafRef = useRef<number | null>(null);
  const lastTs = useRef(0);

  // The street only holds the main section buildings.
  // Case studies live behind the doors inside the Projects building.
  const spots = useMemo<Spot[]>(
    () =>
      SECTIONS.map((s, i) => ({
        key: `s-${s.id}`,
        label: s.label,
        x: START_X + i * SPACING,
        width: 200,
        height: 200 + ((i * 37) % 90),
        variant: "section" as const,
        sectionId: s.id,
      })),
    []
  );

  const caseStudySpots = useMemo<Spot[]>(
    () =>
      CASE_STUDIES.map((c) => ({
        key: `c-${c.id}`,
        label: c.label,
        x: START_X,
        width: 160,
        height: 160,
        variant: "shop" as const,
        caseStudyId: c.id,
        path: c.path,
      })),
    []
  );

  const worldWidth = spots[spots.length - 1].x + 400;

  const nearest = useMemo(() => {
    let best: Spot | null = null;
    let bestD = Infinity;
    spots.forEach((s) => {
      const d = Math.abs(s.x - x);
      if (d < bestD) {
        bestD = d;
        best = s;
      }
    });
    return bestD <= NEAR_DISTANCE ? (best as Spot | null) : null;
  }, [spots, x]);

  const nearestRef = useRef<Spot | null>(null);
  nearestRef.current = nearest;

  const handleEnter = useCallback(() => {
    const spot = nearestRef.current;
    if (!spot || activeSpot) return;
    setOpenDoorKey(spot.key);
    window.setTimeout(() => {
      if (spot.caseStudyId) visitCaseStudy(spot.caseStudyId as never);
      if (spot.sectionId) visitSection(spot.sectionId as never);
      setSpotStack([spot]);
    }, 480);
  }, [activeSpot, visitCaseStudy, visitSection]);


  const handleExit = useCallback(() => {
    if (activeSpot) return;
    exitWorld();
  }, [activeSpot, exitWorld]);

  const { dirRef, setTouchDir, touchDir } = useWorldControls(worldOpen && !activeSpot, handleEnter, handleExit);

  // Game loop
  useEffect(() => {
    if (!worldOpen || activeSpot) {
      setWalking(false);
      return;
    }
    const step = (ts: number) => {
      const dt = lastTs.current ? Math.min(0.05, (ts - lastTs.current) / 1000) : 0;
      lastTs.current = ts;
      const dir = dirRef.current;
      if (dir !== 0) {
        const next = Math.min(worldWidth - 120, Math.max(80, xRef.current + dir * SPEED * dt));
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
  }, [worldOpen, activeSpot, dirRef, worldWidth]);

  // Lock page scroll while the world is open
  useEffect(() => {
    if (!worldOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [worldOpen]);

  useEffect(() => {
    const onResize = () => setViewportW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeSection = useCallback(() => {
    setSpotStack((prev) => {
      const next = prev.slice(0, -1);
      if (next.length === 0) setOpenDoorKey(null);
      return next;
    });
  }, []);




  const openCaseStudyById = useCallback(
    (id: string) => {
      const spot = caseStudySpots.find((s) => s.caseStudyId === id);
      if (!spot) return;
      visitCaseStudy(id as never);
      setSpotStack((prev) => [...prev, spot]);
    },
    [caseStudySpots, visitCaseStudy]
  );


  const goToSection = useCallback(
    (spot: Spot) => {
      setChecklistOpen(false);
      xRef.current = spot.x;
      setX(spot.x);
      setOpenDoorKey(spot.key);
      if (spot.sectionId) visitSection(spot.sectionId as never);
      setSpotStack([spot]);
    },
    [visitSection]
  );

  useEffect(() => {
    if (!checklistOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChecklistOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [checklistOpen]);

  const missingCount = totalLocations - completedLocations;


  if (!worldOpen) return null;

  const camera = Math.max(0, Math.min(worldWidth - viewportW, x - viewportW / 2));

  return (
    <div className="fixed inset-0 z-[60] bg-background overflow-hidden">
      {/* Sky */}
      <div
        className="absolute inset-0 transition-[background] duration-1000"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--sky-top)) 0%, hsl(var(--sky-bottom)) 65%, hsl(var(--background)) 100%)",
        }}
      />

      <SkyLayer phase={phase} camera={camera} worldWidth={worldWidth} reducedMotion={reducedMotion} />

      {/* Far skyline (parallax) */}
      <div
        className={`absolute bottom-24 left-0 h-64 ${phase === "night" ? "opacity-70" : "opacity-30"}`}
        style={{ width: worldWidth, transform: `translateX(${-camera * 0.25}px)` }}
      >
        {Array.from({ length: Math.ceil(worldWidth / 120) }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 rounded-t bg-foreground/40 overflow-hidden"
            style={{ left: i * 120, width: 84, height: 90 + ((i * 53) % 130) }}
          >
            {phase === "night" && (
              <div className="absolute inset-x-2 top-3 grid grid-cols-3 gap-1.5">
                {Array.from({ length: 9 }).map((_, w) => (
                  <span
                    key={w}
                    className="h-2 rounded-[1px]"
                    style={{
                      background: (i * 7 + w * 3) % 4 === 0 ? "hsl(45 100% 70% / 0.85)" : "transparent",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mid trees (parallax) */}
      <div
        className="absolute bottom-24 left-0 h-32 opacity-50"
        style={{ width: worldWidth, transform: `translateX(${-camera * 0.6}px)` }}
      >
        {Array.from({ length: Math.ceil(worldWidth / 220) }).map((_, i) => (
          <div key={i} className="absolute bottom-0" style={{ left: 60 + i * 220 }}>
            <div className="w-8 h-8 rounded-full bg-primary/40" />
            <div className="mx-auto w-1 h-6 bg-foreground/40" />
          </div>
        ))}
      </div>

      {/* Sidewalk / ground */}
      <div className="absolute bottom-0 left-0 right-0 h-24 border-t-2 border-border bg-muted">
        <div
          className="absolute top-3 left-0 h-1 opacity-40"
          style={{ width: worldWidth, transform: `translateX(${-camera}px)` }}
        >
          {Array.from({ length: Math.ceil(worldWidth / 80) }).map((_, i) => (
            <span key={i} className="absolute h-1 w-10 rounded-full bg-foreground/30" style={{ left: i * 80 }} />
          ))}
        </div>
      </div>

      {/* Street layer */}
      <div
        className="absolute bottom-24 left-0 z-10"
        style={{ width: worldWidth, height: "60%", transform: `translateX(${-camera}px)` }}
      >
        {spots.map((s) => (
          <WorldBuilding
            key={s.key}
            label={s.label}
            x={s.x}
            width={s.width}
            height={s.height}
            variant={s.variant}
            visited={
              s.sectionId
                ? visitedSections.has(s.sectionId as never)
                : visitedCaseStudies.has(s.caseStudyId as never)
            }
            near={nearest?.key === s.key}
            doorOpen={openDoorKey === s.key}
            Icon={s.sectionId ? SECTION_ICONS[s.sectionId] : CASE_STUDY_ICONS[s.caseStudyId as string]}
          />

        ))}

        {/* Character */}
        <div className="absolute bottom-0" style={{ left: x, transform: "translateX(-50%)" }}>
          <WorldCharacter walking={walking} facing={facing} reducedMotion={reducedMotion} />
        </div>
      </div>

      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between gap-3">
        <div className="relative">
          <button
            onClick={() => setChecklistOpen((v) => !v)}
            aria-expanded={checklistOpen}
            className="px-3 py-1.5 rounded-full bg-card/90 backdrop-blur border border-border text-xs font-mono font-bold text-foreground hover:bg-card transition-colors inline-flex items-center gap-1.5"
          >
            {progress}% explored
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${checklistOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
        <TimeOfDayToggle className="border border-border backdrop-blur" />
        <div className="hidden lg:block px-3 py-1.5 rounded-full bg-card/80 backdrop-blur border border-border text-xs text-muted-foreground">
          ← → to walk · ↑ to enter · ↓ / Esc to leave
        </div>
        {!activeSpot && (
          <button
            onClick={exitWorld}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            <X className="h-4 w-4" />
            Exit game mode
          </button>
        )}
      </div>


      {/* Exploration panel — floats near the top, clear of buildings and the character */}
      {checklistOpen && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 w-[min(56rem,calc(100%-2rem))] animate-fade-in motion-reduce:animate-none">
          <div className="rounded-2xl border border-border bg-card/95 backdrop-blur shadow-xl p-3">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                  {completedLocations} of {totalLocations} explored
                </span>
                <div className="hidden sm:block h-1 w-32 rounded-full bg-border overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${progress}%` }} />
                </div>
                {missingCount > 0 && (
                  <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">Missing: {missingCount}</span>
                )}
              </div>
              <button
                onClick={() => setChecklistOpen(false)}
                aria-label="Close exploration list"
                className="p-1 rounded-full text-muted-foreground hover:bg-secondary transition-colors shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="w-full text-[10px] uppercase tracking-wider text-muted-foreground">Sections</span>

              {spots.map((s) => {
                const visited = visitedSections.has(s.sectionId as never);
                const Icon = SECTION_ICONS[s.sectionId as string];
                return (
                  <button
                    key={s.key}
                    onClick={() => goToSection(s)}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs transition-colors ${
                      visited
                        ? "border-border bg-secondary/60 text-muted-foreground"
                        : "border-primary/40 bg-background text-foreground font-medium hover:bg-secondary"
                    }`}
                  >
                    {visited ? (
                      <Check className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 text-muted-foreground/50" />
                    )}
                    {Icon && <Icon className="h-3.5 w-3.5" />}
                    {s.label}
                  </button>
                );
              })}

              <span className="w-full mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">Case studies</span>

              {caseStudySpots.map((c) => {
                const visited = visitedCaseStudies.has(c.caseStudyId as never);
                const Icon = CASE_STUDY_ICONS[c.caseStudyId as string];
                return (
                  <button
                    key={c.key}
                    onClick={() => {
                      setChecklistOpen(false);
                      openCaseStudyById(c.caseStudyId as string);
                    }}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs transition-colors ${
                      visited
                        ? "border-border bg-secondary/60 text-muted-foreground"
                        : "border-primary/40 bg-background text-foreground font-medium hover:bg-secondary"
                    }`}
                  >
                    {visited ? (
                      <Check className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 text-muted-foreground/50" />
                    )}
                    {Icon && <Icon className="h-3.5 w-3.5" />}
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}




      {/* Touch controls */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-6 md:hidden">
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

      {activeSpot && (
        <SectionOverlay
          key={`${spotStack.length}-${activeSpot.key}`}
          label={activeSpot.label}
          backLabel={spotStack.length > 1 ? `Back to ${spotStack[spotStack.length - 2].label}` : "Back to street"}
          onClose={closeSection}
          onExitWorld={exitWorld}

        >
          {activeSpot.sectionId === "projects" ? (
            <ProjectsHall onEnterCaseStudy={openCaseStudyById} reducedMotion={reducedMotion} />
          ) : (
            <WorldLinkInterceptor onOpenCaseStudy={openCaseStudyById} onBackToStreet={closeSection}>
              {activeSpot.sectionId
                ? sectionContent[activeSpot.sectionId]
                : activeSpot.caseStudyId
                  ? caseStudyContent[activeSpot.caseStudyId]
                  : null}
            </WorldLinkInterceptor>
          )}
        </SectionOverlay>
      )}

    </div>
  );
};

export default ExplorerWorld;
