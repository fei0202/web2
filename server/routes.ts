import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema, 
  insertNewsSchema,
  insertMediaSchema,
  insertRobotSchema,
  insertTeamMemberSchema,
  insertAwardSchema
} from "@shared/schema";

// Simple admin password - in production, use environment variables
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "FRC10390admin";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission route
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, message: "Contact message saved successfully", id: contact.id });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // Admin login route
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      
      if (password === ADMIN_PASSWORD) {
        // In a real application, you would use proper session management
        // For now, we'll just return a simple token
        const token = Buffer.from(`admin:${Date.now()}`).toString('base64');
        res.json({ success: true, token });
      } else {
        res.status(401).json({ success: false, error: "Invalid password" });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Middleware to check admin authentication
  const requireAdmin = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const token = authHeader.substring(7);
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      if (decoded.startsWith('admin:')) {
        next();
      } else {
        res.status(401).json({ error: 'Invalid token' });
      }
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  // Get all contacts (protected admin route)
  app.get("/api/contacts", requireAdmin, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // News routes
  app.post("/api/news", requireAdmin, async (req, res) => {
    try {
      const newsData = insertNewsSchema.parse(req.body);
      const news = await storage.createNews(newsData);
      res.json({ success: true, message: "News created successfully", news });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/news/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteNews(id);
      res.json({ success: true, message: "News deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Media routes
  app.post("/api/media", requireAdmin, async (req, res) => {
    try {
      const mediaData = insertMediaSchema.parse(req.body);
      const media = await storage.createMedia(mediaData);
      res.json({ success: true, message: "Media created successfully", media });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/media", async (req, res) => {
    try {
      const category = req.query.category as string;
      const media = await storage.getMedia(category);
      res.json(media);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/media/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteMedia(id);
      res.json({ success: true, message: "Media deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/media/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const media = await storage.updateMedia(id, req.body);
      res.json({ success: true, message: "Media updated successfully", media });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Robot routes
  app.post("/api/robots", requireAdmin, async (req, res) => {
    try {
      const robotData = insertRobotSchema.parse(req.body);
      const robot = await storage.createRobot(robotData);
      res.json({ success: true, message: "Robot created successfully", robot });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/robots", async (req, res) => {
    try {
      const robots = await storage.getRobots();
      res.json(robots);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/robots/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteRobot(id);
      res.json({ success: true, message: "Robot deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Team member routes
  app.post("/api/team-members", requireAdmin, async (req, res) => {
    try {
      const memberData = insertTeamMemberSchema.parse(req.body);
      const member = await storage.createTeamMember(memberData);
      res.json({ success: true, message: "Team member created successfully", member });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/team-members", async (req, res) => {
    try {
      const members = await storage.getTeamMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/team-members/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTeamMember(id);
      res.json({ success: true, message: "Team member deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Award routes
  app.post("/api/awards", requireAdmin, async (req, res) => {
    try {
      const awardData = insertAwardSchema.parse(req.body);
      const award = await storage.createAward(awardData);
      res.json({ success: true, message: "Award created successfully", award });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/awards", async (req, res) => {
    try {
      const awards = await storage.getAwards();
      res.json(awards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/awards/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteAward(id);
      res.json({ success: true, message: "Award deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Health check endpoint for monitoring
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      version: "1.0.0"
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
