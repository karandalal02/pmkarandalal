import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import karanProfile from "@/assets/karan-profile.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full opacity-20 blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-accent rounded-full opacity-30 blur-lg animate-pulse delay-1000" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-30 scale-110" />
            <img
              src={karanProfile}
              alt="Karan Dalal"
              className="relative z-10 w-80 h-80 rounded-full object-cover border-4 border-primary/20 shadow-glow"
            />
          </div>
          
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <div className="mb-6">
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Hi, Meet Karan 👋
              </h1>
              <h2 className="text-2xl lg:text-3xl text-muted-foreground mb-6">
                Senior Product Manager
              </h2>
            </div>
            
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              I'm Karan Dalal — a software developer turned product manager with over 6 years of experience 
              building products that drive engagement, streamline operations, and improve business outcomes. 
              I thrive on solving real user problems and mentoring the next generation of PMs.
            </p>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="text-2xl font-bold text-primary">+5%</div>
                <div className="text-sm text-muted-foreground">Engagement Lift</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="text-2xl font-bold text-primary">+25%</div>
                <div className="text-sm text-muted-foreground">User Engagement</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="text-2xl font-bold text-primary">CSPO</div>
                <div className="text-sm text-muted-foreground">Certified</div>
              </div>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="group">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="gradient" size="lg" className="group">
                <BookOpen className="mr-2 h-4 w-4" />
                Book a Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;