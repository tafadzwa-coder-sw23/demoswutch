import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftRight,
  Store,
  Camera,
  Hammer,
  Pill,
  Wheat,
  Heart,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MarketplaceCategory } from "@/types/marketplace-updated";
import { useSearchContext } from "@/context/SearchContext";

interface Category {
  icon: React.ComponentType<any>;
  title: string;
  category: MarketplaceCategory;
  color: string;
  route: string;
}

const categories: Category[] = [
  {
    icon: ArrowLeftRight,
    title: "Commodity Exchange",
    category: "Other",
    color: "secondary",
    route: "/category/commodity-exchange"
  },
  {
    icon: Store,
    title: "Supermarket",
    category: "Food & Groceries",
    color: "accent",
    route: "/category/supermarket"
  },
  {
    icon: Camera,
    title: "Food & Restaurant",
    category: "Food & Groceries",
    color: "primary",
    route: "/category/food-restaurant"
  },
  {
    icon: Hammer,
    title: "Hardware & Building",
    category: "Other",
    color: "secondary",
    route: "/category/hardware-building"
  },
  {
    icon: Pill,
    title: "Pharmacies",
    category: "Health & Beauty",
    color: "accent",
    route: "/category/pharmacies"
  },
  {
    icon: Wheat,
    title: "Agriculture",
    category: "Other",
    color: "primary",
    route: "/category/agriculture"
  },
  {
    icon: Heart,
    title: "Pet Shops",
    category: "Other",
    color: "secondary",
    route: "/category/pet-shops"
  },
  {
    icon: Users,
    title: "Service Exchange",
    category: "Other",
    color: "accent",
    route: "/category/service-exchange"
  }
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "primary":
      return "text-primary hover:bg-primary/10";
    case "secondary":
      return "text-secondary-dark hover:bg-secondary/10";
    case "accent":
      return "text-accent hover:bg-accent/10";
    default:
      return "text-foreground hover:bg-muted";
  }
};

const CategoriesSection = () => {
  const navigate = useNavigate();
  const { clearSearch } = useSearchContext();

  const handleCategoryClick = (route: string) => {
    // Clear any existing search when clicking category icons
    // This ensures we show general category content, not search results
    clearSearch();
    navigate(route);
  };

  return (
    <div className="border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.route)}
              className={`flex flex-col items-center space-y-1 min-w-[70px] py-2 px-3 rounded-lg transition-colors duration-200 ${getColorClasses(category.color)}`}                                                                            
            >
              <category.icon className="h-6 w-6" />
              <span className="text-xs text-center font-medium whitespace-nowrap">                                                                              
                {category.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;