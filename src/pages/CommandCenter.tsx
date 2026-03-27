import { useState, useMemo } from "react";
import { useComplaints } from "@/context/ComplaintContext";
import { StatCard } from "@/components/StatCard";
import { PageTransition } from "@/components/PageTransition";
import { Complaint } from "@/data/mockData";
import { FileText, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence } from "framer-motion";
import { CaseDetailPanel } from "@/components/CaseDetailPanel";
import { ComplaintMap } from "@/components/ComplaintMap";

export default function CommandCenter() {
  const { complaints, markRead } = useComplaints();
  const [selectedCase, setSelectedCase] = useState<Complaint | null>(null);

  const stats = useMemo(() => ({
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "Pending").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
    high: complaints.filter((c) => c.priority === "HIGH").length,
  }), [complaints]);

  const unreadCases = useMemo(() => complaints.filter((c) => !c.isRead), [complaints]);

  const handleSelectCase = (c: Complaint) => {
    markRead(c.id);
    setSelectedCase(c);
  };

  const avgRating = useMemo(() => {
    const rated = complaints.filter((c) => c.citizenRating);
    if (rated.length === 0) return 0;
    return (rated.reduce((sum, c) => sum + (c.citizenRating || 0), 0) / rated.length).toFixed(1);
  }, [complaints]);

  return (
    <PageTransition>
      <div className="flex h-[calc(100vh-3rem)]">
        <div className="flex-1 flex flex-col min-w-0">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h1 className="text-xl font-bold">Government Command Center</h1>
                <p className="text-sm text-muted-foreground">
                  Delhi Encroachment Monitoring · Citizen Satisfaction: ⭐ {avgRating}/5
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard title="Total Cases" value={stats.total} icon={FileText} />
              <StatCard title="Pending" value={stats.pending} icon={Clock} colorClass="text-status-pending" />
              <StatCard title="Resolved" value={stats.resolved} icon={CheckCircle2} colorClass="text-status-cleared" />
              <StatCard title="High Priority" value={stats.high} icon={AlertTriangle} colorClass="text-status-reported" />
            </div>
          </div>

          <div className="flex-1 flex min-h-0">
            {/* Map */}
            <div className="flex-1 px-4 pb-4">
              <div className="h-full rounded-lg overflow-hidden border shadow-sm">
                <ComplaintMap complaints={complaints} onMarkerClick={handleSelectCase} />
              </div>
            </div>

            {/* Sidebar cases list */}
            <div className="w-72 border-l flex flex-col shrink-0 hidden lg:flex">
              <Tabs defaultValue="unread" className="flex flex-col flex-1">
                <TabsList className="mx-2 mt-2 grid grid-cols-2">
                  <TabsTrigger value="unread" className="text-xs">
                    Unread ({unreadCases.length})
                  </TabsTrigger>
                  <TabsTrigger value="all" className="text-xs">All Cases</TabsTrigger>
                </TabsList>
                <TabsContent value="unread" className="flex-1 mt-0">
                  <ScrollArea className="h-full">
                    <CaseList cases={unreadCases} onSelect={handleSelectCase} selected={selectedCase?.id} />
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="all" className="flex-1 mt-0">
                  <ScrollArea className="h-full">
                    <CaseList cases={complaints} onSelect={handleSelectCase} selected={selectedCase?.id} />
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedCase && (
            <CaseDetailPanel
              complaint={selectedCase}
              onClose={() => setSelectedCase(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

const priorityColor: Record<string, string> = {
  HIGH: "bg-status-reported text-primary-foreground",
  MEDIUM: "bg-status-pending text-primary-foreground",
  LOW: "bg-status-cleared text-primary-foreground",
};

function CaseList({ cases, onSelect, selected }: { cases: Complaint[]; onSelect: (c: Complaint) => void; selected?: string }) {
  if (cases.length === 0) return <p className="text-xs text-muted-foreground p-4 text-center">No cases</p>;
  return (
    <div className="p-2 space-y-1">
      {cases.map((c) => (
        <Card
          key={c.id}
          className={`cursor-pointer transition-all hover:bg-muted/50 ${selected === c.id ? "ring-2 ring-primary" : ""} ${!c.isRead ? "border-l-4 border-l-primary" : ""}`}
          onClick={() => onSelect(c)}
        >
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-semibold">{c.id}</span>
              <Badge className={`text-[9px] ${priorityColor[c.priority]}`}>{c.priority}</Badge>
            </div>
            <p className="text-xs font-medium truncate">{c.location}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-[9px]">{c.category}</Badge>
              <span className="text-[10px] text-muted-foreground">{c.status}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
