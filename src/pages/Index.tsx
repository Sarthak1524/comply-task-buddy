import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, Users, FileText, BarChart3, Shield, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">ComplyClear</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="outline">Login</Button>
              <Button variant="hero">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-primary">
                  SaaS Compliance Platform
                </Badge>
                <h1 className="text-5xl font-bold text-foreground leading-tight">
                  Never Miss a
                  <span className="text-primary"> Compliance </span>
                  Deadline Again
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  ComplyClear automates compliance tracking for global businesses. 
                  Streamline client tasks, document collection, and deadline management 
                  with our intelligent platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="text-base">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-base">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="ComplyClear Dashboard" 
                className="rounded-2xl shadow-2xl border border-border"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">99.8%</div>
              <div className="text-sm text-muted-foreground">Compliance Rate</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">10k+</div>
              <div className="text-sm text-muted-foreground">Active Clients</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Businesses</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">
              Complete Compliance Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to track, manage, and ensure compliance across your organization
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Metrics Overview */}
            <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Real-time Analytics</span>
                </CardTitle>
                <CardDescription>
                  Monitor compliance rates and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-success/10 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-success">156</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="bg-warning/10 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-warning">23</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                </div>
                <div className="bg-destructive/10 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-destructive">3</div>
                  <div className="text-sm text-muted-foreground">Overdue Tasks</div>
                </div>
              </CardContent>
            </Card>

            {/* Task Management */}
            <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Task Management</span>
                </CardTitle>
                <CardDescription>
                  Assign and track compliance tasks effortlessly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm">Q4 Tax Returns</span>
                  </div>
                  <Badge variant="secondary">Due in 5 days</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm">GST Compliance</span>
                  </div>
                  <Badge variant="secondary">Under Review</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span className="text-sm">Annual Report</span>
                  </div>
                  <Badge variant="destructive">Overdue</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Client Portal */}
            <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Client Portal</span>
                </CardTitle>
                <CardDescription>
                  Secure client access for document submission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">AC</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">ACME Corp</div>
                      <div className="text-xs text-muted-foreground">2 pending tasks</div>
                    </div>
                    <div className="ml-auto">
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2">
                    <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-warning">TC</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">TechCorp Ltd</div>
                      <div className="text-xs text-muted-foreground">1 overdue task</div>
                    </div>
                    <div className="ml-auto">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">
              Why Choose ComplyClear?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Smart Reminders</h3>
              <p className="text-muted-foreground">
                Automated alerts ensure no deadline is ever missed with intelligent reminder scheduling.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Enterprise Security</h3>
              <p className="text-muted-foreground">
                Bank-grade security with end-to-end encryption for all your sensitive compliance data.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Detailed insights and reports to optimize your compliance performance and efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground">
              Ready to Transform Your Compliance Process?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of businesses already using ComplyClear to streamline their compliance workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="text-base">
                Start Your Free Trial
              </Button>
              <Button variant="outline" size="lg" className="text-base">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">ComplyClear</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 ComplyClear. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
