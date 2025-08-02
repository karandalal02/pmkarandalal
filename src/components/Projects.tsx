import { ArrowUpRight, Target, TrendingUp, Users, Zap } from "lucide-react";
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
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Shockwave Live Ops Event",
      company: "SciPlay", 
      role: "Product Manager",
      problem: "Incentivize hourly engagement",
      solution: "Built limited-time high-reward event",
      result: "+7% increase in hourly engagement KPIs",
      icon: Zap,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Onboarding Flow Redesign",
      company: "Kayak",
      role: "Product Manager", 
      problem: "Low user retention during onboarding",
      solution: "Conducted UX research, user testing, and MVP rollout",
      result: "+25% weekly user engagement, validated feature roadmap",
      icon: Users,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how I've driven measurable impact across gaming, travel, and enterprise automation
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-all duration-500 hover:scale-105 hover:shadow-glow"
              >
                {/* Project Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${project.gradient} mb-6`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                {/* Company Badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  {project.company}
                </div>
                
                {/* Project Title */}
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {project.role}
                </p>
                
                {/* Problem & Solution */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Problem</h4>
                    <p className="text-sm text-muted-foreground">{project.problem}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Solution</h4>
                    <p className="text-sm text-muted-foreground">{project.solution}</p>
                  </div>
                </div>
                
                {/* Results */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary text-sm">Impact</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{project.result}</p>
                </div>
                
                {/* Hover Effect Arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Additional Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
            <h3 className="font-semibold text-foreground mb-2">APMC Platform</h3>
            <p className="text-sm text-muted-foreground">Enhanced agricultural marketplace efficiency through digital transformation initiatives</p>
          </div>
          <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
            <h3 className="font-semibold text-foreground mb-2">Business Process Optimization</h3>
            <p className="text-sm text-muted-foreground">Streamlined enterprise workflows, reducing operational overhead by 30%</p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button variant="gradient" size="lg" className="group">
            View All Projects
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;