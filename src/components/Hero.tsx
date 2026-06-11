import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Clean Profile Section */}
          <div className="mb-16">
            <img
              src="/lovable-uploads/19c0388a-baf8-4196-8858-d6de2cbf18ce.png"
              alt="Karan Dalal"
              className="w-32 h-32 rounded-lg object-cover object-top mx-auto mb-8 shadow-premium"
            />
          </div>
          
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                Senior Product Manager — Mobile F2P Gaming
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-display font-black leading-tight text-foreground">
                Live ops, monetization,
                <br />
                and <span className="text-muted-foreground">player engagement</span>
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Currently driving growth at SciPlay for Bingo Showdown and Goldfish Casino. I ship data‑driven features that grow engagement and revenue — and I validate every bet with experimentation.
            </p>
            
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I bridge engineering, product, and UX to build experiences players actually want to return to. From dynamic live‑ops theming and meta systems to monetization and retention, I run experiments, read the data, and focus on impact. B.Tech in Computer Engineering, MS in Engineering Management.
            </p>
            
            
            {/* Clean metrics */}
            <div className="pt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto">
              {[
                { value: "6", label: "Years Experience" },
                { value: "CSPO", label: "Certified" }
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-display font-bold text-foreground mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;