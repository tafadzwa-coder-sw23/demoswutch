import React, { useState } from "react";
import { Hammer, Camera, Truck, Wrench, ShoppingCart, Star, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from "@/components/ui/search-bar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useCart } from "@/context/CartContext";

const HardwareBuildingPage = () => {
  const [activeTab, setActiveTab] = useState("materials");
  const { addToCart } = useCart();

  const mockMaterials = [
    { id: '1', name: 'Cement (50kg)', price: 15.50, supplier: 'Hardware World', inStock: true, category: 'Cement', image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f4c4?w=200&h=200&fit=crop', rating: 4.5, location: 'Harare' },
    { id: '2', name: 'Bricks (1000pcs)', price: 120.00, supplier: 'BuildMart', inStock: true, category: 'Bricks', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop', rating: 4.3, location: 'Bulawayo' },
    { id: '3', name: 'PVC Pipes (6m)', price: 8.75, supplier: 'PlumbPro', inStock: false, category: 'Pipes', image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f4c4?w=200&h=200&fit=crop', rating: 4.7, location: 'Gweru' },
    { id: '4', name: 'Paint (5L)', price: 25.00, supplier: 'ColorMax', inStock: true, category: 'Paint', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop', rating: 4.6, location: 'Mutare' },
    { id: '5', name: 'Steel Rods (12mm)', price: 45.00, supplier: 'SteelCorp', inStock: true, category: 'Steel', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop', rating: 4.4, location: 'Sam Levy' },
    { id: '6', name: 'Timber (2x4)', price: 35.00, supplier: 'WoodWorks', inStock: true, category: 'Timber', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop', rating: 4.8, location: 'Avondale' },
  ];

  const mockDemandSignals = [
    { id: '1', material: 'Cement', quantity: '20 bags', location: 'Borrowdale', urgency: 'High', contact: 'John M.', price: 15.50, image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f4c4?w=100&h=100&fit=crop' },
    { id: '2', material: 'Timber', quantity: '50 planks', location: 'Avondale', urgency: 'Medium', contact: 'Sarah K.', price: 35.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop' },
    { id: '3', material: 'Steel Rods', quantity: '100 pieces', location: 'Sam Levy', urgency: 'Low', contact: 'Mike T.', price: 45.00, image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop' },
    { id: '4', material: 'Paint', quantity: '10 cans', location: 'CBD', urgency: 'High', contact: 'Grace L.', price: 25.00, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop' },
  ];

  const handleVoiceSearch = () => {
    if (!voiceEnabled) return;
    setIsListening(true);
    setTimeout(() => {
      setSearchQuery("cement and bricks");
      setIsListening(false);
    }, 2000);
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      variant: { category: item.category, supplier: item.supplier }
    });
  };

  const mockProjectTools = [
    { id: '1', name: 'Project Calculator', description: 'Calculate materials needed for your project' },
    { id: '2', name: 'Cost Estimator', description: 'Get accurate cost estimates for construction' },
    { id: '3', name: 'Timeline Planner', description: 'Plan your construction timeline' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-amber-600 bg-amber-100">
              <Hammer className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Hardware & Building
            </h1>
            <p className="text-lg text-muted-foreground">
              Complete building materials with visual search and project management
            </p>
          </div>

          <SearchBar
            className="max-w-2xl mx-auto"
            placeholder="Search building materials, tools, or services..."
          />
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="visual">Visual Search</TabsTrigger>
              <TabsTrigger value="demand">Demand Signals</TabsTrigger>
              <TabsTrigger value="projects">Project Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="materials" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockMaterials.map(material => (
                  <Card key={material.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="mb-4">
                      <img 
                        src={material.image} 
                        alt={material.name}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{material.name}</h3>
                        <Badge variant={material.inStock ? 'default' : 'destructive'}>
                          {material.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-muted-foreground">
                          Supplier: {material.supplier}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Category: {material.category}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {material.location}
                          <Star className="h-4 w-4 ml-2" />
                          {material.rating}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">${material.price}</span>
                      <Button size="sm" onClick={() => handleAddToCart(material)} disabled={!material.inStock}>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        {material.inStock ? 'Add to Cart' : 'Notify When Available'}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="visual" className="space-y-6">
              <Card className="p-6">
                <div className="text-center">
                  <Camera className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Visual Search</h3>
                  <p className="text-muted-foreground mb-6">
                    Take a photo of any building material to find similar products
                  </p>
                  <Button className="mb-4">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Or upload an existing image
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="demand" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Hyper-Local Demand Signals</h3>
                <div className="space-y-4">
                  {mockDemandSignals.map(signal => (
                    <div key={signal.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{signal.material}</h4>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {signal.quantity} • Location: {signal.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Contact: {signal.contact}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={signal.urgency === 'High' ? 'destructive' : signal.urgency === 'Medium' ? 'default' : 'secondary'}>
                          {signal.urgency}
                        </Badge>
                        <Button size="sm" className="mt-2">Respond</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockProjectTools.map(tool => (
                  <Card key={tool.id} className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Wrench className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{tool.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                    <Button size="sm" className="w-full">Use Tool</Button>
                  </Card>
                ))}
              </div>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Gig-Economy Logistics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Delivery Driver Available</h4>
                      <p className="text-sm text-muted-foreground">Can deliver up to 500kg • Available now</p>
                    </div>
                    <Button size="sm">Hire Driver</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Construction Helper</h4>
                      <p className="text-sm text-muted-foreground">Experienced in building • Available this weekend</p>
                    </div>
                    <Button size="sm">Hire Helper</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HardwareBuildingPage;
