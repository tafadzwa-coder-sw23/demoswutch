import {
  MarketplaceItem,
  MarketplaceCategory,
  SearchFilters,
  SearchResult,
  Product,
  Service,
  Property,
  Job,
  Event,
  DigitalContent
} from '@/types/marketplace-updated';
import { mockMarketplaceItems, marketplaceCategories, locationCoordinates } from '@/data/marketplace-updated';

// Type guards
function isProduct(item: MarketplaceItem): item is Product {
  return 'availability' in item && 'inStock' in item.availability;
}

function isService(item: MarketplaceItem): item is Service {
  return 'availability' in item && 'schedule' in item.availability;
}

function isProperty(item: MarketplaceItem): item is Property {
  return 'availability' in item && 'availableFrom' in item.availability;
}

function hasLocation(item: MarketplaceItem): item is MarketplaceItem & { location: string } {
  return 'location' in item;
}

function hasCoordinates(item: MarketplaceItem): item is MarketplaceItem & { coordinates: { lat: number; lng: number } } {
  return 'coordinates' in item && item.coordinates !== undefined;
}

function hasRating(item: MarketplaceItem): item is MarketplaceItem & { rating: number } {
  return 'rating' in item && item.rating !== undefined;
}

function hasPrice(item: MarketplaceItem): item is MarketplaceItem & { price: number } {
  return 'price' in item;
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Get coordinates for a location
function getLocationCoordinates(location: string): { lat: number; lng: number } | null {
  return locationCoordinates[location] || null;
}

// Search score calculation
function calculateSearchScore(item: MarketplaceItem, query: string, filters: SearchFilters): number {
  let score = 0;
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);

  // Title match (highest weight)
  const title = item.title.toLowerCase();
  const titleMatches = searchTerms.filter(term => title.includes(term)).length;
  score += titleMatches * 10;

  // Description match
  const description = item.description.toLowerCase();
  const descMatches = searchTerms.filter(term => description.includes(term)).length;
  score += descMatches * 5;

  // Tags match
  if ('tags' in item) {
    const tags = item.tags.join(' ').toLowerCase();
    const tagMatches = searchTerms.filter(term => tags.includes(term)).length;
    score += tagMatches * 8;
  }

  // Category match
  if (filters.category && item.category === filters.category) {
    score += 15;
  }

  // Subcategory match
  if (filters.subcategory && 'subcategory' in item && item.subcategory === filters.subcategory) {
    score += 12;
  }

  // Location match
  if (filters.location && hasLocation(item) && item.location.toLowerCase().includes(filters.location.toLowerCase())) {
    score += 10;
  }

  // Price range match
  if (filters.priceRange && hasPrice(item)) {
    if (item.price >= filters.priceRange.min && item.price <= filters.priceRange.max) {
      score += 5;
    }
  }

  // Rating boost for higher rated items
  if (filters.rating && hasRating(item) && item.rating && item.rating >= filters.rating) {
    score += (item.rating - filters.rating) * 2;
  }

  // Availability boost
  if (filters.availability) {
    if (isProduct(item)) {
      if (filters.availability.inStock && item.availability.inStock) score += 3;
      if (filters.availability.delivery && item.availability.deliveryAvailable) score += 2;
      if (filters.availability.pickup && item.availability.pickupAvailable) score += 2;
    }
  }

  // Distance boost (closer items get higher score)
  if (filters.distance && hasCoordinates(item) && filters.location) {
    const itemCoords = getLocationCoordinates(hasLocation(item) ? item.location : '');
    const filterCoords = getLocationCoordinates(filters.location);
    if (itemCoords && filterCoords) {
      const distance = calculateDistance(
        itemCoords.lat, itemCoords.lng,
        filterCoords.lat, filterCoords.lng
      );
      if (distance <= filters.distance) {
        score += Math.max(0, (filters.distance - distance) / filters.distance * 10);
      }
    }
  }

  // Accessibility boost
  if (filters.accessibility) {
    if ('accessibility' in item && item.accessibility) {
      if (filters.accessibility.signLanguage && item.accessibility.signLanguage) score += 5;
      if (filters.accessibility.audioDescription && item.accessibility.audioDescription) score += 5;
    }
  }

  return score;
}

