import { Coffee, Cookie } from "lucide-react";
import aboutImage from "@assets/stock_images/barista_preparing_co_09f9c561.jpg";

export function About() {
  return (
    <section
      id="apropos"
      className="py-20 md:py-32 bg-softcream dark:bg-background"
      data-testid="section-apropos"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <p className="text-warmsand font-inter text-sm uppercase tracking-[0.15em] mb-4">
              Notre histoire
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-foreground mb-6 leading-tight">
              Notre vision
            </h2>
            <p className="text-charcoal/80 dark:text-foreground/80 text-base md:text-lg leading-relaxed mb-8">
              Fondé pour célébrer la douceur du matin et la lenteur des après-midi, 
              Café Pavillon est pensé comme un salon moderne : mobilier choisi, 
              éclairage chaleureux et une carte qui met en valeur producteurs locaux 
              et savoir-faire artisanal.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-warmsand/10 dark:bg-warmsand/20 flex items-center justify-center flex-shrink-0">
                  <Coffee className="w-6 h-6 text-warmsand" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal dark:text-foreground mb-1">
                    Grains sélectionnés
                  </h3>
                  <p className="text-charcoal/70 dark:text-foreground/70 text-sm md:text-base">
                    Partenariats avec micro torréfacteurs parisiens.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-warmsand/10 dark:bg-warmsand/20 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-warmsand" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal dark:text-foreground mb-1">
                    Pâtisseries maison
                  </h3>
                  <p className="text-charcoal/70 dark:text-foreground/70 text-sm md:text-base">
                    Douceurs préparées chaque matin.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-card">
                <img
                  src={aboutImage}
                  alt="Photo — Barista préparant un café avec soin"
                  className="w-full h-full object-cover image-hover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-warmsand/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-terracotta/10 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
