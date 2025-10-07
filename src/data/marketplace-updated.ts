import {
  MarketplaceItem,
  MarketplaceCategory,
  Product,
  Service,
  Property,
  Job,
  Event,
  DigitalContent,
  User
} from '@/types/marketplace-updated';

// Enhanced user data with business information
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Sarah's Crafts",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    verified: true,
    location: "Harare, Zimbabwe",
    coordinates: { lat: -17.8292, lng: 31.0522 },
    rating: 4.8,
    reviewCount: 127,
    joinedDate: "2023-01-15",
    isBusiness: true,
    businessInfo: {
      name: "Sarah's Crafts & Designs",
      description: "Handmade crafts and traditional Zimbabwean products",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      phone: "+263 77 123 4567",
      email: "sarah@crafts.co.zw"
    }
  },
  {
    id: "user2",
    name: "Tech Solutions Pro",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    verified: true,
    location: "Bulawayo, Zimbabwe",
    coordinates: { lat: -20.1325, lng: 28.6265 },
    rating: 4.9,
    reviewCount: 89,
    joinedDate: "2023-02-20",
    isBusiness: true,
    businessInfo: {
      name: "Tech Solutions Zimbabwe",
      description: "Professional IT services and repairs",
      hours: "Mon-Fri: 8AM-5PM, Emergency: 24/7",
      phone: "+263 77 234 5678",
      email: "info@techsolutions.co.zw"
    }
  },
  {
    id: "user3",
    name: "Fresh Farm Produce",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    verified: false,
    location: "Mutare, Zimbabwe",
    coordinates: { lat: -18.9750, lng: 32.6500 },
    rating: 4.6,
    reviewCount: 45,
    joinedDate: "2023-03-10",
    isBusiness: true,
    businessInfo: {
      name: "Fresh Farm Mutare",
      description: "Organic vegetables and fresh produce",
      hours: "Daily: 6AM-6PM",
      phone: "+263 77 345 6789",
      email: "freshfarm@mutare.co.zw"
    }
  },
  {
    id: "user4",
    name: "Property Masters",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    verified: true,
    location: "Harare, Zimbabwe",
    coordinates: { lat: -17.8292, lng: 31.0522 },
    rating: 4.7,
    reviewCount: 203,
    joinedDate: "2022-11-05",
    isBusiness: true,
    businessInfo: {
      name: "Property Masters Zimbabwe",
      description: "Real estate sales and rentals",
      hours: "Mon-Fri: 8AM-5PM, Sat: 9AM-2PM",
      phone: "+263 77 456 7890",
      email: "info@propertymasters.co.zw"
    }
  },
  {
    id: "user5",
    name: "Creative Designs Co",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    verified: false,
    location: "Gweru, Zimbabwe",
    coordinates: { lat: -19.4500, lng: 29.8167 },
    rating: 4.5,
    reviewCount: 67,
    joinedDate: "2023-04-12",
    isBusiness: true,
    businessInfo: {
      name: "Creative Designs Co",
      description: "Graphic design and branding services",
      hours: "Mon-Fri: 9AM-5PM",
      phone: "+263 77 567 8901",
      email: "hello@creativedesigns.co.zw"
    }
  }
];

// Products data
export const mockProducts: Product[] = [
  {
    id: "prod1",
    title: "Handmade Beaded Necklaces",
    description: "Beautiful handmade beaded necklaces using traditional Zimbabwean beads. Each piece is unique and crafted with care.",
    price: 25,
    currency: "USD",
    category: "Fashion & Accessories",
    subcategory: "Jewelry",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop"
    ],
    tags: ["handmade", "traditional", "zimbabwean", "beads", "necklace"],
    location: "Harare, Zimbabwe",
    coordinates: { lat: -17.8292, lng: 31.0522 },
    availability: {
      inStock: true,
      quantity: 15,
      deliveryAvailable: true,
      pickupAvailable: true
    },
    condition: "new",
    specifications: {
      "Material": "Traditional Zimbabwean beads",
      "Length": "45cm",
      "Weight": "25g"
    },
    accessibility: {
      signLanguage: false,
      audioDescription: false,
      braille: false
    },
    sellerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    sellerName: "Sarah's Crafts",
    createdAt: "2024-01-15T10:00:00Z",
    rating: 4.8,
    reviews: 127
  },
  {
    id: "prod2",
    title: "Organic Vegetable Bundle",
    description: "Fresh organic vegetables straight from the farm. Includes tomatoes, onions, cabbage, and seasonal greens.",
    price: 15,
    currency: "USD",
    category: "Food & Groceries",
    subcategory: "Fresh Produce",
    images: [
      "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop"
    ],
    tags: ["organic", "fresh", "vegetables", "farm", "healthy"],
    location: "Mutare, Zimbabwe",
    coordinates: { lat: -18.9750, lng: 32.6500 },
    availability: {
      inStock: true,
      quantity: 50,
      deliveryAvailable: true,
      pickupAvailable: true
    },
    condition: "new",
    specifications: {
      "Weight": "5kg",
      "Items": "Tomatoes, Onions, Cabbage, Greens",
      "Organic": "Yes"
    },
    accessibility: {
      signLanguage: false,
      audioDescription: false,
      braille: false
    },
    sellerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    sellerName: "Fresh Farm Produce",
    createdAt: "2024-01-20T08:30:00Z",
    rating: 4.6,
    reviews: 45
  }
];

// Services data
export const mockServices: Service[] = [
  {
    id: "serv1",
    title: "Laptop Repair Services",
    description: "Professional laptop repair and maintenance services. Fast turnaround, quality parts, and warranty included.",
    price: 50,
    currency: "USD",
    category: "Services",
    subcategory: "Technology",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop"
    ],
    tags: ["laptop", "repair", "technology", "maintenance", "fast"],
    location: "Bulawayo, Zimbabwe",
    coordinates: { lat: -20.1325, lng: 28.6265 },
    availability: {
      schedule: "Mon-Fri: 8AM-5PM",
      emergencyAvailable: true,
      onlineAvailable: true
    },
    qualifications: ["Certified IT Technician", "5+ years experience"],
    experience: "5 years in IT repair services",
    accessibility: {
      signLanguage: false,
      audioDescription: false,
      homeVisit: true
    },
    sellerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    sellerName: "Tech Solutions Pro",
    createdAt: "2024-01-18T14:20:00Z",
    rating: 4.9,
    reviews: 89
  },
  {
    id: "serv2",
    title: "Custom Logo Design Services",
    description: "Professional logo design and branding services. Multiple revisions included. Perfect for businesses and startups.",
    price: 100,
    currency: "USD",
    category: "Services",
    subcategory: "Design",
    images: [
      "https://images.unsplash.com/photo-1626785774625-0b5552633046?w=300&h=300&fit=crop"
    ],
    tags: ["logo", "design", "branding", "professional", "custom"],
    location: "Gweru, Zimbabwe",
    coordinates: { lat: -19.4500, lng: 29.8167 },
    availability: {
      schedule: "Mon-Fri: 9AM-5PM",
      emergencyAvailable: false,
      onlineAvailable: true
    },
    qualifications: ["Graphic Design Degree", "Adobe Certified"],
    experience: "8 years in graphic design",
    accessibility: {
      signLanguage: false,
      audioDescription: false,
      homeVisit: false
    },
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    sellerName: "Creative Designs Co",
    createdAt: "2024-01-22T11:15:00Z",
    rating: 4.5,
    reviews: 67
  }
];

// Properties data
export const mockProperties: Property[] = [
  {
    id: "prop1",
    title: "2 Bedroom Apartment - Avondale",
    description: "Modern 2 bedroom apartment in Avondale. Fully furnished, secure parking, close to amenities. Perfect for professionals.",
    price: 800,
    currency: "USD",
    category: "Property",
    subcategory: "Apartments",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=300&fit=crop"
    ],
    tags: ["apartment", "furnished", "secure", "parking", "avondale"],
    location: "Harare, Zimbabwe",
    coordinates: { lat: -17.8292, lng: 31.0522 },
    propertyDetails: {
      type: "apartment",
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      areaUnit: "sqm",
      furnished: true,
      parking: true,
      petsAllowed: false
    },
    features: ["Security System", "Gym Access", "Swimming Pool", "Backup Generator"],
    availability: {
      availableFrom: "2024-02-01",
      leaseTerm: "12 months",
      deposit: 800
    },
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    sellerName: "Property Masters",
    createdAt: "2024-01-10T09:45:00Z",
    rating: 4.7,
    reviews: 203
  }
];

// Jobs data
export const mockJobs: Job[] = [
  {
    id: "job1",
    title: "Senior Software Developer",
    description: "Join our dynamic team as a Senior Software Developer. Work on exciting projects using modern technologies.",
    salary: {
      min: 2000,
      max: 3500,
      currency: "USD",
      period: "month"
    },
    category: "Jobs & Employment",
    subcategory: "Technology",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=300&fit=crop"
    ],
    tags: ["software", "developer", "senior", "remote", "technology"],
    location: "Harare, Zimbabwe",
    coordinates: { lat: -17.8292, lng: 31.0522 },
    jobDetails: {
      type: "full-time",
      remote: true,
      experience: "5+ years",
      education: "Bachelor's Degree in Computer Science",
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"]
    },
    company: {
      name: "TechCorp Zimbabwe",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      description: "Leading technology company in Zimbabwe"
    },
    applicationDeadline: "2024-02-15",
    sellerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    sellerName: "Tech Solutions Pro",
    createdAt: "2024-01-25T16:30:00Z",
    rating: 4.9,
    reviews: 156
  }
];

