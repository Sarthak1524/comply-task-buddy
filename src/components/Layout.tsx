import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  BarChart3, 
  LogOut,
  Menu,
  Bell,
  Settings
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, badge: null },
    { name: 'Clients', href: '/clients', icon: Users, badge: null },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare, badge: '3' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, badge: null },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of ComplyClear.",
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border/50 shadow-card">
          <SidebarContent className="bg-sidebar">
            <div className="flex flex-col h-full">
              {/* Brand Header */}
              <div className="p-6 border-b border-sidebar-border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-sidebar-foreground">ComplyClear</h2>
                    <p className="text-xs text-sidebar-foreground/60">Compliance Management</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        active
                          ? 'bg-primary text-primary-foreground shadow-md hover:shadow-lg'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-sm'
                      }`}
                      aria-label={`Navigate to ${item.name}`}
                    >
                      <div className="flex items-center">
                        <Icon className={`mr-3 h-5 w-5 transition-transform group-hover:scale-110 ${
                          active ? 'text-primary-foreground' : 'text-sidebar-foreground/70'
                        }`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant={active ? "secondary" : "outline"} 
                          className="text-xs px-2 py-0 h-5"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <Separator className="mx-4" />

              {/* User Profile */}
              <div className="p-4 space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-sidebar-accent/50">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt="Profile" />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-sidebar-foreground/60 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-sidebar-foreground hover:bg-sidebar-accent"
                    aria-label="Settings"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Sign out"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden hover:bg-accent">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle sidebar</span>
                  </Button>
                </SidebarTrigger>
                
                <div className="hidden md:block">
                  <h1 className="text-lg font-semibold text-foreground capitalize">
                    {location.pathname.split('/').pop() || 'Dashboard'}
                  </h1>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="relative hover:bg-accent">
                  <Bell className="h-5 w-5" />
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    3
                  </Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-muted/20">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}