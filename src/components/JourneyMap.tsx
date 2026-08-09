import { useNavigate, useLocation } from "react-router-dom";
import { useExplorer, SECTIONS, CASE_STUDIES } from "@/context/ExplorerContext";
import { Check, Circle, X, MapPin, FileText } from "lucide-react";

const JourneyMap = () => {
  const {
    showMap,
    closeMap,
    visitedSections,
    visitedCaseStudies,
    activeSection,
    progress,
    completedLocations,
    totalLocations,
    isComplete,
  } = useExplorer();

  const navigate = useNavigate();
  const location = useLocation();

  const currentCaseStudy = CASE_STUDIES.find((s) => s.path === location.pathname);

  if (!showMap) return null;

  const handleSectionClick = (id: string) => {
    closeMap();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCaseStudyClick = (path: string) => {
    closeMap();
    navigate(path);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 max-h-[70vh] overflow-y-auto rounded-3xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-premium p-6 animate-scale-in">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Journey Map
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {completedLocations} of {totalLocations} locations visited
          </p>
        </div>
        <button
          onClick={closeMap}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label="Close map"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{progress}% explored</span>
          <span>{isComplete ? "Complete" : "Keep exploring"}</span>
        </div>
      </div>

      {/* Main sections path */}
      <div className="mb-6">
        <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
          Main Portfolio
        </h4>
        <div className="relative pl-4">
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border" />
          {SECTIONS.map((section) => {
            const visited = visitedSections.has(section.id);
            const active = !currentCaseStudy && activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`group relative flex items-center gap-3 w-full text-left py-2.5 transition-colors ${
                  active ? "text-primary" : "text-foreground"
                }`}
              >
                <div
                  className={`relative z-10 w-3 h-3 rounded-full border-2 flex items-center justify-center transition-colors ${
                    visited
                      ? "bg-primary border-primary"
                      : active
                      ? "bg-background border-primary"
                      : "bg-background border-border"
                  }`}
                >
                  {visited && <Check className="h-2 w-2 text-primary-foreground" />}
                </div>
                <span className={`text-sm font-medium ${visited ? "line-through opacity-60" : ""}`}>
                  {section.label}
                </span>
                {active && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    here
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Case studies path */}
      <div>
        <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
          Case Studies
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {CASE_STUDIES.map((study) => {
            const visited = visitedCaseStudies.has(study.id);
            const active = currentCaseStudy?.id === study.id;
            return (
              <button
                key={study.id}
                onClick={() => handleCaseStudyClick(study.path)}
                className={`group flex items-center gap-3 w-full text-left p-3 rounded-xl border transition-all duration-300 hover:bg-secondary/50 ${
                  active
                    ? "border-primary bg-primary/10"
                    : visited
                    ? "border-primary/30 bg-primary/5"
                    : "border-border/50 bg-card/50"
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg ${
                    visited ? "bg-primary text-primary-foreground" : active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {visited || active ? <Check className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                </div>
                <span className={`text-sm font-medium ${active ? "text-primary" : visited ? "text-foreground" : "text-muted-foreground"}`}>
                  {study.label}
                </span>
                {active && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    here
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {isComplete && (
        <div className="mt-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-center">
          <p className="text-sm font-medium text-primary">
            You explored the whole portfolio! Ready to connect?
          </p>
        </div>
      )}
    </div>
  );
};

export default JourneyMap;
