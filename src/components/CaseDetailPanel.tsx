import { Complaint, departments, officers } from "@/data/mockData";
import { useComplaints } from "@/context/ComplaintContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Brain, AlertTriangle, RotateCcw, MapPin, Zap } from "lucide-react";
import { motion } from "framer-motion";

const priorityColor: Record<string, string> = {
  HIGH: "bg-status-reported text-primary-foreground",
  MEDIUM: "bg-status-pending text-primary-foreground",
  LOW: "bg-status-cleared text-primary-foreground",
};

interface Props {
  complaint: Complaint;
  onClose: () => void;
}

export function CaseDetailPanel({ complaint, onClose }: Props) {
  const { updateStatus, assignDept, assignOfficer, acceptAIRecommendation } = useComplaints();
  const ai = complaint.aiInsights;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="w-[400px] bg-card border-l h-full overflow-y-auto p-4 space-y-4 shadow-xl shrink-0"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-lg font-mono">{complaint.id}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {complaint.location}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Section 1: Case Info */}
      <div className="space-y-3">
        <img src={complaint.image} alt="Case" className="w-full rounded-lg aspect-video object-cover" />
        <div className="flex gap-2 flex-wrap">
          <Badge className={priorityColor[complaint.priority]}>{complaint.priority}</Badge>
          <Badge variant="outline">{complaint.category}</Badge>
          <Badge variant="outline">{complaint.status}</Badge>
          <Badge variant="outline">{complaint.area}</Badge>
        </div>
        <p className="text-sm">{complaint.description}</p>
      </div>

      {/* Section 2: AI Insight Panel */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-sm">AI Suggested Insights</h4>
          </div>
          <p className="text-[10px] text-muted-foreground italic">Assistive, not final decision</p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-background rounded p-2">
              <span className="text-muted-foreground block">Detected Type</span>
              <span className="font-medium">{ai.detectedType}</span>
            </div>
            <div className="bg-background rounded p-2">
              <span className="text-muted-foreground block">Priority</span>
              <span className={`font-bold ${ai.prioritySuggestion === "HIGH" ? "text-status-reported" : ai.prioritySuggestion === "MEDIUM" ? "text-status-pending" : "text-status-cleared"}`}>
                {ai.prioritySuggestion}
              </span>
            </div>
            <div className="bg-background rounded p-2">
              <span className="text-muted-foreground block">Repeat Count</span>
              <span className="font-medium">{ai.repeatCount}</span>
            </div>
            <div className="bg-background rounded p-2">
              <span className="text-muted-foreground block">Nearby Complaints</span>
              <span className="font-medium">{ai.nearbyComplaints}</span>
            </div>
            <div className="bg-background rounded p-2 col-span-2">
              <span className="text-muted-foreground block">Emergency Risk</span>
              <span className={`font-bold ${ai.emergencyRisk ? "text-status-reported" : "text-status-cleared"}`}>
                {ai.emergencyRisk ? "🚑 YES – Emergency Route Blocked" : "NO"}
              </span>
            </div>
          </div>

          {ai.repeatViolation && (
            <div className="flex items-center gap-1 text-xs text-status-reported font-medium">
              <RotateCcw className="h-3 w-3" /> Repeat Violation Detected
            </div>
          )}
          {ai.delayedAction && (
            <div className="flex items-center gap-1 text-xs text-status-pending font-medium">
              <AlertTriangle className="h-3 w-3" /> ⚠ Delayed Action Detected
            </div>
          )}

          <Button
            size="sm"
            className="w-full gap-2"
            variant="outline"
            onClick={() => acceptAIRecommendation(complaint.id)}
          >
            <Zap className="h-3 w-3" /> Accept AI Recommendation
          </Button>
        </CardContent>
      </Card>

      {/* Section 3: Officer Actions */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h4 className="font-semibold text-sm">Officer Actions</h4>

          <div>
            <label className="text-xs text-muted-foreground">Assign Department</label>
            <Select value={complaint.assignedDept || ""} onValueChange={(v) => assignDept(complaint.id, v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select department" /></SelectTrigger>
              <SelectContent>
                {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Assign Officer</label>
            <Select value={complaint.assignedOfficer || ""} onValueChange={(v) => assignOfficer(complaint.id, v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select officer" /></SelectTrigger>
              <SelectContent>
                {officers.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Change Status</label>
            <Select value={complaint.status} onValueChange={(v) => updateStatus(complaint.id, v as any)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
