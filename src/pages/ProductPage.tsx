import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Clock, Heart, Share, ShoppingCart, Phone, MessageCircle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useCart } from "@/context/CartContext";
import { useProducts, useVendors, usePopularProducts } from "@/hooks/useMarketplaceData";
import { Product } from "@/context/MarketplaceContext";

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Use the new state management hooks
  const { getProduct } = useProducts();
  const { nearbyVendors, getNearbyVendors } = useVendors();
  const { popularProducts, loadPopularProducts } = usePopularProducts();

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;
      
      setLoading(true);
      try {
        const productData = await getProduct(productId);
        setProduct(productData);
        
        if (productData) {
          // Load nearby vendors and popular products
          await getNearbyVendors();
          await loadPopularProducts(3);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId, getProduct, getNearbyVendors, loadPopularProducts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Mock nearby vendors with same/similar products (in real app, this would be fetched)
  const nearbyVendorsWithProduct = [
    {
      id: "vendor2",
      name: "Brother John BBQ & Groceries",
      location: "Borrowdale",
      distance: "0.8km",
      price: 2.30,
      rating: 4.7,
      inStock: true,
      type: "Informal Vendor"
    },
    {
      id: "vendor3", 
      name: "OK Zimbabwe",
      location: "Avondale",
      distance: "0.5km",
      price: 2.75,
      rating: 4.2,
      inStock: true,
      type: "Supermarket"
    },
    {
      id: "vendor4",
      name: "Auntie Grace Home Garden",
      location: "Avondale", 
      distance: "0.3km",
      price: 2.20,
      rating: 4.9,
      inStock: false,
      type: "Home Garden"
    }
  ];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      variant: { category: product.category, quantity: product.quantity }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar - Product Search */}
      <FixedSearchBar 
        searchContext="product"
        placeholder="Search for similar products..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <HeaderControls />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          {/* Product Details */}
          <Card className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img 
                    src={product.images[0]} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {product.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg">
                      <img 
                        src={image} 
                        alt={`${product.title} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{product.category}</Badge>
                    {product.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{product.title}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{product.rating}</span>
                      <span className="text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>

                <div className="text-4xl font-bold text-foreground">
                  {product.currency} {product.price}
                  <span className="text-lg text-muted-foreground ml-2">per {product.quantity}</span>
                </div>

                <p className="text-muted-foreground leading-relaxed">{product.description}</p>

                {/* Vendor Info */}
                <Card className="p-4 bg-muted/50">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={product.vendor.avatar} alt={product.vendor.name} />
                      <AvatarFallback>{product.vendor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{product.vendor.name}</h3>
                        {product.vendor.verified && (
                          <Badge variant="secondary" className="text-xs">✓ Verified</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {product.vendor.distance}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {product.vendor.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {product.vendor.hours}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Navigation className="h-4 w-4 mr-2" />
                      Directions
                    </Button>
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button size="lg" variant="outline">
                    <Share className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Nearby Vendors with Same Product */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Nearby Vendors with {product.title}</h2>
            <div className="space-y-4">
              {nearbyVendors.map((vendor) => (
                <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <span className="font-bold text-sm">{vendor.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{vendor.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {vendor.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {vendor.rating}
                        </span>
                        <Badge variant="outline" className="text-xs">{vendor.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{product.currency} {vendor.price}</div>
                    <Badge variant={vendor.inStock ? "default" : "destructive"} className="text-xs">
                      {vendor.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommended Products */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularProducts.map((item) => (
                <div key={item.id} className="group border rounded-lg p-4 hover:shadow-lg transition-all duration-200 cursor-pointer"
                     onClick={() => navigate(`/product/${item.id}`)}>
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={item.images[0]} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <div className="text-sm text-muted-foreground mb-2">
                    {item.vendor.name} • {item.vendor.distance}
                  </div>
                  <div className="text-xl font-bold">{product.currency} {item.price}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
