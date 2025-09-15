import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Heart, CheckCircle, Sliders, Video, Users, FileText, Clock, Euro, MapPin, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Heart,
    title: "Consultations Médecine Générale",
    description: "Examens de routine, diagnostic et traitement des pathologies courantes. Prise en charge globale de votre santé avec un suivi personnalisé.",
    details: [
      "Consultation complète avec examen clinique",
      "Diagnostic et prescription de traitements adaptés", 
      "Suivi des pathologies chroniques",
      "Examens complémentaires si nécessaires",
      "Coordination avec les spécialistes"
    ],
    price: "Secteur 1",
    tarif: "26,50€",
    duration: "20-30 min"
  },
  {
    icon: Video,
    title: "Téléconsultations",
    description: "Consultations à distance sécurisées via plateforme agréée. Idéal pour le suivi médical, les renouvellements d'ordonnances et les conseils.",
    details: [
      "Plateforme sécurisée et agréée HAS",
      "Ordonnances dématérialisées envoyées directement",
      "Même tarif qu'une consultation en cabinet",
      "Accessible depuis votre domicile",
      "Suivi post-consultation par email si nécessaire"
    ],
    price: "Secteur 1", 
    tarif: "26,50€",
    duration: "15-20 min"
  },
  {
    icon: CheckCircle,
    title: "Médecine Préventive & Dépistage",
    description: "Bilans de santé complets, dépistages organisés et conseils en prévention pour maintenir votre capital santé.",
    details: [
      "Bilans de santé personnalisés selon l'âge",
      "Dépistages cancer (colorectal, mammographie, col de l'utérus)",
      "Vaccinations selon calendrier vaccinal officiel",
      "Conseils nutritionnels et d'hygiène de vie",
      "Évaluation des facteurs de risque cardiovasculaire"
    ],
    price: "Secteur 1",
    tarif: "26,50€",
    duration: "30-45 min"
  },
  {
    icon: FileText,
    title: "Certificats & Arrêts de Travail",
    description: "Établissement de tous types de certificats médicaux et d'arrêts de travail avec transmission dématérialisée.",
    details: [
      "Certificats médicaux (sport, aptitude professionnelle)",
      "Certificats de contre-indications",
      "Arrêts de travail avec transmission automatique",
      "Certificats scolaires et de crèche",
      "Documents administratifs divers"
    ],
    price: "Secteur 1",
    tarif: "26,50€",
    duration: "15 min"
  },
  {
    icon: Sliders,
    title: "Suivi Maladies Chroniques",
    description: "Accompagnement spécialisé des patients atteints de maladies chroniques avec protocoles de soins adaptés.",
    details: [
      "Diabète : suivi glycémique, éducation thérapeutique",
      "Hypertension artérielle : ajustement des traitements",
      "Asthme et BPCO : contrôle respiratoire",
      "Protocoles ALD (Affection Longue Durée)",
      "Surveillance biologique régulière"
    ],
    price: "Secteur 1",
    tarif: "46€ (consultation complexe)",
    duration: "30-45 min"
  },
  {
    icon: Users,
    title: "Médecine Familiale",
    description: "Soins pour tous les âges avec une approche familiale coordonnée. Suivi médical de toute la famille.",
    details: [
      "Pédiatrie dès 6 mois (vaccinations, croissance)",
      "Médecine de l'adolescent",
      "Adultes jeunes et séniors",
      "Gériatrie et maintien à domicile",
      "Suivi familial coordonné et personnalisé"
    ],
    price: "Secteur 1",
    tarif: "26,50€",
    duration: "20-30 min"
  },
];

