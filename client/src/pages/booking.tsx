import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { format, addDays, setHours, setMinutes, isSameDay, isAfter, isBefore, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";

interface BookingFormData {
  date: Date;
  time: string;
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  reason: string;
  firstVisit: boolean;
  notes: string;
}

const appointmentTypes = [
  { value: "consultation", label: "Consultation générale", duration: "30 min", price: "26,50€" },
  { value: "teleconsultation", label: "Téléconsultation", duration: "20 min", price: "26,50€" },
  { value: "prevention", label: "Médecine préventive", duration: "45 min", price: "26,50€" },
  { value: "chronic", label: "Suivi maladie chronique", duration: "45 min", price: "46€" },
  { value: "certificate", label: "Certificat médical", duration: "15 min", price: "26,50€" },
  { value: "family", label: "Consultation familiale", duration: "30 min", price: "26,50€" }
];

// Horaires disponibles par jour (lundi à vendredi: 8h-19h, samedi: 9h-13h)
const getAvailableSlots = (date: Date) => {
  const day = date.getDay(); // 0 = dimanche, 1 = lundi, etc.
  
  if (day === 0) return []; // Dimanche fermé
  
  if (day === 6) { // Samedi
    return [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"
    ];
  }
  
  // Lundi à vendredi
  return [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
  ];
};

// Vérifier si une date est disponible (pas dimanche, pas trop loin dans le futur)
const isDateAvailable = (date: Date) => {
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 60); // Réservation jusqu'à 2 mois à l'avance
  
  return date.getDay() !== 0 && // Pas dimanche
         isAfter(date, today) && // Pas dans le passé
         isBefore(date, maxDate); // Pas trop loin
};

