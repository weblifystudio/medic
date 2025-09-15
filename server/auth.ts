import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserResponse } from '@shared/schema';

// Configuration des variables d'environnement 
const JWT_SECRET = process.env.JWT_SECRET || process.env.SESSION_SECRET;
if (!JWT_SECRET) {
  console.error('🚨 JWT_SECRET manquant ! L\'application ne peut pas démarrer sans clé secrète sécurisée.');
  console.error('Veuillez définir JWT_SECRET dans vos variables d\'environnement.');
  process.exit(1);
}
// Vérification que SESSION_SECRET existe (disponible dans Replit)
console.log('✅ JWT Secret configuré avec succès');
const JWT_EXPIRES_IN = '7d'; // 7 jours
const SALT_ROUNDS = 12;

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * Hashe un mot de passe avec bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    console.error('Erreur lors du hashage du mot de passe:', error);
    throw new Error('Erreur lors du traitement du mot de passe');
  }
}

/**
 * Vérifie un mot de passe contre son hash
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Erreur lors de la vérification du mot de passe:', error);
    return false;
  }
}

/**
 * Génère un token JWT pour un utilisateur
 */
export function generateToken(user: UserResponse): string {
  try {
    if (!user.id || !user.email) {
      throw new Error('Données utilisateur invalides pour la génération du token');
    }
    
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
    };

    return jwt.sign(payload, JWT_SECRET!, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'dr-beaumont-cabinet',
      audience: 'dr-beaumont-patients',
    });
  } catch (error) {
    console.error('Erreur lors de la génération du token:', error);
    throw new Error('Erreur lors de la génération du token');
  }
}

/**
 * Vérifie et décode un token JWT
 */
export function verifyToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET!, {
      issuer: 'dr-beaumont-cabinet',
      audience: 'dr-beaumont-patients',
    }) as jwt.JwtPayload;
    
    return {
      userId: decoded.userId as string,
      email: decoded.email as string,
      iat: decoded.iat,
      exp: decoded.exp,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expiré');
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Token invalide');
    } else {
      console.error('Erreur lors de la vérification du token:', error);
      throw new Error('Erreur d\'authentification');
    }
  }
}

/**
 * Middleware d'authentification JWT
 */
export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ 
      success: false,
      message: 'Token d\'authentification requis' 
    });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Token invalide';
    res.status(401).json({ 
      success: false,
      message: errorMessage 
    });
    return;
  }
}

/**
 * Middleware d'authentification optionnelle
 * N'interrompt pas la requête si pas de token, mais ajoute userId si token valide
 */
export function optionalAuthentication(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = verifyToken(token);
      req.userId = decoded.userId;
    } catch (error) {
      // Ignore les erreurs pour l'authentification optionnelle
    }
  }

  next();
}

/**
 * Extrait le token du cookie ou header Authorization
 */
export function extractToken(req: Request): string | null {
  // Priorité au header Authorization
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Fallback sur les cookies si nécessaire (pour les requêtes depuis le navigateur)
  const cookieToken = req.cookies?.authToken;
  if (cookieToken) {
    return cookieToken;
  }

  return null;
}

/**
 * Utilitaire pour créer une réponse utilisateur sécurisée (sans mot de passe)
 */
export function createUserResponse(user: any): UserResponse {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImageUrl: user.profileImageUrl,
    isEmailVerified: user.isEmailVerified || false,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}