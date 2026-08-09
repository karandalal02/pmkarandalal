import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Linkedin, TrendingUp, Users, Layers, Target, Sparkles } from "lucide-react";
import { useExplorer } from "@/context/ExplorerContext";
import Footer from "@/components/Footer";

const tags = [
  "F2P Mobile Gaming",
  "Feature Design",
  "Live Ops",
  "Experimentation",
];

const stats = [
  { value: "+5%", label: "Core Engagement KPIs" },
  { value: "+3%", label: "Revenue" },
  { value: "+1%", label: "Day-over-Day Retention" },
  { value: "+8%", label: "Engagement (Highest-Value Players)" },
  { value: "Strong", label: "ARPRU from retargeting within 14 days" },
];

const timeline = [
  {
    title: "Player Research",
    body: "Conducted qualitative research with highly engaged players to validate that the passive completion problem was real and that players wanted a harder, more rewarding challenge.",
  },
  {
    title: "Design Iteration",
    body: "Worked directly with Game Design and Art teams through multiple iterations. Core principle: the Grand Match needed to feel like an earned challenge, not just a harder version of the same thing.",
  },
  {
    title: "Scope Decision",
    body: "Mid-development, we reduced scope to ensure first-time players could understand and engage with the feature without friction. Complexity was deferred to later iterations. Shipping a clean initial version was more important than shipping a feature-complete but confusing one.",
  },
  {
    title: "Phased Launch",
    body: (
      <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
        <li>Validated technical KPIs first</li>
        <li>A/B tested Grand Match vs standard Goldies Match to isolate impact</li>
        <li>
          Ran multiple tuning experiments, extending beyond the original plan based on early results, to find optimal configuration
        </li>
        <li>Exclusive early access for highest-value players with special perks for early completers</li>
        <li>Retargeting campaign aimed at re-engaging lapsed players</li>
      </ul>
    ),
  },
];

