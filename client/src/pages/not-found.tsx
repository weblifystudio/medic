import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Home, Calendar, Phone, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        {/* Hero Section 404 */}
        <section className="hero-gradient py-24 lg:py-36">
          <div className="container-modern">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-12">
                <div className="relative group inline-block">
                  <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-slow opacity-60"></div>
                  <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-3xl group-hover:scale-110 transition-all duration-slow ease-out-expo">
                    <Search className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
              
              <h1 className="font-raleway font-bold text-6xl lg:text-8xl text-foreground mb-8 leading-tight tracking-tight">
                4<span className="text-gradient">0</span>4
              </h1>
              
              <h2 className="font-raleway font-bold text-3xl lg:text-4xl text-foreground mb-6 tracking-tight">
                Page Introuvable
              </h2>
              
              <p className="font-inter text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée. 
                Retournons ensemble vers les soins qui vous attendent.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/">
                  <Button className="btn-professional inline-flex items-center group">
                    <Home className="w-5 h-5 mr-3" />
                    Retour à l'accueil
                    <ArrowLeft className="w-5 h-5 ml-3 group-hover:-translate-x-1 transition-transform duration-fast" />
                  </Button>
                </Link>
                <Link href="/rendez-vous">
                  <Button className="btn-glass inline-flex items-center px-10 py-5 rounded-xl font-raleway font-bold text-lg hover:scale-105 transition-all duration-slow">
                    <Calendar className="w-5 h-5 mr-3" />
                    Prendre rendez-vous
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section aide rapide */}
        <section className="py-24 bg-section">
          <div className="container-modern">
            <div className="text-center mb-16">
              <h3 className="font-raleway font-bold text-3xl lg:text-4xl text-foreground mb-6 tracking-tight">
                Comment pouvons-nous vous aider ?
              </h3>
              <p className="font-inter text-lg lg:text-xl text-muted-foreground">
                Explorez nos services ou contactez-nous directement
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Link href="/services">
                <div className="card-professional text-center group hover:scale-105 transition-all duration-slow ease-out-expo cursor-pointer">
                  <div className="medical-icon mx-auto mb-6">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h4 className="font-raleway font-bold text-xl text-foreground mb-4">
                    Nos Services
                  </h4>
                  <p className="font-inter text-muted-foreground">
                    Découvrez notre gamme complète de soins médicaux
                  </p>
                </div>
              </Link>
              
              <Link href="/a-propos">
                <div className="card-professional text-center group hover:scale-105 transition-all duration-slow ease-out-expo cursor-pointer">
                  <div className="medical-icon mx-auto mb-6">
                    <Search className="w-8 h-8" />
                  </div>
                  <h4 className="font-raleway font-bold text-xl text-foreground mb-4">
                    À Propos
                  </h4>
                  <p className="font-inter text-muted-foreground">
                    Apprenez-en plus sur Dr. Martine Beaumont
                  </p>
                </div>
              </Link>
              
              <Link href="/contact">
                <div className="card-professional text-center group hover:scale-105 transition-all duration-slow ease-out-expo cursor-pointer">
                  <div className="medical-icon mx-auto mb-6">
                    <Phone className="w-8 h-8" />
                  </div>
                  <h4 className="font-raleway font-bold text-xl text-foreground mb-4">
                    Contact
                  </h4>
                  <p className="font-inter text-muted-foreground">
                    Contactez notre cabinet médical
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
