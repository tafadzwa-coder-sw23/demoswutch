import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Trophy, 
  Target, 
  Brain, 
  Camera, 
  Star, 
  Zap, 
  Users, 
  Crown,
  Medal,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  Play,
  Upload,
  Share2,
  Heart,
  MessageCircle
} from "lucide-react";
import FixedSearchBar from "@/components/FixedSearchBar";
import HeaderControls from "@/components/HeaderControls";
import BudgetPlanner from "@/components/BudgetPlanner";
import { useGamification } from "@/context/GamificationContext";

const Gamification = () => {
  const { state, completeChallenge, completeQuiz, joinContest, submitContest, earnBadge } = useGamification();
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [contestSubmission, setContestSubmission] = useState("");

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'shopping': return '🛒';
      case 'social': return '👥';
      case 'fitness': return '💪';
      case 'learning': return '📚';
      case 'community': return '🏘️';
      default: return '🎯';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return '📅';
      case 'weekly': return '📊';
      case 'monthly': return '🗓️';
      case 'special': return '⭐';
      default: return '🎯';
    }
  };

  const handleQuizStart = (quiz: any) => {
    setSelectedQuiz(quiz);
    setQuizAnswers(new Array(quiz.questions.length).fill(-1));
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const handleQuizSubmit = () => {
    if (!selectedQuiz) return;
    
    let correctAnswers = 0;
    selectedQuiz.questions.forEach((question: any, index: number) => {
      if (quizAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / selectedQuiz.questions.length) * 100);
    completeQuiz(selectedQuiz.id, score);
    setSelectedQuiz(null);
    setQuizAnswers([]);
  };

  const handleContestJoin = (contestId: string) => {
    joinContest(contestId);
  };

  const handleContestSubmit = (contestId: string) => {
    if (contestSubmission.trim()) {
      submitContest(contestId, contestSubmission);
      setContestSubmission("");
    }
  };

  const handleChallengeComplete = (challengeId: string) => {
    completeChallenge(challengeId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Search Bar */}
      <FixedSearchBar
        searchContext="global"
        placeholder="Search challenges, quizzes, contests..."
      />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <HeaderControls />
          </div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-primary bg-primary/10">
              <Trophy className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
              Gamification Hub
            </h1>
            <p className="text-lg text-muted-foreground">
              Complete challenges, take quizzes, and compete in contests
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Budget Planner */}
          <BudgetPlanner />

          {/* User Stats Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-6 w-6" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">Level {state.userStats.level}</div>
                  <div className="text-sm text-muted-foreground">Current Level</div>
                  <Progress 
                    value={(state.userStats.xp / state.userStats.xpToNextLevel) * 100} 
                    className="mt-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {state.userStats.xp} / {state.userStats.xpToNextLevel} XP
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{state.userStats.totalPoints}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{state.userStats.streak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{state.userStats.badges.length}</div>
                  <div className="text-sm text-muted-foreground">Badges Earned</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="challenges" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="contests">Contests</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
            </TabsList>

            {/* Challenges */}
            <TabsContent value="challenges">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.challenges.map((challenge) => (
                  <Card key={challenge.id} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getTypeIcon(challenge.type)}</span>
                          <Badge variant="outline">{challenge.type}</Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-2xl">{getCategoryIcon(challenge.category)}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{challenge.requirements.current} / {challenge.requirements.target}</span>
                          </div>
                          <Progress 
                            value={(challenge.requirements.current / challenge.requirements.target) * 100} 
                            className="h-2"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Zap className="h-4 w-4 text-yellow-500" />
                              <span>{challenge.xp} XP</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-blue-500" />
                              <span>{challenge.points} pts</span>
                            </div>
                          </div>
                          {challenge.isCompleted ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={() => handleChallengeComplete(challenge.id)}
                              disabled={challenge.requirements.current < challenge.requirements.target}
                            >
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Quizzes */}
            <TabsContent value="quizzes">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.quizzes.map((quiz) => (
                  <Card key={quiz.id} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Brain className="h-5 w-5" />
                          <Badge variant="outline">{quiz.difficulty}</Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-2xl">{getCategoryIcon(quiz.category)}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{quiz.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{Math.floor(quiz.timeLimit / 60)} min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-4 w-4" />
                              <span>{quiz.questions.length} questions</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-blue-500" />
                            <span>{quiz.points} pts</span>
                          </div>
                        </div>
                        {quiz.isCompleted ? (
                          <div className="flex items-center justify-between">
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Score: {quiz.score}%
                            </span>
                          </div>
                        ) : (
                          <Button 
                            size="sm" 
                            onClick={() => handleQuizStart(quiz)}
                            className="w-full"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Start Quiz
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Contests */}
            <TabsContent value="contests">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {state.contests.map((contest) => (
                  <Card key={contest.id} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {contest.type === 'photo' ? <Camera className="h-5 w-5" /> : 
                           contest.type === 'video' ? <Play className="h-5 w-5" /> :
                           <Trophy className="h-5 w-5" />}
                          <Badge variant="outline">{contest.type}</Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-2xl">{getCategoryIcon(contest.category)}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{contest.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{contest.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{contest.participants} participants</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{Math.ceil((new Date(contest.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left</span>
                            </div>
                          </div>
                          <div className="text-lg font-bold text-primary">
                            {contest.prize.type === 'cash' ? `$${contest.prize.value}` : 
                             contest.prize.type === 'points' ? `${contest.prize.value} pts` :
                             contest.prize.value}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {contest.isJoined ? (
                            <div className="space-y-2">
                              <Badge className="bg-blue-100 text-blue-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Joined
                              </Badge>
                              {!contest.submission && (
                                <div className="space-y-2">
                                  <Input
                                    placeholder="Enter your submission..."
                                    value={contestSubmission}
                                    onChange={(e) => setContestSubmission(e.target.value)}
                                  />
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleContestSubmit(contest.id)}
                                    className="w-full"
                                  >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Submit
                                  </Button>
                                </div>
                              )}
                              {contest.submission && (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Submitted
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={() => handleContestJoin(contest.id)}
                              className="w-full"
                              disabled={contest.maxParticipants && contest.participants >= contest.maxParticipants}
                            >
                              <Trophy className="h-4 w-4 mr-2" />
                              Join Contest
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Badges */}
            <TabsContent value="badges">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {state.badges.map((badge) => (
                  <Card key={badge.id} className={`relative ${badge.isEarned ? 'ring-2 ring-yellow-400' : ''}`}>
                    <CardHeader className="text-center">
                      <div className="text-6xl mb-2">{badge.icon}</div>
                      <CardTitle className="text-lg">{badge.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge className={getRarityColor(badge.rarity)}>
                          {badge.rarity}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{badge.requirements}</p>
                        {badge.isEarned ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Earned
                          </Badge>
                        ) : (
                          <Badge variant="outline">Not Earned</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Quiz Modal */}
      {selectedQuiz && (
        <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedQuiz.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {selectedQuiz.questions.map((question: any, questionIndex: number) => (
                <div key={question.id} className="space-y-3">
                  <h3 className="font-semibold">{questionIndex + 1}. {question.question}</h3>
                  <div className="space-y-2">
                    {question.options.map((option: string, optionIndex: number) => (
                      <label key={optionIndex} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          checked={quizAnswers[questionIndex] === optionIndex}
                          onChange={() => handleQuizAnswer(questionIndex, optionIndex)}
                          className="w-4 h-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedQuiz(null)}>
                  Cancel
                </Button>
                <Button onClick={handleQuizSubmit}>
                  Submit Quiz
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Gamification;
