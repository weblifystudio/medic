import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Users, Calendar, Wine, Loader2, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import eventImage from "@assets/stock_images/private_dining_event_ec9e34b2.jpg";

const quoteFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  eventType: z.string().min(1, "Veuillez sélectionner un type d'événement"),
  eventDate: z.string().min(1, "Veuillez indiquer une date"),
  guestCount: z.string().min(1, "Veuillez indiquer le nombre d'invités"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

const eventTypes = [
  "Anniversaire",
  "Événement d'entreprise",
  "Séminaire",
  "Cocktail",
  "Brunch privé",
  "Autre",
];

export function Privatisations() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      guestCount: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: QuoteFormData) => {
      return apiRequest("POST", "/api/contact", {
        ...data,
        subject: `Demande de devis - ${data.eventType}`,
        guestCount: parseInt(data.guestCount),
      });
    },
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsDialogOpen(false);
        setIsSuccess(false);
        reset();
      }, 2000);
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: QuoteFormData) => {
    mutation.mutate(data);
  };

  return (
    <section
      id="privatisations"
      className="py-20 md:py-32 bg-white dark:bg-card"
      data-testid="section-privatisations"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
                <img
                  src={eventImage}
                  alt="Photo — Espace privatisable élégant pour vos événements"
                  className="w-full h-full object-cover image-hover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-terracotta/10 rounded-2xl -z-10" />
            </div>
          </div>

          <div>
            <p className="text-warmsand font-inter text-sm uppercase tracking-[0.15em] mb-4">
              Événements
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-foreground mb-6 leading-tight">
              Privatisations & événements
            </h2>
            <p className="text-charcoal/80 dark:text-foreground/80 text-base md:text-lg leading-relaxed mb-8">
              Transformez Café Pavillon en un espace privilégié pour vos célébrations. 
              Notre équipe vous accompagne dans l'organisation d'un moment inoubliable.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <Card className="bg-softcream dark:bg-background border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Users className="w-6 h-6 text-warmsand mx-auto mb-2" strokeWidth={1.5} />
                  <p className="font-serif text-2xl font-bold text-charcoal dark:text-foreground">50</p>
                  <p className="text-charcoal/60 dark:text-foreground/60 text-sm">personnes max</p>
                </CardContent>
              </Card>
              <Card className="bg-softcream dark:bg-background border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Calendar className="w-6 h-6 text-warmsand mx-auto mb-2" strokeWidth={1.5} />
                  <p className="font-serif text-2xl font-bold text-charcoal dark:text-foreground">7j/7</p>
                  <p className="text-charcoal/60 dark:text-foreground/60 text-sm">disponibilité</p>
                </CardContent>
              </Card>
              <Card className="bg-softcream dark:bg-background border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Wine className="w-6 h-6 text-warmsand mx-auto mb-2" strokeWidth={1.5} />
                  <p className="font-serif text-2xl font-bold text-charcoal dark:text-foreground">Sur mesure</p>
                  <p className="text-charcoal/60 dark:text-foreground/60 text-sm">formules</p>
                </CardContent>
              </Card>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-terracotta hover:bg-terracotta/90 text-white font-semibold button-press"
                  data-testid="button-demander-devis"
                >
                  Demander un devis
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-white dark:bg-card" data-testid="modal-devis">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl text-charcoal dark:text-foreground">
                    Demande de devis
                  </DialogTitle>
                  <DialogDescription className="text-charcoal/70 dark:text-foreground/70">
                    Remplissez ce formulaire pour recevoir un devis personnalisé pour votre événement.
                  </DialogDescription>
                </DialogHeader>

                {isSuccess ? (
                  <div className="py-12 text-center" role="status" aria-live="polite">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" aria-hidden="true" />
                    <h3 className="font-serif text-xl text-charcoal dark:text-foreground mb-2">
                      Demande envoyée !
                    </h3>
                    <p className="text-charcoal/70 dark:text-foreground/70">
                      Nous vous recontactons rapidement.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quote-name" className="text-charcoal dark:text-foreground">
                          Nom *
                        </Label>
                        <Input
                          id="quote-name"
                          {...register("name")}
                          className={errors.name ? "border-destructive" : ""}
                          data-testid="input-quote-name"
                        />
                        {errors.name && (
                          <p className="text-destructive text-sm">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quote-email" className="text-charcoal dark:text-foreground">
                          Email *
                        </Label>
                        <Input
                          id="quote-email"
                          type="email"
                          {...register("email")}
                          className={errors.email ? "border-destructive" : ""}
                          data-testid="input-quote-email"
                        />
                        {errors.email && (
                          <p className="text-destructive text-sm">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quote-phone" className="text-charcoal dark:text-foreground">
                        Téléphone
                      </Label>
                      <Input
                        id="quote-phone"
                        type="tel"
                        {...register("phone")}
                        data-testid="input-quote-phone"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-charcoal dark:text-foreground">
                          Type d'événement *
                        </Label>
                        <Select onValueChange={(value) => setValue("eventType", value)}>
                          <SelectTrigger
                            className={errors.eventType ? "border-destructive" : ""}
                            data-testid="select-event-type"
                          >
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            {eventTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.eventType && (
                          <p className="text-destructive text-sm">{errors.eventType.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quote-guests" className="text-charcoal dark:text-foreground">
                          Nombre d'invités *
                        </Label>
                        <Input
                          id="quote-guests"
                          type="number"
                          min="1"
                          max="50"
                          {...register("guestCount")}
                          className={errors.guestCount ? "border-destructive" : ""}
                          data-testid="input-quote-guests"
                        />
                        {errors.guestCount && (
                          <p className="text-destructive text-sm">{errors.guestCount.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quote-date" className="text-charcoal dark:text-foreground">
                        Date souhaitée *
                      </Label>
                      <Input
                        id="quote-date"
                        type="date"
                        {...register("eventDate")}
                        className={errors.eventDate ? "border-destructive" : ""}
                        data-testid="input-quote-date"
                      />
                      {errors.eventDate && (
                        <p className="text-destructive text-sm">{errors.eventDate.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quote-message" className="text-charcoal dark:text-foreground">
                        Votre message *
                      </Label>
                      <Textarea
                        id="quote-message"
                        rows={4}
                        placeholder="Décrivez votre événement..."
                        {...register("message")}
                        className={errors.message ? "border-destructive" : ""}
                        data-testid="input-quote-message"
                      />
                      {errors.message && (
                        <p className="text-destructive text-sm">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-terracotta hover:bg-terracotta/90 text-white font-semibold button-press"
                      disabled={mutation.isPending}
                      data-testid="button-submit-quote"
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        "Envoyer la demande"
                      )}
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
