import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  colorClass?: string;
}

export function StatCard({ title, value, icon: Icon, trend, colorClass = "text-primary" }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
            <p className={`text-2xl font-bold mt-1 ${colorClass}`}>{value}</p>
            {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
          </div>
          <div className={`h-10 w-10 rounded-lg flex items-center justify-center bg-muted ${colorClass}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
