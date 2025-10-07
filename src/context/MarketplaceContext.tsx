import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  description: string;
  images: string[];
  vendor: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    location: string;
    distance: string;
    rating: number;
    phone: string;
    hours: string;
    open: boolean;
  };
  rating: number;
  reviews: number;
  inStock: boolean;
  quantity: string;
  tags: string[];
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  location: string;
  distance: string;
  rating: number;
  phone: string;
  hours: string;
  open: boolean;
  type: 'Supermarket' | 'Informal Vendor' | 'Home Garden' | 'Street Vendor';
  products: string[];
  joinedAt: string;
}

export interface SearchResult {
  products: Product[];
  vendors: Vendor[];
  totalResults: number;
  searchTime: number;
}

export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// State interface
interface MarketplaceState {
  products: Product[];
  vendors: Vendor[];
  searchResults: SearchResult | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  notifications: Notification[];
  recentSearches: string[];
  popularProducts: Product[];
  nearbyVendors: Vendor[];
}

// Action types
type MarketplaceAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_VENDORS'; payload: Vendor[] }
  | { type: 'SET_SEARCH_RESULTS'; payload: SearchResult }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'ADD_VENDOR'; payload: Vendor }
  | { type: 'UPDATE_VENDOR'; payload: Vendor }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'ADD_RECENT_SEARCH'; payload: string }
  | { type: 'SET_POPULAR_PRODUCTS'; payload: Product[] }
  | { type: 'SET_NEARBY_VENDORS'; payload: Vendor[] };

// Initial state
const initialState: MarketplaceState = {
  products: [],
  vendors: [],
  searchResults: null,
  searchQuery: '',
  isLoading: false,
  error: null,
  notifications: [],
  recentSearches: [],
  popularProducts: [],
  nearbyVendors: [],
};

// Reducer
function marketplaceReducer(state: MarketplaceState, action: MarketplaceAction): MarketplaceState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    
    case 'SET_VENDORS':
      return { ...state, vendors: action.payload };
    
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload, isLoading: false };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => p.id === action.payload.id ? action.payload : p)
      };
    
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload)
      };
    
    case 'ADD_VENDOR':
      return { ...state, vendors: [...state.vendors, action.payload] };
    
    case 'UPDATE_VENDOR':
      return {
        ...state,
        vendors: state.vendors.map(v => v.id === action.payload.id ? action.payload : v)
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications].slice(0, 50) // Keep last 50
      };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => 
          n.id === action.payload ? { ...n, read: true } : n
        )
      };
    
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    
    case 'ADD_RECENT_SEARCH':
      const newSearches = [action.payload, ...state.recentSearches.filter(s => s !== action.payload)].slice(0, 10);
      return { ...state, recentSearches: newSearches };
    
    case 'SET_POPULAR_PRODUCTS':
      return { ...state, popularProducts: action.payload };
    
    case 'SET_NEARBY_VENDORS':
      return { ...state, nearbyVendors: action.payload };
    
    default:
      return state;
  }
}

// Context
const MarketplaceContext = createContext<{
  state: MarketplaceState;
  dispatch: React.Dispatch<MarketplaceAction>;
} | null>(null);

// Provider component
export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(marketplaceReducer, initialState);

  // Load initial data from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('marketplace_products');
    const savedVendors = localStorage.getItem('marketplace_vendors');
    const savedSearches = localStorage.getItem('marketplace_recent_searches');
    const savedNotifications = localStorage.getItem('marketplace_notifications');

    if (savedProducts) {
      try {
        dispatch({ type: 'SET_PRODUCTS', payload: JSON.parse(savedProducts) });
      } catch (error) {
        console.error('Error loading products from localStorage:', error);
      }
    }

    if (savedVendors) {
      try {
        dispatch({ type: 'SET_VENDORS', payload: JSON.parse(savedVendors) });
      } catch (error) {
        console.error('Error loading vendors from localStorage:', error);
      }
    }

    if (savedSearches) {
      try {
        const searches = JSON.parse(savedSearches);
        searches.forEach((search: string) => {
          dispatch({ type: 'ADD_RECENT_SEARCH', payload: search });
        });
      } catch (error) {
        console.error('Error loading recent searches from localStorage:', error);
      }
    }

    if (savedNotifications) {
      try {
        dispatch({ type: 'SET_NOTIFICATIONS', payload: JSON.parse(savedNotifications) });
      } catch (error) {
        console.error('Error loading notifications from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('marketplace_products', JSON.stringify(state.products));
  }, [state.products]);

  useEffect(() => {
    localStorage.setItem('marketplace_vendors', JSON.stringify(state.vendors));
  }, [state.vendors]);

  useEffect(() => {
    localStorage.setItem('marketplace_recent_searches', JSON.stringify(state.recentSearches));
  }, [state.recentSearches]);

  useEffect(() => {
    localStorage.setItem('marketplace_notifications', JSON.stringify(state.notifications));
  }, [state.notifications]);

  return (
    <MarketplaceContext.Provider value={{ state, dispatch }}>
      {children}
    </MarketplaceContext.Provider>
  );
}

// Custom hook
export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
