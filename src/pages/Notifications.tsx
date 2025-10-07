import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  ShoppingCart, 
  MessageCircle, 
  Heart, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Trash2,
  Settings,
  Volume2,
  VolumeX,
  Eye,
  EyeOff
} from "lucide-react";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";

interface Notification {
  id: string;
  type: 'order' | 'message' | 'like' | 'price_drop' | 'system' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
  actionUrl?: string;
  image?: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order of Fresh Tomatoes from Mai Sarah has been delivered successfully.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      isRead: false,
      isImportant: true,
      actionUrl: '/orders/123',
      image: 'https://images.unsplash.com/photo-1546470427-e26264be0d2b?w=50&h=50&fit=crop'
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'Brother John sent you a message about your BBQ order.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isRead: false,
      isImportant: false,
      actionUrl: '/messages/456'
    },
    {
      id: '3',
      type: 'price_drop',
      title: 'Price Drop Alert',
      message: 'Cooking Oil at Pick n Pay is now $3.95 (was $4.25). Save $0.30!',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      isRead: true,
      isImportant: false,
      actionUrl: '/product/cooking-oil',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=50&h=50&fit=crop'
    },
    {
      id: '4',
      type: 'like',
      title: 'Item Liked',
      message: '3 people liked your listing "Handmade Jewelry Set".',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      isRead: true,
      isImportant: false,
      actionUrl: '/my-listings/jewelry'
    },
    {
      id: '5',
      type: 'system',
      title: 'System Update',
      message: 'Swumarket has been updated with new features including AI recommendations.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      isRead: true,
      isImportant: false
    },
    {
      id: '6',
      type: 'reminder',
      title: 'Budget Reminder',
      message: 'You have spent 75% of your monthly grocery budget ($187.50 of $250).',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      isRead: false,
      isImportant: true,
      actionUrl: '/budget'
    }
  ]);

  const [settings, setSettings] = useState({
    soundEnabled: true,
    vibrationEnabled: true,
    showPreviews: true,
    groupSimilar: true,
    types: {
      orders: true,
      messages: true,
      likes: true,
      priceDrops: true,
      system: false,
      reminders: true
    }
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingCart className="h-5 w-5" />;
      case 'message': return <MessageCircle className="h-5 w-5" />;
      case 'like': return <Heart className="h-5 w-5" />;
      case 'price_drop': return <TrendingUp className="h-5 w-5" />;
      case 'system': return <AlertTriangle className="h-5 w-5" />;
      case 'reminder': return <Clock className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'order': return 'bg-green-100 text-green-800';
      case 'message': return 'bg-blue-100 text-blue-800';
      case 'like': return 'bg-red-100 text-red-800';
      case 'price_drop': return 'bg-orange-100 text-orange-800';
      case 'system': return 'bg-purple-100 text-purple-800';
      case 'reminder': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
    }
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const importantNotifications = notifications.filter(n => n.isImportant && !n.isRead);
  const recentNotifications = notifications.filter(n => {
    const hoursSince = (Date.now() - new Date(n.timestamp).getTime()) / (1000 * 60 * 60);
    return hoursSince < 24;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar */}
      <FixedSearchBar
        searchContext="global"
        placeholder="Search notifications..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-primary bg-primary/10 relative">
              <Bell className="h-8 w-8" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
                  {unreadCount}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Notifications
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with your marketplace activity
            </p>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="mt-2">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAll}
              disabled={notifications.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">
                All ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="important">
                Important ({importantNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="settings">
                Settings
              </TabsTrigger>
            </TabsList>

            {/* All Notifications */}
            <TabsContent value="all">
              <div className="space-y-4">
                {notifications.length === 0 ? (
                  <Card>
                    <CardContent className="flex items-center justify-center h-32">
                      <div className="text-center">
                        <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No notifications yet</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  notifications.map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`transition-all hover:shadow-md ${
                        !notification.isRead ? 'border-primary/50 bg-primary/5' : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                            {getTypeIcon(notification.type)}
                          </div>
                          
                          {notification.image && (
                            <img 
                              src={notification.image} 
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-sm">{notification.title}</h3>
                              {notification.isImportant && (
                                <Badge variant="destructive" className="text-xs">Important</Badge>
                              )}
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(notification.timestamp)}
                              </span>
                              <div className="flex gap-2">
                                {!notification.isRead && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    Mark Read
                                  </Button>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Unread Notifications */}
            <TabsContent value="unread">
              <div className="space-y-4">
                {notifications.filter(n => !n.isRead).length === 0 ? (
                  <Card>
                    <CardContent className="flex items-center justify-center h-32">
                      <div className="text-center">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="text-muted-foreground">All caught up!</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  notifications
                    .filter(n => !n.isRead)
                    .map((notification) => (
                      <Card key={notification.id} className="border-primary/50 bg-primary/5">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                              {getTypeIcon(notification.type)}
                            </div>
                            
                            {notification.image && (
                              <img 
                                src={notification.image} 
                                alt=""
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            )}
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-sm">{notification.title}</h3>
                                {notification.isImportant && (
                                  <Badge variant="destructive" className="text-xs">Important</Badge>
                                )}
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {formatTimeAgo(notification.timestamp)}
                                </span>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    Mark Read
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => deleteNotification(notification.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                )}
              </div>
            </TabsContent>

            {/* Important Notifications */}
            <TabsContent value="important">
              <div className="space-y-4">
                {importantNotifications.length === 0 ? (
                  <Card>
                    <CardContent className="flex items-center justify-center h-32">
                      <div className="text-center">
                        <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No important notifications</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  importantNotifications.map((notification) => (
                    <Card key={notification.id} className="border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                            {getTypeIcon(notification.type)}
                          </div>
                          
                          {notification.image && (
                            <img 
                              src={notification.image} 
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-sm">{notification.title}</h3>
                              <Badge variant="destructive" className="text-xs">Important</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(notification.timestamp)}
                              </span>
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  Mark Read
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Sound Notifications</label>
                      <p className="text-sm text-muted-foreground">Play sound when notifications arrive</p>
                    </div>
                    <Switch
                      checked={settings.soundEnabled}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, soundEnabled: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Vibration</label>
                      <p className="text-sm text-muted-foreground">Vibrate device for notifications</p>
                    </div>
                    <Switch
                      checked={settings.vibrationEnabled}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, vibrationEnabled: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Show Previews</label>
                      <p className="text-sm text-muted-foreground">Show notification content in previews</p>
                    </div>
                    <Switch
                      checked={settings.showPreviews}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, showPreviews: checked})
                      }
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Notification Types</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        <span>Order Updates</span>
                      </div>
                      <Switch
                        checked={settings.types.orders}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings, 
                            types: {...settings.types, orders: checked}
                          })
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>Messages</span>
                      </div>
                      <Switch
                        checked={settings.types.messages}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings, 
                            types: {...settings.types, messages: checked}
                          })
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        <span>Likes & Favorites</span>
                      </div>
                      <Switch
                        checked={settings.types.likes}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings, 
                            types: {...settings.types, likes: checked}
                          })
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>Price Drops</span>
                      </div>
                      <Switch
                        checked={settings.types.priceDrops}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings, 
                            types: {...settings.types, priceDrops: checked}
                          })
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Reminders</span>
                      </div>
                      <Switch
                        checked={settings.types.reminders}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings, 
                            types: {...settings.types, reminders: checked}
                          })
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>System Updates</span>
                      </div>
                      <Switch
                        checked={settings.types.system}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings, 
                            types: {...settings.types, system: checked}
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
