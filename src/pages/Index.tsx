import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { LibrarySidebar } from "@/components/LibrarySidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StudentDashboard } from "@/components/StudentDashboard";
import { LibrarianDashboard } from "@/components/LibrarianDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 w-80">
          <Skeleton className="h-16 w-16 rounded-full mx-auto" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  if (!user || !userRole) {
    return <LoginForm />;
  }

  const renderDashboard = () => {
    switch (userRole) {
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

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <LibrarySidebar userRole={userRole} />
        <SidebarInset className="flex flex-col">
          <DashboardHeader userRole={userRole} userName={userName} />
          <main className="flex-1 overflow-auto">
            {renderDashboard()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
