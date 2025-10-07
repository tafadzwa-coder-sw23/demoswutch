import React, { useState } from "react";
import { Video, Play, Upload, Radio, Heart, MessageCircle, Share, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from "@/components/ui/search-bar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";

const VideoHub = () => {
  const [activeTab, setActiveTab] = useState("trending");

  const mockVideos = [
    {
      id: '1',
      title: 'Amazing Product Demo',
      creator: 'TechReviews ZW',
      views: '12.5K',
      likes: 892,
      comments: 45,
      thumbnail: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=600&fit=crop',
      duration: '5:32',
      category: 'Tech'
    },
    {
      id: '2',
      title: 'Cooking Traditional Sadza',
      creator: 'Mama Grace',
      views: '8.7K',
      likes: 1.2,
      comments: 89,
      thumbnail: 'https://images.unsplash.com/photo-1622979136416-a0217372379c?w=400&h=600&fit=crop',
      duration: '12:15',
      category: 'Food'
    },
    {
      id: '3',
      title: 'Fashion Haul - Local Brands',
      creator: 'Style Zim',
      views: '15.3K',
      likes: 2.1,
      comments: 156,
      thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop',
      duration: '8:45',
      category: 'Fashion'
    },
    {
      id: '4',
      title: 'Home DIY Projects',
      creator: 'DIY Zimbabwe',
      views: '6.2K',
      likes: 456,
      comments: 23,
      thumbnail: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f4c4?w=400&h=600&fit=crop',
      duration: '15:20',
      category: 'DIY'
    },
  ];

  const mockLiveStreams = [
    {
      id: '1',
      title: 'Live: Market Tour',
      creator: 'Swumarket Official',
      viewers: 245,
      thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      title: 'Cooking Live with Chef John',
      creator: 'Chef John ZW',
      viewers: 89,
      thumbnail: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section with Search */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-red-500 bg-red-100">
              <Video className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Video Hub
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover, create, and share amazing content from the Swumarket community
            </p>
          </div>

          <SearchBar
            className="max-w-2xl mx-auto"
            placeholder="Search videos, creators, or topics..."
          />
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="my-videos">My Videos</TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockVideos.map(video => (
                  <Card key={video.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="lg" className="rounded-full">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <Badge className="absolute top-2 left-2" variant="secondary">
                        {video.category}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                      <div className="text-sm text-muted-foreground mb-3">{video.creator}</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{video.views} views</span>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {video.likes > 1000 ? `${(video.likes / 1000).toFixed(1)}K` : video.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {video.comments}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="live" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockLiveStreams.map(stream => (
                  <Card key={stream.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={stream.thumbnail} 
                        alt={stream.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">LIVE</span>
                            <span className="text-xs">{stream.viewers} watching</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{stream.title}</h3>
                      <div className="text-sm text-muted-foreground">{stream.creator}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-6">
              <Card className="p-8 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Upload Your Video</h2>
                <p className="text-muted-foreground mb-6">
                  Share your products, services, or experiences with the Swumarket community
                </p>
                <div className="space-y-4">
                  <Button size="lg" className="mr-4">
                    <Upload className="h-5 w-5 mr-2" />
                    Choose Video File
                  </Button>
                  <Button size="lg" variant="outline">
                    <Radio className="h-5 w-5 mr-2" />
                    Go Live
                  </Button>
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  Supported formats: MP4, MOV, AVI • Max size: 500MB
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="my-videos" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">My Videos</h2>
                <div className="text-center py-12 text-muted-foreground">
                  <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No videos yet</h3>
                  <p className="mb-4">Start creating content to build your audience</p>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Your First Video
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VideoHub;