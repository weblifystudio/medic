import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function RGPD() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-raleway font-bold text-3xl lg:text-4xl text-foreground mb-8">
            Politique de Protection des Données Personnelles
          </h1>
          
          <div className="space-y-8 font-source text-muted-foreground">
            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Responsable du traitement
              </h2>
              <p className="leading-relaxed">
                <strong>Dr. Martine Beaumont</strong><br />
                Médecin généraliste<br />
                15 Boulevard Saint-Germain, 75005 Paris<br />
                Téléphone : 01.42.85.67.90<br />
                Email : contact@drmartinebeaumont.fr<br />
                RPPS : 10003123456
              </p>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Données collectées
              </h2>
              <p className="leading-relaxed mb-4">
                Dans le cadre du fonctionnement de ce site internet, nous collectons les données personnelles suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Via le formulaire de contact :</strong> nom, prénom, adresse email, message</li>
                <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées</li>
                <li><strong>Cookies techniques :</strong> nécessaires au bon fonctionnement du site</li>
              </ul>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Finalités du traitement
              </h2>
              <p className="leading-relaxed mb-4">
                Vos données personnelles sont traitées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Répondre à vos demandes d'information médicale</li>
                <li>Gérer les prises de contact via le formulaire</li>
                <li>Assurer le bon fonctionnement technique du site</li>
                <li>Respecter nos obligations légales en tant que professionnel de santé</li>
              </ul>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Base légale du traitement
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Consentement :</strong> formulaire de contact</li>
                <li><strong>Intérêt légitime :</strong> sécurité du site et prévention des abus</li>
                <li><strong>Obligation légale :</strong> conservation des échanges professionnels (Code de la Santé Publique)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Durée de conservation
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Messages de contact :</strong> 2 ans après le dernier échange</li>
                <li><strong>Données de navigation :</strong> 13 mois maximum</li>
                <li><strong>Cookies techniques :</strong> durée de la session</li>
              </ul>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Destinataires des données
              </h2>
              <p className="leading-relaxed">
                Vos données personnelles sont destinées exclusivement :
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Au Dr. Martine Beaumont dans le cadre de l'exercice de sa profession</li>
                <li>À l'hébergeur du site (Replit) pour les données techniques</li>
                <li>Aux autorités compétentes en cas d'obligation légale</li>
              </ul>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Vos droits
              </h2>
              <p className="leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Droit d'accès :</strong> connaître les données vous concernant</li>
                <li><strong>Droit de rectification :</strong> modifier vos données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
                <li><strong>Droit à la portabilité :</strong> récupérer vos données</li>
                <li><strong>Droit de limitation :</strong> limiter le traitement</li>
              </ul>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Exercer vos droits
              </h2>
              <p className="leading-relaxed">
                Pour exercer vos droits, contactez-nous :<br />
                <strong>Email :</strong> contact@drmartinebeaumont.fr<br />
                <strong>Courrier :</strong> Dr. Martine Beaumont - 15 Boulevard Saint-Germain, 75005 Paris<br />
                <strong>Téléphone :</strong> 01.42.85.67.90
              </p>
              <p className="leading-relaxed mt-4">
                Votre demande sera traitée dans un délai d'un mois. Une pièce d'identité pourra vous être demandée pour vérifier votre identité.
              </p>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Réclamation
              </h2>
              <p className="leading-relaxed">
                En cas de difficulté, vous pouvez introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :<br />
                <strong>Site web :</strong> www.cnil.fr<br />
                <strong>Téléphone :</strong> 01.53.73.22.22<br />
                <strong>Adresse :</strong> 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07
              </p>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Sécurité des données
              </h2>
              <p className="leading-relaxed">
                Nous mettons en place des mesures techniques et organisationnelles appropriées pour garantir la sécurité de vos données personnelles et les protéger contre tout accès non autorisé, altération, divulgation ou destruction.
              </p>
            </section>

            <section>
              <h2 className="font-raleway font-semibold text-xl text-foreground mb-4">
                Modification de la politique
              </h2>
              <p className="leading-relaxed">
                Cette politique peut être modifiée à tout moment. La version en vigueur est celle accessible sur ce site internet.<br />
                <strong>Dernière mise à jour :</strong> 12 septembre 2025
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}