import React, { useState } from "react";
import { Heart, PawPrint, MapPin, Star, Clock, ShoppingCart, Users, Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from "@/components/ui/search-bar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useCart } from "@/context/CartContext";

const PetShopsPage = () => {
  const [activeTab, setActiveTab] = useState("products");
  const { addToCart } = useCart();

  const mockProducts = [
    { id: '1', name: 'Dog Food (Premium)', price: 25.00, category: 'Pet Food', inStock: true, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop', rating: 4.6, location: 'Harare' },
    { id: '2', name: 'Cat Litter (10kg)', price: 15.50, category: 'Pet Care', inStock: true, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop', rating: 4.5, location: 'Bulawayo' },
    { id: '3', name: 'Dog Collar & Leash Set', price: 18.00, category: 'Accessories', inStock: true, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop', rating: 4.7, location: 'Gweru' },
    { id: '4', name: 'Cat Scratching Post', price: 35.00, category: 'Toys', inStock: false, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop', rating: 4.8, location: 'Mutare' },
    { id: '5', name: 'Fish Tank (20L)', price: 45.00, category: 'Aquarium', inStock: true, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop', rating: 4.4, location: 'Sam Levy' },
    { id: '6', name: 'Bird Cage (Large)', price: 65.00, category: 'Accessories', inStock: true, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop', rating: 4.9, location: 'Avondale' },
  ];

  const mockPets = [
    { id: '1', name: 'Golden Retriever Puppy', breed: 'Golden Retriever', age: '8 weeks', price: 450.00, location: 'Harare', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop', rating: 4.9, vaccinated: true },
    { id: '2', name: 'Persian Cat', breed: 'Persian', age: '6 months', price: 280.00, location: 'Bulawayo', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop', rating: 4.7, vaccinated: true },
    { id: '3', name: 'Budgerigar Pair', breed: 'Budgerigar', age: '4 months', price: 45.00, location: 'Gweru', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop', rating: 4.6, vaccinated: false },
  ];

  const mockServices = [
    { id: '1', name: 'Dr. Sarah Moyo', specialty: 'Veterinarian', location: 'Avondale', rating: 4.9, available: true, price: 50.00, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop' },
    { id: '2', name: 'Pet Grooming Pro', specialty: 'Pet Grooming', location: 'Sam Levy', rating: 4.8, available: true, price: 25.00, image: 'https://images.unsplash.com/photo-1594824379913-3a0a6b5b5b5b?w=100&h=100&fit=crop' },
    { id: '3', name: 'Pet Training Center', specialty: 'Pet Training', location: 'Borrowdale', rating: 4.7, available: false, price: 35.00, image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop' },
  ];

  const mockPriceComparison = [
    { item: 'Dog Food (Premium)', shops: [
      { name: 'Pet Paradise', price: 25.00, inStock: true, savings: 0 },
      { name: 'Animal Kingdom', price: 23.50, inStock: true, savings: 1.50 },
      { name: 'Pet World', price: 26.00, inStock: true, savings: -1.00 },
      { name: 'Furry Friends', price: 24.25, inStock: false, savings: 0.75 },
    ]},
    { item: 'Cat Litter (10kg)', shops: [
      { name: 'Pet Paradise', price: 15.50, inStock: true, savings: 0 },
      { name: 'Animal Kingdom', price: 14.75, inStock: true, savings: 0.75 },
      { name: 'Pet World', price: 16.00, inStock: true, savings: -0.50 },
      { name: 'Furry Friends', price: 15.00, inStock: true, savings: 0.50 },
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-pink-500 bg-pink-100">
              <Heart className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Pet Shops & Services
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything for your furry, feathered, and scaled friends
            </p>
          </div>

          <SearchBar
            className="max-w-2xl mx-auto"
            placeholder="Search for pet products, services, or adopt a new friend..."
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
              <PawPrint className="h-6 w-6 text-pink-500" />
              <h2 className="text-2xl font-semibold">Pet Product Price Comparison</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Compare pet product prices across different shops to find the best deals.
            </p>
            <div className="space-y-6">
              {mockPriceComparison.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-4">{item.item}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {item.shops.map((shop, shopIdx) => (
                      <div key={shopIdx} className={`p-4 rounded-lg border-2 ${shop.inStock ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} hover:shadow-md transition-shadow`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold">{shop.name}</span>
                          <Badge variant={shop.inStock ? 'default' : 'destructive'}>
                            {shop.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold mb-2">${shop.price}</div>
                        {shop.savings > 0 && (
                          <div className="text-sm text-green-600 font-semibold">
                            Save ${shop.savings.toFixed(2)}
                          </div>
                        )}
                        {shop.savings < 0 && (
                          <div className="text-sm text-red-600 font-semibold">
                            +${Math.abs(shop.savings).toFixed(2)} more
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
              <TabsTrigger value="pets">Adopt</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="vets">Veterinarians</TabsTrigger>
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

            <TabsContent value="pets" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPets.map(pet => (
                  <Card key={pet.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={pet.image} 
                        alt={pet.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{pet.name}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-muted-foreground">
                          Breed: {pet.breed}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Age: {pet.age}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {pet.location}
                          <Star className="h-4 w-4 ml-2 fill-yellow-400 text-yellow-400" />
                          {pet.rating}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Badge variant={pet.vaccinated ? 'default' : 'secondary'}>
                            {pet.vaccinated ? 'Vaccinated' : 'Not Vaccinated'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">${pet.price}</span>
                        <Button size="sm" onClick={() => handleAddToCart(pet)}>
                          <Heart className="h-4 w-4 mr-1" />
                          Adopt
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockServices.map(service => (
                  <Card key={service.id} className="p-6 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-start gap-4">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          <Badge variant={service.available ? 'default' : 'secondary'}>
                            {service.available ? 'Available' : 'Busy'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">{service.specialty}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4" />
                          {service.location}
                          <Star className="h-4 w-4 ml-2 fill-yellow-400 text-yellow-400" />
                          {service.rating}
                        </div>
                        <div className="text-lg font-bold text-primary mb-4">${service.price}</div>
                        <div className="flex gap-2">
                          <Button size="sm" disabled={!service.available}>
                            <Users className="h-4 w-4 mr-1" />
                            Book Service
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

            <TabsContent value="vets" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Find a Veterinarian</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockServices.filter(s => s.specialty === 'Veterinarian').map(vet => (
                    <Card key={vet.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <img 
                          src={vet.image} 
                          alt={vet.name}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{vet.name}</h3>
                          <div className="text-sm text-muted-foreground mb-2">{vet.specialty}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {vet.location}
                            <Star className="h-4 w-4 ml-2 fill-yellow-400 text-yellow-400" />
                            {vet.rating}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">${vet.price}</div>
                          <div className="text-xs text-muted-foreground">per consultation</div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1" disabled={!vet.available}>
                          <Stethoscope className="h-4 w-4 mr-1" />
                          Book Appointment
                        </Button>
                        <Button size="sm" variant="outline">
                          Call
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PetShopsPage;