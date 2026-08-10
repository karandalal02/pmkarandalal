import { Check, type LucideIcon } from "lucide-react";

interface WorldBuildingProps {
  label: string;
  x: number;
  width: number;
  height: number;
  visited: boolean;
  near: boolean;
  doorOpen: boolean;
  variant: "section" | "shop";
  Icon?: LucideIcon;
}

const WorldBuilding = ({ label, x, width, height, visited, near, doorOpen, variant, Icon }: WorldBuildingProps) => {
  const windows = Math.max(2, Math.round(height / 90));

  return (
    <div className="absolute bottom-0" style={{ left: x - width / 2, width }}>
      <div
        className={`relative rounded-t-xl border-2 border-b-0 transition-colors duration-300 ${
          near ? "border-primary bg-card" : "border-border bg-card/70"
        }`}
        style={{ height }}
      >
        {/* Shop awning */}
        {variant === "shop" && (
          <div className="absolute -top-2 -left-1 -right-1 h-3 rounded-t-md overflow-hidden flex">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className={`flex-1 ${i % 2 === 0 ? "bg-primary" : "bg-secondary"}`} />
            ))}
          </div>
        )}

        {/* Rooftop icon */}
        {Icon && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 rounded-xl border-2 p-2 transition-all duration-300 ${
              near ? "border-primary bg-primary text-primary-foreground scale-110" : "border-border bg-card text-primary"
            }`}
            style={{ top: -76 }}
          >
            <Icon className="h-6 w-6" />
          </div>
        )}


        {/* Signboard */}
        <div
          className={`absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full border text-xs font-semibold transition-all duration-300 ${
            near
              ? "bg-primary text-primary-foreground border-primary scale-105"
              : variant === "shop"
                ? "bg-card text-primary border-primary/50"
                : "bg-secondary text-secondary-foreground border-border"
          }`}
        >
          <span className="inline-flex items-center gap-1">
            {visited && <Check className="h-3 w-3" />}
            {variant === "shop" && <span className="font-mono opacity-70">CASE</span>}
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
          <div className="absolute left-1/2 -translate-x-1/2 animate-scale-in" style={{ top: -124 }}>
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
