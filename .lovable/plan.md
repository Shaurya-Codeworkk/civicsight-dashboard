

# CivicSight – Encroachment Transparency Intelligence Platform

A hackathon-ready civic technology dashboard for monitoring illegal encroachments and ensuring transparency in municipal enforcement.

## Design & Layout
- **Municipal command center** aesthetic with a dark navy/slate sidebar, clean white content area, and accent colors (amber for pending, green for cleared, blue for scheduled)
- Sidebar navigation with icons for all modules
- Professional government-portal feel with data-dense cards and map-focused homepage

## Pages & Features

### 1. City Command Center (Homepage)
- Full-width Leaflet/OpenStreetMap with color-coded markers for ~15 demo encroachment cases
- Stat cards: Total Reports, Pending, Scheduled, Cleared
- Filters by ward, status, and category
- Clicking a marker opens a slide-out panel with case details, timeline, images, and officer notes

### 2. Encroachment Heatmap
- Leaflet heatmap overlay showing high-density encroachment zones across wards
- Toggle between marker view and heatmap view

### 3. Citizen Report Page
- Form: photo upload, location name, map pin picker, description, encroachment type dropdown
- Auto-generates complaint ID on submit, adds to mock data store, appears on dashboard instantly

### 4. Transparency Board
- **Upcoming Demolition Drives** table: date, location, reason, officer
- **Completed Actions** with before/after photo comparison slider
- Public disclosure portal styling

### 5. Case Manager (Admin)
- Table of all complaints with status badges
- Inline actions: update status, assign officer, upload resolution image, mark cleared
- No auth required

### 6. Analytics Dashboard
- Recharts: encroachments per ward (bar), pending vs cleared (pie), monthly trends (line), category distribution (donut)
- Summary stat cards

### 7. Ward Transparency Leaderboard
- Score each ward based on cases reported, resolved, and resolution speed
- Ranked leaderboard with progress bars

### 8. AI Governance Report
- "Generate Ward Transparency Report" button
- Produces a formatted report with hotspots, efficiency metrics, scores, and policy recommendations
- Uses mock logic to generate realistic-looking report content

### 9. Satellite Monitoring (Demo)
- Before/after aerial imagery comparison with slider
- Mock detected encroachment overlay markers
- Labeled as concept demonstration

## Technical Approach
- **All data**: In-memory mock data store with React context, pre-populated with ~15 diverse demo cases
- **Maps**: Leaflet + OpenStreetMap (free, no API key needed) + leaflet.heat for heatmap
- **Charts**: Recharts (already installed)
- **Before/After Slider**: Custom CSS clip-path comparison component
- **State**: React Context for global case data so reports appear instantly on dashboard
- **No backend needed** – everything runs client-side with mock data

