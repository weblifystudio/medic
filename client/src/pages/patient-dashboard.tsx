import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  LogOut,
  Plus
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "wouter";

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  reason: string;
  firstVisit: boolean;
  notes: string | null;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export default function PatientDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // La protection de la route est maintenant gérée par le Router dans App.tsx

  // Fetch user appointments
  const { data: appointmentsData, isLoading: appointmentsLoading } = useQuery({
    queryKey: ["/api/my-appointments"],
    enabled: isAuthenticated,
    retry: (failureCount, error) => {
      if (isUnauthorizedError(error as Error)) {
        return false;
      }
      return failureCount < 3;
    },
  });

  // Cancel appointment mutation
  const cancelMutation = useMutation({
    mutationFn: async (appointmentId: string) => {
      const response = await apiRequest("PUT", `/api/appointments/${appointmentId}/cancel`, {});
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Rendez-vous annulé",
        description: "Votre rendez-vous a été annulé avec succès.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/my-appointments"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Session expirée",
          description: "Veuillez vous reconnecter.",
          variant: "destructive",
        });
        // Le Router gère automatiquement la redirection vers /auth
        return;
      }
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'annulation.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="py-24">
          <div className="container-modern max-w-4xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="font-inter text-muted-foreground mt-4">Chargement...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  const appointments: Appointment[] = (appointmentsData as { appointments: Appointment[] })?.appointments || [];
  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) > new Date() && apt.status !== "cancelled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const pastAppointments = appointments
    .filter(apt => new Date(apt.date) <= new Date() || apt.status === "cancelled")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Confirmé</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />Annulé</Badge>;
      default:
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200"><AlertCircle className="w-3 h-3 mr-1" />En attente</Badge>;
    }
  };

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      "consultation": "Consultation générale",
      "teleconsultation": "Téléconsultation",
      "prevention": "Médecine préventive",
      "chronic": "Suivi maladie chronique",
      "certificate": "Certificat médical",
      "family": "Consultation familiale"
    };
    return types[type] || type;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        {/* Header */}
        <section className="hero-gradient py-16 lg:py-24">
          <div className="container-modern max-w-6xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <h1 className="font-raleway font-bold text-4xl lg:text-5xl text-foreground mb-4 tracking-tight">
                  Mon <span className="text-gradient">Espace Patient</span>
                </h1>
                <div className="flex items-center gap-4">
                  {(user as any)?.profileImageUrl && (
                    <img 
                      src={(user as any).profileImageUrl} 
                      alt="Photo de profil"
                      className="w-12 h-12 rounded-full object-cover shadow-lg"
                    />
                  )}
                  <div>
                    <p className="font-raleway font-bold text-xl text-foreground">
                      {(user as any)?.firstName} {(user as any)?.lastName}
                    </p>
                    <p className="font-inter text-muted-foreground">
                      {(user as any)?.email}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link href="/rendez-vous">
                  <Button className="btn-primary px-6 py-3 font-raleway font-bold group" data-testid="button-new-appointment">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau rendez-vous
                  </Button>
                </Link>
                <Button 
                  onClick={() => window.location.href = "/api/logout"}
                  className="btn-glass px-6 py-3 font-raleway font-bold"
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-16">
          <div className="container-modern max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Upcoming Appointments */}
                <div>
                  <h2 className="font-raleway font-bold text-3xl text-foreground mb-8 flex items-center tracking-tight">
                    <Calendar className="w-8 h-8 text-primary mr-3" />
                    Prochains rendez-vous
                  </h2>
                  
                  {appointmentsLoading ? (
                    <div className="card-modern p-12 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="font-inter text-muted-foreground">Chargement des rendez-vous...</p>
                    </div>
                  ) : upcomingAppointments.length > 0 ? (
                    <div className="space-y-6">
                      {upcomingAppointments.map((appointment) => (
                        <Card key={appointment.id} className="card-modern group hover:scale-[1.02] transition-all duration-normal">
                          <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="font-raleway text-xl text-foreground tracking-tight">
                                  {getTypeLabel(appointment.type)}
                                </CardTitle>
                                <CardDescription className="font-inter mt-2">
                                  {appointment.reason}
                                </CardDescription>
                              </div>
                              {getStatusBadge(appointment.status)}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center gap-6 text-sm">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 text-primary mr-2" />
                                <span className="font-raleway font-medium">
                                  {format(new Date(appointment.date), "EEEE d MMMM yyyy", { locale: fr })}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 text-primary mr-2" />
                                <span className="font-raleway font-medium">{appointment.time}</span>
                              </div>
                            </div>
                            
                            {appointment.notes && (
                              <div className="p-3 bg-primary/5 rounded-lg">
                                <p className="font-inter text-sm text-muted-foreground">
                                  <FileText className="w-4 h-4 inline mr-2" />
                                  {appointment.notes}
                                </p>
                              </div>
                            )}
                            
                            {appointment.status !== "cancelled" && (
                              <div className="flex gap-3 pt-4 border-t border-border">
                                <Button
                                  onClick={() => cancelMutation.mutate(appointment.id)}
                                  disabled={cancelMutation.isPending}
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                                  data-testid={`button-cancel-${appointment.id}`}
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Annuler
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="card-modern p-12 text-center">
                      <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="font-raleway font-bold text-xl text-foreground mb-2">Aucun rendez-vous à venir</h3>
                      <p className="font-inter text-muted-foreground mb-6">
                        Vous n'avez pas de rendez-vous programmé pour le moment.
                      </p>
                      <Link href="/rendez-vous">
                        <Button className="btn-primary px-6 py-3 font-raleway font-bold" data-testid="button-book-first-appointment">
                          Prendre un rendez-vous
                        </Button>
                      </Link>
                    </Card>
                  )}
                </div>

                {/* Past Appointments */}
                {pastAppointments.length > 0 && (
                  <div>
                    <h2 className="font-raleway font-bold text-3xl text-foreground mb-8 flex items-center tracking-tight">
                      <FileText className="w-8 h-8 text-primary mr-3" />
                      Historique
                    </h2>
                    
                    <div className="space-y-4">
                      {pastAppointments.slice(0, 5).map((appointment) => (
                        <Card key={appointment.id} className="card-modern opacity-75">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                  <h3 className="font-raleway font-bold text-lg text-foreground">
                                    {getTypeLabel(appointment.type)}
                                  </h3>
                                  {getStatusBadge(appointment.status)}
                                </div>
                                <p className="font-inter text-muted-foreground text-sm mb-3">{appointment.reason}</p>
                                <div className="flex items-center gap-6 text-sm">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 text-primary mr-2" />
                                    <span>{format(new Date(appointment.date), "d MMM yyyy", { locale: fr })}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 text-primary mr-2" />
                                    <span>{appointment.time}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Contact Info */}
                <Card className="card-modern">
                  <CardHeader>
                    <CardTitle className="font-raleway font-bold text-xl flex items-center">
                      <Phone className="w-5 h-5 text-primary mr-2" />
                      Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Phone className="w-4 h-4 text-primary mr-3 mt-1" />
                      <div>
                        <p className="font-raleway font-bold text-primary">01.42.85.67.90</p>
                        <p className="font-inter text-xs text-muted-foreground">Lun-Ven 8h-19h</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start">
                      <Mail className="w-4 h-4 text-primary mr-3 mt-1" />
                      <div>
                        <p className="font-raleway font-bold text-primary">contact@drmartinebeaumont.fr</p>
                        <p className="font-inter text-xs text-muted-foreground">Réponse sous 24h</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-primary mr-3 mt-1" />
                      <div>
                        <p className="font-raleway font-bold text-foreground">15 Bd Saint-Germain</p>
                        <p className="font-inter text-xs text-muted-foreground">75005 Paris</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="card-modern">
                  <CardHeader>
                    <CardTitle className="font-raleway font-bold text-xl">Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/rendez-vous">
                      <Button className="w-full btn-primary justify-start py-3" data-testid="link-new-appointment">
                        <Plus className="w-4 h-4 mr-3" />
                        Nouveau rendez-vous
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full justify-start py-3" data-testid="link-contact">
                        <Mail className="w-4 h-4 mr-3" />
                        Nous contacter
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}