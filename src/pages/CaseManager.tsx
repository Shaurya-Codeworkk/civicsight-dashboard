import { useCivic } from "@/context/CivicContext";
import { CaseStatus, statuses } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

export default function CaseManager() {
  const { cases, updateCaseStatus, assignOfficer } = useCivic();

  const officers = ["Inspector R. Sharma", "Officer K. Patel", "Inspector M. Singh", "Officer A. Gupta", "Inspector P. Joshi", "Officer S. Reddy"];

  return (
    <PageTransition>
      <div className="p-4 space-y-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow-sm">
            <Settings className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Case Manager</h1>
            <p className="text-sm text-muted-foreground">Manage and update encroachment complaints</p>
          </div>
        </div>

        <Card className="shadow-sm border-border/60">
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="hidden md:table-cell">Ward</TableHead>
                  <TableHead className="hidden lg:table-cell">Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Officer</TableHead>
                  <TableHead className="hidden lg:table-cell">Reported</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.map((c) => (
                  <TableRow key={c.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-mono text-xs font-bold">{c.id}</TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate">{c.location}</TableCell>
                    <TableCell className="hidden md:table-cell"><Badge variant="outline" className="text-xs">{c.ward}</Badge></TableCell>
                    <TableCell className="text-xs hidden lg:table-cell">{c.category}</TableCell>
                    <TableCell>
                      <Select value={c.status} onValueChange={(v) => updateCaseStatus(c.id, v as CaseStatus)}>
                        <SelectTrigger className="w-28 h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Select value={c.assignedOfficer} onValueChange={(v) => assignOfficer(c.id, v)}>
                        <SelectTrigger className="w-40 h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {officers.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-xs font-mono hidden lg:table-cell">{c.dateReported}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
