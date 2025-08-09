import { Calendar, MapPin } from "lucide-react";

const Education = () => {
  const education = [
    {
      school: "Northeastern University",
      degree: "M.S. in Engineering Management",
      location: "Boston, MA",
      date: "Dec 2023",
      logo: "/lovable-uploads/fa409393-d99a-48f2-8ca6-19388e2c1dcd.png",
      description: "I pursued a cross-disciplinary curriculum that bridged engineering, product strategy, and business innovation. My coursework focused on digital product design, business model innovation, and project management — all directly contributing to how I approach product leadership today.",
      achievements: [
        "Founding member of the Aspiring Product Managers Club (APMC)",
        "Co-led Protothon, a product hackathon with over 80 participating teams",
        "Teaching Assistant for Engineering Probability and Statistics, supporting over 40 students each semester"
      ]
    },
    {
      school: "Pune University",
      degree: "B.Tech in Computer Engineering",
      location: "Pune, India",
      date: "May 2017",
      logo: "/lovable-uploads/99508ba8-47ec-4f8e-b7c9-60cce91e0199.png",
      description: "My undergraduate degree gave me a strong foundation in systems thinking, problem solving, and data-driven development. Courses in data structures, system design, and databases helped shape the technical lens I bring to product management today.",
      achievements: []
    }
  ];

  return (
    <section id="education" className="py-20 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Education
            </h2>
            <p className="text-xl text-muted-foreground">
              Academic foundation that shaped my approach to product management
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
          </div>

          {/* Education Timeline */}
          <div className="space-y-12">
            {education.map((edu, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-glow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <div className="p-2 rounded-xl bg-card border border-border/50">
                      <img
                        src={edu.logo}
                        alt={`${edu.school} logo`}
                        className="h-12 w-12 object-contain"
                        loading="lazy"
                        width={48}
                        height={48}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {edu.school}
                        </h3>
                        <h4 className="text-lg font-semibold text-accent mb-3">
                          {edu.degree}
                        </h4>
                      </div>
                      
                      <div className="flex flex-col lg:items-end gap-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{edu.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{edu.date}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {edu.description}
                    </p>

                    {/* Achievements */}
                    {edu.achievements.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-foreground mb-3">Key Achievements & Activities:</h5>
                        <ul className="space-y-2">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-gradient-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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

export default Education;