// Filter items based on search criteria
function filterItems(items: MarketplaceItem[], filters: SearchFilters): MarketplaceItem[] {
  return items.filter(item => {
    // Query filter
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const searchableText = `${item.title} ${item.description} ${item.category} ${'tags' in item ? item.tags.join(' ') : ''}`.toLowerCase();
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    // Category filter
    if (filters.category && item.category !== filters.category) {
      return false;
    }

    // Subcategory filter
    if (filters.subcategory && 'subcategory' in item && item.subcategory !== filters.subcategory) {
      return false;
    }

    // Location filter
    if (filters.location && hasLocation(item) && !item.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    // Price range filter
    if (filters.priceRange && hasPrice(item)) {
      if (item.price < filters.priceRange.min || item.price > filters.priceRange.max) {
        return false;
      }
    }

    // Rating filter
    if (filters.rating && hasRating(item) && item.rating && item.rating < filters.rating) {
      return false;
    }

    // Availability filter
    if (filters.availability) {
      if (isProduct(item)) {
        if (filters.availability.inStock && !item.availability.inStock) return false;
        if (filters.availability.delivery && !item.availability.deliveryAvailable) return false;
        if (filters.availability.pickup && !item.availability.pickupAvailable) return false;
      }
    }

    // Distance filter
    if (filters.distance && hasCoordinates(item) && filters.location) {
      const itemCoords = getLocationCoordinates(hasLocation(item) ? item.location : '');
      const filterCoords = getLocationCoordinates(filters.location);
      if (itemCoords && filterCoords) {
        const distance = calculateDistance(
          itemCoords.lat, itemCoords.lng,
          filterCoords.lat, filterCoords.lng
        );
        if (distance > filters.distance) {
          return false;
        }
      }
    }

    // Accessibility filter
    if (filters.accessibility) {
      if ('accessibility' in item && item.accessibility) {
        if (filters.accessibility.signLanguage && !item.accessibility.signLanguage) return false;
        if (filters.accessibility.audioDescription && !item.accessibility.audioDescription) return false;
      }
    }

    return true;
  });
}

// Sort items based on sort criteria
function sortItems(items: MarketplaceItem[], sortBy: string): MarketplaceItem[] {
  const sortedItems = [...items];

  switch (sortBy) {
    case 'price-low':
      return sortedItems.sort((a, b) => {
        const priceA = hasPrice(a) ? a.price : 0;
        const priceB = hasPrice(b) ? b.price : 0;
        return priceA - priceB;
      });
    case 'price-high':
      return sortedItems.sort((a, b) => {
        const priceA = hasPrice(a) ? a.price : 0;
        const priceB = hasPrice(b) ? b.price : 0;
        return priceB - priceA;
      });
    case 'rating':
      return sortedItems.sort((a, b) => {
        const ratingA = hasRating(a) ? (a.rating || 0) : 0;
        const ratingB = hasRating(b) ? (b.rating || 0) : 0;
        return ratingB - ratingA;
      });
    case 'distance':
      return sortedItems.sort((a, b) => {
        // This would need location context for proper sorting
        // For now, just return as-is
        return 0;
      });
    case 'newest':
      return sortedItems.sort((a, b) => {
        // This would need timestamp data for proper sorting
        // For now, just return as-is
        return 0;
      });
    case 'relevance':
    default:
      // Items are already sorted by relevance score
      return sortedItems;
  }
}

// Generate search suggestions based on query
function generateSuggestions(query: string, items: MarketplaceItem[]): string[] {
  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();

  items.forEach(item => {
    // Add category suggestions
    if (item.category.toLowerCase().includes(queryLower)) {
      suggestions.add(item.category);
    }

    // Add location suggestions
    if (hasLocation(item) && item.location.toLowerCase().includes(queryLower)) {
      suggestions.add(item.location);
    }

    // Add tag suggestions
    if ('tags' in item) {
      item.tags.forEach(tag => {
        if (tag.toLowerCase().includes(queryLower)) {
          suggestions.add(tag);
        }
      });
    }

    // Add title word suggestions
    const titleWords = item.title.toLowerCase().split(' ');
    titleWords.forEach(word => {
      if (word.includes(queryLower) && word.length > 3) {
        suggestions.add(word);
      }
    });
  });

  return Array.from(suggestions).slice(0, 8);
}

// Get related categories based on search
function getRelatedCategories(category: MarketplaceCategory): MarketplaceCategory[] {
  const related: MarketplaceCategory[] = [];

  switch (category) {
    case 'Fashion & Accessories':
      related.push('Health & Beauty');
      break;
    case 'Services':
      related.push('Jobs & Employment', 'Education & Training');
      break;
    case 'Food & Groceries':
      related.push('Health & Beauty', 'Home & Garden');
      break;
    case 'Property':
      related.push('Home & Garden', 'Services');
      break;
    case 'Jobs & Employment':
      related.push('Education & Training', 'Services');
      break;
    case 'Electronics & Technology':
      related.push('Services', 'Digital Content');
      break;
    default:
      related.push('Services', 'Other');
  }

  return related.slice(0, 3);
}

// Main search function
export async function searchMarketplace(filters: SearchFilters): Promise<SearchResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  let filteredItems = filterItems(mockMarketplaceItems, filters);

  // Calculate search scores for relevance sorting
  if (filters.query) {
    filteredItems = filteredItems.map(item => ({
      ...item,
      searchScore: calculateSearchScore(item, filters.query!, filters)
    })).sort((a, b) => (b.searchScore || 0) - (a.searchScore || 0));
  }

  // Apply sorting
  const sortedItems = sortItems(filteredItems, filters.sortBy || 'relevance');

  // Generate suggestions
  const suggestions = filters.query ? generateSuggestions(filters.query, mockMarketplaceItems) : [];

  // Get related categories
  const relatedCategories = filters.category ? getRelatedCategories(filters.category) : [];

  return {
    items: sortedItems,
    totalCount: sortedItems.length,
    hasMore: false, // For now, since we're using mock data
    filters,
    suggestions,
    relatedCategories
  };
}

