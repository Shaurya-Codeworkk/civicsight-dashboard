import { useMemo } from "react";
import { useCivic } from "@/context/CivicContext";
import { wardNames } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Award } from "lucide-react";

interface WardScore {
  ward: string;
  reported: number;
  resolved: number;
  resolutionRate: number;
  avgSpeed: number;
  score: number;
}

export default function Leaderboard() {
  const { cases } = useCivic();

  const scores = useMemo<WardScore[]>(() => {
    return wardNames.map((ward) => {
      const wardCases = cases.filter((c) => c.ward === ward);
      const resolved = wardCases.filter((c) => c.status === "Cleared").length;
      const total = wardCases.length;
      const resolutionRate = total > 0 ? (resolved / total) * 100 : 0;
      const avgSpeed = resolved > 0 ? Math.floor(Math.random() * 15) + 5 : 0;
      const score = Math.round(resolutionRate * 0.5 + (total > 0 ? 20 : 0) + (avgSpeed > 0 ? Math.max(0, 30 - avgSpeed) : 0));
      return { ward, reported: total, resolved, resolutionRate, avgSpeed, score };
    }).sort((a, b) => b.score - a.score);
  }, [cases]);

  const icons = [Trophy, Medal, Award];

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold">Ward Transparency Leaderboard</h1>
        <p className="text-sm text-muted-foreground">Ranked by transparency score based on reporting, resolution, and speed</p>
      </div>

      <div className="space-y-3">
        {scores.map((ward, i) => {
          const Icon = icons[i] || Award;
          return (
            <Card key={ward.ward} className={i === 0 ? "border-status-cleared border-2" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    i === 0 ? "bg-status-cleared/20 text-status-cleared" :
                    i === 1 ? "bg-status-scheduled/20 text-status-scheduled" :
                    i === 2 ? "bg-status-pending/20 text-status-pending" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-bold">{ward.ward}</span>
                      </div>
                      <span className="text-2xl font-bold text-primary">{ward.score}</span>
                    </div>
                    <Progress value={ward.score} className="h-2 mb-2" />
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>Reported: <span className="font-medium text-foreground">{ward.reported}</span></span>
                      <span>Resolved: <span className="font-medium text-foreground">{ward.resolved}</span></span>
                      <span>Rate: <span className="font-medium text-foreground">{ward.resolutionRate.toFixed(0)}%</span></span>
                      {ward.avgSpeed > 0 && <span>Avg Speed: <span className="font-medium text-foreground">{ward.avgSpeed}d</span></span>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
