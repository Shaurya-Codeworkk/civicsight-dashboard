export type CaseStatus = "Reported" | "Pending" | "Scheduled" | "Cleared";
export type EncroachmentCategory = "Roadside Vendor" | "Unauthorized Construction" | "Parking Encroachment" | "Market Extension" | "Temporary Structure" | "Illegal Hoarding";

export interface TimelineEvent {
  date: string;
  label: string;
  description: string;
}

export interface EncroachmentCase {
  id: string;
  location: string;
  ward: string;
  lat: number;
  lng: number;
  status: CaseStatus;
  category: EncroachmentCategory;
  dateReported: string;
  description: string;
  officerNotes: string;
  assignedOfficer: string;
  beforeImage: string;
  afterImage: string;
  timeline: TimelineEvent[];
}

const placeholderBefore = "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop";
const placeholderAfter = "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop";

export const initialCases: EncroachmentCase[] = [
  {
    id: "ENC-2026-001",
    location: "MG Road & 5th Cross Junction",
    ward: "Ward 1",
    lat: 19.076,
    lng: 72.8777,
    status: "Pending",
    category: "Roadside Vendor",
    dateReported: "2026-02-15",
    description: "Cluster of 12 unauthorized vendor stalls blocking pedestrian walkway and encroaching on road.",
    officerNotes: "Notices issued. Vendors given 7 days to vacate.",
    assignedOfficer: "Inspector R. Sharma",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2026-02-15", label: "Complaint Reported", description: "Citizen filed report via online portal" },
      { date: "2026-02-18", label: "Inspection Scheduled", description: "Ward officer assigned for site visit" },
      { date: "2026-02-20", label: "Inspection Completed", description: "12 stalls verified. Notices issued." },
    ],
  },
  {
    id: "ENC-2026-002",
    location: "Lajpat Nagar Market Extension",
    ward: "Ward 3",
    lat: 19.082,
    lng: 72.885,
    status: "Scheduled",
    category: "Market Extension",
    dateReported: "2026-01-28",
    description: "Unauthorized market extension into residential zone. 8 shops built without permits.",
    officerNotes: "Demolition drive scheduled for March 15.",
    assignedOfficer: "Officer K. Patel",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2026-01-28", label: "Complaint Reported", description: "Filed by resident association" },
      { date: "2026-02-05", label: "Inspection Completed", description: "8 unauthorized structures confirmed" },
      { date: "2026-02-20", label: "Demolition Ordered", description: "Municipal commissioner approved action" },
      { date: "2026-03-15", label: "Demolition Scheduled", description: "Drive planned with police support" },
    ],
  },
  {
    id: "ENC-2026-003",
    location: "Sector 12 Parking Lot",
    ward: "Ward 2",
    lat: 19.07,
    lng: 72.87,
    status: "Cleared",
    category: "Parking Encroachment",
    dateReported: "2025-12-10",
    description: "Commercial vehicles parked illegally on residential road blocking emergency access.",
    officerNotes: "Area cleared. CCTV installed for monitoring.",
    assignedOfficer: "Inspector M. Singh",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2025-12-10", label: "Complaint Reported", description: "Emergency services flagged access issue" },
      { date: "2025-12-12", label: "Inspection Completed", description: "15 commercial vehicles identified" },
      { date: "2025-12-15", label: "Enforcement Action", description: "Vehicles towed, fines imposed" },
      { date: "2025-12-20", label: "Encroachment Cleared", description: "Area restored, CCTV monitoring active" },
      { date: "2025-12-25", label: "Verification Uploaded", description: "After-clearance photos submitted" },
    ],
  },
  {
    id: "ENC-2026-004",
    location: "Gandhi Chowk Roundabout",
    ward: "Ward 1",
    lat: 19.078,
    lng: 72.882,
    status: "Reported",
    category: "Temporary Structure",
    dateReported: "2026-03-01",
    description: "Temporary tin shed constructed on public land near roundabout causing traffic bottleneck.",
    officerNotes: "",
    assignedOfficer: "Unassigned",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2026-03-01", label: "Complaint Reported", description: "Traffic police forwarded complaint" },
    ],
  },
  {
    id: "ENC-2026-005",
    location: "Nehru Street, Block C",
    ward: "Ward 4",
    lat: 19.065,
    lng: 72.875,
    status: "Pending",
    category: "Unauthorized Construction",
    dateReported: "2026-02-08",
    description: "Two-story unauthorized construction on government land adjacent to school.",
    officerNotes: "Legal notice served. Court hearing pending.",
    assignedOfficer: "Officer A. Gupta",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2026-02-08", label: "Complaint Reported", description: "School administration filed complaint" },
      { date: "2026-02-12", label: "Inspection Completed", description: "Confirmed unauthorized 2-story construction" },
      { date: "2026-02-18", label: "Legal Notice Served", description: "14-day notice to demolish issued" },
    ],
  },
  {
    id: "ENC-2026-006",
    location: "Marine Drive Promenade",
    ward: "Ward 5",
    lat: 19.06,
    lng: 72.865,
    status: "Cleared",
    category: "Roadside Vendor",
    dateReported: "2025-11-20",
    description: "Food cart vendors encroaching on promenade walkway. 20+ carts blocking pedestrian path.",
    officerNotes: "Relocated to designated hawker zone.",
    assignedOfficer: "Inspector P. Joshi",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2025-11-20", label: "Complaint Reported", description: "Tourism board filed complaint" },
      { date: "2025-11-25", label: "Inspection Completed", description: "23 carts counted on promenade" },
      { date: "2025-12-01", label: "Relocation Order", description: "Hawker zone allocated at Sector 8" },
      { date: "2025-12-10", label: "Encroachment Cleared", description: "All carts relocated successfully" },
      { date: "2025-12-12", label: "Verification Uploaded", description: "Promenade restoration confirmed" },
    ],
  },
  {
    id: "ENC-2026-007",
    location: "Industrial Area Phase 2",
    ward: "Ward 3",
    lat: 19.085,
    lng: 72.89,
    status: "Scheduled",
    category: "Illegal Hoarding",
    dateReported: "2026-02-01",
    description: "15 illegal advertising hoardings installed on government property without permits.",
    officerNotes: "Removal drive scheduled. Contractors engaged.",
    assignedOfficer: "Officer S. Reddy",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2026-02-01", label: "Complaint Reported", description: "Ward councillor flagged issue" },
      { date: "2026-02-10", label: "Survey Completed", description: "15 illegal hoardings mapped" },
      { date: "2026-03-05", label: "Removal Scheduled", description: "Crane and team arranged for March 20" },
    ],
  },
  {
    id: "ENC-2026-008",
    location: "Station Road Flyover",
    ward: "Ward 2",
    lat: 19.073,
    lng: 72.872,
    status: "Pending",
    category: "Temporary Structure",
    dateReported: "2026-02-25",
    description: "Makeshift shelters under flyover blocking drain and causing waterlogging.",
    officerNotes: "Social welfare department notified for rehabilitation.",
    assignedOfficer: "Inspector D. Kumar",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2026-02-25", label: "Complaint Reported", description: "PWD reported drain blockage" },
      { date: "2026-02-28", label: "Inspection Completed", description: "Identified 8 structures blocking drainage" },
    ],
  },
  {
    id: "ENC-2026-009",
    location: "Ambedkar Nagar Main Road",
    ward: "Ward 4",
    lat: 19.068,
    lng: 72.88,
    status: "Cleared",
    category: "Market Extension",
    dateReported: "2026-01-05",
    description: "Shopkeepers extended their storefronts onto the sidewalk reducing pedestrian space.",
    officerNotes: "Encroachments removed. Regular monitoring setup.",
    assignedOfficer: "Officer V. Mehta",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2026-01-05", label: "Complaint Reported", description: "Multiple citizen complaints" },
      { date: "2026-01-10", label: "Notices Issued", description: "30 shops served encroachment notices" },
      { date: "2026-01-25", label: "Enforcement Action", description: "Extensions demolished by municipal crew" },
      { date: "2026-01-28", label: "Encroachment Cleared", description: "Full sidewalk width restored" },
      { date: "2026-02-01", label: "Verification Uploaded", description: "Weekly monitoring initiated" },
    ],
  },
  {
    id: "ENC-2026-010",
    location: "Civil Lines Park Boundary",
    ward: "Ward 1",
    lat: 19.08,
    lng: 72.879,
    status: "Reported",
    category: "Unauthorized Construction",
    dateReported: "2026-03-05",
    description: "Concrete boundary wall extended into public park reducing green space by 200 sq ft.",
    officerNotes: "",
    assignedOfficer: "Unassigned",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2026-03-05", label: "Complaint Reported", description: "Park maintenance staff reported" },
    ],
  },
  {
    id: "ENC-2026-011",
    location: "Rajendra Place Metro Station",
    ward: "Ward 5",
    lat: 19.058,
    lng: 72.868,
    status: "Pending",
    category: "Roadside Vendor",
    dateReported: "2026-02-20",
    description: "Vendor stalls obstructing metro station entry/exit causing safety hazard.",
    officerNotes: "Metro authority coordinating with municipal enforcement.",
    assignedOfficer: "Inspector N. Tiwari",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2026-02-20", label: "Complaint Reported", description: "Metro authority flagged safety concern" },
      { date: "2026-02-23", label: "Joint Inspection", description: "Metro + Municipal joint survey completed" },
    ],
  },
  {
    id: "ENC-2026-012",
    location: "Sarojini Market Lane 4",
    ward: "Ward 3",
    lat: 19.087,
    lng: 72.883,
    status: "Scheduled",
    category: "Parking Encroachment",
    dateReported: "2026-01-18",
    description: "Auto-rickshaw stand illegally set up on no-parking zone blocking fire hydrant access.",
    officerNotes: "Traffic police to enforce no-parking. Tow operation planned.",
    assignedOfficer: "Officer L. Desai",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2026-01-18", label: "Complaint Reported", description: "Fire department reported hydrant blockage" },
      { date: "2026-01-22", label: "Warning Issued", description: "Auto-rickshaw union notified" },
      { date: "2026-02-10", label: "Tow Operation Scheduled", description: "Joint action with traffic police on March 10" },
    ],
  },
  {
    id: "ENC-2026-013",
    location: "Connaught Circle Inner Ring",
    ward: "Ward 2",
    lat: 19.071,
    lng: 72.876,
    status: "Cleared",
    category: "Illegal Hoarding",
    dateReported: "2025-12-01",
    description: "Massive 40ft illegal hoarding on heritage building facade violating heritage zone rules.",
    officerNotes: "Hoarding removed. Fine of ₹2,00,000 imposed on advertiser.",
    assignedOfficer: "Inspector G. Saxena",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2025-12-01", label: "Complaint Reported", description: "Heritage conservation committee" },
      { date: "2025-12-05", label: "Heritage Violation Confirmed", description: "Building survey completed" },
      { date: "2025-12-12", label: "Court Order Obtained", description: "Immediate removal ordered" },
      { date: "2025-12-18", label: "Hoarding Removed", description: "40ft hoarding taken down by crane" },
      { date: "2025-12-20", label: "Verification Uploaded", description: "Building facade restored" },
    ],
  },
  {
    id: "ENC-2026-014",
    location: "Ring Road Service Lane",
    ward: "Ward 5",
    lat: 19.055,
    lng: 72.862,
    status: "Reported",
    category: "Temporary Structure",
    dateReported: "2026-03-07",
    description: "Construction material dump and temporary worker sheds on service lane blocking traffic.",
    officerNotes: "",
    assignedOfficer: "Unassigned",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2026-03-07", label: "Complaint Reported", description: "Commuter complaint via app" },
    ],
  },
  {
    id: "ENC-2026-015",
    location: "Patel Nagar Community Ground",
    ward: "Ward 4",
    lat: 19.063,
    lng: 72.878,
    status: "Pending",
    category: "Unauthorized Construction",
    dateReported: "2026-02-12",
    description: "Commercial shop constructed on community playground land without municipal approval.",
    officerNotes: "Show cause notice issued. Awaiting response.",
    assignedOfficer: "Officer B. Chauhan",
    beforeImage: placeholderBefore,
    afterImage: placeholderAfter,
    timeline: [
      { date: "2026-02-12", label: "Complaint Reported", description: "RWA president filed complaint" },
      { date: "2026-02-16", label: "Inspection Completed", description: "Unauthorized commercial construction confirmed" },
      { date: "2026-02-22", label: "Show Cause Notice", description: "14-day notice to respond issued" },
    ],
  },
];

