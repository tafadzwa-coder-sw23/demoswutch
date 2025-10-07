import React, { useState } from "react";
import EnhancedSearchBar from "@/components/enhanced-search-bar-with-suggestions";
import MarketplaceGrid from "@/components/marketplace-grid-no-badges";
import { useSearch } from "@/hooks/useSearch";
import { MarketplaceItem } from "@/types/marketplace-updated";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import VideoFeed from "@/components/video-feed";
import CategoriesSection from "@/components/categories-section";
import { ShoppingBag, Video, TrendingUp } from "lucide-react";
import { mockMarketplaceItems } from "@/data/marketplace-updated";

const Index = () => {
  const [activeTab, setActiveTab] = useState("marketplace");
  const {
    searchResult,
    isLoading,
    error,
    performSearch,
    resetFilters
  } = useSearch();

  const handleSearch = async (query: string) => {
    await performSearch(query);
  };

  const handleItemClick = (item: MarketplaceItem) => {
    // Handle item click - could navigate to detail page or open modal
    console.log("Item clicked:", item);
  };

  const handleFavoriteClick = (item: MarketplaceItem) => {
    // Handle favorite click
    console.log("Favorite clicked:", item);
  };

  const handleContactClick = (item: MarketplaceItem) => {
    // Handle contact click
    console.log("Contact clicked:", item);
  };

  const getFeaturedItems = () => {
    // Get featured items from search results or show all if no search
    if (searchResult) {
      return searchResult.items.slice(0, 8);
    }
    return mockMarketplaceItems.slice(0, 8);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section with Search */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Swumarket
            </h1>
            <p className="text-lg text-muted-foreground">
              Universal marketplace for products, services, properties, jobs, and more
            </p>
          </div>

          <EnhancedSearchBar
            className="max-w-4xl mx-auto"
            placeholder="Search for products, services, properties, jobs, events..."
            onSearch={handleSearch}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="marketplace" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Marketplace
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trending
              </TabsTrigger>
            </TabsList>

            <TabsContent value="marketplace" className="space-y-6">
              {/* Search Results Summary */}
              {searchResult && (
                <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold">
                        {searchResult.totalCount} results found
                      </h3>
                      {searchResult.filters.query && (
                        <p className="text-sm text-muted-foreground">
                          for "{searchResult.filters.query}"
                        </p>
                      )}
                    </div>
                    {searchResult.suggestions && searchResult.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {searchResult.suggestions.slice(0, 3).map((suggestion, index) => (
                          <Badge key={index} variant="outline" className="cursor-pointer">
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Clear Search
                  </Button>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Searching...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-12">
                  <div className="text-red-500 mb-4">
                    <p className="text-lg font-medium">Search Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                  <Button onClick={() => performSearch("")}>
                    Try Again
                  </Button>
                </div>
              )}

              {/* Marketplace Grid */}
              {!isLoading && !error && (
                <MarketplaceGrid
                  items={searchResult?.items || getFeaturedItems()}
                  onItemClick={handleItemClick}
                  onFavoriteClick={handleFavoriteClick}
                  onContactClick={handleContactClick}
                />
              )}
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Video Showcase
                </h2>
                <p className="text-muted-foreground">
                  Watch users showcase their amazing products and services
                </p>
              </div>

              <VideoFeed />
            </TabsContent>

            <TabsContent value="trending" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Trending Now
                </h2>
                <p className="text-muted-foreground">
                  Most popular items and trending searches
                </p>
              </div>

              {/* Trending content would go here */}
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Trending content coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
