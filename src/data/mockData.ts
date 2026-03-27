export type CaseStatus = "Pending" | "In Progress" | "Resolved";
export type Priority = "HIGH" | "MEDIUM" | "LOW";
export type Category = "Parking" | "Vendor" | "Blockage" | "Building";

export interface AIInsights {
  detectedType: string;
  prioritySuggestion: Priority;
  repeatCount: number;
  nearbyComplaints: number;
  emergencyRisk: boolean;
  delayedAction: boolean;
  repeatViolation: boolean;
}

export interface Complaint {
  id: string;
  image: string;
  location: string;
  lat: number;
  lng: number;
  category: Category;
  status: CaseStatus;
  priority: Priority;
  description: string;
  reportedBy: string;
  reportedAt: string;
  assignedDept?: string;
  assignedOfficer?: string;
  isRead: boolean;
  area: string;
  nearHospital: boolean;
  citizenRating?: number;
  aiInsights: AIInsights;
}

// Delhi zones
export const delhiAreas = [
  "Connaught Place",
  "Karol Bagh",
  "Chandni Chowk",
  "Lajpat Nagar",
  "Saket",
  "Dwarka",
  "Rohini",
  "Pitampura",
  "Janakpuri",
  "Vasant Kunj",
  "Hauz Khas",
  "Rajouri Garden",
];

export const departments = ["Traffic Police", "MCD", "DDA"];
export const officers = [
  "Inspector R. Sharma",
  "Officer K. Patel",
  "Inspector M. Singh",
  "Officer A. Gupta",
  "Inspector P. Joshi",
  "Officer S. Reddy",
  "Inspector D. Kumar",
  "Officer V. Mehta",
];

export const categories: Category[] = ["Parking", "Vendor", "Blockage", "Building"];

function computeAI(c: Pick<Complaint, "category" | "nearHospital" | "area" | "status" | "reportedAt">, allComplaints: Pick<Complaint, "area" | "location">[]): AIInsights {
  let priority: Priority = "LOW";
  if (c.category === "Blockage" || c.nearHospital) priority = "HIGH";
  else if (c.category === "Parking" || c.category === "Vendor") priority = "MEDIUM";

  const sameArea = allComplaints.filter((x) => x.area === c.area).length;
  const repeatCount = sameArea > 2 ? sameArea : 0;
  const daysSinceReport = Math.floor((Date.now() - new Date(c.reportedAt).getTime()) / 86400000);
  const delayedAction = c.status === "Pending" && daysSinceReport > 7;

  const typeMap: Record<Category, string> = {
    Parking: "Illegal Parking Encroachment",
    Vendor: "Unauthorized Street Vending",
    Blockage: "Road/Path Blockage",
    Building: "Unauthorized Construction",
  };

  return {
    detectedType: typeMap[c.category],
    prioritySuggestion: priority,
    repeatCount,
    nearbyComplaints: Math.max(0, sameArea - 1),
    emergencyRisk: priority === "HIGH" && c.nearHospital,
    delayedAction,
    repeatViolation: repeatCount > 2,
  };
}

const images = [
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=600&h=400&fit=crop",
];

