import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Calendar,
  Users,
  Home,
  Car,
  ShoppingBag,
  Wrench,
  BookOpen,
  Gamepad2,
  Music,
  Camera,
  Heart,
  Shield,
  Accessibility
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MarketplaceItem,
  Product,
  Service,
  Property,
  Job,
  Event,
  DigitalContent,
  MarketplaceCategory
} from "@/types/marketplace-updated";

// Type guards
function isProduct(item: MarketplaceItem): item is Product {
  return 'availability' in item && 'inStock' in item.availability;
}

function isService(item: MarketplaceItem): item is Service {
  return 'availability' in item && 'schedule' in item.availability;
}

function isProperty(item: MarketplaceItem): item is Property {
  return 'availability' in item && 'availableFrom' in item.availability;
}

function isJob(item: MarketplaceItem): item is Job {
  return 'jobDetails' in item;
}

function isEvent(item: MarketplaceItem): item is Event {
  return 'eventDetails' in item;
}

function isDigitalContent(item: MarketplaceItem): item is DigitalContent {
  return 'contentDetails' in item;
}

function hasPrice(item: MarketplaceItem): item is MarketplaceItem & { price: number } {
  return 'price' in item;
}

function hasRating(item: MarketplaceItem): item is MarketplaceItem & { rating?: number } {
  return 'rating' in item;
}

function hasLocation(item: MarketplaceItem): item is MarketplaceItem & { location: string } {
  return 'location' in item;
}

function hasContactInfo(item: MarketplaceItem): item is MarketplaceItem & { contactInfo: { phone?: string; email?: string } } {
  return 'contactInfo' in item;
}

function hasSellerInfo(item: MarketplaceItem): item is MarketplaceItem & { sellerAvatar: string; sellerName: string; createdAt: string } {
  return 'sellerAvatar' in item && 'sellerName' in item && 'createdAt' in item;
}

function hasReviews(item: MarketplaceItem): item is MarketplaceItem & { reviews: number } {
  return 'reviews' in item;
}

interface MarketplaceGridProps {
  items: MarketplaceItem[];
  className?: string;
  onItemClick?: (item: MarketplaceItem) => void;
  onFavoriteClick?: (item: MarketplaceItem) => void;
  onContactClick?: (item: MarketplaceItem) => void;
}

