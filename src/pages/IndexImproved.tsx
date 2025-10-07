import React from "react";
import FixedSearchBar from "@/components/FixedSearchBar";
import VideoFeed from "@/components/video-feed";
import CategoriesSection from "@/components/categories-section";
import HeaderControls from "@/components/HeaderControls";
import HeroSection from "@/components/ui/hero-section";
import EnhancedCard from "@/components/ui/enhanced-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  Star, 
  ArrowRight, 
  Sparkles,
  ShoppingCart,
  Heart,
  Share
} from "lucide-react";

const IndexImproved = () => {
  // Mock data for featured content
  const featuredProducts = [
    {
      id: '1',
      title: 'Fresh Organic Tomatoes',
      description: 'Locally grown organic tomatoes from community gardens',
      price: 2.50,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1546470427-e26264be0d2b?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 23,
      location: 'CBD Street',
      distance: '0.2km',
      vendor: 'Mai Sarah Fresh Produce',
      category: 'Vegetables',
      inStock: true
    },
    {
      id: '2',
      title: 'Artisan Bread Loaf',
      description: 'Freshly baked bread from local bakery',
      price: 3.25,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
      rating: 4.6,
      reviews: 15,
      location: 'Avondale',
      distance: '0.5km',
      vendor: 'Bakery Corner',
      category: 'Bakery',
      inStock: true
    },
    {
      id: '3',
      title: 'Handmade Jewelry',
      description: 'Unique handmade jewelry by local artisans',
      price: 25.00,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 8,
      location: 'Borrowdale',
      distance: '0.8km',
      vendor: 'Artisan Collective',
      category: 'Jewelry',
      inStock: true
    }
  ];

  const communityStats = [
    { label: 'Active Users', value: '10K+', icon: Users, color: 'text-blue-500' },
    { label: 'Local Vendors', value: '5K+', icon: MapPin, color: 'text-green-500' },
    { label: 'Products Listed', value: '50K+', icon: ShoppingCart, color: 'text-purple-500' },
    { label: 'Community Rating', value: '4.8⭐', icon: Star, color: 'text-yellow-500' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar */}
      <FixedSearchBar />

      {/* Enhanced Hero Section */}
      <HeroSection
        title="Swumarket"
        subtitle="Your Local Community Marketplace"
        description="Connect with neighbors, discover amazing products, and support local businesses in your community."
        primaryAction={{
          label: "Start Shopping",
          onClick: () => console.log("Start shopping")
        }}
        secondaryAction={{
          label: "Become a Seller",
          onClick: () => console.log("Become a seller")
        }}
      />

      {/* Community Stats */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Featured Products</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trending in Your Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover what your neighbors are buying and selling right now
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <EnhancedCard
                key={product.id}
                variant="product"
                title={product.title}
                description={product.description}
                price={product.price}
                currency={product.currency}
                image={product.image}
                rating={product.rating}
                reviews={product.reviews}
                location={product.location}
                distance={product.distance}
                vendor={product.vendor}
                category={product.category}
                inStock={product.inStock}
                onLike={() => console.log('Like', product.id)}
                onShare={() => console.log('Share', product.id)}
                onAddToCart={() => console.log('Add to cart', product.id)}
                onViewDetails={() => console.log('View details', product.id)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find exactly what you're looking for across all categories
            </p>
          </div>
          <CategoriesSection />
        </div>
      </section>

      {/* Community Showcase */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
              <TrendingUp className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Community Showcase</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              See What's Happening
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch videos from your community members showcasing their products and services
            </p>
          </div>

          <VideoFeed />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Join Your Local Marketplace?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're looking to buy, sell, or just explore what your community has to offer, 
            Swumarket is your gateway to local commerce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-4 text-lg">
              Start Shopping Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
              Become a Seller
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexImproved;
