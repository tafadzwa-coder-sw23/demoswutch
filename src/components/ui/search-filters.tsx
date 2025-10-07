import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { X, Filter, MapPin, DollarSign, Star, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  onFiltersChange?: (filters: FilterState) => void;
  className?: string;
}

interface FilterState {
  priceRange: [number, number];
  categories: string[];
  rating: number;
  distance: number;
  sortBy: string;
  availability: string;
  vendorType: string[];
}

const SearchFilters = ({ onFiltersChange, className }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    categories: [],
    rating: 0,
    distance: 10,
    sortBy: 'relevance',
    availability: 'all',
    vendorType: []
  });

  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    'Vegetables', 'Fruits', 'Meat', 'Dairy', 'Bakery', 'Beverages',
    'Snacks', 'Cleaning', 'Personal Care', 'Electronics', 'Clothing'
  ];

  const vendorTypes = [
    'Supermarket', 'Street Vendor', 'Home Garden', 'Informal Vendor'
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'distance', label: 'Distance' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' }
  ];

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange?.(updated);
  };

  const clearFilters = () => {
    const cleared = {
      priceRange: [0, 1000],
      categories: [],
      rating: 0,
      distance: 10,
      sortBy: 'relevance',
      availability: 'all',
      vendorType: []
    };
    setFilters(cleared);
    onFiltersChange?.(cleared);
  };

  const activeFiltersCount = [
    filters.categories.length,
    filters.rating > 0 ? 1 : 0,
    filters.distance < 10 ? 1 : 0,
    filters.vendorType.length,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <X className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </Button>
      </div>

      {/* Filter Content */}
      <div className={cn(
        "space-y-6",
        !isOpen && "hidden md:block"
      )}>
        {/* Sort By */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Sort By</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <RadioGroup
              value={filters.sortBy}
              onValueChange={(value) => updateFilters({ sortBy: value })}
            >
              {sortOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Price Range */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Price Range
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                max={1000}
                step={10}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFilters({ categories: [...filters.categories, category] });
                    } else {
                      updateFilters({ categories: filters.categories.filter(c => c !== category) });
                    }
                  }}
                />
                <Label htmlFor={category} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Rating */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4" />
              Minimum Rating
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="px-2">
              <Slider
                value={[filters.rating]}
                onValueChange={(value) => updateFilters({ rating: value[0] })}
                max={5}
                step={0.5}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Any</span>
              <span>{filters.rating} ⭐</span>
            </div>
          </CardContent>
        </Card>

        {/* Distance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Distance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="px-2">
              <Slider
                value={[filters.distance]}
                onValueChange={(value) => updateFilters({ distance: value[0] })}
                max={50}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0 km</span>
              <span>{filters.distance} km</span>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Type */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Vendor Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {vendorTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={filters.vendorType.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFilters({ vendorType: [...filters.vendorType, type] });
                    } else {
                      updateFilters({ vendorType: filters.vendorType.filter(t => t !== type) });
                    }
                  }}
                />
                <Label htmlFor={type} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Availability */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <RadioGroup
              value={filters.availability}
              onValueChange={(value) => updateFilters({ availability: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="text-sm">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="open" id="open" />
                <Label htmlFor="open" className="text-sm">Open Now</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-stock" id="in-stock" />
                <Label htmlFor="in-stock" className="text-sm">In Stock</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            className="w-full"
            onClick={clearFilters}
          >
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
