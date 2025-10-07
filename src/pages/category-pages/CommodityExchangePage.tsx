import React, { useState } from "react";
import { ArrowLeftRight, Scale, Handshake, TrendingUp, ShoppingCart, MapPin, Star, Clock, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScrollableSearchBar from "@/components/ScrollableSearchBar";
import HeaderControls from "@/components/HeaderControls";
import EnhancedSearchResults from "@/components/EnhancedSearchResults";
import CategoryHamburgerMenu from "@/components/CategoryHamburgerMenu";
import CategoryGeneralContent from "@/components/CategoryGeneralContent";
import { useCart } from "@/context/CartContext";
import { useSearchContext } from "@/context/SearchContext";

const CommodityExchangePage = () => {
  const [activeTab, setActiveTab] = useState("barter");
  const { addToCart } = useCart();
  const { state: searchState } = useSearchContext();

  const mockBarterItems = [
    { id: '1', title: 'Toyota Hilux 2018', offer: 'Looking for: Tractor or Construction Equipment', type: 'vehicle', value: 15000, location: 'Harare', rating: 4.8, image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop' },
    { id: '2', title: 'Plumbing Services', offer: 'For: 50kg bag of maize meal', type: 'service', value: 25, location: 'Bulawayo', rating: 4.6, image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f4c4?w=300&h=200&fit=crop' },
    { id: '3', title: 'Laptop Repair', offer: 'For: Fresh vegetables or fruits', type: 'service', value: 30, location: 'Gweru', rating: 4.9, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop' },
    { id: '4', title: 'iPhone 13 Pro', offer: 'Looking for: MacBook Air or equivalent', type: 'electronics', value: 800, location: 'Sam Levy', rating: 4.7, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop' },
    { id: '5', title: 'Furniture Set', offer: 'For: Home appliances or electronics', type: 'furniture', value: 450, location: 'Avondale', rating: 4.5, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
    { id: '6', title: 'Graphic Design Services', offer: 'For: Photography equipment or services', type: 'service', value: 40, location: 'Mutare', rating: 4.8, image: 'https://images.unsplash.com/photo-1622979136416-a0217372379c?w=300&h=200&fit=crop' },
  ];

  const mockExchangeRates = [
    { from: 'USD', to: 'ZWL', rate: '1:25,000', trend: 'up', change: '+2.5%' },
    { from: 'USD', to: 'BTC', rate: '1:0.000023', trend: 'down', change: '-1.2%' },
    { from: 'ZWL', to: 'Gold', rate: '1,000,000:1g', trend: 'stable', change: '0.0%' },
    { from: 'USD', to: 'EUR', rate: '1:0.85', trend: 'up', change: '+0.8%' },
    { from: 'USD', to: 'GBP', rate: '1:0.78', trend: 'down', change: '-0.5%' },
  ];

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.title || item.name || 'Item',
      price: item.value,
      image: item.image,
      quantity: 1,
      variant: { type: item.type, location: item.location }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-primary bg-primary/10">
              <ArrowLeftRight className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Commodity Exchange
            </h1>
            <p className="text-lg text-muted-foreground">
              Trade goods and services directly - traditional currency and barter deals
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Search Bar */}
      <ScrollableSearchBar
        placeholder="Search for items to trade or exchange..."
      />

      {/* Category Hamburger Menu */}
      <CategoryHamburgerMenu 
        categoryName="Commodity Exchange" 
        categoryType="commodity"
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
                  Found {searchState.results.length} result{searchState.results.length !== 1 ? 's' : ''} in Commodity Exchange
                </p>
              </div>
              <EnhancedSearchResults searchedItem={searchState.searchedItem} />
            </div>
          ) : (
            // Show General Category Content when user clicked category icon
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Commodity Exchange</h2>
                <p className="text-muted-foreground">
                  Trade commodities, barter goods, and access wholesale markets
                </p>
              </div>
              <CategoryGeneralContent 
                categoryName="Commodity Exchange" 
                categoryType="commodity"
              />
            </div>
          )}

          {/* Show original tabs content only when not searching */}
          {!searchState.searchedItem && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="barter">Barter Deals</TabsTrigger>
              <TabsTrigger value="rates">Exchange Rates</TabsTrigger>
              <TabsTrigger value="escrow">Escrow Services</TabsTrigger>
            </TabsList>

            <TabsContent value="barter" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockBarterItems.map(item => (
                  <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Scale className="h-5 w-5 text-primary" />
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{item.offer}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4" />
                        {item.location}
                        <Star className="h-4 w-4 ml-2 fill-yellow-400 text-yellow-400" />
                        {item.rating}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Value: ${item.value}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Make Offer</Button>
                          <Button size="sm" onClick={() => handleAddToCart(item)}>
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rates" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Live Exchange Rates</h2>
                <div className="space-y-4">
                  {mockExchangeRates.map((rate, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <div className="font-semibold text-lg">{rate.from} → {rate.to}</div>
                        <div className="text-sm text-muted-foreground">Rate: {rate.rate}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className={`h-5 w-5 ${rate.trend === 'up' ? 'text-green-500' : rate.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`} />
                        <span className={`text-sm font-semibold ${rate.trend === 'up' ? 'text-green-500' : rate.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
                          {rate.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Historical Trends</h2>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Chart placeholder - Exchange rate trends over time</span>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="escrow" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Secure Escrow Services</h2>
                <p className="text-muted-foreground mb-6">
                  Facilitate safe and secure barter transactions with our integrated escrow service.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Handshake className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Buyer Protection</div>
                      <div className="text-sm text-muted-foreground">Funds and items held securely until both parties confirm satisfaction.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Dispute Resolution</div>
                      <div className="text-sm text-muted-foreground">Mediated resolution process for any disagreements.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Transparent Timelines</div>
                      <div className="text-sm text-muted-foreground">Clear steps and timelines for each transaction phase.</div>
                    </div>
                  </div>
                </div>
                <Button className="mt-6 w-full">Start an Escrow Transaction</Button>
              </Card>
            </TabsContent>
          </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommodityExchangePage;