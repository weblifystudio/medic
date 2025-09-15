import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-raleway font-bold text-3xl lg:text-4xl text-foreground mb-8">
            Mentions Légales
          </h1>
          
          <div className="space-y-8 font-source text-muted-foreground">
            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Éditeur du site
              </h2>
              <p className="leading-relaxed">
                <strong>Dr. Martine Beaumont</strong><br />
                Médecin généraliste<br />
                15 Boulevard Saint-Germain<br />
                75005 Paris, France<br />
                Téléphone : 01.42.85.67.90<br />
                Email : contact@drmartinebeaumont.fr<br /><br />
                <strong>Directeur de la publication :</strong> Dr. Martine Beaumont
              </p>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Identification professionnelle
              </h2>
              <p className="leading-relaxed">
                <strong>RPPS :</strong> 10003123456<br />
                <strong>Inscrite au Tableau :</strong> Conseil départemental de l'Ordre des Médecins de Paris (CDOM 75)<br />
                <strong>Conventionnement :</strong> Secteur 1<br />
                <strong>Formation :</strong> Docteur en Médecine - Faculté de Médecine Paris Descartes (2008)<br />
                <strong>DES :</strong> Médecine Générale - Université Pierre et Marie Curie (2009)
              </p>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Responsabilité civile professionnelle
              </h2>
              <p className="leading-relaxed">
                <strong>Assureur :</strong> MACSF<br />
                <strong>Numéro de contrat :</strong> 15847269<br />
                <strong>Garantie territoriale :</strong> France métropolitaine
              </p>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Hébergement
              </h2>
              <p className="leading-relaxed">
                Ce site est hébergé par :<br />
                <strong>Replit</strong><br />
                767 Bryant Street<br />
                San Francisco, CA 94107<br />
                États-Unis
              </p>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Propriété intellectuelle
              </h2>
              <p className="leading-relaxed">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Limitation de responsabilité
              </h2>
              <p className="leading-relaxed">
                Les informations fournies sur ce site le sont à titre informatif. Elles ne peuvent en aucun cas remplacer une consultation médicale. Le Dr. Martine Beaumont s'efforce de fournir des informations aussi précises que possible, mais ne saurait garantir l'exactitude, la complétude et l'actualité des informations diffusées.
              </p>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Contact
              </h2>
              <p className="leading-relaxed">
                Pour toute question concernant ces mentions légales :<br />
                Dr. Martine Beaumont<br />
                Email : contact@drmartinebeaumont.fr<br />
                Téléphone : 01.42.85.67.90
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}