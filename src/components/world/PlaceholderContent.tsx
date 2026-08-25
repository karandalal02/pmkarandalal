interface PlaceholderContentProps {
  label: string;
}

/** Stand-in for places with no dedicated content yet (e.g. APMC, Protothon). */
const PlaceholderContent = ({ label }: PlaceholderContentProps) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20">
    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Coming soon</p>
    <h2 className="font-display text-3xl font-bold text-foreground mb-3">{label}</h2>
    <p className="text-muted-foreground max-w-md">A proper writeup for this one is still on the way.</p>
  </div>
);

export default PlaceholderContent;
