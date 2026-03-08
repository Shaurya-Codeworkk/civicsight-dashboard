import { TimelineEvent } from "@/data/mockData";
import { CheckCircle2, Circle } from "lucide-react";

interface CaseTimelineProps {
  events: TimelineEvent[];
}

export function CaseTimeline({ events }: CaseTimelineProps) {
  return (
    <div className="space-y-0">
      {events.map((event, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            {i === events.length - 1 ? (
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
            )}
            {i < events.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
          </div>
          <div className="pb-4">
            <p className="text-sm font-medium">{event.label}</p>
            <p className="text-xs text-muted-foreground">{event.date}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
