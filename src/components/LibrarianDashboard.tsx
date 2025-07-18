import { BookOpen, Users, AlertTriangle, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookCard } from "./BookCard";

const mockInventoryStats = {
  totalBooks: 2547,
  availableBooks: 1823,
  issuedBooks: 624,
  overdueBooks: 100,
  reservedBooks: 45
};

const mockRecentActivities = [
  { id: 1, action: "Book issued", book: "Clean Code", student: "John Doe", time: "2 mins ago" },
  { id: 2, action: "Book returned", book: "Introduction to Algorithms", student: "Jane Smith", time: "15 mins ago" },
  { id: 3, action: "Overdue alert", book: "Design Patterns", student: "Mike Johnson", time: "1 hour ago" }
];

const mockOverdueBooks = [
  {
    id: "1",
    title: "Design Patterns",
    author: "Gang of Four",
    isbn: "978-0201633612",
    status: "overdue" as const,
    dueDate: "2024-12-10",
    issuedTo: "Mike Johnson",
    category: "Software Engineering"
  },
  {
    id: "2",
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford", 
    isbn: "978-0596517748",
    status: "overdue" as const,
    dueDate: "2024-12-08",
    issuedTo: "Sarah Wilson",
    category: "Web Development"
  }
];

export function LibrarianDashboard() {
  const issuePercentage = (mockInventoryStats.issuedBooks / mockInventoryStats.totalBooks) * 100;
  
  return (
    <div className="space-y-6 p-6">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockInventoryStats.totalBooks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +23 this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/20 to-success/10 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{mockInventoryStats.availableBooks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Ready to issue
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/20 to-warning/10 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issued</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{mockInventoryStats.issuedBooks}</div>
            <Progress value={issuePercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {issuePercentage.toFixed(1)}% of collection
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-destructive/20 to-destructive/10 border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{mockInventoryStats.overdueBooks}</div>
            <p className="text-xs text-muted-foreground">
              Needs attention
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/20 to-muted/20 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved</CardTitle>
            <Users className="h-4 w-4 text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent-foreground">{mockInventoryStats.reservedBooks}</div>
            <p className="text-xs text-muted-foreground">
              Waiting to issue
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overdue Books */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Overdue Books
              <Badge variant="destructive" className="animate-pulse-glow">
                {mockOverdueBooks.length} Items
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockOverdueBooks.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                userRole="librarian"
                onAction={(action, bookId) => {
                  console.log(`Action: ${action} on book ${bookId}`);
                }}
              />
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRecentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.action === 'Overdue alert' ? 'bg-destructive' :
                    activity.action === 'Book issued' ? 'bg-warning' :
                    'bg-success'
                  }`} />
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      "{activity.book}" - {activity.student}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}