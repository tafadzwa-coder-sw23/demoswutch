import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Clock, Star } from "lucide-react";
import { useSearchContext } from "@/context/SearchContext";

interface SearchSuggestionsProps {
  query: string;
  onSuggestionClick: (suggestion: string) => void;
  isVisible: boolean;
}

const SearchSuggestions = ({ query, onSuggestionClick, isVisible }: SearchSuggestionsProps) => {
  const { state: searchState } = useSearchContext();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Mock suggestions based on query
  const getSuggestions = (q: string) => {
    const allSuggestions = [
      "Fresh tomatoes", "Cooking oil", "Rice 50kg", "Maize meal", "Beans",
      "Onions", "Garlic", "Bell peppers", "Cabbage", "Carrots",
      "Chicken", "Beef", "Fish", "Milk", "Bread",
      "Sugar", "Salt", "Spices", "Fruits", "Vegetables"
    ];
    
    return allSuggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 5);
  };

  useEffect(() => {
    if (query.length > 1) {
      setSuggestions(getSuggestions(query));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  if (!isVisible || suggestions.length === 0) return null;

  return (
    <Card className="absolute top-full left-0 right-0 z-50 mt-1 shadow-lg">
      <CardContent className="p-0">
        <div className="py-2">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-2 hover:bg-muted cursor-pointer transition-colors"
              onClick={() => onSuggestionClick(suggestion)}
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1">{suggestion}</span>
              <Badge variant="outline" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            </div>
          ))}
          
          {searchState.recentSearches.length > 0 && (
            <>
              <div className="border-t my-2"></div>
              <div className="px-4 py-2 text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent searches
              </div>
              {searchState.recentSearches.slice(0, 3).map((search, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => onSuggestionClick(search)}
                >
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1">{search}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchSuggestions;
