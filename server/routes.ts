import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import rateLimit from "express-rate-limit";
import { 
  hashPassword, 
  verifyPassword, 
  generateToken, 
  authenticateToken, 
  optionalAuthentication,
  createUserResponse
} from "./auth";
import { 
  insertContactMessageSchema, 
  insertAppointmentSchema,
  registerSchema,
  loginSchema,
  type RegisterData,
  type LoginData 
} from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express): Server {
  // Configuration des limiteurs de débit
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 tentatives par IP
    message: {
      success: false,
      message: 'Trop de tentatives. Réessayez dans 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Route d'inscription avec auto-connexion
  app.post('/api/register', authLimiter, async (req, res) => {
    try {
      const validatedData: RegisterData = registerSchema.parse(req.body);
      
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Un compte existe déjà avec cette adresse email'
        });
      }

      // Hasher le mot de passe
      const hashedPassword = await hashPassword(validatedData.password);
      
      // Créer l'utilisateur
      const newUser = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
        isEmailVerified: false
      });

      // Créer la réponse sécurisée (sans mot de passe)
      const userResponse = createUserResponse(newUser);
      
      // Générer le token JWT - AUTO-CONNEXION
      const token = generateToken(userResponse);

      res.status(201).json({
        success: true,
        message: 'Compte créé avec succès',
        user: userResponse,
        token
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: 'Données invalides',
          errors: error.errors
        });
      } else {
        console.error('Erreur lors de l\'inscription:', error);
        res.status(500).json({
          success: false,
          message: 'Erreur serveur lors de l\'inscription'
        });
      }
    }
  });

  // Route de connexion
  app.post('/api/login', authLimiter, async (req, res) => {
    try {
      const validatedData: LoginData = loginSchema.parse(req.body);
      
      // Rechercher l'utilisateur
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Email ou mot de passe incorrect'
        });
      }

      // Vérifier le mot de passe
      const isValidPassword = await verifyPassword(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Email ou mot de passe incorrect'
        });
      }

      // Créer la réponse sécurisée
      const userResponse = createUserResponse(user);
      
      // Générer le token JWT
      const token = generateToken(userResponse);

      res.json({
        success: true,
        message: 'Connexion réussie',
        user: userResponse,
        token
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: 'Données invalides',
          errors: error.errors
        });
      } else {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({
          success: false,
          message: 'Erreur serveur lors de la connexion'
        });
      }
    }
  });

  // Route pour récupérer l'utilisateur actuel
  app.get('/api/user', authenticateToken, async (req, res) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      const userResponse = createUserResponse(user);
      res.json({
        success: true,
        user: userResponse
      });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur serveur'
      });
    }
  });

  // Route de déconnexion (côté client, mais utile pour les logs)
  app.post('/api/logout', (req, res) => {
    res.json({
      success: true,
      message: 'Déconnexion réussie'
    });
  });
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, message: "Message envoyé avec succès" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Données invalides", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Erreur serveur lors de l'envoi du message" 
        });
      }
    }
  });

  // Booking appointment endpoint - can be used both authenticated and non-authenticated
  app.post("/api/bookings", optionalAuthentication, async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      
      // Check if slot is already taken
      const existingAppointments = await storage.getAppointmentsByDate(new Date(validatedData.date));
      const conflictingAppointment = existingAppointments.find(
        apt => apt.time === validatedData.time && apt.status !== "cancelled"
      );
      
      if (conflictingAppointment) {
        return res.status(409).json({ 
          success: false, 
          message: "Ce créneau horaire n'est plus disponible. Veuillez choisir un autre horaire." 
        });
      }

      // Add user ID if authenticated
      const appointmentData = {
        ...validatedData,
        userId: req.userId || null
      };

      const appointment = await storage.createAppointment(appointmentData);
      res.json({ 
        success: true, 
        message: "Rendez-vous enregistré avec succès", 
        appointment: {
          id: appointment.id,
          date: appointment.date,
          time: appointment.time,
          type: appointment.type
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Données invalides", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Erreur serveur lors de la prise de rendez-vous" 
        });
      }
    }
  });

  // Protected route - Get user's appointments
  app.get("/api/my-appointments", authenticateToken, async (req, res) => {
    try {
      const appointments = await storage.getUserAppointments(req.userId!);
      res.json({ 
        success: true, 
        appointments 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Erreur serveur lors de la récupération des rendez-vous" 
      });
    }
  });

  // Protected route - Cancel appointment
  app.put("/api/appointments/:id/cancel", authenticateToken, async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const userId = req.userId!;
      
      // Here we would update the appointment status to cancelled
      // For now, just return success
      res.json({ 
        success: true, 
        message: "Rendez-vous annulé avec succès" 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Erreur serveur lors de l'annulation" 
      });
    }
  });

  // Get available time slots for a specific date
  app.get("/api/available-slots/:date", async (req, res) => {
    try {
      const date = new Date(req.params.date);
      if (isNaN(date.getTime())) {
        return res.status(400).json({ 
          success: false, 
          message: "Date invalide" 
        });
      }

      const appointments = await storage.getAppointmentsByDate(date);
      const bookedSlots = appointments
        .filter(apt => apt.status !== "cancelled")
        .map(apt => apt.time);

      // Define available slots based on day of week
      const dayOfWeek = date.getDay();
      let allSlots: string[] = [];

      if (dayOfWeek === 0) { // Sunday - closed
        allSlots = [];
      } else if (dayOfWeek === 6) { // Saturday
        allSlots = [
          "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"
        ];
      } else { // Monday to Friday
        allSlots = [
          "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
          "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
        ];
      }

      const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

      res.json({ 
        success: true, 
        availableSlots,
        date: date.toISOString().split('T')[0]
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Erreur serveur lors de la récupération des créneaux" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
