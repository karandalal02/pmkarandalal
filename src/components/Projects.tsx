import { ArrowUpRight, Target, TrendingUp, Users, Zap, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "Goldies Grand Match",
      company: "SciPlay",
      role: "Product Manager",
      problem: "Drive engagement from highly active players",
      solution: "Designed and launched a meta feature with targeted incentives",
      result: "+5% engagement KPIs, +3% revenue increase",
      icon: Target,
      gradient: "from-purple-500 via-pink-500 to-red-500",
      accent: "purple"
    },
    {
      title: "Shockwave Live Ops Event",
      company: "SciPlay", 
      role: "Product Manager",
      problem: "Incentivize hourly engagement",
      solution: "Built limited-time high-reward event",
      result: "+7% increase in hourly engagement KPIs",
      icon: Zap,
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      accent: "cyan"
    },
    {
      title: "Onboarding Flow Redesign",
      company: "Kayak",
      role: "Product Manager", 
      problem: "Low user retention during onboarding",
      solution: "Conducted UX research, user testing, and MVP rollout",
      result: "+25% weekly user engagement, validated feature roadmap",
      icon: Users,
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      accent: "amber"
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
            return (
              <div
                key={index}
                className="group relative bg-card/40 backdrop-blur-xl border border-border/30 rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-700 hover:scale-105 hover:shadow-premium"
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
              </div>
            );
          })}
        </div>
        
        {/* Modern additional highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              title: "APMC Platform",
              description: "Enhanced agricultural marketplace efficiency through digital transformation initiatives",
              icon: "🌾"
            },
            {
              title: "Business Process Optimization", 
              description: "Streamlined enterprise workflows, reducing operational overhead by 30%",
              icon: "⚡"
            }
          ].map((highlight, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-card/30 backdrop-blur-md border border-border/30 hover:border-primary/40 transition-all duration-500 hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{highlight.icon}</div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Modern CTA */}
        <div className="text-center">
          <Button variant="premium" size="lg" className="group text-lg px-10 py-6">
            <ExternalLink className="mr-2 h-5 w-5" />
            View All Projects
            <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;