import { ReactNode, useCallback } from "react";
import { CASE_STUDIES } from "@/context/ExplorerContext";

interface WorldLinkInterceptorProps {
  children: ReactNode;
  onOpenCaseStudy: (id: string) => void;
  onBackToStreet: () => void;
}

/**
 * Inside Explorer World we never want react-router navigation to happen:
 * it would swap the page underneath the fullscreen world overlay.
 * Internal links to case studies open the case study in-world instead,
 * other internal links simply return the visitor to the street.
 */
const WorldLinkInterceptor = ({ children, onOpenCaseStudy, onBackToStreet }: WorldLinkInterceptorProps) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const path = href.split("#")[0];
      const match = CASE_STUDIES.find((c) => c.path === path);

      e.preventDefault();
      e.stopPropagation();

      if (match) {
        onOpenCaseStudy(match.id);
      } else {
        onBackToStreet();
      }
    },
    [onOpenCaseStudy, onBackToStreet]
  );

  return (
    <div onClickCapture={handleClick} className="contents">
      {children}
    </div>
  );
};

export default WorldLinkInterceptor;
