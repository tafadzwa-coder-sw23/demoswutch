import { Product, Vendor, SearchResult, Notification } from '@/context/MarketplaceContext';

// Mock data generators
const generateId = () => Math.random().toString(36).substr(2, 9);

const mockVendors: Vendor[] = [
  {
    id: 'vendor1',
    name: 'Mai Sarah Fresh Produce',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    verified: true,
    location: 'CBD Street, Harare',
    distance: '0.2km',
    rating: 4.8,
    phone: '+263 77 123 4567',
    hours: '6AM - 6PM',
    open: true,
    type: 'Street Vendor',
    products: ['prod1', 'prod2', 'prod3'],
    joinedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 'vendor2',
    name: 'OK Zimbabwe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    verified: true,
    location: 'Avondale, Harare',
    distance: '0.5km',
    rating: 4.2,
    phone: '+263 77 234 5678',
    hours: '7AM - 9PM',
    open: true,
    type: 'Supermarket',
    products: ['prod4', 'prod5', 'prod6'],
    joinedAt: '2024-01-10T08:00:00Z'
  },
  {
    id: 'vendor3',
    name: 'Brother John BBQ & Groceries',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    verified: false,
    location: 'Borrowdale, Harare',
    distance: '0.8km',
    rating: 4.7,
    phone: '+263 77 345 6789',
    hours: '5AM - 8PM',
    open: true,
    type: 'Informal Vendor',
    products: ['prod7', 'prod8', 'prod9'],
    joinedAt: '2024-01-20T08:00:00Z'
  },
  {
    id: 'vendor4',
    name: 'Auntie Grace Home Garden',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    verified: true,
    location: 'Avondale, Harare',
    distance: '0.3km',
    rating: 4.9,
    phone: '+263 77 456 7890',
    hours: '7AM - 5PM',
    open: false,
    type: 'Home Garden',
    products: ['prod10', 'prod11', 'prod12'],
    joinedAt: '2024-01-25T08:00:00Z'
  }
];

const mockProducts: Product[] = [
  {
    id: 'prod1',
    title: 'Fresh Organic Tomatoes',
    price: 2.50,
    currency: 'USD',
    category: 'Vegetables',
    description: 'Fresh organic tomatoes grown locally in Harare. Perfect for cooking, salads, and making sauces.',
    images: [
      'https://images.unsplash.com/photo-1546470427-e26264be0d2b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&h=400&fit=crop'
    ],
    vendor: mockVendors[0],
    rating: 4.7,
    reviews: 23,
    inStock: true,
    quantity: '1kg bag',
    tags: ['Organic', 'Fresh', 'Local'],
    views: 1247,
    likes: 89,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'prod2',
    title: 'Cooking Oil',
    price: 4.25,
    currency: 'USD',
    category: 'Pantry',
    description: 'High-quality cooking oil perfect for all your cooking needs.',
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop'
    ],
    vendor: mockVendors[1],
    rating: 4.3,
    reviews: 15,
    inStock: true,
    quantity: '1L bottle',
    tags: ['Cooking', 'Essential'],
    views: 892,
    likes: 45,
    createdAt: '2024-01-10T14:00:00Z',
    updatedAt: '2024-01-10T14:00:00Z'
  },
  {
    id: 'prod3',
    title: 'Fresh Cabbage',
    price: 1.50,
    currency: 'USD',
    category: 'Vegetables',
    description: 'Fresh green cabbage from local farms.',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop'
    ],
    vendor: mockVendors[2],
    rating: 4.8,
    reviews: 8,
    inStock: true,
    quantity: '1 head',
    tags: ['Fresh', 'Local'],
    views: 567,
    likes: 23,
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-01-20T09:00:00Z'
  }
];

