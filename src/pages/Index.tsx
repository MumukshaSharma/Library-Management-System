import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { LibrarySidebar } from "@/components/LibrarySidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StudentDashboard } from "@/components/StudentDashboard";
import { LibrarianDashboard } from "@/components/LibrarianDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { LoginForm } from "@/components/LoginForm";

const Index = () => {
  const [user, setUser] = useState<{
    role: 'student' | 'librarian' | 'admin';
    name: string;
  } | null>(null);

  const handleLogin = (role: 'student' | 'librarian' | 'admin', name: string) => {
    setUser({ role, name });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'librarian':
        return <LibrarianDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <LibrarySidebar userRole={user.role} />
        <SidebarInset className="flex flex-col">
          <DashboardHeader userRole={user.role} userName={user.name} />
          <main className="flex-1 overflow-auto">
            {renderDashboard()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
