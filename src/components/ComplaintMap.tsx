import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Complaint } from "@/data/mockData";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const priorityColors: Record<string, string> = {
  HIGH: "#ef4444",
  MEDIUM: "#f59e0b",
  LOW: "#22c55e",
};

function createIcon(priority: string) {
  const color = priorityColors[priority] || "#3b82f6";
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background:${color};width:22px;height:22px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

interface Props {
  complaints: Complaint[];
  onMarkerClick?: (c: Complaint) => void;
}

export function ComplaintMap({ complaints, onMarkerClick }: Props) {
  return (
    <MapContainer center={[28.6139, 77.2090]} zoom={11} className="h-full w-full z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {complaints.map((c) => (
        <Marker
          key={c.id}
          position={[c.lat, c.lng]}
          icon={createIcon(c.priority)}
          eventHandlers={{ click: () => onMarkerClick?.(c) }}
        >
          <Popup>
            <div className="text-xs space-y-1 min-w-[160px]">
              <p className="font-bold">{c.id}</p>
              <p>{c.location}</p>
              <p><span className="font-medium">Priority:</span> <span style={{ color: priorityColors[c.priority] }}>{c.priority}</span></p>
              <p><span className="font-medium">Status:</span> {c.status}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
