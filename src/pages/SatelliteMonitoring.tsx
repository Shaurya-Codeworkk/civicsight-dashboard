import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Satellite, AlertTriangle, Eye } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";

const satelliteData = [
  {
    id: "SAT-001",
    zone: "Zone A - Commercial District",
    detectedOn: "2026-03-01",
    type: "New Construction",
    confidence: 94,
    beforeImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
  },
  {
    id: "SAT-002",
    zone: "Zone B - Residential Area",
    detectedOn: "2026-02-28",
    type: "Land Use Change",
    confidence: 87,
    beforeImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
  },
  {
    id: "SAT-003",
    zone: "Zone C - Green Belt",
    detectedOn: "2026-03-05",
    type: "Unauthorized Structure",
    confidence: 91,
    beforeImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop",
  },
];

export default function SatelliteMonitoring() {
  const [selectedZone, setSelectedZone] = useState(0);

  return (
    <PageTransition>
      <div className="p-4 space-y-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow-sm">
            <Satellite className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Satellite Monitoring Module</h1>
            <p className="text-sm text-muted-foreground">Concept demonstration — Automated encroachment detection via satellite imagery</p>
          </div>
          <Badge variant="outline" className="ml-auto text-xs">DEMO MODULE</Badge>
        </div>

        <div className="bg-muted/50 border border-border/60 rounded-lg p-3 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-status-pending shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            This module demonstrates how satellite imagery analysis could be integrated for automated encroachment detection.
            Images shown are illustrative. In production, this would connect to satellite imagery APIs and use computer vision for change detection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {satelliteData.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-200 ${selectedZone === i ? "ring-2 ring-primary shadow-md" : "hover:shadow-md border-border/60"}`}
                onClick={() => setSelectedZone(i)}
              >
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{d.id}</Badge>
                    <span className="text-xs font-mono text-muted-foreground">{d.detectedOn}</span>
                  </div>
                  <p className="font-medium text-sm">{d.zone}</p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-status-reported/10 text-status-reported border-status-reported text-xs">{d.type}</Badge>
                    <span className="text-xs font-bold text-primary">{d.confidence}% match</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="shadow-sm border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Change Detection — {satelliteData[selectedZone].zone}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BeforeAfterSlider
              beforeImage={satelliteData[selectedZone].beforeImage}
              afterImage={satelliteData[selectedZone].afterImage}
              beforeLabel="Baseline Imagery"
              afterLabel="Latest Capture"
            />
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Detection Type</p>
                <p className="font-bold text-sm">{satelliteData[selectedZone].type}</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Confidence</p>
                <p className="font-bold text-sm">{satelliteData[selectedZone].confidence}%</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Detected On</p>
                <p className="font-bold text-sm">{satelliteData[selectedZone].detectedOn}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
