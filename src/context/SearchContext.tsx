import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
export interface SearchedProduct {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  description: string;
  image: string;
  vendor: {
    name: string;
    location: string;
    distance: string;
    rating: number;
    phone: string;
    verified: boolean;
  };
  inStock: boolean;
  rating: number;
  views: number;
  likes: number;
  priceComparison?: Array<{
    vendorName: string;
    price: number;
    distance: string;
    rating: number;
    inStock: boolean;
    savings?: number;
  }>;
  recommendations?: Array<{
    id: string;
    title: string;
    price: number;
    image: string;
    reason: string;
  }>;
  frequentlyBoughtTogether?: Array<{
    id: string;
    title: string;
    price: number;
    image: string;
    bundleDiscount?: number;
  }>;
}

export interface SearchState {
  query: string;
  category: string | null;
  results: SearchedProduct[];
  searchedItem: SearchedProduct | null;
  isLoading: boolean;
  error: string | null;
  recentSearches: string[];
  searchHistory: Array<{
    query: string;
    category: string | null;
    timestamp: string;
    resultsCount: number;
  }>;
}

// Action types
type SearchAction =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string | null }
  | { type: 'SET_RESULTS'; payload: SearchedProduct[] }
  | { type: 'SET_SEARCHED_ITEM'; payload: SearchedProduct | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_RECENT_SEARCH'; payload: string }
  | { type: 'ADD_SEARCH_HISTORY'; payload: { query: string; category: string | null; resultsCount: number } }
  | { type: 'CLEAR_SEARCH' }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: SearchState = {
  query: '',
  category: null,
  results: [],
  searchedItem: null,
  isLoading: false,
  error: null,
  recentSearches: [],
  searchHistory: [],
};

// Reducer
function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    
    case 'SET_RESULTS':
      return { ...state, results: action.payload, isLoading: false };
    
    case 'SET_SEARCHED_ITEM':
      return { ...state, searchedItem: action.payload };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'ADD_RECENT_SEARCH':
      const newRecentSearches = [action.payload, ...state.recentSearches.filter(s => s !== action.payload)].slice(0, 10);
      return { ...state, recentSearches: newRecentSearches };
    
    case 'ADD_SEARCH_HISTORY':
      const newSearchHistory = [action.payload, ...state.searchHistory].slice(0, 50);
      return { ...state, searchHistory: newSearchHistory };
    
    case 'CLEAR_SEARCH':
      return { ...state, query: '', category: null, results: [], searchedItem: null, error: null };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
}

// Context
const SearchContext = createContext<{
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
  search: (query: string, category?: string) => Promise<void>;
  clearSearch: () => void;
} | null>(null);

