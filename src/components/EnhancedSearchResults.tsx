import React, { useState } from "react";
import TransactionFlow from "./TransactionFlow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  Star, 
  MapPin, 
  Phone, 
  Heart, 
  Share2, 
  TrendingDown,
  TrendingUp,
  CheckCircle,
  XCircle,
  Users,
  Eye,
  ThumbsUp,
  Package,
  Percent,
  Zap
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SearchedProduct } from "@/context/SearchContext";

interface EnhancedSearchResultsProps {
  searchedItem: SearchedProduct;
  className?: string;
}

const EnhancedSearchResults = ({ searchedItem, className }: EnhancedSearchResultsProps) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [showTransactionFlow, setShowTransactionFlow] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(searchedItem.priceComparison?.[0]);

  const handleAddToCart = (product: any, vendor?: any) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: vendor?.price || product.price,
      image: product.image,
      quantity: 1,
      variant: { 
        vendor: vendor?.vendorName || product.vendor.name,
        location: vendor?.distance || product.vendor.distance
      }
    });
  };

  const handleAddBundle = () => {
    if (searchedItem.frequentlyBoughtTogether) {
      // Add main item
      handleAddToCart(searchedItem);
      
      // Add bundle items
      searchedItem.frequentlyBoughtTogether.forEach(item => {
        addToCart({
          id: item.id,
          name: item.title,
          price: item.price - (item.bundleDiscount || 0),
          image: item.image,
          quantity: 1,
          variant: { bundle: true }
        });
      });
      
      alert('Bundle added to cart with discounts applied!');
    }
  };

  const getBestPrice = () => {
    if (!searchedItem.priceComparison) return null;
    return searchedItem.priceComparison.reduce((best, current) => 
      current.inStock && current.price < best.price ? current : best
    );
  };

  const bestPrice = getBestPrice();

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Main Product Display */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden">
            <img
              src={searchedItem.image}
              alt={searchedItem.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{searchedItem.category}</Badge>
                {searchedItem.vendor.verified && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{searchedItem.title}</h1>
              <p className="text-muted-foreground mb-4">{searchedItem.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{searchedItem.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{searchedItem.views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{searchedItem.likes} likes</span>
                </div>
              </div>
            </div>

            {/* Vendor Info */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{searchedItem.vendor.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{searchedItem.vendor.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{searchedItem.vendor.location} • {searchedItem.vendor.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{searchedItem.vendor.phone}</span>
                </div>
              </div>
            </div>

            {/* Price and Actions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-primary">
                    ${searchedItem.price.toFixed(2)}
                  </div>
                  {bestPrice && bestPrice.price < searchedItem.price && (
                    <div className="text-sm text-green-600">
                      Best price: ${bestPrice.price.toFixed(2)} at {bestPrice.vendorName}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowTransactionFlow(true)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!searchedItem.inStock}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Start Transaction
                </Button>
                <Button 
                  onClick={() => handleAddToCart(searchedItem)}
                  className="flex-1"
                  disabled={!searchedItem.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {searchedItem.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button variant="outline">
                  Contact Seller
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Enhanced Features Tabs */}
      <Tabs defaultValue="comparison" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comparison">Price Comparison</TabsTrigger>
          <TabsTrigger value="recommendations">Recommended</TabsTrigger>
          <TabsTrigger value="bundle">Buy Together</TabsTrigger>
          <TabsTrigger value="vendors">All Vendors</TabsTrigger>
        </TabsList>

        {/* Price Comparison */}
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Price Comparison - {searchedItem.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchedItem.priceComparison?.map((vendor, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                      selectedVendor?.vendorName === vendor.vendorName ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedVendor(vendor)}
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-semibold">{vendor.vendorName}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{vendor.distance}</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{vendor.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          ${vendor.price.toFixed(2)}
                        </div>
                        {vendor.savings !== 0 && (
                          <div className={`text-sm flex items-center gap-1 ${
                            vendor.savings > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {vendor.savings > 0 ? (
                              <TrendingDown className="h-3 w-3" />
                            ) : (
                              <TrendingUp className="h-3 w-3" />
                            )}
                            {vendor.savings > 0 ? 'Save' : 'Extra'} ${Math.abs(vendor.savings).toFixed(2)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {vendor.inStock ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            In Stock
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <XCircle className="h-3 w-3 mr-1" />
                            Out of Stock
                          </Badge>
                        )}
                        
                        {vendor.inStock && (
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(searchedItem, vendor);
                            }}
                          >
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations */}
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {searchedItem.recommendations?.map((item) => (
                  <Card key={item.id} className="group hover:shadow-lg transition-all">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.reason}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                        <Button size="sm">
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Frequently Bought Together */}
        <TabsContent value="bundle">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Frequently Bought Together
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Main Item */}
                  <div className="border rounded-lg p-4 bg-primary/5">
                    <img
                      src={searchedItem.image}
                      alt={searchedItem.title}
                      className="w-full aspect-square object-cover rounded mb-2"
                    />
                    <h3 className="font-semibold text-sm mb-1">{searchedItem.title}</h3>
                    <p className="text-lg font-bold">${searchedItem.price.toFixed(2)}</p>
                  </div>
                  
                  {/* Bundle Items */}
                  {searchedItem.frequentlyBoughtTogether?.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full aspect-square object-cover rounded mb-2"
                      />
                      <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground line-through">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          ${(item.price - (item.bundleDiscount || 0)).toFixed(2)}
                        </p>
                        {item.bundleDiscount && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <Percent className="h-2 w-2 mr-1" />
                            Save ${item.bundleDiscount.toFixed(2)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Bundle Total:</div>
                      <div className="text-2xl font-bold">
                        ${(
                          searchedItem.price + 
                          (searchedItem.frequentlyBoughtTogether?.reduce((sum, item) => 
                            sum + item.price - (item.bundleDiscount || 0), 0
                          ) || 0)
                        ).toFixed(2)}
                      </div>
                      <div className="text-sm text-green-600">
                        Total savings: ${(searchedItem.frequentlyBoughtTogether?.reduce((sum, item) => 
                          sum + (item.bundleDiscount || 0), 0
                        ) || 0).toFixed(2)}
                      </div>
                    </div>
                    <Button onClick={handleAddBundle} size="lg">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add Bundle to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Vendors */}
        <TabsContent value="vendors">
          <Card>
            <CardHeader>
              <CardTitle>All Vendors Selling {searchedItem.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchedItem.priceComparison?.map((vendor, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{vendor.vendorName}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{vendor.distance}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{vendor.rating}</span>
                          </div>
                          {vendor.inStock ? (
                            <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                          ) : (
                            <Badge variant="secondary">Out of Stock</Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-xl font-bold">${vendor.price.toFixed(2)}</div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Contact</Button>
                          {vendor.inStock && (
                            <Button 
                              size="sm"
                              onClick={() => handleAddToCart(searchedItem, vendor)}
                            >
                              Add to Cart
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction Flow Modal */}
      {showTransactionFlow && (
        <TransactionFlow
          item={searchedItem}
          isOpen={showTransactionFlow}
          onClose={() => setShowTransactionFlow(false)}
        />
      )}
    </div>
  );
};

export default EnhancedSearchResults;
