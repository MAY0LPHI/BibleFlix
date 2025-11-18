import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import {
  insertNoteSchema,
  insertHighlightSchema,
  insertFavoriteSchema,
  insertReadingProgressSchema,
  insertQuizAttemptSchema,
  insertFlashcardProgressSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Notes routes
  app.get("/api/notes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const notes = await storage.getUserNotes(userId);
      res.json(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      res.status(500).json({ message: "Failed to fetch notes" });
    }
  });

  app.post("/api/notes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const noteData = insertNoteSchema.parse({ ...req.body, userId });
      const note = await storage.createNote(noteData);
      res.status(201).json(note);
    } catch (error) {
      console.error("Error creating note:", error);
      res.status(400).json({ message: "Failed to create note" });
    }
  });

  app.delete("/api/notes/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.deleteNote(req.params.id, userId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).json({ message: "Failed to delete note" });
    }
  });

  // Highlights routes
  app.get("/api/highlights", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const highlights = await storage.getUserHighlights(userId);
      res.json(highlights);
    } catch (error) {
      console.error("Error fetching highlights:", error);
      res.status(500).json({ message: "Failed to fetch highlights" });
    }
  });

  app.post("/api/highlights", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const highlightData = insertHighlightSchema.parse({ ...req.body, userId });
      const highlight = await storage.createHighlight(highlightData);
      res.status(201).json(highlight);
    } catch (error) {
      console.error("Error creating highlight:", error);
      res.status(400).json({ message: "Failed to create highlight" });
    }
  });

  app.delete("/api/highlights/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.deleteHighlight(req.params.id, userId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting highlight:", error);
      res.status(500).json({ message: "Failed to delete highlight" });
    }
  });

  // Favorites routes
  app.get("/api/favorites", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const favorites = await storage.getUserFavorites(userId);
      res.json(favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  app.post("/api/favorites", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const favoriteData = insertFavoriteSchema.parse({ ...req.body, userId });
      const favorite = await storage.createFavorite(favoriteData);
      res.status(201).json(favorite);
    } catch (error) {
      console.error("Error creating favorite:", error);
      res.status(400).json({ message: "Failed to create favorite" });
    }
  });

  app.delete("/api/favorites/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.deleteFavorite(req.params.id, userId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting favorite:", error);
      res.status(500).json({ message: "Failed to delete favorite" });
    }
  });

  // Reading progress routes
  app.get("/api/reading-progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const planId = req.query.planId as string | undefined;
      const progress = await storage.getUserReadingProgress(userId, planId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching reading progress:", error);
      res.status(500).json({ message: "Failed to fetch reading progress" });
    }
  });

  app.post("/api/reading-progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progressData = insertReadingProgressSchema.parse({ ...req.body, userId });
      const progress = await storage.upsertReadingProgress(progressData);
      res.status(200).json(progress);
    } catch (error) {
      console.error("Error updating reading progress:", error);
      res.status(400).json({ message: "Failed to update reading progress" });
    }
  });

  // Quiz attempts routes
  app.get("/api/quiz-attempts", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const attempts = await storage.getUserQuizAttempts(userId);
      res.json(attempts);
    } catch (error) {
      console.error("Error fetching quiz attempts:", error);
      res.status(500).json({ message: "Failed to fetch quiz attempts" });
    }
  });

  app.post("/api/quiz-attempts", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const attemptData = insertQuizAttemptSchema.parse({ ...req.body, userId });
      const attempt = await storage.createQuizAttempt(attemptData);
      res.status(201).json(attempt);
    } catch (error) {
      console.error("Error creating quiz attempt:", error);
      res.status(400).json({ message: "Failed to create quiz attempt" });
    }
  });

  // Flashcard progress routes
  app.get("/api/flashcard-progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getUserFlashcardProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching flashcard progress:", error);
      res.status(500).json({ message: "Failed to fetch flashcard progress" });
    }
  });

  app.post("/api/flashcard-progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progressData = insertFlashcardProgressSchema.parse({ ...req.body, userId });
      const progress = await storage.upsertFlashcardProgress(progressData);
      res.status(200).json(progress);
    } catch (error) {
      console.error("Error updating flashcard progress:", error);
      res.status(400).json({ message: "Failed to update flashcard progress" });
    }
  });

  // Devotional readings routes
  app.get("/api/devotional-readings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const readings = await storage.getUserDevotionalReadings(userId);
      res.json(readings);
    } catch (error) {
      console.error("Error fetching devotional readings:", error);
      res.status(500).json({ message: "Failed to fetch devotional readings" });
    }
  });

  app.post("/api/devotional-readings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { devotionalId } = req.body;
      if (!devotionalId) {
        return res.status(400).json({ message: "devotionalId is required" });
      }
      await storage.markDevotionalAsRead(userId, devotionalId);
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error marking devotional as read:", error);
      res.status(500).json({ message: "Failed to mark devotional as read" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
