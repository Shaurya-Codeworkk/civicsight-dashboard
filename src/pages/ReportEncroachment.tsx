import { useState, useCallback } from "react";
import { useCivic } from "@/context/CivicContext";
import { EncroachmentCase, categories, wardNames, EncroachmentCategory } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { toast } from "sonner";
import { CheckCircle2, MapPin } from "lucide-react";

function LocationPicker({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function ReportEncroachment() {
  const { addCase } = useCivic();
  const [location, setLocation] = useState("");
  const [ward, setWard] = useState("");
  const [category, setCategory] = useState<EncroachmentCategory | "">("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [lastId, setLastId] = useState("");

  const handleMapClick = useCallback((lat: number, lng: number) => {
    setLat(lat);
    setLng(lng);
  }, []);

  const handleSubmit = () => {
    if (!location || !ward || !category || !description || lat === null || lng === null) {
      toast.error("Please fill all fields and select a location on the map.");
      return;
    }
    const id = `ENC-2026-${String(Date.now()).slice(-3)}`;
    const newCase: EncroachmentCase = {
      id,
      location,
      ward,
      lat,
      lng,
      status: "Reported",
      category: category as EncroachmentCategory,
      dateReported: new Date().toISOString().split("T")[0],
      description,
      officerNotes: "",
      assignedOfficer: "Unassigned",
      beforeImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
      afterImage: "",
      timeline: [{ date: new Date().toISOString().split("T")[0], label: "Complaint Reported", description: "Filed via citizen portal" }],
    };
    addCase(newCase);
    setLastId(id);
    setSubmitted(true);
    toast.success(`Complaint ${id} registered successfully!`);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3rem)]">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-status-cleared mx-auto" />
            <h2 className="text-xl font-bold">Report Submitted!</h2>
            <p className="text-muted-foreground">Your complaint ID is <span className="font-mono font-bold text-foreground">{lastId}</span></p>
            <p className="text-sm text-muted-foreground">Your report is now visible on the Command Center dashboard.</p>
            <Button onClick={() => { setSubmitted(false); setLocation(""); setDescription(""); setLat(null); setLng(null); }}>
              Submit Another Report
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <div>
        <h1 className="text-xl font-bold">Report Encroachment</h1>
        <p className="text-sm text-muted-foreground">Help your city by reporting unauthorized encroachments</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Complaint Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs">Location Name</Label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., MG Road & 5th Cross" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Ward</Label>
                <Select value={ward} onValueChange={setWard}>
                  <SelectTrigger><SelectValue placeholder="Select ward" /></SelectTrigger>
                  <SelectContent>
                    {wardNames.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as EncroachmentCategory)}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the encroachment..." rows={3} />
            </div>
            <div>
              <Label className="text-xs">Photo Upload</Label>
              <Input type="file" accept="image/*" className="text-xs" />
              <p className="text-[10px] text-muted-foreground mt-1">Upload a photo of the encroachment</p>
            </div>
            <Button className="w-full" onClick={handleSubmit}>Submit Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-1">
              <MapPin className="h-4 w-4" /> Select Location on Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 rounded-lg overflow-hidden">
              <MapContainer center={[19.072, 72.877]} zoom={13} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker onSelect={handleMapClick} />
                {lat !== null && lng !== null && <Marker position={[lat, lng]} />}
              </MapContainer>
            </div>
            {lat !== null && (
              <p className="text-xs text-muted-foreground mt-2">
                📍 Selected: {lat.toFixed(4)}, {lng!.toFixed(4)}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
