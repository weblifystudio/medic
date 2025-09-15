import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Hook pour faire défiler automatiquement vers le haut à chaque changement de page
 */
export function useScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll vers le haut à chaque changement de location
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location]);
}

/**
 * Fonction utilitaire pour forcer le scroll vers le haut
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}