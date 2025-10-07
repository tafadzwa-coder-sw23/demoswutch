import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dumbbell, 
  Trophy, 
  Target, 
  Play, 
  Pause, 
  Timer, 
  Flame, 
  Zap, 
  Users, 
  Crown,
  Medal,
  Calendar,
  TrendingUp,
  Heart,
  Activity,
  CheckCircle,
  Lock,
  Unlock,
  Star,
  BarChart3,
  Clock
} from "lucide-react";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useFitnessGaming } from "@/context/FitnessGamingContext";

const FitnessGaming = () => {
  const { 
    state, 
    joinChallenge, 
    startWorkout, 
    startActivity, 
    completeActivity,
    unlockGame
  } = useFitnessGaming();

  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [sessionData, setSessionData] = useState({
    duration: 0,
    calories: 0,
    mood: 'good',
    notes: ''
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': case 'easy': return 'bg-green-100 text-green-800';
      case 'intermediate': case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cardio': return '🏃';
      case 'strength': return '💪';
      case 'flexibility': return '🧘';
      case 'balance': return '⚖️';
      case 'sports': return '⚽';
      case 'dance': return '💃';
      case 'outdoor': return '🌳';
      default: return '🏋️';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weight-loss': return '📉';
      case 'muscle-gain': return '💪';
      case 'endurance': return '🏃';
      case 'flexibility': return '🧘';
      case 'general': return '🎯';
      default: return '🏋️';
    }
  };

  const handleStartActivity = (activity: any) => {
    startActivity(activity);
    setActiveTimer(Date.now());
    setTimerSeconds(0);
    
    // Start timer
    const interval = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    
    // Store interval ID for cleanup
    (window as any).fitnessTimer = interval;
  };

  const handleCompleteActivity = () => {
    if (activeTimer) {
      const duration = Math.floor((Date.now() - activeTimer) / 1000 / 60); // minutes
      const estimatedCalories = duration * 5; // rough estimate
      
      completeActivity(duration, estimatedCalories, sessionData.mood, sessionData.notes);
      
      // Clear timer
      if ((window as any).fitnessTimer) {
        clearInterval((window as any).fitnessTimer);
      }
      
      setActiveTimer(null);
      setTimerSeconds(0);
      setSessionData({ duration: 0, calories: 0, mood: 'good', notes: '' });
    }
  };

  const handleJoinChallenge = (challengeId: string) => {
    joinChallenge(challengeId);
  };

  const handleStartWorkout = (planId: string) => {
    startWorkout(planId);
  };

  const handleUnlockGame = (gameId: string) => {
    unlockGame(gameId);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar */}
      <FixedSearchBar
        searchContext="global"
        placeholder="Search fitness activities, challenges..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-primary bg-primary/10">
              <Dumbbell className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Fitness Gaming
            </h1>
            <p className="text-lg text-muted-foreground">
              Turn fitness into a fun, rewarding game
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          {/* Stats Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                Your Fitness Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Level {state.stats.level}</div>
                  <div className="text-sm text-muted-foreground">Fitness Level</div>
                  <Progress 
                    value={(state.stats.xp / state.stats.xpToNextLevel) * 100} 
                    className="mt-1 h-2"
                  />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{state.stats.totalPoints}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{state.stats.totalCalories}</div>
                  <div className="text-sm text-muted-foreground">Calories Burned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{formatDuration(state.stats.totalMinutes)}</div>
                  <div className="text-sm text-muted-foreground">Total Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{state.stats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{state.stats.totalSessions}</div>
                  <div className="text-sm text-muted-foreground">Sessions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Workout Timer */}
          {activeTimer && (
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-6 w-6" />
                  Active Workout: {state.currentActivity?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold text-primary">
                    {formatTime(timerSeconds)}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCompleteActivity}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Workout
                    </Button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">How do you feel?</label>
                    <Select value={sessionData.mood} onValueChange={(value) => setSessionData({...sessionData, mood: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="great">😄 Great</SelectItem>
                        <SelectItem value="good">😊 Good</SelectItem>
                        <SelectItem value="okay">😐 Okay</SelectItem>
                        <SelectItem value="tired">😴 Tired</SelectItem>
                        <SelectItem value="exhausted">😵 Exhausted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Notes (optional)</label>
                    <Input
                      placeholder="How was your workout?"
                      value={sessionData.notes}
                      onChange={(e) => setSessionData({...sessionData, notes: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="activities" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="workouts">Workout Plans</TabsTrigger>
              <TabsTrigger value="games">Fitness Games</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            {/* Activities Tab */}
            <TabsContent value="activities">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.activities.map((activity) => (
                  <Card key={activity.id} className="group hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="aspect-video overflow-hidden rounded-lg mb-4">
                        <img
                          src={activity.imageUrl}
                          alt={activity.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getTypeIcon(activity.type)}</span>
                          <Badge className={getDifficultyColor(activity.difficulty)}>
                            {activity.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {activity.duration}m
                        </div>
                      </div>
                      <CardTitle className="text-lg">{activity.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Flame className="h-4 w-4 text-red-500" />
                              <span>{activity.calories} cal</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{activity.points} pts</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Zap className="h-4 w-4 text-blue-500" />
                              <span>{activity.xp} XP</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Equipment needed:</div>
                          <div className="flex flex-wrap gap-1">
                            {activity.equipment.map((item) => (
                              <Badge key={item} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleStartActivity(activity)}
                          className="w-full"
                          disabled={!!activeTimer}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start Activity
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Challenges Tab */}
            <TabsContent value="challenges">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {state.challenges.map((challenge) => (
                  <Card key={challenge.id} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          <Badge variant="outline">{challenge.type}</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {challenge.participants}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{challenge.current} / {challenge.target} {challenge.unit}</span>
                          </div>
                          <Progress 
                            value={(challenge.current / challenge.target) * 100} 
                            className="h-3"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <div className="font-medium">Reward:</div>
                            <div className="text-muted-foreground">{challenge.reward.description}</div>
                          </div>
                          {challenge.isCompleted ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          ) : challenge.isJoined ? (
                            <Badge className="bg-blue-100 text-blue-800">
                              <Activity className="h-3 w-3 mr-1" />
                              Joined
                            </Badge>
                          ) : (
                            <Button 
                              size="sm"
                              onClick={() => handleJoinChallenge(challenge.id)}
                            >
                              Join Challenge
                            </Button>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Ends: {new Date(challenge.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Workout Plans Tab */}
            <TabsContent value="workouts">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.workoutPlans.map((plan) => (
                  <Card key={plan.id} className={`relative ${!plan.isUnlocked ? 'opacity-60' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getCategoryIcon(plan.category)}</span>
                          <Badge className={getDifficultyColor(plan.level)}>
                            {plan.level}
                          </Badge>
                          {plan.isPremium && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Crown className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                        {!plan.isUnlocked && (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium">Duration</div>
                            <div className="text-muted-foreground">{plan.duration} weeks</div>
                          </div>
                          <div>
                            <div className="font-medium">Frequency</div>
                            <div className="text-muted-foreground">{plan.daysPerWeek} days/week</div>
                          </div>
                        </div>
                        {plan.progress > 0 && (
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{plan.completedDays} / {plan.totalDays} days</span>
                            </div>
                            <Progress value={plan.progress} className="h-2" />
                          </div>
                        )}
                        <div className="text-sm">
                          <div className="font-medium mb-1">Activities included:</div>
                          <div className="text-muted-foreground">
                            {plan.activities.slice(0, 3).map(a => a.name).join(', ')}
                            {plan.activities.length > 3 && ` +${plan.activities.length - 3} more`}
                          </div>
                        </div>
                        {plan.isUnlocked ? (
                          <Button 
                            onClick={() => handleStartWorkout(plan.id)}
                            className="w-full"
                            disabled={!!state.activeWorkout}
                          >
                            {state.activeWorkout?.id === plan.id ? (
                              <>
                                <Activity className="h-4 w-4 mr-2" />
                                Active Plan
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Start Plan
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full" disabled>
                            <Lock className="h-4 w-4 mr-2" />
                            Locked
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Fitness Games Tab */}
            <TabsContent value="games">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.games.map((game) => (
                  <Card key={game.id} className={`relative ${!game.isUnlocked ? 'opacity-60' : ''}`}>
                    <CardHeader>
                      <div className="aspect-video overflow-hidden rounded-lg mb-4">
                        <img
                          src={game.imageUrl}
                          alt={game.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{game.type}</Badge>
                          <Badge className={getDifficultyColor(game.difficulty)}>
                            {game.difficulty}
                          </Badge>
                        </div>
                        {!game.isUnlocked && (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{game.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{game.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium">Duration</div>
                            <div className="text-muted-foreground">{game.duration} min</div>
                          </div>
                          <div>
                            <div className="font-medium">Players</div>
                            <div className="text-muted-foreground">
                              {game.minPlayers === game.maxPlayers 
                                ? game.minPlayers 
                                : `${game.minPlayers}-${game.maxPlayers}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{game.points} pts</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Zap className="h-4 w-4 text-blue-500" />
                              <span>{game.xp} XP</span>
                            </div>
                          </div>
                          {game.isMultiplayer && (
                            <Badge variant="outline">Multiplayer</Badge>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Equipment needed:</div>
                          <div className="flex flex-wrap gap-1">
                            {game.equipment.map((item) => (
                              <Badge key={item} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {game.isUnlocked ? (
                          <Button className="w-full">
                            <Play className="h-4 w-4 mr-2" />
                            Play Game
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleUnlockGame(game.id)}
                          >
                            <Unlock className="h-4 w-4 mr-2" />
                            Unlock (Level {state.stats.level + 5} required)
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-6 w-6" />
                    Fitness Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {state.leaderboard.map((user) => (
                      <div 
                        key={user.id} 
                        className={`flex items-center justify-between p-4 border rounded-lg ${
                          user.isCurrentUser ? 'bg-primary/5 border-primary' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            user.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                            user.rank === 2 ? 'bg-gray-100 text-gray-800' :
                            user.rank === 3 ? 'bg-orange-100 text-orange-800' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {user.rank <= 3 ? (
                              user.rank === 1 ? '🥇' :
                              user.rank === 2 ? '🥈' : '🥉'
                            ) : (
                              user.rank
                            )}
                          </div>
                          <div className="text-2xl">{user.avatar}</div>
                          <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Level {user.level} • {user.streak} day streak
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{user.points} pts</div>
                          <div className="text-sm text-muted-foreground">Total Points</div>
                        </div>
                      </div>
                    ))}
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

export default FitnessGaming;
