import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useExplorer, SECTIONS } from "@/context/ExplorerContext";
import JourneyMap from "./JourneyMap";
import ExplorerTrail from "./ExplorerTrail";

const SiteExplorer = () => {
  const location = useLocation();
  const { gameMode, visitSection, setActiveSection } = useExplorer();

  // Track main page sections whenever they exist (even when the explorer UI is hidden).
  useEffect(() => {
    const sectionElements = new Map<string, HTMLElement>();
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionElements.set(id, el);
    });

    if (sectionElements.size === 0) return;

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

  if (!gameMode) return null;

  return (
    <>
      <ExplorerTrail />
      <JourneyMap />
    </>
  );
};

export default SiteExplorer;

