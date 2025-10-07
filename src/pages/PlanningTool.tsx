import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  MapPin, 
  Utensils, 
  Video, 
  Link, 
  Plus,
  Clock,
  Star,
  Bookmark,
  Play,
  Route,
  ChefHat,
  Camera,
  FileText,
  CheckCircle,
  Edit,
  Trash2
} from "lucide-react";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";

interface SavedItem {
  id: string;
  type: 'video' | 'recipe' | 'location' | 'activity' | 'link';
  title: string;
  description: string;
  url?: string;
  thumbnail?: string;
  category: string;
  tags: string[];
  savedAt: string;
  isCompleted?: boolean;
  notes?: string;
}

interface Plan {
  id: string;
  type: 'day' | 'meal' | 'journey' | 'event';
  title: string;
  description: string;
  date: string;
  items: SavedItem[];
  status: 'draft' | 'active' | 'completed';
  createdAt: string;
  estimatedDuration?: number;
  budget?: number;
}

const PlanningTool = () => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([
    {
      id: '1',
      type: 'recipe',
      title: 'Sadza and Beef Stew',
      description: 'Traditional Zimbabwean meal recipe',
      category: 'Zimbabwean Cuisine',
      tags: ['traditional', 'dinner', 'family'],
      savedAt: new Date().toISOString(),
      thumbnail: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      type: 'location',
      title: 'Victoria Falls',
      description: 'Must-visit waterfall destination',
      category: 'Tourism',
      tags: ['nature', 'adventure', 'weekend'],
      savedAt: new Date().toISOString(),
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop'
    },
    {
      id: '3',
      type: 'video',
      title: 'Morning Workout Routine',
      description: '30-minute home workout video',
      url: 'https://example.com/workout',
      category: 'Fitness',
      tags: ['exercise', 'morning', 'health'],
      savedAt: new Date().toISOString(),
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
    }
  ]);

  const [plans, setPlans] = useState<Plan[]>([
    {
      id: '1',
      type: 'day',
      title: 'Weekend Adventure Plan',
      description: 'Full day plan for Saturday activities',
      date: '2024-01-20',
      items: [],
      status: 'draft',
      createdAt: new Date().toISOString(),
      estimatedDuration: 480,
      budget: 50
    }
  ]);

  const [newItem, setNewItem] = useState({
    type: 'video' as const,
    title: '',
    description: '',
    url: '',
    category: '',
    tags: ''
  });

  const [newPlan, setNewPlan] = useState({
    type: 'day' as const,
    title: '',
    description: '',
    date: '',
    budget: ''
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'recipe': return <ChefHat className="h-4 w-4" />;
      case 'location': return <MapPin className="h-4 w-4" />;
      case 'activity': return <Calendar className="h-4 w-4" />;
      case 'link': return <Link className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'recipe': return 'bg-green-100 text-green-800';
      case 'location': return 'bg-blue-100 text-blue-800';
      case 'activity': return 'bg-purple-100 text-purple-800';
      case 'link': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanTypeIcon = (type: string) => {
    switch (type) {
      case 'day': return <Calendar className="h-5 w-5" />;
      case 'meal': return <Utensils className="h-5 w-5" />;
      case 'journey': return <Route className="h-5 w-5" />;
      case 'event': return <Star className="h-5 w-5" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };

  const handleSaveItem = () => {
    if (newItem.title && newItem.description) {
      const item: SavedItem = {
        id: Date.now().toString(),
        type: newItem.type,
        title: newItem.title,
        description: newItem.description,
        url: newItem.url || undefined,
        category: newItem.category,
        tags: newItem.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        savedAt: new Date().toISOString(),
        thumbnail: `https://images.unsplash.com/photo-1${Math.floor(Math.random() * 999999999)}?w=300&h=200&fit=crop`
      };
      setSavedItems([item, ...savedItems]);
      setNewItem({
        type: 'video',
        title: '',
        description: '',
        url: '',
        category: '',
        tags: ''
      });
      alert('Item saved successfully!');
    }
  };

  const handleCreatePlan = () => {
    if (newPlan.title && newPlan.date) {
      const plan: Plan = {
        id: Date.now().toString(),
        type: newPlan.type,
        title: newPlan.title,
        description: newPlan.description,
        date: newPlan.date,
        items: [],
        status: 'draft',
        createdAt: new Date().toISOString(),
        budget: newPlan.budget ? parseFloat(newPlan.budget) : undefined
      };
      setPlans([plan, ...plans]);
      setNewPlan({
        type: 'day',
        title: '',
        description: '',
        date: '',
        budget: ''
      });
      alert('Plan created successfully!');
    }
  };

  const handleAddItemToPlan = (planId: string, itemId: string) => {
    const item = savedItems.find(i => i.id === itemId);
    if (item) {
      setPlans(plans.map(plan => 
        plan.id === planId 
          ? { ...plan, items: [...plan.items, item] }
          : plan
      ));
      alert('Item added to plan!');
    }
  };

  const handleToggleItemComplete = (itemId: string) => {
    setSavedItems(savedItems.map(item =>
      item.id === itemId 
        ? { ...item, isCompleted: !item.isCompleted }
        : item
    ));
  };

  const generateMealPlan = () => {
    const mealItems = savedItems.filter(item => item.type === 'recipe');
    if (mealItems.length > 0) {
      const weekPlan: Plan = {
        id: Date.now().toString(),
        type: 'meal',
        title: 'Weekly Meal Plan',
        description: 'Automatically generated meal plan from saved recipes',
        date: new Date().toISOString().split('T')[0],
        items: mealItems.slice(0, 7),
        status: 'draft',
        createdAt: new Date().toISOString(),
        budget: 100
      };
      setPlans([weekPlan, ...plans]);
      alert('Meal plan generated from your saved recipes!');
    } else {
      alert('Save some recipes first to generate a meal plan!');
    }
  };

  const generateJourneyPlan = () => {
    const locationItems = savedItems.filter(item => item.type === 'location');
    if (locationItems.length > 0) {
      const journeyPlan: Plan = {
        id: Date.now().toString(),
        type: 'journey',
        title: 'Weekend Journey',
        description: 'Journey plan from your saved locations',
        date: new Date().toISOString().split('T')[0],
        items: locationItems.slice(0, 5),
        status: 'draft',
        createdAt: new Date().toISOString(),
        estimatedDuration: 720,
        budget: 200
      };
      setPlans([journeyPlan, ...plans]);
      alert('Journey plan generated from your saved locations!');
    } else {
      alert('Save some locations first to generate a journey plan!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar */}
      <FixedSearchBar
        searchContext="global"
        placeholder="Search saved items, plans..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-primary bg-primary/10">
              <Calendar className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Planning Tool
            </h1>
            <p className="text-lg text-muted-foreground">
              Plan your day, meals, and journeys from saved content
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button onClick={generateMealPlan} className="h-20 flex-col">
              <ChefHat className="h-6 w-6 mb-2" />
              Generate Meal Plan
            </Button>
            <Button onClick={generateJourneyPlan} className="h-20 flex-col" variant="outline">
              <Route className="h-6 w-6 mb-2" />
              Generate Journey
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-20 flex-col" variant="outline">
                  <Plus className="h-6 w-6 mb-2" />
                  Save New Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save New Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Select value={newItem.type} onValueChange={(value: any) => setNewItem({...newItem, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">📹 Video</SelectItem>
                      <SelectItem value="recipe">🍳 Recipe</SelectItem>
                      <SelectItem value="location">📍 Location</SelectItem>
                      <SelectItem value="activity">🎯 Activity</SelectItem>
                      <SelectItem value="link">🔗 Link</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  />
                  <Textarea
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  />
                  <Input
                    placeholder="URL (optional)"
                    value={newItem.url}
                    onChange={(e) => setNewItem({...newItem, url: e.target.value})}
                  />
                  <Input
                    placeholder="Category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  />
                  <Input
                    placeholder="Tags (comma separated)"
                    value={newItem.tags}
                    onChange={(e) => setNewItem({...newItem, tags: e.target.value})}
                  />
                  <Button onClick={handleSaveItem} className="w-full">
                    Save Item
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-20 flex-col" variant="outline">
                  <Calendar className="h-6 w-6 mb-2" />
                  Create Plan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Plan</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Select value={newPlan.type} onValueChange={(value: any) => setNewPlan({...newPlan, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">📅 Day Plan</SelectItem>
                      <SelectItem value="meal">🍽️ Meal Plan</SelectItem>
                      <SelectItem value="journey">🗺️ Journey Plan</SelectItem>
                      <SelectItem value="event">🎉 Event Plan</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Plan title"
                    value={newPlan.title}
                    onChange={(e) => setNewPlan({...newPlan, title: e.target.value})}
                  />
                  <Textarea
                    placeholder="Description"
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                  />
                  <Input
                    type="date"
                    value={newPlan.date}
                    onChange={(e) => setNewPlan({...newPlan, date: e.target.value})}
                  />
                  <Input
                    type="number"
                    placeholder="Budget (optional)"
                    value={newPlan.budget}
                    onChange={(e) => setNewPlan({...newPlan, budget: e.target.value})}
                  />
                  <Button onClick={handleCreatePlan} className="w-full">
                    Create Plan
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="saved" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="saved">Saved Items</TabsTrigger>
              <TabsTrigger value="plans">My Plans</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            {/* Saved Items */}
            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bookmark className="h-5 w-5" />
                    Saved Items ({savedItems.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedItems.map((item) => (
                      <Card key={item.id} className="group hover:shadow-lg transition-all">
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getTypeColor(item.type)}>
                              {getTypeIcon(item.type)}
                              <span className="ml-1 capitalize">{item.type}</span>
                            </Badge>
                            {item.isCompleted && (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Done
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.savedAt).toLocaleDateString()}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleToggleItemComplete(item.id)}
                              >
                                {item.isCompleted ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <Clock className="h-4 w-4" />
                                )}
                              </Button>
                              {item.url && (
                                <Button size="sm" variant="outline">
                                  <Play className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Plans */}
            <TabsContent value="plans">
              <div className="space-y-6">
                {plans.map((plan) => (
                  <Card key={plan.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getPlanTypeIcon(plan.type)}
                          <div>
                            <CardTitle className="text-lg">{plan.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{plan.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="capitalize">{plan.status}</Badge>
                          <div className="text-sm text-muted-foreground mt-1">
                            {new Date(plan.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{plan.items.length} items</span>
                        </div>
                        {plan.estimatedDuration && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{Math.floor(plan.estimatedDuration / 60)}h {plan.estimatedDuration % 60}m</span>
                          </div>
                        )}
                        {plan.budget && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Budget: ${plan.budget}</span>
                          </div>
                        )}
                      </div>

                      {plan.items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {plan.items.map((item) => (
                            <div key={item.id} className="p-3 border rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                {getTypeIcon(item.type)}
                                <span className="text-sm font-medium">{item.title}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 border-2 border-dashed rounded-lg">
                          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-4">No items in this plan yet</p>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {savedItems.slice(0, 3).map((item) => (
                              <Button
                                key={item.id}
                                size="sm"
                                variant="outline"
                                onClick={() => handleAddItemToPlan(plan.id, item.id)}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add {item.title}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Templates */}
            <TabsContent value="templates">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <ChefHat className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Weekly Meal Prep</h3>
                    <p className="text-sm text-muted-foreground mb-4">Plan and prep meals for the entire week</p>
                    <Button size="sm">Use Template</Button>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <Route className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Weekend Adventure</h3>
                    <p className="text-sm text-muted-foreground mb-4">Perfect weekend getaway itinerary</p>
                    <Button size="sm">Use Template</Button>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Special Event</h3>
                    <p className="text-sm text-muted-foreground mb-4">Plan birthdays, celebrations, and events</p>
                    <Button size="sm">Use Template</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PlanningTool;
