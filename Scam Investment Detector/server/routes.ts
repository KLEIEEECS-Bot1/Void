import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeTextSchema } from "@shared/schema";
import { analyzeInvestmentText } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Analyze investment text
  app.post("/api/analyze", async (req, res) => {
    try {
      const { text } = analyzeTextSchema.parse(req.body);
      
      // Use OpenAI to analyze the text
      const analysisResult = await analyzeInvestmentText(text);
      
      // Store the analysis
      const analysis = await storage.createAnalysis({
        text,
        riskScore: analysisResult.riskScore,
        riskLevel: analysisResult.riskLevel,
        redFlags: analysisResult.redFlags,
        explanation: analysisResult.explanation,
        recommendation: analysisResult.recommendation,
      });
      
      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing text:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Failed to analyze text" 
      });
    }
  });

  // Get analysis by ID
  app.get("/api/analyses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const analysis = await storage.getAnalysis(id);
      
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      
      res.json(analysis);
    } catch (error) {
      console.error("Error getting analysis:", error);
      res.status(500).json({ message: "Failed to get analysis" });
    }
  });

  // Get recent analyses
  app.get("/api/analyses", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const analyses = await storage.getRecentAnalyses(limit);
      res.json(analyses);
    } catch (error) {
      console.error("Error getting recent analyses:", error);
      res.status(500).json({ message: "Failed to get analyses" });
    }
  });

  // Get statistics
  app.get("/api/statistics", async (req, res) => {
    try {
      const stats = await storage.getStatistics();
      res.json(stats);
    } catch (error) {
      console.error("Error getting statistics:", error);
      res.status(500).json({ message: "Failed to get statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
