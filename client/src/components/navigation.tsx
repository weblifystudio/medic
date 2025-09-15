import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Heart, Calendar, User, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="nav-professional sticky top-0 z-50 border-none">
      <nav className="container-modern py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-4 group">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-professional group-hover:scale-110 transition-all duration-slow ease-out-expo group-hover:shadow-xl">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="font-raleway font-bold text-xl text-foreground tracking-tight">Dr. Martine Beaumont</h1>
            <p className="font-inter text-sm text-muted-foreground font-medium">Médecin Généraliste</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {[
            { href: '/', label: 'Accueil', testId: 'nav-accueil' },
            { href: '/services', label: 'Services', testId: 'nav-services' },
            { href: '/a-propos', label: 'À propos', testId: 'nav-apropos' },
            { href: '/contact', label: 'Contact', testId: 'nav-contact' }
          ].map(({ href, label, testId }) => (
            <Link 
              key={href}
              href={href} 
              className={`font-inter font-medium px-4 py-2 rounded-lg transition-all duration-fast ease-out-expo ${
                location === href 
                  ? 'text-primary bg-primary/5 shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              data-testid={testId}
            >
              {label}
            </Link>
          ))}
          <Link 
            href="/rendez-vous"
            className="btn-primary ml-4 shadow-lg hover:shadow-xl inline-flex items-center"
            data-testid="nav-booking"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Rendez-vous
          </Link>
          
          {/* Authentication */}
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse ml-4"></div>
          ) : isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-4 p-2 rounded-full" data-testid="user-menu">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={(user as any)?.profileImageUrl || undefined} alt="Profile" className="object-cover" />
                    <AvatarFallback className="bg-primary/10">
                      <User className="w-4 h-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2 border-b border-border">
                  <p className="font-raleway font-bold text-sm text-foreground">
                    {(user as any)?.firstName} {(user as any)?.lastName}
                  </p>
                  <p className="font-inter text-xs text-muted-foreground truncate">
                    {(user as any)?.email}
                  </p>
                </div>
                <Link href="/mon-espace">
                  <DropdownMenuItem className="cursor-pointer" data-testid="menu-dashboard">
                    <User className="w-4 h-4 mr-3" />
                    Mon espace patient
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem 
                  className="cursor-pointer text-red-600 hover:text-red-700" 
                  onClick={logout}
                  data-testid="menu-logout"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button 
                className="btn-glass ml-4 inline-flex items-center"
                data-testid="login-button"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Connexion
              </Button>
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-3 rounded-xl glass hover:bg-primary/10 transition-all duration-fast ease-out-expo"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="mobile-menu-toggle"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-primary" />
          ) : (
            <Menu className="w-5 h-5 text-primary" />
          )}
        </button>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 md:hidden z-40">
            <div className="glass-card mx-4 mt-2 mb-4">
              <div className="p-4 space-y-2">
                {[
                  { href: '/', label: 'Accueil', testId: 'mobile-nav-accueil' },
                  { href: '/services', label: 'Services', testId: 'mobile-nav-services' },
                  { href: '/a-propos', label: 'À propos', testId: 'mobile-nav-apropos' },
                  { href: '/contact', label: 'Contact', testId: 'mobile-nav-contact' }
                ].map(({ href, label, testId }) => (
                  <Link 
                    key={href}
                    href={href} 
                    onClick={closeMobileMenu}
                    className={`block w-full text-left font-inter font-medium py-3 px-4 rounded-lg transition-all duration-fast ease-out-expo ${
                      location === href 
                        ? 'text-primary bg-primary/10' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    data-testid={testId}
                  >
                    {label}
                  </Link>
                ))}
                <Link 
                  href="/rendez-vous"
                  onClick={closeMobileMenu}
                  className="btn-primary w-full mt-4 justify-center inline-flex items-center"
                  data-testid="mobile-nav-booking"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Rendez-vous
                </Link>
                
                {/* Mobile Auth */}
                {isAuthenticated ? (
                  <div className="pt-4 border-t border-border mt-4 space-y-2">
                    <div className="px-4 py-2">
                      <p className="font-raleway font-bold text-sm text-foreground">
                        {(user as any)?.firstName} {(user as any)?.lastName}
                      </p>
                      <p className="font-inter text-xs text-muted-foreground truncate">
                        {(user as any)?.email}
                      </p>
                    </div>
                    <Link 
                      href="/mon-espace"
                      onClick={closeMobileMenu}
                      className="block w-full text-left font-inter font-medium py-3 px-4 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      data-testid="mobile-nav-dashboard"
                    >
                      <User className="w-4 h-4 mr-3 inline" />
                      Mon espace patient
                    </Link>
                    <button 
                      onClick={() => {
                        closeMobileMenu();
                        logout();
                      }}
                      className="block w-full text-left font-inter font-medium py-3 px-4 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                      data-testid="mobile-nav-logout"
                    >
                      <LogOut className="w-4 h-4 mr-3 inline" />
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/auth"
                    onClick={closeMobileMenu}
                    className="btn-glass w-full mt-4 justify-center inline-flex items-center"
                    data-testid="mobile-login-button"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Connexion
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
