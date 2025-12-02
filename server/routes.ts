import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReservationSchema, insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";

function generateBookingId(date: string): string {
  const dateStr = date.replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `R-${dateStr}-${random}`;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/reservations", async (req, res) => {
    try {
      const result = insertReservationSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({
          status: "error",
          message: "Données invalides",
          errors: result.error.flatten().fieldErrors,
        });
      }

      const reservation = await storage.createReservation(result.data);
      const bookingId = generateBookingId(result.data.date);

      res.status(201).json({
        status: "ok",
        message: "Demande reçue",
        bookingId,
        reservation: {
          id: reservation.id,
          name: reservation.name,
          date: reservation.date,
          time: reservation.time,
          partySize: reservation.partySize,
        },
      });
    } catch (error) {
      console.error("Error creating reservation:", error);
      res.status(500).json({
        status: "error",
        message: "Une erreur est survenue",
      });
    }
  });

  app.get("/api/reservations", async (req, res) => {
    try {
      const reservations = await storage.getReservations();
      res.json(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({
        status: "error",
        message: "Une erreur est survenue",
      });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({
          status: "error",
          message: "Données invalides",
          errors: result.error.flatten().fieldErrors,
        });
      }

      const contact = await storage.createContact(result.data);

      res.status(201).json({
        status: "ok",
        message: "Message reçu",
        contactId: contact.id,
      });
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(500).json({
        status: "error",
        message: "Une erreur est survenue",
      });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({
        status: "error",
        message: "Une erreur est survenue",
      });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const result = insertNewsletterSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({
          status: "error",
          message: "Adresse email invalide",
          errors: result.error.flatten().fieldErrors,
        });
      }

      const isAlreadySubscribed = await storage.isEmailSubscribed(result.data.email);
      
      if (isAlreadySubscribed) {
        return res.status(200).json({
          status: "ok",
          message: "Vous êtes déjà inscrit",
        });
      }

      await storage.createNewsletterSubscription(result.data);

      res.status(201).json({
        status: "ok",
        message: "Inscription confirmée",
      });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({
        status: "error",
        message: "Une erreur est survenue",
      });
    }
  });

  app.get("/api/newsletter", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      console.error("Error fetching newsletter subscriptions:", error);
      res.status(500).json({
        status: "error",
        message: "Une erreur est survenue",
      });
    }
  });

  return httpServer;
}
