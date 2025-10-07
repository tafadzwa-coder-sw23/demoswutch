import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Eye, 
  Star,
  BarChart3,
  Download,
  Settings,
  Store,
  Package,
  Plus,
  MessageCircle
} from "lucide-react";

const SellerDashboard = () => {
  // Seller stats
  const sellerStats = {
    totalSales: 12540,
    orders: 89,
    customers: 156,
    views: 2340,
    rating: 4.7,
    revenue: 8750,
    activeListings: 12
  };

  // Buyer stats
  const buyerStats = {
    totalOrders: 24,
    totalSpent: 1250,
    favoriteSellers: 8,
    savedItems: 15,
    wishlist: 6
  };

  const mockProducts = [
    { id: '1', name: 'Handmade Necklace', sales: 23, revenue: 575, trend: 'up' },
    { id: '2', name: 'Organic Vegetables', sales: 45, revenue: 675, trend: 'up' },
    { id: '3', name: 'Tech Repair Service', sales: 12, revenue: 600, trend: 'down' },
  ];

  const mockOrders = [
    { id: 'ORD001', customer: 'John M.', amount: 45, status: 'completed', date: '2 hours ago' },
    { id: 'ORD002', customer: 'Sarah K.', amount: 78, status: 'pending', date: '4 hours ago' },
    { id: 'ORD003', customer: 'Mike T.', amount: 32, status: 'shipped', date: '1 day ago' },
  ];

  const mockPurchases = [
    { id: 'PUR001', item: 'Fresh Vegetables', seller: 'Mai Sarah', amount: 15.50, status: 'delivered', date: '2 days ago' },
    { id: 'PUR002', item: 'Phone Case', seller: 'Tech Store', amount: 25.00, status: 'shipped', date: '1 week ago' },
    { id: 'PUR003', item: 'T-Shirt', seller: 'Fashion Hub', amount: 18.75, status: 'delivered', date: '2 weeks ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Manage your buying and selling activities</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="seller" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="seller" className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                As Seller
              </TabsTrigger>
              <TabsTrigger value="buyer" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                As Buyer
              </TabsTrigger>
            </TabsList>

            {/* Seller Tab */}
            <TabsContent value="seller" className="space-y-6">
              {/* Seller Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">${sellerStats.revenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+12.5% from last month</span>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold">{sellerStats.orders}</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+8.2% from last month</span>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Customers</p>
                      <p className="text-2xl font-bold">{sellerStats.customers}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+15.3% from last month</span>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                      <p className="text-2xl font-bold">{sellerStats.activeListings}</p>
                    </div>
                    <Package className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-600 mr-1" />
                    <span className="text-sm text-yellow-600">{sellerStats.rating} rating</span>
                  </div>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Recent Orders</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <ShoppingCart className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer} • {order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-semibold">${order.amount}</p>
                        <Badge variant={order.status === 'completed' ? 'default' : order.status === 'pending' ? 'secondary' : 'outline'}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top Products */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Top Products</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                <div className="space-y-4">
                  {mockProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <BarChart3 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.sales} sales • ${product.revenue} revenue</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className={`h-4 w-4 ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                        <span className={`text-sm ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {product.trend === 'up' ? '+5.2%' : '-2.1%'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Buyer Tab */}
            <TabsContent value="buyer" className="space-y-6">
              {/* Buyer Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold">{buyerStats.totalOrders}</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+3 orders this month</span>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                      <p className="text-2xl font-bold">${buyerStats.totalSpent}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+$150 this month</span>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Favorite Sellers</p>
                      <p className="text-2xl font-bold">{buyerStats.favoriteSellers}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <MessageCircle className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm text-blue-600">Active conversations</span>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Saved Items</p>
                      <p className="text-2xl font-bold">{buyerStats.savedItems}</p>
                    </div>
                    <Package className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-muted-foreground">{buyerStats.wishlist} in wishlist</span>
                  </div>
                </Card>
              </div>

              {/* Recent Purchases */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Recent Purchases</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                <div className="space-y-4">
                  {mockPurchases.map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{purchase.item}</p>
                          <p className="text-sm text-muted-foreground">from {purchase.seller} • {purchase.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-semibold">${purchase.amount}</p>
                        <Badge variant={purchase.status === 'delivered' ? 'default' : 'outline'}>
                          {purchase.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Start Selling</h3>
                  <p className="text-sm text-muted-foreground mb-4">List your first item for sale</p>
                  <Button className="w-full">Add Product</Button>
                </Card>

                <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Browse Products</h3>
                  <p className="text-sm text-muted-foreground mb-4">Find new items to buy</p>
                  <Button variant="outline" className="w-full">Browse</Button>
                </Card>

                <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Messages</h3>
                  <p className="text-sm text-muted-foreground mb-4">Chat with sellers and buyers</p>
                  <Button variant="outline" className="w-full">Messages</Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;