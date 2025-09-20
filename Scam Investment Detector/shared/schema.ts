import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const analyses = pgTable("analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  text: text("text").notNull(),
  riskScore: integer("risk_score").notNull(), // 0-100
  riskLevel: varchar("risk_level", { length: 10 }).notNull(), // "low", "medium", "high"
  redFlags: jsonb("red_flags").$type<Array<{
    type: string;
    description: string;
    severity: "high" | "medium" | "low";
    excerpt: string;
  }>>().notNull().default([]),
  explanation: text("explanation").notNull(),
  recommendation: text("recommendation").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAnalysisSchema = createInsertSchema(analyses).omit({
  id: true,
  createdAt: true,
});

export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;
export type Analysis = typeof analyses.$inferSelect;

// Request schema for analysis
export const analyzeTextSchema = z.object({
  text: z.string().min(10, "Text must be at least 10 characters long"),
});

export type AnalyzeTextRequest = z.infer<typeof analyzeTextSchema>;
