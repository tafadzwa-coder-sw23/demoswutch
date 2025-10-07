import React, { useState, useRef, useEffect } from "react";
import { Search, Mic, Camera, MapPin, Filter, X, Star, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useSearch } from "@/hooks/useSearch";
import { MarketplaceCategory } from "@/types/marketplace";

interface EnhancedSearchBarProps {
  className?: string;
  placeholder?: string;
  showAdvancedFilters?: boolean;
  onSearch?: (query: string) => void;
}

const EnhancedSearchBar = ({
  className,
  placeholder = "Search for anything on Swumarket...",
  showAdvancedFilters = true,
  onSearch
}: EnhancedSearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isImageSearch, setIsImageSearch] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState<number | undefined>();
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();

  const {
    filters,
    updateFilters,
    performSearch,
    categories,
    locations,
    setCategory,
    setLocation,
    setPriceRange: updatePriceRange,
    setRating,
    setSortBy,
    resetFilters
  } = useSearch();

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => setIsVoiceActive(true);
      recognitionRef.current.onend = () => setIsVoiceActive(false);
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        performSearch(transcript);
      };
    }
  }, [performSearch]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await performSearch(query);
      onSearch?.(query);
    }
  };

  const handleVoiceSearch = () => {
    if (recognitionRef.current && !isVoiceActive) {
      recognitionRef.current.start();
    }
  };

  const handleImageSearch = () => {
    // Placeholder for image search functionality
    setIsImageSearch(true);
    // In a real implementation, this would open a file picker or camera
    setTimeout(() => setIsImageSearch(false), 2000);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category as MarketplaceCategory);
  };

  const handleLocationChange = (location: string) => {
    setLocation(location);
    setSelectedLocation(location);
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    updatePriceRange(values[0], values[1]);
  };

  const handleRatingChange = (rating: string) => {
    const ratingValue = rating === 'all' ? undefined : parseInt(rating);
    setRating(ratingValue);
    setSelectedRating(ratingValue);
  };

  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy as 'relevance' | 'price-low' | 'price-high' | 'rating' | 'distance' | 'newest');
  };

  const clearFilters = () => {
    resetFilters();
    setQuery("");
    setPriceRange([0, 1000]);
    setSelectedRating(undefined);
    setSelectedLocation(undefined);
  };

  const activeFiltersCount = [
    filters.category,
    filters.location,
    filters.priceRange,
    filters.rating,
    filters.availability
  ].filter(Boolean).length;

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Main Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className={cn(
          "relative flex items-center transition-all duration-300 rounded-full shadow-medium bg-card border-2",
          isFocused ? "shadow-glow border-primary" : "border-border hover:border-primary/50"
        )}>
          <div className="flex items-center pl-6 pr-3">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>

          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="flex-1 border-0 bg-transparent text-base px-0 py-6 focus-visible:ring-0 placeholder:text-muted-foreground"
          />

          <div className="flex items-center gap-2 pr-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0 hover:bg-muted rounded-full transition-colors",
                isVoiceActive && "bg-red-100 text-red-600"
              )}
              onClick={handleVoiceSearch}
              disabled={!recognitionRef.current}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0 hover:bg-muted rounded-full transition-colors",
                isImageSearch && "bg-blue-100 text-blue-600"
              )}
              onClick={handleImageSearch}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <Button
            type="submit"
            variant="hero"
            className="mr-2 rounded-full px-6 py-2"
          >
            Search
          </Button>
        </div>
      </form>

      {/* Advanced Filters Toggle */}
      {showAdvancedFilters && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Clear all
            </Button>
          )}
        </div>
      )}

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && showFilters && (
        <div className="p-6 bg-card rounded-lg border shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={filters.category || ""} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </label>
              <Select value={selectedLocation || ""} onValueChange={handleLocationChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Star className="h-4 w-4" />
                Min Rating
              </label>
              <Select value={selectedRating?.toString() || "all"} onValueChange={handleRatingChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any rating</SelectItem>
                  <SelectItem value="4">4+ stars</SelectItem>
                  <SelectItem value="3">3+ stars</SelectItem>
                  <SelectItem value="2">2+ stars</SelectItem>
                  <SelectItem value="1">1+ stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <span className="text-sm font-medium">Sort by:</span>
            <Select value={filters.sortBy || "relevance"} onValueChange={handleSortChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Search suggestions overlay could go here */}
    </div>
  );
};

export default EnhancedSearchBar;