const rawComplaints: Omit<Complaint, "aiInsights">[] = [
  {
    id: "ENC-2026-001", image: images[0], location: "Connaught Place, Block A",
    lat: 28.6315, lng: 77.2167, category: "Vendor", status: "Pending", priority: "MEDIUM",
    description: "Cluster of 12 unauthorized vendor stalls blocking pedestrian walkway near metro exit.",
    reportedBy: "test@public.com", reportedAt: "2026-03-10", assignedDept: "MCD",
    assignedOfficer: "Inspector R. Sharma", isRead: true, area: "Connaught Place", nearHospital: false,
  },
  {
    id: "ENC-2026-002", image: images[1], location: "Chandni Chowk Main Road",
    lat: 28.6562, lng: 77.2310, category: "Blockage", status: "Pending", priority: "HIGH",
    description: "Road completely blocked by construction debris dumped overnight near hospital entrance.",
    reportedBy: "test@public.com", reportedAt: "2026-03-05", isRead: false,
    area: "Chandni Chowk", nearHospital: true,
  },
  {
    id: "ENC-2026-003", image: images[2], location: "Lajpat Nagar Market Extension",
    lat: 28.5700, lng: 77.2373, category: "Building", status: "In Progress", priority: "MEDIUM",
    description: "Unauthorized second floor extension on existing shop, encroaching on neighbor's space.",
    reportedBy: "citizen2@example.com", reportedAt: "2026-02-20", assignedDept: "DDA",
    assignedOfficer: "Officer A. Gupta", isRead: true, area: "Lajpat Nagar", nearHospital: false,
  },
  {
    id: "ENC-2026-004", image: images[3], location: "Karol Bagh Ajmal Khan Road",
    lat: 28.6519, lng: 77.1909, category: "Parking", status: "Resolved", priority: "MEDIUM",
    description: "Permanent car parking encroachment on public sidewalk, 8 vehicles blocking pedestrian path.",
    reportedBy: "test@public.com", reportedAt: "2026-01-15", assignedDept: "Traffic Police",
    assignedOfficer: "Inspector M. Singh", isRead: true, area: "Karol Bagh", nearHospital: false,
    citizenRating: 4,
  },
  {
    id: "ENC-2026-005", image: images[0], location: "Saket District Centre",
    lat: 28.5245, lng: 77.2066, category: "Vendor", status: "Pending", priority: "MEDIUM",
    description: "Street food vendors occupying entire footpath near Select Citywalk mall entrance.",
    reportedBy: "citizen3@example.com", reportedAt: "2026-03-12", isRead: false,
    area: "Saket", nearHospital: false,
  },
  {
    id: "ENC-2026-006", image: images[1], location: "Dwarka Sector 12 Road",
    lat: 28.5921, lng: 77.0460, category: "Blockage", status: "In Progress", priority: "HIGH",
    description: "Construction material blocking main road lane causing severe traffic jam near hospital.",
    reportedBy: "test@public.com", reportedAt: "2026-03-01", assignedDept: "Traffic Police",
    assignedOfficer: "Officer K. Patel", isRead: true, area: "Dwarka", nearHospital: true,
  },
  {
    id: "ENC-2026-007", image: images[2], location: "Rohini Sector 3 Market",
    lat: 28.7159, lng: 77.1100, category: "Building", status: "Resolved", priority: "LOW",
    description: "Illegal extension of shop boundary wall into public drain area.",
    reportedBy: "citizen4@example.com", reportedAt: "2026-01-08", assignedDept: "MCD",
    assignedOfficer: "Inspector P. Joshi", isRead: true, area: "Rohini", nearHospital: false,
    citizenRating: 5,
  },
  {
    id: "ENC-2026-008", image: images[3], location: "Pitampura TV Tower Road",
    lat: 28.6979, lng: 77.1315, category: "Parking", status: "Pending", priority: "MEDIUM",
    description: "Auto-rickshaw stand illegally set up blocking fire hydrant and bus stop access.",
    reportedBy: "test@public.com", reportedAt: "2026-03-15", isRead: false,
    area: "Pitampura", nearHospital: false,
  },
  {
    id: "ENC-2026-009", image: images[0], location: "Janakpuri C Block Market",
    lat: 28.6219, lng: 77.0878, category: "Vendor", status: "Resolved", priority: "LOW",
    description: "Temporary hawker stalls removed after repeated complaints from local residents.",
    reportedBy: "citizen5@example.com", reportedAt: "2025-12-20", assignedDept: "MCD",
    assignedOfficer: "Officer S. Reddy", isRead: true, area: "Janakpuri", nearHospital: false,
    citizenRating: 3,
  },
  {
    id: "ENC-2026-010", image: images[1], location: "Hauz Khas Village Entry",
    lat: 28.5494, lng: 77.2001, category: "Blockage", status: "Pending", priority: "HIGH",
    description: "Restaurant tables and chairs completely blocking narrow heritage village lane.",
    reportedBy: "test@public.com", reportedAt: "2026-02-28", assignedDept: "MCD",
    assignedOfficer: "Officer V. Mehta", isRead: true, area: "Hauz Khas", nearHospital: false,
  },
  {
    id: "ENC-2026-011", image: images[2], location: "Connaught Place, Block F",
    lat: 28.6339, lng: 77.2195, category: "Vendor", status: "Pending", priority: "MEDIUM",
    description: "Juice and snack carts obstructing metro station exit path during peak hours.",
    reportedBy: "citizen6@example.com", reportedAt: "2026-03-08", isRead: false,
    area: "Connaught Place", nearHospital: false,
  },
  {
    id: "ENC-2026-012", image: images[3], location: "Rajouri Garden Main Market",
    lat: 28.6489, lng: 77.1217, category: "Building", status: "In Progress", priority: "MEDIUM",
    description: "Unauthorized mezzanine floor construction in commercial property.",
    reportedBy: "test@public.com", reportedAt: "2026-02-14", assignedDept: "DDA",
    assignedOfficer: "Inspector D. Kumar", isRead: true, area: "Rajouri Garden", nearHospital: false,
  },
  {
    id: "ENC-2026-013", image: images[0], location: "Connaught Place, Block B",
    lat: 28.6325, lng: 77.2180, category: "Parking", status: "Pending", priority: "MEDIUM",
    description: "Illegal car parking on pedestrian plaza in front of heritage building.",
    reportedBy: "test@public.com", reportedAt: "2026-03-18", isRead: false,
    area: "Connaught Place", nearHospital: false,
  },
  {
    id: "ENC-2026-014", image: images[1], location: "Vasant Kunj DDA Flats Road",
    lat: 28.5200, lng: 77.1567, category: "Blockage", status: "Resolved", priority: "HIGH",
    description: "Permanent shed blocking emergency vehicle access road near residential complex.",
    reportedBy: "citizen7@example.com", reportedAt: "2026-01-10", assignedDept: "MCD",
    assignedOfficer: "Inspector R. Sharma", isRead: true, area: "Vasant Kunj", nearHospital: true,
    citizenRating: 4,
  },
  {
    id: "ENC-2026-015", image: images[2], location: "Chandni Chowk, Nai Sarak",
    lat: 28.6580, lng: 77.2290, category: "Vendor", status: "Pending", priority: "MEDIUM",
    description: "Book vendors permanently occupying sidewalk, forcing pedestrians onto main road.",
    reportedBy: "test@public.com", reportedAt: "2026-03-20", isRead: false,
    area: "Chandni Chowk", nearHospital: false,
  },
];

