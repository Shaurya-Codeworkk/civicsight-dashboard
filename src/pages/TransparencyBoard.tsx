import { useMemo } from "react";
import { useComplaints } from "@/context/ComplaintContext";
import { PageTransition } from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const statusColor: Record<string, string> = {
  Pending: "bg-status-pending text-primary-foreground",
  "In Progress": "bg-status-scheduled text-primary-foreground",
  Resolved: "bg-status-cleared text-primary-foreground",
};

export default function TransparencyBoard() {
  const { complaints } = useComplaints();
  const upcoming = useMemo(() => complaints.filter((c) => c.status !== "Resolved"), [complaints]);
  const completed = useMemo(() => complaints.filter((c) => c.status === "Resolved"), [complaints]);

  const renderTable = (data: typeof complaints) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs">Case ID</TableHead>
          <TableHead className="text-xs">Area</TableHead>
          <TableHead className="text-xs">Category</TableHead>
          <TableHead className="text-xs">Status</TableHead>
          <TableHead className="text-xs hidden md:table-cell">Assigned Officer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-mono text-xs">{c.id}</TableCell>
            <TableCell className="text-xs">{c.area}</TableCell>
            <TableCell className="text-xs">{c.category}</TableCell>
            <TableCell><Badge className={`text-[10px] ${statusColor[c.status] || ""}`}>{c.status}</Badge></TableCell>
            <TableCell className="text-xs hidden md:table-cell">{c.assignedOfficer || "Unassigned"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <PageTransition>
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
        <div>
          <h1 className="text-xl font-bold">Transparency Board</h1>
          <p className="text-sm text-muted-foreground">Public view of all encroachment actions</p>
        </div>
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Actions ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <Card><CardContent className="p-0">{renderTable(upcoming)}</CardContent></Card>
          </TabsContent>
          <TabsContent value="completed">
            <Card><CardContent className="p-0">{renderTable(completed)}</CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
}
