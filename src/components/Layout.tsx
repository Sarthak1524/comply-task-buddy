import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  BarChart3, 
  LogOut,
  Menu
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
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
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="flex flex-col h-full">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900">ComplyClear</h2>
              </div>
              
              <nav className="flex-1 px-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t">
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </Button>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b px-6 py-4">
            <div className="flex items-center">
              <SidebarTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}