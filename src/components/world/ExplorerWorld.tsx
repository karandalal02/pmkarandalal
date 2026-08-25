import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useExplorer } from "@/context/ExplorerContext";
import { WORLD_LOCATIONS, findPlace, type WorldLocation, type WorldPlace, type WorldContentKey } from "@/data/explorerWorld";
import LocationLanding from "./LocationLanding";
import PlaceholderContent from "./PlaceholderContent";
import SectionOverlay from "./SectionOverlay";
import WorldLinkInterceptor from "./WorldLinkInterceptor";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import GoldiesGrandMatch from "@/pages/GoldiesGrandMatch";
import Shockwave from "@/pages/Shockwave";
import AiJobSearchSystem from "@/pages/AiJobSearchSystem";
import TvTime2 from "@/pages/TvTime2";

// The globe library only loads once Game Mode is actually opened, never on a
// normal site visit.
const ExplorerGlobe = lazy(() => import("./ExplorerGlobe"));

const CONTENT_BY_KEY: Record<Exclude<WorldContentKey, "placeholder">, JSX.Element> = {
  experience: <Experience />,
  education: <Education />,
  goldies: <GoldiesGrandMatch />,
  shockwave: <Shockwave />,
  "ai-job-search": <AiJobSearchSystem />,
  "tv-time": <TvTime2 />,
  "home-about": (
    <>
      <Hero />
      <About />
    </>
  ),
};

// A handful of content keys map onto sections/case studies the rest of the
// site already tracks (for the "% explored" trail outside Game Mode). Keeping
// both in sync is a nice bonus, not a requirement — the two systems are
// otherwise independent.
const LEGACY_SYNC: Partial<Record<WorldContentKey, { sections?: string[]; caseStudies?: string[] }>> = {
  experience: { sections: ["experience"] },
  education: { sections: ["education"] },
  goldies: { caseStudies: ["goldies"] },
  shockwave: { caseStudies: ["shockwave"] },
  "ai-job-search": { caseStudies: ["ai-job-search"] },
  "tv-time": { caseStudies: ["tv-time"] },
  "home-about": { sections: ["home", "about"] },
};

const ALL_PLACES: WorldPlace[] = WORLD_LOCATIONS.flatMap((l) => l.places);

const ExplorerWorld = () => {
  const { worldOpen, visitSection, visitCaseStudy } = useExplorer();
  const navigate = useNavigate();
  const exitWorld = useCallback(() => navigate("/"), [navigate]);

  const [location, setLocation] = useState<WorldLocation | null>(null);
  const [placeStack, setPlaceStack] = useState<WorldPlace[]>([]);
  const [openPlace, setOpenPlace] = useState<WorldPlace | null>(null);
  const [visitedIds, setVisitedIds] = useState<Set<string>>(new Set());

  const markVisited = useCallback((id: string) => {
    setVisitedIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const openContent = useCallback(
    (place: WorldPlace) => {
      if (!place.contentKey) return;
      const sync = LEGACY_SYNC[place.contentKey];
      sync?.sections?.forEach((s) => visitSection(s as never));
      sync?.caseStudies?.forEach((c) => visitCaseStudy(c as never));
      markVisited(place.id);
      setOpenPlace(place);
    },
    [markVisited, visitSection, visitCaseStudy]
  );

  const handleSelectLocation = useCallback(
    (loc: WorldLocation) => {
      markVisited(loc.id);
      if (loc.contentKey) {
        // Nashik: Home + About are a single merged piece, skip the landing screen.
        const sync = LEGACY_SYNC[loc.contentKey];
        sync?.sections?.forEach((s) => visitSection(s as never));
        setLocation(loc);
        setOpenPlace({ id: loc.id, label: loc.label, contentKey: loc.contentKey });
        return;
      }
      setLocation(loc);
      setPlaceStack([]);
    },
    [markVisited, visitSection]
  );

  const handleSelectPlace = useCallback(
    (place: WorldPlace) => {
      if (place.children) {
        markVisited(place.id);
        setPlaceStack((prev) => [...prev, place]);
      } else {
        openContent(place);
      }
    },
    [markVisited, openContent]
  );

  const handleBackFromLanding = useCallback(() => {
    setPlaceStack((prev) => {
      if (prev.length > 0) return prev.slice(0, -1);
      return prev;
    });
    if (placeStack.length === 0) setLocation(null);
  }, [placeStack.length]);

  const handleCloseContent = useCallback(() => {
    setOpenPlace(null);
    // Locations with no places (Nashik) skip the landing screen entirely, so
    // closing their content should return straight to the globe, not to an
    // empty landing screen.
    setLocation((loc) => (loc && loc.places.length === 0 ? null : loc));
  }, []);

  // Internal links (e.g. a case study card inside <Experience />) route back
  // into the world instead of navigating away underneath the fullscreen overlay.
  const openByLegacyCaseStudyId = useCallback(
    (id: string) => {
      const place = findPlace(ALL_PLACES, id);
      if (place) openContent(place);
    },
    [openContent]
  );

  const currentItems = useMemo(() => {
    if (!location) return [];
    if (placeStack.length === 0) return location.places;
    return placeStack[placeStack.length - 1].children ?? [];
  }, [location, placeStack]);

  const landingTitle = placeStack.length > 0 ? placeStack[placeStack.length - 1].label : location?.label ?? "";
  const landingBackLabel = placeStack.length > 0 ? `Back to ${location?.label}` : "Back to globe";

  useEffect(() => {
    if (!worldOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [worldOpen]);

  if (!worldOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-background overflow-hidden">
      {!location && (
        <>
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm font-mono">
                Loading the globe…
              </div>
            }
          >
            <ExplorerGlobe onSelectLocation={handleSelectLocation} visitedLocationIds={visitedIds} />
          </Suspense>
          <button
            onClick={exitWorld}
            className="absolute top-4 right-4 z-30 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            <X className="h-4 w-4" />
            Exit game mode
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-xs font-mono text-muted-foreground bg-card/80 backdrop-blur px-3 py-1.5 rounded-full border border-border/50">
            Drag to spin the globe · tap a pin to travel
          </p>
        </>
      )}

      {location && !openPlace && (
        <LocationLanding
          title={landingTitle}
          items={currentItems}
          visitedIds={visitedIds}
          onSelect={handleSelectPlace}
          onBack={handleBackFromLanding}
          backLabel={landingBackLabel}
          onExit={exitWorld}
        />
      )}

      {openPlace && openPlace.contentKey && (
        <SectionOverlay
          key={openPlace.id}
          label={openPlace.label}
          backLabel={
            placeStack.length > 0
              ? `Back to ${placeStack[placeStack.length - 1].label}`
              : location && location.places.length > 0
                ? `Back to ${location.label}`
                : "Back to globe"
          }
          onClose={handleCloseContent}
          onExitWorld={exitWorld}
        >
          <WorldLinkInterceptor onOpenCaseStudy={openByLegacyCaseStudyId} onBackToStreet={handleCloseContent}>
            {(() => {
              const key = openPlace.contentKey;
              return key === "placeholder" ? <PlaceholderContent label={openPlace.label} /> : CONTENT_BY_KEY[key as Exclude<WorldContentKey, "placeholder">];
            })()}
          </WorldLinkInterceptor>
        </SectionOverlay>
      )}
    </div>
  );
};

export default ExplorerWorld;
