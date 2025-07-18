import { Users, BookOpen, TrendingUp, Shield, Activity, UserPlus, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const mockSystemStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalBooks: 2547,
  systemUptime: "99.9%",
  storageUsed: 68,
  pendingRegistrations: 15
};

const mockUserStats = [
  { role: "Students", count: 1050, color: "success" },
  { role: "Librarians", count: 12, color: "warning" },
  { role: "Admins", count: 3, color: "destructive" }
];

const mockSystemAlerts = [
  { id: 1, type: "warning", message: "Storage at 68% capacity", time: "2 mins ago" },
  { id: 2, type: "info", message: "15 pending user registrations", time: "15 mins ago" },
  { id: 3, type: "success", message: "Database backup completed", time: "1 hour ago" }
];

export function AdminDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockSystemStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {mockSystemStats.activeUsers} active today
            </p>
            <Progress value={(mockSystemStats.activeUsers / mockSystemStats.totalUsers) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/20 to-success/10 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{mockSystemStats.systemUptime}</div>
            <p className="text-xs text-muted-foreground">
              Uptime this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/20 to-warning/10 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <BookOpen className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{mockSystemStats.storageUsed}%</div>
            <Progress value={mockSystemStats.storageUsed} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              2.1 TB of 3 TB
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/20 to-muted/20 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <UserPlus className="h-4 w-4 text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent-foreground">{mockSystemStats.pendingRegistrations}</div>
            <p className="text-xs text-muted-foreground">
              User registrations
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUserStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${stat.color}`} />
                  <span className="font-medium">{stat.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{stat.count}</span>
                  <Badge variant="outline" className="text-xs">
                    {((stat.count / mockSystemStats.totalUsers) * 100).toFixed(1)}%
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              System Alerts
              {mockSystemAlerts.filter(alert => alert.type === 'warning').length > 0 && (
                <Badge variant="destructive" className="animate-pulse-glow">
                  {mockSystemAlerts.filter(alert => alert.type === 'warning').length} Warning
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSystemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.type === 'warning' ? 'bg-warning' :
                    alert.type === 'info' ? 'bg-primary' :
                    'bg-success'
                  }`} />
                  <span className="text-sm">{alert.message}</span>
                </div>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-16 flex flex-col gap-2">
              <UserPlus className="h-5 w-5" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm">System Reports</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <Settings className="h-5 w-5" />
              <span className="text-sm">System Settings</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}