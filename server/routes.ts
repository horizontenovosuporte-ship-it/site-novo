import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { checkoutSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/checkout", async (req, res) => {
    try {
      const validatedData = checkoutSchema.parse(req.body);
      const result = await storage.createCheckout(validatedData);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ 
        error: "Dados inválidos", 
        details: error.message 
      });
    }
  });

  app.get("/api/checkout/:id", async (req, res) => {
    try {
      const checkout = await storage.getCheckout(req.params.id);
      if (!checkout) {
        res.status(404).json({ error: "Checkout não encontrado" });
        return;
      }
      res.json(checkout);
    } catch (error: any) {
      res.status(500).json({ error: "Erro ao buscar checkout" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
