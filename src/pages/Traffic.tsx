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
import { Progress } from "@/components/ui/progress";
import { 
  Navigation, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Fuel,
  Plus,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Route,
  Zap,
  Shield,
  DollarSign,
  Timer,
  TrendingUp,
  TrendingDown,
  Car,
  Construction,
  Users,
  Camera,
  Settings
} from "lucide-react";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useTraffic } from "@/context/TrafficContext";

const Traffic = () => {
  const { 
    state, 
    addTrafficReport,
    voteTrafficReport,
    verifyTrafficReport,
    getAIRecommendation,
    updateUserPreferences,
    reportTraffic
  } = useTraffic();

  const [newReport, setNewReport] = useState({
    type: 'accident' as const,
    description: '',
    severity: 'medium' as const,
    location: {
      lat: -17.8252,
      lng: 31.0335,
      address: ''
    }
  });

  const [routeRequest, setRouteRequest] = useState({
    start: '',
    end: ''
  });

  const getZoneTypeColor = (type: string) => {
    switch (type) {
      case 'green': return 'bg-green-100 text-green-800 border-green-200';
      case 'black': return 'bg-red-100 text-red-800 border-red-200';
      case 'yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'construction': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'accident': return '🚗';
      case 'roadblock': return '🚧';
      case 'construction': return '🏗️';
      case 'heavy-traffic': return '🚦';
      case 'police-checkpoint': return '👮';
      case 'fuel-shortage': return '⛽';
      case 'protest': return '📢';
      case 'weather': return '🌧️';
      default: return '⚠️';
    }
  };

  const handleReportTraffic = () => {
    if (newReport.description && newReport.location.address) {
      reportTraffic(newReport.type, newReport.location, newReport.description, newReport.severity);
      setNewReport({
        type: 'accident',
        description: '',
        severity: 'medium',
        location: { lat: -17.8252, lng: 31.0335, address: '' }
      });
      alert('Traffic report submitted successfully!');
    }
  };

  const handleVoteReport = (reportId: string, vote: 'up' | 'down') => {
    voteTrafficReport(reportId, vote);
  };

  const handleVerifyReport = (reportId: string) => {
    verifyTrafficReport(reportId);
  };

  const handleGetAIRoute = () => {
    if (routeRequest.start && routeRequest.end) {
      getAIRecommendation(
        { address: routeRequest.start },
        { address: routeRequest.end }
      );
      alert('AI route recommendation generated!');
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar */}
      <FixedSearchBar
        searchContext="global"
        placeholder="Search traffic conditions, routes..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-primary bg-primary/10">
              <Navigation className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Traffic & AI Routing
            </h1>
            <p className="text-lg text-muted-foreground">
              Real-time traffic updates and intelligent route optimization
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Report Traffic</h3>
                    <p className="text-sm text-muted-foreground">Share traffic conditions with the community</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Report Traffic Condition</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Type of Issue</label>
                    <Select value={newReport.type} onValueChange={(value: any) => setNewReport({...newReport, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accident">🚗 Accident</SelectItem>
                        <SelectItem value="roadblock">🚧 Roadblock</SelectItem>
                        <SelectItem value="construction">🏗️ Construction</SelectItem>
                        <SelectItem value="heavy-traffic">🚦 Heavy Traffic</SelectItem>
                        <SelectItem value="police-checkpoint">👮 Police Checkpoint</SelectItem>
                        <SelectItem value="fuel-shortage">⛽ Fuel Shortage</SelectItem>
                        <SelectItem value="protest">📢 Protest/Demo</SelectItem>
                        <SelectItem value="weather">🌧️ Weather Issue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      value={newReport.location.address}
                      onChange={(e) => setNewReport({
                        ...newReport, 
                        location: {...newReport.location, address: e.target.value}
                      })}
                      placeholder="e.g., Corner of Samora Machel & Julius Nyerere"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Severity</label>
                    <Select value={newReport.severity} onValueChange={(value: any) => setNewReport({...newReport, severity: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Minor delays</SelectItem>
                        <SelectItem value="medium">Medium - Moderate delays</SelectItem>
                        <SelectItem value="high">High - Major delays</SelectItem>
                        <SelectItem value="critical">Critical - Road blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={newReport.description}
                      onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                      placeholder="Describe what you're seeing..."
                    />
                  </div>
                  <Button onClick={handleReportTraffic} className="w-full">
                    Submit Report
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={handleGetAIRoute}>
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI Route Planner</h3>
                <p className="text-sm text-muted-foreground">Get intelligent route recommendations</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <MapPin className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live Traffic Map</h3>
                <p className="text-sm text-muted-foreground">View real-time traffic conditions</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="zones" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="zones">Traffic Zones</TabsTrigger>
              <TabsTrigger value="reports">Live Reports</TabsTrigger>
              <TabsTrigger value="routes">AI Routes</TabsTrigger>
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
              <TabsTrigger value="settings">Preferences</TabsTrigger>
            </TabsList>

            {/* Traffic Zones */}
            <TabsContent value="zones">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Active Traffic Zones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {state.trafficZones.map((zone) => (
                        <div key={zone.id} className={`p-4 border-2 rounded-lg ${getZoneTypeColor(zone.type)}`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">
                                {zone.type === 'green' ? '🟢' : 
                                 zone.type === 'black' ? '🔴' : 
                                 zone.type === 'yellow' ? '🟡' : '🟠'}
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{zone.name}</h3>
                                <p className="text-sm opacity-80">{zone.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getSeverityColor(zone.severity)}>
                                {zone.severity}
                              </Badge>
                              <div className="text-sm mt-1 opacity-80">
                                {formatTimeAgo(zone.lastUpdated)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="font-medium">Estimated Delay</div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {zone.estimatedDelay} minutes
                              </div>
                            </div>
                            <div>
                              <div className="font-medium">Reported By</div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {zone.reporterName || zone.reportedBy}
                              </div>
                            </div>
                            <div>
                              <div className="font-medium">Status</div>
                              <div className="flex items-center gap-1">
                                {zone.verificationStatus === 'verified' ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Eye className="h-4 w-4 text-orange-600" />
                                )}
                                {zone.verificationStatus}
                              </div>
                            </div>
                          </div>

                          {zone.alternativeRoutes.length > 0 && (
                            <div className="mt-3 p-3 bg-white/50 rounded-lg">
                              <div className="font-medium text-sm mb-2">Alternative Routes:</div>
                              <div className="flex flex-wrap gap-2">
                                {zone.alternativeRoutes.map((route, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    <Route className="h-3 w-3 mr-1" />
                                    {route}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Live Reports */}
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Community Traffic Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {state.trafficReports.map((report) => (
                      <div key={report.id} className="p-4 border rounded-lg hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">{getReportTypeIcon(report.type)}</div>
                            <div>
                              <h3 className="font-semibold capitalize">{report.type.replace('-', ' ')}</h3>
                              <p className="text-sm text-muted-foreground">{report.location.address}</p>
                              <p className="text-sm mt-1">{report.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getSeverityColor(report.severity)}>
                              {report.severity}
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              {formatTimeAgo(report.timestamp)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>By {report.reporterName}</span>
                            {report.isVerified && (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                Verified
                              </div>
                            )}
                            <span>{report.verificationCount} confirmations</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleVoteReport(report.id, 'up')}
                              className={report.userVoted === 'up' ? 'bg-green-100' : ''}
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {report.upvotes}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleVoteReport(report.id, 'down')}
                              className={report.userVoted === 'down' ? 'bg-red-100' : ''}
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              {report.downvotes}
                            </Button>
                            {!report.isVerified && (
                              <Button
                                size="sm"
                                onClick={() => handleVerifyReport(report.id)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Verify
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Routes */}
            <TabsContent value="routes">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      AI Route Planner
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="text-sm font-medium">From</label>
                        <Input
                          value={routeRequest.start}
                          onChange={(e) => setRouteRequest({...routeRequest, start: e.target.value})}
                          placeholder="Enter starting location"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">To</label>
                        <Input
                          value={routeRequest.end}
                          onChange={(e) => setRouteRequest({...routeRequest, end: e.target.value})}
                          placeholder="Enter destination"
                        />
                      </div>
                    </div>
                    <Button onClick={handleGetAIRoute} className="w-full mb-6">
                      <Zap className="h-4 w-4 mr-2" />
                      Get AI Recommendation
                    </Button>
                  </CardContent>
                </Card>

                {state.aiRecommendations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Latest AI Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {state.aiRecommendations.map((recommendation) => (
                          <div key={recommendation.id} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold">Route Recommendation</h3>
                              <Badge className="bg-blue-100 text-blue-800">
                                {recommendation.confidence}% confidence
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-4">{recommendation.reasoning}</p>
                            
                            <div className="grid grid-cols-5 gap-4 mb-4">
                              {Object.entries(recommendation.factors).map(([factor, score]) => (
                                <div key={factor} className="text-center">
                                  <div className="text-xs font-medium capitalize mb-1">{factor}</div>
                                  <Progress value={score} className="h-2" />
                                  <div className="text-xs text-muted-foreground mt-1">{score}%</div>
                                </div>
                              ))}
                            </div>

                            {recommendation.warnings.length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-sm font-medium mb-2 text-orange-600">⚠️ Warnings:</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {recommendation.warnings.map((warning, index) => (
                                    <li key={index}>• {warning}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {recommendation.tips.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-2 text-blue-600">💡 Tips:</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {recommendation.tips.map((tip, index) => (
                                    <li key={index}>• {tip}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Nearby Traffic */}
            <TabsContent value="nearby">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Nearby Zones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {state.nearbyZones.map((zone) => (
                        <div key={zone.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-lg">
                              {zone.type === 'green' ? '🟢' : 
                               zone.type === 'black' ? '🔴' : 
                               zone.type === 'yellow' ? '🟡' : '🟠'}
                            </div>
                            <div>
                              <div className="font-medium">{zone.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {zone.estimatedDelay}min delay
                              </div>
                            </div>
                          </div>
                          <Badge className={getSeverityColor(zone.severity)}>
                            {zone.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {state.recentReports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-lg">{getReportTypeIcon(report.type)}</div>
                            <div>
                              <div className="font-medium capitalize">{report.type.replace('-', ' ')}</div>
                              <div className="text-sm text-muted-foreground">
                                {formatTimeAgo(report.timestamp)}
                              </div>
                            </div>
                          </div>
                          <Badge className={getSeverityColor(report.severity)}>
                            {report.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* User Preferences */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Route Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Avoid Tolls</h3>
                        <p className="text-sm text-muted-foreground">
                          Prefer routes without toll roads
                        </p>
                      </div>
                      <Switch
                        checked={state.userPreferences.avoidTolls}
                        onCheckedChange={(checked) => updateUserPreferences({ avoidTolls: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Avoid Highways</h3>
                        <p className="text-sm text-muted-foreground">
                          Use local roads instead of highways
                        </p>
                      </div>
                      <Switch
                        checked={state.userPreferences.avoidHighways}
                        onCheckedChange={(checked) => updateUserPreferences({ avoidHighways: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Prioritize Safety</h3>
                        <p className="text-sm text-muted-foreground">
                          Choose safer routes over faster ones
                        </p>
                      </div>
                      <Switch
                        checked={state.userPreferences.preferSafetyOverSpeed}
                        onCheckedChange={(checked) => updateUserPreferences({ preferSafetyOverSpeed: checked })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Max Detour Time (minutes)</label>
                      <Input
                        type="number"
                        value={state.userPreferences.maxDetourTime}
                        onChange={(e) => updateUserPreferences({ maxDetourTime: parseInt(e.target.value) })}
                        min="0"
                        max="60"
                      />
                      <p className="text-xs text-muted-foreground">
                        Maximum extra time willing to spend to avoid traffic
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Fuel Efficiency Priority</label>
                      <Select 
                        value={state.userPreferences.fuelEfficiencyPriority} 
                        onValueChange={(value: any) => updateUserPreferences({ fuelEfficiencyPriority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Speed over efficiency</SelectItem>
                          <SelectItem value="medium">Medium - Balanced approach</SelectItem>
                          <SelectItem value="high">High - Maximize fuel savings</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium">Notification Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">New traffic reports</span>
                        <Switch
                          checked={state.userPreferences.notificationSettings.newTrafficReports}
                          onCheckedChange={(checked) => updateUserPreferences({
                            notificationSettings: {
                              ...state.userPreferences.notificationSettings,
                              newTrafficReports: checked
                            }
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Route updates</span>
                        <Switch
                          checked={state.userPreferences.notificationSettings.routeUpdates}
                          onCheckedChange={(checked) => updateUserPreferences({
                            notificationSettings: {
                              ...state.userPreferences.notificationSettings,
                              routeUpdates: checked
                            }
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Emergency alerts</span>
                        <Switch
                          checked={state.userPreferences.notificationSettings.emergencyAlerts}
                          onCheckedChange={(checked) => updateUserPreferences({
                            notificationSettings: {
                              ...state.userPreferences.notificationSettings,
                              emergencyAlerts: checked
                            }
                          })}
                        />
                      </div>
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

export default Traffic;
