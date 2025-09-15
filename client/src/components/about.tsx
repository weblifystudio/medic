import { Check } from "lucide-react";

const certifications = [
  "Docteur en Médecine - Faculté de Médecine Paris Descartes (2008)",
  "Inscrite au Tableau du Conseil départemental de l'Ordre des Médecins de Paris (CDOM 75)",
  "DES de Médecine Générale - Université Pierre et Marie Curie (2009)",
  "Formation DPC validée annuellement depuis 2010",
  "Membre de la Société Française de Médecine Générale (SFMG)",
  "RPPS N° 10003123456",
];

export default function About() {
  return (
    <section id="apropos" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
              alt="Consultation médicale professionnelle" 
              className="rounded-2xl shadow-xl w-full object-cover"
              data-testid="img-consultation"
            />
          </div>
          
          <div>
            <h2 className="font-raleway font-bold text-3xl lg:text-4xl text-foreground mb-6">
              À Propos du Dr. Beaumont
            </h2>
            
            <div className="space-y-6 font-source text-lg text-muted-foreground leading-relaxed">
              <p>
                Diplômée de la Faculté de Médecine Paris Descartes en 2008, le Dr. Martine Beaumont a obtenu son DES de Médecine Générale en 2009. Elle exerce depuis plus de 15 ans en cabinet de médecine générale dans le 5ème arrondissement de Paris, conventionnée secteur 1.
              </p>
              
              <p>
                Passionnée par la médecine préventive et l'accompagnement des patients, elle privilégie une approche globale de la santé. Formée en permanence aux dernières pratiques médicales dans le cadre du DPC (Développement Professionnel Continu), elle prend en compte les aspects physiques, psychologiques et sociaux de chaque patient.
              </p>

              <p>
                Membre active de la SFMG (Société Française de Médecine Générale), elle participe régulièrement à des formations sur les nouvelles recommandations de la HAS (Haute Autorité de Santé) et contribue à l'amélioration des pratiques en médecine de premier recours.
              </p>
            </div>
            
            <div className="mt-10">
              <h3 className="font-raleway font-bold text-xl text-foreground mb-4">
                Certifications & Affiliations
              </h3>
              <ul className="space-y-3 font-source text-muted-foreground">
                {certifications.map((cert, index) => (
                  <li 
                    key={index}
                    className="flex items-center"
                    data-testid={`certification-${index}`}
                  >
                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
