const AVATAR_URL = `${import.meta.env.BASE_URL}lovable-uploads/19c0388a-baf8-4196-8858-d6de2cbf18ce.png`;

interface WorldCharacterProps {
  walking: boolean;
  facing: number; // -1 left, 1 right
  reducedMotion: boolean;
}

const WorldCharacter = ({ walking, facing, reducedMotion }: WorldCharacterProps) => {
  const animate = walking && !reducedMotion;

  return (
    <div className="relative flex flex-col items-center" style={{ transform: `scaleX(${facing < 0 ? -1 : 1})` }}>
      {/* Bobblehead */}
      <div className={animate ? "animate-head-bob" : ""}>
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/60 bg-card shadow-glow">
          <img src={AVATAR_URL} alt="Explorer avatar" className="w-full h-full object-cover object-top" />
        </div>
        {/* neck */}
        <div className="mx-auto w-0.5 h-2 bg-foreground/70" />
      </div>

      {/* Stick figure body */}
      <svg width="44" height="56" viewBox="0 0 44 56" className="-mt-0.5 text-foreground/80" aria-hidden="true">
        {/* torso */}
        <line x1="22" y1="0" x2="22" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* arms */}
        <g className={animate ? "animate-limb-swing" : ""} style={{ transformOrigin: "22px 8px" }}>
          <line x1="22" y1="8" x2="8" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <g className={animate ? "animate-limb-swing-alt" : ""} style={{ transformOrigin: "22px 8px" }}>
          <line x1="22" y1="8" x2="36" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        {/* legs */}
        <g className={animate ? "animate-limb-swing-alt" : ""} style={{ transformOrigin: "22px 28px" }}>
          <line x1="22" y1="28" x2="12" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <g className={animate ? "animate-limb-swing" : ""} style={{ transformOrigin: "22px 28px" }}>
          <line x1="22" y1="28" x2="32" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>

      {/* shadow */}
      <div className="w-12 h-2 rounded-[50%] bg-foreground/15 blur-[1px] -mt-1" />
    </div>
  );
};

export default WorldCharacter;
