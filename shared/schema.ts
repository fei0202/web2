import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleEn: text("title_en").notNull(),
  content: text("content").notNull(),
  contentEn: text("content_en").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleEn: text("title_en").notNull(),
  type: text("type").notNull(), // 'photo' or 'video'
  category: text("category").notNull(), // 'robot', 'sponsor', 'product', 'awards', 'general'
  url: text("url").notNull(),
  description: text("description"),
  descriptionEn: text("description_en"),
  isVisible: boolean("is_visible").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const robots = pgTable("robots", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  description: text("description").notNull(),
  descriptionEn: text("description_en").notNull(),
  imageUrl: text("image_url"),
  specifications: text("specifications"), // JSON string
  specificationsEn: text("specifications_en"), // JSON string
  createdAt: timestamp("created_at").defaultNow(),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  positionEn: text("position_en").notNull(),
  category: text("category").notNull(), // 'student', 'mentor', 'advisor'
  imageUrl: text("image_url"),
  bio: text("bio"),
  bioEn: text("bio_en"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const awards = pgTable("awards", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleEn: text("title_en").notNull(),
  year: integer("year").notNull(),
  competition: text("competition").notNull(),
  competitionEn: text("competition_en").notNull(),
  category: text("category").notNull(), // 'championship', 'technical', 'sportsmanship', etc.
  iconType: text("icon_type").notNull(), // 'trophy', 'medal', 'certificate', 'star'
  description: text("description"),
  descriptionEn: text("description_en"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export const insertNewsSchema = createInsertSchema(news).pick({
  title: true,
  titleEn: true,
  content: true,
  contentEn: true,
  imageUrl: true,
});

export const insertMediaSchema = createInsertSchema(media).pick({
  title: true,
  titleEn: true,
  type: true,
  category: true,
  url: true,
  description: true,
  descriptionEn: true,
  isVisible: true,
});

export const insertRobotSchema = createInsertSchema(robots).pick({
  year: true,
  name: true,
  nameEn: true,
  description: true,
  descriptionEn: true,
  imageUrl: true,
  specifications: true,
  specificationsEn: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).pick({
  year: true,
  name: true,
  position: true,
  positionEn: true,
  category: true,
  imageUrl: true,
  bio: true,
  bioEn: true,
});

export const insertAwardSchema = createInsertSchema(awards).pick({
  title: true,
  titleEn: true,
  year: true,
  competition: true,
  competitionEn: true,
  category: true,
  iconType: true,
  description: true,
  descriptionEn: true,
  imageUrl: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;
export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type Media = typeof media.$inferSelect;
export type InsertRobot = z.infer<typeof insertRobotSchema>;
export type Robot = typeof robots.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertAward = z.infer<typeof insertAwardSchema>;
export type Award = typeof awards.$inferSelect;
