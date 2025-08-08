import { Calendar, MapPin, Building } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      company: "SciPlay",
      role: "Product Manager",
      period: "Jan 2024 - Present",
      location: "Austin, TX",
      description: "Driving player engagement and monetization in mobile gaming for Goldfish Casino Games team. Building engaging live ops features and data-backed monetization strategies working with design, analytics, and engineering teams.",
      achievements: [
        "Launched features like Goldies Grand Match, Shockwave, DTC, and piggy bank",
        "Ran multiple AB tests on battle pass, Goldies Match, and quest system",
        "Consistently moved engagement KPIs and revenue metrics through data-driven decisions"
      ],
      logo: "/lovable-uploads/6f7e20a0-2d4d-48c3-bd33-8395b7080e32.png"
    },
    {
      company: "Kayak",
      role: "Product Manager (Intern)",
      period: "2023",
      location: "Boston, MA",
      description: "Focused on solving onboarding friction for new users of Kayak for Business B2B travel management platform. Worked across UX, engineering, and analytics to identify key drop-off points and redesign the onboarding flow.",
      achievements: [
        "Achieved 25% lift in weekly engagement in the first two weeks",
        "Ran MVP tests with over 95% user feedback response rate",
        "Led user research and onboarding flow redesign initiatives"
      ],
      logo: "/lovable-uploads/d59ff3d4-175f-4eb4-b241-236769939845.png"
    },
    {
      company: "Newgen Software",
      role: "Technical Product Manager (Promoted from Software Engineer)",
      period: "July 2017 - July 2021",
      location: "Mumbai, India",
      description: "Progressed from Software Engineer to Technical Product Manager, leading automation products for banking and finance. Built services and utilities that enhanced critical process flows and transitioned into product leadership customizing DMS and building BPM systems.",
      achievements: [
        "Led cross-functional teams delivering solutions that streamlined over 40TB of data",
        "Cut application processing time by 1.5x for banking operations",
        "Built automation tools for loan applications, account opening, and trade functions",
        "Enhanced critical process flows by developing web services and utilities for data verification, bulk account opening, bulk document upload, and B2B document sharing, improving operational efficiency.",
        "Partnered with the Product team to conduct qualitative and quantitative user behavior research to identify key user actions and facilitate effective data collection for informed decision-making"
      ],
      logo: "/lovable-uploads/03b95f23-8c52-4e01-be98-561c38a71780.png"
    },
    {
      company: "Testbook.com",
      role: "Product Marketing Intern",
      period: "Jan 2016 - April 2016",
      location: "Pune, India",
      description: "My first exposure to the user side of products. I organized a beta focus group and onboarded 400+ users onto the platform, helping validate early product-market fit. This experience made me curious about how people discover, use, and stick with products — the seed that grew into my product career.",
      achievements: [
        "Organized beta focus group for platform validation",
        "Successfully onboarded 400+ users during beta phase",
        "Contributed to early product-market fit validation efforts"
      ],
      logo: "/lovable-uploads/7e826c7d-06b7-4ebd-8c0e-fc55a1c5f23c.png"
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
                      <div className="flex items-center gap-3 text-primary font-semibold">
                        <img src={exp.logo} alt={`${exp.company} logo`} className="w-8 h-8 object-contain" />
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          {exp.company}
                        </div>
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