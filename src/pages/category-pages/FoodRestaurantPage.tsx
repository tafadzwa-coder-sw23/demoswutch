import React, { useState, useEffect } from "react";
import { Utensils, Clock, Star, MapPin, Truck, ShoppingCart, Heart, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import CategoryHamburgerMenu from "@/components/CategoryHamburgerMenu";
import { useCart } from "@/context/CartContext";
import { useSearchContext } from "@/context/SearchContext";

const FoodRestaurantPage = () => {
  const [activeTab, setActiveTab] = useState("restaurants");
  const { addToCart } = useCart();
  const { state: searchState } = useSearchContext();
  const [searchedItems, setSearchedItems] = useState<any[]>([]);

  // Update searched items when search state changes
  useEffect(() => {
    if (searchState.results && searchState.results.length > 0) {
      setSearchedItems(searchState.results);
    } else {
      setSearchedItems([]);
    }
  }, [searchState.results]);

  const mockRestaurants = [
    { id: '1', name: 'Nandos', type: 'Fast Food', rating: 4.3, deliveryTime: '25-35 min', priceRange: '$$', cuisine: 'Portuguese', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop', location: 'Sam Levy', open: true },
    { id: '2', name: 'Pizza Inn', type: 'Fast Food', rating: 4.1, deliveryTime: '20-30 min', priceRange: '$$', cuisine: 'Italian', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop', location: 'Avondale', open: true },
    { id: '3', name: 'Mama Mia', type: 'Restaurant', rating: 4.6, deliveryTime: '35-45 min', priceRange: '$$$', cuisine: 'Local', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop', location: 'Borrowdale', open: true },
    { id: '4', name: 'KFC', type: 'Fast Food', rating: 4.0, deliveryTime: '15-25 min', priceRange: '$$', cuisine: 'American', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop', location: 'CBD', open: false },
  ];

  const mockStreetVendors = [
    { id: '1', name: 'Mai Sarah Sadza', type: 'Street Food', rating: 4.8, location: 'CBD', specialty: 'Traditional Sadza', image: 'https://images.unsplash.com/photo-1622979136416-a0217372379c?w=300&h=200&fit=crop' },
    { id: '2', name: 'Brother John BBQ', type: 'Street Food', rating: 4.5, location: 'Avondale', specialty: 'Grilled Meats', image: 'https://images.unsplash.com/photo-1599021400794-e0a27313667b?w=300&h=200&fit=crop' },
    { id: '3', name: 'Auntie Grace Cakes', type: 'Street Food', rating: 4.7, location: 'Sam Levy', specialty: 'Homemade Cakes', image: 'https://images.unsplash.com/photo-1563729781174-e67b031717c3?w=300&h=200&fit=crop' },
  ];

  const mockScheduledOrders = [
    { id: '1', restaurant: 'Nandos', item: 'Chicken & Chips', time: '12:30 PM', status: 'Preparing' },
    { id: '2', restaurant: 'Pizza Inn', item: 'Margherita Pizza', time: '7:00 PM', status: 'Scheduled' },
  ];

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price || 15,
      image: item.image || '',
      quantity: 1,
      variant: { type: item.type, location: item.location }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar - Category Specific */}
      <FixedSearchBar 
        searchContext="category"
        categoryName="Food & Restaurant"
        placeholder="Search restaurants, cuisines, or dishes..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-orange-500 bg-orange-100">
              <Utensils className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Food & Restaurant
            </h1>
            <p className="text-lg text-muted-foreground">
              From street vendors to fine dining - discover, order, and track your meals
            </p>
          </div>
        </div>
      </div>

      {/* Category Hamburger Menu */}
      <CategoryHamburgerMenu 
        categoryName="Food & Restaurant" 
        categoryType="restaurant"
      />

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Searched Items - Show prominently if user searched for something */}
          {searchedItems.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Search className="h-6 w-6 text-orange-500" />
                <h2 className="text-2xl font-semibold">
                  {searchState.query ? `Results for "${searchState.query}"` : 'Search Results'}
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Here's what we found for your search in the Food & Restaurant category
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchedItems.map((item) => (
                  <div key={item.id} className="group border rounded-lg p-4 hover:shadow-lg transition-all duration-200">
                    <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {item.rating}
                      <Badge variant="outline" className="ml-auto">{item.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">{item.currency} {item.price}</span>
                      <Button size="sm" onClick={() => addToCart({
                        id: item.id,
                        name: item.title,
                        price: item.price,
                        image: item.image,
                        quantity: 1,
                        variant: { category: item.category }
                      })} className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Order
                      </Button>
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {item.vendor.name} • {item.vendor.distance}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
              <TabsTrigger value="street">Street Food</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Orders</TabsTrigger>
              <TabsTrigger value="ai">AI Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="restaurants" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockRestaurants.map(restaurant => (
                  <Card key={restaurant.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{restaurant.name}</h3>
                        <Badge variant={restaurant.open ? 'default' : 'secondary'}>
                          {restaurant.open ? 'Open' : 'Closed'}
                        </Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {restaurant.rating} • {restaurant.cuisine}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {restaurant.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {restaurant.deliveryTime}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Truck className="h-4 w-4" />
                          Delivery Available
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{restaurant.priceRange}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" disabled={!restaurant.open}>
                            <Heart className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" onClick={() => handleAddToCart(restaurant)} disabled={!restaurant.open}>
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Order
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="street" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockStreetVendors.map(vendor => (
                  <Card key={vendor.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={vendor.image} 
                        alt={vendor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{vendor.name}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {vendor.rating} • {vendor.specialty}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {vendor.location}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Avg. Price: $5</span>
                        <Button size="sm" onClick={() => handleAddToCart(vendor)}>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Order
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Your Scheduled Orders</h2>
                <div className="space-y-4">
                  {mockScheduledOrders.map((order, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <div className="font-semibold">{order.item} from {order.restaurant}</div>
                        <div className="text-sm text-muted-foreground">Scheduled for: {order.time}</div>
                      </div>
                      <Badge variant="outline">{order.status}</Badge>
                    </div>
                  ))}
                </div>
                <Button className="mt-6 w-full">View All Orders</Button>
              </Card>
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">AI-Powered Recommendations</h2>
                <p className="text-muted-foreground mb-6">
                  Based on your preferences and order history, here are some suggestions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Utensils className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Try the new "Spicy Chicken Burger" at Nandos!</div>
                      <div className="text-sm text-muted-foreground">Highly rated by users with similar tastes.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">New street vendor: "Gweru Grills" near you!</div>
                      <div className="text-sm text-muted-foreground">Specializing in traditional Zimbabwean BBQ.</div>
                    </div>
                  </div>
                </div>
                <Button className="mt-6 w-full">Explore More Recommendations</Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FoodRestaurantPage;