import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import cafeInterior from "@assets/stock_images/elegant_parisian_caf_93f301ea.jpg";
import latteArt from "@assets/stock_images/artisan_coffee_latte_ca49fc68.jpg";
import croissant from "@assets/stock_images/french_pastry_croiss_1ed11b67.jpg";
import tart from "@assets/stock_images/gourmet_pastry_tart__38972f0f.jpg";
import charcuterie from "@assets/stock_images/cheese_charcuterie_b_657d8af0.jpg";
import coffeeBeans from "@assets/stock_images/coffee_beans_roastin_ae9044af.jpg";
import cozyCorner from "@assets/stock_images/cozy_cafe_corner_boo_3684e190.jpg";
import barista from "@assets/stock_images/barista_preparing_co_09f9c561.jpg";
import terrace from "@assets/stock_images/cafe_terrace_outdoor_29526060.jpg";

interface GalleryImage {
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { src: cafeInterior, alt: "Photo — Intérieur élégant du café avec éclairage chaleureux" },
  { src: latteArt, alt: "Photo — Latte art délicat sur un cappuccino" },
  { src: croissant, alt: "Photo — Croissant doré au beurre AOP" },
  { src: tart, alt: "Photo — Tartelette aux fruits de saison" },
  { src: charcuterie, alt: "Photo — Planche de fromages et charcuteries artisanales" },
  { src: coffeeBeans, alt: "Photo — Grains de café torréfiés artisanalement" },
  { src: cozyCorner, alt: "Photo — Coin confortable du café avec banquettes" },
  { src: barista, alt: "Photo — Barista préparant un café avec expertise" },
  { src: terrace, alt: "Photo — Terrasse parisienne du café" },
];

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % galleryImages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <section
      id="galerie"
      className="py-20 md:py-32 bg-softcream dark:bg-background"
      data-testid="section-galerie"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-warmsand font-inter text-sm uppercase tracking-[0.15em] mb-4">
            Nos moments
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-foreground mb-6">
            Galerie
          </h2>
          <p className="max-w-2xl mx-auto text-charcoal/70 dark:text-foreground/70 text-base md:text-lg">
            Découvrez l'atmosphère unique du Café Pavillon à travers nos photos.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden rounded-xl group focus:outline-none focus:ring-2 focus:ring-warmsand focus:ring-offset-2 ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              data-testid={`gallery-image-${index}`}
            >
              <div className={`aspect-square ${index === 0 ? "md:aspect-[4/3]" : ""}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-260 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={() => closeLightbox()}>
        <DialogContent
          className="max-w-[95vw] max-h-[95vh] p-0 border-0 bg-transparent overflow-hidden"
          onKeyDown={handleKeyDown}
          data-testid="lightbox-modal"
        >
          <div className="relative flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={closeLightbox}
              data-testid="button-lightbox-close"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
              <span className="sr-only">Fermer</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={goToPrevious}
              data-testid="button-lightbox-prev"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
              <span className="sr-only">Précédent</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={goToNext}
              data-testid="button-lightbox-next"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
              <span className="sr-only">Suivant</span>
            </Button>

            {selectedIndex !== null && (
              <img
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === selectedIndex ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Aller à l'image ${index + 1}`}
                  data-testid={`lightbox-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
