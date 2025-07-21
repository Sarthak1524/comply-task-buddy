import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart3, TrendingUp, Users, FileText, Clock, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const AnalyticsPage = () => {
  const { user } = useAuth();

  // Fetch analytics data
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
        .select('*')
        .eq('user_id', user?.id);
      
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
  const totalClients = clients?.length || 0;
  const activeClients = clients?.filter(client => client.status === 'active').length || 0;
  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter(task => task.status === 'completed').length || 0;
  const pendingTasks = tasks?.filter(task => task.status === 'pending').length || 0;
  const overdueTasks = tasks?.filter(task => task.status === 'overdue').length || 0;
  const totalDocuments = documents?.length || 0;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Task status distribution
  const inProgressTasks = tasks?.filter(task => task.status === 'in_progress').length || 0;
  
  const taskStatusData = [
    { name: 'Completed', value: completedTasks, fill: 'hsl(var(--success))' },
    { name: 'Pending', value: pendingTasks, fill: 'hsl(var(--warning))' },
    { name: 'Overdue', value: overdueTasks, fill: 'hsl(var(--destructive))' },
    { name: 'In Progress', value: inProgressTasks, fill: 'hsl(var(--primary))' },
  ];

  // Priority distribution
  const priorityData = [
    { name: 'Urgent', value: tasks?.filter(task => task.priority === 'urgent').length || 0, fill: 'hsl(var(--destructive))' },
    { name: 'High', value: tasks?.filter(task => task.priority === 'high').length || 0, fill: 'hsl(var(--warning))' },
    { name: 'Medium', value: tasks?.filter(task => task.priority === 'medium').length || 0, fill: 'hsl(var(--primary))' },
    { name: 'Low', value: tasks?.filter(task => task.priority === 'low').length || 0, fill: 'hsl(var(--muted-foreground))' },
  ];

  // Chart configuration
  const chartConfig = {
    value: {
      label: "Tasks",
    },
    completed: {
      label: "Completed",
      color: "hsl(var(--success))",
    },
    pending: {
      label: "Pending", 
      color: "hsl(var(--warning))",
    },
    overdue: {
      label: "Overdue",
      color: "hsl(var(--destructive))",
    },
    inProgress: {
      label: "In Progress",
      color: "hsl(var(--primary))",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Insights into your compliance management performance.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">
              {activeClients} active clients
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks} completed
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Tasks completed on time
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocuments}</div>
            <p className="text-xs text-muted-foreground">
              Files uploaded
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Task Status Distribution */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Task Status Distribution</span>
            </CardTitle>
            <CardDescription>Visual breakdown of all tasks by current status</CardDescription>
          </CardHeader>
          <CardContent>
            {totalTasks > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No tasks to display</p>
                  <p className="text-sm">Create your first task to see analytics</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Task Priority Distribution</span>
            </CardTitle>
            <CardDescription>Visual breakdown of all tasks by priority level</CardDescription>
          </CardHeader>
          <CardContent>
            {totalTasks > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priorityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="value" 
                      radius={[4, 4, 0, 0]}
                      fill="hsl(var(--primary))"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No tasks to display</p>
                  <p className="text-sm">Create your first task to see priority analytics</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key insights and metrics about your compliance management performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-success/10 rounded-lg hover:bg-success/20 transition-colors cursor-pointer group">
              <div className="text-2xl font-bold text-success mb-2">{completedTasks}</div>
              <p className="text-sm text-muted-foreground group-hover:text-success transition-colors">Tasks Completed</p>
            </div>
            <div className="text-center p-6 bg-warning/10 rounded-lg hover:bg-warning/20 transition-colors cursor-pointer group">
              <div className="text-2xl font-bold text-warning mb-2">{pendingTasks}</div>
              <p className="text-sm text-muted-foreground group-hover:text-warning transition-colors">Tasks Pending</p>
            </div>
            <div className="text-center p-6 bg-destructive/10 rounded-lg hover:bg-destructive/20 transition-colors cursor-pointer group">
              <div className="text-2xl font-bold text-destructive mb-2">{overdueTasks}</div>
              <p className="text-sm text-muted-foreground group-hover:text-destructive transition-colors">Tasks Overdue</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;