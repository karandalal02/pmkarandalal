import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { WORLD_LOCATIONS, type WorldLocation } from "@/data/explorerWorld";

interface ExplorerGlobeProps {
  onSelectLocation: (location: WorldLocation) => void;
  visitedLocationIds: Set<string>;
}

const TEXTURE_URL = `${import.meta.env.BASE_URL}globe-placeholder-texture.png`;

/**
 * The top-level view of Game Mode: a rotating globe with a pin per location.
 * Loaded lazily (see ExplorerWorld) so this library only downloads once
 * someone actually opens Game Mode, never on a normal site visit.
 *
 * `globeRef` is typed `any` because react-globe.gl's TypeScript exports are
 * inconsistent across versions and can't be verified without a local install
 * in this environment — safer than guessing a type name that may not exist.
 */
const ExplorerGlobe = ({ onSelectLocation, visitedLocationIds }: ExplorerGlobeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });

  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    const controls = g.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    // Zoom is on (scroll / pinch) so close-together pins — Mumbai, Pune,
    // Nashik are all near each other in real life — can be told apart.
    // Bounds keep the globe from being zoomed inside-out or lost entirely.
    controls.enableZoom = true;
    controls.minDistance = 120;
    controls.maxDistance = 550;
    g.pointOfView({ lat: 25, lng: -40, altitude: 2.1 }, 0);
  }, []);

  return (
    <Globe
      ref={globeRef}
      width={size.width}
      height={size.height}
      globeImageUrl={TEXTURE_URL}
      backgroundColor="rgba(0,0,0,0)"
      showAtmosphere
      atmosphereColor="#7c94ff"
      atmosphereAltitude={0.2}
      htmlElementsData={WORLD_LOCATIONS}
      htmlLat={(d) => (d as WorldLocation).lat}
      htmlLng={(d) => (d as WorldLocation).lng}
      htmlAltitude={0.02}
      htmlElement={(d) => {
        const loc = d as WorldLocation;
        const visited = visitedLocationIds.has(loc.id);
        const el = document.createElement("div");
        el.style.pointerEvents = "auto";
        el.style.cursor = "pointer";
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.alignItems = "center";
        el.style.transform = "translate(-50%, -100%)";
        el.innerHTML = `
          <div style="width:16px;height:16px;border-radius:9999px;background:${
            visited ? "hsl(var(--primary))" : "hsl(38 75% 55%)"
          };border:2px solid white;box-shadow:0 0 0 5px rgba(124,148,255,0.25);"></div>
          <div style="margin-top:4px;padding:2px 9px;border-radius:9999px;background:rgba(10,14,26,0.85);color:#fff;font-size:11px;font-family:inherit;font-weight:600;white-space:nowrap;">${loc.label}</div>
        `;
        el.onclick = () => onSelectLocation(loc);
        return el;
      }}
    />
  );
};

export default ExplorerGlobe;
