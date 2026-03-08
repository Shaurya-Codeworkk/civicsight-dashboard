import {
  LayoutDashboard,
  MapPin,
  FileText,
  Shield,
  Settings,
  BarChart3,
  Trophy,
  Brain,
  Satellite,
  Flame,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Command Center", url: "/", icon: LayoutDashboard },
  { title: "Heatmap", url: "/heatmap", icon: Flame },
  { title: "Report Encroachment", url: "/report", icon: MapPin },
  { title: "Transparency Board", url: "/transparency", icon: Shield },
  { title: "Case Manager", url: "/cases", icon: Settings },
];

const analyticsItems = [
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Ward Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "AI Report", url: "/ai-report", icon: Brain },
  { title: "Satellite Monitor", url: "/satellite", icon: Satellite },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const renderItems = (items: typeof mainItems) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <NavLink
            to={item.url}
            end={item.url === "/"}
            className="hover:bg-sidebar-accent/60"
            activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
          >
            <item.icon className="mr-2 h-4 w-4 shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold text-sm">
              CS
            </div>
            <div>
              <h2 className="text-sm font-bold text-sidebar-foreground">CivicSight</h2>
              <p className="text-[10px] text-sidebar-foreground/60">Encroachment Intelligence</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold text-sm mx-auto">
            CS
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(mainItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Intelligence</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(analyticsItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
