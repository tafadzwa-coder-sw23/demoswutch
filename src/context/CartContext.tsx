import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// Simplified cart item interface for better compatibility
export interface SimpleCartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: {
    category?: string;
    vendor?: string;
    type?: string;
    location?: string;
    size?: string;
    color?: string;
  };
}

export interface CartItem {
  id: string;  
  item: SimpleCartItem;
  quantity: number;
  variant?: {
    size?: string;
    color?: string;
    category?: string;
    vendor?: string;
    type?: string;
    location?: string;
  };
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (item: SimpleCartItem, qty?: number, variant?: any) => void;
  removeFromCart: (id: string) => void;
  clear: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('swu_cart_v1');
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('swu_cart_v1', JSON.stringify(items)); } catch {}
  }, [items]);

  const addToCart = (item: SimpleCartItem, qty: number = 1, variant?: any) => {
    setItems((prev) => {
      const existing = prev.find((c) => c.item.id === item.id && 
        JSON.stringify(c.variant) === JSON.stringify(variant));
      if (existing) {
        return prev.map((c) => c.item.id === item.id && 
          JSON.stringify(c.variant) === JSON.stringify(variant) ? 
          { ...c, quantity: c.quantity + qty } : c);
      }
      return [...prev, { id: `${item.id}-${Date.now()}`, item, quantity: qty, variant }];
    });
  };

  const removeFromCart = (id: string) => setItems((prev) => prev.filter((c) => c.id !== id));
  const clear = () => setItems([]);

  const getTotalPrice = () => items.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  const getTotalItems = () => items.reduce((total, item) => total + item.quantity, 0);

  const value = useMemo<CartContextValue>(() => ({ 
    items, 
    addToCart, 
    removeFromCart, 
    clear, 
    getTotalPrice, 
    getTotalItems 
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};


