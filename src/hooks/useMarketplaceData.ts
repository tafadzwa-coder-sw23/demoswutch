import { useState, useEffect, useCallback } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { marketplaceApi } from '@/services/marketplaceApi';
import { Product, Vendor, SearchResult } from '@/context/MarketplaceContext';

// Hook for search functionality
export function useSearch() {
  const { state, dispatch } = useMarketplace();
  const [isSearching, setIsSearching] = useState(false);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    dispatch({ type: 'ADD_RECENT_SEARCH', payload: query });

    try {
      const results = await marketplaceApi.searchProducts(query);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
      
      // Add notification for search completion
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: '',
          type: 'info',
          title: 'Search Complete',
          message: `Found ${results.totalResults} results for "${query}"`,
          timestamp: '',
          read: false
        }
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Search failed. Please try again.' });
    } finally {
      setIsSearching(false);
    }
  }, [dispatch]);

  const clearSearch = useCallback(() => {
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: null });
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
  }, [dispatch]);

  return {
    search,
    clearSearch,
    searchResults: state.searchResults,
    searchQuery: state.searchQuery,
    isLoading: state.isLoading || isSearching,
    error: state.error,
    recentSearches: state.recentSearches
  };
}

// Hook for product management
export function useProducts() {
  const { state, dispatch } = useMarketplace();

  const loadProducts = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // In a real app, this would fetch from API
      // For now, we'll use the products already in state
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load products' });
    }
  }, [dispatch]);

  const getProduct = useCallback(async (id: string): Promise<Product | null> => {
    try {
      return await marketplaceApi.getProduct(id);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load product' });
      return null;
    }
  }, [dispatch]);

  const addProduct = useCallback(async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>) => {
    try {
      const newProduct = await marketplaceApi.addProduct(product);
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: '',
          type: 'success',
          title: 'Product Added',
          message: `"${newProduct.title}" has been added successfully`,
          timestamp: '',
          read: false
        }
      });
      
      return newProduct;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add product' });
      throw error;
    }
  }, [dispatch]);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    try {
      const updatedProduct = await marketplaceApi.updateProduct(id, updates);
      if (updatedProduct) {
        dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
        
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: '',
            type: 'success',
            title: 'Product Updated',
            message: `"${updatedProduct.title}" has been updated successfully`,
            timestamp: '',
            read: false
          }
        });
      }
      return updatedProduct;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update product' });
      throw error;
    }
  }, [dispatch]);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const success = await marketplaceApi.deleteProduct(id);
      if (success) {
        dispatch({ type: 'DELETE_PRODUCT', payload: id });
        
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: '',
            type: 'info',
            title: 'Product Deleted',
            message: 'Product has been removed successfully',
            timestamp: '',
            read: false
          }
        });
      }
      return success;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete product' });
      throw error;
    }
  }, [dispatch]);

  return {
    products: state.products,
    isLoading: state.isLoading,
    error: state.error,
    loadProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
  };
}

// Hook for vendor management
export function useVendors() {
  const { state, dispatch } = useMarketplace();

  const loadVendors = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // In a real app, this would fetch from API
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load vendors' });
    }
  }, [dispatch]);

  const getVendor = useCallback(async (id: string): Promise<Vendor | null> => {
    try {
      return await marketplaceApi.getVendor(id);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load vendor' });
      return null;
    }
  }, [dispatch]);

  const getNearbyVendors = useCallback(async (latitude?: number, longitude?: number) => {
    try {
      const vendors = await marketplaceApi.getNearbyVendors(latitude, longitude);
      dispatch({ type: 'SET_NEARBY_VENDORS', payload: vendors });
      return vendors;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load nearby vendors' });
      return [];
    }
  }, [dispatch]);

  const addVendor = useCallback(async (vendor: Omit<Vendor, 'id' | 'joinedAt'>) => {
    try {
      const newVendor = await marketplaceApi.addVendor(vendor);
      dispatch({ type: 'ADD_VENDOR', payload: newVendor });
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: '',
          type: 'success',
          title: 'Vendor Added',
          message: `"${newVendor.name}" has been added successfully`,
          timestamp: '',
          read: false
        }
      });
      
      return newVendor;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add vendor' });
      throw error;
    }
  }, [dispatch]);

  const updateVendor = useCallback(async (id: string, updates: Partial<Vendor>) => {
    try {
      const updatedVendor = await marketplaceApi.updateVendor(id, updates);
      if (updatedVendor) {
        dispatch({ type: 'UPDATE_VENDOR', payload: updatedVendor });
        
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: '',
            type: 'success',
            title: 'Vendor Updated',
            message: `"${updatedVendor.name}" has been updated successfully`,
            timestamp: '',
            read: false
          }
        });
      }
      return updatedVendor;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update vendor' });
      throw error;
    }
  }, [dispatch]);

  return {
    vendors: state.vendors,
    nearbyVendors: state.nearbyVendors,
    isLoading: state.isLoading,
    error: state.error,
    loadVendors,
    getVendor,
    getNearbyVendors,
    addVendor,
    updateVendor
  };
}

// Hook for popular products
export function usePopularProducts() {
  const { state, dispatch } = useMarketplace();

  const loadPopularProducts = useCallback(async (limit: number = 10) => {
    try {
      const products = await marketplaceApi.getPopularProducts(limit);
      dispatch({ type: 'SET_POPULAR_PRODUCTS', payload: products });
      return products;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load popular products' });
      return [];
    }
  }, [dispatch]);

  return {
    popularProducts: state.popularProducts,
    loadPopularProducts
  };
}

// Hook for notifications
export function useNotifications() {
  const { state, dispatch } = useMarketplace();

  const loadNotifications = useCallback(async () => {
    try {
      const notifications = await marketplaceApi.getNotifications();
      // Notifications are already loaded in the context
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load notifications' });
    }
  }, [dispatch]);

  const addNotification = useCallback(async (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    try {
      const newNotification = await marketplaceApi.addNotification(notification);
      dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
      return newNotification;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add notification' });
      throw error;
    }
  }, [dispatch]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      const success = await marketplaceApi.markNotificationRead(id);
      if (success) {
        dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
      }
      return success;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to mark notification as read' });
      return false;
    }
  }, [dispatch]);

  const clearNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  }, [dispatch]);

  return {
    notifications: state.notifications,
    unreadCount: state.notifications.filter(n => !n.read).length,
    loadNotifications,
    addNotification,
    markAsRead,
    clearNotifications
  };
}
