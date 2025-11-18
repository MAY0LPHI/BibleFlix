import {
  users,
  notes,
  highlights,
  favorites,
  readingProgress,
  quizAttempts,
  flashcardProgress,
  devotionalReadings,
  type User,
  type UpsertUser,
  type Note,
  type InsertNote,
  type Highlight,
  type InsertHighlight,
  type Favorite,
  type InsertFavorite,
  type ReadingProgress,
  type InsertReadingProgress,
  type QuizAttempt,
  type InsertQuizAttempt,
  type FlashcardProgress,
  type InsertFlashcardProgress,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Notes operations
  getUserNotes(userId: string): Promise<Note[]>;
  createNote(note: InsertNote): Promise<Note>;
  deleteNote(id: string, userId: string): Promise<void>;

  // Highlights operations
  getUserHighlights(userId: string): Promise<Highlight[]>;
  createHighlight(highlight: InsertHighlight): Promise<Highlight>;
  deleteHighlight(id: string, userId: string): Promise<void>;

  // Favorites operations
  getUserFavorites(userId: string): Promise<Favorite[]>;
  createFavorite(favorite: InsertFavorite): Promise<Favorite>;
  deleteFavorite(id: string, userId: string): Promise<void>;

  // Reading progress operations
  getUserReadingProgress(userId: string, planId?: string): Promise<ReadingProgress[]>;
  upsertReadingProgress(progress: InsertReadingProgress): Promise<ReadingProgress>;

  // Quiz attempts operations
  getUserQuizAttempts(userId: string): Promise<QuizAttempt[]>;
  createQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt>;

  // Flashcard progress operations
  getUserFlashcardProgress(userId: string): Promise<FlashcardProgress[]>;
  upsertFlashcardProgress(progress: InsertFlashcardProgress): Promise<FlashcardProgress>;

  // Devotional readings operations
  getUserDevotionalReadings(userId: string): Promise<any[]>;
  markDevotionalAsRead(userId: string, devotionalId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Notes operations
  async getUserNotes(userId: string): Promise<Note[]> {
    return await db
      .select()
      .from(notes)
      .where(eq(notes.userId, userId))
      .orderBy(desc(notes.createdAt));
  }

  async createNote(note: InsertNote): Promise<Note> {
    const [newNote] = await db.insert(notes).values(note).returning();
    return newNote;
  }

  async deleteNote(id: string, userId: string): Promise<void> {
    await db
      .delete(notes)
      .where(and(eq(notes.id, id), eq(notes.userId, userId)));
  }

  // Highlights operations
  async getUserHighlights(userId: string): Promise<Highlight[]> {
    return await db
      .select()
      .from(highlights)
      .where(eq(highlights.userId, userId))
      .orderBy(desc(highlights.createdAt));
  }

  async createHighlight(highlight: InsertHighlight): Promise<Highlight> {
    const [newHighlight] = await db
      .insert(highlights)
      .values(highlight)
      .returning();
    return newHighlight;
  }

  async deleteHighlight(id: string, userId: string): Promise<void> {
    await db
      .delete(highlights)
      .where(and(eq(highlights.id, id), eq(highlights.userId, userId)));
  }

  // Favorites operations
  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return await db
      .select()
      .from(favorites)
      .where(eq(favorites.userId, userId))
      .orderBy(desc(favorites.createdAt));
  }

  async createFavorite(favorite: InsertFavorite): Promise<Favorite> {
    const [newFavorite] = await db
      .insert(favorites)
      .values(favorite)
      .returning();
    return newFavorite;
  }

  async deleteFavorite(id: string, userId: string): Promise<void> {
    await db
      .delete(favorites)
      .where(and(eq(favorites.id, id), eq(favorites.userId, userId)));
  }

  // Reading progress operations
  async getUserReadingProgress(
    userId: string,
    planId?: string
  ): Promise<ReadingProgress[]> {
    const query = db
      .select()
      .from(readingProgress)
      .where(eq(readingProgress.userId, userId));

    if (planId) {
      return await query.where(
        and(
          eq(readingProgress.userId, userId),
          eq(readingProgress.planId, planId)
        )
      );
    }

    return await query;
  }

  async upsertReadingProgress(
    progress: InsertReadingProgress
  ): Promise<ReadingProgress> {
    const existing = await db
      .select()
      .from(readingProgress)
      .where(
        and(
          eq(readingProgress.userId, progress.userId),
          eq(readingProgress.planId, progress.planId),
          eq(readingProgress.day, progress.day)
        )
      );

    if (existing.length > 0) {
      const [updated] = await db
        .update(readingProgress)
        .set({
          completed: progress.completed,
          completedAt: progress.completed ? new Date() : null,
        })
        .where(eq(readingProgress.id, existing[0].id))
        .returning();
      return updated;
    }

    const [newProgress] = await db
      .insert(readingProgress)
      .values({
        ...progress,
        completedAt: progress.completed ? new Date() : null,
      })
      .returning();
    return newProgress;
  }

  // Quiz attempts operations
  async getUserQuizAttempts(userId: string): Promise<QuizAttempt[]> {
    return await db
      .select()
      .from(quizAttempts)
      .where(eq(quizAttempts.userId, userId))
      .orderBy(desc(quizAttempts.completedAt));
  }

  async createQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const [newAttempt] = await db
      .insert(quizAttempts)
      .values(attempt)
      .returning();
    return newAttempt;
  }

  // Flashcard progress operations
  async getUserFlashcardProgress(userId: string): Promise<FlashcardProgress[]> {
    return await db
      .select()
      .from(flashcardProgress)
      .where(eq(flashcardProgress.userId, userId));
  }

  async upsertFlashcardProgress(
    progress: InsertFlashcardProgress
  ): Promise<FlashcardProgress> {
    const existing = await db
      .select()
      .from(flashcardProgress)
      .where(
        and(
          eq(flashcardProgress.userId, progress.userId),
          eq(flashcardProgress.flashcardId, progress.flashcardId)
        )
      );

    if (existing.length > 0) {
      const [updated] = await db
        .update(flashcardProgress)
        .set({
          learned: progress.learned,
          lastReviewed: new Date(),
        })
        .where(eq(flashcardProgress.id, existing[0].id))
        .returning();
      return updated;
    }

    const [newProgress] = await db
      .insert(flashcardProgress)
      .values(progress)
      .returning();
    return newProgress;
  }

  // Devotional readings operations
  async getUserDevotionalReadings(userId: string): Promise<any[]> {
    return await db
      .select()
      .from(devotionalReadings)
      .where(eq(devotionalReadings.userId, userId))
      .orderBy(desc(devotionalReadings.readAt));
  }

  async markDevotionalAsRead(
    userId: string,
    devotionalId: string
  ): Promise<void> {
    await db.insert(devotionalReadings).values({
      userId,
      devotionalId,
    });
  }
}

export const storage = new DatabaseStorage();