export default function Booking() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState<BookingFormData>({
    date: new Date(),
    time: "",
    type: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    reason: "",
    firstVisit: false,
    notes: ""
  });
  
  const { toast } = useToast();
  
  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Rendez-vous confirmé !",
        description: "Votre demande de rendez-vous a été enregistrée. Vous recevrez une confirmation par email.",
      });
      setStep(4); // Étape de confirmation
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la prise de rendez-vous. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!selectedDate || !formData.time || !formData.type) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez sélectionner une date, heure et type de consultation.",
        variant: "destructive",
      });
      return;
    }
    
    const finalData = {
      ...formData,
      date: selectedDate
    };
    
    bookingMutation.mutate(finalData);
  };

  const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : [];
  const selectedAppointmentType = appointmentTypes.find(type => type.value === formData.type);

  if (step === 4) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="py-24">
          <div className="container-modern max-w-3xl text-center">
            <div className="glass-card p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-primary/10 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-2xl">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h1 className="font-raleway font-bold text-4xl lg:text-5xl text-foreground mb-6 tracking-tight">
                  Rendez-vous <span className="text-gradient">confirmé</span> !
                </h1>
                <p className="font-inter text-xl text-muted-foreground mb-10 leading-relaxed">
                  Votre demande de rendez-vous a été enregistrée avec succès. Vous recevrez une confirmation par email dans les plus brefs délais.
                </p>
                
                <div className="card-modern p-8 mb-10">
                  <h3 className="font-raleway font-bold text-2xl mb-6 tracking-tight flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary mr-2" />
                    Récapitulatif
                  </h3>
                  <div className="grid grid-cols-2 gap-6 text-left">
                    <div className="p-4 rounded-lg bg-primary/5">
                      <p className="font-inter text-muted-foreground mb-1">Date</p>
                      <p className="font-raleway font-bold text-foreground">{selectedDate && format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5">
                      <p className="font-inter text-muted-foreground mb-1">Heure</p>
                      <p className="font-raleway font-bold text-foreground">{formData.time}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5">
                      <p className="font-inter text-muted-foreground mb-1">Type</p>
                      <p className="font-raleway font-bold text-foreground">{selectedAppointmentType?.label}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5">
                      <p className="font-inter text-muted-foreground mb-1">Patient</p>
                      <p className="font-raleway font-bold text-foreground">{formData.firstName} {formData.lastName}</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="btn-primary px-10 py-5 text-lg font-raleway font-bold shadow-xl hover:shadow-2xl group"
                >
                  Retour à l'accueil
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-fast" />
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient py-24 lg:py-32">
          <div className="container-modern text-center">
            <h1 className="font-raleway font-bold text-5xl lg:text-6xl xl:text-7xl text-foreground mb-8 tracking-tight">
              Prendre <span className="text-gradient">Rendez-vous</span>
            </h1>
            <p className="font-inter text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Réservez votre consultation en quelques clics. Choisissez la date et l'heure qui vous conviennent.
            </p>
          </div>
        </section>

        {/* Stepper */}
        <section className="py-12 bg-section">
          <div className="container-modern">
            <div className="glass-card p-8">
              <div className="stepper max-w-4xl mx-auto">
                {[
                  { num: 1, title: "Date & Heure", icon: CalendarIcon },
                  { num: 2, title: "Type de consultation", icon: FileText },
                  { num: 3, title: "Vos informations", icon: User }
                ].map((stepItem, index) => (
                  <div key={stepItem.num} className="flex items-center relative">
                    <div className={`stepper-step ${step >= stepItem.num ? 'active' : ''} relative`}>
                      {step > stepItem.num ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <stepItem.icon className="w-5 h-5" />
                      )}
                    </div>
                    {index < 2 && (
                      <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-normal ${
                        step > stepItem.num ? 'bg-primary' : 'bg-muted'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6 space-x-8">
                {[
                  { num: 1, title: "Date & Heure" },
                  { num: 2, title: "Type de consultation" },
                  { num: 3, title: "Vos informations" }
                ].map((stepItem) => (
                  <span key={stepItem.num} className={`font-inter text-center transition-colors duration-fast ${
                    step >= stepItem.num ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}>
                    {stepItem.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contenu principal */}
        <section className="py-16">
          <div className="container-modern">
            {step === 1 && (
              <div className="grid lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="font-raleway font-bold text-3xl text-foreground mb-8 flex items-center tracking-tight">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                      <CalendarIcon className="w-6 h-6 text-primary" />
                    </div>
                    Choisissez une date
                  </h2>
                  <div className="card-modern p-8">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => !isDateAvailable(date)}
                      locale={fr}
                      className="w-full"
                    />
                  </div>
                  <div className="glass-card p-4 mt-6">
                    <p className="font-inter text-muted-foreground flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Consultations du lundi au vendredi (8h-19h) et samedi matin (9h-13h)
                    </p>
                  </div>
                </div>
                
                <div>
                  <h2 className="font-raleway font-bold text-3xl text-foreground mb-8 flex items-center tracking-tight">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    Choisissez un horaire
                  </h2>
                  
                  {!selectedDate ? (
                    <div className="glass-card p-12 text-center">
                      <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="font-inter text-muted-foreground text-lg">
                        Sélectionnez d'abord une date pour voir les créneaux disponibles
                      </p>
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                      <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="font-inter text-muted-foreground text-lg">
                        Aucun créneau disponible ce jour-là
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="glass-card p-4">
                        <p className="font-inter text-muted-foreground flex items-center">
                          <Sparkles className="w-4 h-4 text-primary mr-2" />
                          Créneaux disponibles le {selectedDate && format(selectedDate, "EEEE d MMMM", { locale: fr })}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => handleInputChange('time', slot)}
                            className={`p-4 rounded-xl border font-inter font-medium transition-all duration-fast hover:scale-105 ${
                              formData.time === slot
                                ? 'bg-primary text-white border-primary shadow-lg scale-105'
                                : 'glass hover:border-primary hover:shadow-md'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedDate && formData.time && (
                    <div className="mt-10">
                      <Button 
                        onClick={() => setStep(2)}
                        className="btn-primary w-full py-5 text-lg font-raleway font-bold shadow-xl hover:shadow-2xl group"
                      >
                        Continuer
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-fast" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="max-w-4xl mx-auto">
                <h2 className="font-raleway font-bold text-4xl lg:text-5xl text-foreground mb-12 text-center tracking-tight">
                  Type de <span className="text-gradient">consultation</span>
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {appointmentTypes.map((type) => (
                    <div
                      key={type.value}
                      onClick={() => handleInputChange('type', type.value)}
                      className={`service-card cursor-pointer transition-all duration-normal group ${
                        formData.type === type.value
                          ? 'scale-105 shadow-xl border-primary'
                          : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-raleway font-bold text-xl text-foreground leading-tight">
                          {type.label}
                        </h3>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-fast ${
                          formData.type === type.value
                            ? 'border-primary bg-primary'
                            : 'border-muted group-hover:border-primary'
                        }`}>
                          {formData.type === type.value && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="font-inter">{type.duration}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-raleway text-primary font-bold text-lg">{type.price}</p>
                          <p className="font-inter text-xs text-muted-foreground">Secteur 1</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-6">
                  <Button 
                    onClick={() => setStep(1)}
                    className="btn-glass flex-1 py-4 text-lg font-raleway font-bold"
                  >
                    Retour
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    disabled={!formData.type}
                    className="btn-primary flex-1 py-4 text-lg font-raleway font-bold shadow-xl hover:shadow-2xl group"
                  >
                    Continuer
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-fast" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="max-w-4xl mx-auto">
                <h2 className="font-raleway font-bold text-4xl lg:text-5xl text-foreground mb-12 text-center tracking-tight">
                  Vos <span className="text-gradient">informations</span>
                </h2>
                
                <div className="glass-card p-6 mb-12 border-orange-200/50">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mr-4">
                      <Sparkles className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-inter text-orange-800 font-medium leading-relaxed">
                        <strong>Important :</strong> Vos données personnelles sont protégées et utilisées uniquement pour la gestion de votre rendez-vous médical, conformément au RGPD.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="card-modern p-10">
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <Label htmlFor="firstName" className="font-raleway font-bold text-foreground mb-3 block">
                          Prénom *
                        </Label>
                        <Input
                          type="text"
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Votre prénom"
                          className="input-modern"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="lastName" className="font-raleway font-bold text-foreground mb-3 block">
                          Nom *
                        </Label>
                        <Input
                          type="text"
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Votre nom"
                          className="input-modern"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <Label htmlFor="email" className="font-raleway font-bold text-foreground mb-3 block">
                          Email *
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="votre@email.com"
                          className="input-modern"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="font-raleway font-bold text-foreground mb-3 block">
                          Téléphone *
                        </Label>
                        <Input
                          type="tel"
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="01 23 45 67 89"
                          className="input-modern"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="birthDate" className="font-raleway font-bold text-foreground mb-3 block">
                        Date de naissance *
                      </Label>
                      <Input
                        type="date"
                        id="birthDate"
                        required
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="input-modern max-w-xs"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="reason" className="font-raleway font-bold text-foreground mb-3 block">
                        Motif de consultation *
                      </Label>
                      <Input
                        type="text"
                        id="reason"
                        required
                        value={formData.reason}
                        onChange={(e) => handleInputChange('reason', e.target.value)}
                        placeholder="Ex: Consultation de routine, renouvellement ordonnance..."
                        className="input-modern"
                      />
                    </div>
                    
                    <div className="glass-card p-6">
                      <label className="flex items-start space-x-4 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.firstVisit}
                          onChange={(e) => handleInputChange('firstVisit', e.target.checked)}
                          className="w-5 h-5 text-primary mt-1 rounded transition-all duration-fast group-hover:scale-110"
                        />
                        <span className="font-inter text-foreground text-lg">
                          C'est ma première consultation avec Dr. Beaumont
                        </span>
                      </label>
                    </div>
                    
                    <div>
                      <Label htmlFor="notes" className="font-raleway font-bold text-foreground mb-3 block">
                        Informations complémentaires (optionnel)
                      </Label>
                      <Textarea
                        id="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Informations supplémentaires pour préparer votre consultation..."
                        className="input-modern resize-none"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-6 mt-12">
                  <Button 
                    onClick={() => setStep(2)}
                    className="btn-glass flex-1 py-4 text-lg font-raleway font-bold"
                  >
                    Retour
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.birthDate || !formData.reason || bookingMutation.isPending}
                    className="btn-primary flex-1 py-4 text-lg font-raleway font-bold shadow-xl hover:shadow-2xl group"
                  >
                    {bookingMutation.isPending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Confirmation...
                      </>
                    ) : (
                      <>
                        Confirmer le rendez-vous
                        <CheckCircle className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform duration-fast" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}