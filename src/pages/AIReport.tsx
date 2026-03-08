import { useState, useMemo } from "react";
import { useCivic } from "@/context/CivicContext";
import { wardNames } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, FileText, AlertTriangle, TrendingUp, Shield, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Report {
  ward: string;
  generatedAt: string;
  hotspots: string[];
  efficiency: number;
  transparencyScore: number;
  recommendations: string[];
  summary: string;
}

function generateMockReport(ward: string, cases: any[]): Report {
  const wardCases = cases.filter((c) => c.ward === ward);
  const cleared = wardCases.filter((c) => c.status === "Cleared").length;
  const total = wardCases.length;
  const efficiency = total > 0 ? Math.round((cleared / total) * 100) : 0;
  const score = Math.min(100, efficiency + Math.floor(Math.random() * 20) + 10);

  const hotspots = wardCases.slice(0, 3).map((c) => c.location);
  const recommendations = [
    `Deploy additional enforcement teams in ${ward} during peak hours`,
    `Install CCTV surveillance at top 3 encroachment hotspots`,
    `Establish monthly community awareness drives for ${ward} residents`,
    efficiency < 50 ? "Urgently increase staffing to address growing backlog" : "Maintain current resolution momentum with quarterly reviews",
    `Create designated hawker zones to prevent roadside vendor encroachments`,
  ];

  return {
    ward,
    generatedAt: new Date().toISOString(),
    hotspots,
    efficiency,
    transparencyScore: score,
    recommendations: recommendations.slice(0, 4),
    summary: `${ward} has ${total} total encroachment cases with ${cleared} resolved (${efficiency}% resolution rate). ${
      efficiency > 60 ? "The ward demonstrates strong enforcement capability." : "Improvement needed in enforcement response times."
    } Key areas of concern include ${hotspots.slice(0, 2).join(" and ") || "multiple zones"}.`,
  };
}

export default function AIReport() {
  const { cases } = useCivic();
  const [selectedWard, setSelectedWard] = useState(wardNames[0]);
  const [report, setReport] = useState<Report | null>(null);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setReport(null);
    setTimeout(() => {
      setReport(generateMockReport(selectedWard, cases));
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
          <Brain className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold">AI Governance Report Generator</h1>
          <p className="text-sm text-muted-foreground">Generate ward transparency and enforcement reports</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 flex items-center gap-3">
          <Select value={selectedWard} onValueChange={setSelectedWard}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              {wardNames.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={handleGenerate} disabled={generating}>
            <Brain className="h-4 w-4 mr-2" />
            {generating ? "Generating..." : "Generate Ward Transparency Report"}
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {generating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center py-12">
            <div className="text-center space-y-3">
              <div className="h-12 w-12 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Analyzing encroachment data for {selectedWard}...</p>
            </div>
          </motion.div>
        )}

        {report && !generating && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Governance Report — {report.ward}
                </CardTitle>
                <p className="text-xs text-muted-foreground">Generated: {new Date(report.generatedAt).toLocaleString()}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm">{report.summary}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <TrendingUp className="h-6 w-6 mx-auto text-status-scheduled mb-1" />
                    <p className="text-2xl font-bold">{report.efficiency}%</p>
                    <p className="text-xs text-muted-foreground">Resolution Efficiency</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <Shield className="h-6 w-6 mx-auto text-status-cleared mb-1" />
                    <p className="text-2xl font-bold">{report.transparencyScore}</p>
                    <p className="text-xs text-muted-foreground">Transparency Score</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-status-pending" /> Encroachment Hotspots
                  </h4>
                  <ul className="space-y-1">
                    {report.hotspots.map((h, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-status-reported" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-status-pending" /> Policy Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {report.recommendations.map((r, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="text-xs font-bold text-primary mt-0.5">{i + 1}.</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
