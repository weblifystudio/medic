import { Heart, CheckCircle, Sliders, Video, Users, FileText } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Consultations Médecine Générale",
    description: "Examens de routine, diagnostic et traitement. Prise en charge selon la nomenclature en vigueur. Tiers payant possible.",
    price: "Secteur 1"
  },
  {
    icon: Video,
    title: "Téléconsultations",
    description: "Consultations à distance sécurisées via plateforme agréée. Tarif identique aux consultations en cabinet. Ordonnances dématérialisées.",
    price: "Secteur 1"
  },
  {
    icon: CheckCircle,
    title: "Médecine Préventive & Dépistage",
    description: "Bilans de santé, dépistages organisés (cancer colorectal, mammographie), vaccinations selon calendrier vaccinal, conseils en prévention santé.",
    price: "Secteur 1"
  },
  {
    icon: FileText,
    title: "Certificats & Arrêts de Travail",
    description: "Certificats médicaux (sport, aptitude, contre-indications), arrêts de travail, certificats scolaires. Transmission dématérialisée à l'Assurance Maladie.",
    price: "Secteur 1"
  },
  {
    icon: Sliders,
    title: "Suivi Maladies Chroniques",
    description: "Accompagnement des patients diabétiques, hypertendus, asthmatiques. Protocoles de soins, ALD (Affection Longue Durée), surveillance biologique.",
    price: "Secteur 1"
  },
  {
    icon: Users,
    title: "Médecine Familiale",
    description: "Soins pour tous les âges : pédiatrie (dès 6 mois), médecine générale adulte, gériatrie. Suivi familial coordonné et personnalisé.",
    price: "Secteur 1"
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-muted">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-raleway font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Nos Services Médicaux
          </h2>
          <p className="font-source text-xl text-muted-foreground max-w-2xl mx-auto">
            Une prise en charge complète et personnalisée pour répondre à tous vos besoins de santé
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="service-card bg-card p-8 rounded-xl shadow-sm border border-border"
                data-testid={`service-card-${index}`}
              >
                <div className="service-icon">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-raleway font-bold text-xl text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="font-source text-muted-foreground leading-relaxed mb-3">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">
                    Tarif conventionné
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {service.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
