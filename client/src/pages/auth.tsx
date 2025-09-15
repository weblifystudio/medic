import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { Eye, EyeOff, UserPlus, LogIn, Mail, Lock, User } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

// Schémas de validation
const registerSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"), 
  email: z.string().email("Adresse email invalide"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre"),
});

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

type RegisterFormData = z.infer<typeof registerSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { registerMutation, loginMutation } = useAuth();
  const { toast } = useToast();

  // Formulaire de connexion
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Formulaire d'inscription
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre espace patient !",
      });
    } catch (error) {
      // Les erreurs sont déjà gérées par le hook useAuth
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync(data);
      toast({
        title: "Compte créé avec succès",
        description: "Vous êtes maintenant connecté à votre espace patient !",
      });
    } catch (error) {
      // Les erreurs sont déjà gérées par le hook useAuth
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient py-24 lg:py-36">
          <div className="container-modern text-center">
            <h1 className="font-raleway font-bold text-5xl lg:text-6xl xl:text-7xl text-foreground mb-8 tracking-tight">
              Votre Espace <span className="text-gradient">Patient</span>
            </h1>
            <p className="font-inter text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              Connectez-vous à votre compte pour gérer vos rendez-vous et accéder à vos informations médicales.
            </p>
          </div>
        </section>

        {/* Formulaires d'authentification */}
        <section className="py-24">
          <div className="container-modern">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                
                {/* Connexion */}
                <div className={`transition-all duration-500 ${isLogin ? 'lg:order-1' : 'lg:order-2'}`}>
                  <Card className={`card-modern ${isLogin ? 'ring-2 ring-primary/20' : ''}`}>
                    <CardHeader className="text-center pb-8">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <LogIn className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="font-raleway text-3xl font-bold text-foreground tracking-tight">
                        Connexion
                      </CardTitle>
                      <CardDescription className="font-inter text-lg text-muted-foreground">
                        Accédez à votre espace patient
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                          <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-inter font-medium text-foreground">Email</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                      {...field}
                                      type="email"
                                      placeholder="votre@email.fr"
                                      className="pl-10 input-modern"
                                      disabled={loginMutation.isPending}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-inter font-medium text-foreground">Mot de passe</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                      {...field}
                                      type={showPassword ? "text" : "password"}
                                      placeholder="••••••••"
                                      className="pl-10 pr-10 input-modern"
                                      disabled={loginMutation.isPending}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setShowPassword(!showPassword)}
                                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            className="btn-primary w-full py-4 text-lg font-raleway font-bold"
                            disabled={loginMutation.isPending}
                          >
                            {loginMutation.isPending ? "Connexion..." : "Se connecter"}
                          </Button>
                        </form>
                      </Form>

                      <div className="text-center pt-4">
                        <p className="font-inter text-muted-foreground">
                          Pas encore de compte ?{" "}
                          <button
                            onClick={() => setIsLogin(false)}
                            className="text-primary font-medium hover:text-primary/80 transition-colors"
                          >
                            Créer un compte
                          </button>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Inscription */}
                <div className={`transition-all duration-500 ${!isLogin ? 'lg:order-1' : 'lg:order-2'}`}>
                  <Card className={`card-modern ${!isLogin ? 'ring-2 ring-primary/20' : ''}`}>
                    <CardHeader className="text-center pb-8">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                        <UserPlus className="w-8 h-8 text-secondary" />
                      </div>
                      <CardTitle className="font-raleway text-3xl font-bold text-foreground tracking-tight">
                        Inscription
                      </CardTitle>
                      <CardDescription className="font-inter text-lg text-muted-foreground">
                        Créez votre compte patient
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <Form {...registerForm}>
                        <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={registerForm.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-inter font-medium text-foreground">Prénom</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                      <Input
                                        {...field}
                                        placeholder="Prénom"
                                        className="pl-10 input-modern"
                                        disabled={registerMutation.isPending}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={registerForm.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-inter font-medium text-foreground">Nom</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                      <Input
                                        {...field}
                                        placeholder="Nom"
                                        className="pl-10 input-modern"
                                        disabled={registerMutation.isPending}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={registerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-inter font-medium text-foreground">Email</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                      {...field}
                                      type="email"
                                      placeholder="votre@email.fr"
                                      className="pl-10 input-modern"
                                      disabled={registerMutation.isPending}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-inter font-medium text-foreground">Mot de passe</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                      {...field}
                                      type={showPassword ? "text" : "password"}
                                      placeholder="••••••••"
                                      className="pl-10 pr-10 input-modern"
                                      disabled={registerMutation.isPending}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setShowPassword(!showPassword)}
                                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                                <p className="text-sm text-muted-foreground mt-2">
                                  Minimum 8 caractères avec une majuscule, une minuscule et un chiffre
                                </p>
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            className="btn-secondary w-full py-4 text-lg font-raleway font-bold"
                            disabled={registerMutation.isPending}
                          >
                            {registerMutation.isPending ? "Création..." : "Créer mon compte"}
                          </Button>
                        </form>
                      </Form>

                      <div className="text-center pt-4">
                        <p className="font-inter text-muted-foreground">
                          Déjà un compte ?{" "}
                          <button
                            onClick={() => setIsLogin(true)}
                            className="text-primary font-medium hover:text-primary/80 transition-colors"
                          >
                            Se connecter
                          </button>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Informations importantes */}
              <div className="max-w-4xl mx-auto mt-16">
                <Card className="glass-card p-8">
                  <div className="text-center">
                    <h3 className="font-raleway font-bold text-2xl text-foreground mb-4">
                      Sécurité et confidentialité
                    </h3>
                    <p className="font-inter text-muted-foreground leading-relaxed mb-6">
                      Vos données personnelles et médicales sont protégées par notre politique de confidentialité 
                      conforme au RGPD. Votre mot de passe est chiffré et sécurisé.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/rgpd">
                        <Button variant="outline" className="btn-glass">
                          Politique de confidentialité
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button variant="outline" className="btn-glass">
                          Nous contacter
                        </Button>
                      </Link>
                    </div>
                  </div>
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