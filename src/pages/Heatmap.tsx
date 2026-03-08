import { useState } from "react";
import { useCivic } from "@/context/CivicContext";
import { MapView } from "@/components/MapView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Heatmap() {
  const { cases } = useCivic();
  const [showHeatmap, setShowHeatmap] = useState(true);

  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Encroachment Heatmap</h1>
          <p className="text-sm text-muted-foreground">High-density encroachment zone visualization</p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="heatmap-toggle" className="text-sm">Heatmap</Label>
          <Switch id="heatmap-toggle" checked={showHeatmap} onCheckedChange={setShowHeatmap} />
          <Label htmlFor="heatmap-toggle" className="text-sm">Markers</Label>
        </div>
      </div>
      <div className="flex-1 px-4 pb-4">
        <MapView cases={cases} showHeatmap={showHeatmap} />
      </div>
    </div>
  );
}
