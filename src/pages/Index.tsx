import { useState, useMemo } from "react";
import { useCivic } from "@/context/CivicContext";
import { MapView } from "@/components/MapView";
import { StatCard } from "@/components/StatCard";
import { CaseDetailPanel } from "@/components/CaseDetailPanel";
import { EncroachmentCase, wardNames, categories, statuses } from "@/data/mockData";
import { FileText, Clock, CalendarCheck, CheckCircle2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const { cases } = useCivic();
  const [selectedCase, setSelectedCase] = useState<EncroachmentCase | null>(null);
  const [wardFilter, setWardFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      if (wardFilter !== "all" && c.ward !== wardFilter) return false;
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (categoryFilter !== "all" && c.category !== categoryFilter) return false;
      return true;
    });
  }, [cases, wardFilter, statusFilter, categoryFilter]);

  const stats = useMemo(() => ({
    total: cases.length,
    pending: cases.filter((c) => c.status === "Pending").length,
    scheduled: cases.filter((c) => c.status === "Scheduled").length,
    cleared: cases.filter((c) => c.status === "Cleared").length,
  }), [cases]);

  return (
    <div className="flex h-[calc(100vh-3rem)]">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">City Command Center</h1>
              <p className="text-sm text-muted-foreground">Real-time encroachment monitoring dashboard</p>
            </div>
            <div className="flex gap-2">
              <Select value={wardFilter} onValueChange={setWardFilter}>
                <SelectTrigger className="w-32 h-8 text-xs"><SelectValue placeholder="Ward" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Wards</SelectItem>
                  {wardNames.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 h-8 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40 h-8 text-xs"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <StatCard title="Total Reports" value={stats.total} icon={FileText} />
            <StatCard title="Pending" value={stats.pending} icon={Clock} colorClass="text-status-pending" />
            <StatCard title="Scheduled" value={stats.scheduled} icon={CalendarCheck} colorClass="text-status-scheduled" />
            <StatCard title="Cleared" value={stats.cleared} icon={CheckCircle2} colorClass="text-status-cleared" />
          </div>
        </div>

        <div className="flex-1 px-4 pb-4">
          <MapView cases={filtered} onMarkerClick={setSelectedCase} />
        </div>
      </div>

      {selectedCase && (
        <CaseDetailPanel caseData={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </div>
  );
};

export default Index;
