import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function Layout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b bg-card px-4 shrink-0 shadow-sm">
            <SidebarTrigger className="mr-3" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Municipal Encroachment Monitoring System
            </span>
          </header>
          <main className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <Outlet key={location.pathname} />
            </AnimatePresence>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
