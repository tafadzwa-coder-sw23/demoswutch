import React, { useState } from "react";
import { User, Settings, BarChart3, Bell, Shield, HelpCircle, LogOut, ShoppingCart, Store, Plus, TrendingUp, MessageCircle, Package, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  // Mock data for buyer and seller activities
  const buyerStats = {
    totalOrders: 24,
    totalSpent: 1250,
    favoriteCategories: ['Groceries', 'Electronics', 'Clothing'],
    recentOrders: [
      { id: '1', item: 'Fresh Vegetables', seller: 'Mai Sarah', amount: 15.50, date: '2 days ago', status: 'Delivered' },
      { id: '2', item: 'Phone Case', seller: 'Tech Store', amount: 25.00, date: '1 week ago', status: 'Delivered' },
      { id: '3', item: 'T-Shirt', seller: 'Fashion Hub', amount: 18.75, date: '2 weeks ago', status: 'Delivered' },
    ]
  };

  const sellerStats = {
    totalSales: 15,
    totalEarnings: 850,
    activeListings: 8,
    rating: 4.8,
    recentSales: [
      { id: '1', item: 'Handmade Jewelry', buyer: 'Jane M.', amount: 45.00, date: '1 day ago', status: 'Completed' },
      { id: '2', item: 'Vintage Books', buyer: 'John S.', amount: 12.50, date: '3 days ago', status: 'Completed' },
      { id: '3', item: 'Art Supplies', buyer: 'Mary K.', amount: 28.00, date: '1 week ago', status: 'Completed' },
    ]
  };

  const profileOptions = [
    { icon: Settings, label: "Settings", path: "/settings", description: "Manage your preferences" },
    { icon: Bell, label: "Notifications", path: "/notifications", description: "Manage your alerts" },
    { icon: Shield, label: "Privacy & Security", path: "/privacy", description: "Account security settings" },
    { icon: HelpCircle, label: "Help & Support", path: "/help", description: "Get help and support" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <User className="h-8 w-8" />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-muted-foreground">john.doe@example.com</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">Verified</Badge>
                <Badge variant="outline">Buyer & Seller</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Buyer/Seller Tabs */}
        <Tabs defaultValue="buyer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buyer" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              As Buyer
            </TabsTrigger>
            <TabsTrigger value="seller" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              As Seller
            </TabsTrigger>
          </TabsList>

          {/* Buyer Tab */}
          <TabsContent value="buyer" className="space-y-6">
            {/* Buyer Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{buyerStats.totalOrders}</div>
                <div className="text-sm text-muted-foreground">Orders</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">${buyerStats.totalSpent}</div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{buyerStats.favoriteCategories.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {buyerStats.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{order.item}</div>
                        <div className="text-sm text-muted-foreground">from {order.seller} • {order.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${order.amount}</div>
                      <Badge variant="outline" className="text-xs">{order.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Seller Tab */}
          <TabsContent value="seller" className="space-y-6">
            {/* Seller Stats */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{sellerStats.totalSales}</div>
                <div className="text-sm text-muted-foreground">Sales</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">${sellerStats.totalEarnings}</div>
                <div className="text-sm text-muted-foreground">Earnings</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{sellerStats.activeListings}</div>
                <div className="text-sm text-muted-foreground">Active Listings</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                  <Star className="h-5 w-5 fill-current" />
                  {sellerStats.rating}
                </div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </Card>
            </div>

            {/* Recent Sales */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Sales</h3>
                <Button size="sm" onClick={() => navigate('/dashboard')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Listing
                </Button>
              </div>
              <div className="space-y-3">
                {sellerStats.recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Store className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{sale.item}</div>
                        <div className="text-sm text-muted-foreground">to {sale.buyer} • {sale.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${sale.amount}</div>
                      <Badge variant="outline" className="text-xs">{sale.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Profile Options */}
        <div className="space-y-2">
          {profileOptions.map((option) => (
            <Card key={option.path} className="p-4 hover:bg-muted/50 transition-colors">
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-0"
                onClick={() => navigate(option.path)}
              >
                <div className="flex items-center gap-4 w-full">
                  <option.icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                </div>
              </Button>
            </Card>
          ))}
        </div>

        {/* Logout */}
        <Card className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => {
              // Handle logout
              console.log('Logout clicked');
            }}
          >
            <LogOut className="h-5 w-5 mr-4" />
            Sign Out
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
