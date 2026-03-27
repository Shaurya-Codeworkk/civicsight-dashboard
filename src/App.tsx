import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ComplaintProvider } from "@/context/ComplaintContext";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import CitizenDashboard from "@/pages/CitizenDashboard";
import CommandCenter from "@/pages/CommandCenter";
import TransparencyBoard from "@/pages/TransparencyBoard";
import Analytics from "@/pages/Analytics";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        {user.role === "citizen" && (
          <>
            <Route path="/citizen" element={<CitizenDashboard />} />
            <Route path="/transparency" element={<TransparencyBoard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/" element={<Navigate to="/citizen" replace />} />
          </>
        )}
        {user.role === "authority" && (
          <>
            <Route path="/command" element={<CommandCenter />} />
            <Route path="/transparency" element={<TransparencyBoard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/" element={<Navigate to="/command" replace />} />
          </>
        )}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ComplaintProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ComplaintProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
