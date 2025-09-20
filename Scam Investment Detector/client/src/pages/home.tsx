import { Shield, Search, Lightbulb, History, Microscope, Eye, TriangleAlert, ShieldCheck } from "lucide-react";
import AnalysisForm from "../components/analysis-form";
import AnalysisResults from "../components/analysis-results";
import RecentAnalyses from "../components/recent-analyses";
import Statistics from "../components/statistics";
import { useState } from "react";
import type { Analysis } from "@shared/schema";

export default function Home() {
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <Shield className="text-primary-foreground text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Investment Scam Detector</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Financial Protection</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">How it Works</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Examples</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Protect Your Investments with AI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Detect Investment Scams{" "}
            <span className="text-primary">Before You Invest</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI analyzes investment pitches and offers to identify red flags, unrealistic promises, and suspicious patterns that could indicate a scam.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Analysis Input */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Search className="text-primary text-xl mr-3" />
                <h3 className="text-xl font-semibold text-foreground">Analyze Investment Pitch</h3>
              </div>
              
              <AnalysisForm onAnalysisComplete={setCurrentAnalysis} />
            </div>
            
            {/* Quick Tips */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                <Lightbulb className="text-accent mr-2" />
                Quick Safety Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Legitimate investments never guarantee returns</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Be wary of "limited time" pressure tactics</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Research company registration and credentials</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Avoid investments requiring immediate payment</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Analysis Results */}
          <AnalysisResults analysis={currentAnalysis} />
        </div>

        {/* Recent Analyses */}
        <RecentAnalyses />

        {/* Statistics & Impact */}
        <Statistics />
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <Shield className="text-primary-foreground text-sm" />
                </div>
                <span className="text-lg font-bold text-foreground">Investment Scam Detector</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-md">
                Protecting investors with AI-powered scam detection. Analyze investment offers, 
                identify red flags, and make safer financial decisions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Common Scams</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Safety Guide</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © 2024 Investment Scam Detector. Made with ❤️ to protect investors worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
