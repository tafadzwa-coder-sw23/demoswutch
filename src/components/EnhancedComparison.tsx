import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Star, 
  MapPin, 
  Clock, 
  Truck, 
  Shield, 
  Phone, 
  MessageCircle, 
  ShoppingCart,
  TrendingDown,
  Users,
  Award,
  Zap
} from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  deliveryTime: string;
  price: number;
  originalPrice?: number;
  image: string;
  verified: boolean;
  specialties: string[];
  isOnline: boolean;
  responseTime: string;
  trustScore: number;
  deliveryFee: number;
  minimumOrder: number;
  paymentMethods: string[];
  features: string[];
}

interface EnhancedComparisonProps {
  item: any;
  vendors: Vendor[];
  onVendorSelect: (vendor: Vendor) => void;
  onNegotiate: (vendor: Vendor) => void;
}

const EnhancedComparison = ({ item, vendors, onVendorSelect, onNegotiate }: EnhancedComparisonProps) => {
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance' | 'delivery'>('price');
  const [showOnlyVerified, setShowOnlyVerified] = useState(false);
  const [showOnlyOnline, setShowOnlyOnline] = useState(false);

  const handleVendorToggle = (vendorId: string) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleCompareSelected = () => {
    const selected = vendors.filter(v => selectedVendors.includes(v.id));
    if (selected.length >= 2) {
      // Open detailed comparison modal
      console.log('Comparing:', selected);
    }
  };

  const sortedVendors = [...vendors].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'delivery':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      default:
        return 0;
    }
  }).filter(vendor => {
    if (showOnlyVerified && !vendor.verified) return false;
    if (showOnlyOnline && !vendor.isOnline) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Compare Vendors for "{item.title}"
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="distance">Distance</option>
                <option value="delivery">Delivery Time</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="verified" 
                  checked={showOnlyVerified}
                  onCheckedChange={setShowOnlyVerified}
                />
                <label htmlFor="verified" className="text-sm">Verified Only</label>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="online" 
                  checked={showOnlyOnline}
                  onCheckedChange={setShowOnlyOnline}
                />
                <label htmlFor="online" className="text-sm">Online Now</label>
              </div>
            </div>

            {selectedVendors.length >= 2 && (
              <Button onClick={handleCompareSelected} className="ml-auto">
                <Zap className="h-4 w-4 mr-2" />
                Compare Selected ({selectedVendors.length})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedVendors.map((vendor) => (
          <Card 
            key={vendor.id} 
            className={`group hover:shadow-lg transition-all cursor-pointer ${
              selectedVendors.includes(vendor.id) ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleVendorToggle(vendor.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img 
                    src={vendor.image} 
                    alt={vendor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{vendor.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{vendor.rating} ({vendor.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                  {vendor.verified && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {vendor.isOnline && (
                    <Badge variant="outline" className="text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Online
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Price Section */}
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  ${vendor.price.toFixed(2)}
                </div>
                {vendor.originalPrice && vendor.originalPrice > vendor.price && (
                  <div className="text-sm text-muted-foreground line-through">
                    ${vendor.originalPrice.toFixed(2)}
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  +${vendor.deliveryFee.toFixed(2)} delivery
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span>{vendor.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span>{vendor.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="h-3 w-3 text-muted-foreground" />
                  <span>{vendor.responseTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-3 w-3 text-muted-foreground" />
                  <span>{vendor.trustScore}/10</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1">
                {vendor.specialties.slice(0, 2).map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>

              {/* Features */}
              <div className="space-y-1">
                {vendor.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onVendorSelect(vendor);
                  }}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Select
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNegotiate(vendor);
                  }}
                >
                  <MessageCircle className="h-3 w-3" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Call vendor
                  }}
                >
                  <Phone className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{vendors.length}</div>
              <div className="text-sm text-muted-foreground">Total Vendors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                ${Math.min(...vendors.map(v => v.price)).toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Lowest Price</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.max(...vendors.map(v => v.rating)).toFixed(1)}★
              </div>
              <div className="text-sm text-muted-foreground">Highest Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {vendors.filter(v => v.isOnline).length}
              </div>
              <div className="text-sm text-muted-foreground">Online Now</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedComparison;
