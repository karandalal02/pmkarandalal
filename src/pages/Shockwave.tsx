import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Linkedin, TrendingUp, Sparkles } from "lucide-react";
import { useExplorer } from "@/context/ExplorerContext";
import Footer from "@/components/Footer";

const tags = [
  "F2P Mobile Gaming",
  "Live Ops",
  "Engagement",
  "Feature Design",
];

const stats = [
  { value: "+7%", label: "Hourly Engagement KPIs" },
  { value: "↑", label: "In-Game Currency Utilization Rate" },
  { value: "✓", label: "Validated Live Ops Model for Future Events" },
];

const timeline = [
  {
    title: "Phase 1 — Feature Validation",
    body: "Launched Shockwave with a holdout group built in from the start — a segment of players did not receive the feature for 4-5 runs, allowing a clean baseline comparison. Primary question: Does the feature drive the intended behavior change? Measured engagement response and currency utilization during active windows against the holdout.",
  },
  {
    title: "Phase 2 — Optimization",
    body: "With the core mechanic validated, ran a second round of tests to find the optimal version — timing windows, reward multipliers, and activation frequency. Selected the configuration that produced the best sustainable engagement lift without cannibalizing standard gameplay sessions.",
  },
  {
    title: "No Major Pivots",
    body: "The feature performed as hypothesized from Phase 1, so no significant redesigns were required between phases.",
  },
];

const Shockwave = () => {
  const [showSticky, setShowSticky] = useState(false);
  const { visitCaseStudy } = useExplorer();

  useEffect(() => {
    window.scrollTo(0, 0);
    visitCaseStudy("shockwave");
    const onScroll = () => setShowSticky(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [visitCaseStudy]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 pt-10">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>
      </div>

      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showSticky ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-6 h-14 flex items-center justify-between">
            <span className="font-display font-bold text-foreground truncate">
              Shockwave
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
            Shockwave
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed mb-8 max-w-3xl">
            A time-bound live ops event designed to drive peak-hour engagement and in-game currency utilization
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
            A limited-time reward amplifier layered on top of the core loop, giving players a reason to play harder during targeted windows.
          </p>
        </header>

        {/* CONTEXT */}
        <Section title="The Setup" eyebrow="Context">
          <p className="text-muted-foreground leading-relaxed mb-8">
            Shockwave is a live ops feature built on top of Goldfish Casino's core reward system. Rather than changing the core loop, it temporarily amplifies it — players who choose to bet higher during a Shockwave window can win significantly bigger rewards than usual, for a limited time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetaCard label="My Role" value="Product Manager" />
            <MetaCard
              label="Team"
              value="Cross-functional — Game Design, Engineering, Analytics, Art/Design, Config Management"
            />
            <MetaCard label="Timeline" value="Released mid 2025" />
          </div>
        </Section>

        {/* PROBLEM */}
        <Section title="Players Had Currency. They Weren't Using It." eyebrow="The Problem">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-3xl p-8">
              <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wide mb-4">
                The Observation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A cross-game gap analysis revealed that players on Goldfish Casino were accumulating in-game currency without spending it at the rate we expected. This hoarding behavior indicated a core loop problem: players didn't have a compelling enough reason to bet higher or engage more aggressively during any given session.
              </p>
            </div>
            <div className="bg-card border border-border rounded-3xl p-8">
              <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wide mb-4">
                Why It Mattered
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Hoarded currency means players aren't fully engaging with the reward system. It also compresses the ceiling on session depth — players who don't bet up don't experience the excitement of bigger wins, which directly impacts time-on-app and hourly engagement metrics.
              </p>
            </div>
          </div>
        </Section>

        {/* WHY THIS APPROACH */}
        <Section title="A Proven Pattern, Applied With Purpose" eyebrow="Why This Approach">
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            This solution had a documented track record in similar F2P titles, which gave strong directional confidence going in. More importantly, the mechanics were a natural fit: rather than redesigning the core loop, we were adding a time-bounded amplifier on top of it.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            The live ops layer model was specifically chosen because:
          </p>
          <ul className="space-y-3 max-w-3xl">
            {[
              "It gives the team full control over when and how long to activate it",
              "It can be targeted to peak hours or specific player segments",
              "It doesn't permanently alter game balance",
              "It creates urgency without frustrating players who choose not to participate — betting up is always optional",
            ].map((item, i) => (
              <li key={i} className="flex gap-4 bg-card border border-border rounded-2xl p-5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </div>
                <p className="text-muted-foreground leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* FEATURE DESIGN */}
        <Section title="Simple by Design" eyebrow="Feature Design">
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            The feature design was intentionally kept simple. The goal was player clarity — when Shockwave is active, players immediately understand the proposition: bet higher, win bigger, for a limited time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              "Visual design built to match the existing game theme, ensuring the feature felt native rather than bolted on",
              "UI designed for instant comprehension — no tutorials, no complex mechanics, one clear value proposition",
              "Participation is always opt-in — players choose whether to bet up, preserving player agency",
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6">
                <p className="text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-3xl p-8 max-w-3xl">
            <div className="text-xs uppercase tracking-wide text-muted-foreground font-mono mb-3">
              Core loop during Shockwave
            </div>
            <p className="text-foreground font-medium leading-relaxed">
              Bet higher → Unlock access to rewards significantly larger than standard → Time pressure creates urgency to engage now
            </p>
          </div>
        </Section>

        {/* HOW WE SHIPPED IT */}
        <Section title="Experiment Structure" eyebrow="How We Shipped It">
          <ol className="relative border-l-2 border-border pl-8 space-y-10">
            {timeline.map((step, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[42px] top-0 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                <h3 className="font-display font-bold text-foreground text-xl mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* RESULTS */}
        <Section title="What It Moved" eyebrow="Results">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {stats.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-3xl p-8 hover:border-primary/40 transition-all duration-300">
                <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide mb-3 font-mono">
                  <TrendingUp className="h-4 w-4" />
                  Impact
                </div>
                <div className="font-display font-black text-4xl lg:text-5xl text-foreground mb-3 leading-none">
                  {s.value}
                </div>
                <div className="text-muted-foreground leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            The hourly engagement lift confirmed that players responded strongly to time-bounded urgency when paired with a clear, high-value reward proposition. Shockwave also established a repeatable live ops template — the activation model can now be deployed across different timing windows and tuned independently of the core game loop.
          </p>
        </Section>

        {/* FEATURE IN ACTION */}
        <Section title="Feature in Action" eyebrow="Showcase">
          <div className="bg-card border border-border rounded-3xl overflow-hidden mb-6">
            <video
              src="/shockwave.mov"
              controls
              muted
              playsInline
              preload="metadata"
              className="w-full h-auto bg-black"
            />
          </div>
          <p className="text-sm text-muted-foreground italic">
            Shockwave — feature walkthrough.
          </p>
        </Section>

        {/* REFLECTION */}
        <Section title="What I'd Do Differently" eyebrow="Reflection">
          <div className="bg-card border border-border rounded-3xl p-8 max-w-3xl">
            <p className="text-muted-foreground leading-relaxed">
              Shockwave is a limited-time live event, which makes it inherently difficult to accumulate statistically robust data within a single run. If I were to do it again, I would push for a more extended testing plan — testing across longer time windows, varying configurations, and running direct comparisons against previous events. More variation in the test design would give sharper signal on what drives the lift and make future activation decisions more precise.
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

export default Shockwave;
