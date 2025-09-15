export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-raleway font-bold text-xl mb-4">
              Dr. Martine Beaumont
            </h3>
            <p className="font-source text-background/80 mb-4">
              Médecin généraliste dédiée à votre bien-être et votre santé depuis plus de 15 ans.
            </p>
          </div>
          
          <div>
            <h4 className="font-raleway font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-2 font-source text-background/80">
              <p data-testid="footer-email">📧 contact@drmartinebeaumont.fr</p>
              <p data-testid="footer-phone">📞 01.42.85.67.90</p>
              <p data-testid="footer-address">📍 15 Boulevard Saint-Germain, 75005 Paris</p>
              <p data-testid="footer-sector">Conventionnée Secteur 1</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-raleway font-semibold text-lg mb-4">Informations Légales</h4>
            <div className="space-y-2 font-source text-background/80 text-sm">
              <div className="space-y-1">
                <p><strong>Dr. Martine Beaumont</strong></p>
                <p>RPPS : 10003123456</p>
                <p>Conseil départemental de l'Ordre des Médecins de Paris (CDOM 75)</p>
              </div>
              
              <div className="space-y-1 pt-2">
                <a 
                  href="/mentions-legales" 
                  className="block hover:text-background transition-colors"
                  data-testid="footer-legal"
                >
                  Mentions légales et politique de confidentialité
                </a>
                <a 
                  href="/rgpd" 
                  className="block hover:text-background transition-colors"
                  data-testid="footer-privacy"
                >
                  Données personnelles - RGPD
                </a>
                <p>RCP : MACSF N° 110.138.701</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <div className="font-source text-background/60 text-sm space-y-1">
            <p>© 2024 Dr. Martine Beaumont - Médecin Généraliste</p>
            <p>Site conforme aux réglementations de l'Ordre National des Médecins</p>
            <p>Informations médicales rédigées selon les recommandations de la HAS</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
