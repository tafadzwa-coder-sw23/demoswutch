import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Brain, MapPin, Zap, Camera, ShoppingBag } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Swumarket AI Assistant",
    description: "Turn social media inspiration into actionable shopping plans",
    details: [
      "Identifies products from videos and images",
      "Pins locations on interactive maps",
      "Creates shopping lists from recipes"
    ],
    color: "primary"
  },
  {
    icon: Brain,
    title: "Smart Shopping Comparison",
    description: "AI-powered price comparison across all vendors",
    details: [
      "Compare entire shopping lists instantly",
      "Include informal traders and markets",
      "Real-time price updates"
    ],
    color: "secondary"
  },
  {
    icon: MapPin,
    title: "Hyper-Local Discovery",
    description: "Find everything in your immediate vicinity",
    details: [
      "Demand signals from your neighborhood",
      "Peer-to-peer buying requests",
      "Location-based recommendations"
    ],
    color: "accent"
  },
  {
    icon: Camera,
    title: "Visual Search & AR",
    description: "Search with photos and try before you buy",
    details: [
      "Photo-based product matching",
      "Virtual property tours",
      "AR clothing try-on"
    ],
    color: "primary"
  },
  {
    icon: Zap,
    title: "Retail Analytics Dashboard",
    description: "Business intelligence for all sellers",
    details: [
      "Sales and customer insights",
      "Inventory management",
      "Market trend analysis"
    ],
    color: "secondary"
  },
  {
    icon: ShoppingBag,
    title: "Universal Commerce Hub",
    description: "One platform for all your needs",
    details: [
      "Integrated payments and logistics",
      "Cross-category recommendations",
      "Community-driven reviews"
    ],
    color: "accent"
  }
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "primary":
      return "bg-primary text-primary-foreground";
    case "secondary":
      return "bg-secondary text-secondary-foreground";
    case "accent":
      return "bg-accent text-accent-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const AIFeaturesSection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Bot className="h-4 w-4" />
            Powered by Advanced AI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Future of Commerce
            <span className="block text-primary mt-2">Is Here Today</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the next generation of marketplace technology. Our AI doesn't just show you products - 
            it understands your needs and creates personalized solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-xl ${getColorClasses(feature.color)} flex items-center justify-center mb-6 shadow-soft`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Ready to Experience the Future?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of Zimbabweans already using AI to shop smarter and sell better.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="px-8">
              Try AI Assistant
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeaturesSection;