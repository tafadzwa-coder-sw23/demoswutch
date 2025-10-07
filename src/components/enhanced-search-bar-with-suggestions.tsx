import React, { useState, useRef, useEffect } from "react";
import { Search, Mic, Camera, MapPin, Filter, X, Star, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useSearch } from "@/hooks/useSearch";
import { MarketplaceCategory } from "@/types/marketplace-updated";

// Type declarations for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare var SpeechRecognition: SpeechRecognitionConstructor;

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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

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

  // Category suggestions based on keywords
  const categoryKeywords: Record<string, MarketplaceCategory[]> = {
    'fashion': ['Fashion & Accessories'],
    'clothing': ['Fashion & Accessories'],
    'jewelry': ['Fashion & Accessories'],
    'shoes': ['Fashion & Accessories'],
    'accessories': ['Fashion & Accessories'],
    'repair': ['Services'],
    'service': ['Services'],
    'technology': ['Services', 'Electronics & Technology'],
    'design': ['Services'],
    'cleaning': ['Services'],
    'consulting': ['Services'],
    'health': ['Services', 'Health & Beauty'],
    'education': ['Services', 'Education & Training'],
    'food': ['Food & Groceries'],
    'groceries': ['Food & Groceries'],
    'restaurant': ['Food & Groceries'],
    'produce': ['Food & Groceries'],
    'property': ['Property'],
    'apartment': ['Property'],
    'house': ['Property'],
    'rental': ['Property'],
    'job': ['Jobs & Employment'],
    'employment': ['Jobs & Employment'],
    'career': ['Jobs & Employment'],
    'event': ['Events & Entertainment'],
    'conference': ['Events & Entertainment'],
    'concert': ['Events & Entertainment'],
    'workshop': ['Events & Entertainment'],
    'digital': ['Digital Content'],
    'ebook': ['Digital Content'],
    'course': ['Digital Content', 'Education & Training'],
    'music': ['Digital Content', 'Events & Entertainment'],
    'video': ['Digital Content'],
    'software': ['Digital Content', 'Electronics & Technology'],
    'electronics': ['Electronics & Technology'],
    'phone': ['Electronics & Technology'],
    'computer': ['Electronics & Technology'],
    'home': ['Home & Garden'],
    'garden': ['Home & Garden'],
    'furniture': ['Home & Garden'],
    'decor': ['Home & Garden'],
    'beauty': ['Health & Beauty'],
    'skincare': ['Health & Beauty'],
    'makeup': ['Health & Beauty'],
    'haircare': ['Health & Beauty'],
    'wellness': ['Health & Beauty'],
    'fitness': ['Health & Beauty', 'Sports & Recreation'],
    'sports': ['Sports & Recreation'],
    'recreation': ['Sports & Recreation'],
    'equipment': ['Sports & Recreation', 'Business & Industrial'],
    'automotive': ['Automotive'],
    'car': ['Automotive'],
    'parts': ['Automotive'],
    'business': ['Business & Industrial'],
    'industrial': ['Business & Industrial']
  };

  useEffect(() => {
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => setIsVoiceActive(true);
      recognitionRef.current.onend = () => setIsVoiceActive(false);
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        performSearch(transcript);
      };
    }
  }, [performSearch]);

  // Generate suggestions based on query
  useEffect(() => {
    if (query.trim().length > 0) {
      const queryLower = query.toLowerCase();
      const matchedCategories: MarketplaceCategory[] = [];

      // Check for category matches
      Object.entries(categoryKeywords).forEach(([keyword, cats]) => {
        if (queryLower.includes(keyword)) {
          matchedCategories.push(...cats);
        }
      });

      // Remove duplicates and set suggestions
      const uniqueCategories = [...new Set(matchedCategories)];
      setSuggestions(uniqueCategories);
      setShowSuggestions(uniqueCategories.length > 0);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await performSearch(query);
      onSearch?.(query);
      setShowSuggestions(false);
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
    setShowSuggestions(false);
    performSearch(query); // Perform search with current query when category is selected
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
    setShowFilters(false);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Main Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={placeholder}
            className="pl-10 pr-12 py-3 rounded-lg border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="absolute right-1 h-full rounded-lg hover:bg-primary/5"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Voice and Image Search Buttons */}
        {isFocused && (
          <div className="flex gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleVoiceSearch}
              className="flex items-center gap-2"
            >
              <Mic className={`h-4 w-4 ${isVoiceActive ? 'animate-pulse' : ''}`} />
              Voice
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleImageSearch}
              className="flex items-center gap-2"
              disabled={isImageSearch}
            >
              <Camera className="h-4 w-4" />
              {isImageSearch ? 'Searching...' : 'Image'}
            </Button>
          </div>
        )}

        {/* Category Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50">
            <div className="p-2 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-2 px-3"
                  onClick={() => handleCategoryChange(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
      </form>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 w-full justify-center"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? 'Hide' : 'Show'} Filters
          </Button>

          {showFilters && (
            <div className="mt-4 space-y-4 p-4 bg-card rounded-lg border">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select onValueChange={setCategory} value={filters.category || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Select onValueChange={handleLocationChange} value={selectedLocation || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {location}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <div className="space-y-2">
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    max={1000}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
                <Select onValueChange={handleRatingChange} value={selectedRating?.toString() || 'all'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any rating</SelectItem>
                    <SelectItem value="4">4+ stars</SelectItem>
                    <SelectItem value="3">3+ stars</SelectItem>
                    <SelectItem value="2">2+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select onValueChange={handleSortChange} value={filters.sortBy || 'relevance'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters Button */}
              <Button variant="outline" onClick={clearFilters} className="w-full">
                <X className="h-4 w-4 mr-2" />
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchBar;
