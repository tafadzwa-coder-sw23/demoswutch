import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Gamification Types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  category: 'shopping' | 'social' | 'fitness' | 'learning' | 'community';
  points: number;
  xp: number;
  requirements: {
    type: 'purchase' | 'visit' | 'share' | 'review' | 'referral' | 'streak' | 'custom';
    target: number;
    current: number;
    description: string;
  };
  reward: {
    type: 'points' | 'discount' | 'badge' | 'unlock' | 'currency';
    value: number | string;
    description: string;
  };
  isCompleted: boolean;
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: 'marketplace' | 'safety' | 'finance' | 'community' | 'general';
  questions: QuizQuestion[];
  points: number;
  xp: number;
  timeLimit: number; // in seconds
  difficulty: 'easy' | 'medium' | 'hard';
  isCompleted: boolean;
  score?: number;
  completedAt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  type: 'photo' | 'video' | 'review' | 'referral' | 'creative';
  category: 'shopping' | 'community' | 'fitness' | 'learning';
  prize: {
    type: 'cash' | 'points' | 'product' | 'discount' | 'badge';
    value: number | string;
    description: string;
  };
  participants: number;
  maxParticipants?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isJoined: boolean;
  submission?: string;
  rank?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'shopping' | 'social' | 'fitness' | 'learning' | 'community';
  isEarned: boolean;
  earnedAt?: string;
  requirements: string;
}

export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalPoints: number;
  streak: number;
  badges: Badge[];
  challengesCompleted: number;
  quizzesCompleted: number;
  contestsWon: number;
  rank: number;
  achievements: string[];
}

interface GamificationState {
  challenges: Challenge[];
  quizzes: Quiz[];
  contests: Contest[];
  badges: Badge[];
  userStats: UserStats;
  leaderboard: Array<{
    id: string;
    name: string;
    avatar: string;
    level: number;
    xp: number;
    rank: number;
  }>;
  isLoading: boolean;
  error: string | null;
}

type GamificationAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CHALLENGES'; payload: Challenge[] }
  | { type: 'UPDATE_CHALLENGE'; payload: Challenge }
  | { type: 'COMPLETE_CHALLENGE'; payload: string }
  | { type: 'SET_QUIZZES'; payload: Quiz[] }
  | { type: 'COMPLETE_QUIZ'; payload: { id: string; score: number } }
  | { type: 'SET_CONTESTS'; payload: Contest[] }
  | { type: 'JOIN_CONTEST'; payload: string }
  | { type: 'SUBMIT_CONTEST'; payload: { id: string; submission: string } }
  | { type: 'SET_BADGES'; payload: Badge[] }
  | { type: 'EARN_BADGE'; payload: string }
  | { type: 'SET_USER_STATS'; payload: UserStats }
  | { type: 'UPDATE_USER_STATS'; payload: Partial<UserStats> }
  | { type: 'SET_LEADERBOARD'; payload: Array<{ id: string; name: string; avatar: string; level: number; xp: number; rank: number }> };

const initialState: GamificationState = {
  challenges: [],
  quizzes: [],
  contests: [],
  badges: [],
  userStats: {
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    totalPoints: 0,
    streak: 0,
    badges: [],
    challengesCompleted: 0,
    quizzesCompleted: 0,
    contestsWon: 0,
    rank: 0,
    achievements: []
  },
  leaderboard: [],
  isLoading: false,
  error: null,
};

