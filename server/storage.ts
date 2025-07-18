import { db } from "./db";
import { 
  contacts, 
  news, 
  media, 
  robots, 
  teamMembers, 
  awards,
  insertContactSchema, 
  insertNewsSchema,
  insertMediaSchema,
  insertRobotSchema,
  insertTeamMemberSchema,
  insertAwardSchema
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export const storage = {
  async createContact(contactData: any) {
    const validatedData = insertContactSchema.parse(contactData);
    const [contact] = await db.insert(contacts).values(validatedData).returning();
    return contact;
  },

  async getContacts() {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  },

  async createNews(newsData: any) {
    const validatedData = insertNewsSchema.parse(newsData);
    const [newsItem] = await db.insert(news).values(validatedData).returning();
    return newsItem;
  },

  async getNews() {
    return await db.select().from(news).orderBy(desc(news.createdAt));
  },

  async deleteNews(id: number) {
    await db.delete(news).where(eq(news.id, id));
  },

  // Media operations
  async createMedia(mediaData: any) {
    const validatedData = insertMediaSchema.parse(mediaData);
    const [mediaItem] = await db.insert(media).values(validatedData).returning();
    return mediaItem;
  },

  async getMedia(category?: string) {
    if (category) {
      return await db.select().from(media).where(eq(media.category, category)).orderBy(desc(media.createdAt));
    }
    return await db.select().from(media).orderBy(desc(media.createdAt));
  },

  async deleteMedia(id: number) {
    await db.delete(media).where(eq(media.id, id));
  },

  async updateMedia(id: number, mediaData: any) {
    const [updatedMedia] = await db.update(media).set(mediaData).where(eq(media.id, id)).returning();
    return updatedMedia;
  },

  // Robot operations
  async createRobot(robotData: any) {
    const validatedData = insertRobotSchema.parse(robotData);
    const [robot] = await db.insert(robots).values(validatedData).returning();
    return robot;
  },

  async getRobots() {
    return await db.select().from(robots).orderBy(desc(robots.year));
  },

  async deleteRobot(id: number) {
    await db.delete(robots).where(eq(robots.id, id));
  },

  // Team member operations
  async createTeamMember(memberData: any) {
    const validatedData = insertTeamMemberSchema.parse(memberData);
    const [member] = await db.insert(teamMembers).values(validatedData).returning();
    return member;
  },

  async getTeamMembers() {
    return await db.select().from(teamMembers).orderBy(desc(teamMembers.year));
  },

  async deleteTeamMember(id: number) {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  },

  // Award operations
  async createAward(awardData: any) {
    const validatedData = insertAwardSchema.parse(awardData);
    const [award] = await db.insert(awards).values(validatedData).returning();
    return award;
  },

  async getAwards() {
    return await db.select().from(awards).orderBy(desc(awards.year));
  },

  async deleteAward(id: number) {
    await db.delete(awards).where(eq(awards.id, id));
  },
};