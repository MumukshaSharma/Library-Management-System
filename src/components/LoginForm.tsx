import { useState } from "react";
import { Eye, EyeOff, BookOpen, Users, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LoginFormProps {
  onLogin: (role: 'student' | 'librarian' | 'admin', name: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'student' | 'librarian' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app this would validate with Supabase
    const mockName = email.split('@')[0] || 'User';
    onLogin(selectedRole, mockName.charAt(0).toUpperCase() + mockName.slice(1));
  };

  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'student':
        return {
          icon: BookOpen,
          color: 'bg-success/20 text-success border-success/30',
          description: 'Browse and borrow books'
        };
      case 'librarian':
        return {
          icon: Users,
          color: 'bg-warning/20 text-warning border-warning/30',
          description: 'Manage inventory and users'
        };
      case 'admin':
        return {
          icon: Shield,
          color: 'bg-destructive/20 text-destructive border-destructive/30',
          description: 'Full system access'
        };
      default:
        return {
          icon: BookOpen,
          color: 'bg-muted/20 text-muted-foreground border-muted/30',
          description: ''
        };
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">LibraryMS</h1>
            <p className="text-muted-foreground">Secure Library Management System</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Select Role</Label>
                <Select value={selectedRole} onValueChange={(value: 'student' | 'librarian' | 'admin') => setSelectedRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Student
                      </div>
                    </SelectItem>
                    <SelectItem value="librarian">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Librarian
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Administrator
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Role Info Badge */}
                <div className="mt-2">
                  {(() => {
                    const roleInfo = getRoleInfo(selectedRole);
                    const IconComponent = roleInfo.icon;
                    return (
                      <Badge variant="outline" className={roleInfo.color}>
                        <IconComponent className="h-3 w-3 mr-1" />
                        {roleInfo.description}
                      </Badge>
                    );
                  })()}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Sign In as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground text-center mb-2">
                Demo Credentials (any email/password works):
              </p>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p><strong>Student:</strong> Browse books, track due dates</p>
                <p><strong>Librarian:</strong> Manage inventory, handle returns</p>
                <p><strong>Admin:</strong> Full system management</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}