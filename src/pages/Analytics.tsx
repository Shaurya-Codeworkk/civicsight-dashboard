import { useMemo } from "react";
import { useCivic } from "@/context/CivicContext";
import { wardNames, categories } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { BarChart3, TrendingUp, PieChartIcon, Activity } from "lucide-react";

const COLORS = ["hsl(220,60%,35%)", "hsl(142,71%,45%)", "hsl(38,92%,50%)", "hsl(280,65%,60%)", "hsl(0,84%,60%)"];

export default function Analytics() {
  const { cases } = useCivic();

  const wardData = useMemo(() =>
    wardNames.map((w) => ({
      ward: w,
      count: cases.filter((c) => c.ward === w).length,
    })), [cases]);

  const statusData = useMemo(() => {
    const s = { Pending: 0, Scheduled: 0, Cleared: 0, Reported: 0 };
    cases.forEach((c) => s[c.status]++);
    return Object.entries(s).map(([name, value]) => ({ name, value }));
  }, [cases]);

  const categoryData = useMemo(() =>
    categories.map((cat) => ({
      name: cat.split(" ").slice(0, 2).join(" "),
      value: cases.filter((c) => c.category === cat).length,
    })).filter((d) => d.value > 0), [cases]);

  const monthlyData = useMemo(() => {
    const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
    return months.map((m, i) => ({
      month: m,
      reported: Math.floor(Math.random() * 5) + 2 + i,
      cleared: Math.floor(Math.random() * 3) + i,
    }));
  }, []);

  return (
    <div className="p-4 space-y-4 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold">Civic Analytics Dashboard</h1>
        <p className="text-sm text-muted-foreground">Encroachment trends and enforcement insights</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <StatCard title="Total Cases" value={cases.length} icon={BarChart3} />
        <StatCard title="Resolution Rate" value={`${Math.round((cases.filter(c => c.status === "Cleared").length / cases.length) * 100)}%`} icon={TrendingUp} colorClass="text-status-cleared" />
        <StatCard title="Active Cases" value={cases.filter(c => c.status !== "Cleared").length} icon={Activity} colorClass="text-status-pending" />
        <StatCard title="Categories" value={categories.length} icon={PieChartIcon} colorClass="text-status-scheduled" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Encroachments per Ward</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={wardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ward" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(220,60%,35%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Status Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Monthly Trends</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reported" stroke="hsl(38,92%,50%)" strokeWidth={2} />
                <Line type="monotone" dataKey="cleared" stroke="hsl(142,71%,45%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Category Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
