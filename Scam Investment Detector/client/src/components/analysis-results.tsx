import { Shield, Flag, Microscope, Info, TriangleAlert, CircleAlert, Eye } from "lucide-react";
import type { Analysis } from "@shared/schema";

interface AnalysisResultsProps {
  analysis: Analysis | null;
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  if (!analysis) {
    return (
      <div className="space-y-6">
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <div className="text-center py-12">
            <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Analysis Yet</h3>
            <p className="text-muted-foreground">
              Submit an investment text to see the AI-powered scam detection results here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "risk-high";
      case "medium": return "risk-medium";
      case "low": return "risk-low";
      default: return "risk-medium";
    }
  };

  const getRiskTextColor = (level: string) => {
    switch (level) {
      case "high": return "text-destructive";
      case "medium": return "text-accent";
      case "low": return "text-green-600";
      default: return "text-accent";
    }
  };

  const getHighlightClass = (severity: string) => {
    switch (severity) {
      case "high": return "highlight-danger";
      case "medium": return "highlight-warning";
      case "low": return "highlight-warning";
      default: return "highlight-warning";
    }
  };

  return (
    <div className="space-y-6" data-testid="analysis-results">
      {/* Risk Score Card */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">Risk Assessment</h3>
          <div className="text-xs text-muted-foreground">Analysis completed</div>
        </div>
        
        <div className="text-center mb-6">
          <div className={`${getRiskColor(analysis.riskLevel)} w-24 h-24 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4`}>
            {analysis.riskScore}%
          </div>
          <h4 className={`text-2xl font-bold mb-2 ${getRiskTextColor(analysis.riskLevel)}`} data-testid="text-risk-level">
            {analysis.riskLevel.toUpperCase()} RISK
          </h4>
          <p className="text-muted-foreground" data-testid="text-risk-description">
            {analysis.riskLevel === "high" && "This appears to be a potential scam with multiple red flags"}
            {analysis.riskLevel === "medium" && "This investment has some concerning elements that require caution"}
            {analysis.riskLevel === "low" && "This appears to be a relatively safe investment opportunity"}
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-destructive/10 rounded-lg">
            <TriangleAlert className="text-destructive text-xl mb-2 mx-auto" />
            <p className="text-sm font-medium text-destructive" data-testid="text-red-flags-count">
              {analysis.redFlags.filter(flag => flag.severity === "high").length} Red Flags
            </p>
          </div>
          <div className="p-3 bg-accent/10 rounded-lg">
            <Eye className="text-accent text-xl mb-2 mx-auto" />
            <p className="text-sm font-medium text-accent" data-testid="text-warnings-count">
              {analysis.redFlags.filter(flag => flag.severity === "medium").length} Warnings
            </p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <Shield className="text-muted-foreground text-xl mb-2 mx-auto" />
            <p className="text-sm font-medium text-muted-foreground" data-testid="text-safe-signs-count">
              {analysis.redFlags.filter(flag => flag.severity === "low").length} Minor Issues
            </p>
          </div>
        </div>
      </div>

      {/* Red Flags Detection */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Flag className="text-destructive mr-2" />
          Detected Red Flags
        </h3>
        
        <div className="space-y-3" data-testid="red-flags-list">
          {analysis.redFlags.length === 0 ? (
            <p className="text-muted-foreground">No significant red flags detected.</p>
          ) : (
            analysis.redFlags.slice(0, 4).map((flag, index) => (
              <div key={index} className={`${getHighlightClass(flag.severity)} p-3 rounded-md`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className={`font-medium mb-1 ${flag.severity === "high" ? "text-destructive" : "text-accent"}`}>
                      {flag.type}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">{flag.description}</p>
                    {flag.excerpt && (
                      <p className="text-xs text-muted-foreground italic">"{flag.excerpt}"</p>
                    )}
                  </div>
                  {flag.severity === "high" ? (
                    <CircleAlert className="text-destructive flex-shrink-0" />
                  ) : (
                    <TriangleAlert className="text-accent flex-shrink-0" />
                  )}
                </div>
              </div>
            ))
          )}
          
          {analysis.redFlags.length > 4 && (
            <button className="text-primary text-sm font-medium hover:underline flex items-center">
              <span>View all {analysis.redFlags.length} red flags</span>
              <span className="ml-2">↓</span>
            </button>
          )}
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Microscope className="text-primary mr-2" />
          Detailed Analysis
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Analysis Summary:</h4>
            <p className="text-sm text-muted-foreground" data-testid="text-explanation">
              {analysis.explanation}
            </p>
          </div>
          
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-medium text-foreground mb-2 flex items-center">
              <Info className="text-primary mr-2" />
              Our Recommendation
            </h4>
            <p className="text-sm text-muted-foreground" data-testid="text-recommendation">
              {analysis.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
