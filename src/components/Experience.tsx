import { Calendar, MapPin, Building } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      company: "Design Studio",
      role: "Senior Product Manager",
      period: "2021 - Present",
      location: "Remote",
      description: "Leading product strategy and development for innovative design tools, driving user engagement and business growth through data-driven decisions.",
      achievements: [
        "Increased user engagement by 40% through feature optimization",
        "Led cross-functional team of 12+ members",
        "Launched 3 major product features driving $2M ARR"
      ]
    },
    {
      company: "Team5",
      role: "UI Designer",
      period: "2018 - 2021", 
      location: "San Francisco, CA",
      description: "Designed user interfaces and experiences for B2B travel solutions, focusing on user research and iterative design processes.",
      achievements: [
        "Redesigned core user flows increasing conversion by 25%",
        "Established design system used across 5+ products",
        "Mentored junior designers and conducted design reviews"
      ]
    },
    {
      company: "WP ThemeX",
      role: "Jr UI Designer",
      period: "2016 - 2018",
      location: "New York, NY", 
      description: "Developed WordPress themes and UI components, gaining foundational experience in user-centered design principles.",
      achievements: [
        "Created 15+ premium WordPress themes",
        "Collaborated with development teams on implementation",
        "Improved theme performance and accessibility standards"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-secondary" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey through product management and design leadership
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-primary hidden md:block" />
            
            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-12 md:ml-16">
                {/* Timeline Dot */}
                <div className="absolute -left-[72px] top-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-glow hidden md:block" />
                
                <div className="group p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-all duration-500 hover:scale-105 hover:shadow-glow">
                  {/* Company & Role */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <Building className="h-4 w-4" />
                        {exp.company}
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:items-end gap-2 mt-2 md:mt-0">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;