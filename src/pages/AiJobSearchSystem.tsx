import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Linkedin, TrendingUp, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import shot1 from "@/assets/screenshot_1_clean.png.asset.json";
import shot2 from "@/assets/screenshot_2_redacted.png.asset.json";
import shot3 from "@/assets/screenshot_3_clean.png.asset.json";

const tags = ["AI", "Automation", "Claude API", "Product Thinking"];

const stats = [
  { value: "30 min", label: "Saved every morning" },
  { value: "0", label: "Missed follow-ups since launch" },
  { value: "5", label: "Integrations running simultaneously" },
  { value: "4", label: "Data sources synthesised into one brief" },
];

const screenshots = [
  {
    src: shot1.url,
    alt: "Tool calls running across Gmail, Calendar, and Notion",
    caption: "Tool calls running across Gmail, Calendar, and Notion",
  },
  {
    src: shot2.url,
    alt: "New activity flagged since yesterday including rejections and inbound recruiter outreach",
    caption:
      "New activity flagged since yesterday including rejections and inbound recruiter outreach",
  },
  {
    src: shot3.url,
    alt: "Missing debrief notes flagged with specific interviews named",
    caption: "Missing debrief notes flagged with specific interviews named",
  },
];

const components = [
  {
    title: "Gmail Scanner",
    body: "Claude connects to Gmail via MCP and scans the inbox for job-search related activity. It reads LinkedIn notification emails to track connection requests, accepted connections, and messages — no manual LinkedIn input needed. It also identifies recruiter responses, application status updates, calendar invites, and anything else requiring action. Each item is tagged with a suggested action and urgency level.",
  },
  {
    title: "Google Calendar Check",
    body: "Scans today and the next 48 hours for any scheduled interviews or important events. Flags anything that needs prep or confirmation before the day starts.",
  },
  {
    title: "Notion Pipeline Tracker",
    body: "Tracks all active leads, their current stage, and last contact date. Flags anyone overdue for follow-up based on time elapsed.",
  },
  {
    title: "Granola Interview Notes",
    body: "When an interview happens, Granola captures the transcript automatically. The morning after, the system surfaces key takeaways, open action items, and any follow-ups due from that conversation — so nothing falls through the cracks after a busy interview day.",
  },
  {
    title: "Morning Brief Output",
    body: "Claude synthesises all four inputs and outputs a prioritised action list. Format: URGENT, DO TODAY, FOLLOW-UPS DUE, ACTIVE PIPELINE STATUS, WEEKLY PACE.",
  },
];

const designDecisions = [
  {
    title: "No Scraping",
    body: "LinkedIn has no public API. Rather than building brittle scrapers that break on UI updates, the system reads LinkedIn notification emails that already arrive in Gmail automatically. Same data, more reliable.",
  },
  {
    title: "No Dashboard",
    body: "Adding another interface to check every morning defeats the purpose. The output is a plain text brief — readable in 60 seconds, actionable immediately. No login, no navigation, no charts.",
  },
  {
    title: "Granola Over Manual Notes",
    body: "Interview transcripts used to be the hardest part to capture consistently. Integrating Granola meant the notes happen automatically — no manual entry, no forgotten follow-ups after a long day of back-to-back interviews.",
  },
];


