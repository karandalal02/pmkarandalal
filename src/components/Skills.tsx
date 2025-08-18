import { Code, Palette, Zap, Users, Target, BarChart } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Product Strategy",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      skills: ["Gap Analysis", "A/B Testing", "Product Strategy", "Stakeholder Management", "Scrum Master", "Product Roadmapping", "Market Research", "Competitive Analysis", "User Research"]
    },
    {
      title: "Technical Skills", 
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      skills: ["SQL", "PL/SQL", "Java", "JSP", "JavaScript", "Python"]
    },
    {
      title: "Design & UX",
      icon: Palette, 
      color: "from-orange-500 to-red-500",
      skills: ["Figma", "User Journey Mapping", "Wireframing", "Prototyping", "XD", "Lightroom"]
    },
    {
      title: "Analytics",
      icon: BarChart,
      color: "from-green-500 to-emerald-500", 
      skills: ["Google Analytics", "Tableau", "Snowflake", "KPI Tracking"]
    },
    {
      title: "Leadership",
      icon: Users,
      color: "from-indigo-500 to-purple-500",
      skills: ["Team Management", "Stakeholder Communication", "Agile/Scrum", "Mentoring", "Cross-functional Collaboration"]
    },
  ];

  const techStack = [
    { name: "Tableau", color: "bg-blue-500" },
    { name: "Snowflake", color: "bg-cyan-500" },
    { name: "Jira", color: "bg-indigo-500" },
    { name: "Trello", color: "bg-blue-600" },
    { name: "Miro", color: "bg-yellow-500" },
    { name: "Figma", color: "bg-purple-500" },
    { name: "Adobe XD", color: "bg-pink-500" },
    { name: "Notion", color: "bg-gray-500" }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            My Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive skill set spanning product strategy, technical implementation, and team leadership
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-all duration-500 hover:scale-105 hover:shadow-glow"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${category.color} mb-6`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Tech Stack */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-accent bg-clip-text text-transparent">
            Favourite Tech Stack
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="group flex flex-col items-center p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:bg-card/50 transition-all duration-300 hover:scale-110"
              >
                <div className={`w-12 h-12 ${tech.color} rounded-xl mb-3 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <span className="text-white font-bold text-lg">
                    {tech.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;