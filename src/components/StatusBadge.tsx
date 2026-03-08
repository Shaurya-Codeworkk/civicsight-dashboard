import { CaseStatus } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const statusColor: Record<string, string> = {
  Reported: "bg-status-reported text-primary-foreground",
  Pending: "bg-status-pending text-primary-foreground",
  Scheduled: "bg-status-scheduled text-primary-foreground",
  Cleared: "bg-status-cleared text-primary-foreground",
};

export function StatusBadge({ status }: { status: CaseStatus }) {
  return <Badge className={statusColor[status]}>{status}</Badge>;
}