const gamificationReducer = (state: GamificationState, action: GamificationAction): GamificationState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_CHALLENGES':
      return { ...state, challenges: action.payload };
    case 'UPDATE_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.map(challenge =>
          challenge.id === action.payload.id ? action.payload : challenge
        )
      };
    case 'COMPLETE_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.map(challenge =>
          challenge.id === action.payload ? { ...challenge, isCompleted: true } : challenge
        ),
        userStats: {
          ...state.userStats,
          challengesCompleted: state.userStats.challengesCompleted + 1,
          xp: state.userStats.xp + (state.challenges.find(c => c.id === action.payload)?.xp || 0),
          totalPoints: state.userStats.totalPoints + (state.challenges.find(c => c.id === action.payload)?.points || 0)
        }
      };
    case 'SET_QUIZZES':
      return { ...state, quizzes: action.payload };
    case 'COMPLETE_QUIZ':
      return {
        ...state,
        quizzes: state.quizzes.map(quiz =>
          quiz.id === action.payload.id 
            ? { ...quiz, isCompleted: true, score: action.payload.score, completedAt: new Date().toISOString() }
            : quiz
        ),
        userStats: {
          ...state.userStats,
          quizzesCompleted: state.userStats.quizzesCompleted + 1,
          xp: state.userStats.xp + (state.quizzes.find(q => q.id === action.payload.id)?.xp || 0),
          totalPoints: state.userStats.totalPoints + (state.quizzes.find(q => q.id === action.payload.id)?.points || 0)
        }
      };
    case 'SET_CONTESTS':
      return { ...state, contests: action.payload };
    case 'JOIN_CONTEST':
      return {
        ...state,
        contests: state.contests.map(contest =>
          contest.id === action.payload ? { ...contest, isJoined: true, participants: contest.participants + 1 } : contest
        )
      };
    case 'SUBMIT_CONTEST':
      return {
        ...state,
        contests: state.contests.map(contest =>
          contest.id === action.payload.id ? { ...contest, submission: action.payload.submission } : contest
        )
      };
    case 'SET_BADGES':
      return { ...state, badges: action.payload };
    case 'EARN_BADGE':
      return {
        ...state,
        badges: state.badges.map(badge =>
          badge.id === action.payload ? { ...badge, isEarned: true, earnedAt: new Date().toISOString() } : badge
        ),
        userStats: {
          ...state.userStats,
          badges: state.userStats.badges.map(badge =>
            badge.id === action.payload ? { ...badge, isEarned: true, earnedAt: new Date().toISOString() } : badge
          )
        }
      };
    case 'SET_USER_STATS':
      return { ...state, userStats: action.payload };
    case 'UPDATE_USER_STATS':
      return { ...state, userStats: { ...state.userStats, ...action.payload } };
    case 'SET_LEADERBOARD':
      return { ...state, leaderboard: action.payload };
    default:
      return state;
  }
};