export const demolitionDrives = [
  { date: "2026-03-15", location: "Lajpat Nagar Market Extension", reason: "Unauthorized market construction", officer: "Officer K. Patel", caseId: "ENC-2026-002" },
  { date: "2026-03-20", location: "Industrial Area Phase 2", reason: "Illegal hoardings removal", officer: "Officer S. Reddy", caseId: "ENC-2026-007" },
  { date: "2026-03-10", location: "Sarojini Market Lane 4", reason: "Illegal parking stand removal", officer: "Officer L. Desai", caseId: "ENC-2026-012" },
  { date: "2026-04-01", location: "Nehru Street, Block C", reason: "Unauthorized construction demolition", officer: "Officer A. Gupta", caseId: "ENC-2026-005" },
];

export const completedActions = [
  { location: "Sector 12 Parking Lot", count: 15, caseId: "ENC-2026-003", date: "2025-12-20" },
  { location: "Marine Drive Promenade", count: 23, caseId: "ENC-2026-006", date: "2025-12-10" },
  { location: "Ambedkar Nagar Main Road", count: 30, caseId: "ENC-2026-009", date: "2026-01-28" },
  { location: "Connaught Circle Inner Ring", count: 1, caseId: "ENC-2026-013", date: "2025-12-18" },
];

export const wardNames = ["Ward 1", "Ward 2", "Ward 3", "Ward 4", "Ward 5"];
export const categories: EncroachmentCategory[] = ["Roadside Vendor", "Unauthorized Construction", "Parking Encroachment", "Market Extension", "Temporary Structure", "Illegal Hoarding"];
export const statuses: CaseStatus[] = ["Reported", "Pending", "Scheduled", "Cleared"];
