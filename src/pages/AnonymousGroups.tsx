import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Shield, 
  MessageCircle, 
  Calendar, 
  Heart, 
  BarChart3,
  Plus,
  Send,
  Eye,
  EyeOff,
  Church,
  HandHeart,
  BookOpen,
  Leaf,
  UserCheck,
  Clock,
  MapPin,
  Vote,
  Smile,
  ThumbsUp
} from "lucide-react";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useAnonymousGroups } from "@/context/AnonymousGroupsContext";

const AnonymousGroups = () => {
  const { 
    state, 
    joinGroup, 
    leaveGroup, 
    loadMessages, 
    sendMessage, 
    addReaction,
    loadEvents,
    attendEvent,
    loadPrayerRequests,
    createPrayerRequest,
    prayForRequest,
    loadPolls,
    votePoll
  } = useAnonymousGroups();

  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("messages");
  const [newMessage, setNewMessage] = useState("");
  const [newPrayerRequest, setNewPrayerRequest] = useState({
    title: "",
    description: "",
    category: "spiritual" as const,
    isAnonymous: true
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'church': return <Church className="h-5 w-5" />;
      case 'support': return <HandHeart className="h-5 w-5" />;
      case 'study': return <BookOpen className="h-5 w-5" />;
      case 'community': return <Users className="h-5 w-5" />;
      case 'charity': return <Heart className="h-5 w-5" />;
      default: return <Users className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'church': return 'bg-blue-100 text-blue-800';
      case 'support': return 'bg-green-100 text-green-800';
      case 'study': return 'bg-purple-100 text-purple-800';
      case 'community': return 'bg-orange-100 text-orange-800';
      case 'charity': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAnonymityColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleJoinGroup = (groupId: string) => {
    joinGroup(groupId);
  };

  const handleLeaveGroup = (groupId: string) => {
    leaveGroup(groupId);
  };

  const handleGroupSelect = (group: any) => {
    setSelectedGroup(group);
    loadMessages(group.id);
    loadEvents(group.id);
    loadPrayerRequests(group.id);
    loadPolls(group.id);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedGroup) {
      sendMessage(selectedGroup.id, newMessage);
      setNewMessage("");
    }
  };

  const handleCreatePrayerRequest = () => {
    if (newPrayerRequest.title.trim() && selectedGroup) {
      createPrayerRequest({
        ...newPrayerRequest,
        groupId: selectedGroup.id,
        status: 'active' as const
      });
      setNewPrayerRequest({
        title: "",
        description: "",
        category: "spiritual",
        isAnonymous: true
      });
    }
  };

  const handlePrayForRequest = (requestId: string) => {
    prayForRequest(requestId);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    addReaction(messageId, emoji);
  };

  const handleVotePoll = (pollId: string, optionId: string) => {
    votePoll(pollId, optionId);
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
        placeholder="Search anonymous groups..."
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
              Anonymous Groups
            </h1>
            <p className="text-lg text-muted-foreground">
              Join safe, anonymous communities for support and fellowship
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Badge variant="outline" className="bg-green-50">
                <Shield className="h-3 w-3 mr-1" />
                Your identity: {state.userAlias}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Groups List */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Available Groups
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {state.groups.map((group) => (
                    <div 
                      key={group.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedGroup?.id === group.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleGroupSelect(group)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-1 rounded ${getCategoryColor(group.category)}`}>
                            {getCategoryIcon(group.category)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">{group.name}</h3>
                            <p className="text-xs text-muted-foreground">{group.memberCount} members</p>
                          </div>
                        </div>
                        <Badge className={getAnonymityColor(group.anonymityLevel)}>
                          {group.anonymityLevel === 'high' ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                          {group.anonymityLevel}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{group.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {group.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(group.lastActivity)}
                        </span>
                        {group.isJoined ? (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLeaveGroup(group.id);
                            }}
                          >
                            Leave
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleJoinGroup(group.id);
                            }}
                          >
                            Join
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Group Details */}
            <div className="lg:col-span-2">
              {selectedGroup ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${getCategoryColor(selectedGroup.category)}`}>
                          {getCategoryIcon(selectedGroup.category)}
                        </div>
                        <div>
                          <CardTitle>{selectedGroup.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{selectedGroup.description}</p>
                        </div>
                      </div>
                      <Badge className={getAnonymityColor(selectedGroup.anonymityLevel)}>
                        {selectedGroup.anonymityLevel === 'high' ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                        {selectedGroup.anonymityLevel} anonymity
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="messages">Messages</TabsTrigger>
                        <TabsTrigger value="prayers">Prayers</TabsTrigger>
                        <TabsTrigger value="events">Events</TabsTrigger>
                        <TabsTrigger value="polls">Polls</TabsTrigger>
                      </TabsList>

                      {/* Messages Tab */}
                      <TabsContent value="messages" className="space-y-4">
                        <div className="h-96 overflow-y-auto space-y-3 p-4 border rounded-lg bg-muted/20">
                          {state.messages[selectedGroup.id]?.map((message) => (
                            <div key={message.id} className="bg-background p-3 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-semibold">
                                      {message.senderAlias.split(' ')[0][0]}
                                    </span>
                                  </div>
                                  <span className="text-sm font-medium">{message.senderAlias}</span>
                                  {message.type === 'announcement' && (
                                    <Badge variant="outline" className="text-xs">📢 Announcement</Badge>
                                  )}
                                  {message.type === 'prayer-request' && (
                                    <Badge variant="outline" className="text-xs">🙏 Prayer Request</Badge>
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimeAgo(message.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm mb-3">{message.content}</p>
                              <div className="flex items-center gap-2">
                                {message.reactions.map((reaction) => (
                                  <Button
                                    key={reaction.emoji}
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 px-2"
                                    onClick={() => handleReaction(message.id, reaction.emoji)}
                                  >
                                    <span className="text-sm">{reaction.emoji}</span>
                                    <span className="text-xs ml-1">{reaction.count}</span>
                                  </Button>
                                ))}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2"
                                  onClick={() => handleReaction(message.id, '🙏')}
                                >
                                  <span className="text-sm">🙏</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2"
                                  onClick={() => handleReaction(message.id, '❤️')}
                                >
                                  <span className="text-sm">❤️</span>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        {selectedGroup.isJoined && (
                          <div className="flex gap-2">
                            <Input
                              placeholder="Type your message..."
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <Button onClick={handleSendMessage}>
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TabsContent>

                      {/* Prayer Requests Tab */}
                      <TabsContent value="prayers" className="space-y-4">
                        {selectedGroup.isJoined && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full">
                                <Plus className="h-4 w-4 mr-2" />
                                Share Prayer Request
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Share Prayer Request</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Title</label>
                                  <Input
                                    value={newPrayerRequest.title}
                                    onChange={(e) => setNewPrayerRequest({...newPrayerRequest, title: e.target.value})}
                                    placeholder="Brief title for your request"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Description</label>
                                  <Textarea
                                    value={newPrayerRequest.description}
                                    onChange={(e) => setNewPrayerRequest({...newPrayerRequest, description: e.target.value})}
                                    placeholder="Share more details about your prayer request"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Category</label>
                                  <Select value={newPrayerRequest.category} onValueChange={(value: any) => setNewPrayerRequest({...newPrayerRequest, category: value})}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="health">Health</SelectItem>
                                      <SelectItem value="family">Family</SelectItem>
                                      <SelectItem value="work">Work</SelectItem>
                                      <SelectItem value="spiritual">Spiritual</SelectItem>
                                      <SelectItem value="community">Community</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button onClick={handleCreatePrayerRequest} className="w-full">
                                  Share Request
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        <div className="space-y-4">
                          {state.prayerRequests.map((request) => (
                            <div key={request.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{request.category}</Badge>
                                  <span className="text-sm text-muted-foreground">
                                    by {request.requesterAlias}
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimeAgo(request.timestamp)}
                                </span>
                              </div>
                              <h3 className="font-semibold mb-2">{request.title}</h3>
                              <p className="text-sm text-muted-foreground mb-3">{request.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-muted-foreground">
                                    {request.prayerCount} people praying
                                  </span>
                                  <Badge className={
                                    request.status === 'active' ? 'bg-green-100 text-green-800' :
                                    request.status === 'answered' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                  }>
                                    {request.status}
                                  </Badge>
                                </div>
                                {!request.userPrayed && selectedGroup.isJoined && (
                                  <Button 
                                    size="sm"
                                    onClick={() => handlePrayForRequest(request.id)}
                                  >
                                    <Heart className="h-4 w-4 mr-1" />
                                    Pray
                                  </Button>
                                )}
                                {request.userPrayed && (
                                  <Badge className="bg-blue-100 text-blue-800">
                                    <Heart className="h-3 w-3 mr-1" />
                                    Praying
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      {/* Events Tab */}
                      <TabsContent value="events" className="space-y-4">
                        <div className="space-y-4">
                          {state.events.map((event) => (
                            <div key={event.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <Badge variant="outline">{event.type}</Badge>
                                  {event.isAnonymous && (
                                    <Badge variant="outline" className="bg-orange-100 text-orange-800">
                                      <EyeOff className="h-3 w-3 mr-1" />
                                      Anonymous
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {event.attendees} attending
                                </span>
                              </div>
                              <h3 className="font-semibold mb-2">{event.title}</h3>
                              <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(event.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {event.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {event.location}
                                </div>
                              </div>
                              {!event.isAttending && selectedGroup.isJoined && (
                                <Button 
                                  size="sm"
                                  onClick={() => attendEvent(event.id)}
                                >
                                  <UserCheck className="h-4 w-4 mr-1" />
                                  Attend
                                </Button>
                              )}
                              {event.isAttending && (
                                <Badge className="bg-green-100 text-green-800">
                                  <UserCheck className="h-3 w-3 mr-1" />
                                  Attending
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      {/* Polls Tab */}
                      <TabsContent value="polls" className="space-y-4">
                        <div className="space-y-4">
                          {state.polls.map((poll) => (
                            <div key={poll.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <Vote className="h-4 w-4" />
                                  <span className="text-sm text-muted-foreground">
                                    {poll.totalVotes} votes
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  Expires {formatTimeAgo(poll.expiresAt)}
                                </span>
                              </div>
                              <h3 className="font-semibold mb-4">{poll.question}</h3>
                              <div className="space-y-2">
                                {poll.options.map((option) => (
                                  <div key={option.id} className="flex items-center justify-between">
                                    <Button
                                      variant={option.userVoted ? "default" : "outline"}
                                      size="sm"
                                      className="flex-1 justify-start"
                                      onClick={() => !option.userVoted && handleVotePoll(poll.id, option.id)}
                                      disabled={option.userVoted}
                                    >
                                      <span>{option.text}</span>
                                      {option.userVoted && <ThumbsUp className="h-3 w-3 ml-2" />}
                                    </Button>
                                    <span className="text-sm text-muted-foreground ml-2">
                                      {option.votes}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Select a Group</h3>
                      <p className="text-muted-foreground">
                        Choose a group from the list to view messages, events, and more
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonymousGroups;
