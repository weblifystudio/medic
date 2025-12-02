import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";
import heroImage from "@assets/stock_images/elegant_parisian_caf_93f301ea.jpg";

export function Hero() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Photo — Intérieur élégant du Café Pavillon avec éclairage chaleureux"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="animate-fade-in">
          <p className="text-warmsand font-inter text-sm md:text-base uppercase tracking-[0.2em] mb-4">
            Un coin de Paris — café, pâtisseries et rencontres
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-shadow leading-tight">
            Un chaleureux rendez-vous
            <br className="hidden sm:block" /> parisien
          </h1>
          <p className="max-w-2xl mx-auto text-white/90 text-base md:text-lg leading-relaxed mb-10">
            Café Pavillon est un lieu pour les conversations longues, les cafés soignés 
            et les pâtisseries travaillées — un équilibre entre élégance discrète et chaleur conviviale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              variant="outline"
              className="min-w-[180px] bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-semibold button-press"
              onClick={() => handleNavClick("#menu")}
              data-testid="button-voir-menu"
            >
              Voir le menu
            </Button>
            <Button
              size="lg"
              className="min-w-[180px] bg-terracotta hover:bg-terracotta/90 text-white font-semibold button-press border-terracotta"
              onClick={() => handleNavClick("#reservation")}
              data-testid="button-reserver-hero"
            >
              Réserver
            </Button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <MapPin className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/60 uppercase tracking-wider">Adresse</p>
                <p className="text-sm font-medium">12 Rue des Artistes, 75006 Paris</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Phone className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/60 uppercase tracking-wider">Téléphone</p>
                <a 
                  href="tel:+33123456789" 
                  className="text-sm font-medium hover:text-warmsand transition-colors"
                  data-testid="link-phone-hero"
                >
                  +33 1 23 45 67 89
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Clock className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/60 uppercase tracking-wider">Horaires</p>
                <p className="text-sm font-medium">Mar–Dim 08:00–19:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => handleNavClick("#apropos")}
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors"
          aria-label="Défiler vers le bas"
          data-testid="button-scroll-down"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
