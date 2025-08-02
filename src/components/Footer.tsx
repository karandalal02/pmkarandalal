import { Linkedin, Mail, Phone, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent mb-4">
                Karan Dalal
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Senior Product Manager passionate about building impactful products 
                and mentoring the next generation of PMs.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["About", "Projects", "Experience", "Contact"].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        const element = document.querySelector(`#${link.toLowerCase()}`);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect</h3>
              <div className="space-y-3">
                <a
                  href="mailto:karan@example.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Mail className="h-4 w-4 group-hover:text-primary transition-colors" />
                  karan@example.com
                </a>
                <a
                  href="https://linkedin.com/in/karandalal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Linkedin className="h-4 w-4 group-hover:text-blue-500 transition-colors" />
                  LinkedIn Profile
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Phone className="h-4 w-4 group-hover:text-accent transition-colors" />
                  +1 (234) 567-8900
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground text-sm">
                © {currentYear} Karan Dalal. All rights reserved.
              </p>
              
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span>for aspiring PMs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;