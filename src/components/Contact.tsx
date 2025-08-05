import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Linkedin, Phone, Send, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useState } from "react";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        'service_4tusjb9',
        'template_rb1vtfn',
        {
          from_name: `${data.firstName} ${data.lastName}`,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        'n41BLAZBSDBtUmg8X'
      );
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-500/5 to-orange-500/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-6xl lg:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Let's Work
            </h2>
            <p className="text-2xl text-muted-foreground">
              Ready to build something amazing together?
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Get in Touch
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Whether you're looking for product strategy consultation, mentorship, 
                  or just want to discuss your next big idea, I'd love to hear from you.
                </p>
              </div>
              
              {/* Contact Methods */}
              <div className="space-y-6">
                <a
                  href="https://linkedin.com/in/dalal-karan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-all duration-300 hover:scale-105"
                >
                  <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    <Linkedin className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">LinkedIn</div>
                    <div className="text-muted-foreground">linkedin.com/in/dalal-karan/</div>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <MapPin className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Location</div>
                    <div className="text-muted-foreground">Austin, TX</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Send me a message
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2">
                      First Name
                    </Label>
                    <Input
                      {...register("firstName", { required: "First name is required" })}
                      className="h-12"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2">
                      Last Name
                    </Label>
                    <Input
                      {...register("lastName", { required: "Last name is required" })}
                      className="h-12"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2">
                    Email
                  </Label>
                  <Input
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className="h-12"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2">
                    Subject
                  </Label>
                  <Input
                    {...register("subject", { required: "Subject is required" })}
                    className="h-12"
                    placeholder="Let's discuss your project"
                  />
                  {errors.subject && (
                    <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2">
                    Message
                  </Label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project, goals, or how I can help you..."
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full group" 
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    ✨
                  </div>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;