import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Filter, 
  X, 
  MapPin, 
  Star, 
  DollarSign, 
  Clock, 
  Truck,
  CheckCircle,
  XCircle
} from "lucide-react";

interface FilterOptions {
  priceRange: [number, number];
  distance: number;
  rating: number;
  categories: string[];
  availability: string[];
  delivery: boolean;
  pickup: boolean;
  verified: boolean;
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  onClose: () => void;
  isOpen: boolean;
}

const AdvancedFilters = ({ onFiltersChange, onClose, isOpen }: AdvancedFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 100],
    distance: 10,
    rating: 0,
    categories: [],
    availability: [],
    delivery: false,
    pickup: false,
    verified: false,
  });

  const categoryOptions = [
    "Vegetables", "Fruits", "Meat", "Dairy", "Grains", "Spices", "Beverages"
  ];

  const availabilityOptions = [
    "In Stock", "Limited Stock", "Pre-order", "Seasonal"
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    handleFilterChange('categories', newCategories);
  };

  const handleAvailabilityToggle = (availability: string) => {
    const newAvailability = filters.availability.includes(availability)
      ? filters.availability.filter(a => a !== availability)
      : [...filters.availability, availability];
    handleFilterChange('availability', newAvailability);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      priceRange: [0, 100],
      distance: 10,
      rating: 0,
      categories: [],
      availability: [],
      delivery: false,
      pickup: false,
      verified: false,
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100) count++;
    if (filters.distance < 10) count++;
    if (filters.rating > 0) count++;
    if (filters.categories.length > 0) count++;
    if (filters.availability.length > 0) count++;
    if (filters.delivery) count++;
    if (filters.pickup) count++;
    if (filters.verified) count++;
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <label className="text-sm font-medium mb-3 block">
              <DollarSign className="h-4 w-4 inline mr-1" />
              Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange('priceRange', value)}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Distance */}
          <div>
            <label className="text-sm font-medium mb-3 block">
              <MapPin className="h-4 w-4 inline mr-1" />
              Distance: {filters.distance}km
            </label>
            <Slider
              value={[filters.distance]}
              onValueChange={(value) => handleFilterChange('distance', value[0])}
              max={50}
              step={1}
              className="w-full"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm font-medium mb-3 block">
              <Star className="h-4 w-4 inline mr-1" />
              Minimum Rating: {filters.rating}★
            </label>
            <Slider
              value={[filters.rating]}
              onValueChange={(value) => handleFilterChange('rating', value[0])}
              max={5}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="text-sm font-medium mb-3 block">Categories</label>
            <div className="grid grid-cols-2 gap-2">
              {categoryOptions.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <label htmlFor={category} className="text-sm">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="text-sm font-medium mb-3 block">Availability</label>
            <div className="space-y-2">
              {availabilityOptions.map((availability) => (
                <div key={availability} className="flex items-center space-x-2">
                  <Checkbox
                    id={availability}
                    checked={filters.availability.includes(availability)}
                    onCheckedChange={() => handleAvailabilityToggle(availability)}
                  />
                  <label htmlFor={availability} className="text-sm">
                    {availability}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Options */}
          <div>
            <label className="text-sm font-medium mb-3 block">Delivery Options</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="delivery"
                  checked={filters.delivery}
                  onCheckedChange={(checked) => handleFilterChange('delivery', checked)}
                />
                <label htmlFor="delivery" className="text-sm flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Delivery Available
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pickup"
                  checked={filters.pickup}
                  onCheckedChange={(checked) => handleFilterChange('pickup', checked)}
                />
                <label htmlFor="pickup" className="text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Pickup Available
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified"
                  checked={filters.verified}
                  onCheckedChange={(checked) => handleFilterChange('verified', checked)}
                />
                <label htmlFor="verified" className="text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Verified Sellers Only
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={clearFilters} className="flex-1">
              <XCircle className="h-4 w-4 mr-2" />
              Clear All
            </Button>
            <Button onClick={onClose} className="flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedFilters;
