import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Video, CheckCircle, ExternalLink } from "lucide-react";

const Mentorship = () => {
  const services = [
    {
      icon: MessageCircle,
      title: "Breaking into Product Management",
      description: "Navigate your journey from developer to product manager with personalized roadmaps and actionable insights.",
      duration: "30 min session"
    },
    {
      icon: Video,
      title: "Mock Interviews",
      description: "Practice product management interviews with real-world scenarios and receive detailed feedback.",
      duration: "60 min session"
    },
    {
      icon: CheckCircle,
      title: "Product Management Interview Preparation", 
      description: "Get expert preparation for PM interviews with frameworks, case studies, and practical guidance.",
      duration: "30 min session"
    },
    {
      icon: Calendar,
      title: "Ongoing Mentorship",
      description: "Regular check-ins and continuous support throughout your product management journey.",
      duration: "30 min session"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Junior Product Manager",
      company: "TechStart",
      content: "Karan's mentorship was instrumental in my transition from engineering to PM. His practical insights and interview prep helped me land my dream job!",
      rating: 5
    },
    {
      name: "Alex Rodriguez", 
      role: "Senior Developer",
      company: "DataCorp",
      content: "The mock interviews with Karan gave me the confidence I needed. His feedback was detailed and helped me understand the PM mindset.",
      rating: 5
    }
  ];

  return (
    <section id="mentorship" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-secondary" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Book a Session
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Offering 1:1 sessions on breaking into product management, mock interviews, interview prep, and ongoing mentorship
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-all duration-500 hover:scale-105 hover:shadow-glow"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-xl bg-gradient-primary">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                      {service.duration}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-8 rounded-2xl bg-gradient-hero backdrop-blur-sm border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Accelerate Your PM Journey?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Join hundreds of successful mentees who've made the transition to product management 
              with personalized guidance and proven strategies.
            </p>
            <Button 
              variant="hero" 
              size="lg" 
              className="group"
              onClick={() => window.open('https://topmate.io/karan_dalal', '_blank')}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Session on Topmate
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-accent bg-clip-text text-transparent">
            What Mentees Say
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:bg-card/50 transition-all duration-300"
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-gradient-primary rounded-full" />
                  ))}
                </div>
                
                <blockquote className="text-foreground/80 mb-4 italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
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

export default Mentorship;