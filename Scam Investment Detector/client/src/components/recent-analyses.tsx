import { useQuery } from "@tanstack/react-query";
import { History } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Analysis } from "@shared/schema";

export default function RecentAnalyses() {
  const { data: analyses, isLoading } = useQuery<Analysis[]>({
    queryKey: ["/api/analyses"],
    queryFn: async () => {
      const response = await fetch("/api/analyses?limit=3");
      if (!response.ok) throw new Error("Failed to fetch analyses");
      return response.json();
    },
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "risk-high";
      case "medium": return "risk-medium";
      case "low": return "risk-low";
      default: return "risk-medium";
    }
  };

  const getRiskDescription = (level: string) => {
    switch (level) {
      case "high": return "High Risk - Multiple red flags detected";
      case "medium": return "Medium Risk - Some concerns identified";
      case "low": return "Low Risk - Appears legitimate";
      default: return "Risk assessment completed";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground flex items-center">
            <History className="text-primary mr-3" />
            Recent Analyses
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border border-border rounded-lg animate-pulse">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-6 bg-muted rounded mb-1"></div>
              <div className="h-4 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm mb-8" data-testid="recent-analyses">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground flex items-center">
          <History className="text-primary mr-3" />
          Recent Analyses
        </h3>
        <button className="text-primary font-medium hover:underline text-sm" data-testid="button-view-all">
          View All
        </button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {!analyses || analyses.length === 0 ? (
          <div className="col-span-3 text-center py-8">
            <p className="text-muted-foreground">No analyses yet. Submit your first investment text above!</p>
          </div>
        ) : (
          analyses.map((analysis) => (
            <div 
              key={analysis.id} 
              className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              data-testid={`card-analysis-${analysis.id}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(analysis.createdAt), { addSuffix: true })}
                </span>
                <div className={`${getRiskColor(analysis.riskLevel)} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                  {analysis.riskScore}%
                </div>
              </div>
              <h4 className="font-medium text-foreground mb-1" data-testid={`text-analysis-title-${analysis.id}`}>
                {analysis.text.substring(0, 50)}...
              </h4>
              <p className="text-sm text-muted-foreground" data-testid={`text-analysis-description-${analysis.id}`}>
                {getRiskDescription(analysis.riskLevel)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
