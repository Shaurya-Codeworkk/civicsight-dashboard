import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { EncroachmentCase } from "@/data/mockData";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const statusColors: Record<string, string> = {
  Reported: "#ef4444",
  Pending: "#f59e0b",
  Scheduled: "#3b82f6",
  Cleared: "#22c55e",
};

function createColoredIcon(color: string) {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background:${color};width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

interface MapViewProps {
  cases: EncroachmentCase[];
  onMarkerClick?: (c: EncroachmentCase) => void;
  center?: [number, number];
  zoom?: number;
  showHeatmap?: boolean;
}

function HeatmapLayer({ cases }: { cases: EncroachmentCase[] }) {
  const map = useMap();

  useEffect(() => {
    const points = cases.map((c) => [c.lat, c.lng, 0.8] as [number, number, number]);
    // @ts-ignore - leaflet.heat types
    const heat = L.heatLayer(points, { radius: 35, blur: 25, maxZoom: 17 });
    heat.addTo(map);
    return () => { map.removeLayer(heat); };
  }, [map, cases]);

  return null;
}

export function MapView({ cases, onMarkerClick, center = [19.072, 72.877], zoom = 14, showHeatmap = false }: MapViewProps) {
  return (
    <MapContainer center={center} zoom={zoom} className="h-full w-full rounded-lg z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showHeatmap && <HeatmapLayer cases={cases} />}
      {!showHeatmap &&
        cases.map((c) => (
          <Marker
            key={c.id}
            position={[c.lat, c.lng]}
            icon={createColoredIcon(statusColors[c.status])}
            eventHandlers={{ click: () => onMarkerClick?.(c) }}
          >
            <Popup>
              <div className="text-xs space-y-1 min-w-[180px]">
                <p className="font-bold">{c.id}</p>
                <p>{c.location}</p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span style={{ color: statusColors[c.status] }}>{c.status}</span>
                </p>
                <p><span className="font-medium">Category:</span> {c.category}</p>
                <p><span className="font-medium">Reported:</span> {c.dateReported}</p>
                <img src={c.beforeImage} alt="Preview" className="w-full rounded mt-1" />
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
