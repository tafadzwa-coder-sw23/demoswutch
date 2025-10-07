import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  AlertTriangle, 
  Shield, 
  Phone, 
  MapPin, 
  Clock, 
  Users, 
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Heart,
  Navigation,
  Home,
  Briefcase,
  School,
  UserCheck,
  Star,
  MessageCircle,
  Volume2,
  Mic
} from "lucide-react";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useSafety } from "@/context/SafetyContext";

const Safety = () => {
  const { 
    state, 
    addEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
    addSafetyTrigger,
    updateSafetyTrigger,
    deleteSafetyTrigger,
    triggerPanicButton,
    resolveIncident,
    respondToCheckIn,
    addSafeZone,
    updateSafeZone,
    deleteSafeZone,
    requestHelp,
    performCheckIn,
    updateSettings
  } = useSafety();

  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    relationship: "family" as const,
    isPrimary: false,
    isActive: true
  });

  const [newZone, setNewZone] = useState({
    name: "",
    description: "",
    type: "home" as const,
    isActive: true,
    notifications: {
      onEnter: false,
      onExit: true,
      notifyContacts: false
    }
  });

  const [checkInStatus, setCheckInStatus] = useState<'safe' | 'need-help' | 'emergency'>('safe');
  const [checkInMessage, setCheckInMessage] = useState("");

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship) {
      case 'family': return '👨‍👩‍👧‍👦';
      case 'friend': return '👥';
      case 'colleague': return '💼';
      case 'neighbor': return '🏠';
      default: return '👤';
    }
  };

  const getZoneTypeIcon = (type: string) => {
    switch (type) {
      case 'home': return <Home className="h-4 w-4" />;
      case 'work': return <Briefcase className="h-4 w-4" />;
      case 'school': return <School className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getIncidentStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'false-alarm': return 'bg-gray-100 text-gray-800';
      case 'escalated': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      addEmergencyContact(newContact);
      setNewContact({
        name: "",
        phone: "",
        email: "",
        relationship: "family",
        isPrimary: false,
        isActive: true
      });
    }
  };

  const handleAddZone = () => {
    if (newZone.name) {
      // In a real app, you'd get the actual location coordinates
      addSafeZone({
        ...newZone,
        location: {
          lat: -17.8252 + (Math.random() - 0.5) * 0.01,
          lng: 31.0335 + (Math.random() - 0.5) * 0.01,
          radius: 100
        }
      });
      setNewZone({
        name: "",
        description: "",
        type: "home",
        isActive: true,
        notifications: {
          onEnter: false,
          onExit: true,
          notifyContacts: false
        }
      });
    }
  };

  const handlePanicButton = () => {
    if (confirm('Are you sure you want to trigger the panic button? This will alert your emergency contacts and may contact emergency services.')) {
      triggerPanicButton();
    }
  };

  const handleCheckIn = () => {
    performCheckIn(checkInStatus, checkInMessage);
    setCheckInMessage("");
    alert(`Check-in completed! Status: ${checkInStatus}`);
  };

  const handleResolveIncident = (incidentId: string, resolution: string) => {
    const notes = prompt('Add any notes about the resolution:');
    resolveIncident(incidentId, resolution, notes || undefined);
  };

  const handleRequestHelp = (helperId: string) => {
    const message = prompt('What kind of help do you need?');
    if (message) {
      requestHelp(helperId, message);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar */}
      <FixedSearchBar
        searchContext="global"
        placeholder="Search safety features..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-primary bg-primary/10">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Safety Center
            </h1>
            <p className="text-lg text-muted-foreground">
              Your personal safety network and emergency response system
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          {/* Emergency Mode Alert */}
          {state.isEmergencyMode && (
            <Card className="border-red-500 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800">Emergency Mode Active</h3>
                    <p className="text-red-600">Your emergency contacts have been notified. Help is on the way.</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => handleResolveIncident(state.incidents[0]?.id, 'resolved')}
                    className="ml-auto"
                  >
                    Mark as Resolved
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-red-200 hover:border-red-400 transition-colors cursor-pointer" onClick={handlePanicButton}>
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-700 mb-2">Panic Button</h3>
                <p className="text-sm text-muted-foreground">Immediate emergency alert</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardContent className="p-6 text-center">
                <UserCheck className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Quick Check-in</h3>
                <div className="space-y-2">
                  <Select value={checkInStatus} onValueChange={(value: any) => setCheckInStatus(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="safe">😊 I'm Safe</SelectItem>
                      <SelectItem value="need-help">😟 Need Help</SelectItem>
                      <SelectItem value="emergency">🚨 Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleCheckIn} className="w-full" size="sm">
                    Send Check-in
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:border-green-400 transition-colors">
              <CardContent className="p-6 text-center">
                <MapPin className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-700 mb-2">Share Location</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {state.currentLocation ? 'Location available' : 'Getting location...'}
                </p>
                <Button size="sm" className="w-full">
                  <Navigation className="h-4 w-4 mr-2" />
                  Share Now
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="contacts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="triggers">Triggers</TabsTrigger>
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
              <TabsTrigger value="zones">Safe Zones</TabsTrigger>
              <TabsTrigger value="helpers">Helpers</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Emergency Contacts */}
            <TabsContent value="contacts">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        Emergency Contacts
                      </CardTitle>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Contact
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Emergency Contact</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Name</label>
                              <Input
                                value={newContact.name}
                                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                                placeholder="Contact name"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Phone</label>
                              <Input
                                value={newContact.phone}
                                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                                placeholder="+263771234567"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Email (optional)</label>
                              <Input
                                value={newContact.email}
                                onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                                placeholder="email@example.com"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Relationship</label>
                              <Select value={newContact.relationship} onValueChange={(value: any) => setNewContact({...newContact, relationship: value})}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="family">Family</SelectItem>
                                  <SelectItem value="friend">Friend</SelectItem>
                                  <SelectItem value="colleague">Colleague</SelectItem>
                                  <SelectItem value="neighbor">Neighbor</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={newContact.isPrimary}
                                onCheckedChange={(checked) => setNewContact({...newContact, isPrimary: checked})}
                              />
                              <label className="text-sm font-medium">Primary contact</label>
                            </div>
                            <Button onClick={handleAddContact} className="w-full">
                              Add Contact
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {state.emergencyContacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">{getRelationshipIcon(contact.relationship)}</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{contact.name}</h3>
                                {contact.isPrimary && (
                                  <Badge className="bg-blue-100 text-blue-800">Primary</Badge>
                                )}
                                {!contact.isActive && (
                                  <Badge variant="outline">Inactive</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{contact.phone}</p>
                              <p className="text-sm text-muted-foreground capitalize">{contact.relationship}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Safety Triggers */}
            <TabsContent value="triggers">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Safety Triggers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {state.safetyTriggers.map((trigger) => (
                      <div key={trigger.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{trigger.name}</h3>
                            <Badge variant="outline">{trigger.type}</Badge>
                            {trigger.isActive ? (
                              <Badge className="bg-green-100 text-green-800">Active</Badge>
                            ) : (
                              <Badge variant="outline">Inactive</Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Switch
                              checked={trigger.isActive}
                              onCheckedChange={(checked) => updateSafetyTrigger({...trigger, isActive: checked})}
                            />
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{trigger.description}</p>
                        <div className="text-xs text-muted-foreground">
                          Actions: {trigger.actions.notifyContacts && 'Notify contacts'} 
                          {trigger.actions.sendLocation && ', Send location'}
                          {trigger.actions.callPolice && ', Call police'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Incidents */}
            <TabsContent value="incidents">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Safety Incidents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {state.incidents.length === 0 ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No incidents recorded</h3>
                        <p className="text-muted-foreground">You're all safe! No emergency incidents have been triggered.</p>
                      </div>
                    ) : (
                      state.incidents.map((incident) => (
                        <div key={incident.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{incident.triggerName}</h3>
                              <Badge className={getIncidentStatusColor(incident.status)}>
                                {incident.status}
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {formatTimeAgo(incident.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Type: {incident.type}</p>
                          {incident.location && (
                            <p className="text-sm text-muted-foreground mb-2">
                              Location: {incident.location.address}
                            </p>
                          )}
                          {incident.status === 'active' && (
                            <div className="flex gap-2 mt-3">
                              <Button 
                                size="sm" 
                                onClick={() => handleResolveIncident(incident.id, 'resolved')}
                              >
                                Mark Resolved
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleResolveIncident(incident.id, 'false-alarm')}
                              >
                                False Alarm
                              </Button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Safe Zones */}
            <TabsContent value="zones">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Safe Zones
                      </CardTitle>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Zone
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Safe Zone</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Zone Name</label>
                              <Input
                                value={newZone.name}
                                onChange={(e) => setNewZone({...newZone, name: e.target.value})}
                                placeholder="e.g., Home, Office, School"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Description</label>
                              <Input
                                value={newZone.description}
                                onChange={(e) => setNewZone({...newZone, description: e.target.value})}
                                placeholder="Brief description"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Zone Type</label>
                              <Select value={newZone.type} onValueChange={(value: any) => setNewZone({...newZone, type: value})}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="home">Home</SelectItem>
                                  <SelectItem value="work">Work</SelectItem>
                                  <SelectItem value="school">School</SelectItem>
                                  <SelectItem value="friend">Friend's Place</SelectItem>
                                  <SelectItem value="public">Public Place</SelectItem>
                                  <SelectItem value="custom">Custom</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button onClick={handleAddZone} className="w-full">
                              Add Safe Zone
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {state.safeZones.map((zone) => (
                        <div key={zone.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-muted rounded-full">
                              {getZoneTypeIcon(zone.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{zone.name}</h3>
                                <Badge variant="outline" className="capitalize">{zone.type}</Badge>
                                {zone.isActive ? (
                                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                                ) : (
                                  <Badge variant="outline">Inactive</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{zone.description}</p>
                              <p className="text-xs text-muted-foreground">
                                Radius: {zone.location.radius}m
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Switch
                              checked={zone.isActive}
                              onCheckedChange={(checked) => updateSafeZone({...zone, isActive: checked})}
                            />
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Nearby Helpers */}
            <TabsContent value="helpers">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Nearby Helpers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {state.nearbyHelpers.map((helper) => (
                      <div key={helper.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{helper.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="outline" className="capitalize">{helper.type}</Badge>
                                <span>•</span>
                                <span>{helper.location.distance}m away</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  {helper.rating}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {helper.isAvailable ? (
                              <Badge className="bg-green-100 text-green-800">Available</Badge>
                            ) : (
                              <Badge variant="outline">Busy</Badge>
                            )}
                            <Badge className={
                              helper.verificationStatus === 'verified' ? 'bg-blue-100 text-blue-800' :
                              helper.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {helper.verificationStatus}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {helper.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Avg response: {helper.responseTime} min
                          </span>
                          <div className="flex gap-2">
                            {helper.contactInfo.canCall && (
                              <Button size="sm" variant="outline">
                                <Phone className="h-4 w-4 mr-1" />
                                Call
                              </Button>
                            )}
                            {helper.contactInfo.canMessage && (
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                            )}
                            <Button 
                              size="sm"
                              onClick={() => handleRequestHelp(helper.id)}
                              disabled={!helper.isAvailable}
                            >
                              <Heart className="h-4 w-4 mr-1" />
                              Request Help
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Safety Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Auto Location Sharing</h3>
                        <p className="text-sm text-muted-foreground">
                          Automatically share location during emergencies
                        </p>
                      </div>
                      <Switch
                        checked={state.settings.autoLocationSharing}
                        onCheckedChange={(checked) => updateSettings({ autoLocationSharing: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Panic Button</h3>
                        <p className="text-sm text-muted-foreground">
                          Enable the emergency panic button
                        </p>
                      </div>
                      <Switch
                        checked={state.settings.panicButtonEnabled}
                        onCheckedChange={(checked) => updateSettings({ panicButtonEnabled: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Voice Activation</h3>
                        <p className="text-sm text-muted-foreground">
                          Trigger alerts with voice commands
                        </p>
                      </div>
                      <Switch
                        checked={state.settings.voiceActivation}
                        onCheckedChange={(checked) => updateSettings({ voiceActivation: checked })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Emergency Timeout (minutes)</label>
                      <Input
                        type="number"
                        value={state.settings.emergencyTimeout}
                        onChange={(e) => updateSettings({ emergencyTimeout: parseInt(e.target.value) })}
                        min="5"
                        max="120"
                      />
                      <p className="text-xs text-muted-foreground">
                        Time before escalating to emergency services
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Quiet Hours</h3>
                        <Switch
                          checked={state.settings.quietHours.enabled}
                          onCheckedChange={(checked) => updateSettings({ 
                            quietHours: { ...state.settings.quietHours, enabled: checked }
                          })}
                        />
                      </div>
                      {state.settings.quietHours.enabled && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Start Time</label>
                            <Input
                              type="time"
                              value={state.settings.quietHours.start}
                              onChange={(e) => updateSettings({
                                quietHours: { ...state.settings.quietHours, start: e.target.value }
                              })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">End Time</label>
                            <Input
                              type="time"
                              value={state.settings.quietHours.end}
                              onChange={(e) => updateSettings({
                                quietHours: { ...state.settings.quietHours, end: e.target.value }
                              })}
                            />
                          </div>
                        </div>
                      )}
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

export default Safety;
