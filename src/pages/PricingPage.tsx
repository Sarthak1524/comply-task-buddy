import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";

const PricingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGetStarted = (plan: string) => {
    toast({
      title: "Starting Free Trial",
      description: `Redirecting to sign up for ${plan} plan...`,
    });
    navigate('/register');
  };

  const handleContactSales = () => {
    navigate('/contact');
  };

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started",
      price: "$29",
      period: "per month",
      features: [
        "Up to 5 team members",
        "Basic compliance tracking",
        "Email notifications",
        "Standard dashboard",
        "Email support",
        "Mobile app access"
      ],
      buttonText: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      description: "For growing businesses with advanced needs",
      price: "$79",
      period: "per month",
      features: [
        "Up to 25 team members",
        "Advanced compliance automation",
        "Custom notifications",
        "Advanced analytics & reporting",
        "Priority support",
        "API access",
        "Custom integrations",
        "Document management"
      ],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex requirements",
      price: "Custom",
      period: "pricing",
      features: [
        "Unlimited team members",
        "White-label solution",
        "Advanced security & compliance",
        "Custom workflows",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom integrations",
        "On-premise deployment"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 hover-scale cursor-pointer" onClick={() => navigate('/')}>
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">ComplyClear</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
              <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
              <Button variant="hero" onClick={() => navigate('/register')}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge variant="secondary" className="text-primary">
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-5xl font-bold text-foreground">
              Choose the Perfect Plan for Your Business
            </h1>
            <p className="text-xl text-muted-foreground">
              Start with a 14-day free trial. No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative shadow-card hover:shadow-elegant transition-all duration-500 hover-scale ${
                  plan.popular ? 'border-primary shadow-lg' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold text-foreground">
                      {plan.price}
                      {plan.price !== "Custom" && <span className="text-lg font-normal text-muted-foreground">/{plan.period}</span>}
                    </div>
                    {plan.price === "Custom" && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full text-base hover-scale group ${
                      plan.popular ? 'variant-hero' : 'variant-outline'
                    }`}
                    onClick={() => plan.name === "Enterprise" ? handleContactSales() : handleGetStarted(plan.name)}
                  >
                    {plan.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know about our pricing</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Can I change my plan later?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground">Yes, all plans come with a 14-day free trial. No credit card required to start.</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">What happens if I exceed my team limit?</h3>
                <p className="text-muted-foreground">You'll be prompted to upgrade to a higher plan. We'll notify you before you reach your limit.</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Do you offer annual discounts?</h3>
                <p className="text-muted-foreground">Yes, save 20% when you pay annually. Contact sales for more details on enterprise annual plans.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;