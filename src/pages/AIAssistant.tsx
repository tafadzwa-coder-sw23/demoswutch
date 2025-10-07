import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bot, Link, MapPin, ShoppingCart, Calendar, Sparkles } from "lucide-react";

interface Inspiration {
  id: string;
  type: 'video' | 'link' | 'recipe' | 'event';
  title: string;
  content: string;
  location?: string;
  category: string;
  createdAt: string;
}

const AIAssistant = () => {
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [newLink, setNewLink] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const mockInspirations: Inspiration[] = [
    {
      id: '1',
      type: 'video',
      title: 'School Tour Video',
      content: 'Amazing school facilities and programs',
      location: 'Harare International School',
      category: 'Education',
      createdAt: '2 days ago'
    },
    {
      id: '2',
      type: 'recipe',
      title: 'Traditional Sadza Recipe',
      content: 'Ingredients: maize meal, water, salt. Method: Boil water, add meal gradually...',
      category: 'Food',
      createdAt: '1 week ago'
    },
    {
      id: '3',
      type: 'event',
      title: 'Tech Conference 2024',
      content: 'Annual technology conference with speakers and workshops',
      location: 'Harare International Conference Centre',
      category: 'Events',
      createdAt: '3 days ago'
    }
  ];

  const addInspiration = () => {
    if (!newLink || !newTitle) return;
    
    const newInspiration: Inspiration = {
      id: Date.now().toString(),
      type: 'link',
      title: newTitle,
      content: newLink,
      category: 'General',
      createdAt: 'Just now'
    };
    
    setInspirations(prev => [newInspiration, ...prev]);
    setNewLink("");
    setNewTitle("");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'link': return '🔗';
      case 'recipe': return '👨‍🍳';
      case 'event': return '📅';
      default: return '📝';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'link': return 'bg-blue-100 text-blue-800';
      case 'recipe': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const allInspirations = [...inspirations, ...mockInspirations];

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground">Turn social media inspiration into actionable plans</p>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Add New Inspiration */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Add Inspiration</h3>
            <div className="space-y-4">
              <Input
                placeholder="Title (e.g., 'Amazing School Video')"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Textarea
                placeholder="Paste link, video URL, or describe your inspiration..."
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                rows={3}
              />
              <Button onClick={addInspiration} className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Add to Collection
              </Button>
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-sm text-muted-foreground">Nearby Locations</div>
                <div className="text-lg font-semibold">3 found</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-sm text-muted-foreground">Related Products</div>
                <div className="text-lg font-semibold">12 available</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <div className="text-sm text-muted-foreground">Upcoming Events</div>
                <div className="text-lg font-semibold">2 scheduled</div>
              </div>
            </div>
          </Card>

          {/* Saved Inspirations */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Your Inspirations</h3>
            <div className="space-y-4">
              {allInspirations.map(inspiration => (
                <div key={inspiration.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="text-2xl">{getTypeIcon(inspiration.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{inspiration.title}</h4>
                      <Badge className={getTypeColor(inspiration.type)}>
                        {inspiration.type}
                      </Badge>
                      <Badge variant="outline">{inspiration.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{inspiration.content}</p>
                    {inspiration.location && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {inspiration.location}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground mt-2">
                      Added {inspiration.createdAt}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      Find Nearby
                    </Button>
                    <Button variant="outline" size="sm">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Shop Related
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