// Compute AI insights for all complaints
export const initialComplaints: Complaint[] = rawComplaints.map((c) => ({
  ...c,
  aiInsights: computeAI(c, rawComplaints),
}));

export function generateAIInsights(complaint: Omit<Complaint, "aiInsights">, allComplaints: Complaint[]): AIInsights {
  return computeAI(complaint, allComplaints);
}

// Area performance
export interface AreaPerformance {
  area: string;
  totalCases: number;
  resolvedPercent: number;
  repeatViolations: number;
  riskLevel: "Low Risk" | "Medium Risk" | "High Encroachment Zone";
  score: number;
}

export function computeAreaPerformance(complaints: Complaint[]): AreaPerformance[] {
  const areaMap = new Map<string, Complaint[]>();
  complaints.forEach((c) => {
    const arr = areaMap.get(c.area) || [];
    arr.push(c);
    areaMap.set(c.area, arr);
  });

  return Array.from(areaMap.entries()).map(([area, cases]) => {
    const total = cases.length;
    const resolved = cases.filter((c) => c.status === "Resolved").length;
    const resolvedPercent = total > 0 ? Math.round((resolved / total) * 100) : 0;
    const repeats = cases.filter((c) => c.aiInsights.repeatViolation).length;
    const score = Math.max(0, 100 - (total * 10) + (resolvedPercent * 0.5) - (repeats * 15));

    let riskLevel: AreaPerformance["riskLevel"] = "Low Risk";
    if (score < 40) riskLevel = "High Encroachment Zone";
    else if (score < 70) riskLevel = "Medium Risk";

    return { area, totalCases: total, resolvedPercent, repeatViolations: repeats, riskLevel, score: Math.round(score) };
  }).sort((a, b) => a.score - b.score);
}