// API simulation functions
export const marketplaceApi = {
  // Search products
  async searchProducts(query: string, filters?: any): Promise<SearchResult> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    const searchTerm = query.toLowerCase();
    const matchingProducts = mockProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    const matchingVendors = mockVendors.filter(vendor =>
      vendor.name.toLowerCase().includes(searchTerm) ||
      vendor.location.toLowerCase().includes(searchTerm)
    );

    return {
      products: matchingProducts,
      vendors: matchingVendors,
      totalResults: matchingProducts.length + matchingVendors.length,
      searchTime: Math.random() * 200 + 100 // 100-300ms
    };
  },

  // Get product by ID
  async getProduct(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.find(p => p.id === id) || null;
  },

  // Get vendor by ID
  async getVendor(id: string): Promise<Vendor | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockVendors.find(v => v.id === id) || null;
  },

  // Get nearby vendors
  async getNearbyVendors(latitude?: number, longitude?: number, radius?: number): Promise<Vendor[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockVendors.filter(v => v.open).sort((a, b) => {
      const distanceA = parseFloat(a.distance);
      const distanceB = parseFloat(b.distance);
      return distanceA - distanceB;
    });
  },

  // Get popular products
  async getPopularProducts(limit: number = 10): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockProducts]
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  },

  // Get vendor products
  async getVendorProducts(vendorId: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.filter(p => p.vendor.id === vendorId);
  },

  // Add product (for vendors)
  async addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newProduct: Product = {
      ...product,
      id: generateId(),
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockProducts.push(newProduct);
    return newProduct;
  },

  // Update product
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) return null;

    mockProducts[index] = {
      ...mockProducts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return mockProducts[index];
  },

  // Delete product
  async deleteProduct(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) return false;

    mockProducts.splice(index, 1);
    return true;
  },

  // Add vendor
  async addVendor(vendor: Omit<Vendor, 'id' | 'joinedAt'>): Promise<Vendor> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newVendor: Vendor = {
      ...vendor,
      id: generateId(),
      joinedAt: new Date().toISOString()
    };

    mockVendors.push(newVendor);
    return newVendor;
  },

  // Update vendor
  async updateVendor(id: string, updates: Partial<Vendor>): Promise<Vendor | null> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const index = mockVendors.findIndex(v => v.id === id);
    if (index === -1) return null;

    mockVendors[index] = { ...mockVendors[index], ...updates };
    return mockVendors[index];
  },

  // Get notifications
  async getNotifications(): Promise<Notification[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return JSON.parse(localStorage.getItem('marketplace_notifications') || '[]');
  },

  // Add notification
  async addNotification(notification: Omit<Notification, 'id' | 'timestamp'>): Promise<Notification> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const newNotification: Notification = {
      ...notification,
      id: generateId(),
      timestamp: new Date().toISOString()
    };

    const notifications = JSON.parse(localStorage.getItem('marketplace_notifications') || '[]');
    notifications.unshift(newNotification);
    localStorage.setItem('marketplace_notifications', JSON.stringify(notifications.slice(0, 50)));

    return newNotification;
  },

  // Mark notification as read
  async markNotificationRead(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const notifications = JSON.parse(localStorage.getItem('marketplace_notifications') || '[]');
    const index = notifications.findIndex((n: Notification) => n.id === id);
    
    if (index === -1) return false;

    notifications[index].read = true;
    localStorage.setItem('marketplace_notifications', JSON.stringify(notifications));
    return true;
  },

  // Get recent searches
  async getRecentSearches(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return JSON.parse(localStorage.getItem('marketplace_recent_searches') || '[]');
  },

  // Add recent search
  async addRecentSearch(query: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const searches = JSON.parse(localStorage.getItem('marketplace_recent_searches') || '[]');
    const filtered = searches.filter((s: string) => s !== query);
    const updated = [query, ...filtered].slice(0, 10);
    
    localStorage.setItem('marketplace_recent_searches', JSON.stringify(updated));
  }
};

// Hook for using the API
export function useMarketplaceApi() {
  return marketplaceApi;
}
