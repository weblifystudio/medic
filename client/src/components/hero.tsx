import { ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="hero-gradient py-20 lg:py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-raleway font-bold text-4xl lg:text-5xl xl:text-6xl text-foreground mb-6 leading-tight">
              Votre santé, <br />
              <span className="text-primary">notre priorité</span>
            </h1>
            <p className="font-source text-xl text-muted-foreground mb-8 leading-relaxed">
              Dr. Martine Beaumont, médecin généraliste expérimentée, vous accompagne avec bienveillance et professionnalisme pour préserver votre bien-être au quotidien.
            </p>
            <button 
              onClick={scrollToContact}
              className="btn-primary inline-flex items-center px-8 py-4 rounded-lg font-raleway font-bold text-lg shadow-lg"
              data-testid="button-contact-hero"
            >
              Prendre contact
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=600" 
              alt="Dr. Martine Beaumont - Médecin généraliste" 
              className="rounded-2xl shadow-2xl w-full max-w-md lg:max-w-lg object-cover"
              data-testid="img-doctor-hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
