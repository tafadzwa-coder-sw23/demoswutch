import React, { useState, useEffect } from "react";
import { ShoppingCart, Store, TrendingDown, MapPin, Star, Clock, Heart, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import EnhancedSearchResults from "@/components/EnhancedSearchResults";
import CategoryHamburgerMenu from "@/components/CategoryHamburgerMenu";
import CategoryGeneralContent from "@/components/CategoryGeneralContent";
import { useCart } from "@/context/CartContext";
import { useSearchContext } from "@/context/SearchContext";

const SupermarketPage = () => {
  const { addToCart } = useCart();
  const { state: searchState } = useSearchContext();
  const [searchedItems, setSearchedItems] = useState<any[]>([]);

  // Update searched items when search state changes
  useEffect(() => {
    if (searchState.results && searchState.results.length > 0) {
      setSearchedItems(searchState.results);
    } else {
      // Default items if no search
      setSearchedItems([]);
    }
  }, [searchState.results]);

  const mockStores = [
    { id: '1', name: 'Mai Sarah Fresh Produce', location: 'CBD Street', distance: '0.2km', rating: 4.8, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop', open: true, hours: '6AM-6PM', type: 'Street Vendor' },
    { id: '2', name: 'OK Zimbabwe', location: 'Avondale', distance: '0.5km', rating: 4.2, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop', open: true, hours: '7AM-9PM', type: 'Supermarket' },
    { id: '3', name: 'Brother John BBQ & Groceries', location: 'Borrowdale', distance: '0.8km', rating: 4.7, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop', open: true, hours: '5AM-8PM', type: 'Informal' },
    { id: '4', name: 'Pick n Pay', location: 'Sam Levy', distance: '1.2km', rating: 4.5, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop', open: true, hours: '8AM-8PM', type: 'Supermarket' },
    { id: '5', name: 'Auntie Grace Home Garden', location: 'Avondale', distance: '0.3km', rating: 4.9, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop', open: true, hours: '7AM-5PM', type: 'Home Garden' },
    { id: '6', name: 'Spar', location: 'Borrowdale', distance: '2.1km', rating: 4.0, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop', open: false, hours: '7AM-9PM', type: 'Supermarket' },
  ];

  const mockPriceComparison = [
    { item: 'Bread (Loaf)', stores: [
      { name: 'OK Zimbabwe', price: 2.50, inStock: true, savings: 0 },
      { name: 'Pick n Pay', price: 2.30, inStock: true, savings: 0.20 },
      { name: 'Spar', price: 2.75, inStock: false, savings: -0.25 },
      { name: 'Food Lovers', price: 2.40, inStock: true, savings: 0.10 },
    ]},
    { item: 'Milk (1L)', stores: [
      { name: 'OK Zimbabwe', price: 3.20, inStock: true, savings: 0 },
      { name: 'Pick n Pay', price: 3.00, inStock: true, savings: 0.20 },
      { name: 'Spar', price: 3.15, inStock: true, savings: 0.05 },
      { name: 'Food Lovers', price: 2.95, inStock: true, savings: 0.25 },
    ]},
    { item: 'Rice (5kg)', stores: [
      { name: 'OK Zimbabwe', price: 8.50, inStock: true, savings: 0 },
      { name: 'Pick n Pay', price: 8.20, inStock: true, savings: 0.30 },
      { name: 'Spar', price: 8.75, inStock: true, savings: -0.25 },
      { name: 'Food Lovers', price: 7.95, inStock: true, savings: 0.55 },
    ]},
  ];

  const mockProducts = [
    { id: '1', name: 'Fresh Tomatoes', price: 1.50, category: 'Vegetables', inStock: true, image: 'https://images.unsplash.com/photo-1546470427-e26264be0d2b?w=200&h=200&fit=crop', rating: 4.5 },
    { id: '2', name: 'Chicken Breast', price: 6.50, category: 'Meat', inStock: true, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop', rating: 4.3 },
    { id: '3', name: 'Cooking Oil', price: 4.25, category: 'Pantry', inStock: true, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop', rating: 4.7 },
    { id: '4', name: 'Mealie Meal', price: 3.80, category: 'Grains', inStock: true, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop', rating: 4.6 },
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      variant: { category: product.category }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar - Category Specific */}
      <FixedSearchBar 
        searchContext="category"
        categoryName="Supermarket"
        placeholder="Search for groceries, compare prices..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-secondary-dark bg-secondary/10">
              <Store className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Supermarket & Grocery
            </h1>
            <p className="text-lg text-muted-foreground">
              Shop from your neighbors - from street vendors to supermarkets
            </p>
          </div>
        </div>
      </div>

      {/* Category Hamburger Menu */}
      <CategoryHamburgerMenu 
        categoryName="Supermarket & Grocery" 
        categoryType="supermarket"
      />

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Conditional Content Based on Search State */}
          {searchState.searchedItem ? (
            // Show Enhanced Search Results when user searched for specific item
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Search Results for "{searchState.query}"</h2>
                <p className="text-muted-foreground">
                  Found {searchState.results.length} result{searchState.results.length !== 1 ? 's' : ''} in Supermarket & Grocery
                </p>
              </div>
              <EnhancedSearchResults searchedItem={searchState.searchedItem} />
            </div>
          ) : (
            // Show General Category Content when user clicked category icon
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Supermarket & Grocery</h2>
                <p className="text-muted-foreground">
                  Discover local vendors, fresh produce, and great deals in your area
                </p>
              </div>
              <CategoryGeneralContent 
                categoryName="Supermarket & Grocery" 
                categoryType="supermarket"
              />
            </div>
          )}

          {/* Legacy content - now handled by conditional logic above */}
          {false && searchedItems.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Search className="h-6 w-6 text-blue-500" />
                <h2 className="text-2xl font-semibold">
                  {searchState.query ? `Results for "${searchState.query}"` : 'Search Results'}
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Here's what we found for your search in the Supermarket category
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
                        Add
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

          {/* Smart Shopper Comparison */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingDown className="h-6 w-6 text-green-500" />
              <h2 className="text-2xl font-semibold">Smart Shopper Price Comparison</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Compare prices across different stores to find the best deals.
            </p>
            <div className="space-y-6">
              {mockPriceComparison.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-4">{item.item}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {item.stores.map((store, storeIdx) => (
                      <div key={storeIdx} className={`p-4 rounded-lg border-2 ${store.inStock ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} hover:shadow-md transition-shadow`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold">{store.name}</span>
                          <Badge variant={store.inStock ? 'default' : 'destructive'}>
                            {store.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold mb-2">${store.price}</div>
                        {store.savings > 0 && (
                          <div className="text-sm text-green-600 font-semibold">
                            Save ${store.savings.toFixed(2)}
                          </div>
                        )}
                        {store.savings < 0 && (
                          <div className="text-sm text-red-600 font-semibold">
                            +${Math.abs(store.savings).toFixed(2)} more
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Featured Products */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProducts.map(product => (
                <div key={product.id} className="group border rounded-lg p-4 hover:shadow-lg transition-all duration-200">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {product.rating}
                    <Badge variant="outline" className="ml-auto">{product.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">${product.price}</span>
                    <Button size="sm" onClick={() => handleAddToCart(product)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Nearby Stores */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Local Sellers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockStores.map(store => (
                <div key={store.id} className="group border rounded-lg p-4 hover:shadow-lg transition-all duration-200">
                  <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={store.image} 
                      alt={store.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{store.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{store.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Badge variant="outline" className="text-xs">
                      {store.type}
                    </Badge>
                    <MapPin className="h-4 w-4" />
                    {store.distance}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    {store.hours}
                    <Badge variant={store.open ? 'default' : 'secondary'} className="ml-auto">
                      {store.open ? 'Open' : 'Closed'}
                    </Badge>
                  </div>
                  <Button size="sm" className="w-full" disabled={!store.open}>
                    {store.open ? 'Visit Seller' : 'Closed'}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Community Shopping Needs */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">What Your Neighbors Need</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">JD</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Looking for fresh milk in Avondale</div>
                  <div className="text-sm text-muted-foreground">Posted 1h ago by Jane Doe • 0.3km away</div>
                </div>
                <Button size="sm" variant="outline">I Can Help</Button>
              </div>
              <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">JS</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Need 5kg rice, best price in Sam Levy</div>
                  <div className="text-sm text-muted-foreground">Posted 3h ago by John Smith • 0.8km away</div>
                </div>
                <Button size="sm" variant="outline">I Can Help</Button>
              </div>
              <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">MN</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Looking for someone to share bulk vegetable order</div>
                  <div className="text-sm text-muted-foreground">Posted 5h ago by Mary Ncube • 0.5km away</div>
                </div>
                <Button size="sm" variant="outline">I Can Help</Button>
              </div>
            </div>
            <Button className="mt-6 w-full">Post What You Need</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupermarketPage;