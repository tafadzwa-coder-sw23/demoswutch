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
  DigitalContent
} from "@/types/marketplace";

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
      case 'Vehicles':
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
    if ('price' in item) {
      return (
        <div className="text-2xl font-bold text-primary">
          ${item.price.toFixed(2)}
        </div>
      );
    }
    return null;
  };

  const getRatingDisplay = (item: MarketplaceItem) => {
    if ('rating' in item && item.rating) {
      return (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{item.rating.toFixed(1)}</span>
          {'reviews' in item && (
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
    if ('location' in item) {
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
    if ('contactInfo' in item) {
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
          <span>{item.eventDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          <span>{item.eventTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span>{item.venue}</span>
        </div>
      </div>
    );
  };

  const getJobInfo = (item: Job) => {
    return (
      <div className="space-y-1">
        <Badge variant="outline">{item.jobType}</Badge>
        <div className="text-sm text-muted-foreground">
          {item.salary && `$${item.salary}`}
          {item.remote && " • Remote"}
        </div>
      </div>
    );
  };

  const getPropertyInfo = (item: Property) => {
    return (
      <div className="space-y-1">
        <Badge variant="outline">{item.propertyType}</Badge>
        <div className="text-sm text-muted-foreground">
          {item.bedrooms && `${item.bedrooms} bed • `}
          {item.bathrooms && `${item.bathrooms} bath • `}
          {item.squareFootage && `${item.squareFootage} sq ft`}
        </div>
      </div>
    );
  };

  const getDigitalContentInfo = (item: DigitalContent) => {
    return (
      <div className="space-y-1">
        <Badge variant="outline">{item.contentType}</Badge>
        <div className="text-sm text-muted-foreground">
          {item.fileSize && `${item.fileSize} • `}
          {item.duration && `${item.duration}`}
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
    const isProduct = 'availability' in item && 'inStock' in item.availability;
    const isService = 'availability' in item && 'schedule' in item.availability;
    const isProperty = 'availability' in item && 'availableFrom' in item.availability;
    const isJob = 'jobType' in item;
    const isEvent = 'eventDate' in item;
    const isDigitalContent = 'contentType' in item;

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
              <Badge variant="outline" className="text-xs">
                {item.category}
              </Badge>
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
          {isEvent && getEventInfo(item as Event)}
          {isJob && getJobInfo(item as Job)}
          {isProperty && getPropertyInfo(item as Property)}
          {isDigitalContent && getDigitalContentInfo(item as DigitalContent)}

          {/* Contact Information */}
          {getContactInfo(item)}

          {/* Availability Badge */}
          {getAvailabilityBadge(item)}
        </CardContent>

        <CardFooter className="pt-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={item.sellerAvatar} />
                <AvatarFallback>
                  {item.sellerName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">{item.sellerName}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString()}
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
