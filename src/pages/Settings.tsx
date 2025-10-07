import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Volume2, 
  Eye, 
  MapPin, 
  CreditCard,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Languages,
  Save
} from "lucide-react";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useSettings } from "@/context/SettingsContext";
import { useI18n } from "@/i18n/i18n";

const Settings = () => {
  const { voiceEnabled, signLanguageEnabled, setVoiceEnabled, setSignLanguageEnabled } = useSettings();
  const { lang, setLang } = useI18n();
  
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+263 77 123 4567",
    location: "Harare, Zimbabwe",
    bio: "Local entrepreneur and marketplace enthusiast"
  });

  const [preferences, setPreferences] = useState({
    theme: "light",
    currency: "USD",
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false
    },
    privacy: {
      profileVisible: true,
      locationSharing: true,
      activityVisible: false,
      contactInfo: "friends"
    },
    marketplace: {
      autoAcceptOffers: false,
      showPriceHistory: true,
      enableNegotiation: true,
      preferredRadius: "5km"
    }
  });

  const handleSaveProfile = () => {
    // Save profile changes
    alert("Profile updated successfully!");
  };

  const handleSavePreferences = () => {
    // Save preferences
    alert("Preferences saved successfully!");
  };

  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      // Reset to defaults
      alert("Settings reset to default!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar */}
      <FixedSearchBar
        searchContext="global"
        placeholder="Search settings..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-primary bg-primary/10">
              <SettingsIcon className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Settings
            </h1>
            <p className="text-lg text-muted-foreground">
              Customize your Swumarket experience
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
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      placeholder="Tell others about yourself..."
                    />
                  </div>
                  
                  <Button onClick={handleSaveProfile} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={preferences.notifications.email}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences,
                          notifications: {...preferences.notifications, email: checked}
                        })
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                    </div>
                    <Switch
                      checked={preferences.notifications.push}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences,
                          notifications: {...preferences.notifications, push: checked}
                        })
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive important updates via SMS</p>
                    </div>
                    <Switch
                      checked={preferences.notifications.sms}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences,
                          notifications: {...preferences.notifications, sms: checked}
                        })
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Communications</Label>
                      <p className="text-sm text-muted-foreground">Receive promotional offers and updates</p>
                    </div>
                    <Switch
                      checked={preferences.notifications.marketing}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences,
                          notifications: {...preferences.notifications, marketing: checked}
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                    </div>
                    <Switch
                      checked={preferences.privacy.profileVisible}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences,
                          privacy: {...preferences.privacy, profileVisible: checked}
                        })
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Location Sharing</Label>
                      <p className="text-sm text-muted-foreground">Share your location for better recommendations</p>
                    </div>
                    <Switch
                      checked={preferences.privacy.locationSharing}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences,
                          privacy: {...preferences.privacy, locationSharing: checked}
                        })
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Contact Information Visibility</Label>
                    <Select 
                      value={preferences.privacy.contactInfo} 
                      onValueChange={(value) => 
                        setPreferences({
                          ...preferences,
                          privacy: {...preferences.privacy, contactInfo: value}
                        })
                      }
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
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Appearance & Accessibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select 
                      value={preferences.theme} 
                      onValueChange={(value) => 
                        setPreferences({...preferences, theme: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            System
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={lang} onValueChange={setLang}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">
                          <div className="flex items-center gap-2">
                            🇺🇸 English
                          </div>
                        </SelectItem>
                        <SelectItem value="sn">
                          <div className="flex items-center gap-2">
                            🇿🇼 Shona
                          </div>
                        </SelectItem>
                        <SelectItem value="nd">
                          <div className="flex items-center gap-2">
                            🇿🇼 Ndebele
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Voice Output</Label>
                      <p className="text-sm text-muted-foreground">Enable text-to-speech for accessibility</p>
                    </div>
                    <Switch
                      checked={voiceEnabled}
                      onCheckedChange={setVoiceEnabled}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sign Language Support</Label>
                      <p className="text-sm text-muted-foreground">Enable sign language interpretation</p>
                    </div>
                    <Switch
                      checked={signLanguageEnabled}
                      onCheckedChange={setSignLanguageEnabled}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Marketplace Settings */}
            <TabsContent value="marketplace">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Marketplace Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Preferred Currency</Label>
                    <Select 
                      value={preferences.currency} 
                      onValueChange={(value) => 
                        setPreferences({...preferences, currency: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="ZWL">ZWL - Zimbabwean Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Search Radius</Label>
                    <Select 
                      value={preferences.marketplace.preferredRadius} 
                      onValueChange={(value) => 
                        setPreferences({
                          ...preferences,
                          marketplace: {...preferences.marketplace, preferredRadius: value}
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1km">1 km</SelectItem>
                        <SelectItem value="5km">5 km</SelectItem>
                        <SelectItem value="10km">10 km</SelectItem>
                        <SelectItem value="25km">25 km</SelectItem>
                        <SelectItem value="50km">50 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Price Negotiation</Label>
                      <p className="text-sm text-muted-foreground">Allow buyers to negotiate prices on your items</p>
                    </div>
                    <Switch
                      checked={preferences.marketplace.enableNegotiation}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences,
                          marketplace: {...preferences.marketplace, enableNegotiation: checked}
                        })
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Price History</Label>
                      <p className="text-sm text-muted-foreground">Display historical pricing data for items</p>
                    </div>
                    <Switch
                      checked={preferences.marketplace.showPriceHistory}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences,
                          marketplace: {...preferences.marketplace, showPriceHistory: checked}
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button onClick={handleSavePreferences} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </Button>
            <Button variant="outline" onClick={handleResetSettings}>
              Reset to Default
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
