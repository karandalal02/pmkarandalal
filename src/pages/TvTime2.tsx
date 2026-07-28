import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Linkedin, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import tvtimeIcon from "@/assets/tvtime-icon.png.asset.json";

const tags = [
  "Personal Project",
  "Claude Code",
  "TMDB",
  "Google Drive",
  "Vercel",
];

const stack = [
  "Claude Code",
  "TMDB API",
  "Google OAuth",
  "Google Drive API",
  "Vercel",
  "JavaScript",
];

const features = [
  {
    title: "Track anything",
    body: "Search any show or movie from TMDB's database. Mark episodes watched with one click. See exactly where you are in any series at a glance.",
  },
  {
    title: "Release calendar",
    body: "A weekly view of what is coming out — new episodes from shows you follow, movies releasing soon. The one view that none of the alternatives get right.",
  },
  {
    title: "Your data, your storage",
    body: "Watch history stored in your Google Drive. No servers I pay for. No subscription. No risk of another shutdown taking your data with it.",
  },
];

const APP_URL = "https://tv-time-2-0.vercel.app/";

const TvTime2 = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setShowSticky(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              TV Time 2.0
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
            TV Time 2.0
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed mb-8 max-w-3xl">
            Built in a weekend after TV Time shut down. No social layer. No complexity. Just track what you watch and see what is coming next.
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
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform shadow-premium"
          >
            Try it
            <ExternalLink className="h-4 w-4" />
          </a>
        </header>

        <Section title="TV Time Shut Down. The Alternatives Are Worse." eyebrow="The Problem">
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            On July 15 2026, TV Time shut down permanently. 26 million users lost their watch history. The stated reason was it could no longer sustain operations as a free app — but the real reason was Whip Media pivoted to enterprise AI after a private equity acquisition, and the consumer app became unnecessary. The users were never the customer. They were the data source.
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            The alternatives that exist — Trakt, Simkl, Serializd — are feature-heavy platforms built for power users. Marking one episode as watched takes five clicks. None of them answer the simple question I actually care about: what am I watching, and what is coming next week?
          </p>
        </Section>

        <Section title="The Minimum Version That Actually Works" eyebrow="What I Built">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-3xl p-8">
                <h3 className="font-display font-bold text-foreground text-lg mb-3">
                  {f.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Tech Stack" eyebrow="How It Is Built">
          <div className="flex flex-wrap gap-2 mb-8">
            {stack.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            Built entirely with Claude Code over a weekend. TMDB powers the content database — the same source used by most tracking apps. Google Drive handles storage so there is no backend to maintain and no cost that scales with users. Deployed on Vercel. The whole thing cost nothing to build and costs nothing to run.
          </p>
        </Section>

        <Section title="Making It Work for Others" eyebrow="What Is Next">
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            Right now the app uses my own Google Drive for storage, which means only I can use it. The next version gives each user their own Google Drive connection so their data is theirs, stored where they control it. No shared database, no privacy concerns, no single point of failure.
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            The goal is not to rebuild TV Time. The goal is to solve the one thing TV Time did well — letting you know where you are and what is coming next — without any of the complexity that made TV Time expensive to run.
          </p>
        </Section>

        <section className="mt-24 mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
            Want to talk through this? Let us connect.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/dalal-karan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform shadow-premium"
            >
              <Linkedin className="h-5 w-5" />
              Connect on LinkedIn
            </a>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-semibold hover:border-primary/40 transition-colors"
            >
              Try TV Time 2.0
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
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

export default TvTime2;
