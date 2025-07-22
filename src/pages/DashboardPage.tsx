import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, AlertTriangle, Users, FileText, BarChart3, Plus, TrendingUp, Calendar, Filter } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();

  // Fetch dashboard data
  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user?.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*, clients(name)')
        .eq('user_id', user?.id)
        .order('due_date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: documents } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user?.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  // Calculate metrics
  const completedTasks = tasks?.filter(task => task.status === 'completed').length || 0;
  const pendingTasks = tasks?.filter(task => task.status === 'pending').length || 0;
  const overdueTasks = tasks?.filter(task => task.status === 'overdue').length || 0;
  const activeClients = clients?.filter(client => client.status === 'active').length || 0;

  const recentTasks = tasks?.slice(0, 5) || [];

  // Calculate completion rate
  const totalTasks = (tasks?.length || 0);
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (!tasks || !clients) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 animate-fade-in">
      {/* Header Section with improved typography */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Welcome back! Here's your comprehensive compliance overview.
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">
                {completionRate}% completion rate
              </span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
          <Button asChild size="lg" className="font-semibold hover:shadow-elegant transition-all duration-300">
            <Link to="/clients">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-semibold hover:shadow-card">
            <Link to="/tasks">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Link>
          </Button>
        </div>
      </div>

      {/* Enhanced Metrics Overview with Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group card-hover border-0 shadow-card bg-gradient-to-br from-success/5 to-success/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-success-foreground">Completed Tasks</CardTitle>
            <div className="p-2 bg-success/10 rounded-lg group-hover:bg-success/20 transition-colors">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success mb-1">{completedTasks}</div>
            <p className="text-sm text-muted-foreground mb-3">Successfully completed</p>
            <Progress value={completionRate} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">{completionRate}% completion rate</p>
          </CardContent>
        </Card>

        <Card className="group card-hover border-0 shadow-card bg-gradient-to-br from-warning/5 to-warning/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-warning-foreground">Pending Tasks</CardTitle>
            <div className="p-2 bg-warning/10 rounded-lg group-hover:bg-warning/20 transition-colors">
              <Clock className="h-5 w-5 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning mb-1">{pendingTasks}</div>
            <p className="text-sm text-muted-foreground mb-3">Awaiting action</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className="bg-warning rounded-full h-2 transition-all duration-500"
                  style={{ width: `${totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="group card-hover border-0 shadow-card bg-gradient-to-br from-destructive/5 to-destructive/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-destructive-foreground">Overdue Tasks</CardTitle>
            <div className="p-2 bg-destructive/10 rounded-lg group-hover:bg-destructive/20 transition-colors">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive mb-1">{overdueTasks}</div>
            <p className="text-sm text-muted-foreground mb-3">Past due date</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className="bg-destructive rounded-full h-2 transition-all duration-500"
                  style={{ width: `${totalTasks > 0 ? (overdueTasks / totalTasks) * 100 : 0}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{totalTasks > 0 ? Math.round((overdueTasks / totalTasks) * 100) : 0}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="group card-hover border-0 shadow-card bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-primary-foreground">Active Clients</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-1">{activeClients}</div>
            <p className="text-sm text-muted-foreground mb-3">Under management</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground">All systems active</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Tasks - Enhanced */}
        <Card className="lg:col-span-2 card-hover border-0 shadow-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">Recent Tasks</CardTitle>
                  <CardDescription className="text-sm">
                    Your most recent compliance tasks and their current status
                  </CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter tasks</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTasks.length > 0 ? (
              <>
                {recentTasks.map((task, index) => (
                  <div 
                    key={task.id} 
                    className="group flex items-center justify-between p-4 bg-muted/30 rounded-xl border hover:bg-accent/50 hover:shadow-md transition-all duration-300 cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Task: ${task.title} for ${task.clients?.name}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all ${
                        task.status === 'completed' ? 'bg-success ring-success/30' :
                        task.status === 'overdue' ? 'bg-destructive ring-destructive/30' :
                        'bg-warning ring-warning/30'
                      }`} />
                      <div className="space-y-1">
                        <p className="font-semibold text-sm leading-none group-hover:text-primary transition-colors">
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-medium">{task.clients?.name}</span>
                          <Separator orientation="vertical" className="h-3" />
                          <span className="capitalize">{task.priority} priority</span>
                          <Separator orientation="vertical" className="h-3" />
                          <span>Due {new Date(task.due_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        task.status === 'completed' ? 'default' :
                        task.status === 'overdue' ? 'destructive' :
                        'secondary'
                      }
                      className="font-medium px-3 py-1"
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <Button asChild variant="outline" className="w-full hover:shadow-card">
                    <Link to="/tasks" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      View All Tasks
                      <span className="text-xs bg-muted px-2 py-1 rounded-md ml-auto">
                        {totalTasks} total
                      </span>
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No tasks yet</h3>
                <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
                  Create your first task to start managing compliance workflows for your clients.
                </p>
                <Button asChild size="lg" className="font-semibold hover:shadow-elegant">
                  <Link to="/tasks">Create First Task</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions - Enhanced */}
        <Card className="card-hover border-0 shadow-card">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
                <CardDescription className="text-sm">
                  Streamlined access to key features
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              asChild 
              className="w-full justify-start h-12 text-left font-semibold hover:shadow-card hover:scale-[1.02] transition-all" 
              variant="outline"
            >
              <Link to="/clients" className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Manage Clients</div>
                  <div className="text-xs text-muted-foreground">Add, edit or organize clients</div>
                </div>
              </Link>
            </Button>
            
            <Button 
              asChild 
              className="w-full justify-start h-12 text-left font-semibold hover:shadow-card hover:scale-[1.02] transition-all" 
              variant="outline"
            >
              <Link to="/tasks" className="flex items-center gap-3">
                <div className="p-2 bg-warning/10 rounded-md">
                  <FileText className="h-4 w-4 text-warning" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Task Management</div>
                  <div className="text-xs text-muted-foreground">Create and assign new tasks</div>
                </div>
              </Link>
            </Button>
            
            <Button 
              asChild 
              className="w-full justify-start h-12 text-left font-semibold hover:shadow-card hover:scale-[1.02] transition-all" 
              variant="outline"
            >
              <Link to="/analytics" className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-md">
                  <BarChart3 className="h-4 w-4 text-success" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Analytics</div>
                  <div className="text-xs text-muted-foreground">View insights and reports</div>
                </div>
              </Link>
            </Button>

            <Separator className="my-4" />
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Today's Focus
              </h4>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span>Overdue Tasks</span>
                  <Badge variant={overdueTasks > 0 ? "destructive" : "secondary"}>
                    {overdueTasks}
                  </Badge>
                </div>
                <Progress 
                  value={overdueTasks > 0 ? 100 : 0} 
                  className="h-1 mt-2" 
                />
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span>Completion Rate</span>
                  <Badge variant="default">{completionRate}%</Badge>
                </div>
                <Progress value={completionRate} className="h-1 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;