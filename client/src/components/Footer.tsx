import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coffee, Instagram, Loader2, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      setIsSubscribed(true);
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      mutation.mutate(email);
    }
  };

  return (
    <footer className="bg-charcoal dark:bg-background py-16" data-testid="footer">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Coffee className="w-6 h-6 text-warmsand" strokeWidth={1.5} />
              <span className="font-serif text-xl font-bold text-white">
                Café Pavillon
              </span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Un coin de Paris — café, pâtisseries et rencontres. Un équilibre entre élégance discrète et chaleur conviviale.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/cafepavillon"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:text-warmsand hover:bg-white/20 transition-colors"
                aria-label="Instagram"
                data-testid="footer-link-instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">
              Horaires
            </h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="flex justify-between">
                <span>Mardi – Dimanche</span>
                <span>08:00 – 19:00</span>
              </li>
              <li className="flex justify-between text-white/40">
                <span>Lundi</span>
                <span>Fermé</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>12 Rue des Artistes</li>
              <li>75006 Paris, France</li>
              <li>
                <a 
                  href="tel:+33123456789" 
                  className="hover:text-warmsand transition-colors"
                  data-testid="footer-link-phone"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
              <li>
                <a 
                  href="mailto:bonjour@cafepavillon.paris" 
                  className="hover:text-warmsand transition-colors"
                  data-testid="footer-link-email"
                >
                  bonjour@cafepavillon.paris
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">
              Newsletter
            </h4>
            <p className="text-white/60 text-sm mb-4">
              Recevez nos actualités et offres exclusives.
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Inscription confirmée !</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-warmsand"
                  required
                  data-testid="input-newsletter-email"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-warmsand hover:bg-warmsand/90 text-white flex-shrink-0 button-press"
                  disabled={mutation.isPending}
                  data-testid="button-newsletter-submit"
                >
                  {mutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm mb-6">
            <p>© {new Date().getFullYear()} Café Pavillon. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white/60 transition-colors" data-testid="footer-link-mentions">
                Mentions légales
              </a>
              <a href="#" className="hover:text-white/60 transition-colors" data-testid="footer-link-privacy">
                Politique de confidentialité
              </a>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 text-center text-white/30 text-xs">
            <p>Créé par <span className="text-white/40 hover:text-warmsand transition-colors cursor-pointer">Weblify Studio</span> — Volez haut, convertissez vite</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
