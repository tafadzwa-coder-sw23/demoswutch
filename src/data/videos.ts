export interface Video {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    location: string;
  };
  video: {
    url: string;
    thumbnail: string;
    duration: number;
  };
  product: {
    title: string;
    price: number;
    currency: string;
    category: string;
    description: string;
    images: string[];
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  timestamp: string;
  categoryRoute?: string; // Add category route for navigation
}

// Category mapping function
const getCategoryRoute = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    "Fashion & Accessories": "/category/service-exchange",
    "Services": "/category/service-exchange", 
    "Food & Groceries": "/category/supermarket",
    "Property": "/category/service-exchange",
    "Health & Beauty": "/category/pharmacies",
    "Hardware & Building": "/category/hardware-building",
    "Agriculture": "/category/agriculture",
    "Pet Shops": "/category/pet-shops",
    "Commodity Exchange": "/category/commodity-exchange",
    "Food & Restaurant": "/category/food-restaurant"
  };
  return categoryMap[category] || "/category/service-exchange";
};

export const mockVideos: Video[] = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "Sarah's Crafts",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      verified: true,
      location: "Harare, Zimbabwe"
    },
    video: {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=600&fit=crop",
      duration: 15
    },
    product: {
      title: "Handmade Beaded Necklaces",
      price: 25,
      currency: "USD",
      category: "Fashion & Accessories",
      description: "Beautiful handmade beaded necklaces using traditional Zimbabwean beads",
      images: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop"
      ]
    },
    stats: {
      likes: 1247,
      comments: 89,
      shares: 34,
      views: 15420
    },
    timestamp: "2h ago",
    categoryRoute: "/category/service-exchange"
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "Tech Solutions Pro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      verified: true,
      location: "Bulawayo, Zimbabwe"
    },
    video: {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=600&fit=crop",
      duration: 22
    },
    product: {
      title: "Laptop Repair Services",
      price: 50,
      currency: "USD",
      category: "Services",
      description: "Professional laptop repair and maintenance services. Fast turnaround!",
      images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop"
      ]
    },
    stats: {
      likes: 892,
      comments: 45,
      shares: 23,
      views: 8930
    },
    timestamp: "4h ago",
    categoryRoute: "/category/service-exchange"
  },
  {
    id: "3",
    user: {
      id: "user3",
      name: "Fresh Farm Produce",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      verified: false,
      location: "Mutare, Zimbabwe"
    },
    video: {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=600&fit=crop",
      duration: 18
    },
    product: {
      title: "Organic Vegetables Bundle",
      price: 15,
      currency: "USD",
      category: "Food & Groceries",
      description: "Fresh organic vegetables straight from the farm. Tomatoes, onions, cabbage included.",
      images: [
        "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=300&h=300&fit=crop"
      ]
    },
    stats: {
      likes: 567,
      comments: 32,
      shares: 18,
      views: 6780
    },
    timestamp: "6h ago",
    categoryRoute: "/category/supermarket"
  },
  {
    id: "4",
    user: {
      id: "user4",
      name: "Property Masters",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      verified: true,
      location: "Harare, Zimbabwe"
    },
    video: {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=600&fit=crop",
      duration: 30
    },
    product: {
      title: "2 Bedroom Apartment - Avondale",
      price: 800,
      currency: "USD",
      category: "Property",
      description: "Modern 2 bedroom apartment in Avondale. Fully furnished, secure parking, close to amenities.",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=300&fit=crop"
      ]
    },
    stats: {
      likes: 2341,
      comments: 156,
      shares: 78,
      views: 23450
    },
    timestamp: "8h ago",
    categoryRoute: "/category/service-exchange"
  },
  {
    id: "5",
    user: {
      id: "user5",
      name: "Creative Designs Co",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      verified: false,
      location: "Gweru, Zimbabwe"
    },
    video: {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
      duration: 25
    },
    product: {
      title: "Custom Logo Design Services",
      price: 100,
      currency: "USD",
      category: "Services",
      description: "Professional logo design and branding services. Multiple revisions included.",
      images: [
        "https://images.unsplash.com/photo-1626785774625-0b5552633046?w=300&h=300&fit=crop"
      ]
    },
    stats: {
      likes: 445,
      comments: 28,
      shares: 12,
      views: 4560
    },
    timestamp: "12h ago",
    categoryRoute: "/category/service-exchange"
  }
];

export const generateMoreVideos = (count: number): Video[] => {
  const templates = [...mockVideos];
  const newVideos: Video[] = [];

  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    newVideos.push({
      ...template,
      id: `generated_${Date.now()}_${i}`,
      timestamp: `${Math.floor(Math.random() * 24)}h ago`,
      categoryRoute: getCategoryRoute(template.product.category),
      stats: {
        likes: Math.floor(Math.random() * 3000),
        comments: Math.floor(Math.random() * 200),
        shares: Math.floor(Math.random() * 100),
        views: Math.floor(Math.random() * 30000)
      }
    });
  }

  return newVideos;
};
