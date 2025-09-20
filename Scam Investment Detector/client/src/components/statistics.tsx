import { useQuery } from "@tanstack/react-query";

interface Statistics {
  totalAnalyses: number;
  scamsDetected: number;
  averageRiskScore: number;
}

export default function Statistics() {
  const { data: stats, isLoading } = useQuery<Statistics>({
    queryKey: ["/api/statistics"],
    queryFn: async () => {
      const response = await fetch("/api/statistics");
      if (!response.ok) throw new Error("Failed to fetch statistics");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="text-center animate-pulse">
            <div className="h-8 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const estimatedMoneySaved = stats ? stats.scamsDetected * 2700 : 0; // Estimate $2700 average per scam

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-12" data-testid="statistics">
      <div className="text-center">
        <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-analyses-completed">
          {stats ? formatNumber(stats.totalAnalyses) : "0"}
        </div>
        <p className="text-sm text-muted-foreground">Analyses Completed</p>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-destructive mb-2" data-testid="stat-scams-detected">
          {stats ? formatNumber(stats.scamsDetected) : "0"}
        </div>
        <p className="text-sm text-muted-foreground">Scams Detected</p>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-accent mb-2" data-testid="stat-money-saved">
          ${formatNumber(estimatedMoneySaved)}
        </div>
        <p className="text-sm text-muted-foreground">Money Potentially Saved</p>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-average-score">
          {stats ? `${stats.averageRiskScore}%` : "0%"}
        </div>
        <p className="text-sm text-muted-foreground">Average Risk Score</p>
      </div>
    </div>
  );
}
