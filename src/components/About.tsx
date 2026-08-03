import { GraduationCap, Code, Users, Award } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-secondary" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Bio Content */}
            <div className="space-y-6">
              <p className="text-lg text-foreground/80 leading-relaxed">
                With a <span className="text-primary font-semibold">B.Tech in Computer Engineering</span> from Pune University 
                and an <span className="text-primary font-semibold">MS in Engineering Management</span> from Northeastern University, 
                I've cultivated a unique perspective that bridges technical depth with strategic product vision.
              </p>
              
              <p className="text-lg text-foreground/80 leading-relaxed">
                My journey from developer to product manager has been driven by a passion for creating meaningful user experiences. 
                I specialize in translating complex technical challenges into intuitive product solutions that drive business impact.
              </p>
              
              <p className="text-lg text-foreground/80 leading-relaxed">
                As a <span className="text-primary font-semibold">Certified Scrum Product Owner (CSPO)</span>, I'm deeply committed 
                to agile methodologies and cross-functional collaboration. I find great fulfillment in mentoring aspiring product 
                managers and helping them navigate their career transitions.
              </p>
            </div>
            
            {/* Journey Timeline */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-all duration-300">
                <div className="p-3 rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Education Foundation</h3>
                  <p className="text-sm text-muted-foreground">
                    B.Tech Computer Engineering • MS Engineering Management
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-all duration-300">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Code className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Developer Origins</h3>
                  <p className="text-sm text-muted-foreground">
                    Started as a software developer, building technical expertise
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-all duration-300">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Product Leadership</h3>
                  <p className="text-sm text-muted-foreground">
                    7 years driving product strategy and user engagement
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-all duration-300">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Mentorship Focus</h3>
                  <p className="text-sm text-muted-foreground">
                    Passionate about guiding the next generation of PMs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;