// Universal Marketplace Types

export interface User {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  rating?: number;
  reviewCount?: number;
  joinedDate: string;
  isBusiness?: boolean;
  businessInfo?: {
    name: string;
    description: string;
    hours: string;
    phone: string;
    email: string;
  };
}

export interface Media {
  type: 'video' | 'image' | 'audio';
  url: string;
  thumbnail?: string;
  duration?: number;
  description?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: MarketplaceCategory;
  subcategory?: string;
  images: string[];
  media?: Media[];
  tags: string[];
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  availability: {
    inStock: boolean;
    quantity?: number;
    deliveryAvailable: boolean;
    pickupAvailable: boolean;
  };
  condition?: 'new' | 'used' | 'refurbished';
  specifications?: Record<string, string>;
  accessibility?: {
    signLanguage?: boolean;
    audioDescription?: boolean;
    braille?: boolean;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: MarketplaceCategory;
  subcategory?: string;
  images: string[];
  media?: Media[];
  tags: string[];
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  availability: {
    schedule: string;
    emergencyAvailable: boolean;
    onlineAvailable: boolean;
  };
  qualifications?: string[];
  experience?: string;
  accessibility?: {
    signLanguage?: boolean;
    audioDescription?: boolean;
    homeVisit?: boolean;
  };
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: MarketplaceCategory;
  subcategory?: string;
  images: string[];
  media?: Media[];
  tags: string[];
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  propertyDetails: {
    type: 'apartment' | 'house' | 'commercial' | 'land';
    bedrooms?: number;
    bathrooms?: number;
    area: number;
    areaUnit: 'sqft' | 'sqm';
    furnished: boolean;
    parking: boolean;
    petsAllowed: boolean;
  };
  features: string[];
  availability: {
    availableFrom: string;
    leaseTerm?: string;
    deposit: number;
  };
}

export interface Job {
  id: string;
  title: string;
  description: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'hour' | 'day' | 'month' | 'year';
  };
  category: MarketplaceCategory;
  subcategory?: string;
  images: string[];
  tags: string[];
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  jobDetails: {
    type: 'full-time' | 'part-time' | 'contract' | 'internship';
    remote: boolean;
    experience: string;
    education: string;
    skills: string[];
  };
  company: {
    name: string;
    logo?: string;
    description: string;
  };
  applicationDeadline?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: MarketplaceCategory;
  subcategory?: string;
  images: string[];
  media?: Media[];
  tags: string[];
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  eventDetails: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    capacity: number;
    attendees: number;
    ageRestriction?: string;
    dressCode?: string;
  };
  organizer: {
    name: string;
    verified: boolean;
    contact: string;
  };
}

export interface DigitalContent {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: MarketplaceCategory;
  subcategory?: string;
  images: string[];
  media?: Media[];
  tags: string[];
  contentDetails: {
    type: 'ebook' | 'course' | 'music' | 'video' | 'software' | 'template';
    format: string;
    size?: string;
    duration?: number;
    accessType: 'download' | 'streaming' | 'subscription';
  };
  creator: {
    name: string;
    verified: boolean;
    portfolio?: string;
  };
  ratings: {
    average: number;
    count: number;
  };
}

export type MarketplaceItem =
  | Product
  | Service
  | Property
  | Job
  | Event
  | DigitalContent;

export type MarketplaceCategory =
  | 'Fashion & Accessories'
  | 'Services'
  | 'Food & Groceries'
  | 'Property'
  | 'Jobs & Employment'
  | 'Events & Entertainment'
  | 'Digital Content'
  | 'Electronics & Technology'
  | 'Home & Garden'
  | 'Health & Beauty'
  | 'Sports & Recreation'
  | 'Education & Training'
  | 'Automotive'
  | 'Business & Industrial'
  | 'Other';

export interface SearchFilters {
  query?: string;
  category?: MarketplaceCategory;
  subcategory?: string;
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  availability?: {
    inStock?: boolean;
    delivery?: boolean;
    pickup?: boolean;
  };
  distance?: number; // in kilometers
  sortBy?: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'distance' | 'newest';
  accessibility?: {
    signLanguage?: boolean;
    audioDescription?: boolean;
  };
}

export interface SearchResult {
  items: MarketplaceItem[];
  totalCount: number;
  hasMore: boolean;
  filters: SearchFilters;
  suggestions?: string[];
  relatedCategories?: MarketplaceCategory[];
}

export interface UserStats {
  likes: number;
  comments: number;
  shares: number;
  views: number;
  purchases?: number;
  sales?: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  timestamp: string;
  verified: boolean;
  helpful: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  points: number;
}

export interface UserProfile {
  user: User;
  stats: UserStats;
  reviews: Review[];
  achievements: Achievement[];
  preferences: {
    categories: MarketplaceCategory[];
    locations: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
}
