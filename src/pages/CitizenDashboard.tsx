import { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useComplaints } from "@/context/ComplaintContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { toast } from "sonner";
import { Plus, Star, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Category, categories, delhiAreas, Complaint } from "@/data/mockData";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function LocationPicker({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({ click(e) { onSelect(e.latlng.lat, e.latlng.lng); } });
  return null;
}

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  Pending: { color: "bg-status-pending text-primary-foreground", icon: <Clock className="h-3 w-3" /> },
  "In Progress": { color: "bg-status-scheduled text-primary-foreground", icon: <AlertTriangle className="h-3 w-3" /> },
  Resolved: { color: "bg-status-cleared text-primary-foreground", icon: <CheckCircle2 className="h-3 w-3" /> },
};

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} onClick={() => onChange(s)} className="focus:outline-none">
          <Star className={`h-5 w-5 transition-colors ${s <= value ? "text-status-pending fill-status-pending" : "text-muted-foreground/30"}`} />
        </button>
      ))}
    </div>
  );
}

export default function CitizenDashboard() {
  const { user } = useAuth();
  const { complaints, addComplaint, rateComplaint } = useComplaints();
  const [showForm, setShowForm] = useState(false);
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const myComplaints = useMemo(
    () => complaints.filter((c) => c.reportedBy === user?.email),
    [complaints, user]
  );

  const handleSubmit = () => {
    if (!location || !area || !category || !description || lat === null || lng === null) {
      toast.error("Please fill all fields and select a location on the map.");
      return;
    }
    const id = `ENC-2026-${String(Date.now()).slice(-4)}`;
    const newComplaint: Omit<Complaint, "aiInsights"> = {
      id, location, area, lat, lng,
      category: category as Category,
      status: "Pending",
      priority: "MEDIUM",
      description,
      reportedBy: user?.email || "",
      reportedAt: new Date().toISOString().split("T")[0],
      isRead: false,
      nearHospital: false,
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
    };
    addComplaint(newComplaint);
    toast.success(`Complaint ${id} registered!`);
    setShowForm(false);
    setLocation(""); setDescription(""); setLat(null); setLng(null); setArea(""); setCategory("");
  };

  return (
    <PageTransition>
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Citizen Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user?.name}</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" /> Report Encroachment
          </Button>
        </div>

        {showForm && (
          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">New Complaint</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">Location Name</Label>
                    <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Connaught Place Block A" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Area</Label>
                      <Select value={area} onValueChange={setArea}>
                        <SelectTrigger><SelectValue placeholder="Select area" /></SelectTrigger>
                        <SelectContent>
                          {delhiAreas.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Category</Label>
                      <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                        <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
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
                  </div>
                  <Button className="w-full" onClick={handleSubmit}>Submit Report</Button>
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Select Location on Map (Delhi)</Label>
                  <div className="h-72 rounded-lg overflow-hidden border">
                    <MapContainer center={[28.6139, 77.2090]} zoom={11} className="h-full w-full">
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <LocationPicker onSelect={(la, ln) => { setLat(la); setLng(ln); }} />
                      {lat !== null && lng !== null && <Marker position={[lat, lng]} />}
                    </MapContainer>
                  </div>
                  {lat !== null && <p className="text-xs text-muted-foreground mt-1">📍 {lat.toFixed(4)}, {lng!.toFixed(4)}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div>
          <h2 className="text-lg font-semibold mb-3">My Complaints</h2>
          {myComplaints.length === 0 ? (
            <Card><CardContent className="p-8 text-center text-muted-foreground">No complaints filed yet.</CardContent></Card>
          ) : (
            <div className="grid gap-3">
              {myComplaints.map((c) => (
                <Card key={c.id} className="hover-scale">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <img src={c.image} alt="" className="w-20 h-16 rounded object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-semibold">{c.id}</span>
                          <Badge className={statusConfig[c.status]?.color || ""}>
                            {statusConfig[c.status]?.icon} <span className="ml-1">{c.status}</span>
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">{c.category}</Badge>
                        </div>
                        <p className="text-sm font-medium truncate">{c.location}</p>
                        <p className="text-xs text-muted-foreground">{c.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Area: {c.area}</span>
                          <span>Reported: {c.reportedAt}</span>
                          {c.assignedOfficer && <span>Officer: {c.assignedOfficer}</span>}
                        </div>
                      </div>
                    </div>
                    {c.status === "Resolved" && (
                      <div className="mt-3 pt-3 border-t flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">Rate resolution:</span>
                        <StarRating
                          value={c.citizenRating || 0}
                          onChange={(v) => rateComplaint(c.id, v)}
                        />
                        {c.citizenRating && <span className="text-xs text-muted-foreground">({c.citizenRating}/5)</span>}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