const MarketplaceGrid = ({
  items,
  className,
  onItemClick,
  onFavoriteClick,
  onContactClick
}: MarketplaceGridProps) => {
  const getItemIcon = (item: MarketplaceItem) => {
    switch (item.category) {
      case 'Electronics & Technology':
        return <Camera className="h-5 w-5" />;
      case 'Fashion & Accessories':
        return <ShoppingBag className="h-5 w-5" />;
      case 'Home & Garden':
        return <Home className="h-5 w-5" />;
      case 'Automotive':
        return <Car className="h-5 w-5" />;
      case 'Services':
        return <Wrench className="h-5 w-5" />;
      case 'Jobs & Employment':
        return <Users className="h-5 w-5" />;
      case 'Education & Training':
        return <BookOpen className="h-5 w-5" />;
      case 'Events & Entertainment':
        return <Music className="h-5 w-5" />;
      case 'Digital Content':
        return <Gamepad2 className="h-5 w-5" />;
      case 'Property':
        return <Home className="h-5 w-5" />;
      case 'Food & Groceries':
        return <ShoppingBag className="h-5 w-5" />;
      case 'Health & Beauty':
        return <Heart className="h-5 w-5" />;
      default:
        return <ShoppingBag className="h-5 w-5" />;
    }
  };

  const getAvailabilityBadge = (item: MarketplaceItem) => {
    if ('availability' in item) {
      if ('inStock' in item.availability) {
        return item.availability.inStock ? (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            In Stock
          </Badge>
        ) : (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Out of Stock
          </Badge>
        );
      } else if ('schedule' in item.availability) {
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            By Appointment
          </Badge>
        );
      } else if ('availableFrom' in item.availability) {
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Available {item.availability.availableFrom}
          </Badge>
        );
      }
    }
    return null;
  };

  const getPriceDisplay = (item: MarketplaceItem) => {
    if (hasPrice(item)) {
      return (
        <div className="text-2xl font-bold text-primary">
          ${item.price.toFixed(2)}
        </div>
      );
    }
    return null;
  };

  const getRatingDisplay = (item: MarketplaceItem) => {
    if (hasRating(item) && item.rating) {
      return (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{item.rating.toFixed(1)}</span>
          {hasReviews(item) && (
            <span className="text-sm text-muted-foreground">
              ({item.reviews} reviews)
            </span>
          )}
        </div>
      );
    }
    return null;
  };

  const getLocationDisplay = (item: MarketplaceItem) => {
    if (hasLocation(item)) {
      return (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{item.location}</span>
        </div>
      );
    }
    return null;
  };

  const getContactInfo = (item: MarketplaceItem) => {
    if (hasContactInfo(item)) {
      return (
        <div className="space-y-1">
          {item.contactInfo.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>{item.contactInfo.phone}</span>
            </div>
          )}
          {item.contactInfo.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4" />
              <span>{item.contactInfo.email}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const getEventInfo = (item: Event) => {
    return (
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          <span>{item.eventDetails.startDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          <span>{item.eventDetails.startTime} - {item.eventDetails.endTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span>{item.location}</span>
        </div>
      </div>
    );
  };

  const getJobInfo = (item: Job) => {
    return (
      <div className="space-y-1">
        <Badge variant="outline">{item.jobDetails.type}</Badge>
        <div className="text-sm text-muted-foreground">
          ${item.salary.min} - ${item.salary.max} {item.salary.period}
          {item.jobDetails.remote && " • Remote"}
        </div>
      </div>
    );
  };

  const getPropertyInfo = (item: Property) => {
    return (
      <div className="space-y-1">
        <Badge variant="outline">{item.propertyDetails.type}</Badge>
        <div className="text-sm text-muted-foreground">
          {item.propertyDetails.bedrooms && `${item.propertyDetails.bedrooms} bed • `}
          {item.propertyDetails.bathrooms && `${item.propertyDetails.bathrooms} bath • `}
          {item.propertyDetails.area} {item.propertyDetails.areaUnit}
        </div>
      </div>
    );
  };

  const getDigitalContentInfo = (item: DigitalContent) => {
    return (
      <div className="space-y-1">
        <Badge variant="outline">{item.contentDetails.type}</Badge>
        <div className="text-sm text-muted-foreground">
          {item.contentDetails.size && `${item.contentDetails.size} • `}
          {item.contentDetails.duration && `${item.contentDetails.duration}min`}
        </div>
      </div>
    );
  };

  const getAccessibilityInfo = (item: MarketplaceItem) => {
    if ('accessibility' in item && item.accessibility) {
      return (
        <div className="flex items-center gap-1">
          <Accessibility className="h-4 w-4 text-blue-600" />
          <span className="text-xs text-blue-600">Accessible</span>
        </div>
      );
    }
    return null;
  };

  const renderItemCard = (item: MarketplaceItem) => {
    return (
      <Card
        key={item.id}
        className={cn(
          "group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
          className
        )}
        onClick={() => onItemClick?.(item)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {getItemIcon(item)}
              {/* Category badge removed - categories will show in search filters */}
            </div>
            <div className="flex items-center gap-1">
              {getAccessibilityInfo(item)}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onFavoriteClick?.(item);
                }}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {item.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Price and Rating */}
          <div className="flex items-center justify-between">
            {getPriceDisplay(item)}
            {getRatingDisplay(item)}
          </div>

          {/* Location */}
          {getLocationDisplay(item)}

          {/* Item-specific information */}
          {isEvent(item) && getEventInfo(item)}
          {isJob(item) && getJobInfo(item)}
          {isProperty(item) && getPropertyInfo(item)}
          {isDigitalContent(item) && getDigitalContentInfo(item)}

          {/* Contact Information */}
          {getContactInfo(item)}

          {/* Availability Badge */}
          {getAvailabilityBadge(item)}
        </CardContent>

        <CardFooter className="pt-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={hasSellerInfo(item) ? item.sellerAvatar : ''} />
                <AvatarFallback>
                  {hasSellerInfo(item) ? item.sellerName.split(' ').map(n => n[0]).join('') : 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">
                  {hasSellerInfo(item) ? item.sellerName : 'Unknown'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {hasSellerInfo(item) ? new Date(item.createdAt).toLocaleDateString() : 'Unknown'}
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onContactClick?.(item);
              }}
            >
              Contact
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No items found</p>
          <p className="text-sm">Try adjusting your search criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(renderItemCard)}
    </div>
  );
};

export default MarketplaceGrid;
