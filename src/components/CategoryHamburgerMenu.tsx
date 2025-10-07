import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Calculator,
  Package,
  ShoppingCart,
  TrendingDown,
  Users,
  Clock,
  MapPin,
  Star,
  Percent,
  DollarSign,
  Calendar,
  Bell,
  Target,
  Zap
} from "lucide-react";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useCart } from "@/context/CartContext";

interface CategoryHamburgerMenuProps {
  categoryName: string;
  categoryType?: "supermarket" | "commodity" | "restaurant" | "hardware" | "pharmacy" | "agriculture" | "pets" | "services";
}

const CategoryHamburgerMenu = ({ categoryName, categoryType = "supermarket" }: CategoryHamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bulkQuantity, setBulkQuantity] = useState(10);
  const [selectedBulkItems, setSelectedBulkItems] = useState<string[]>([]);
  const { addToCart } = useCart();

  // Bulk buying options based on category
  const getBulkOptions = () => {
    switch (categoryType) {
      case "supermarket":
        return [
          { id: "rice", name: "Rice (50kg bag)", unitPrice: 1.20, bulkPrice: 45.00, savings: 15.00, minQty: 1, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop" },
          { id: "cooking-oil", name: "Cooking Oil (20L)", unitPrice: 4.25, bulkPrice: 75.00, savings: 10.00, minQty: 1, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop" },
          { id: "flour", name: "Flour (25kg)", unitPrice: 0.80, bulkPrice: 18.00, savings: 2.00, minQty: 1, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop" },
          { id: "sugar", name: "Sugar (50kg)", unitPrice: 1.50, bulkPrice: 65.00, savings: 10.00, minQty: 1, image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop" },
          { id: "beans", name: "Beans (25kg)", unitPrice: 2.20, bulkPrice: 50.00, savings: 5.00, minQty: 1, image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=100&h=100&fit=crop" },
          { id: "maize-meal", name: "Maize Meal (50kg)", unitPrice: 0.90, bulkPrice: 40.00, savings: 5.00, minQty: 1, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop" }
        ];
      case "commodity":
        return [
          { id: "wheat", name: "Wheat (1 ton)", unitPrice: 350, bulkPrice: 320, savings: 30, minQty: 1, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop" },
          { id: "maize", name: "Maize (1 ton)", unitPrice: 280, bulkPrice: 260, savings: 20, minQty: 1, image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=100&h=100&fit=crop" },
          { id: "soybeans", name: "Soybeans (500kg)", unitPrice: 180, bulkPrice: 170, savings: 10, minQty: 2, image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=100&h=100&fit=crop" }
        ];
      default:
        return [
          { id: "bulk1", name: `Bulk ${categoryName} Package`, unitPrice: 25, bulkPrice: 20, savings: 5, minQty: 5, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop" }
        ];
    }
  };

  const bulkOptions = getBulkOptions();

  const handleBulkItemToggle = (itemId: string) => {
    setSelectedBulkItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleAddBulkToCart = () => {
    const selectedItems = bulkOptions.filter(item => selectedBulkItems.includes(item.id));
    selectedItems.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.bulkPrice,
        image: item.image,
        quantity: bulkQuantity,
        variant: { bulk: true, savings: item.savings }
      });
    });
    
    if (selectedItems.length > 0) {
      alert(`Added ${selectedItems.length} bulk item(s) to cart with savings!`);
      setSelectedBulkItems([]);
      setIsOpen(false);
    }
  };

  const getTotalSavings = () => {
    return bulkOptions
      .filter(item => selectedBulkItems.includes(item.id))
      .reduce((total, item) => total + (item.savings * bulkQuantity), 0);
  };

  const getFeaturesList = () => {
    const baseFeatures = [
      {
        icon: Calculator,
        title: "Budget Planner",
        description: "Track your spending and set budgets",
        action: "integrated"
      },
      {
        icon: Package,
        title: "Buy in Bulk",
        description: "Save money with bulk purchases",
        action: "bulk"
      },
      {
        icon: TrendingDown,
        title: "Price Alerts",
        description: "Get notified when prices drop",
        action: () => alert("Price alerts feature coming soon!")
      },
      {
        icon: Users,
        title: "Group Orders",
        description: "Order with friends and save",
        action: () => alert("Group orders feature coming soon!")
      }
    ];

    // Add category-specific features
    switch (categoryType) {
      case "supermarket":
        return [
          ...baseFeatures,
          {
            icon: Clock,
            title: "Delivery Scheduling",
            description: "Schedule your grocery delivery",
            action: () => alert("Delivery scheduling available!")
          },
          {
            icon: Star,
            title: "Loyalty Points",
            description: "Earn points with every purchase",
            action: () => alert("You have 245 loyalty points!")
          }
        ];
      case "commodity":
        return [
          ...baseFeatures,
          {
            icon: DollarSign,
            title: "Market Rates",
            description: "Live commodity exchange rates",
            action: () => alert("Current market rates displayed!")
          },
          {
            icon: Calendar,
            title: "Futures Trading",
            description: "Trade commodity futures",
            action: () => alert("Futures trading coming soon!")
          }
        ];
      default:
        return baseFeatures;
    }
  };

  const features = getFeaturesList();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="fixed top-24 right-4 z-40 shadow-lg">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {categoryName} Features
          </SheetTitle>
          <SheetDescription>
            Access special features and bulk buying options for {categoryName.toLowerCase()}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Budget Planner */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5" />
                Budget Planner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetPlanner />
            </CardContent>
          </Card>

          {/* Bulk Buying Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5" />
                Buy in Bulk & Save
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bulk-quantity">Quantity Multiplier</Label>
                <Input
                  id="bulk-quantity"
                  type="number"
                  min="1"
                  max="100"
                  value={bulkQuantity}
                  onChange={(e) => setBulkQuantity(parseInt(e.target.value) || 1)}
                  className="w-24"
                />
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Available Bulk Items:</h4>
                {bulkOptions.map((item) => (
                  <div
                    key={item.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedBulkItems.includes(item.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleBulkItemToggle(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium">{item.name}</h5>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="line-through">${(item.unitPrice * item.minQty * bulkQuantity).toFixed(2)}</span>
                          <span className="font-semibold text-green-600">
                            ${(item.bulkPrice * bulkQuantity).toFixed(2)}
                          </span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <Percent className="h-2 w-2 mr-1" />
                          Save ${(item.savings * bulkQuantity).toFixed(2)}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Min: {item.minQty}</div>
                        {selectedBulkItems.includes(item.id) && (
                          <Badge variant="default" className="text-xs">Selected</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedBulkItems.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold">Total Savings:</div>
                      <div className="text-2xl font-bold text-green-600">
                        ${getTotalSavings().toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {selectedBulkItems.length} item{selectedBulkItems.length !== 1 ? 's' : ''} selected
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Quantity: {bulkQuantity}x each
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleAddBulkToCart} className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add Bulk Items to Cart
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5" />
                Category Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index}>
                    <div
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => {
                        if (typeof feature.action === 'function') {
                          feature.action();
                        }
                      }}
                    >
                      <div className="p-2 rounded-full bg-primary/10">
                        <feature.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        {feature.action === "integrated" ? "Active" : "Try Now"}
                      </Button>
                    </div>
                    {index < features.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Nearby Vendors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">25%</div>
                  <div className="text-sm text-muted-foreground">Avg. Savings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">2.3km</div>
                  <div className="text-sm text-muted-foreground">Avg. Distance</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">4.7★</div>
                  <div className="text-sm text-muted-foreground">Avg. Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryHamburgerMenu;
