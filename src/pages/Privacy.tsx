import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock,
  MapPin, 
  MessageCircle, 
  Phone, 
  Mail,
  User,
  Activity,
  History,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Key,
  Smartphone,
  Globe
} from "lucide-react";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";

const Privacy = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profile: {
      visibility: "public", // public, friends, private
      showRealName: true,
      showLocation: true,
      showContactInfo: false,
      showActivity: false,
      showPurchaseHistory: false
    },
    location: {
      enabled: true,
      shareWithVendors: true,
      shareWithFriends: false,
      preciseLocation: false,
      locationHistory: true
    },
    communication: {
      allowMessages: "everyone", // everyone, friends, nobody
      allowCalls: "friends",
      showOnlineStatus: true,
      readReceipts: true
    },
    data: {
      personalizedAds: true,
      dataCollection: true,
      analytics: false,
      thirdPartySharing: false
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      deviceTracking: true,
      sessionTimeout: "30min"
    }
  });

  const [dataRequests, setDataRequests] = useState([
    {
      id: '1',
      type: 'export',
      status: 'completed',
      requestDate: '2024-01-15',
      completedDate: '2024-01-16',
      description: 'Full account data export'
    },
    {
      id: '2',
      type: 'deletion',
      status: 'pending',
      requestDate: '2024-01-20',
      description: 'Delete purchase history older than 1 year'
    }
  ]);

  const [connectedApps, setConnectedApps] = useState([
    {
      id: '1',
      name: 'Google Maps',
      permissions: ['Location', 'Navigation'],
      lastAccess: '2024-01-20',
      status: 'active'
    },
    {
      id: '2',
      name: 'WhatsApp Business',
      permissions: ['Messages', 'Contacts'],
      lastAccess: '2024-01-19',
      status: 'active'
    },
    {
      id: '3',
      name: 'Facebook',
      permissions: ['Profile', 'Friends'],
      lastAccess: '2024-01-10',
      status: 'inactive'
    }
  ]);

  const handlePrivacyChange = (category: string, setting: string, value: any) => {
    setPrivacySettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleExportData = () => {
    const newRequest = {
      id: Date.now().toString(),
      type: 'export',
      status: 'processing',
      requestDate: new Date().toISOString().split('T')[0],
      description: 'Full account data export'
    };
    setDataRequests(prev => [newRequest, ...prev]);
    alert('Data export request submitted. You will receive an email when ready.');
  };

  const handleDeleteData = () => {
    if (confirm('Are you sure you want to request data deletion? This action cannot be undone.')) {
      const newRequest = {
        id: Date.now().toString(),
        type: 'deletion',
        status: 'pending',
        requestDate: new Date().toISOString().split('T')[0],
        description: 'Account data deletion request'
      };
      setDataRequests(prev => [newRequest, ...prev]);
      alert('Data deletion request submitted. Our team will review your request.');
    }
  };

  const revokeAppAccess = (appId: string) => {
    setConnectedApps(prev => 
      prev.map(app => 
        app.id === appId ? { ...app, status: 'revoked' } : app
      )
    );
    alert('App access revoked successfully.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'revoked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar */}
      <FixedSearchBar
        searchContext="global"
        placeholder="Search privacy settings..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-primary bg-primary/10">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Privacy & Security
            </h1>
            <p className="text-lg text-muted-foreground">
              Control your privacy and secure your account
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="data">Data & Privacy</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Profile Privacy */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-medium">Profile Visibility</label>
                    <Select 
                      value={privacySettings.profile.visibility} 
                      onValueChange={(value) => handlePrivacyChange('profile', 'visibility', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Public - Anyone can see
                          </div>
                        </SelectItem>
                        <SelectItem value="friends">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Friends Only
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Private - Only me
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Show Real Name</label>
                      <p className="text-sm text-muted-foreground">Display your full name on your profile</p>
                    </div>
                    <Switch
                      checked={privacySettings.profile.showRealName}
                      onCheckedChange={(checked) => handlePrivacyChange('profile', 'showRealName', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Show Location</label>
                      <p className="text-sm text-muted-foreground">Display your general location</p>
                    </div>
                    <Switch
                      checked={privacySettings.profile.showLocation}
                      onCheckedChange={(checked) => handlePrivacyChange('profile', 'showLocation', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Show Contact Information</label>
                      <p className="text-sm text-muted-foreground">Allow others to see your contact details</p>
                    </div>
                    <Switch
                      checked={privacySettings.profile.showContactInfo}
                      onCheckedChange={(checked) => handlePrivacyChange('profile', 'showContactInfo', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Show Activity Status</label>
                      <p className="text-sm text-muted-foreground">Let others see when you're active</p>
                    </div>
                    <Switch
                      checked={privacySettings.profile.showActivity}
                      onCheckedChange={(checked) => handlePrivacyChange('profile', 'showActivity', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Show Purchase History</label>
                      <p className="text-sm text-muted-foreground">Display your buying activity</p>
                    </div>
                    <Switch
                      checked={privacySettings.profile.showPurchaseHistory}
                      onCheckedChange={(checked) => handlePrivacyChange('profile', 'showPurchaseHistory', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Location Privacy */}
            <TabsContent value="location">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Location Services</label>
                      <p className="text-sm text-muted-foreground">Allow Swumarket to access your location</p>
                    </div>
                    <Switch
                      checked={privacySettings.location.enabled}
                      onCheckedChange={(checked) => handlePrivacyChange('location', 'enabled', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Share with Vendors</label>
                      <p className="text-sm text-muted-foreground">Help vendors provide better service</p>
                    </div>
                    <Switch
                      checked={privacySettings.location.shareWithVendors}
                      onCheckedChange={(checked) => handlePrivacyChange('location', 'shareWithVendors', checked)}
                      disabled={!privacySettings.location.enabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Precise Location</label>
                      <p className="text-sm text-muted-foreground">Share exact location instead of approximate</p>
                    </div>
                    <Switch
                      checked={privacySettings.location.preciseLocation}
                      onCheckedChange={(checked) => handlePrivacyChange('location', 'preciseLocation', checked)}
                      disabled={!privacySettings.location.enabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Location History</label>
                      <p className="text-sm text-muted-foreground">Save location history for better recommendations</p>
                    </div>
                    <Switch
                      checked={privacySettings.location.locationHistory}
                      onCheckedChange={(checked) => handlePrivacyChange('location', 'locationHistory', checked)}
                      disabled={!privacySettings.location.enabled}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Communication Privacy */}
            <TabsContent value="communication">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Communication Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-medium">Who can message you</label>
                    <Select 
                      value={privacySettings.communication.allowMessages} 
                      onValueChange={(value) => handlePrivacyChange('communication', 'allowMessages', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="everyone">Everyone</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="nobody">Nobody</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-medium">Who can call you</label>
                    <Select 
                      value={privacySettings.communication.allowCalls} 
                      onValueChange={(value) => handlePrivacyChange('communication', 'allowCalls', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="everyone">Everyone</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="nobody">Nobody</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Show Online Status</label>
                      <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                    </div>
                    <Switch
                      checked={privacySettings.communication.showOnlineStatus}
                      onCheckedChange={(checked) => handlePrivacyChange('communication', 'showOnlineStatus', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Read Receipts</label>
                      <p className="text-sm text-muted-foreground">Show when you've read messages</p>
                    </div>
                    <Switch
                      checked={privacySettings.communication.readReceipts}
                      onCheckedChange={(checked) => handlePrivacyChange('communication', 'readReceipts', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data & Privacy */}
            <TabsContent value="data">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Data Collection & Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="font-medium">Personalized Ads</label>
                        <p className="text-sm text-muted-foreground">Show ads based on your interests</p>
                      </div>
                      <Switch
                        checked={privacySettings.data.personalizedAds}
                        onCheckedChange={(checked) => handlePrivacyChange('data', 'personalizedAds', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="font-medium">Data Collection</label>
                        <p className="text-sm text-muted-foreground">Allow collection of usage data for improvements</p>
                      </div>
                      <Switch
                        checked={privacySettings.data.dataCollection}
                        onCheckedChange={(checked) => handlePrivacyChange('data', 'dataCollection', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="font-medium">Analytics</label>
                        <p className="text-sm text-muted-foreground">Share anonymous analytics data</p>
                      </div>
                      <Switch
                        checked={privacySettings.data.analytics}
                        onCheckedChange={(checked) => handlePrivacyChange('data', 'analytics', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="font-medium">Third-party Sharing</label>
                        <p className="text-sm text-muted-foreground">Allow sharing data with trusted partners</p>
                      </div>
                      <Switch
                        checked={privacySettings.data.thirdPartySharing}
                        onCheckedChange={(checked) => handlePrivacyChange('data', 'thirdPartySharing', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Requests</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex gap-4">
                      <Button onClick={handleExportData} className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Export My Data
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteData} className="flex-1">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete My Data
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Recent Requests</h3>
                      {dataRequests.map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{request.description}</div>
                            <div className="text-sm text-muted-foreground">
                              Requested: {request.requestDate}
                              {request.completedDate && ` • Completed: ${request.completedDate}`}
                            </div>
                          </div>
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Connected Apps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {connectedApps.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{app.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Permissions: {app.permissions.join(', ')}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Last access: {app.lastAccess}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(app.status)}>
                              {app.status}
                            </Badge>
                            {app.status === 'active' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => revokeAppAccess(app.id)}
                              >
                                Revoke
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Two-Factor Authentication</label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={privacySettings.security.twoFactorAuth}
                      onCheckedChange={(checked) => handlePrivacyChange('security', 'twoFactorAuth', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Login Alerts</label>
                      <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                    </div>
                    <Switch
                      checked={privacySettings.security.loginAlerts}
                      onCheckedChange={(checked) => handlePrivacyChange('security', 'loginAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="font-medium">Device Tracking</label>
                      <p className="text-sm text-muted-foreground">Track devices that access your account</p>
                    </div>
                    <Switch
                      checked={privacySettings.security.deviceTracking}
                      onCheckedChange={(checked) => handlePrivacyChange('security', 'deviceTracking', checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-medium">Session Timeout</label>
                    <Select 
                      value={privacySettings.security.sessionTimeout} 
                      onValueChange={(value) => handlePrivacyChange('security', 'sessionTimeout', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15min">15 minutes</SelectItem>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="1hour">1 hour</SelectItem>
                        <SelectItem value="4hours">4 hours</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline">
                        <Key className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button variant="outline">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Manage Devices
                      </Button>
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

export default Privacy;
