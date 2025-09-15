import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, Award, Users, Heart, BookOpen, MapPin, ArrowRight, Sparkles, Stethoscope } from "lucide-react";

const certifications = [
  "Docteur en Médecine - Faculté de Médecine Paris Descartes (2008)",
  "Inscrite au Tableau du Conseil départemental de l'Ordre des Médecins de Paris (CDOM 75)",
  "DES de Médecine Générale - Université Pierre et Marie Curie (2009)",
  "Formation DPC validée annuellement depuis 2010",
  "Membre de la Société Française de Médecine Générale (SFMG)",
  "RPPS N° 10003123456",
];

const experience = [
  {
    period: "2009 - 2012",
    position: "Médecin Assistant",
    location: "Hôpital Saint-Louis, Paris 10ème",
    description: "Formation hospitalière en médecine interne et urgences. Acquisition de l'expérience clinique en environnement hospitalier."
  },
  {
    period: "2012 - 2015", 
    position: "Médecin Remplaçant",
    location: "Cabinets médicaux, Paris et région parisienne",
    description: "Expérience diversifiée en médecine générale libérale. Développement de l'approche globale du patient."
  },
  {
    period: "2015 - Aujourd'hui",
    position: "Médecin Généraliste Titulaire",
    location: "Cabinet médical, 75005 Paris",
    description: "Installation en médecine générale. Suivi de patientèle fidèle et développement de l'expertise en médecine préventive."
  }
];

const specialties = [
  {
    icon: Heart,
    title: "Médecine Préventive",
    description: "Spécialisation dans la prévention et le dépistage précoce des pathologies."
  },
  {
    icon: Users,
    title: "Médecine Familiale", 
    description: "Expertise dans la prise en charge globale des familles, tous âges confondus."
  },
  {
    icon: BookOpen,
    title: "Formation Continue",
    description: "Participation active aux formations DPC et aux congrès médicaux."
  }
];

