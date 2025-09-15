import { createContext, ReactNode, useContext, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { 
  type UserResponse, 
  type RegisterData, 
  type LoginData,
  registerSchema,
  loginSchema
} from "@shared/schema";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AuthResponse {
  success: boolean;
  message: string;
  user: UserResponse;
  token: string;
}

interface AuthContextType {
  user: UserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  registerMutation: UseMutationResult<AuthResponse, Error, RegisterData>;
  loginMutation: UseMutationResult<AuthResponse, Error, LoginData>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// Utilitaires pour gérer le token JWT
export const authUtils = {
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },
  
  setToken: (token: string): void => {
    localStorage.setItem('authToken', token);
  },
  
  removeToken: (): void => {
    localStorage.removeItem('authToken');
  },
  
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Requête pour récupérer l'utilisateur actuel
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<UserResponse | null>({
    queryKey: ["/api/user"],
    enabled: !!authUtils.getToken(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Vérifier l'expiration du token au chargement
  useEffect(() => {
    const token = authUtils.getToken();
    if (token && authUtils.isTokenExpired(token)) {
      authUtils.removeToken();
      queryClient.clear();
      toast({
        title: "Session expirée",
        description: "Veuillez vous reconnecter",
        variant: "default",
      });
    }
  }, [queryClient, toast]);

  // Mutation d'inscription avec auto-connexion
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData): Promise<AuthResponse> => {
      // Validation côté client
      const validatedData = registerSchema.parse(data);
      
      const res = await apiRequest("POST", "/api/register", validatedData);
      const result = await res.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      return result;
    },
    onSuccess: (data: AuthResponse) => {
      // Stocker le token et mettre à jour le cache
      authUtils.setToken(data.token);
      queryClient.setQueryData(["/api/user"], data.user);
      
      toast({
        title: "Compte créé avec succès !",
        description: `Bienvenue ${data.user.firstName} !`,
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation de connexion
  const loginMutation = useMutation({
    mutationFn: async (data: LoginData): Promise<AuthResponse> => {
      // Validation côté client
      const validatedData = loginSchema.parse(data);
      
      const res = await apiRequest("POST", "/api/login", validatedData);
      const result = await res.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      return result;
    },
    onSuccess: (data: AuthResponse) => {
      // Stocker le token et mettre à jour le cache
      authUtils.setToken(data.token);
      queryClient.setQueryData(["/api/user"], data.user);
      
      toast({
        title: "Connexion réussie !",
        description: `Bon retour ${data.user.firstName} !`,
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Fonction de déconnexion
  const logout = () => {
    authUtils.removeToken();
    queryClient.clear();
    
    // Appel optionnel au serveur pour logout (logs)
    apiRequest("POST", "/api/logout").catch(() => {
      // Ignorer les erreurs de logout côté serveur
    });
    
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
      variant: "default",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        isAuthenticated: !!user,
        registerMutation,
        loginMutation,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
}