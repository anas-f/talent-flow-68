import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  GitBranch,
  UserPlus,
  FileText,
  BarChart3,
  Settings,
  Search,
  Plus,
  Bell,
  Globe
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";


const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Jobs", url: "/jobs", icon: Briefcase },
  { title: "Applicants", url: "/applicants", icon: Users },
  { title: "Interviews", url: "/interviews", icon: Calendar },
  { title: "Pipeline", url: "/pipeline", icon: GitBranch },
];

const secondaryNavItems = [
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Talent Pool", url: "/talent-pool", icon: UserPlus },
  { title: "Templates", url: "/templates", icon: FileText },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Users", url: "/users", icon: Users },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [language, setLanguage] = useState("en");
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavCls = (active: boolean) =>
    active 
      ? "bg-foreground/10 text-foreground border-r-2 border-foreground font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r border-border/50 transition-all duration-300`}
      collapsible="icon"
    >
      <div className="p-4 border-b border-border/50">
        {!collapsed ? (
          <NavLink 
            to="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            title="Go to Dashboard"
          >
            <div className="w-8 h-8 bg-foreground text-background rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-background font-bold text-sm">RH</span>
            </div>
            <div>
              <h2 className="font-semibold text-lg">RH Assistant</h2>
              <p className="text-xs text-muted-foreground">Recruitment Platform</p>
            </div>
          </NavLink>
        ) : (
          <NavLink 
            to="/" 
            className="block"
            title="Go to Dashboard"
          >
            <div className="w-8 h-8 bg-foreground text-background rounded-lg flex items-center justify-center mx-auto hover:opacity-80 transition-opacity">
              <span className="text-background font-bold text-sm">RH</span>
            </div>
          </NavLink>
        )}
      </div>

      {/* Quick Actions */}
      {!collapsed && (
        <div className="p-4 border-b border-border/50">
          <div className="space-y-2">
            <Button 
              size="sm" 
              className="w-full bg-foreground text-background hover:bg-foreground/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Job
            </Button>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Search className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Bell className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => setLanguage(language === "en" ? "fr" : "en")}
              >
                <Globe className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider font-medium text-muted-foreground px-2 mb-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${getNavCls(isActive(item.url))}`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider font-medium text-muted-foreground px-2 mb-2">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${getNavCls(isActive(item.url))}`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="flex-1">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings at bottom */}
        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/settings"
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${getNavCls(isActive("/settings"))}`}
                    >
                      <Settings className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="flex-1">Settings</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}