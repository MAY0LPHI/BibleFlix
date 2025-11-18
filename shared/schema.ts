import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
  boolean,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Bible books reference data
export const bibleBooks = pgTable("bible_books", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  testament: varchar("testament", { length: 10 }).notNull(), // "old" or "new"
  order: integer("order").notNull(),
  chapters: integer("chapters").notNull(),
  abbreviation: varchar("abbreviation", { length: 10 }).notNull(),
});

export type BibleBook = typeof bibleBooks.$inferSelect;

// Bible verses
export const bibleVerses = pgTable("bible_verses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookId: varchar("book_id").notNull().references(() => bibleBooks.id),
  chapter: integer("chapter").notNull(),
  verse: integer("verse").notNull(),
  version: varchar("version", { length: 10 }).notNull().default('NVI'), // NVI, ARA, KJV
  text: text("text").notNull(),
});

export type BibleVerse = typeof bibleVerses.$inferSelect;

// User notes on verses
export const notes = pgTable("notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  bookId: varchar("book_id").notNull().references(() => bibleBooks.id),
  chapter: integer("chapter").notNull(),
  verse: integer("verse").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertNoteSchema = createInsertSchema(notes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertNote = z.infer<typeof insertNoteSchema>;
export type Note = typeof notes.$inferSelect;

// User highlights on verses
export const highlights = pgTable("highlights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  bookId: varchar("book_id").notNull().references(() => bibleBooks.id),
  chapter: integer("chapter").notNull(),
  verse: integer("verse").notNull(),
  color: varchar("color", { length: 20 }).notNull().default('yellow'), // yellow, green, blue, pink
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHighlightSchema = createInsertSchema(highlights).omit({
  id: true,
  createdAt: true,
});

export type InsertHighlight = z.infer<typeof insertHighlightSchema>;
export type Highlight = typeof highlights.$inferSelect;

// Devotionals
export const devotionals = pgTable("devotionals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  date: date("date").notNull(),
  verseReference: text("verse_reference"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Devotional = typeof devotionals.$inferSelect;

// User devotional reading history
export const devotionalReadings = pgTable("devotional_readings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  devotionalId: varchar("devotional_id").notNull().references(() => devotionals.id, { onDelete: 'cascade' }),
  readAt: timestamp("read_at").defaultNow(),
});

export type DevotionalReading = typeof devotionalReadings.$inferSelect;

// Reading plans
export const readingPlans = pgTable("reading_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  duration: integer("duration").notNull(), // days
  type: varchar("type", { length: 20 }).notNull().default('annual'), // annual, thematic
});

export type ReadingPlan = typeof readingPlans.$inferSelect;

// Reading plan days
export const readingPlanDays = pgTable("reading_plan_days", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  planId: varchar("plan_id").notNull().references(() => readingPlans.id, { onDelete: 'cascade' }),
  day: integer("day").notNull(),
  bookId: varchar("book_id").notNull().references(() => bibleBooks.id),
  startChapter: integer("start_chapter").notNull(),
  endChapter: integer("end_chapter").notNull(),
});

export type ReadingPlanDay = typeof readingPlanDays.$inferSelect;

// User reading progress
export const readingProgress = pgTable("reading_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  planId: varchar("plan_id").notNull().references(() => readingPlans.id, { onDelete: 'cascade' }),
  day: integer("day").notNull(),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
});

export const insertReadingProgressSchema = createInsertSchema(readingProgress).omit({
  id: true,
});

export type InsertReadingProgress = z.infer<typeof insertReadingProgressSchema>;
export type ReadingProgress = typeof readingProgress.$inferSelect;

// Q&A items
export const qaItems = pgTable("qa_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export type QAItem = typeof qaItems.$inferSelect;

// Multimedia content
export const multimediaContent = pgTable("multimedia_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  type: varchar("type", { length: 20 }).notNull(), // video, podcast, music
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  duration: integer("duration"), // in seconds
  category: varchar("category", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export type MultimediaContent = typeof multimediaContent.$inferSelect;

// User favorites
export const favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  itemType: varchar("item_type", { length: 20 }).notNull(), // verse, devotional, multimedia
  itemId: varchar("item_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
  createdAt: true,
});

export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Favorite = typeof favorites.$inferSelect;

// Quiz questions
export const quizQuestions = pgTable("quiz_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  options: text("options").array().notNull(),
  correctAnswer: integer("correct_answer").notNull(), // index of correct option
  category: varchar("category", { length: 50 }),
  difficulty: varchar("difficulty", { length: 20 }).default('medium'),
});

export type QuizQuestion = typeof quizQuestions.$inferSelect;

// Quiz attempts
export const quizAttempts = pgTable("quiz_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const insertQuizAttemptSchema = createInsertSchema(quizAttempts).omit({
  id: true,
  completedAt: true,
});

export type InsertQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;
export type QuizAttempt = typeof quizAttempts.$inferSelect;

// Flashcards
export const flashcards = pgTable("flashcards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookId: varchar("book_id").notNull().references(() => bibleBooks.id),
  chapter: integer("chapter").notNull(),
  verse: integer("verse").notNull(),
  verseText: text("verse_text").notNull(),
  category: varchar("category", { length: 50 }),
});

export type Flashcard = typeof flashcards.$inferSelect;

// User flashcard progress
export const flashcardProgress = pgTable("flashcard_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  flashcardId: varchar("flashcard_id").notNull().references(() => flashcards.id, { onDelete: 'cascade' }),
  learned: boolean("learned").notNull().default(false),
  lastReviewed: timestamp("last_reviewed").defaultNow(),
});

export const insertFlashcardProgressSchema = createInsertSchema(flashcardProgress).omit({
  id: true,
  lastReviewed: true,
});

export type InsertFlashcardProgress = z.infer<typeof insertFlashcardProgressSchema>;
export type FlashcardProgress = typeof flashcardProgress.$inferSelect;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  notes: many(notes),
  highlights: many(highlights),
  devotionalReadings: many(devotionalReadings),
  readingProgress: many(readingProgress),
  favorites: many(favorites),
  quizAttempts: many(quizAttempts),
  flashcardProgress: many(flashcardProgress),
}));

export const bibleBooksRelations = relations(bibleBooks, ({ many }) => ({
  verses: many(bibleVerses),
  notes: many(notes),
  highlights: many(highlights),
  flashcards: many(flashcards),
}));

export const devotionalsRelations = relations(devotionals, ({ many }) => ({
  readings: many(devotionalReadings),
}));

export const readingPlansRelations = relations(readingPlans, ({ many }) => ({
  days: many(readingPlanDays),
  userProgress: many(readingProgress),
}));
