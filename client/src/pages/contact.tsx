import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Contact from "@/components/contact";
import { MapPin, Phone, Mail, Clock, ArrowRight, Sparkles, AlertTriangle } from "lucide-react";

const contactInfo = {
  address: "15 Boulevard Saint-Germain\n75005 Paris, France",
  phone: "01.42.85.67.90",
  phoneLink: "+33142856790",
  email: "contact@drmartinebeaumont.fr",
  rpps: "10003123456",
  sector: "Conventionnée Secteur 1",
  carteVitale: "Carte Vitale acceptée"
};

const scheduleInfo = [
  { day: "Lundi - Vendredi", hours: "8h00 - 19h00" },
  { day: "Samedi", hours: "9h00 - 13h00" },
  { day: "Dimanche", hours: "Fermé" },
];

const emergencyInfo = [
  {
    title: "En cas d'urgence vitale",
    number: "15 (SAMU)",
    description: "Appelez immédiatement le 15 en cas d'urgence vitale"
  },
  {
    title: "Urgences non vitales",
    number: "116 117 (SOS Médecins)",
    description: "Service de garde médicale pour les urgences non vitales"
  },
  {
    title: "Pharmacie de garde",
    number: "3237",
    description: "Pour connaître la pharmacie de garde la plus proche"
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient py-24 lg:py-36">
          <div className="container-modern text-center">
            <h1 className="font-raleway font-bold text-5xl lg:text-6xl xl:text-7xl text-foreground mb-8 tracking-tight">
              Nous <span className="text-gradient">Contacter</span>
            </h1>
            <p className="font-inter text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              N'hésitez pas à nous joindre pour toute question, demande d'information ou pour prendre rendez-vous. 
              Nous sommes là pour vous accompagner dans votre démarche de santé.
            </p>
          </div>
        </section>

        {/* Informations pratiques */}
        <section className="py-24">
          <div className="container-modern">
            <div className="grid lg:grid-cols-3 gap-10 mb-20">
              <div className="service-card text-center group hover:scale-105 transition-all duration-normal ease-out-expo">
                <div className="service-icon mx-auto mb-8">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="font-raleway font-bold text-2xl text-foreground mb-6 tracking-tight">
                  Adresse du cabinet
                </h3>
                <p className="font-inter text-muted-foreground leading-relaxed whitespace-pre-line text-lg mb-4">
                  {contactInfo.address}
                </p>
                <div className="glass-card p-4">
                  <p className="font-inter text-muted-foreground text-sm leading-relaxed">
                    Métro : Saint-Michel (ligne 4)<br />
                    RER : Saint-Michel Notre-Dame (RER B, C)
                  </p>
                </div>
              </div>
              
              <div className="service-card text-center group hover:scale-105 transition-all duration-normal ease-out-expo">
                <div className="service-icon mx-auto mb-8">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="font-raleway font-bold text-2xl text-foreground mb-6 tracking-tight">
                  Téléphone
                </h3>
                <p className="font-raleway text-2xl text-primary font-bold mb-4">
                  <a href={`tel:${contactInfo.phoneLink}`} className="hover:text-primary/80 transition-colors">
                    {contactInfo.phone}
                  </a>
                </p>
                <div className="glass-card p-4">
                  <p className="font-inter text-muted-foreground">
                    Du lundi au vendredi<br />
                    8h00 - 19h00
                  </p>
                </div>
              </div>
              
              <div className="service-card text-center group hover:scale-105 transition-all duration-normal ease-out-expo">
                <div className="service-icon mx-auto mb-8">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="font-raleway font-bold text-2xl text-foreground mb-6 tracking-tight">
                  Email
                </h3>
                <p className="font-raleway text-lg text-primary font-bold mb-4">
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-primary/80 transition-colors break-all">
                    {contactInfo.email}
                  </a>
                </p>
                <div className="glass-card p-4">
                  <p className="font-inter text-muted-foreground">
                    Réponse sous 24h<br />
                    (hors week-end)
                  </p>
                </div>
              </div>
            </div>

            {/* Horaires détaillés */}
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="card-modern p-10 group hover:scale-105 transition-all duration-normal ease-out-expo">
                <h3 className="font-raleway font-bold text-3xl text-foreground mb-8 flex items-center tracking-tight">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  Horaires d'ouverture
                </h3>
                
                <div className="space-y-4 mb-8">
                  {scheduleInfo.map((schedule, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-fast"
                    >
                      <span className="font-raleway font-bold text-foreground">{schedule.day}</span>
                      <span className="font-inter text-muted-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                
                <div className="glass-card p-6">
                  <h4 className="font-raleway font-bold text-foreground mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 text-primary mr-2" />
                    Informations pratiques
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="font-inter text-muted-foreground">{contactInfo.sector}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="font-inter text-muted-foreground">{contactInfo.carteVitale}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="font-inter text-muted-foreground">Tiers payant possible</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="font-inter text-muted-foreground">Consultations sur rendez-vous uniquement</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="font-inter text-muted-foreground">RPPS : {contactInfo.rpps}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-modern p-10 group hover:scale-105 transition-all duration-normal ease-out-expo">
                <h3 className="font-raleway font-bold text-3xl text-foreground mb-8 tracking-tight flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mr-4">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </div>
                  Urgences médicales
                </h3>
                
                <div className="space-y-6 mb-8">
                  {emergencyInfo.map((emergency, index) => (
                    <div key={index} className="glass-card p-6 border-l-4 border-primary">
                      <h4 className="font-raleway font-bold text-foreground mb-2 text-lg">
                        {emergency.title}
                      </h4>
                      <p className="font-raleway text-2xl font-bold text-primary mb-2">
                        {emergency.number}
                      </p>
                      <p className="font-inter text-muted-foreground leading-relaxed">
                        {emergency.description}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="glass-card p-6 border-orange-200/50">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mr-4 mt-1">
                      <AlertTriangle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-inter text-orange-800 font-medium leading-relaxed">
                        <strong>Important :</strong> En cas d'urgence vitale, appelez immédiatement le 15 (SAMU) ou rendez-vous aux urgences de l'hôpital le plus proche.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formulaire de contact */}
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}