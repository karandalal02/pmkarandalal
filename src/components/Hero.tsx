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
                👋 Hello! I'm Karan.
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-display font-black leading-tight text-foreground">
                Designing digital
                <br />
                product with emphasis
                <br />
                on <span className="text-muted-foreground">user experience</span>
              </h1>
            </div>
            
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A former Software Developer turned Product Manager with 7 years of experience (2 years as developer, 5 in product roles) building 
                high-quality, cohesive, and scalable products at Sciplay.
              </p>
            
            
            {/* Clean metrics */}
            <div className="pt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto">
              {[
                { value: "7", label: "Years Experience" },
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