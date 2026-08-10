import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";

type SectionId =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "education"
  | "skills"
  | "mentorship"
  | "contact";

type CaseStudyId = "goldies" | "shockwave" | "ai-job-search" | "tv-time";

interface SectionInfo {
  id: SectionId;
  label: string;
}

interface CaseStudyInfo {
  id: CaseStudyId;
  label: string;
  path: string;
}

export const SECTIONS: SectionInfo[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "mentorship", label: "Mentorship" },
  { id: "contact", label: "Contact" },
];

export const CASE_STUDIES: CaseStudyInfo[] = [
  { id: "goldies", label: "Goldies Grand Match", path: "/goldies-grand-match" },
  { id: "shockwave", label: "Shockwave", path: "/shockwave" },
  { id: "ai-job-search", label: "AI Job Search System", path: "/ai-job-search-system" },
  { id: "tv-time", label: "TV Time 2.0", path: "/tv-time-2-0" },
];

interface ExplorerContextValue {
  gameMode: boolean;
  toggleGameMode: () => void;
  visitedSections: Set<SectionId>;
  visitedCaseStudies: Set<CaseStudyId>;
  activeSection: SectionId | null;
  visitSection: (id: SectionId) => void;
  visitCaseStudy: (id: CaseStudyId) => void;
  setActiveSection: (id: SectionId | null) => void;
  showMap: boolean;
  toggleMap: () => void;
  closeMap: () => void;
  worldOpen: boolean;
  openWorld: () => void;
  closeWorld: () => void;
  progress: number;
  totalLocations: number;
  completedLocations: number;
  isComplete: boolean;
}

const ExplorerContext = createContext<ExplorerContextValue | undefined>(undefined);

export const useExplorer = () => {
  const context = useContext(ExplorerContext);
  if (!context) {
    throw new Error("useExplorer must be used within an ExplorerProvider");
  }
  return context;
};

interface ExplorerProviderProps {
  children: ReactNode;
}

export const ExplorerProvider = ({ children }: ExplorerProviderProps) => {
  const [gameMode, setGameMode] = useState(false);
  const [visitedSections, setVisitedSections] = useState<Set<SectionId>>(new Set());
  const [visitedCaseStudies, setVisitedCaseStudies] = useState<Set<CaseStudyId>>(new Set());
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [worldOpen, setWorldOpen] = useState(false);

  const toggleGameMode = useCallback(() => {
    setGameMode((prev) => {
      const next = !prev;
      // Game mode = the 2.5D Explorer World; exploring the normal page stays available always
      setWorldOpen(next);
      return next;
    });
  }, []);

  const visitSection = useCallback((id: SectionId) => {
    setVisitedSections((prev) => new Set(prev).add(id));
  }, []);

  const visitCaseStudy = useCallback((id: CaseStudyId) => {
    setVisitedCaseStudies((prev) => new Set(prev).add(id));
  }, []);

  const toggleMap = useCallback(() => {
    setShowMap((prev) => !prev);
  }, []);

  const closeMap = useCallback(() => {
    setShowMap(false);
  }, []);

  const openWorld = useCallback(() => {
    setShowMap(true);
    setWorldOpen(true);
  }, []);

  const closeWorld = useCallback(() => {
    setWorldOpen(false);
  }, []);


  const totalLocations = SECTIONS.length + CASE_STUDIES.length;
  const completedLocations = visitedSections.size + visitedCaseStudies.size;
  const progress = Math.round((completedLocations / totalLocations) * 100);
  const isComplete = progress === 100;

  const value = useMemo(
    () => ({
      gameMode,
      toggleGameMode,
      visitedSections,
      visitedCaseStudies,
      activeSection,
      visitSection,
      visitCaseStudy,
      setActiveSection,
      showMap,
      toggleMap,
      closeMap,
      worldOpen,
      openWorld,
      closeWorld,
      progress,
      totalLocations,
      completedLocations,
      isComplete,
    }),
    [
      gameMode,
      toggleGameMode,
      visitedSections,
      visitedCaseStudies,
      activeSection,
      visitSection,
      visitCaseStudy,
      showMap,
      toggleMap,
      closeMap,
      worldOpen,
      openWorld,
      closeWorld,
      progress,
      totalLocations,
      completedLocations,
      isComplete,
    ]
  );

  return <ExplorerContext.Provider value={value}>{children}</ExplorerContext.Provider>;
};
