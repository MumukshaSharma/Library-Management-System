import { useState } from "react";
import { 
  BookOpen, 
  Home, 
  Search, 
  UserCheck, 
  Settings, 
  Users, 
  BarChart3, 
  Bell,
  FileText,
  Calendar
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";

interface LibrarySidebarProps {
  userRole: 'student' | 'librarian' | 'admin';
}

const roleMenuItems = {
  student: [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Browse Books", url: "/browse", icon: BookOpen },
    { title: "Search", url: "/search", icon: Search },
    { title: "My Books", url: "/my-books", icon: UserCheck },
    { title: "Due Dates", url: "/due-dates", icon: Calendar },
  ],
  librarian: [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Inventory", url: "/inventory", icon: BookOpen },
    { title: "Issue/Return", url: "/issue-return", icon: UserCheck },
    { title: "Overdue Books", url: "/overdue", icon: Bell },
    { title: "Reports", url: "/reports", icon: FileText },
  ],
  admin: [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "User Management", url: "/users", icon: Users },
    { title: "Analytics", url: "/analytics", icon: BarChart3 },
    { title: "System Settings", url: "/settings", icon: Settings },
    { title: "Reports", url: "/reports", icon: FileText },
  ]
};

export function LibrarySidebar({ userRole }: LibrarySidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const items = roleMenuItems[userRole];
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/20 text-primary border-r-2 border-primary" 
      : "hover:bg-secondary/50 text-foreground/80 hover:text-foreground";

  // Mock notification counts
  const getNotificationCount = (url: string) => {
    if (url === "/due-dates" && userRole === "student") return 2;
    if (url === "/overdue" && userRole === "librarian") return 5;
    return 0;
  };

  return (
    <Sidebar
      className="border-r border-border/50"
      collapsible="icon"
    >
      <SidebarContent className="bg-card">
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-card-foreground">LibraryMS</h2>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className={`${isCollapsed ? "hidden" : "block"} text-muted-foreground uppercase text-xs font-medium px-3 mb-2`}>
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const notificationCount = getNotificationCount(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end 
                        className={`${getNavCls({ isActive: isActive(item.url) })} flex items-center gap-3 p-3 rounded-lg transition-all duration-200 relative group`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && (
                          <>
                            <span className="font-medium">{item.title}</span>
                            {notificationCount > 0 && (
                              <Badge 
                                variant="destructive" 
                                className="ml-auto h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse-glow"
                              >
                                {notificationCount}
                              </Badge>
                            )}
                          </>
                        )}
                        
                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                          <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                            {item.title}
                            {notificationCount > 0 && (
                              <span className="ml-2 bg-destructive text-destructive-foreground px-1 rounded-full text-xs">
                                {notificationCount}
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Role indicator at bottom */}
        <div className="mt-auto p-4 border-t border-border/50">
          {!isCollapsed && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${
                userRole === 'admin' ? 'bg-destructive' :
                userRole === 'librarian' ? 'bg-warning' :
                'bg-success'
              }`} />
              <span className="capitalize">{userRole} Access</span>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}