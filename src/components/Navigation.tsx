import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, Sparkles } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/70 backdrop-blur-2xl border-b border-border/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Ultra-modern logo */}
          <div className="group cursor-pointer">
            <div className="font-display font-black text-2xl">
              <span className="bg-gradient-primary bg-clip-text text-transparent group-hover:animate-pulse">
                Karan
              </span>
              <span className="text-accent">.</span>
            </div>
            <div className="text-xs font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              Senior PM
            </div>
          </div>

          {/* Modern desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="relative text-foreground/80 hover:text-foreground transition-all duration-300 font-medium group"
              >
                {item.label}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-primary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Ultra-modern CTA Button */}
          <div className="hidden md:block">
            <Button variant="premium" size="sm" className="group font-semibold px-6">
              <Calendar className="mr-2 h-4 w-4" />
              Book Session
              <Sparkles className="ml-2 h-3 w-3 opacity-70" />
            </Button>
          </div>

          {/* Modern mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 hover:bg-card/70 transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Modern mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-border/20">
            <div className="p-8 space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors py-3 font-medium text-lg"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-6 border-t border-border/30">
                <Button variant="premium" size="sm" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Session
                  <Sparkles className="ml-2 h-3 w-3 opacity-70" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;