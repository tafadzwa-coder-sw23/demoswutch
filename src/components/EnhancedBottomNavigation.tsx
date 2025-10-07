import React, { useState } from "react";
import { Home, Search, ShoppingCart, User, Menu, MapPin, Bell, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

const EnhancedBottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = getTotalItems();

  const navItems = [
    { icon: Home, label: "Home", path: "/", active: location.pathname === "/" },
    { icon: Search, label: "Search", path: "/search", active: location.pathname.includes("/search") },
    { icon: ShoppingCart, label: "Cart", path: "/cart", active: location.pathname === "/cart", badge: totalItems },
    { icon: User, label: "Profile", path: "/profile", active: location.pathname === "/profile" },
  ];

  const quickActions = [
    { icon: MapPin, label: "Nearby", path: "/map" },
    { icon: Bell, label: "Alerts", path: "/notifications" },
    { icon: Heart, label: "Favorites", path: "/favorites" },
  ];

  return (
    <>
      {/* Main Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                  item.active ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => navigate(item.path)}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {item.badge && item.badge > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                      variant="destructive"
                    >
                      {item.badge > 99 ? '99+' : item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
          
          {/* Quick Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs">More</span>
          </Button>
        </div>
      </div>

      {/* Quick Actions Menu */}
      {isMenuOpen && (
        <div className="fixed bottom-16 left-0 right-0 bg-background border-t border-border shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.path}
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-2 h-auto py-3"
                    onClick={() => {
                      navigate(action.path);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default EnhancedBottomNavigation;
