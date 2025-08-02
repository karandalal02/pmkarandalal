import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import karanProfile from "@/assets/karan-profile.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Ultra-modern background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Dynamic floating elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-primary rounded-full opacity-20 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-accent rounded-full opacity-25 blur-2xl animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full opacity-30 blur-xl animate-float" style={{ animationDelay: '-6s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Modern Profile Section */}
          <div className="relative group">
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="absolute inset-4 rounded-full border-2 border-accent/40 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
            
            <img
              src={karanProfile}
              alt="Karan Dalal"
              className="relative z-10 w-80 h-80 rounded-full object-cover border-4 border-background/20 backdrop-blur-sm shadow-premium group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-gradient-accent text-accent-foreground px-6 py-3 rounded-2xl font-bold text-lg shadow-accent border-2 border-accent/20 backdrop-blur-sm animate-bounce">
              <Sparkles className="inline w-5 h-5 mr-2" />
              6+ Years
            </div>
          </div>
          
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left max-w-3xl">
            <div className="mb-8 space-y-6">
              {/* Modern Typography */}
              <div className="space-y-4">
                <div className="inline-block px-6 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-mono text-sm tracking-wide backdrop-blur-sm">
                  👋 Available for consulting
                </div>
                
                <h1 className="text-6xl lg:text-8xl font-display font-black leading-none">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">Hi, Meet</span>
                  <br />
                  <span className="text-foreground">Karan</span>
                  <span className="text-accent">.</span>
                </h1>
                
                <div className="space-y-2">
                  <h2 className="text-2xl lg:text-4xl font-display font-bold text-muted-foreground">
                    Senior Product Manager
                  </h2>
                  <div className="flex items-center gap-2 text-primary font-mono text-sm justify-center lg:justify-start">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    Building products that matter
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-xl text-foreground/80 mb-10 leading-relaxed font-light max-w-2xl">
              I'm a software developer turned product manager with over 6 years of experience 
              building products that <span className="text-accent font-semibold">drive engagement</span>, 
              <span className="text-primary font-semibold"> streamline operations</span>, and improve business outcomes. 
              I thrive on solving real user problems and mentoring the next generation of PMs.
            </p>
            
            {/* Ultra-modern metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { value: "+5%", label: "Engagement Lift", color: "primary" },
                { value: "+25%", label: "User Engagement", color: "accent" },
                { value: "CSPO", label: "Certified", color: "primary" }
              ].map((metric, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-3xl bg-card/30 backdrop-blur-md border border-border/30 hover:border-primary/40 transition-all duration-500 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-mesh opacity-0 group-hover:opacity-50 rounded-3xl transition-opacity duration-500" />
                  <div className="relative">
                    <div className={`text-3xl font-display font-black text-${metric.color} mb-1`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {metric.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Modern CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="group text-lg px-8 py-6">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Button>
              <Button variant="premium" size="lg" className="group text-lg px-8 py-6">
                <BookOpen className="mr-2 h-5 w-5" />
                Book a Session
                <Sparkles className="ml-2 h-4 w-4 opacity-70" />
              </Button>
            </div>
            
            {/* Modern scroll indicator */}
            <div className="mt-16 flex justify-center lg:justify-start">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <span className="text-sm font-mono">Scroll to explore</span>
                <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;