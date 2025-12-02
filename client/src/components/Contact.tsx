import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-white dark:bg-card"
      data-testid="section-contact"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-warmsand font-inter text-sm uppercase tracking-[0.15em] mb-4">
            Nous trouver
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-foreground mb-6">
            Contact & Localisation
          </h2>
          <p className="max-w-2xl mx-auto text-charcoal/70 dark:text-foreground/70 text-base md:text-lg">
            Nous serions ravis de vous accueillir au Café Pavillon.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="order-2 lg:order-1">
            <Card className="bg-softcream dark:bg-background border-0 shadow-card h-full">
              <CardContent className="p-6 md:p-8">
                <h3 className="font-serif text-xl font-semibold text-charcoal dark:text-foreground mb-6">
                  Informations
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-warmsand/10 dark:bg-warmsand/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-warmsand" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-inter font-semibold text-charcoal dark:text-foreground mb-1">
                        Adresse
                      </h4>
                      <p className="text-charcoal/70 dark:text-foreground/70">
                        12 Rue des Artistes<br />
                        75006 Paris, France
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-warmsand/10 dark:bg-warmsand/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-warmsand" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-inter font-semibold text-charcoal dark:text-foreground mb-1">
                        Téléphone
                      </h4>
                      <a
                        href="tel:+33123456789"
                        className="text-charcoal/70 dark:text-foreground/70 hover:text-warmsand transition-colors"
                        data-testid="link-phone-contact"
                      >
                        +33 1 23 45 67 89
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-warmsand/10 dark:bg-warmsand/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-warmsand" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-inter font-semibold text-charcoal dark:text-foreground mb-1">
                        Email
                      </h4>
                      <a
                        href="mailto:bonjour@cafepavillon.paris"
                        className="text-charcoal/70 dark:text-foreground/70 hover:text-warmsand transition-colors"
                        data-testid="link-email-contact"
                      >
                        bonjour@cafepavillon.paris
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-warmsand/10 dark:bg-warmsand/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-warmsand" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-inter font-semibold text-charcoal dark:text-foreground mb-1">
                        Horaires
                      </h4>
                      <p className="text-charcoal/70 dark:text-foreground/70">
                        Mardi – Dimanche<br />
                        08:00 – 19:00
                      </p>
                      <p className="text-charcoal/50 dark:text-foreground/50 text-sm mt-1">
                        Fermé le lundi
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-charcoal/10 dark:border-foreground/10">
                    <h4 className="font-inter font-semibold text-charcoal dark:text-foreground mb-3">
                      Suivez-nous
                    </h4>
                    <div className="flex gap-3">
                      <a
                        href="https://www.instagram.com/cafepavillon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-warmsand/10 dark:bg-warmsand/20 flex items-center justify-center text-charcoal/70 dark:text-foreground/70 hover:text-warmsand hover:bg-warmsand/20 transition-colors"
                        aria-label="Instagram"
                        data-testid="link-instagram"
                      >
                        <Instagram className="w-5 h-5" strokeWidth={1.5} />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="order-1 lg:order-2">
            <div className="aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.328,48.846,2.340,48.852&layer=mapnik&marker=48.849,2.334"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte - Café Pavillon, 12 Rue des Artistes, Paris"
                className="w-full h-full"
                data-testid="map-iframe"
              />
            </div>
            <p className="text-center text-charcoal/60 dark:text-foreground/60 text-sm mt-4">
              Métro : Saint-Germain-des-Prés (ligne 4) • Bus : 63, 86, 87
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
