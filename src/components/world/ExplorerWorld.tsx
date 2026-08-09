import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useExplorer, SECTIONS, CASE_STUDIES } from "@/context/ExplorerContext";
import { useWorldControls } from "@/hooks/useWorldControls";
import WorldCharacter from "./WorldCharacter";
import WorldBuilding from "./WorldBuilding";
import SectionOverlay from "./SectionOverlay";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Mentorship from "@/components/Mentorship";
import Contact from "@/components/Contact";

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
  const navigate = useNavigate();
  const {
    worldOpen,
    closeWorld,
    visitSection,
    visitCaseStudy,
    visitedSections,
    visitedCaseStudies,
    progress,
  } = useExplorer();

  const reducedMotion = usePrefersReducedMotion();
  const [x, setX] = useState(START_X);
  const [facing, setFacing] = useState(1);
  const [walking, setWalking] = useState(false);
  const [openDoorKey, setOpenDoorKey] = useState<string | null>(null);
  const [activeSpot, setActiveSpot] = useState<Spot | null>(null);
  const [viewportW, setViewportW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  const xRef = useRef(START_X);
  const rafRef = useRef<number | null>(null);
  const lastTs = useRef(0);

  const spots = useMemo<Spot[]>(() => {
    const list: Spot[] = SECTIONS.map((s, i) => ({
      key: `s-${s.id}`,
      label: s.label,
      x: START_X + i * SPACING,
      width: 200,
      height: 200 + ((i * 37) % 90),
      variant: "section" as const,
      sectionId: s.id,
    }));
    CASE_STUDIES.forEach((c, i) => {
      list.push({
        key: `c-${c.id}`,
        label: c.label,
        x: START_X + (SECTIONS.length + i) * SPACING,
        width: 160,
        height: 150 + ((i * 29) % 50),
        variant: "shop",
        caseStudyId: c.id,
        path: c.path,
      });
    });
    return list;
  }, []);

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
      if (spot.path && spot.caseStudyId) {
        visitCaseStudy(spot.caseStudyId as never);
        closeWorld();
        setOpenDoorKey(null);
        navigate(spot.path);
        return;
      }
      if (spot.sectionId) visitSection(spot.sectionId as never);
      setActiveSpot(spot);
    }, 480);
  }, [activeSpot, closeWorld, navigate, visitCaseStudy, visitSection]);

  const handleExit = useCallback(() => {
    if (activeSpot) return;
    closeWorld();
  }, [activeSpot, closeWorld]);

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
    setActiveSpot(null);
    setOpenDoorKey(null);
  }, []);

  if (!worldOpen) return null;

  const camera = Math.max(0, Math.min(worldWidth - viewportW, x - viewportW / 2));

  return (
    <div className="fixed inset-0 z-[60] bg-background overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary to-background" />

      {/* Far skyline (parallax) */}
      <div
        className="absolute bottom-24 left-0 h-64 opacity-30"
        style={{ width: worldWidth, transform: `translateX(${-camera * 0.25}px)` }}
      >
        {Array.from({ length: Math.ceil(worldWidth / 120) }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 rounded-t bg-foreground/40"
            style={{ left: i * 120, width: 84, height: 90 + ((i * 53) % 130) }}
          />
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
          />
        ))}

        {/* Character */}
        <div className="absolute bottom-0" style={{ left: x, transform: "translateX(-50%)" }}>
          <WorldCharacter walking={walking} facing={facing} reducedMotion={reducedMotion} />
        </div>
      </div>

      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
        <div className="px-3 py-1.5 rounded-full bg-card/90 backdrop-blur border border-border text-xs font-mono font-bold text-foreground">
          {progress}% explored
        </div>
        <div className="hidden md:block px-3 py-1.5 rounded-full bg-card/80 backdrop-blur border border-border text-xs text-muted-foreground">
          ← → to walk · ↑ to enter · Esc to leave
        </div>
        <button
          onClick={closeWorld}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          <X className="h-4 w-4" />
          Exit world
        </button>
      </div>

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
        <SectionOverlay label={activeSpot.label} onClose={closeSection}>
          {activeSpot.sectionId ? sectionContent[activeSpot.sectionId] : null}
        </SectionOverlay>
      )}
    </div>
  );
};

export default ExplorerWorld;
