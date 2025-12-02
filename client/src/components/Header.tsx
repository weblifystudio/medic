import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Coffee } from "lucide-react";

const navLinks = [
  { href: "#apropos", label: "À propos" },
  { href: "#menu", label: "Menu" },
  { href: "#galerie", label: "Galerie" },
  { href: "#privatisations", label: "Privatisations" },
  { href: "#reservation", label: "Réserver" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-card/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
      data-testid="header"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#"
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            data-testid="link-logo"
          >
            <Coffee 
              className={`w-7 h-7 transition-colors duration-200 ${
                isScrolled ? "text-warmsand" : "text-white"
              }`}
              strokeWidth={1.5}
            />
            <span
              className={`font-serif text-xl md:text-2xl font-bold tracking-tight transition-colors duration-200 ${
                isScrolled ? "text-charcoal dark:text-foreground" : "text-white"
              }`}
            >
              Café Pavillon
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
            {navLinks.slice(0, -1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 hover-elevate ${
                  isScrolled
                    ? "text-charcoal/80 hover:text-charcoal dark:text-foreground/80 dark:hover:text-foreground"
                    : "text-white/90 hover:text-white"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="default"
              size="sm"
              className="ml-2 bg-warmsand hover:bg-warmsand/90 text-white border-warmsand font-semibold button-press"
              onClick={() => handleNavClick("#reservation")}
              data-testid="button-reserver-desktop"
            >
              Réserver
            </Button>
          </nav>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={`${
                  isScrolled ? "text-charcoal dark:text-foreground" : "text-white"
                }`}
                data-testid="button-mobile-menu"
              >
                <Menu className="h-6 w-6" strokeWidth={1.5} />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-softcream dark:bg-card">
              <div className="flex flex-col h-full pt-8">
                <div className="flex items-center gap-2 mb-8 px-2">
                  <Coffee className="w-6 h-6 text-warmsand" strokeWidth={1.5} />
                  <span className="font-serif text-xl font-bold text-charcoal dark:text-foreground">
                    Café Pavillon
                  </span>
                </div>
                <nav className="flex flex-col gap-1" data-testid="nav-mobile">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="px-4 py-3 text-base font-medium text-charcoal/80 dark:text-foreground/80 hover:text-charcoal dark:hover:text-foreground hover:bg-white/50 dark:hover:bg-background/50 rounded-lg transition-colors"
                      data-testid={`link-nav-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-auto pb-8 px-2">
                  <Button
                    className="w-full bg-warmsand hover:bg-warmsand/90 text-white font-semibold button-press"
                    onClick={() => handleNavClick("#reservation")}
                    data-testid="button-reserver-mobile"
                  >
                    Réserver une table
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function FloatingReserveButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const element = document.querySelector("#reservation");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <Button
      className="lg:hidden fixed bottom-6 right-6 z-40 bg-terracotta hover:bg-terracotta/90 text-white shadow-lg button-press rounded-full px-6"
      onClick={handleClick}
      data-testid="button-floating-reserver"
    >
      Réserver
    </Button>
  );
}
