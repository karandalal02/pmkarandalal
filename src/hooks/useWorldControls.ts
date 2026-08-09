import { useCallback, useEffect, useRef, useState } from "react";

export type WorldControls = {
  dirRef: React.MutableRefObject<number>;
  enterPressed: number;
  setTouchDir: (dir: number) => void;
  touchDir: number;
};

/**
 * Keyboard + touch input for the explorer world.
 * dirRef holds -1 / 0 / 1 so the animation loop can read it without re-rendering.
 */
export const useWorldControls = (enabled: boolean, onEnter: () => void, onExit: () => void) => {
  const keys = useRef<Set<string>>(new Set());
  const dirRef = useRef(0);
  const [touchDir, setTouchDirState] = useState(0);

  const recompute = useCallback(() => {
    const left = keys.current.has("ArrowLeft") || keys.current.has("a") || keys.current.has("A");
    const right = keys.current.has("ArrowRight") || keys.current.has("d") || keys.current.has("D");
    dirRef.current = (right ? 1 : 0) - (left ? 1 : 0);
  }, []);

  const setTouchDir = useCallback(
    (dir: number) => {
      setTouchDirState(dir);
      if (dir === 0) recompute();
      else dirRef.current = dir;
    },
    [recompute]
  );

  useEffect(() => {
    if (!enabled) {
      keys.current.clear();
      dirRef.current = 0;
      return;
    }

    const down = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", " "].includes(e.key)) e.preventDefault();
      if (e.key === "Escape") {
        onExit();
        return;
      }
      if (e.key === "ArrowUp" || e.key === "e" || e.key === "E" || e.key === "Enter" || e.key === " ") {
        onEnter();
        return;
      }
      keys.current.add(e.key);
      recompute();
    };
    const up = (e: KeyboardEvent) => {
      keys.current.delete(e.key);
      recompute();
    };
    const blur = () => {
      keys.current.clear();
      dirRef.current = 0;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, [enabled, onEnter, onExit, recompute]);

  return { dirRef, setTouchDir, touchDir };
};
