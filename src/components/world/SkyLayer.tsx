import { useMemo } from "react";
import type { Phase } from "@/context/TimeOfDayContext";

interface SkyLayerProps {
  phase: Phase;
  camera: number;
  worldWidth: number;
  reducedMotion: boolean;
}

const BODY_POSITION: Record<Phase, { left: string; top: string; size: number }> = {
  dawn: { left: "18%", top: "58%", size: 96 },
  day: { left: "72%", top: "12%", size: 110 },
  sunset: { left: "80%", top: "56%", size: 120 },
  night: { left: "76%", top: "14%", size: 76 },
};

const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const Cloud = ({ scale = 1 }: { scale?: number }) => (
  <div className="relative" style={{ transform: `scale(${scale})` }}>
    <div className="absolute w-24 h-10 rounded-full bg-[hsl(var(--sky-cloud))]" />
    <div className="absolute left-8 -top-5 w-16 h-14 rounded-full bg-[hsl(var(--sky-cloud))]" />
    <div className="absolute left-20 -top-1 w-14 h-9 rounded-full bg-[hsl(var(--sky-cloud))]" />
  </div>
);

const SkyLayer = ({ phase, camera, worldWidth, reducedMotion }: SkyLayerProps) => {
  const isNight = phase === "night";

  const stars = useMemo(
    () =>
      Array.from({ length: 70 }).map((_, i) => ({
        left: rand(i + 1) * 100,
        top: rand(i + 51) * 62,
        size: 1 + rand(i + 101) * 2,
        delay: rand(i + 151) * 4,
      })),
    []
  );

  const clouds = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        left: 120 + rand(i + 11) * (worldWidth - 200),
        top: 20 + rand(i + 71) * 130,
        scale: 0.6 + rand(i + 131) * 0.9,
        depth: i % 2 === 0 ? 0.15 : 0.35,
        duration: 60 + rand(i + 191) * 50,
      })),
    [worldWidth]
  );

  const birds = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        top: 40 + rand(i + 211) * 110,
        delay: rand(i + 241) * 18,
        duration: 22 + rand(i + 271) * 16,
        scale: 0.6 + rand(i + 301) * 0.6,
      })),
    []
  );

  const body = BODY_POSITION[phase];

  return (
    <div className="absolute inset-x-0 top-0 h-[70%] overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Sun / moon */}
      <div
        className="absolute"
        style={{
          left: body.left,
          top: body.top,
          transform: `translate(${-camera * 0.05}px, -50%)`,
        }}
      >
        <div
          className="rounded-full bg-[hsl(var(--sky-body))]"
          style={{
            width: body.size,
            height: body.size,
            boxShadow: `0 0 ${body.size}px ${body.size / 3}px hsl(var(--sky-body) / 0.45)`,
          }}
        />
        {isNight && (
          <div
            className="absolute rounded-full bg-[hsl(var(--sky-crater))]"
            style={{ width: body.size * 0.28, height: body.size * 0.28, left: "22%", top: "26%" }}
          />
        )}
      </div>

      {/* Stars */}
      {isNight && (
        <div className="absolute inset-0">
          {stars.map((s, i) => (
            <span
              key={i}
              className={`absolute rounded-full bg-[hsl(var(--sky-star))] ${
                reducedMotion ? "opacity-80" : "animate-twinkle"
              }`}
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
          {!reducedMotion && (
            <span className="absolute left-[15%] top-[18%] h-px w-24 bg-gradient-to-r from-transparent to-[hsl(var(--sky-star))] animate-shooting-star" />
          )}
        </div>
      )}

      {/* Clouds (parallax) */}
      <div className="absolute inset-0" style={{ width: worldWidth }}>
        {clouds.map((c, i) => (
          <div
            key={i}
            className={`absolute opacity-80 ${reducedMotion ? "" : "animate-cloud-drift"}`}
            style={{
              left: c.left,
              top: c.top,
              transform: `translateX(${-camera * c.depth}px)`,
              animationDuration: `${c.duration}s`,
              animationDelay: `${-i * 7}s`,
            }}
          >
            <Cloud scale={c.scale} />
          </div>
        ))}
      </div>

      {/* Birds */}
      {!isNight && !reducedMotion && (
        <div className="absolute inset-0">
          {birds.map((b, i) => (
            <svg
              key={i}
              className="absolute animate-bird-glide text-[hsl(var(--sky-bird))]"
              style={{
                top: b.top,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.duration}s`,
                transform: `scale(${b.scale})`,
              }}
              width="26"
              height="12"
              viewBox="0 0 26 12"
              fill="none"
            >
              <path
                d="M1 7C4 1 7 1 10 6C13 1 16 1 19 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkyLayer;
