import { useState, useCallback, useMemo } from 'react';
import {
  MarketplaceItem,
  SearchFilters,
  SearchResult,
  MarketplaceCategory
} from '@/types/marketplace-updated';
import { searchMarketplace, getAllCategories, getSubcategories, getAllLocations } from '@/services/searchService';

export interface UseSearchReturn {
  // Search state
  searchResult: SearchResult | null;
  isLoading: boolean;
  error: string | null;

  // Search filters
  filters: SearchFilters;
  updateFilters: (newFilters: Partial<SearchFilters>) => void;
  resetFilters: () => void;

  // Search actions
  performSearch: (query?: string) => Promise<void>;
  loadMore: () => Promise<void>;

  // Helper data
  categories: MarketplaceCategory[];
  subcategories: string[];
  locations: string[];

  // Filter helpers
  setCategory: (category: MarketplaceCategory | undefined) => void;
  setLocation: (location: string | undefined) => void;
  setPriceRange: (min: number, max: number) => void;
  setRating: (rating: number | undefined) => void;
  setSortBy: (sortBy: SearchFilters['sortBy']) => void;
}

const defaultFilters: SearchFilters = {
  query: '',
  category: undefined,
  subcategory: undefined,
  location: undefined,
  priceRange: undefined,
  rating: undefined,
  availability: undefined,
  distance: undefined,
  sortBy: 'relevance',
  accessibility: undefined
};

export function useSearch(): UseSearchReturn {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  // Helper data
  const categories = useMemo(() => getAllCategories(), []);
  const subcategories = useMemo(() => {
    return filters.category ? getSubcategories(filters.category) : [];
  }, [filters.category]);
  const locations = useMemo(() => getAllLocations(), []);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Reset filters to default
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
    setSearchResult(null);
    setError(null);
  }, []);

  // Perform search
  const performSearch = useCallback(async (query?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const searchFilters = {
        ...filters,
        query: query !== undefined ? query : filters.query
      };

      const result = await searchMarketplace(searchFilters);
      setSearchResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Load more results (for pagination)
  const loadMore = useCallback(async () => {
    if (!searchResult || isLoading) return;

    setIsLoading(true);
    try {
      // In a real implementation, this would fetch the next page
      // For now, we'll just simulate it
      const result = await searchMarketplace(filters);
      setSearchResult(prev => prev ? {
        ...result,
        items: [...prev.items, ...result.items]
      } : result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more results');
    } finally {
      setIsLoading(false);
    }
  }, [searchResult, filters, isLoading]);

  // Filter helpers
  const setCategory = useCallback((category: MarketplaceCategory | undefined) => {
    updateFilters({
      category,
      subcategory: undefined // Reset subcategory when category changes
    });
  }, [updateFilters]);

  const setLocation = useCallback((location: string | undefined) => {
    updateFilters({ location });
  }, [updateFilters]);

  const setPriceRange = useCallback((min: number, max: number) => {
    updateFilters({
      priceRange: { min, max }
    });
  }, [updateFilters]);

  const setRating = useCallback((rating: number | undefined) => {
    updateFilters({ rating });
  }, [updateFilters]);

  const setSortBy = useCallback((sortBy: SearchFilters['sortBy']) => {
    updateFilters({ sortBy });
  }, [updateFilters]);

  return {
    // Search state
    searchResult,
    isLoading,
    error,

    // Search filters
    filters,
    updateFilters,
    resetFilters,

    // Search actions
    performSearch,
    loadMore,

    // Helper data
    categories,
    subcategories,
    locations,

    // Filter helpers
    setCategory,
    setLocation,
    setPriceRange,
    setRating,
    setSortBy
  };
}
