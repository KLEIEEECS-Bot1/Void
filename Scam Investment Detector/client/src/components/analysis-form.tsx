import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Brain, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Analysis } from "@shared/schema";

interface AnalysisFormProps {
  onAnalysisComplete: (analysis: Analysis) => void;
}

export default function AnalysisForm({ onAnalysisComplete }: AnalysisFormProps) {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await apiRequest("POST", "/api/analyze", { text });
      return response.json();
    },
    onSuccess: (analysis: Analysis) => {
      onAnalysisComplete(analysis);
      // Invalidate cache to refresh recent analyses and statistics
      queryClient.invalidateQueries({ queryKey: ["/api/analyses"] });
      queryClient.invalidateQueries({ queryKey: ["/api/statistics"] });
      toast({
        title: "Analysis Complete",
        description: `Risk level: ${analysis.riskLevel.toUpperCase()}`,
      });
    },
    onError: (error) => {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the text. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast({
        title: "No Text Provided",
        description: "Please enter some text to analyze",
        variant: "destructive",
      });
      return;
    }
    analyzeMutation.mutate(text);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setText(content);
    };
    reader.readAsText(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="investment-text" className="block text-sm font-medium text-foreground mb-2">
          Paste Investment Text
        </Label>
        <Textarea
          id="investment-text"
          data-testid="input-investment-text"
          placeholder="Paste the investment offer, email, or pitch here for analysis..."
          className="w-full h-32 p-3 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      
      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
        <Upload className="text-muted-foreground text-2xl mb-3 mx-auto" />
        <p className="text-muted-foreground mb-2">Or upload a document</p>
        <label htmlFor="file-upload" className="text-primary font-medium hover:underline cursor-pointer">
          <input
            id="file-upload"
            type="file"
            accept=".txt,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
            data-testid="input-file-upload"
          />
          Choose file
        </label>
        <p className="text-xs text-muted-foreground mt-2">Supports TXT, PDF, DOC files up to 10MB</p>
      </div>
      
      <Button
        type="submit"
        disabled={analyzeMutation.isPending}
        className="w-full gradient-bg text-primary-foreground font-semibold py-3 px-6 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
        data-testid="button-analyze"
      >
        {analyzeMutation.isPending ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <Brain className="h-4 w-4" />
            <span>Analyze for Scam Risk</span>
          </>
        )}
      </Button>
    </form>
  );
}