const GamificationContext = createContext<{
  state: GamificationState;
  dispatch: React.Dispatch<GamificationAction>;
  // Actions
  loadChallenges: () => Promise<void>;
  updateChallengeProgress: (challengeId: string, progress: number) => Promise<void>;
  completeChallenge: (challengeId: string) => Promise<void>;
  loadQuizzes: () => Promise<void>;
  completeQuiz: (quizId: string, score: number) => Promise<void>;
  loadContests: () => Promise<void>;
  joinContest: (contestId: string) => Promise<void>;
  submitContest: (contestId: string, submission: string) => Promise<void>;
  loadBadges: () => Promise<void>;
  earnBadge: (badgeId: string) => Promise<void>;
  loadUserStats: () => Promise<void>;
  loadLeaderboard: () => Promise<void>;
  checkLevelUp: () => void;
} | null>(null);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gamificationReducer, initialState);

  // Load challenges
  const loadChallenges = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Mock challenges
      const challenges: Challenge[] = [
        {
          id: '1',
          title: 'First Purchase',
          description: 'Make your first purchase on Swumarket',
          type: 'daily',
          category: 'shopping',
          points: 50,
          xp: 25,
          requirements: {
            type: 'purchase',
            target: 1,
            current: 0,
            description: 'Complete 1 purchase'
          },
          reward: {
            type: 'points',
            value: 50,
            description: 'Earn 50 points'
          },
          isCompleted: false,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Social Butterfly',
          description: 'Share 3 products with friends',
          type: 'weekly',
          category: 'social',
          points: 100,
          xp: 50,
          requirements: {
            type: 'share',
            target: 3,
            current: 0,
            description: 'Share 3 products'
          },
          reward: {
            type: 'badge',
            value: 'Social Butterfly',
            description: 'Unlock Social Butterfly badge'
          },
          isCompleted: false,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Review Master',
          description: 'Write 5 product reviews',
          type: 'monthly',
          category: 'community',
          points: 200,
          xp: 100,
          requirements: {
            type: 'review',
            target: 5,
            current: 0,
            description: 'Write 5 reviews'
          },
          reward: {
            type: 'discount',
            value: 10,
            description: 'Get 10% discount on next purchase'
          },
          isCompleted: false,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Fitness Streak',
          description: 'Complete 7 days of fitness activities',
          type: 'weekly',
          category: 'fitness',
          points: 150,
          xp: 75,
          requirements: {
            type: 'streak',
            target: 7,
            current: 0,
            description: '7-day fitness streak'
          },
          reward: {
            type: 'unlock',
            value: 'Premium Workout Plans',
            description: 'Unlock premium workout plans'
          },
          isCompleted: false,
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ];
      dispatch({ type: 'SET_CHALLENGES', payload: challenges });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load challenges' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Update challenge progress
  const updateChallengeProgress = async (challengeId: string, progress: number) => {
    const challenge = state.challenges.find(c => c.id === challengeId);
    if (challenge) {
      const updatedChallenge = {
        ...challenge,
        requirements: {
          ...challenge.requirements,
          current: Math.min(progress, challenge.requirements.target)
        }
      };
      dispatch({ type: 'UPDATE_CHALLENGE', payload: updatedChallenge });
      
      // Check if challenge is completed
      if (updatedChallenge.requirements.current >= updatedChallenge.requirements.target) {
        await completeChallenge(challengeId);
      }
    }
  };

  // Complete challenge
  const completeChallenge = async (challengeId: string) => {
    dispatch({ type: 'COMPLETE_CHALLENGE', payload: challengeId });
    checkLevelUp();
  };

  // Load quizzes
  const loadQuizzes = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const quizzes: Quiz[] = [
        {
          id: '1',
          title: 'Marketplace Safety Quiz',
          description: 'Test your knowledge about safe shopping practices',
          category: 'safety',
          questions: [
            {
              id: '1',
              question: 'What should you do before meeting a seller in person?',
              options: [
                'Meet in a public place',
                'Meet at their home',
                'Meet in a dark alley',
                'Meet without telling anyone'
              ],
              correctAnswer: 0,
              explanation: 'Always meet in a public place for safety.'
            },
            {
              id: '2',
              question: 'When is it safe to pay before receiving the item?',
              options: [
                'Always',
                'Never',
                'Only for small amounts',
                'Only for digital items'
              ],
              correctAnswer: 1,
              explanation: 'Never pay before receiving the item to avoid scams.'
            }
          ],
          points: 100,
          xp: 50,
          timeLimit: 300,
          difficulty: 'easy',
          isCompleted: false
        },
        {
          id: '2',
          title: 'Financial Literacy Quiz',
          description: 'Test your knowledge about money management',
          category: 'finance',
          questions: [
            {
              id: '1',
              question: 'What is the best way to track your expenses?',
              options: [
                'Keep receipts in a shoebox',
                'Use a budgeting app',
                'Remember everything',
                'Ask your friends'
              ],
              correctAnswer: 1,
              explanation: 'Using a budgeting app helps you track expenses systematically.'
            }
          ],
          points: 150,
          xp: 75,
          timeLimit: 600,
          difficulty: 'medium',
          isCompleted: false
        }
      ];
      dispatch({ type: 'SET_QUIZZES', payload: quizzes });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load quizzes' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Complete quiz
  const completeQuiz = async (quizId: string, score: number) => {
    dispatch({ type: 'COMPLETE_QUIZ', payload: { id: quizId, score } });
    checkLevelUp();
  };

  // Load contests
  const loadContests = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const contests: Contest[] = [
        {
          id: '1',
          title: 'Best Product Photo Contest',
          description: 'Share your best product photos for a chance to win',
          type: 'photo',
          category: 'shopping',
          prize: {
            type: 'cash',
            value: 100,
            description: 'Win $100 cash prize'
          },
          participants: 45,
          maxParticipants: 100,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          isJoined: false
        },
        {
          id: '2',
          title: 'Community Fitness Challenge',
          description: 'Complete fitness challenges and compete with others',
          type: 'video',
          category: 'fitness',
          prize: {
            type: 'product',
            value: 'Premium Fitness Tracker',
            description: 'Win a premium fitness tracker'
          },
          participants: 23,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          isJoined: false
        }
      ];
      dispatch({ type: 'SET_CONTESTS', payload: contests });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load contests' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Join contest
  const joinContest = async (contestId: string) => {
    dispatch({ type: 'JOIN_CONTEST', payload: contestId });
  };

  // Submit contest
  const submitContest = async (contestId: string, submission: string) => {
    dispatch({ type: 'SUBMIT_CONTEST', payload: { id: contestId, submission } });
  };

  // Load badges
  const loadBadges = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const badges: Badge[] = [
        {
          id: '1',
          name: 'First Purchase',
          description: 'Made your first purchase',
          icon: '🛒',
          rarity: 'common',
          category: 'shopping',
          isEarned: false,
          requirements: 'Complete 1 purchase'
        },
        {
          id: '2',
          name: 'Social Butterfly',
          description: 'Shared 10 products',
          icon: '🦋',
          rarity: 'rare',
          category: 'social',
          isEarned: false,
          requirements: 'Share 10 products'
        },
        {
          id: '3',
          name: 'Review Master',
          description: 'Wrote 25 reviews',
          icon: '⭐',
          rarity: 'epic',
          category: 'community',
          isEarned: false,
          requirements: 'Write 25 reviews'
        },
        {
          id: '4',
          name: 'Fitness Legend',
          description: 'Completed 100 fitness activities',
          icon: '💪',
          rarity: 'legendary',
          category: 'fitness',
          isEarned: false,
          requirements: 'Complete 100 fitness activities'
        }
      ];
      dispatch({ type: 'SET_BADGES', payload: badges });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load badges' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Earn badge
  const earnBadge = async (badgeId: string) => {
    dispatch({ type: 'EARN_BADGE', payload: badgeId });
  };

  // Load user stats
  const loadUserStats = async () => {
    try {
      const savedStats = localStorage.getItem('swumarket_user_stats');
      if (savedStats) {
        const stats = JSON.parse(savedStats);
        dispatch({ type: 'SET_USER_STATS', payload: stats });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load user stats' });
    }
  };

  // Load leaderboard
  const loadLeaderboard = async () => {
    try {
      // Mock leaderboard data
      const leaderboard = [
        { id: '1', name: 'John Doe', avatar: '👤', level: 15, xp: 2500, rank: 1 },
        { id: '2', name: 'Jane Smith', avatar: '👤', level: 14, xp: 2300, rank: 2 },
        { id: '3', name: 'Mike Johnson', avatar: '👤', level: 13, xp: 2100, rank: 3 },
        { id: '4', name: 'Sarah Wilson', avatar: '👤', level: 12, xp: 1900, rank: 4 },
        { id: '5', name: 'David Brown', avatar: '👤', level: 11, xp: 1700, rank: 5 }
      ];
      dispatch({ type: 'SET_LEADERBOARD', payload: leaderboard });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load leaderboard' });
    }
  };

  // Check level up
  const checkLevelUp = () => {
    const currentLevel = state.userStats.level;
    const currentXp = state.userStats.xp;
    const xpNeeded = currentLevel * 100; // 100 XP per level
    
    if (currentXp >= xpNeeded) {
      const newLevel = currentLevel + 1;
      const newXpToNextLevel = newLevel * 100;
      
      dispatch({
        type: 'UPDATE_USER_STATS',
        payload: {
          level: newLevel,
          xpToNextLevel: newXpToNextLevel,
          achievements: [...state.userStats.achievements, `Level ${newLevel} reached!`]
        }
      });
      
      // Save to localStorage
      const updatedStats = {
        ...state.userStats,
        level: newLevel,
        xpToNextLevel: newXpToNextLevel,
        achievements: [...state.userStats.achievements, `Level ${newLevel} reached!`]
      };
      localStorage.setItem('swumarket_user_stats', JSON.stringify(updatedStats));
    }
  };

  // Load data on mount
  useEffect(() => {
    loadChallenges();
    loadQuizzes();
    loadContests();
    loadBadges();
    loadUserStats();
    loadLeaderboard();
  }, []);

  const value = {
    state,
    dispatch,
    loadChallenges,
    updateChallengeProgress,
    completeChallenge,
    loadQuizzes,
    completeQuiz,
    loadContests,
    joinContest,
    submitContest,
    loadBadges,
    earnBadge,
    loadUserStats,
    loadLeaderboard,
    checkLevelUp,
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
