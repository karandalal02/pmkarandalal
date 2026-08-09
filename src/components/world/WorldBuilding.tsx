import { Check } from "lucide-react";

interface WorldBuildingProps {
  label: string;
  x: number;
  width: number;
  height: number;
  visited: boolean;
  near: boolean;
  doorOpen: boolean;
  variant: "section" | "shop";
}

const WorldBuilding = ({ label, x, width, height, visited, near, doorOpen, variant }: WorldBuildingProps) => {
  const windows = Math.max(2, Math.round(height / 90));

  return (
    <div className="absolute bottom-0" style={{ left: x - width / 2, width }}>
      <div
        className={`relative rounded-t-xl border-2 border-b-0 transition-colors duration-300 ${
          near ? "border-primary bg-card" : "border-border bg-card/70"
        }`}
        style={{ height }}
      >
        {/* Signboard */}
        <div
          className={`absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full border text-xs font-semibold transition-all duration-300 ${
            near
              ? "bg-primary text-primary-foreground border-primary scale-105"
              : "bg-secondary text-secondary-foreground border-border"
          }`}
        >
          <span className="inline-flex items-center gap-1">
            {visited && <Check className="h-3 w-3" />}
            {label}
          </span>
        </div>

        {/* Windows */}
        <div className="absolute inset-x-4 top-5 grid grid-cols-2 gap-3">
          {Array.from({ length: windows * 2 }).map((_, i) => (
            <div
              key={i}
              className={`h-6 rounded-sm border transition-colors duration-500 ${
                visited ? "bg-primary/25 border-primary/40" : "bg-muted border-border/60"
              }`}
            />
          ))}
        </div>

        {/* Door */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ width: variant === "shop" ? 44 : 58, height: variant === "shop" ? 64 : 84, perspective: "600px" }}
        >
          <div className="absolute inset-0 rounded-t-md bg-background border-2 border-b-0 border-border overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          </div>
          <div
            className="absolute inset-0 rounded-t-md border-2 border-b-0 border-primary bg-secondary origin-left transition-transform duration-500 ease-out"
            style={{ transform: doorOpen ? "rotateY(-105deg)" : "rotateY(0deg)" }}
          >
            <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
        </div>

        {/* Enter prompt */}
        {near && (
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 animate-scale-in">
            <span className="whitespace-nowrap text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-foreground text-background">
              Enter ↑
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldBuilding;
