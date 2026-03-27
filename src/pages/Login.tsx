import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "citizen" | "authority") => {
    login(role);
    navigate(role === "citizen" ? "/citizen" : "/command");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg space-y-8"
      >
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <Brain className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">ENCROACH-AI</h1>
          <p className="text-muted-foreground text-sm">
            Civic Intelligence System · Delhi Municipal Corporation
          </p>
        </div>

        <div className="grid gap-4">
          <Card
            className="cursor-pointer hover-scale border-2 border-transparent hover:border-primary/30 transition-all"
            onClick={() => handleLogin("citizen")}
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-chart-2/10 flex items-center justify-center shrink-0">
                <Users className="h-6 w-6 text-chart-2" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Sign in as Citizen</h3>
                <p className="text-xs text-muted-foreground">test@public.com · Report encroachments & track status</p>
              </div>
              <Button size="sm" variant="outline">Sign In</Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover-scale border-2 border-transparent hover:border-primary/30 transition-all"
            onClick={() => handleLogin("authority")}
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Sign in as Authority (MCD)</h3>
                <p className="text-xs text-muted-foreground">test@government.com · Manage cases & assign officers</p>
              </div>
              <Button size="sm">Sign In</Button>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-[11px] text-muted-foreground">
          Hackathon Demo · No real authentication required
        </p>
      </motion.div>
    </div>
  );
}
