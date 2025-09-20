import { type Analysis, type InsertAnalysis } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  getAnalysis(id: string): Promise<Analysis | undefined>;
  getRecentAnalyses(limit?: number): Promise<Analysis[]>;
  getStatistics(): Promise<{
    totalAnalyses: number;
    scamsDetected: number;
    averageRiskScore: number;
  }>;
}

export class MemStorage implements IStorage {
  private analyses: Map<string, Analysis>;

  constructor() {
    this.analyses = new Map();
  }

  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const id = randomUUID();
    const analysis: Analysis = {
      id,
      text: insertAnalysis.text,
      riskScore: insertAnalysis.riskScore,
      riskLevel: insertAnalysis.riskLevel,
      redFlags: insertAnalysis.redFlags as Array<{
        type: string;
        description: string;
        severity: "high" | "medium" | "low";
        excerpt: string;
      }>,
      explanation: insertAnalysis.explanation,
      recommendation: insertAnalysis.recommendation,
      createdAt: new Date(),
    };
    this.analyses.set(id, analysis);
    return analysis;
  }

  async getAnalysis(id: string): Promise<Analysis | undefined> {
    return this.analyses.get(id);
  }

  async getRecentAnalyses(limit: number = 10): Promise<Analysis[]> {
    const allAnalyses = Array.from(this.analyses.values());
    return allAnalyses
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getStatistics(): Promise<{
    totalAnalyses: number;
    scamsDetected: number;
    averageRiskScore: number;
  }> {
    const allAnalyses = Array.from(this.analyses.values());
    const totalAnalyses = allAnalyses.length;
    const scamsDetected = allAnalyses.filter(a => a.riskLevel === "high").length;
    const averageRiskScore = totalAnalyses > 0 
      ? Math.round(allAnalyses.reduce((sum, a) => sum + a.riskScore, 0) / totalAnalyses)
      : 0;

    return {
      totalAnalyses,
      scamsDetected,
      averageRiskScore,
    };
  }
}

export const storage = new MemStorage();