// Provider component
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  // Load initial data from localStorage
  useEffect(() => {
    const savedRecentSearches = localStorage.getItem('search_recent_searches');
    const savedSearchHistory = localStorage.getItem('search_history');

    if (savedRecentSearches) {
      try {
        const searches = JSON.parse(savedRecentSearches);
        searches.forEach((search: string) => {
          dispatch({ type: 'ADD_RECENT_SEARCH', payload: search });
        });
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }

    if (savedSearchHistory) {
      try {
        const history = JSON.parse(savedSearchHistory);
        history.forEach((item: any) => {
          dispatch({ type: 'ADD_SEARCH_HISTORY', payload: item });
        });
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('search_recent_searches', JSON.stringify(state.recentSearches));
  }, [state.recentSearches]);

  useEffect(() => {
    localStorage.setItem('search_history', JSON.stringify(state.searchHistory));
  }, [state.searchHistory]);

  // Search function
  const search = async (query: string, category?: string) => {
    if (!query.trim()) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_QUERY', payload: query });
    dispatch({ type: 'SET_CATEGORY', payload: category || null });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock search results based on query and category
      const mockResults = generateMockSearchResults(query, category);
      
      dispatch({ type: 'SET_RESULTS', payload: mockResults });
      // Set the first result as the main searched item
      if (mockResults.length > 0) {
        dispatch({ type: 'SET_SEARCHED_ITEM', payload: mockResults[0] });
      }
      dispatch({ type: 'ADD_RECENT_SEARCH', payload: query });
      dispatch({ 
        type: 'ADD_SEARCH_HISTORY', 
        payload: { 
          query, 
          category: category || null, 
          resultsCount: mockResults.length,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Search failed. Please try again.' });
    }
  };

  const clearSearch = () => {
    dispatch({ type: 'CLEAR_SEARCH' });
  };

  return (
    <SearchContext.Provider value={{ state, dispatch, search, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

// Custom hook
export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
}

// Helper function to generate mock search results
function generateMockSearchResults(query: string, category?: string): SearchedProduct[] {
  const searchTerm = query.toLowerCase();
  
  // Generate price comparison data
  const generatePriceComparison = (basePrice: number) => [
    {
      vendorName: 'Mai Sarah Fresh Produce',
      price: basePrice,
      distance: '0.2km',
      rating: 4.8,
      inStock: true,
      savings: 0
    },
    {
      vendorName: 'OK Zimbabwe',
      price: basePrice + 0.75,
      distance: '0.5km',
      rating: 4.2,
      inStock: true,
      savings: -0.75
    },
    {
      vendorName: 'Auntie Grace Home Garden',
      price: basePrice - 0.30,
      distance: '0.3km',
      rating: 4.9,
      inStock: true,
      savings: 0.30
    },
    {
      vendorName: 'Pick n Pay',
      price: basePrice + 0.45,
      distance: '1.2km',
      rating: 4.5,
      inStock: false,
      savings: -0.45
    },
    {
      vendorName: 'Brother John BBQ & Groceries',
      price: basePrice - 0.20,
      distance: '0.8km',
      rating: 4.7,
      inStock: true,
      savings: 0.20
    }
  ];

  // Generate recommendations based on search term
  const generateRecommendations = (searchTerm: string) => {
    const recommendations = [
      {
        id: 'rec1',
        title: 'Fresh Onions',
        price: 1.80,
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=200&fit=crop',
        reason: `Often bought with ${searchTerm}`
      },
      {
        id: 'rec2',
        title: 'Cooking Oil',
        price: 4.25,
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop',
        reason: 'Perfect for cooking'
      },
      {
        id: 'rec3',
        title: 'Fresh Garlic',
        price: 2.10,
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=200&h=200&fit=crop',
        reason: 'Great seasoning companion'
      },
      {
        id: 'rec4',
        title: 'Bell Peppers',
        price: 3.50,
        image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&h=200&fit=crop',
        reason: 'Similar vegetable'
      }
    ];
    return recommendations.slice(0, 3);
  };

  // Generate frequently bought together items
  const generateFrequentlyBoughtTogether = (searchTerm: string) => [
    {
      id: 'fbt1',
      title: 'Fresh Onions',
      price: 1.80,
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=200&fit=crop',
      bundleDiscount: 0.15
    },
    {
      id: 'fbt2',
      title: 'Cooking Salt',
      price: 0.75,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=200&h=200&fit=crop',
      bundleDiscount: 0.05
    },
    {
      id: 'fbt3',
      title: 'Vegetable Oil',
      price: 4.25,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop',
      bundleDiscount: 0.25
    }
  ];
  
  // Base products that can be searched
  const baseProducts: SearchedProduct[] = [
    {
      id: 'search1',
      title: query,
      price: 2.50,
      currency: 'USD',
      category: category || 'Vegetables',
      description: `Fresh ${query.toLowerCase()} available from local vendors. High quality, locally sourced produce perfect for your daily cooking needs.`,
      image: 'https://images.unsplash.com/photo-1546470427-e26264be0d2b?w=300&h=300&fit=crop',
      vendor: {
        name: 'Mai Sarah Fresh Produce',
        location: 'CBD Street',
        distance: '0.2km',
        rating: 4.8,
        phone: '+263 77 123 4567',
        verified: true
      },
      inStock: true,
      rating: 4.7,
      views: 1247,
      likes: 89,
      priceComparison: generatePriceComparison(2.50),
      recommendations: generateRecommendations(query),
      frequentlyBoughtTogether: generateFrequentlyBoughtTogether(query)
    },
    {
      id: 'search2',
      title: `Premium ${query}`,
      price: 3.25,
      currency: 'USD',
      category: category || 'Vegetables',
      description: `High-quality ${query.toLowerCase()} from trusted suppliers. Premium grade produce with guaranteed freshness and quality.`,
      image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=300&h=300&fit=crop',
      vendor: {
        name: 'OK Zimbabwe',
        location: 'Avondale',
        distance: '0.5km',
        rating: 4.2,
        phone: '+263 77 234 5678',
        verified: true
      },
      inStock: true,
      rating: 4.3,
      views: 892,
      likes: 45,
      priceComparison: generatePriceComparison(3.25),
      recommendations: generateRecommendations(query),
      frequentlyBoughtTogether: generateFrequentlyBoughtTogether(query)
    },
    {
      id: 'search3',
      title: `Organic ${query}`,
      price: 2.80,
      currency: 'USD',
      category: category || 'Vegetables',
      description: `Organic ${query.toLowerCase()} grown locally without pesticides. Environmentally friendly and healthy choice for your family.`,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=300&fit=crop',
      vendor: {
        name: 'Auntie Grace Home Garden',
        location: 'Avondale',
        distance: '0.3km',
        rating: 4.9,
        phone: '+263 77 456 7890',
        verified: true
      },
      inStock: true,
      rating: 4.8,
      views: 567,
      likes: 23,
      priceComparison: generatePriceComparison(2.80),
      recommendations: generateRecommendations(query),
      frequentlyBoughtTogether: generateFrequentlyBoughtTogether(query)
    }
  ];

  // Filter based on search term
  return baseProducts.filter(product => 
    product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
}
