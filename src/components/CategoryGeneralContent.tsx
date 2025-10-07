import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Heart, 
  ShoppingCart, 
  Play,
  Eye,
  ThumbsUp,
  TrendingUp,
  Users,
  Award,
  Zap
} from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Seller {
  id: string;
  name: string;
  type: "formal" | "informal" | "individual";
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  image: string;
  specialties: string[];
  isOpen: boolean;
  hours: string;
  phone: string;
  verified: boolean;
  featured: boolean;
}

interface VideoCard {
  id: string;
  title: string;
  seller: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  price: number;
  category: string;
  isLive?: boolean;
}

interface CategoryGeneralContentProps {
  categoryName: string;
  categoryType: "supermarket" | "commodity" | "restaurant" | "hardware" | "pharmacy" | "agriculture" | "pets" | "services";
}

const CategoryGeneralContent = ({ categoryName, categoryType }: CategoryGeneralContentProps) => {
  const [activeTab, setActiveTab] = useState("sellers");
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const { addToCart } = useCart();

  const handleLike = (id: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getSellersData = (): Seller[] => {
    switch (categoryType) {
      case "supermarket":
        return [
          {
            id: "s1",
            name: "Mai Sarah Fresh Produce",
            type: "informal",
            location: "CBD Street Market",
            distance: "0.2km",
            rating: 4.8,
            reviews: 234,
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
            specialties: ["Fresh Vegetables", "Fruits", "Local Produce"],
            isOpen: true,
            hours: "6AM-6PM",
            phone: "+263 77 123 4567",
            verified: true,
            featured: true
          },
          {
            id: "s2",
            name: "OK Zimbabwe Avondale",
            type: "formal",
            location: "Avondale Shopping Center",
            distance: "0.5km",
            rating: 4.2,
            reviews: 1567,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
            specialties: ["Groceries", "Household Items", "Frozen Foods"],
            isOpen: true,
            hours: "7AM-9PM",
            phone: "+263 77 234 5678",
            verified: true,
            featured: false
          },
          {
            id: "s3",
            name: "Brother John BBQ & Groceries",
            type: "individual",
            location: "Borrowdale Residential",
            distance: "0.8km",
            rating: 4.7,
            reviews: 89,
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop",
            specialties: ["BBQ Meat", "Spices", "Local Groceries"],
            isOpen: true,
            hours: "5AM-8PM",
            phone: "+263 77 345 6789",
            verified: true,
            featured: true
          },
          {
            id: "s4",
            name: "Auntie Grace Home Garden",
            type: "individual",
            location: "Avondale Residential",
            distance: "0.3km",
            rating: 4.9,
            reviews: 156,
            image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
            specialties: ["Organic Vegetables", "Herbs", "Home Grown"],
            isOpen: true,
            hours: "7AM-5PM",
            phone: "+263 77 456 7890",
            verified: true,
            featured: true
          }
        ];
      case "commodity":
        return [
          {
            id: "c1",
            name: "Zimbabwe Grain Exchange",
            type: "formal",
            location: "Industrial Area",
            distance: "2.1km",
            rating: 4.6,
            reviews: 45,
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop",
            specialties: ["Wheat", "Maize", "Soybeans"],
            isOpen: true,
            hours: "8AM-5PM",
            phone: "+263 77 567 8901",
            verified: true,
            featured: true
          },
          {
            id: "c2",
            name: "Farmers Cooperative Union",
            type: "formal",
            location: "Msasa",
            distance: "3.5km",
            rating: 4.4,
            reviews: 78,
            image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=200&fit=crop",
            specialties: ["Bulk Grains", "Seeds", "Fertilizers"],
            isOpen: true,
            hours: "7AM-6PM",
            phone: "+263 77 678 9012",
            verified: true,
            featured: false
          }
        ];
      case "restaurant":
        return [
          {
            id: "r1",
            name: "Mama Tina's Kitchen",
            type: "informal",
            location: "Mbare Market",
            distance: "1.2km",
            rating: 4.7,
            reviews: 312,
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop",
            specialties: ["Sadza", "Traditional Food", "Local Cuisine"],
            isOpen: true,
            hours: "11AM-9PM",
            phone: "+263 77 789 0123",
            verified: true,
            featured: true
          },
          {
            id: "r2",
            name: "The Smokehouse Grill",
            type: "formal",
            location: "Borrowdale Village",
            distance: "2.8km",
            rating: 4.5,
            reviews: 567,
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop",
            specialties: ["Grilled Meat", "Burgers", "International"],
            isOpen: true,
            hours: "12PM-11PM",
            phone: "+263 77 890 1234",
            verified: true,
            featured: true
          }
        ];
      default:
        return [
          {
            id: "d1",
            name: `${categoryName} Specialist`,
            type: "formal",
            location: "City Center",
            distance: "1.0km",
            rating: 4.3,
            reviews: 123,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
            specialties: ["Quality Products", "Expert Service", "Competitive Prices"],
            isOpen: true,
            hours: "8AM-6PM",
            phone: "+263 77 901 2345",
            verified: true,
            featured: false
          }
        ];
    }
  };

  const getVideoCardsData = (): VideoCard[] => {
    switch (categoryType) {
      case "supermarket":
        return [
          {
            id: "v1",
            title: "Fresh Tomatoes from Mai Sarah",
            seller: "Mai Sarah Fresh Produce",
            thumbnail: "https://images.unsplash.com/photo-1546470427-e26264be0d2b?w=300&h=200&fit=crop",
            duration: "0:45",
            views: 1247,
            likes: 89,
            price: 2.50,
            category: "Vegetables"
          },
          {
            id: "v2",
            title: "Organic Vegetables Collection",
            seller: "Auntie Grace Home Garden",
            thumbnail: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=200&fit=crop",
            duration: "1:23",
            views: 892,
            likes: 156,
            price: 15.00,
            category: "Organic",
            isLive: true
          },
          {
            id: "v3",
            title: "BBQ Meat Special Cuts",
            seller: "Brother John BBQ & Groceries",
            thumbnail: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&h=200&fit=crop",
            duration: "2:15",
            views: 567,
            likes: 78,
            price: 12.50,
            category: "Meat"
          }
        ];
      case "commodity":
        return [
          {
            id: "vc1",
            title: "Premium Wheat Harvest 2024",
            seller: "Zimbabwe Grain Exchange",
            thumbnail: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop",
            duration: "3:45",
            views: 234,
            likes: 45,
            price: 320.00,
            category: "Grains"
          },
          {
            id: "vc2",
            title: "Maize Trading Live Session",
            seller: "Farmers Cooperative Union",
            thumbnail: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=200&fit=crop",
            duration: "Live",
            views: 156,
            likes: 23,
            price: 280.00,
            category: "Commodities",
            isLive: true
          }
        ];
      case "restaurant":
        return [
          {
            id: "vr1",
            title: "Traditional Sadza Cooking",
            seller: "Mama Tina's Kitchen",
            thumbnail: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop",
            duration: "4:30",
            views: 2341,
            likes: 312,
            price: 8.50,
            category: "Traditional"
          },
          {
            id: "vr2",
            title: "Grilled Meat Masterclass",
            seller: "The Smokehouse Grill",
            thumbnail: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&h=200&fit=crop",
            duration: "6:15",
            views: 1567,
            likes: 234,
            price: 25.00,
            category: "Grilled"
          }
        ];
      default:
        return [];
    }
  };

  const sellers = getSellersData();
  const videoCards = getVideoCardsData();
  const featuredSellers = sellers.filter(seller => seller.featured);

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.title || item.name,
      price: item.price || 0,
      image: item.thumbnail || item.image,
      quantity: 1,
      variant: { seller: item.seller || item.name }
    });
  };

  return (
    <div className="space-y-8">
      {/* Featured Sellers */}
      {featuredSellers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Featured {categoryName} Sellers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSellers.map((seller) => (
                <Card key={seller.id} className="group hover:shadow-lg transition-all">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={seller.image}
                      alt={seller.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{seller.name}</h3>
                      {seller.verified && (
                        <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>
                      )}
                      <Badge variant="outline" className="text-xs capitalize">
                        {seller.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{seller.rating}</span>
                        <span>({seller.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{seller.distance}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {seller.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        <span className={seller.isOpen ? "text-green-600" : "text-red-600"}>
                          {seller.isOpen ? "Open" : "Closed"}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm">Visit Store</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sellers">All Sellers</TabsTrigger>
          <TabsTrigger value="videos">Video Showcase</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        {/* All Sellers */}
        <TabsContent value="sellers">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sellers.map((seller) => (
              <Card key={seller.id} className="hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={seller.image}
                      alt={seller.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{seller.name}</h3>
                        {seller.verified && (
                          <Badge className="bg-green-100 text-green-800 text-xs">✓</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{seller.rating} ({seller.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{seller.distance}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{seller.location}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {seller.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${seller.isOpen ? "text-green-600" : "text-red-600"}`}>
                          {seller.isOpen ? `Open • ${seller.hours}` : `Closed • ${seller.hours}`}
                        </span>
                        <Button size="sm">View Products</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Video Showcase */}
        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoCards.map((video) => (
              <Card key={video.id} className="group hover:shadow-lg transition-all cursor-pointer">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.isLive ? (
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        LIVE
                      </span>
                    ) : (
                      video.duration
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{video.seller}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{video.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{video.likes}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold">${video.price.toFixed(2)}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {video.category}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLike(video.id)}
                      >
                        <Heart className={`h-3 w-3 ${likedItems.has(video.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      <Button size="sm" onClick={() => handleAddToCart(video)}>
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Trending */}
        <TabsContent value="trending">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending in {categoryName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">15+</div>
                    <div className="text-sm text-muted-foreground">Active Sellers</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">25%</div>
                    <div className="text-sm text-muted-foreground">Avg. Savings</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2.3km</div>
                    <div className="text-sm text-muted-foreground">Avg. Distance</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">4.7★</div>
                    <div className="text-sm text-muted-foreground">Avg. Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Popular This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {videoCards.slice(0, 3).map((video, index) => (
                    <div key={video.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{video.title}</h4>
                        <p className="text-sm text-muted-foreground">{video.seller}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          <span>{video.views.toLocaleString()} views</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${video.price.toFixed(2)}</div>
                        <Button size="sm" onClick={() => handleAddToCart(video)}>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CategoryGeneralContent;