const GoldiesGrandMatch = () => {
  const [showSticky, setShowSticky] = useState(false);
  const { visitCaseStudy } = useExplorer();

  useEffect(() => {
    window.scrollTo(0, 0);
    visitCaseStudy("goldies");
    const onScroll = () => setShowSticky(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [visitCaseStudy]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top back link */}
      <div className="container mx-auto px-6 pt-10">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>
      </div>

      {/* Sticky header on scroll */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showSticky
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-6 h-14 flex items-center justify-between">
            <span className="font-display font-bold text-foreground truncate">
              Goldies Grand Match
            </span>
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-16 max-w-5xl">
        {/* HERO */}
        <header className="mb-20">
          <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary font-mono text-xs tracking-wide mb-6">
            <Sparkles className="inline w-3.5 h-3.5 mr-2" />
            Case Study
          </div>
          <h1 className="text-5xl lg:text-7xl font-display font-black leading-tight mb-6">
            Goldies Grand Match
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed mb-8 max-w-3xl">
            Designing a deeper chase for highly engaged players
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl">
            A meta-layer built on top of an existing feature to drive intense
            engagement for a large-scale mobile F2P title's most valuable
            players.
          </p>
        </header>

        {/* CONTEXT */}
        <Section title="The Game" eyebrow="Context">
          <p className="text-muted-foreground leading-relaxed mb-8">
            Goldfish Casino (GFC) is a free-to-play casual slots game with a
            large and highly active player base. The core audience enjoys the
            thrill of casino-style gameplay from home. It's a high-engagement
            product where retention and time-on-app are the primary success
            metrics.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetaCard label="My Role" value="Product Manager" />
            <MetaCard
              label="Team"
              value="Cross-functional — Game Design, Engineering, Analytics, Art/Design, Qualitative Research, CS, Config Management (~20 collaborators daily)"
            />
            <MetaCard
              label="Timeline"
              value="Shipped early 2025, designed with future expansion in mind"
            />
          </div>
        </Section>

        {/* PROBLEM */}
        <Section
          title="When Your Best Players Stop Feeling the Chase"
          eyebrow="The Problem"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-3xl p-8">
              <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wide mb-4">
                The Observation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Goldies Match was one of GFC's core engagement features.
                Through analytics tracking, we identified a pattern: completion
                rate frequency among our most engaged players was plateauing.
                For heavy players, Goldies Match had become passive — something
                they completed automatically, without tension or
                intentionality.
              </p>
            </div>
            <div className="bg-card border border-border rounded-3xl p-8">
              <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wide mb-4">
                Why It Mattered
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our most engaged players drive disproportionate revenue and
                retention. If they lose their sense of chase, time-on-app
                drops, active rounds played decrease, and eventually they
                churn. This was a gap we couldn't tune our way out of — the
                feature's design ceiling had been reached.
              </p>
            </div>
          </div>
        </Section>

        {/* WHY THIS */}
        <Section title="Prioritization Reasoning" eyebrow="Why This, Why Now">
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            This problem was prioritized over other roadmap items because it
            directly addressed two core product gaps: time-on-app and active
            rounds played. Other initiatives targeted acquisition or
            monetization — this was about deepening the loop for players we
            already had. Fixing retention depth before optimizing spend is the
            right order of operations.
          </p>
        </Section>

        {/* WHAT WE CONSIDERED */}
        <Section title="Three Designs, One Winner" eyebrow="What We Considered">
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            We evaluated 3 distinct feature designs. Goldies Grand Match was
            selected because:
          </p>
          <ul className="space-y-3 max-w-3xl">
            {[
              "It was built as a configurable layer, giving us control to create live events and seasonal variants around it",
              "It was designed with a clear expansion roadmap — the initial version was scoped to validate the core loop before committing to full complexity",
              "It preserved the familiarity of Goldies Match while adding a meaningful new layer of challenge for heavy players",
            ].map((item, i) => (
              <li
                key={i}
                className="flex gap-4 bg-card border border-border rounded-2xl p-5"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </div>
                <p className="text-muted-foreground leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-6 max-w-3xl">
            The other two designs were either too complex to configure at scale
            or didn't offer the same future optionality.
          </p>
        </Section>

        {/* DESIGN & BUILD */}
        <Section title="How We Built It" eyebrow="Design & Build">
          <ol className="relative border-l-2 border-border pl-8 space-y-10">
            {timeline.map((step, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[42px] top-0 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                <h3 className="font-display font-bold text-foreground text-xl mb-3">
                  {step.title}
                </h3>
                {typeof step.body === "string" ? (
                  <p className="text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                ) : (
                  step.body
                )}
              </li>
            ))}
          </ol>
        </Section>

        {/* RESULTS */}
        <Section title="What It Moved" eyebrow="Results">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-3xl p-8 hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide mb-3 font-mono">
                  <TrendingUp className="h-4 w-4" />
                  Impact
                </div>
                <div className="font-display font-black text-4xl lg:text-5xl text-foreground mb-3 leading-none">
                  {s.value}
                </div>
                <div className="text-muted-foreground leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            The retargeting result was particularly notable — it validated that
            the feature had enough pull to re-engage players who had already
            lapsed, not just retain existing ones. The decision to run
            additional tuning experiments beyond the original plan added time
            but meaningfully improved the final configuration.
          </p>
        </Section>

        {/* FEATURE IN ACTION */}
        <Section title="Feature in Action" eyebrow="Showcase">
          <div className="bg-card border border-border rounded-3xl overflow-hidden mb-6">
            <video
              src="/goldies-grand-match.mp4"
              controls
              muted
              playsInline
              preload="metadata"
              className="w-full h-auto bg-black"
            />
          </div>
          <p className="text-sm text-muted-foreground italic">
            Goldies Grand Match — feature walkthrough.
          </p>
        </Section>

        {/* REFLECTION */}
        <Section title="What I'd Do Differently" eyebrow="Reflection">
          <div className="bg-card border border-border rounded-3xl p-8 max-w-3xl">
            <p className="text-muted-foreground leading-relaxed">
              One thing: I would have involved qualitative research earlier in
              the design process, not just for validation. Direct player
              feedback surfaced nuances that shaped the final design — getting
              that input in Week 1 instead of Week 4 would have reduced
              iteration cycles.
            </p>
          </div>
        </Section>

        {/* FOOTER CTA */}
        <section className="mt-24 mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
            Want to talk through this in detail? Let's connect.
          </h2>
          <a
            href="https://www.linkedin.com/in/dalal-karan/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform shadow-premium"
          >
            <Linkedin className="h-5 w-5" />
            Connect on LinkedIn
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const Section = ({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) => (
  <section className="mb-20 scroll-mt-24">
    <div className="text-primary font-mono text-xs uppercase tracking-widest mb-3">
      {eyebrow}
    </div>
    <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-8 leading-tight">
      {title}
    </h2>
    {children}
  </section>
);

const MetaCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-card border border-border rounded-2xl p-6">
    <div className="text-xs uppercase tracking-wide text-muted-foreground font-mono mb-2">
      {label}
    </div>
    <div className="text-foreground font-medium leading-snug">{value}</div>
  </div>
);

export default GoldiesGrandMatch;
