import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CivicProvider } from "@/context/CivicContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Heatmap from "./pages/Heatmap";
import ReportEncroachment from "./pages/ReportEncroachment";
import TransparencyBoard from "./pages/TransparencyBoard";
import CaseManager from "./pages/CaseManager";
import Analytics from "./pages/Analytics";
import Leaderboard from "./pages/Leaderboard";
import AIReport from "./pages/AIReport";
import SatelliteMonitoring from "./pages/SatelliteMonitoring";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CivicProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/heatmap" element={<Heatmap />} />
              <Route path="/report" element={<ReportEncroachment />} />
              <Route path="/transparency" element={<TransparencyBoard />} />
              <Route path="/cases" element={<CaseManager />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/ai-report" element={<AIReport />} />
              <Route path="/satellite" element={<SatelliteMonitoring />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CivicProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
