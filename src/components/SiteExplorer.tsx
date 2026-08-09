import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useExplorer, SECTIONS, CASE_STUDIES } from "@/context/ExplorerContext";
import { Map as MapIcon, X, Trophy } from "lucide-react";
import JourneyMap from "./JourneyMap";

const AVATAR_URL = "/lovable-uploads/19c0388a-baf8-4196-8858-d6de2cbf18ce.png";

const SiteExplorer = () => {
  const location = useLocation();
  const {
    gameMode,
    visitedSections,
    visitedCaseStudies,
    activeSection,
    visitSection,
    setActiveSection,
    showMap,
    toggleMap,
    closeMap,
    progress,
    isComplete,
  } = useExplorer();

  const previousActive = useRef<typeof activeSection>(null);

  // Track main page sections whenever they exist (even when the explorer UI is hidden).
  useEffect(() => {
    const sectionElements = new Map<string, HTMLElement>();
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionElements.set(id, el);
    });

    if (sectionElements.size === 0) return;

    let bestId: typeof SECTIONS[number]["id"] | null = null;
    let bestRatio = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let maxId: typeof SECTIONS[number]["id"] | null = null;

        entries.forEach((entry) => {
          const id = entry.target.id as typeof SECTIONS[number]["id"];
          if (entry.isIntersecting) {
            visitSection(id);
          }
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxId = id;
          }
        });

        if (maxId && maxRatio > 0) {
          bestId = maxId;
          bestRatio = maxRatio;
          setActiveSection(maxId);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "-10% 0px -35% 0px",
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname, visitSection, setActiveSection]);

  // Detect active section change for avatar hop animation
  const isChanging = activeSection !== previousActive.current;
  useEffect(() => {
    if (activeSection !== previousActive.current) {
      previousActive.current = activeSection;
    }
  }, [activeSection]);

  if (!gameMode) return null;

  const activeSectionLabel = SECTIONS.find((s) => s.id === activeSection)?.label ?? "Explore";

  return (
    <>
      {/* Floating explorer HUD */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Completion badge */}
        {isComplete && (
          <div className="animate-bounce-in flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground shadow-premium font-medium text-sm">
            <Trophy className="h-4 w-4" />
            Portfolio complete!
          </div>
        )}

        {/* Main explorer bubble */}
        <button
          onClick={toggleMap}
          className="group relative flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 shadow-premium hover:bg-card/90 transition-all duration-300 hover:scale-105"
          aria-label="Open journey map"
        >
          <div className="flex flex-col items-start">
            <span className="text-xs font-medium text-muted-foreground">{activeSectionLabel}</span>
            <span className="text-sm font-bold text-foreground">{progress}% explored</span>
          </div>

          <div
            className={`relative w-12 h-12 rounded-full border-2 border-primary/20 overflow-hidden shadow-glow ${
              isChanging ? "animate-bobble" : ""
            }`}
          >
            <img
              src={AVATAR_URL}
              alt="Explorer"
              className="w-full h-full object-cover object-top"
            />
            {isComplete && (
              <div className="absolute inset-0 bg-primary/20 animate-pulse" />
            )}
          </div>

          <div className="p-2 rounded-full bg-secondary/80 text-secondary-foreground">
            {showMap ? <X className="h-4 w-4" /> : <MapIcon className="h-4 w-4" />}
          </div>
        </button>
      </div>

      {/* Journey map overlay */}
      {showMap && (
        <div
          className="fixed inset-0 z-40 bg-background/40 backdrop-blur-sm"
          onClick={closeMap}
          aria-hidden="true"
        />
      )}
      <JourneyMap />
    </>
  );
};

export default SiteExplorer;
