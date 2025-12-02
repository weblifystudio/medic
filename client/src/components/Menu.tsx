import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, Croissant, UtensilsCrossed, FileText } from "lucide-react";

interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface MenuCategory {
  title: string;
  icon: typeof Coffee;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    title: "Cafés signatures",
    icon: Coffee,
    items: [
      { name: "Café Pavillon", description: "espresso tonic", price: "6" },
      { name: "Velouté Latte", description: "lait d'avoine", price: "5" },
      { name: "Long Black Rive Gauche", description: "", price: "4" },
    ],
  },
  {
    title: "Pâtisseries",
    icon: Croissant,
    items: [
      { name: "Tartelette citron", description: "pâte sablée", price: "7" },
      { name: "Financier au thé matcha", description: "", price: "5" },
      { name: "Croissant au beurre AOP", description: "", price: "3.50" },
    ],
  },
  {
    title: "Planches",
    icon: UtensilsCrossed,
    items: [
      { name: "Planche de saison", description: "fromages & charcuteries", price: "14" },
      { name: "Tartine du chef", description: "ricotta, miel, figues", price: "9" },
    ],
  },
];

export function Menu() {
  return (
    <section
      id="menu"
      className="py-20 md:py-32 bg-white dark:bg-card"
      data-testid="section-menu"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-warmsand font-inter text-sm uppercase tracking-[0.15em] mb-4">
            Nos créations
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-foreground mb-6">
            La carte
          </h2>
          <p className="max-w-2xl mx-auto text-charcoal/70 dark:text-foreground/70 text-base md:text-lg">
            Une sélection de nos coups de cœur, préparés avec passion chaque jour.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {menuCategories.map((category, index) => (
            <Card
              key={category.title}
              className="bg-softcream dark:bg-background border-0 shadow-card hover:shadow-card-hover transition-shadow duration-300"
              data-testid={`card-menu-${index}`}
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-warmsand/10 dark:bg-warmsand/20 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-warmsand" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-charcoal dark:text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-5">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={item.name}
                      className="flex items-start justify-between gap-4"
                      data-testid={`menu-item-${index}-${itemIndex}`}
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-inter font-semibold text-charcoal dark:text-foreground text-sm md:text-base">
                          {item.name}
                        </h4>
                        {item.description && (
                          <p className="text-charcoal/60 dark:text-foreground/60 text-sm mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span className="text-warmsand font-semibold text-sm md:text-base whitespace-nowrap">
                        €{item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-charcoal/20 dark:border-foreground/20 text-charcoal dark:text-foreground hover:bg-charcoal/5 dark:hover:bg-foreground/5 font-medium button-press"
            data-testid="button-menu-pdf"
          >
            <FileText className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Voir le menu complet (PDF)
          </Button>
        </div>
      </div>
    </section>
  );
}
