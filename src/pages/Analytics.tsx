import { useMemo } from "react";
import { useComplaints } from "@/context/ComplaintContext";
import { computeAreaPerformance } from "@/data/mockData";
import { PageTransition } from "@/components/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = [
  "hsl(220, 60%, 35%)",
  "hsl(142, 71%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 65%, 60%)",
  "hsl(0, 84%, 60%)",
];

export default function Analytics() {
  const { complaints } = useComplaints();

  const areaData = useMemo(() => {
    const map = new Map<string, number>();
    complaints.forEach((c) => map.set(c.area, (map.get(c.area) || 0) + 1));
    return Array.from(map.entries()).map(([area, count]) => ({ area, count })).sort((a, b) => b.count - a.count);
  }, [complaints]);

  const statusData = useMemo(() => {
    const map = new Map<string, number>();
    complaints.forEach((c) => map.set(c.status, (map.get(c.status) || 0) + 1));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [complaints]);

  const priorityData = useMemo(() => {
    const map = new Map<string, number>();
    complaints.forEach((c) => map.set(c.priority, (map.get(c.priority) || 0) + 1));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [complaints]);

  const areaPerf = useMemo(() => computeAreaPerformance(complaints), [complaints]);

  const riskColor: Record<string, string> = {
    "Low Risk": "bg-status-cleared text-primary-foreground",
    "Medium Risk": "bg-status-pending text-primary-foreground",
    "High Encroachment Zone": "bg-status-reported text-primary-foreground",
  };

  return (
    <PageTransition>
      <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-bold">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground">Delhi encroachment data insights</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Cases by Area</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={areaData}>
                    <XAxis dataKey="area" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(220, 60%, 35%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Status Distribution</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Priority Distribution</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={priorityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      <Cell fill="hsl(0, 84%, 60%)" />
                      <Cell fill="hsl(38, 92%, 50%)" />
                      <Cell fill="hsl(142, 71%, 45%)" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Area Performance</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {areaPerf.map((a) => (
                  <div key={a.area} className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <div>
                      <span className="text-sm font-medium">{a.area}</span>
                      <div className="flex gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">{a.totalCases} cases</span>
                        <span className="text-[10px] text-muted-foreground">{a.resolvedPercent}% resolved</span>
                      </div>
                    </div>
                    <Badge className={`text-[10px] ${riskColor[a.riskLevel]}`}>{a.riskLevel}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
