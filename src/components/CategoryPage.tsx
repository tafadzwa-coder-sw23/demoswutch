import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MarketplaceCategory } from "@/types/marketplace-updated";
import VideoFeed from "@/components/video-feed";
import MarketplaceGrid from "@/components/marketplace-grid-final";
import { mockMarketplaceItems } from "@/data/marketplace-updated";
import HeaderControls from "@/components/HeaderControls";

interface CategoryPageProps {
  category: MarketplaceCategory;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const getColorClasses = (color: string) => {
  switch (color) {
    case "primary":
      return "text-primary bg-primary/10";
    case "secondary":
      return "text-secondary-dark bg-secondary/10";
    case "accent":
      return "text-accent bg-accent/10";
    default:
      return "text-foreground bg-muted";
  }
};

const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  title,
  description,
  icon: Icon,
  color
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>

          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${getColorClasses(color)}`}>
              <Icon className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Discover {title} Products & Services
            </h2>
            <p className="text-muted-foreground">
              Explore amazing {title.toLowerCase()} items from our community
            </p>
          </div>

          {/* Filtered marketplace items for this category */}
          <div className="mb-10">
            <MarketplaceGrid
              items={mockMarketplaceItems.filter((item) => item.category === category)}
            />
          </div>

          {/* Optional video feed demo */}
          <VideoFeed />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
