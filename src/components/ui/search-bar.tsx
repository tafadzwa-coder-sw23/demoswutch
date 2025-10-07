import React, { useState } from "react";
import { Search, Mic, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";
import { useSearchContext } from "@/context/SearchContext";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({ className, placeholder = "Search for anything on Swumarket...", onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();
  const { search } = useSearchContext();

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
    groceries: "/category/supermarket",
    food: "/category/supermarket",
    grocery: "/category/supermarket",
    market: "/category/supermarket",
    shop: "/category/supermarket",
    shopping: "/category/supermarket",
    store: "/category/supermarket",
    fresh: "/category/supermarket",
    vegetables: "/category/supermarket",
    fruits: "/category/supermarket",
    meat: "/category/supermarket",
    dairy: "/category/supermarket",
    bread: "/category/supermarket",
    milk: "/category/supermarket",
    rice: "/category/supermarket",
    cooking: "/category/supermarket",

    // Food & Restaurant
    restaurant: "/category/food-restaurant",
    dining: "/category/food-restaurant",
    cafe: "/category/food-restaurant",
    kitchen: "/category/food-restaurant",
    meal: "/category/food-restaurant",
    eat: "/category/food-restaurant",
    eating: "/category/food-restaurant",
    bbq: "/category/food-restaurant",
    takeaway: "/category/food-restaurant",
    delivery: "/category/food-restaurant",

    // Hardware & Building
    hardware: "/category/hardware-building",
    building: "/category/hardware-building",
    construction: "/category/hardware-building",
    tools: "/category/hardware-building",
    materials: "/category/hardware-building",
    cement: "/category/hardware-building",
    bricks: "/category/hardware-building",
    paint: "/category/hardware-building",
    electrical: "/category/hardware-building",
    plumbing: "/category/hardware-building",
    roofing: "/category/hardware-building",

    // Pharmacies
    pharmacy: "/category/pharmacies",
    pharmacies: "/category/pharmacies",
    medicine: "/category/pharmacies",
    medical: "/category/pharmacies",
    health: "/category/pharmacies",
    drugs: "/category/pharmacies",
    prescription: "/category/pharmacies",
    pills: "/category/pharmacies",
    tablets: "/category/pharmacies",
    doctor: "/category/pharmacies",
    clinic: "/category/pharmacies",
    hospital: "/category/pharmacies",

    // Agriculture
    agriculture: "/category/agriculture",
    farming: "/category/agriculture",
    farm: "/category/agriculture",
    crops: "/category/agriculture",
    livestock: "/category/agriculture",
    seeds: "/category/agriculture",
    fertilizer: "/category/agriculture",
    produce: "/category/agriculture",
    organic: "/category/agriculture",

    // Pet Shops
    pets: "/category/pet-shops",
    pet: "/category/pet-shops",
    animals: "/category/pet-shops",
    veterinary: "/category/pet-shops",
    dog: "/category/pet-shops",
    cat: "/category/pet-shops",
    fish: "/category/pet-shops",
    bird: "/category/pet-shops",
    vet: "/category/pet-shops",
    animal: "/category/pet-shops",

    // Service Exchange
    services: "/category/service-exchange",
    service: "/category/service-exchange",
    repair: "/category/service-exchange",
    maintenance: "/category/service-exchange",
    cleaning: "/category/service-exchange",
    consulting: "/category/service-exchange",
    help: "/category/service-exchange",
    work: "/category/service-exchange",
    job: "/category/service-exchange",
    professional: "/category/service-exchange",
    expert: "/category/service-exchange",
    technician: "/category/service-exchange"
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;

    // Call onSearch prop if provided
    if (onSearch) {
      onSearch(q);
    }

    // direct exact match
    if (categoryRoutes[q]) {
      await search(query, q);
      navigate(categoryRoutes[q]);
      return;
    }

    // fuzzy includes match over keywords - try both directions
    const matched = Object.keys(categoryRoutes).find((k) => q.includes(k) || k.includes(q));
    if (matched) {
      await search(query, matched);
      navigate(categoryRoutes[matched]);
      return;
    }

    // Try partial word matches
    const partialMatch = Object.keys(categoryRoutes).find((k) => {
      const words = q.split(' ');
      return words.some(word => k.includes(word) || word.includes(k));
    });
    if (partialMatch) {
      await search(query, partialMatch);
      navigate(categoryRoutes[partialMatch]);
      return;
    }

    // Handle "near me" queries
    if (q.includes('near me') || q.includes('nearby')) {
      await search(query);
      navigate(`/map?q=${encodeURIComponent(q)}`);
      return;
    }

    // Fallback to generic search results page
    await search(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className={cn("relative", className)}>
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
          placeholder={placeholder || t('search_placeholder')}
          className="flex-1 border-0 bg-transparent text-base px-0 py-6 focus-visible:ring-0 placeholder:text-muted-foreground"
        />
        
        <div className="flex items-center gap-2 pr-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-muted rounded-full"
          onClick={() => {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            if (!SpeechRecognition) return;
            const recog = new SpeechRecognition();
            recog.lang = 'en-US';
            recog.onresult = (e: any) => {
              const text = e.results[0][0].transcript;
              setQuery(text);
            };
            try { recog.start(); } catch {}
          }}
          >
            <Mic className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-muted rounded-full"
          >
            <Camera className="h-4 w-4 text-muted-foreground" />
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
      
      {/* Search suggestions overlay could go here */}
    </form>
  );
};

export default SearchBar;