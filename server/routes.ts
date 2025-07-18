import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsSchema } from "@shared/schema";

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
