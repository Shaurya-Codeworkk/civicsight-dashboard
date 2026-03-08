import { useCivic } from "@/context/CivicContext";
import { demolitionDrives, completedActions } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Shield, Calendar, CheckCircle2 } from "lucide-react";

export default function TransparencyBoard() {
  const { getCase } = useCivic();

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
          <Shield className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Public Transparency Board</h1>
          <p className="text-sm text-muted-foreground">Municipal Enforcement Disclosure Portal</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Upcoming Demolition Drives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Officer In Charge</TableHead>
                <TableHead>Case</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demolitionDrives.map((d, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-xs">{d.date}</TableCell>
                  <TableCell className="font-medium text-sm">{d.location}</TableCell>
                  <TableCell className="text-sm">{d.reason}</TableCell>
                  <TableCell className="text-sm">{d.officer}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{d.caseId}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Completed Enforcement Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {completedActions.map((action, i) => {
            const caseData = getCase(action.caseId);
            return (
              <div key={i} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{action.location}</p>
                    <p className="text-xs text-muted-foreground">
                      {action.count} encroachments removed · {action.date} · Ref: {action.caseId}
                    </p>
                  </div>
                  <Badge className="bg-status-cleared text-primary-foreground">Cleared</Badge>
                </div>
                {caseData && (
                  <BeforeAfterSlider
                    beforeImage={caseData.beforeImage}
                    afterImage={caseData.afterImage}
                    beforeLabel="Before Enforcement"
                    afterLabel="After Clearance"
                  />
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