const values = [
  {
    title: "Écoute & Bienveillance",
    description: "Chaque patient est unique. Je privilégie l'écoute attentive et l'accompagnement personnalisé pour comprendre vos préoccupations de santé."
  },
  {
    title: "Excellence Médicale", 
    description: "Formation continue et mise à jour constante des connaissances médicales pour vous offrir les meilleurs soins selon les dernières recommandations."
  },
  {
    title: "Approche Globale",
    description: "Prise en compte des aspects physiques, psychologiques et sociaux de la santé pour un accompagnement complet et durable."
  },
  {
    title: "Accessibilité",
    description: "Conventionnée secteur 1, je m'engage à rendre les soins accessibles avec la téléconsultation et des horaires adaptés."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient py-24 lg:py-36">
          <div className="container-modern">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Stethoscope className="w-8 h-8 text-primary" />
                  </div>
                  <span className="font-inter text-primary font-medium text-lg">Médecin Généraliste</span>
                </div>
                <h1 className="font-raleway font-bold text-5xl lg:text-6xl xl:text-7xl text-foreground mb-8 tracking-tight">
                  Dr. Martine <span className="text-gradient">Beaumont</span>
                </h1>
                <p className="font-inter text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed">
                  Médecin généraliste passionnée, je vous accompagne depuis plus de 15 ans dans la préservation et l'amélioration de votre santé. Mon approche allie expertise médicale, écoute attentive et bienveillance.
                </p>
                <Link href="/rendez-vous">
                  <Button className="btn-primary px-10 py-5 text-lg font-raleway font-bold shadow-2xl hover:shadow-3xl group">
                    Prendre rendez-vous
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-fast" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl scale-110"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=600" 
                    alt="Dr. Martine Beaumont - Médecin généraliste" 
                    className="relative rounded-3xl shadow-3xl w-full max-w-md lg:max-w-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parcours professionnel - Timeline moderne */}
        <section className="py-24">
          <div className="container-modern">
            <h2 className="font-raleway font-bold text-4xl lg:text-5xl text-foreground text-center mb-20 tracking-tight">
              Parcours <span className="text-gradient">Professionnel</span>
            </h2>
            
            <div className="timeline relative max-w-5xl mx-auto">
              {/* Ligne centrale */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-primary opacity-30"></div>
              
              {experience.map((exp, index) => (
                <div 
                  key={index}
                  className={`timeline-item relative mb-16 ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
                >
                  {/* Point lumineux */}
                  <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full shadow-2xl border-4 border-background">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
                    <div className="absolute inset-1 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
                  </div>
                  
                  {/* Contenu */}
                  <div className={`timeline-content w-5/12 ${index % 2 === 0 ? 'mr-auto pr-12' : 'ml-auto pl-12'}`}>
                    <div className="card-modern p-8 group hover:scale-105 transition-all duration-normal ease-out-expo">
                      <div className="timeline-badge inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-raleway font-bold text-sm mb-6 shadow-lg">
                        <Sparkles className="w-4 h-4 mr-2" />
                        {exp.period}
                      </div>
                      
                      <h3 className="font-raleway font-bold text-2xl text-foreground mb-4 tracking-tight">
                        {exp.position}
                      </h3>
                      
                      <div className="flex items-center mb-4 p-3 rounded-lg bg-primary/5">
                        <MapPin className="w-5 h-5 text-primary mr-3" />
                        <span className="font-inter text-muted-foreground">{exp.location}</span>
                      </div>
                      
                      <p className="font-inter text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Domaines d'expertise */}
        <section className="py-24 bg-section">
          <div className="container-modern">
            <h2 className="font-raleway font-bold text-4xl lg:text-5xl text-foreground text-center mb-20 tracking-tight">
              Domaines d'<span className="text-gradient">Expertise</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-10">
              {specialties.map((specialty, index) => {
                const IconComponent = specialty.icon;
                return (
                  <div 
                    key={index}
                    className="service-card text-center group hover:scale-105 transition-all duration-normal ease-out-expo"
                  >
                    <div className="service-icon mx-auto mb-8">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="font-raleway font-bold text-2xl text-foreground mb-6 tracking-tight">
                      {specialty.title}
                    </h3>
                    <p className="font-inter text-muted-foreground leading-relaxed">
                      {specialty.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mes valeurs */}
        <section className="py-24">
          <div className="container-modern">
            <h2 className="font-raleway font-bold text-4xl lg:text-5xl text-foreground text-center mb-20 tracking-tight">
              Mes <span className="text-gradient">Valeurs</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-10">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="card-modern p-10 group hover:scale-105 transition-all duration-normal ease-out-expo"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full mr-4"></div>
                    <h3 className="font-raleway font-bold text-2xl text-foreground tracking-tight">
                      {value.title}
                    </h3>
                  </div>
                  <p className="font-inter text-muted-foreground leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications & Formations */}
        <section className="py-24 bg-section">
          <div className="container-modern max-w-5xl">
            <h2 className="font-raleway font-bold text-4xl lg:text-5xl text-foreground text-center mb-20 tracking-tight">
              Certifications & <span className="text-gradient">Affiliations</span>
            </h2>
            
            <div className="card-modern p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-raleway font-bold text-2xl text-foreground mb-8 flex items-center tracking-tight">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    Formation & Diplômes
                  </h3>
                  <ul className="space-y-4">
                    {certifications.map((cert, index) => (
                      <li 
                        key={index}
                        className="flex items-start p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-fast"
                      >
                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-inter text-muted-foreground leading-relaxed">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-raleway font-bold text-2xl text-foreground mb-8 tracking-tight">
                    Informations Pratiques
                  </h3>
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-primary/5">
                      <p className="font-raleway font-bold text-foreground mb-2">Conventionnement</p>
                      <p className="font-inter text-muted-foreground">Secteur 1 - Tarifs de base Sécurité Sociale</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5">
                      <p className="font-raleway font-bold text-foreground mb-2">Modes de paiement</p>
                      <p className="font-inter text-muted-foreground">Carte Vitale, tiers payant, espèces, chèque, carte bancaire</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5">
                      <p className="font-raleway font-bold text-foreground mb-2">Langues parlées</p>
                      <p className="font-inter text-muted-foreground">Français, Anglais</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5">
                      <p className="font-raleway font-bold text-foreground mb-2">Assurance professionnelle</p>
                      <p className="font-inter text-muted-foreground">MACSF - Contrat n° 15847269</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
          <div className="container-modern max-w-5xl text-center">
            <div className="glass-card p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 pointer-events-none"></div>
              <div className="relative z-10">
                <h2 className="font-raleway font-bold text-4xl lg:text-5xl text-foreground mb-8 tracking-tight">
                  Prêt(e) à prendre soin de votre <span className="text-gradient">santé</span> ?
                </h2>
                <p className="font-inter text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                  Je serais ravie de vous accompagner dans votre démarche de santé. N'hésitez pas à prendre rendez-vous ou à me contacter pour toute question.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/rendez-vous">
                    <Button className="btn-primary px-10 py-5 text-lg font-raleway font-bold shadow-xl hover:shadow-2xl group">
                      Prendre rendez-vous
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-fast" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button className="btn-glass px-10 py-5 text-lg font-raleway font-bold group">
                      Me contacter
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-fast" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}