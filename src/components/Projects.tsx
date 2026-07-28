import { ArrowUpRight, Target, TrendingUp, Users, Zap, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Projects = () => {
  const projects = [
    {
      title: "Goldies Grand Match",
      company: "SciPlay",
      role: "Product Manager",
      problem: "Highly engaged players were looking for more meaningful progression outside of core gameplay.",
      solution: "Designed and launched Goldies Grand Match, a meta feature that gave top players new goals and incentives. Worked cross-functionally to align feature design with monetization and data insights.",
      result: "+5% engagement KPIs, +3% revenue increase",
      icon: Target,
      gradient: "from-purple-500 via-pink-500 to-red-500",
      accent: "purple",
      href: "/goldies-grand-match"
    },
    {
      title: "Shockwave Live Ops Event",
      company: "SciPlay", 
      role: "Product Manager",
      problem: "Needed to increase short-term engagement and reward behaviors during peak hours.",
      solution: "Designed Shockwave, a timed live ops event with high-reward incentives and dynamic triggers. Worked closely with analytics and ops to tune rewards and segment audiences.",
      result: "+7% increase in hourly engagement KPIs",
      icon: Zap,
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      accent: "cyan",
      href: "/shockwave"
    },
    {
      title: "AI Job Search System",
      company: "Personal Project",
      role: "Designer & Builder",
      problem: "A job search generates data across Gmail, LinkedIn, and Notion — reconstructing context every morning created cognitive overhead at the worst possible time.",
      solution: "A personal AI system that automates morning job search prioritisation using Gmail, Notion, and Claude. Synthesises inputs into a single prioritised action list for the day.",
      result: "30 min saved daily, 0 missed follow-ups, under 2 min manual input",
      icon: Sparkles,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      accent: "emerald",
      href: "/ai-job-search-system"
    },
    {
      title: "TV Time 2.0",
      company: "Personal Project",
      role: "Claude Code · TMDB · Google Drive · Vercel",
      problem: "A minimal personal show and movie tracker built after TV Time shut down on July 15 2026 — no social layer, no complexity, just pure tracking with a release calendar view.",
      solution: "Search anything from TMDB, mark episodes watched in one click, and see a weekly release calendar. Watch history lives in your own Google Drive — no servers, no subscription.",
      result: "Live — try it",
      icon: Users,
      gradient: "from-amber-500 via-orange-500 to-rose-500",
      accent: "amber",
      href: "/tv-time-2-0"
    }
  ];


  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Ultra-modern header */}
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-mono text-sm tracking-wide backdrop-blur-sm mb-8">
            <Sparkles className="inline w-4 h-4 mr-2" />
            Case Studies
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-display font-black mb-8 leading-tight">
            Featured
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Discover how I've driven measurable impact across gaming, travel, and enterprise automation through 
            <span className="text-accent font-semibold"> data-driven product decisions</span>
          </p>
        </div>
        
        {/* Modern project grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            const Wrapper: any = project.href ? Link : "div";
            const wrapperProps: any = project.href ? { to: project.href } : {};
            return (
              <Wrapper
                key={index}
                {...wrapperProps}
                className={`group relative bg-card/40 backdrop-blur-xl border border-border/30 rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-700 hover:scale-105 hover:shadow-premium ${project.href ? "cursor-pointer block" : ""}`}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-all duration-700`} />
                
                <div className="relative p-8">
                  {/* Modern icon design */}
                  <div className="relative mb-8">
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-2xl blur-xl opacity-50`} />
                    <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-r ${project.gradient}`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Company badge */}
                  <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono font-semibold mb-6 backdrop-blur-sm">
                    {project.company}
                  </div>
                  
                  {/* Project info */}
                  <div className="space-y-4 mb-8">
                    <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground font-medium">
                      {project.role}
                    </p>
                  </div>
                  
                  {/* Problem & Solution */}
                  <div className="space-y-6 mb-8">
                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-foreground text-sm tracking-wide uppercase">Challenge</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-foreground text-sm tracking-wide uppercase">Solution</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
                    </div>
                  </div>
                  
                  {/* Results showcase */}
                  <div className="relative p-6 rounded-2xl bg-gradient-to-r from-background/80 to-card/80 backdrop-blur-sm border border-primary/20 group-hover:border-primary/40 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span className="font-display font-bold text-primary text-sm tracking-wide uppercase">Impact</span>
                    </div>
                    <p className="font-display font-bold text-foreground text-lg leading-tight">{project.result}</p>
                  </div>
                  
                  {/* Hover effect arrow */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                    <div className="p-2 rounded-full bg-primary/20 backdrop-blur-sm">
                      <ArrowUpRight className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default Projects;