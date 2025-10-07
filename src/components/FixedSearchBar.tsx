import React, { useState, useEffect } from "react";
import { Search, Mic, Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";
import { useSearchContext } from "@/context/SearchContext";

interface FixedSearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  showCloseButton?: boolean;
  onClose?: () => void;
  searchContext?: 'global' | 'category' | 'product' | 'vendor';
  categoryName?: string;
}

const FixedSearchBar = ({ 
  className, 
  placeholder = "Search for anything on Swumarket...", 
  onSearch,
  showCloseButton = false,
  onClose,
  searchContext = 'global',
  categoryName
}: FixedSearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();
  const { search } = useSearchContext();

  // Get context-aware placeholder
  const getPlaceholder = () => {
    if (searchContext === 'category' && categoryName) {
      return `Search in ${categoryName}...`;
    }
    if (searchContext === 'product') {
      return "Search for products...";
    }
    if (searchContext === 'vendor') {
      return "Search for vendors...";
    }
    return placeholder || "Search for anything on Swumarket...";
  };

  // Handle scroll to add shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categoryRoutes: Record<string, string> = {
    // Commodity Exchange
    commodity: "/category/commodity-exchange",
    exchange: "/category/commodity-exchange",
    trading: "/category/commodity-exchange",
    commodities: "/category/commodity-exchange",
    trade: "/category/commodity-exchange",
    barter: "/category/commodity-exchange",

    // Supermarket
    supermarket: "/category/supermarket",
    grocery: "/category/supermarket",
    groceries: "/category/supermarket",
    food: "/category/supermarket",
    vegetables: "/category/supermarket",
    fruits: "/category/supermarket",
    meat: "/category/supermarket",
    dairy: "/category/supermarket",
    bread: "/category/supermarket",
    milk: "/category/supermarket",
    eggs: "/category/supermarket",
    rice: "/category/supermarket",
    cooking: "/category/supermarket",
    oil: "/category/supermarket",
    sugar: "/category/supermarket",
    salt: "/category/supermarket",
    spices: "/category/supermarket",
    canned: "/category/supermarket",
    frozen: "/category/supermarket",
    snacks: "/category/supermarket",
    drinks: "/category/supermarket",
    beverages: "/category/supermarket",
    water: "/category/supermarket",
    juice: "/category/supermarket",
    soda: "/category/supermarket",
    beer: "/category/supermarket",
    wine: "/category/supermarket",
    alcohol: "/category/supermarket",
    tobacco: "/category/supermarket",
    cigarettes: "/category/supermarket",
    cleaning: "/category/supermarket",
    hygiene: "/category/supermarket",
    personal: "/category/supermarket",
    care: "/category/supermarket",
    soap: "/category/supermarket",
    shampoo: "/category/supermarket",
    toothpaste: "/category/supermarket",
    deodorant: "/category/supermarket",
    baby: "/category/supermarket",
    children: "/category/supermarket",
    toys: "/category/supermarket",
    books: "/category/supermarket",
    stationery: "/category/supermarket",
    office: "/category/supermarket",
    supplies: "/category/supermarket",
    electronics: "/category/supermarket",
    gadgets: "/category/supermarket",
    phones: "/category/supermarket",
    computers: "/category/supermarket",
    accessories: "/category/supermarket",
    clothing: "/category/supermarket",
    clothes: "/category/supermarket",
    fashion: "/category/supermarket",
    shoes: "/category/supermarket",
    bags: "/category/supermarket",
    jewelry: "/category/supermarket",
    watches: "/category/supermarket",
    home: "/category/supermarket",
    garden: "/category/supermarket",
    tools: "/category/supermarket",
    hardware: "/category/supermarket",
    automotive: "/category/supermarket",
    car: "/category/supermarket",
    parts: "/category/supermarket",
    fuel: "/category/supermarket",
    gas: "/category/supermarket",
    pharmacy: "/category/supermarket",
    medicine: "/category/supermarket",
    health: "/category/supermarket",
    medical: "/category/supermarket",
    vitamins: "/category/supermarket",
    supplements: "/category/supermarket",
    first: "/category/supermarket",
    aid: "/category/supermarket",
    bandages: "/category/supermarket",
    pain: "/category/supermarket",
    relief: "/category/supermarket",
    prescription: "/category/supermarket",
    drugs: "/category/supermarket",
    pet: "/category/supermarket",
    animals: "/category/supermarket",
    dog: "/category/supermarket",
    cat: "/category/supermarket",
    fish: "/category/supermarket",
    bird: "/category/supermarket",
    veterinary: "/category/supermarket",
    vet: "/category/supermarket",
    feed: "/category/supermarket",
    supplies: "/category/supermarket",
    toys: "/category/supermarket",
    accessories: "/category/supermarket",
    services: "/category/supermarket",
    repair: "/category/supermarket",
    maintenance: "/category/supermarket",
    cleaning: "/category/supermarket",
    consulting: "/category/supermarket",
    help: "/category/supermarket",
    work: "/category/supermarket",
    job: "/category/supermarket",
    professional: "/category/supermarket",
    expert: "/category/supermarket",
    technician: "/category/supermarket"
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;

    // Call onSearch prop if provided
    if (onSearch) {
      onSearch(q);
    }

    // Context-aware search logic
    if (searchContext === 'global') {
      // Global search - search across all categories
      if (categoryRoutes[q]) {
        await search(query, q);
        navigate(categoryRoutes[q]);
        return;
      }

      const matched = Object.keys(categoryRoutes).find((k) => q.includes(k) || k.includes(q));
      if (matched) {
        await search(query, matched);
        navigate(categoryRoutes[matched]);
        return;
      }

      const partialMatch = Object.keys(categoryRoutes).find((k) => {
        const words = q.split(' ');
        return words.some(word => k.includes(word) || word.includes(k));
      });
      if (partialMatch) {
        await search(query, partialMatch);
        navigate(categoryRoutes[partialMatch]);
        return;
      }

      if (q.includes('near me') || q.includes('nearby')) {
        await search(query);
        navigate(`/map?q=${encodeURIComponent(q)}`);
        return;
      }

      await search(query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    } else if (searchContext === 'category' && categoryName) {
      // Category-specific search
      await search(query, categoryName);
      // Stay on current page, just update results
    } else {
      // Default behavior
      await search(query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsFocused(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsFocused(false);
    };

    recognition.start();
  };

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300",
      isScrolled ? "shadow-lg" : "shadow-sm",
      className
    )}>
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Close button for mobile/overlay */}
          {showCloseButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          )}

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <div className={cn(
              "relative flex items-center transition-all duration-300 rounded-full shadow-medium bg-card border-2",
              isFocused ? "shadow-glow border-primary" : "border-border hover:border-primary/50"
            )}>
              <div className="flex items-center pl-4 pr-2">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={getPlaceholder()}
                className="flex-1 border-0 bg-transparent text-sm px-0 py-3 focus-visible:ring-0 placeholder:text-muted-foreground"
              />
              
              <div className="flex items-center gap-1 pr-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 hover:bg-muted rounded-full"
                  onClick={handleVoiceSearch}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 hover:bg-muted rounded-full"
                  onClick={() => navigate('/scan')}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FixedSearchBar;
