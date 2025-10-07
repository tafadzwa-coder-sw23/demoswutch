import React, { useState } from "react";
import { Wheat, Tractor, Leaf, MapPin, Star, Clock, ShoppingCart, Heart, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from "@/components/ui/search-bar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useCart } from "@/context/CartContext";

const AgriculturePage = () => {
  const [activeTab, setActiveTab] = useState("products");
  const { addToCart } = useCart();

  const mockProducts = [
    { id: '1', name: 'Fertilizer NPK 15-15-15', price: 45.00, category: 'Fertilizers', inStock: true, image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f4c4?w=200&h=200&fit=crop', rating: 4.6, location: 'Harare' },
    { id: '2', name: 'Maize Seeds (Hybrid)', price: 25.00, category: 'Seeds', inStock: true, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop', rating: 4.8, location: 'Bulawayo' },
    { id: '3', name: 'Drip Irrigation Kit', price: 120.00, category: 'Irrigation', inStock: true, image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f4c4?w=200&h=200&fit=crop', rating: 4.5, location: 'Gweru' },
    { id: '4', name: 'Chicken Feed (50kg)', price: 35.00, category: 'Livestock', inStock: true, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop', rating: 4.7, location: 'Mutare' },
    { id: '5', name: 'Pesticide Sprayer', price: 85.00, category: 'Equipment', inStock: false, image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f4c4?w=200&h=200&fit=crop', rating: 4.4, location: 'Sam Levy' },
    { id: '6', name: 'Tomato Seeds (Heirloom)', price: 8.50, category: 'Seeds', inStock: true, image: 'https://images.unsplash.com/photo-1546470427-e26264be0d2b?w=200&h=200&fit=crop', rating: 4.9, location: 'Avondale' },
  ];

  const mockLivestock = [
    { id: '1', name: 'Dairy Cow', price: 1200.00, age: '3 years', breed: 'Holstein', location: 'Mashonaland', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop', rating: 4.8 },
    { id: '2', name: 'Boer Goats (Pair)', price: 450.00, age: '1 year', breed: 'Boer', location: 'Matabeleland', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop', rating: 4.6 },
    { id: '3', name: 'Layer Chickens (10)', price: 120.00, age: '6 months', breed: 'Rhode Island Red', location: 'Manicaland', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop', rating: 4.7 },
  ];

  const mockExperts = [
    { id: '1', name: 'Dr. John Moyo', specialty: 'Agronomist', experience: '15 years', rating: 4.9, location: 'Harare', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop' },
    { id: '2', name: 'Sarah Chigumba', specialty: 'Livestock Specialist', experience: '12 years', rating: 4.8, location: 'Bulawayo', image: 'https://images.unsplash.com/photo-1594824379913-3a0a6b5b5b5b?w=100&h=100&fit=crop' },
    { id: '3', name: 'Mike Tshuma', specialty: 'Crop Disease Expert', experience: '10 years', rating: 4.7, location: 'Gweru', image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop' },
  ];

  const mockPriceComparison = [
    { item: 'Fertilizer NPK 15-15-15', suppliers: [
      { name: 'AgriSupplies', price: 45.00, inStock: true, savings: 0 },
      { name: 'FarmMart', price: 42.50, inStock: true, savings: 2.50 },
      { name: 'CropCare', price: 47.00, inStock: true, savings: -2.00 },
      { name: 'GreenFields', price: 43.75, inStock: false, savings: 1.25 },
    ]},
    { item: 'Maize Seeds (Hybrid)', suppliers: [
      { name: 'AgriSupplies', price: 25.00, inStock: true, savings: 0 },
      { name: 'FarmMart', price: 23.50, inStock: true, savings: 1.50 },
      { name: 'CropCare', price: 26.00, inStock: true, savings: -1.00 },
      { name: 'GreenFields', price: 24.25, inStock: true, savings: 0.75 },
    ]},
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      variant: { category: product.category, location: product.location }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section with Search */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-green-500 bg-green-100">
              <Wheat className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Agriculture & Farming
            </h1>
            <p className="text-lg text-muted-foreground">
              Complete agricultural ecosystem with B2C, P2P marketplace and expert consultation
            </p>
          </div>

          <SearchBar
            className="max-w-2xl mx-auto"
            placeholder="Search for seeds, fertilizers, livestock, or farming equipment..."
          />
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          {/* Price Comparison */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="h-6 w-6 text-green-500" />
              <h2 className="text-2xl font-semibold">Agricultural Price Comparison</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Compare prices across different agricultural suppliers to find the best deals.
            </p>
            <div className="space-y-6">
              {mockPriceComparison.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-4">{item.item}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {item.suppliers.map((supplier, supplierIdx) => (
                      <div key={supplierIdx} className={`p-4 rounded-lg border-2 ${supplier.inStock ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} hover:shadow-md transition-shadow`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold">{supplier.name}</span>
                          <Badge variant={supplier.inStock ? 'default' : 'destructive'}>
                            {supplier.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold mb-2">${supplier.price}</div>
                        {supplier.savings > 0 && (
                          <div className="text-sm text-green-600 font-semibold">
                            Save ${supplier.savings.toFixed(2)}
                          </div>
                        )}
                        {supplier.savings < 0 && (
                          <div className="text-sm text-red-600 font-semibold">
                            +${Math.abs(supplier.savings).toFixed(2)} more
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="livestock">Livestock</TabsTrigger>
              <TabsTrigger value="experts">Experts</TabsTrigger>
              <TabsTrigger value="ai">AI Diagnostics</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProducts.map(product => (
                  <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{product.name}</h3>
                        <Badge variant={product.inStock ? 'default' : 'destructive'}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-muted-foreground">
                          Category: {product.category}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {product.location}
                          <Star className="h-4 w-4 ml-2 fill-yellow-400 text-yellow-400" />
                          {product.rating}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">${product.price}</span>
                        <Button size="sm" onClick={() => handleAddToCart(product)} disabled={!product.inStock}>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          {product.inStock ? 'Add to Cart' : 'Notify When Available'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="livestock" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockLivestock.map(animal => (
                  <Card key={animal.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={animal.image} 
                        alt={animal.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{animal.name}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-muted-foreground">
                          Breed: {animal.breed}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Age: {animal.age}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {animal.location}
                          <Star className="h-4 w-4 ml-2 fill-yellow-400 text-yellow-400" />
                          {animal.rating}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">${animal.price}</span>
                        <Button size="sm" onClick={() => handleAddToCart(animal)}>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Inquire
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experts" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockExperts.map(expert => (
                  <Card key={expert.id} className="p-6 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-start gap-4">
                      <img 
                        src={expert.image} 
                        alt={expert.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{expert.name}</h3>
                        <div className="text-sm text-muted-foreground mb-2">{expert.specialty}</div>
                        <div className="text-sm text-muted-foreground mb-2">{expert.experience} experience</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4" />
                          {expert.location}
                          <Star className="h-4 w-4 ml-2 fill-yellow-400 text-yellow-400" />
                          {expert.rating}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">
                            <Users className="h-4 w-4 mr-1" />
                            Consult
                          </Button>
                          <Button size="sm" variant="outline">
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">AI-Powered Agricultural Assistant</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Crop Disease Detection</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload photos of your crops to get instant disease diagnosis and treatment recommendations.
                    </p>
                    <Button>Upload Crop Photo</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Weather Advisory</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get personalized weather alerts and farming recommendations based on your location.
                    </p>
                    <Button variant="outline">View Weather</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Yield Prediction</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      AI-powered yield predictions based on weather, soil, and farming practices.
                    </p>
                    <Button variant="outline">Predict Yield</Button>
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

export default AgriculturePage;