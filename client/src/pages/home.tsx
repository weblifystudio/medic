import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, CheckCircle, Video, Users, Phone, Mail, MapPin, Star } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Consultations Médecine Générale",
    description: "Examens de routine, diagnostic et traitement personnalisé pour préserver votre santé au quotidien.",
    price: "26,50€"
  },
  {
    icon: Video,
    title: "Téléconsultations",
    description: "Consultations à distance sécurisées. Ordonnances dématérialisées envoyées directement.",
    price: "26,50€"
  },
  {
    icon: CheckCircle,
    title: "Médecine Préventive",
    description: "Bilans de santé, dépistages organisés et conseils pour maintenir votre capital santé.",
    price: "26,50€"
  },
  {
    icon: Users,
    title: "Médecine Familiale",
    description: "Soins pour tous les âges avec une approche familiale coordonnée et personnalisée.",
    price: "26,50€"
  }
];

const testimonials = [
  {
    name: "Marie L.",
    comment: "Docteur très à l'écoute et professionnelle. Je recommande vivement !",
    rating: 5
  },
  {
    name: "Pierre M.",
    comment: "Excellent suivi médical, des explications claires et un cabinet très accueillant.",
    rating: 5
  },
  {
    name: "Sophie D.",
    comment: "La téléconsultation est très pratique. Dr. Beaumont prend le temps qu'il faut.",
    rating: 5
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient py-24 lg:py-36">
          <div className="container-modern">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left">
                <h1 className="font-raleway font-bold text-5xl lg:text-6xl xl:text-7xl text-foreground mb-8 leading-tight tracking-tight">
                  Votre santé, <br />
                  <span className="text-gradient">notre priorité</span>
                </h1>
                <p className="font-inter text-xl lg:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                  Dr. Martine Beaumont, médecin généraliste expérimentée, vous accompagne avec bienveillance et excellence pour préserver votre bien-être au quotidien.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <Link href="/rendez-vous">
                    <Button className="btn-professional inline-flex items-center group">
                      Prendre rendez-vous
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-fast" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button className="btn-glass inline-flex items-center px-10 py-5 rounded-xl font-raleway font-bold text-lg hover:scale-105 transition-all duration-slow">
                      Nos services
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-slow opacity-75"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=600" 
                    alt="Dr. Martine Beaumont - Médecin généraliste" 
                    className="relative rounded-3xl w-full max-w-md lg:max-w-lg object-cover shadow-3xl group-hover:scale-105 transition-all duration-slow ease-out-expo"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services aperçu */}
        <section className="py-24 bg-section">
          <div className="container-modern">
            <div className="text-center mb-20">
              <h2 className="font-raleway font-bold text-4xl lg:text-5xl text-foreground mb-6 tracking-tight">
                Nos Services Médicaux
              </h2>
              <p className="font-inter text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Une prise en charge complète et personnalisée pour répondre à tous vos besoins de santé
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={index}
                    className="card-professional text-center group hover:scale-105 transition-all duration-slow ease-out-expo"
                  >
                    <div className="medical-icon mx-auto">
                      <IconComponent className="w-10 h-10" />
                    </div>
                    <h3 className="font-raleway font-bold text-xl text-foreground mb-4 leading-tight">
                      {service.title}
                    </h3>
                    <p className="font-inter text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <p className="font-raleway text-primary font-bold text-lg">{service.price}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="text-center">
              <Link href="/services">
                <Button className="btn-professional inline-flex items-center">
                  Voir tous nos services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* À propos aperçu */}
        <section className="py-24">
          <div className="container-modern">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative group">
                  <div className="absolute -inset-6 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-slow opacity-60"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                    alt="Dr. Martine Beaumont en consultation" 
                    className="relative rounded-3xl w-full object-cover shadow-2xl group-hover:scale-105 transition-all duration-slow ease-out-expo"
                  />
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <h2 className="font-raleway font-bold text-4xl lg:text-5xl text-foreground mb-8 tracking-tight">
                  Dr. Martine Beaumont
                </h2>
                <p className="font-inter text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Diplômée de la Faculté de Médecine Paris Descartes, je pratique la médecine générale depuis plus de 15 ans dans le 5ème arrondissement de Paris. Mon approche privilégie l'écoute, la bienveillance et l'accompagnement personnalisé de chaque patient.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-fast">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-inter text-muted-foreground text-lg">15+ années d'expérience</span>
                  </li>
                  <li className="flex items-center group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-fast">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-inter text-muted-foreground text-lg">Conventionnée Secteur 1</span>
                  </li>
                  <li className="flex items-center group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-fast">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-inter text-muted-foreground text-lg">Formation continue certifiée</span>
                  </li>
                </ul>
                <Link href="/a-propos">
                  <Button className="btn-glass px-8 py-4 text-lg font-raleway font-bold">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-24 bg-section">
          <div className="container-modern">
            <div className="text-center mb-20">
              <h2 className="font-raleway font-bold text-4xl lg:text-5xl text-foreground mb-6 tracking-tight">
                Ce que disent nos patients
              </h2>
              <p className="font-inter text-xl lg:text-2xl text-muted-foreground">
                Leur satisfaction est notre priorité
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="glass-card p-8 group hover:scale-105 transition-all duration-normal ease-out-expo"
                >
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current mr-1" />
                    ))}
                  </div>
                  <p className="font-inter text-muted-foreground mb-6 italic text-lg leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <p className="font-raleway font-bold text-foreground text-lg">
                    {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact aperçu */}
        <section className="py-24">
          <div className="container-modern">
            <div className="text-center mb-20">
              <h2 className="font-raleway font-bold text-4xl lg:text-5xl text-foreground mb-6 tracking-tight">
                Nous Contacter
              </h2>
              <p className="font-inter text-xl lg:text-2xl text-muted-foreground">
                N'hésitez pas à nous joindre pour toute question
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 card-modern group">
                <div className="contact-icon mx-auto mb-6">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-raleway font-bold text-xl text-foreground mb-4">Téléphone</h3>
                <p className="font-raleway text-primary font-bold text-lg mb-2">01.42.85.67.90</p>
                <p className="font-inter text-muted-foreground">Lun-Ven 8h-19h</p>
              </div>
              
              <div className="text-center p-8 card-modern group">
                <div className="contact-icon mx-auto mb-6">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-raleway font-bold text-xl text-foreground mb-4">Email</h3>
                <p className="font-raleway text-primary font-bold text-lg mb-2">contact@drmartinebeaumont.fr</p>
                <p className="font-inter text-muted-foreground">Réponse sous 24h</p>
              </div>
              
              <div className="text-center p-8 card-modern group">
                <div className="contact-icon mx-auto mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-raleway font-bold text-xl text-foreground mb-4">Adresse</h3>
                <p className="font-raleway text-foreground font-bold text-lg mb-2">15 Bd Saint-Germain</p>
                <p className="font-inter text-muted-foreground">75005 Paris</p>
              </div>
            </div>
            
            <div className="text-center flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button className="btn-primary px-10 py-5 text-lg font-raleway font-bold shadow-xl hover:shadow-2xl">
                  Nous contacter
                </Button>
              </Link>
              <Link href="/rendez-vous">
                <Button className="btn-glass px-10 py-5 text-lg font-raleway font-bold">
                  Prendre rendez-vous
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
