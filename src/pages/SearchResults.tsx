import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Clock, ShoppingCart, Phone, MessageCircle, Navigation } from "lucide-react";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useCart } from "@/context/CartContext";
import { useSearch, useVendors, usePopularProducts } from "@/hooks/useMarketplaceData";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { addToCart } = useCart();
  
  // Use the new state management hooks
  const { search, searchResults, isLoading, error } = useSearch();
  const { nearbyVendors, getNearbyVendors } = useVendors();
  const { popularProducts, loadPopularProducts } = usePopularProducts();

  // Perform search when query changes
  useEffect(() => {
    if (query) {
      search(query);
      getNearbyVendors();
      loadPopularProducts(4);
    }
  }, [query, search, getNearbyVendors, loadPopularProducts]);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
      variant: { category: product.category }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar - Global Search */}
      <FixedSearchBar 
        searchContext="global"
        placeholder="Search for products, services, properties, jobs..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Search Results
            </h1>
            <p className="text-lg text-muted-foreground">
              {query ? `Results for "${query}"` : "Search for products and services"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Searching for {query}...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">Error: {error}</p>
            </div>
          ) : (
            <>
              {/* Main Search Results */}
              {searchResults?.products.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img 
                        src={item.images[0]} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-6">
                      <div>
                        <Badge variant="outline" className="mb-2">{item.category}</Badge>
                        <h2 className="text-3xl font-bold text-foreground mb-2">{item.title}</h2>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{item.rating}</span>
                          </div>
                          <Badge variant={item.inStock ? "default" : "destructive"}>
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                      </div>

                      <div className="text-4xl font-bold text-foreground">
                        {item.currency} {item.price}
                      </div>

                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>

                      {/* Vendor Info */}
                      <Card className="p-4 bg-muted/50">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" />
                            <AvatarFallback>{item.vendor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{item.vendor.name}</h3>
                              {item.vendor.verified && (
                                <Badge variant="secondary" className="text-xs">✓ Verified</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {item.vendor.distance}
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                {item.vendor.rating}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Navigation className="h-4 w-4 mr-2" />
                            Directions
                          </Button>
                        </div>
                      </Card>

                      <Button 
                        size="lg" 
                        className="w-full"
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.inStock}
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Nearby Vendors with Same Product */}
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Nearby Vendors with {query}</h2>
                <div className="space-y-4">
                  {nearbyVendors.map((vendor) => (
                    <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                          <span className="font-bold text-sm">{vendor.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{vendor.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {vendor.distance}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {vendor.rating}
                            </span>
                            <Badge variant="outline" className="text-xs">{vendor.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">USD {vendor.price}</div>
                        <Badge variant={vendor.inStock ? "default" : "destructive"} className="text-xs">
                          {vendor.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recommended Products */}
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">You Might Also Like</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {popularProducts.map((item) => (
                    <div key={item.id} className="group border rounded-lg p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
                      <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                        <img 
                          src={item.images[0]} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <div className="text-sm text-muted-foreground mb-2">
                        {item.vendor.name} • {item.vendor.distance}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold">USD {item.price}</div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;