// Events data
export const mockEvents: Event[] = [
  {
    id: "event1",
    title: "Zimbabwe Tech Conference 2024",
    description: "Annual technology conference featuring local and international speakers, workshops, and networking opportunities.",
    price: 50,
    currency: "USD",
    category: "Events & Entertainment",
    subcategory: "Conferences",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=300&fit=crop"
    ],
    tags: ["technology", "conference", "networking", "workshops", "innovation"],
    location: "Harare International Conference Centre",
    coordinates: { lat: -17.8292, lng: 31.0522 },
    eventDetails: {
      startDate: "2024-03-15",
      endDate: "2024-03-16",
      startTime: "09:00",
      endTime: "17:00",
      capacity: 500,
      attendees: 347,
      ageRestriction: "18+",
      dressCode: "Business Casual"
    },
    organizer: {
      name: "Zimbabwe Tech Association",
      verified: true,
      contact: "info@zimtech.org"
    },
    sellerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    sellerName: "Tech Solutions Pro",
    createdAt: "2024-01-12T12:00:00Z",
    rating: 4.8,
    reviews: 234
  }
];

// Digital Content data
export const mockDigitalContent: DigitalContent[] = [
  {
    id: "digital1",
    title: "Zimbabwe Business Startup Guide",
    description: "Comprehensive guide to starting and running a business in Zimbabwe. Includes legal requirements, market analysis, and practical tips.",
    price: 29.99,
    currency: "USD",
    category: "Digital Content",
    subcategory: "E-books",
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop"
    ],
    tags: ["business", "startup", "guide", "zimbabwe", "entrepreneurship"],
    location: "Harare, Zimbabwe",
    coordinates: { lat: -17.8292, lng: 31.0522 },
    contentDetails: {
      type: "ebook",
      format: "PDF",
      size: "2.5MB",
      accessType: "download"
    },
    creator: {
      name: "Business Expert Zimbabwe",
      verified: true,
      portfolio: "https://businessexpert.co.zw"
    },
    ratings: {
      average: 4.7,
      count: 89
    },
    accessibility: {
      signLanguage: false,
      audioDescription: false,
      braille: false
    },
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    sellerName: "Creative Designs Co",
    createdAt: "2024-01-08T10:30:00Z",
    rating: 4.7,
    reviews: 89
  }
];

// Combined marketplace data
export const mockMarketplaceItems: MarketplaceItem[] = [
  ...mockProducts,
  ...mockServices,
  ...mockProperties,
  ...mockJobs,
  ...mockEvents,
  ...mockDigitalContent
];

// Categories with subcategories
export const marketplaceCategories: Record<MarketplaceCategory, string[]> = {
  "Fashion & Accessories": ["Clothing", "Shoes", "Jewelry", "Bags", "Accessories"],
  "Services": ["Technology", "Design", "Cleaning", "Repair", "Consulting", "Health", "Education"],
  "Food & Groceries": ["Fresh Produce", "Packaged Food", "Beverages", "Restaurants", "Catering"],
  "Property": ["Apartments", "Houses", "Commercial", "Land", "Rooms"],
  "Jobs & Employment": ["Technology", "Healthcare", "Education", "Finance", "Sales", "Marketing"],
  "Events & Entertainment": ["Conferences", "Workshops", "Concerts", "Sports", "Cultural"],
  "Digital Content": ["E-books", "Courses", "Music", "Videos", "Software", "Templates"],
  "Electronics & Technology": ["Computers", "Phones", "Accessories", "Software", "Services"],
  "Home & Garden": ["Furniture", "Decor", "Appliances", "Tools", "Plants"],
  "Health & Beauty": ["Skincare", "Makeup", "Haircare", "Wellness", "Fitness"],
  "Sports & Recreation": ["Equipment", "Clothing", "Classes", "Events", "Facilities"],
  "Education & Training": ["Courses", "Tutoring", "Workshops", "Certifications"],
  "Automotive": ["Cars", "Parts", "Services", "Accessories"],
  "Business & Industrial": ["Equipment", "Supplies", "Services", "Software"],
  "Other": []
};

// Location data for Zimbabwe cities
export const zimbabweLocations = [
  "Harare",
  "Bulawayo",
  "Mutare",
  "Gweru",
  "Masvingo",
  "Chitungwiza",
  "Kwekwe",
  "Kadoma",
  "Chinhoyi",
  "Marondera"
];

export const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  "Harare": { lat: -17.8292, lng: 31.0522 },
  "Bulawayo": { lat: -20.1325, lng: 28.6265 },
  "Mutare": { lat: -18.9750, lng: 32.6500 },
  "Gweru": { lat: -19.4500, lng: 29.8167 },
  "Masvingo": { lat: -20.0667, lng: 30.8333 },
  "Chitungwiza": { lat: -18.0167, lng: 31.0833 },
  "Kwekwe": { lat: -18.9167, lng: 29.8167 },
  "Kadoma": { lat: -18.3333, lng: 29.9167 },
  "Chinhoyi": { lat: -17.3667, lng: 30.2000 },
  "Marondera": { lat: -18.1833, lng: 31.5500 }
};