const AiJobSearchSystem = () => {
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
              AI Job Search System
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
            Personal Project
          </div>
          <h1 className="text-5xl lg:text-7xl font-display font-black leading-tight mb-6">
            AI Job Search System
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed mb-8 max-w-3xl">
            A personal automation system built to eliminate daily overhead and surface what actually needs attention during a job search
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
            Instead of manually reconstructing context across multiple tools every morning, I built a system that does it for me and tells me exactly what to do first.
          </p>
        </header>

        {/* CONTEXT */}
        <Section title="The Setup" eyebrow="Context">
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
            I built this during an active job search, starting from scratch and iterating as the search evolved. The system is ongoing — each week of searching reveals new friction points and new ways to improve it.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetaCard label="My Role" value="Designer and Builder" />
            <MetaCard label="Tools" value="Claude API, Gmail MCP, Notion MCP, Python" />
            <MetaCard label="Timeline" value="Built and iterating — ongoing" />
          </div>
        </Section>

        {/* PROBLEM */}
        <Section title="Multiple Tools, Manual Overhead" eyebrow="The Problem">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-3xl p-8">
              <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wide mb-4">
                The Observation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A job search generates data across multiple channels simultaneously. Gmail receives recruiter responses, application confirmations, and status updates. LinkedIn tracks connection requests, accepted connections, and message threads. Notion holds warm contact history and follow-up dates. Each part of the job search is handled by a specialised tool — and as a job seeker there is manual overhead to keep track of everything across them.
              </p>
            </div>
            <div className="bg-card border border-border rounded-3xl p-8">
              <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wide mb-4">
                Why It Mattered
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The overhead was not just time — it was cognitive load at the worst possible moment. Job searching requires energy for outreach, interviews, and applications. Spending the first part of every day figuring out what to do creates friction that compounds into missed follow-ups and a search that moves slower than it should. Having a clear direction on priorities gives you a clear picture and lets you start the day with a focused mind.
              </p>
            </div>
          </div>
        </Section>

        {/* INSIGHT */}
        <Section title="The Real Problem Was Prioritisation, Not Tracking" eyebrow="The Insight">
          <div className="space-y-5 max-w-3xl">
            <p className="text-muted-foreground leading-relaxed">
              I already had tracking tools. The problem was not that data was missing — it was that nothing synthesised it into a clear action list for today.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The question I actually needed answered every morning: given everything in flight right now, what are the most important things to do today and in what order?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That is a reasoning problem, not a tracking problem. Which is exactly what Claude is good at.
            </p>
          </div>
        </Section>

        {/* WHAT I BUILT */}
        <Section title="A Morning Brief, Not Another Dashboard" eyebrow="What I Built">
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            The system has three components working together:
          </p>
          <ol className="relative border-l-2 border-border pl-8 space-y-10">
            {components.map((step, i) => (
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

        {/* EXAMPLE OUTPUT */}
        <Section title="What It Looks Like" eyebrow="Example Output">
          <div className="bg-muted/50 border border-border rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <figure>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <img
                    src={morningBriefImg}
                    alt="Morning Brief view of the AI Job Search System showing the Run Brief action"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="text-sm text-muted-foreground mt-3 text-center">
                  Morning Brief — one-click scan of Gmail and Notion to load the day's action list.
                </figcaption>
              </figure>
              <figure>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <img
                    src={contactsImg}
                    alt="Contacts view of the AI Job Search System showing manual contact entry"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="text-sm text-muted-foreground mt-3 text-center">
                  Contacts — outreach list auto-populated via the Morning Brief, with minimal manual add.
                </figcaption>
              </figure>
            </div>
            <p className="text-xs text-muted-foreground italic mt-6 text-center">
              Names, email addresses, and company details have been anonymised.
            </p>
          </div>
        </Section>

        {/* DESIGN DECISIONS */}
        <Section title="What I Chose Not to Build" eyebrow="Design Decisions">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {designDecisions.map((d, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-3xl p-7 hover:border-primary/40 transition-all duration-300"
              >
                <h3 className="font-display font-bold text-foreground text-lg mb-3">
                  {d.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* RESULTS */}
        <Section title="What Changed" eyebrow="Results">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
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
                <div className="text-muted-foreground leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            The most valuable outcome was not time saved — it was clarity. Knowing exactly what needs attention today and in what order changes how you approach the rest of the day. The system does not replace judgment, it removes the overhead that gets in the way of it.
          </p>
        </Section>

        {/* REFLECTION */}
        <Section title="What Is Next" eyebrow="Reflection">
          <div className="bg-card border border-border rounded-3xl p-8 max-w-3xl space-y-5">
            <p className="text-muted-foreground leading-relaxed">
              The system started as a Gmail and Notion connection. It grew because each new interview round revealed a new gap — a missed follow-up, a debrief note that never got written, a calendar event that needed prep the morning of. Each gap became a new component.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The next improvement is integrating job discovery directly into the brief. A tool like Utori monitors new PM roles posted in the last 24 hours. Adding that feed means the morning brief becomes the single starting point: here are the new roles worth looking at, here are the follow-ups due, here is what needs attention. One place before anything else starts.
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

export default AiJobSearchSystem;
