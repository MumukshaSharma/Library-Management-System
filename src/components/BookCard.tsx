import { Calendar, User, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    isbn: string;
    status: 'available' | 'issued' | 'overdue' | 'reserved';
    dueDate?: string;
    issuedTo?: string;
    category: string;
    coverUrl?: string;
  };
  userRole: 'student' | 'librarian' | 'admin';
  onAction?: (action: string, bookId: string) => void;
}

export function BookCard({ book, userRole, onAction }: BookCardProps) {
  const getStatusIcon = () => {
    switch (book.status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'issued':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'reserved':
        return <XCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusVariant = () => {
    switch (book.status) {
      case 'available':
        return 'default';
      case 'issued':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      case 'reserved':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getActionButtons = () => {
    if (userRole === 'student') {
      return (
        <>
          {book.status === 'available' && (
            <Button 
              size="sm" 
              onClick={() => onAction?.('reserve', book.id)}
              className="flex-1"
            >
              Reserve
            </Button>
          )}
          {book.status === 'issued' && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onAction?.('renew', book.id)}
              className="flex-1"
            >
              Renew
            </Button>
          )}
        </>
      );
    }
    
    if (userRole === 'librarian' || userRole === 'admin') {
      return (
        <>
          {book.status === 'available' && (
            <Button 
              size="sm" 
              onClick={() => onAction?.('issue', book.id)}
              className="flex-1"
            >
              Issue
            </Button>
          )}
          {(book.status === 'issued' || book.status === 'overdue') && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onAction?.('return', book.id)}
              className="flex-1"
            >
              Return
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onAction?.('edit', book.id)}
            className="flex-1"
          >
            Edit
          </Button>
        </>
      );
    }

    return null;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          {/* Book cover placeholder */}
          <div className="w-12 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-md flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-primary">
              {book.title.substring(0, 2).toUpperCase()}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground truncate group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {book.author}
            </p>
            <p className="text-xs text-muted-foreground">
              ISBN: {book.isbn}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Badge variant={getStatusVariant()} className="flex items-center gap-1">
              {getStatusIcon()}
              <span className="capitalize">{book.status}</span>
            </Badge>
            <Badge variant="outline" className="text-xs">
              {book.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-3">
        {book.status === 'issued' && book.dueDate && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Due:</span>
            <span className={`font-medium ${
              new Date(book.dueDate) < new Date() ? 'text-destructive' : 'text-foreground'
            }`}>
              {new Date(book.dueDate).toLocaleDateString()}
            </span>
          </div>
        )}
        
        {book.issuedTo && (userRole === 'librarian' || userRole === 'admin') && (
          <div className="flex items-center gap-2 text-sm mt-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Issued to:</span>
            <span className="font-medium text-foreground">{book.issuedTo}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex gap-2 w-full">
          {getActionButtons()}
        </div>
      </CardFooter>
    </Card>
  );
}