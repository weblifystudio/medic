import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth, AuthProvider } from "@/hooks/useAuth";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Home from "@/pages/home";
import Services from "@/pages/services";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Booking from "@/pages/booking";
import PatientDashboard from "@/pages/patient-dashboard";
import Auth from "@/pages/auth";
import NotFound from "@/pages/not-found";
import MentionsLegales from "@/pages/mentions-legales";
import RGPD from "@/pages/rgpd";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Hook pour faire défiler automatiquement vers le haut à chaque changement de page
  useScrollToTop();

  // Afficher un écran de chargement global pendant la vérification de l'auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="font-inter text-muted-foreground mt-4">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/a-propos" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/rendez-vous" component={Booking} />
      
      {/* Route d'authentification - rediriger vers /mon-espace si déjà connecté */}
      <Route path="/auth">
        {isAuthenticated ? <Redirect to="/mon-espace" /> : <Auth />}
      </Route>
      
      {/* Route protégée - rediriger vers /auth si non connecté */}
      <Route path="/mon-espace">
        {isAuthenticated ? <PatientDashboard /> : <Redirect to="/auth" />}
      </Route>
      
      <Route path="/mentions-legales" component={MentionsLegales} />
      <Route path="/rgpd" component={RGPD} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
