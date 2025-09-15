import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const scheduleInfo = [
  { day: "Lundi - Vendredi", hours: "8h00 - 19h00" },
  { day: "Samedi", hours: "9h00 - 13h00" },
  { day: "Dimanche", hours: "Fermé" },
];

const contactInfo = {
  address: "15 Boulevard Saint-Germain\n75005 Paris, France",
  phone: "01.42.85.67.90",
  phoneLink: "+33142856790",
  email: "contact@drmartinebeaumont.fr",
  rpps: "10003123456",
  sector: "Conventionnée Secteur 1",
  carteVitale: "Carte Vitale acceptée"
};

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs du formulaire.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-raleway font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Nous Contacter
          </h2>
          <p className="font-source text-xl text-muted-foreground">
            N'hésitez pas à nous joindre pour toute question ou demande d'information
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
            <h3 className="font-raleway font-bold text-xl text-foreground mb-4">
              Envoyez-nous un message
            </h3>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-orange-800 font-medium">
                ⚠️ <strong>Important :</strong> Ne transmettez aucune donnée de santé via ce formulaire (symptômes, diagnostics, ordonnances, résultats). Pour tout échange médical, contactez-nous directement.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="font-source font-semibold text-foreground mb-2">
                  Nom complet
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Votre nom"
                  className="w-full"
                  data-testid="input-name"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="font-source font-semibold text-foreground mb-2">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre@email.com"
                  className="w-full"
                  data-testid="input-email"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="font-source font-semibold text-foreground mb-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Votre message..."
                  className="w-full resize-none"
                  data-testid="textarea-message"
                />
              </div>
              
              <Button 
                type="submit" 
                className="btn-primary w-full py-3 px-6 rounded-lg font-raleway font-bold text-lg"
                disabled={contactMutation.isPending}
                data-testid="button-submit-contact"
              >
                {contactMutation.isPending ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-raleway font-bold text-xl text-foreground mb-6">
                Coordonnées
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="contact-icon">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-raleway font-semibold text-foreground mb-1">Email</h4>
                    <a 
                      href={`mailto:${contactInfo.email}`} 
                      className="font-source text-primary hover:text-primary/80 transition-colors"
                      data-testid="link-email"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="contact-icon">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-raleway font-semibold text-foreground mb-1">Téléphone</h4>
                    <a 
                      href={`tel:${contactInfo.phoneLink}`} 
                      className="font-source text-primary hover:text-primary/80 transition-colors"
                      data-testid="link-phone"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="contact-icon">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-raleway font-semibold text-foreground mb-1">Adresse</h4>
                    <p className="font-source text-muted-foreground whitespace-pre-line">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-xl border" style={{ backgroundColor: 'hsl(var(--primary) / 0.05)', borderColor: 'hsl(var(--primary) / 0.1)' }}>
              <h4 className="font-raleway font-semibold text-foreground mb-3">
                Horaires d'ouverture
              </h4>
              <div className="space-y-2 font-source text-sm text-muted-foreground mb-4">
                {scheduleInfo.map((schedule, index) => (
                  <div 
                    key={index}
                    className="flex justify-between"
                    data-testid={`schedule-${index}`}
                  >
                    <span>{schedule.day}</span>
                    <span>{schedule.hours}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-1 text-xs text-muted-foreground">
                <p><strong>Informations :</strong></p>
                <p>• {contactInfo.sector}</p>
                <p>• {contactInfo.carteVitale}</p>
                <p>• Tiers payant possible</p>
                <p>• Consultations sur rendez-vous</p>
                <p>• RPPS : {contactInfo.rpps}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
