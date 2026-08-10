import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useExplorer } from "@/context/ExplorerContext";
import { Menu, X, Calendar, Sparkles, Gamepad2, Footprints } from "lucide-react";
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { gameMode, toggleGameMode, openWorld } = useExplorer();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navItems = [{
    label: "Home",
    href: "#home"
  }, {
    label: "About",
    href: "#about"
  }, {
    label: "Experience",
    href: "#experience"
  }, {
    label: "Projects",
    href: "#projects"
  }, {
    label: "Education",
    href: "#education"
  }, {
    label: "Skills",
    href: "#skills"
  }, {
    label: "Mentorship",
    href: "#mentorship"
  }, {
    label: "Contact",
    href: "#contact"
  }];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Clean logo */}
          <div className="font-display font-bold text-xl text-foreground">KaranDalal</div>

          {/* Clean desktop navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-7">
            {navItems.map(item => <button key={item.label} onClick={() => scrollToSection(item.href)} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                {item.label}
              </button>)}
            <button
              onClick={toggleGameMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                gameMode
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
              aria-label={gameMode ? "Exit 2.5D world" : "Enter 2.5D world"}
              title={gameMode ? "Exit 2.5D world" : "Enter 2.5D world"}
            >
              <Gamepad2 className="h-4 w-4" />
              <span className="hidden lg:inline">{gameMode ? "Exit World" : "Game Mode"}</span>
            </button>
          </div>


          {/* Modern mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleGameMode}
              className={`p-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                gameMode
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card/50 border-border/30 text-foreground hover:bg-card/70"
              }`}
              aria-label={gameMode ? "Exit game mode" : "Enter game mode"}
            >
              <Gamepad2 className="h-5 w-5" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-3 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 hover:bg-card/70 transition-all duration-300">
              {isMobileMenuOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
            </button>
          </div>
        </div>

        {/* Modern mobile menu */}
        {isMobileMenuOpen && <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-border/20">
            <div className="p-8 space-y-6">
              {navItems.map(item => <button key={item.label} onClick={() => scrollToSection(item.href)} className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors py-3 font-medium text-lg">
                  {item.label}
                </button>)}
              <div className="pt-6 border-t border-border/30 space-y-4">
                <button
                  onClick={() => {
                    toggleGameMode();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-medium transition-colors ${
                    gameMode
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <Gamepad2 className="h-4 w-4" />
                  {gameMode ? "Exit 2.5D World" : "Enter 2.5D World"}
                </button>
                <Button 
                  variant="premium" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open('https://topmate.io/karan_dalal', '_blank')}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Session
                  <Sparkles className="ml-2 h-3 w-3 opacity-70" />
                </Button>
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;