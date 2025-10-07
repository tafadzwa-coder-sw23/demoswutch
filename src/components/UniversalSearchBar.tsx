import React, { useState } from "react";
import { Search, Mic, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/context/SettingsContext";
import { useNavigate } from "react-router-dom";

interface UniversalSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const UniversalSearchBar: React.FC<UniversalSearchBarProps> = ({ 
  placeholder = "Search for anything...", 
  onSearch,
  className = ""
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { voiceEnabled } = useSettings();
  const navigate = useNavigate();

  const handleVoiceSearch = () => {
    if (!voiceEnabled) return;
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setSearchQuery("search query from voice");
      setIsListening(false);
    }, 2000);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleScan = () => {
    navigate('/scan');
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="pl-10 pr-24"
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleScan}
          className="h-8 w-8 p-0"
          title="Scan barcode or QR code"
        >
          <Camera className="h-4 w-4" />
        </Button>
        {voiceEnabled && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVoiceSearch}
            disabled={isListening}
            className="h-8 w-8 p-0"
            title="Voice search"
          >
            <Mic className={`h-4 w-4 ${isListening ? 'text-red-500' : ''}`} />
          </Button>
        )}
        <Button size="sm" onClick={handleSearch} className="h-8">
          Search
        </Button>
      </div>
    </div>
  );
};

export default UniversalSearchBar;