const practicalInfo = {
  location: "15 Boulevard Saint-Germain, 75005 Paris",
  phone: "01.42.85.67.90",
  hours: [
    { day: "Lundi - Vendredi", time: "8h00 - 19h00" },
    { day: "Samedi", time: "9h00 - 13h00" },
    { day: "Dimanche", time: "Fermé" }
  ]
};

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient py-24 lg:py-36">
          <div className="container-modern text-center">
            <h1 className="font-raleway font-bold text-5xl lg:text-6xl xl:text-7xl text-foreground mb-8 tracking-tight">
              Nos Services <span className="text-gradient">Médicaux</span>
            </h1>
            <p className="font-inter text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              Une prise en charge complète et personnalisée pour répondre à tous vos besoins de santé. 
              Cabinet de médecine générale conventionné secteur 1 dans le 5ème arrondissement de Paris.
            </p>
            <Link href="/rendez-vous">
              <Button className="btn-primary px-10 py-5 text-lg font-raleway font-bold shadow-2xl hover:shadow-3xl group">
                Prendre rendez-vous
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-fast" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Services détaillés */}
        <section className="py-24">
          <div className="container-modern">
            <div className="grid gap-16">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={index}
                    className="card-modern p-10 grid lg:grid-cols-2 gap-12 items-center group hover:scale-[1.02] transition-all duration-normal ease-out-expo"
                  >
                    <div>
                      <div className="flex items-center mb-8">
                        <div className="service-icon mr-6">
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <h2 className="font-raleway font-bold text-3xl text-foreground tracking-tight">
                          {service.title}
                        </h2>
                      </div>
                      
                      <p className="font-inter text-lg text-muted-foreground mb-8 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <ul className="space-y-4 mb-8">
                        {service.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start group">
                            <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-fast">
                              <CheckCircle className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-inter text-muted-foreground leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="glass-card p-8">
                      <h3 className="font-raleway font-bold text-2xl text-foreground mb-6 tracking-tight">
                        Informations pratiques
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center p-3 rounded-lg bg-primary/5">
                          <Euro className="w-6 h-6 text-primary mr-4" />
                          <div>
                            <span className="font-raleway text-foreground font-bold text-lg">{service.tarif}</span>
                            <span className="font-inter text-muted-foreground ml-2">({service.price})</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 rounded-lg bg-primary/5">
                          <Clock className="w-6 h-6 text-primary mr-4" />
                          <span className="font-inter text-foreground text-lg">{service.duration}</span>
                        </div>
                        
                        <div className="pt-6">
                          <Link href="/rendez-vous">
                            <Button className="btn-primary w-full py-4 text-lg font-raleway font-bold group">
                              Prendre rendez-vous
                              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-fast" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Informations pratiques */}
        <section className="py-24 bg-section">
          <div className="container-modern max-w-5xl">
            <h2 className="font-raleway font-bold text-4xl lg:text-5xl text-foreground text-center mb-20 tracking-tight">
              Informations Pratiques
            </h2>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="card-modern p-10">
                <h3 className="font-raleway font-bold text-2xl text-foreground mb-8 tracking-tight">
                  Cabinet médical
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start p-4 rounded-xl bg-primary/5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4 mt-1">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-raleway text-foreground font-bold text-lg mb-1">Adresse</p>
                      <p className="font-inter text-muted-foreground leading-relaxed">{practicalInfo.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 rounded-xl bg-primary/5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4 mt-1">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-raleway text-foreground font-bold text-lg mb-1">Téléphone</p>
                      <p className="font-inter text-muted-foreground leading-relaxed">{practicalInfo.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-modern p-10">
                <h3 className="font-raleway font-bold text-2xl text-foreground mb-8 tracking-tight">
                  Horaires d'ouverture
                </h3>
                
                <div className="space-y-4 mb-8">
                  {practicalInfo.hours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-primary/5">
                      <span className="font-raleway text-foreground font-bold">{schedule.day}</span>
                      <span className="font-inter text-muted-foreground">{schedule.time}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-border">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      <span className="font-inter text-muted-foreground">Conventionné Secteur 1</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      <span className="font-inter text-muted-foreground">Carte Vitale acceptée</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      <span className="font-inter text-muted-foreground">Tiers payant possible</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      <span className="font-inter text-muted-foreground">Sur rendez-vous</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Link href="/rendez-vous">
                <Button className="btn-primary px-10 py-5 text-lg font-raleway font-bold shadow-xl hover:shadow-2xl group">
                  Prendre rendez-vous en ligne
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-fast" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}