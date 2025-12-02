import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, Loader2, CheckCircle, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const reservationFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  email: z.string().email("Adresse email invalide"),
  date: z.string().min(1, "Veuillez sélectionner une date"),
  time: z.string().min(1, "Veuillez sélectionner une heure"),
  partySize: z.string().min(1, "Veuillez sélectionner le nombre de personnes"),
  notes: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationFormSchema>;

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30",
];

const partySizes = ["1", "2", "3", "4", "5", "6", "7", "8+"];

export function Reservation() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      partySize: "",
      notes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ReservationFormData) => {
      const response = await apiRequest("POST", "/api/reservations", {
        ...data,
        partySize: parseInt(data.partySize.replace("+", "")),
      });
      return response.json();
    },
    onSuccess: (data) => {
      setIsSuccess(true);
      setBookingId(data.bookingId);
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReservationFormData) => {
    mutation.mutate(data);
  };

  const handleNewReservation = () => {
    setIsSuccess(false);
    setBookingId(null);
    reset();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section
      id="reservation"
      className="py-20 md:py-32 bg-softcream dark:bg-background"
      data-testid="section-reservation"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-warmsand font-inter text-sm uppercase tracking-[0.15em] mb-4">
            Votre table vous attend
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-foreground mb-6">
            Réservation
          </h2>
          <p className="max-w-2xl mx-auto text-charcoal/70 dark:text-foreground/70 text-base md:text-lg">
            Réservez votre moment de détente au Café Pavillon.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white dark:bg-card border-0 shadow-card">
            <CardContent className="p-6 md:p-10">
              {isSuccess ? (
                <div className="text-center py-8" role="status" aria-live="polite">
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal dark:text-foreground mb-3">
                    Réservation confirmée !
                  </h3>
                  <p className="text-charcoal/70 dark:text-foreground/70 mb-2">
                    Votre demande a été enregistrée avec succès.
                  </p>
                  {bookingId && (
                    <p className="text-sm text-charcoal/60 dark:text-foreground/60 mb-6">
                      Référence : <span className="font-mono font-semibold">{bookingId}</span>
                    </p>
                  )}
                  <p className="text-sm text-charcoal/70 dark:text-foreground/70 mb-8">
                    Vous recevrez un email de confirmation sous peu.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleNewReservation}
                    className="button-press"
                    data-testid="button-new-reservation"
                  >
                    Nouvelle réservation
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="res-name" className="text-charcoal dark:text-foreground flex items-center gap-1">
                        Nom complet <span className="text-terracotta">*</span>
                      </Label>
                      <Input
                        id="res-name"
                        placeholder="Jean Dupont"
                        {...register("name")}
                        className={errors.name ? "border-destructive" : ""}
                        data-testid="input-reservation-name"
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm" role="alert">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="res-phone" className="text-charcoal dark:text-foreground flex items-center gap-1">
                        Téléphone <span className="text-terracotta">*</span>
                      </Label>
                      <Input
                        id="res-phone"
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        {...register("phone")}
                        className={errors.phone ? "border-destructive" : ""}
                        data-testid="input-reservation-phone"
                      />
                      {errors.phone && (
                        <p className="text-destructive text-sm" role="alert">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="res-email" className="text-charcoal dark:text-foreground flex items-center gap-1">
                      <Mail className="w-4 h-4 mr-1" strokeWidth={1.5} />
                      Email <span className="text-terracotta">*</span>
                    </Label>
                    <Input
                      id="res-email"
                      type="email"
                      placeholder="jean@example.com"
                      {...register("email")}
                      className={errors.email ? "border-destructive" : ""}
                      data-testid="input-reservation-email"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm" role="alert">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="res-date" className="text-charcoal dark:text-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4 mr-1" strokeWidth={1.5} />
                        Date <span className="text-terracotta">*</span>
                      </Label>
                      <Input
                        id="res-date"
                        type="date"
                        min={today}
                        {...register("date")}
                        className={errors.date ? "border-destructive" : ""}
                        data-testid="input-reservation-date"
                      />
                      {errors.date && (
                        <p className="text-destructive text-sm" role="alert">{errors.date.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-charcoal dark:text-foreground flex items-center gap-1">
                        <Clock className="w-4 h-4 mr-1" strokeWidth={1.5} />
                        Heure <span className="text-terracotta">*</span>
                      </Label>
                      <Select onValueChange={(value) => setValue("time", value)}>
                        <SelectTrigger
                          className={errors.time ? "border-destructive" : ""}
                          data-testid="select-reservation-time"
                        >
                          <SelectValue placeholder="--:--" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.time && (
                        <p className="text-destructive text-sm" role="alert">{errors.time.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-charcoal dark:text-foreground flex items-center gap-1">
                        <Users className="w-4 h-4 mr-1" strokeWidth={1.5} />
                        Personnes <span className="text-terracotta">*</span>
                      </Label>
                      <Select onValueChange={(value) => setValue("partySize", value)}>
                        <SelectTrigger
                          className={errors.partySize ? "border-destructive" : ""}
                          data-testid="select-reservation-party-size"
                        >
                          <SelectValue placeholder="--" />
                        </SelectTrigger>
                        <SelectContent>
                          {partySizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size} {size === "1" ? "personne" : "personnes"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.partySize && (
                        <p className="text-destructive text-sm" role="alert">{errors.partySize.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="res-notes" className="text-charcoal dark:text-foreground">
                      Notes (optionnel)
                    </Label>
                    <Textarea
                      id="res-notes"
                      rows={3}
                      placeholder="Allergies, occasion spéciale, préférences..."
                      {...register("notes")}
                      data-testid="input-reservation-notes"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-warmsand hover:bg-warmsand/90 text-white font-semibold button-press"
                      disabled={mutation.isPending}
                      data-testid="button-submit-reservation"
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Réservation en cours...
                        </>
                      ) : (
                        "Confirmer la réservation"
                      )}
                    </Button>
                  </div>

                  <p className="text-center text-charcoal/60 dark:text-foreground/60 text-sm">
                    Pour les groupes de plus de 8 personnes, contactez-nous par email.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
