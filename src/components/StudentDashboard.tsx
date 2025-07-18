import { Calendar, Clock, BookOpen, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookCard } from "./BookCard";

const mockBooks = [
  {
    id: "1",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    isbn: "978-0262033848",
    status: "issued" as const,
    dueDate: "2024-12-30",
    category: "Computer Science"
  },
  {
    id: "2", 
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    status: "overdue" as const,
    dueDate: "2024-12-15",
    category: "Programming"
  },
  {
    id: "3",
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    isbn: "978-0201616224",
    status: "available" as const,
    category: "Programming"
  }
];

export function StudentDashboard() {
  const issuedBooks = mockBooks.filter(book => book.status === 'issued' || book.status === 'overdue');
  const overdueBooks = mockBooks.filter(book => book.status === 'overdue');
  
  return (
    <div className="space-y-6 p-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Books Issued</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{issuedBooks.length}</div>
            <p className="text-xs text-muted-foreground">
              Out of 5 allowed
            </p>
            <Progress value={(issuedBooks.length / 5) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/20 to-warning/10 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">1</div>
            <p className="text-xs text-muted-foreground">
              Within 3 days
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-destructive/20 to-destructive/10 border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{overdueBooks.length}</div>
            <p className="text-xs text-muted-foreground">
              Action required
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/20 to-success/10 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reading Streak</CardTitle>
            <Calendar className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">12</div>
            <p className="text-xs text-muted-foreground">
              Days active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Books */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              My Books
              {overdueBooks.length > 0 && (
                <Badge variant="destructive" className="animate-pulse-glow">
                  {overdueBooks.length} Overdue
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {issuedBooks.length > 0 ? (
              issuedBooks.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  userRole="student"
                  onAction={(action, bookId) => {
                    console.log(`Action: ${action} on book ${bookId}`);
                  }}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No books currently issued</p>
                <p className="text-sm">Browse our collection to get started!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recently Added Books */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              New Arrivals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockBooks.filter(book => book.status === 'available').map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                userRole="student"
                onAction={(action, bookId) => {
                  console.log(`Action: ${action} on book ${bookId}`);
                }}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}