import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface ScamAnalysisResult {
  riskScore: number; // 0-100
  riskLevel: "low" | "medium" | "high";
  redFlags: Array<{
    type: string;
    description: string;
    severity: "high" | "medium" | "low";
    excerpt: string;
  }>;
  explanation: string;
  recommendation: string;
}

export async function analyzeInvestmentText(text: string): Promise<ScamAnalysisResult> {
  // Mock analysis for testing - remove this when OpenAI API quota is available
  const lowerText = text.toLowerCase();
  
  // Simple pattern detection for demo
  const scamIndicators = [
    { pattern: /(?<!no\s)guaranteed?(?!\s+but)/gi, type: "Guaranteed Returns", severity: "high" as const },
    { pattern: /urgent|act now|24 hours|only.*left|must act|don't miss/gi, type: "Pressure Tactics", severity: "high" as const },
    { pattern: /[5-9]\d{2,}%|1\d{3,}%/gi, type: "Unrealistic Returns", severity: "high" as const }, // 500%+ only
    { pattern: /whatsapp.*\+|send money now|wire.*immediately/gi, type: "Suspicious Contact Methods", severity: "high" as const },
    { pattern: /no experience needed|easy money|get rich quick/gi, type: "Get-Rich-Quick Claims", severity: "medium" as const },
    { pattern: /send \$\d+|wire transfer \$|bitcoin payment|crypto payment/gi, type: "Payment Red Flags", severity: "medium" as const },
    { pattern: /limited.*spots?|exclusive.*opportunity|vip.*group|insider.*tips/gi, type: "Pressure/Exclusivity", severity: "medium" as const },
    { pattern: /telegram|discord.*trading|private.*group/gi, type: "Unregulated Platforms", severity: "medium" as const },
    { pattern: /\b[1-4]\d%|\b50%/gi, type: "High Returns Claims", severity: "medium" as const } // 10-50% returns
  ];
  
  const detectedFlags = scamIndicators
    .map(indicator => {
      const matches = text.match(indicator.pattern);
      if (matches) {
        return {
          type: indicator.type,
          description: `Found suspicious language indicating ${indicator.type.toLowerCase()}`,
          severity: indicator.severity,
          excerpt: matches[0]
        };
      }
      return null;
    })
    .filter(Boolean) as Array<{
      type: string;
      description: string;
      severity: "high" | "medium" | "low";
      excerpt: string;
    }>;
  
  // Calculate risk score based on detected flags
  const highRiskFlags = detectedFlags.filter(flag => flag.severity === "high").length;
  const mediumRiskFlags = detectedFlags.filter(flag => flag.severity === "medium").length;
  
  let riskScore = Math.min(100, (highRiskFlags * 30) + (mediumRiskFlags * 15));
  
  // Boost score for obvious scam patterns
  if (lowerText.includes("guaranteed") && (lowerText.includes("500%") || lowerText.includes("1000%"))) {
    riskScore = Math.max(riskScore, 90);
  }
  
  let riskLevel: "low" | "medium" | "high" = "low";
  if (riskScore >= 71) riskLevel = "high";
  else if (riskScore >= 31) riskLevel = "medium";
  
  const explanation = riskLevel === "high" 
    ? "This text contains multiple red flags commonly associated with investment scams, including unrealistic return promises and high-pressure tactics."
    : riskLevel === "medium"
    ? "This text has some concerning elements that warrant caution, though it may not be an outright scam."
    : "This appears to be a legitimate investment opportunity with proper disclosures and realistic expectations.";
    
  const recommendation = riskLevel === "high"
    ? "DO NOT INVEST. This appears to be a scam. Legitimate investments never guarantee high returns and don't use pressure tactics."
    : riskLevel === "medium" 
    ? "Exercise caution. Research the company thoroughly, verify credentials, and consult with a financial advisor before investing."
    : "This appears legitimate, but always do your own research and never invest more than you can afford to lose.";
  
  return {
    riskScore,
    riskLevel,
    redFlags: detectedFlags,
    explanation,
    recommendation
  };
}