// Get all available categories
export function getAllCategories(): MarketplaceCategory[] {
  return Object.keys(marketplaceCategories) as MarketplaceCategory[];
}

// Get subcategories for a category
export function getSubcategories(category: MarketplaceCategory): string[] {
  return marketplaceCategories[category] || [];
}

// Get all locations
export function getAllLocations(): string[] {
  return Object.keys(locationCoordinates);
}

// Get items by category
export function getItemsByCategory(category: MarketplaceCategory): MarketplaceItem[] {
  return mockMarketplaceItems.filter(item => item.category === category);
}

// Get featured items (high-rated, popular items)
export function getFeaturedItems(limit: number = 10): MarketplaceItem[] {
  return mockMarketplaceItems
    .filter(item => hasRating(item) && item.rating >= 4.5)
    .sort((a, b) => (b as any).rating - (a as any).rating)
    .slice(0, limit);
}

// Get items near location
export function getItemsNearLocation(location: string, radiusKm: number = 50): MarketplaceItem[] {
  const locationCoords = getLocationCoordinates(location);
  if (!locationCoords) return [];

  return mockMarketplaceItems.filter(item => {
    if (!hasCoordinates(item)) return false;

    const distance = calculateDistance(
      locationCoords.lat, locationCoords.lng,
      item.coordinates.lat, item.coordinates.lng
    );

    return distance <= radiusKm;
  }).sort((a, b) => {
    const distA = hasCoordinates(a) ? calculateDistance(locationCoords.lat, locationCoords.lng, a.coordinates.lat, a.coordinates.lng) : Infinity;
    const distB = hasCoordinates(b) ? calculateDistance(locationCoords.lat, locationCoords.lng, b.coordinates.lat, b.coordinates.lng) : Infinity;
    return distA - distB;
  });
}
