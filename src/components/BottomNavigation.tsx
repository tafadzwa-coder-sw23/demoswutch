import React from "react";
import { Home, Map, ShoppingCart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { icon: Home, label: "Home", path: "/", active: location.pathname === "/" },
    { icon: Map, label: "Map", path: "/map", active: location.pathname === "/map" },
    { icon: ShoppingCart, label: "Cart", path: "/cart", active: location.pathname === "/cart", badge: totalItems },
    { icon: User, label: "Profile", path: "/profile", active: location.pathname === "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-2 z-50">
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={item.active ? "default" : "ghost"}
            size="sm"
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 h-12 relative"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center text-xs">
                {item.badge}
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
