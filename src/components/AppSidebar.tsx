import {
  LayoutDashboard,
  MapPin,
  Shield,
  BarChart3,
  LogOut,
  Brain,
  User,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
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
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user, logout } = useAuth();

  const citizenItems = [
    { title: "My Dashboard", url: "/citizen", icon: User },
    { title: "Transparency", url: "/transparency", icon: Shield },
    { title: "Analytics", url: "/analytics", icon: BarChart3 },
  ];

  const authorityItems = [
    { title: "Command Center", url: "/command", icon: LayoutDashboard },
    { title: "Transparency", url: "/transparency", icon: Shield },
    { title: "Analytics", url: "/analytics", icon: BarChart3 },
  ];

  const items = user?.role === "citizen" ? citizenItems : authorityItems;

  const renderItems = (items: typeof citizenItems) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <NavLink
            to={item.url}
            end={item.url === "/citizen" || item.url === "/command"}
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
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold text-sm">
              <Brain className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-sidebar-foreground">ENCROACH-AI</h2>
              <p className="text-[10px] text-sidebar-foreground/60">Civic Intelligence</p>
            </div>
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold text-sm mx-auto">
            <Brain className="h-4 w-4" />
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {user?.role === "citizen" ? "Citizen Portal" : "Authority"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(items)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3">
        {!collapsed && (
          <div className="text-[10px] text-sidebar-foreground/50 mb-2 px-1">
            {user?.email}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {!collapsed && "Sign Out"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
