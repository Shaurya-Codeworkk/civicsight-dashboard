import { EncroachmentCase } from "@/data/mockData";
import { CaseTimeline } from "./CaseTimeline";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusColor: Record<string, string> = {
  Reported: "bg-status-reported text-primary-foreground",
  Pending: "bg-status-pending text-primary-foreground",
  Scheduled: "bg-status-scheduled text-primary-foreground",
  Cleared: "bg-status-cleared text-primary-foreground",
};

interface CaseDetailPanelProps {
  caseData: EncroachmentCase;
  onClose: () => void;
}

export function CaseDetailPanel({ caseData, onClose }: CaseDetailPanelProps) {
  return (
    <div className="w-96 bg-card border-l h-full overflow-y-auto p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-lg">{caseData.id}</h3>
          <p className="text-sm text-muted-foreground">{caseData.location}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-2">
        <Badge className={statusColor[caseData.status]}>{caseData.status}</Badge>
        <Badge variant="outline">{caseData.category}</Badge>
        <Badge variant="outline">{caseData.ward}</Badge>
      </div>

      <div>
        <p className="text-sm">{caseData.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-muted-foreground">Reported:</span>
          <p className="font-medium">{caseData.dateReported}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Officer:</span>
          <p className="font-medium">{caseData.assignedOfficer}</p>
        </div>
      </div>

      {caseData.officerNotes && (
        <div className="bg-muted rounded-md p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Officer Notes</p>
          <p className="text-sm">{caseData.officerNotes}</p>
        </div>
      )}

      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">Before Image</p>
        <img src={caseData.beforeImage} alt="Before" className="w-full rounded-md aspect-video object-cover" />
      </div>

      {caseData.status === "Cleared" && (
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">After Image</p>
          <img src={caseData.afterImage} alt="After" className="w-full rounded-md aspect-video object-cover" />
        </div>
      )}

      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">Case Timeline</p>
        <CaseTimeline events={caseData.timeline} />
      </div>
    </div>
  );
}
