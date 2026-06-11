import { Calendar, MapPin, Building } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      company: "SciPlay",
      location: "Austin, TX",
      logo: "/lovable-uploads/6f7e20a0-2d4d-48c3-bd33-8395b7080e32.png",
      roles: [
        {
          role: "Product Manager, Bingo Showdown (Mobile F2P)",
          period: "Aug 2025 - Present",
          description: "Driving retention, monetization, and LiveOps innovation on Bingo Showdown by partnering with analytics, design, and engineering to ship data-backed features.",
          achievements: [
            "Partnered with analytics to identify new user pain points and drive an experimentation roadmap for new install cohorts, improving D7 retention by 2% and average revenue per install (ARPI) by 1.5%",
            "Designed and launched Task Train, a meta feature focused on strengthening the game's core loop, driving a 4% increase in overall engagement",
            "Built a dynamic theming system for LiveOps events, enabling in-game visual refreshes using existing art assets and increasing time on app by 2% on event days"
          ]
        },
        {
          role: "Product Manager, Goldfish Casino (Mobile F2P)",
          period: "Jan 2024 - Aug 2025",
          description: "Drove player engagement and monetization for Goldfish Casino, building engaging live ops features and data-backed monetization strategies with design, analytics, and engineering teams.",
          achievements: [
            "Designed and launched Goldies Grand Match, a meta feature for highly engaged players, driving a 5% lift in core engagement KPIs and a 3% increase in revenue",
            "Launched Shockwave, a live ops event that incentivized high-value rewards for players, resulting in a 7% increase in hourly engagement KPIs",
            "Partnered with the analytics team to lead A/B testing and tuning experiments on the battlepass system, consistently boosting engagement KPIs by 8% across 10 seasons",
            "Collaborated with the design team to implement an in-game DTC marketing strategy, increasing revenue share by 1.5%"
          ]
        }
      ]
    },
    {
      company: "Kayak",
      role: "Product Manager, Kayak for business",
      period: "Jun 2022 - Dec 2022",
      location: "Boston, MA",
      description: "Led redesign of the onboarding flow using Agile, UI/UX collaboration, and customer feedback. Worked across UX, engineering, and analytics to identify key drop-off points and redesign the onboarding flow.",
      achievements: [
        "Led redesign of onboarding flow resulting in increase in weekly user engagement",
        "Analyzed user behavior via FullStory and Snowflake to identify root causes of churn, directly informing onboarding and product improvements",
        "Conducted UX research and MVP testing (95% survey engagement) to validate onboarding updates and prioritize key features like dynamic home and centralized payments"
      ],
      logo: "/lovable-uploads/d59ff3d4-175f-4eb4-b241-236769939845.png"
    },
    {
      company: "Newgen Software",
      location: "Mumbai, India",
      logo: "/lovable-uploads/03b95f23-8c52-4e01-be98-561c38a71780.png",
      roles: [
        {
          role: "Technical Product Manager, Intelligent Process Automation",
          period: "July 2019 - July 2021",
          description: "Led cross-functional teams to customize the Document Management System based on customer interviews, streamlining data and improving application processing time. Launched business process flows and partnered with dev/database teams.",
          achievements: [
            "Led cross-functional teams to customize the Document Management System based on customer interviews, streamlining 40TB of data and improving application processing time by 1.5×",
            "Launched business process flows and partnered with dev/database teams to build document processing features, improving efficiency by 40% in the theft detection pipeline"
          ]
        },
        {
          role: "Software Engineer, Intelligent Process Automation",
          period: "July 2017 - July 2019",
          description: "Developed web services and utilities to enhance critical process flows across banking automation products.",
          achievements: [
            "Enhanced critical process flows by developing web services and utilities for data verification, bulk account opening, bulk document upload, and B2B document sharing, improving operational efficiency",
            "Partnered with the Product team to conduct qualitative and quantitative user behavior research to identify key user actions and facilitate effective data collection for informed decision-making"
          ]
        }
      ]
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
                  {"roles" in exp ? (
                    <>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-1">{exp.company}</h3>
                          <div className="flex items-center gap-3 text-primary font-semibold">
                            <img src={exp.logo} alt={`${exp.company} logo`} className="w-8 h-8 object-contain" />
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              {exp.company}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground mt-2 md:mt-0">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>

                      {exp.roles.map((role, ri) => (
                        <article key={ri} className={ri === 0 ? "" : "pt-6 border-t border-border/50"}>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h4 className="text-lg font-semibold text-foreground">{role.role}</h4>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {role.period}
                            </div>
                          </div>
                          {role.description && (
                            <p className="text-foreground/80 mb-4 leading-relaxed">{role.description}</p>
                          )}
                          {role.achievements?.length ? (
                            <div>
                              <h5 className="font-semibold text-foreground mb-3">Key Achievements</h5>
                              <ul className="space-y-2">
                                {role.achievements.map((achievement: string, i: number) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                        </article>
                      ))}
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
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