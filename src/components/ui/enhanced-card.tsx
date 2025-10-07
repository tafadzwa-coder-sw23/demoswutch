import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Heart, Share, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedCardProps {
  title: string;
  description?: string;
  price?: number;
  currency?: string;
  image: string;
  rating?: number;
  reviews?: number;
  location?: string;
  distance?: string;
  vendor?: string;
  category?: string;
  inStock?: boolean;
  isLiked?: boolean;
  onLike?: () => void;
  onShare?: () => void;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
  variant?: 'product' | 'vendor' | 'category' | 'feature';
  className?: string;
}

const EnhancedCard = ({
  title,
  description,
  price,
  currency = 'USD',
  image,
  rating,
  reviews,
  location,
  distance,
  vendor,
  category,
  inStock = true,
  isLiked = false,
  onLike,
  onShare,
  onAddToCart,
  onViewDetails,
  variant = 'product',
  className
}: EnhancedCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'product':
        return 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300';
      case 'vendor':
        return 'hover:shadow-lg hover:scale-105 transition-all duration-300';
      case 'category':
        return 'hover:shadow-2xl hover:-translate-y-2 transition-all duration-500';
      case 'feature':
        return 'hover:shadow-lg hover:scale-102 transition-all duration-300';
      default:
        return 'hover:shadow-lg transition-all duration-300';
    }
  };

  return (
    <Card className={cn(
      'group relative overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-gray-50/50',
      getVariantStyles(),
      className
    )}>
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action buttons overlay */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {onLike && (
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white"
              onClick={onLike}
            >
              <Heart className={cn(
                "h-4 w-4",
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              )} />
            </Button>
          )}
          {onShare && (
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white"
              onClick={onShare}
            >
              <Share className="h-4 w-4 text-gray-600" />
            </Button>
          )}
        </div>

        {/* Category badge */}
        {category && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3 bg-white/90 text-gray-800 hover:bg-white"
          >
            {category}
          </Badge>
        )}

        {/* Stock status */}
        {variant === 'product' && (
          <div className="absolute bottom-3 left-3">
            <Badge 
              variant={inStock ? "default" : "destructive"}
              className="bg-white/90 text-gray-800"
            >
              {inStock ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardHeader className="pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-2">
        <div className="space-y-3">
          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{rating}</span>
                {reviews && (
                  <span className="text-xs text-muted-foreground">
                    ({reviews} reviews)
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Location info */}
          {(location || distance) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="truncate">
                {location && distance ? `${location} • ${distance}` : location || distance}
              </span>
            </div>
          )}

          {/* Vendor info */}
          {vendor && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">by {vendor}</span>
            </div>
          )}

          {/* Price */}
          {price && (
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-primary">
                {currency} {price.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {/* Footer Actions */}
      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          {onViewDetails && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={onViewDetails}
            >
              View Details
            </Button>
          )}
          {onAddToCart && variant === 'product' && (
            <Button
              className="flex-1"
              onClick={onAddToCart}
              disabled={!inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EnhancedCard;
