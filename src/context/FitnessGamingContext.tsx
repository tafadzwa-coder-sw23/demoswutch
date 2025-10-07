import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Fitness Gaming Types
export interface FitnessActivity {
  id: string;
  name: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'balance' | 'sports' | 'dance' | 'outdoor';
  description: string;
  duration: number; // in minutes
  calories: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  instructions: string[];
  videoUrl?: string;
  imageUrl: string;
  points: number;
  xp: number;
}

export interface FitnessChallenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  category: 'steps' | 'calories' | 'duration' | 'activities' | 'streak' | 'distance';
  target: number;
  current: number;
  unit: string; // steps, calories, minutes, km, etc.
  startDate: string;
  endDate: string;
  reward: {
    type: 'points' | 'badge' | 'unlock' | 'discount';
    value: number | string;
    description: string;
  };
  participants: number;
  isJoined: boolean;
  isCompleted: boolean;
  rank?: number;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  category: 'weight-loss' | 'muscle-gain' | 'endurance' | 'flexibility' | 'general';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in weeks
  daysPerWeek: number;
  activities: FitnessActivity[];
  isUnlocked: boolean;
  isPremium: boolean;
  progress: number; // 0-100%
  completedDays: number;
  totalDays: number;
}

export interface FitnessGame {
  id: string;
  name: string;
  description: string;
  type: 'ar' | 'vr' | 'mobile' | 'motion';
  category: 'dance' | 'boxing' | 'yoga' | 'running' | 'cycling' | 'sports';
  minPlayers: number;
  maxPlayers: number;
  duration: number; // in minutes
  equipment: string[];
  isMultiplayer: boolean;
  isOnline: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  xp: number;
  imageUrl: string;
  isUnlocked: boolean;
}

export interface FitnessSession {
  id: string;
  activityId: string;
  activityName: string;
  date: string;
  duration: number;
  calories: number;
  points: number;
  xp: number;
  heartRate?: {
    avg: number;
    max: number;
  };
  notes?: string;
  mood: 'great' | 'good' | 'okay' | 'tired' | 'exhausted';
}

export interface FitnessStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalPoints: number;
  totalCalories: number;
  totalMinutes: number;
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  favoriteActivity: string;
  weeklyGoal: number;
  weeklyProgress: number;
  achievements: string[];
}

export interface FitnessLeaderboard {
  id: string;
  name: string;
  avatar: string;
  level: number;
  points: number;
  streak: number;
  rank: number;
  isCurrentUser: boolean;
}

interface FitnessGamingState {
  activities: FitnessActivity[];
  challenges: FitnessChallenge[];
  workoutPlans: WorkoutPlan[];
  games: FitnessGame[];
  sessions: FitnessSession[];
  stats: FitnessStats;
  leaderboard: FitnessLeaderboard[];
  activeWorkout?: WorkoutPlan;
  currentActivity?: FitnessActivity;
  isLoading: boolean;
  error: string | null;
}

type FitnessGamingAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ACTIVITIES'; payload: FitnessActivity[] }
  | { type: 'SET_CHALLENGES'; payload: FitnessChallenge[] }
  | { type: 'JOIN_CHALLENGE'; payload: string }
  | { type: 'UPDATE_CHALLENGE_PROGRESS'; payload: { id: string; progress: number } }
  | { type: 'COMPLETE_CHALLENGE'; payload: string }
  | { type: 'SET_WORKOUT_PLANS'; payload: WorkoutPlan[] }
  | { type: 'START_WORKOUT'; payload: string }
  | { type: 'UPDATE_WORKOUT_PROGRESS'; payload: { id: string; progress: number } }
  | { type: 'SET_GAMES'; payload: FitnessGame[] }
  | { type: 'UNLOCK_GAME'; payload: string }
  | { type: 'ADD_SESSION'; payload: FitnessSession }
  | { type: 'SET_SESSIONS'; payload: FitnessSession[] }
  | { type: 'SET_STATS'; payload: FitnessStats }
  | { type: 'UPDATE_STATS'; payload: Partial<FitnessStats> }
  | { type: 'SET_LEADERBOARD'; payload: FitnessLeaderboard[] }
  | { type: 'SET_CURRENT_ACTIVITY'; payload: FitnessActivity | undefined };

const initialState: FitnessGamingState = {
  activities: [],
  challenges: [],
  workoutPlans: [],
  games: [],
  sessions: [],
  stats: {
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    totalPoints: 0,
    totalCalories: 0,
    totalMinutes: 0,
    totalSessions: 0,
    currentStreak: 0,
    longestStreak: 0,
    favoriteActivity: '',
    weeklyGoal: 150, // minutes per week
    weeklyProgress: 0,
    achievements: []
  },
  leaderboard: [],
  isLoading: false,
  error: null,
};

const fitnessGamingReducer = (state: FitnessGamingState, action: FitnessGamingAction): FitnessGamingState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_ACTIVITIES':
      return { ...state, activities: action.payload };
    case 'SET_CHALLENGES':
      return { ...state, challenges: action.payload };
    case 'JOIN_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.map(challenge =>
          challenge.id === action.payload
            ? { ...challenge, isJoined: true, participants: challenge.participants + 1 }
            : challenge
        )
      };
    case 'UPDATE_CHALLENGE_PROGRESS':
      return {
        ...state,
        challenges: state.challenges.map(challenge =>
          challenge.id === action.payload.id
            ? { ...challenge, current: action.payload.progress }
            : challenge
        )
      };
    case 'COMPLETE_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.map(challenge =>
          challenge.id === action.payload
            ? { ...challenge, isCompleted: true }
            : challenge
        )
      };
    case 'SET_WORKOUT_PLANS':
      return { ...state, workoutPlans: action.payload };
    case 'START_WORKOUT':
      const selectedPlan = state.workoutPlans.find(plan => plan.id === action.payload);
      return {
        ...state,
        activeWorkout: selectedPlan,
        workoutPlans: state.workoutPlans.map(plan =>
          plan.id === action.payload ? { ...plan, progress: 0 } : plan
        )
      };
    case 'UPDATE_WORKOUT_PROGRESS':
      return {
        ...state,
        workoutPlans: state.workoutPlans.map(plan =>
          plan.id === action.payload.id
            ? { ...plan, progress: action.payload.progress }
            : plan
        ),
        activeWorkout: state.activeWorkout?.id === action.payload.id
          ? { ...state.activeWorkout, progress: action.payload.progress }
          : state.activeWorkout
      };
    case 'SET_GAMES':
      return { ...state, games: action.payload };
    case 'UNLOCK_GAME':
      return {
        ...state,
        games: state.games.map(game =>
          game.id === action.payload ? { ...game, isUnlocked: true } : game
        )
      };
    case 'ADD_SESSION':
      return {
        ...state,
        sessions: [action.payload, ...state.sessions],
        stats: {
          ...state.stats,
          totalSessions: state.stats.totalSessions + 1,
          totalCalories: state.stats.totalCalories + action.payload.calories,
          totalMinutes: state.stats.totalMinutes + action.payload.duration,
          totalPoints: state.stats.totalPoints + action.payload.points,
          xp: state.stats.xp + action.payload.xp,
          currentStreak: state.stats.currentStreak + 1,
          weeklyProgress: state.stats.weeklyProgress + action.payload.duration
        }
      };
    case 'SET_SESSIONS':
      return { ...state, sessions: action.payload };
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    case 'UPDATE_STATS':
      return { ...state, stats: { ...state.stats, ...action.payload } };
    case 'SET_LEADERBOARD':
      return { ...state, leaderboard: action.payload };
    case 'SET_CURRENT_ACTIVITY':
      return { ...state, currentActivity: action.payload };
    default:
      return state;
  }
};

const FitnessGamingContext = createContext<{
  state: FitnessGamingState;
  dispatch: React.Dispatch<FitnessGamingAction>;
  // Actions
  loadActivities: () => Promise<void>;
  loadChallenges: () => Promise<void>;
  joinChallenge: (challengeId: string) => Promise<void>;
  updateChallengeProgress: (challengeId: string, progress: number) => Promise<void>;
  loadWorkoutPlans: () => Promise<void>;
  startWorkout: (planId: string) => Promise<void>;
  updateWorkoutProgress: (planId: string, progress: number) => Promise<void>;
  loadGames: () => Promise<void>;
  unlockGame: (gameId: string) => Promise<void>;
  startActivity: (activity: FitnessActivity) => Promise<void>;
  completeActivity: (duration: number, calories: number, mood: string, notes?: string) => Promise<void>;
  loadSessions: () => Promise<void>;
  loadStats: () => Promise<void>;
  loadLeaderboard: () => Promise<void>;
  checkLevelUp: () => void;
} | null>(null);

export const FitnessGamingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(fitnessGamingReducer, initialState);

  // Load activities
  const loadActivities = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const activities: FitnessActivity[] = [
        {
          id: '1',
          name: 'Morning Jog',
          type: 'cardio',
          description: 'Start your day with an energizing jog',
          duration: 30,
          calories: 300,
          difficulty: 'beginner',
          equipment: ['Running shoes'],
          instructions: [
            'Warm up with 5 minutes of walking',
            'Jog at a comfortable pace for 20 minutes',
            'Cool down with 5 minutes of walking',
            'Stretch your legs and calves'
          ],
          imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop',
          points: 50,
          xp: 25
        },
        {
          id: '2',
          name: 'Push-up Challenge',
          type: 'strength',
          description: 'Build upper body strength with push-ups',
          duration: 15,
          calories: 100,
          difficulty: 'intermediate',
          equipment: ['Exercise mat'],
          instructions: [
            'Start in plank position',
            'Lower your body until chest nearly touches floor',
            'Push back up to starting position',
            'Repeat for 3 sets of 10-15 reps'
          ],
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
          points: 40,
          xp: 20
        },
        {
          id: '3',
          name: 'Yoga Flow',
          type: 'flexibility',
          description: 'Improve flexibility and mindfulness',
          duration: 45,
          calories: 150,
          difficulty: 'beginner',
          equipment: ['Yoga mat'],
          instructions: [
            'Start with mountain pose',
            'Flow through sun salutations',
            'Hold warrior poses for 30 seconds each',
            'End with savasana relaxation'
          ],
          imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
          points: 60,
          xp: 30
        },
        {
          id: '4',
          name: 'Dance Workout',
          type: 'dance',
          description: 'Fun cardio workout with dance moves',
          duration: 25,
          calories: 250,
          difficulty: 'beginner',
          equipment: [],
          instructions: [
            'Choose upbeat music',
            'Start with simple moves',
            'Add arm movements',
            'Keep moving for the full duration'
          ],
          imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=200&fit=crop',
          points: 45,
          xp: 25
        },
        {
          id: '5',
          name: 'HIIT Circuit',
          type: 'cardio',
          description: 'High-intensity interval training',
          duration: 20,
          calories: 400,
          difficulty: 'advanced',
          equipment: ['Timer'],
          instructions: [
            'Warm up for 3 minutes',
            '30 seconds high intensity, 30 seconds rest',
            'Repeat for 8 rounds',
            'Cool down and stretch'
          ],
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
          points: 80,
          xp: 40
        }
      ];
      dispatch({ type: 'SET_ACTIVITIES', payload: activities });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load activities' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Load challenges
  const loadChallenges = async () => {
    try {
      const challenges: FitnessChallenge[] = [
        {
          id: '1',
          title: '10,000 Steps Daily',
          description: 'Walk 10,000 steps every day for a week',
          type: 'weekly',
          category: 'steps',
          target: 70000,
          current: 0,
          unit: 'steps',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          reward: {
            type: 'points',
            value: 500,
            description: 'Earn 500 points'
          },
          participants: 234,
          isJoined: false,
          isCompleted: false
        },
        {
          id: '2',
          title: 'Burn 2000 Calories',
          description: 'Burn 2000 calories through exercise this week',
          type: 'weekly',
          category: 'calories',
          target: 2000,
          current: 0,
          unit: 'calories',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          reward: {
            type: 'badge',
            value: 'Calorie Crusher',
            description: 'Unlock Calorie Crusher badge'
          },
          participants: 156,
          isJoined: false,
          isCompleted: false
        },
        {
          id: '3',
          title: '30-Day Fitness Streak',
          description: 'Exercise for at least 20 minutes every day for 30 days',
          type: 'monthly',
          category: 'streak',
          target: 30,
          current: 0,
          unit: 'days',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          reward: {
            type: 'unlock',
            value: 'Premium Workouts',
            description: 'Unlock premium workout plans'
          },
          participants: 89,
          isJoined: false,
          isCompleted: false
        }
      ];
      dispatch({ type: 'SET_CHALLENGES', payload: challenges });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load challenges' });
    }
  };

  // Join challenge
  const joinChallenge = async (challengeId: string) => {
    dispatch({ type: 'JOIN_CHALLENGE', payload: challengeId });
  };

  // Update challenge progress
  const updateChallengeProgress = async (challengeId: string, progress: number) => {
    dispatch({ type: 'UPDATE_CHALLENGE_PROGRESS', payload: { id: challengeId, progress } });
    
    // Check if challenge is completed
    const challenge = state.challenges.find(c => c.id === challengeId);
    if (challenge && progress >= challenge.target) {
      dispatch({ type: 'COMPLETE_CHALLENGE', payload: challengeId });
    }
  };

  // Load workout plans
  const loadWorkoutPlans = async () => {
    try {
      const plans: WorkoutPlan[] = [
        {
          id: '1',
          name: 'Beginner Full Body',
          description: '4-week program for fitness beginners',
          category: 'general',
          level: 'beginner',
          duration: 4,
          daysPerWeek: 3,
          activities: state.activities.slice(0, 3),
          isUnlocked: true,
          isPremium: false,
          progress: 0,
          completedDays: 0,
          totalDays: 12
        },
        {
          id: '2',
          name: 'Weight Loss Intensive',
          description: '8-week high-intensity weight loss program',
          category: 'weight-loss',
          level: 'intermediate',
          duration: 8,
          daysPerWeek: 5,
          activities: state.activities.filter(a => a.type === 'cardio'),
          isUnlocked: true,
          isPremium: true,
          progress: 0,
          completedDays: 0,
          totalDays: 40
        },
        {
          id: '3',
          name: 'Strength Builder',
          description: '6-week muscle building program',
          category: 'muscle-gain',
          level: 'intermediate',
          duration: 6,
          daysPerWeek: 4,
          activities: state.activities.filter(a => a.type === 'strength'),
          isUnlocked: false,
          isPremium: true,
          progress: 0,
          completedDays: 0,
          totalDays: 24
        }
      ];
      dispatch({ type: 'SET_WORKOUT_PLANS', payload: plans });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load workout plans' });
    }
  };

  // Start workout
  const startWorkout = async (planId: string) => {
    dispatch({ type: 'START_WORKOUT', payload: planId });
  };

  // Update workout progress
  const updateWorkoutProgress = async (planId: string, progress: number) => {
    dispatch({ type: 'UPDATE_WORKOUT_PROGRESS', payload: { id: planId, progress } });
  };

  // Load games
  const loadGames = async () => {
    try {
      const games: FitnessGame[] = [
        {
          id: '1',
          name: 'Virtual Boxing',
          description: 'Box against virtual opponents',
          type: 'vr',
          category: 'boxing',
          minPlayers: 1,
          maxPlayers: 2,
          duration: 15,
          equipment: ['VR headset', 'Controllers'],
          isMultiplayer: true,
          isOnline: true,
          difficulty: 'medium',
          points: 100,
          xp: 50,
          imageUrl: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=300&h=200&fit=crop',
          isUnlocked: true
        },
        {
          id: '2',
          name: 'Dance Revolution',
          description: 'Follow dance moves to the beat',
          type: 'mobile',
          category: 'dance',
          minPlayers: 1,
          maxPlayers: 4,
          duration: 20,
          equipment: ['Smartphone'],
          isMultiplayer: true,
          isOnline: true,
          difficulty: 'easy',
          points: 75,
          xp: 35,
          imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=200&fit=crop',
          isUnlocked: true
        },
        {
          id: '3',
          name: 'AR Yoga Master',
          description: 'Perfect your yoga poses with AR guidance',
          type: 'ar',
          category: 'yoga',
          minPlayers: 1,
          maxPlayers: 1,
          duration: 30,
          equipment: ['Smartphone', 'Yoga mat'],
          isMultiplayer: false,
          isOnline: false,
          difficulty: 'medium',
          points: 90,
          xp: 45,
          imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
          isUnlocked: false
        }
      ];
      dispatch({ type: 'SET_GAMES', payload: games });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load games' });
    }
  };

  // Unlock game
  const unlockGame = async (gameId: string) => {
    dispatch({ type: 'UNLOCK_GAME', payload: gameId });
  };

  // Start activity
  const startActivity = async (activity: FitnessActivity) => {
    dispatch({ type: 'SET_CURRENT_ACTIVITY', payload: activity });
  };

  // Complete activity
  const completeActivity = async (duration: number, calories: number, mood: string, notes?: string) => {
    if (!state.currentActivity) return;

    const session: FitnessSession = {
      id: Date.now().toString(),
      activityId: state.currentActivity.id,
      activityName: state.currentActivity.name,
      date: new Date().toISOString(),
      duration,
      calories,
      points: state.currentActivity.points,
      xp: state.currentActivity.xp,
      mood: mood as any,
      notes
    };

    dispatch({ type: 'ADD_SESSION', payload: session });
    dispatch({ type: 'SET_CURRENT_ACTIVITY', payload: undefined });
    
    // Update challenge progress
    state.challenges.forEach(challenge => {
      if (challenge.isJoined && !challenge.isCompleted) {
        let newProgress = challenge.current;
        
        switch (challenge.category) {
          case 'calories':
            newProgress += calories;
            break;
          case 'duration':
            newProgress += duration;
            break;
          case 'activities':
            newProgress += 1;
            break;
        }
        
        updateChallengeProgress(challenge.id, newProgress);
      }
    });

    checkLevelUp();
    
    // Save to localStorage
    const updatedSessions = [session, ...state.sessions];
    localStorage.setItem('swumarket_fitness_sessions', JSON.stringify(updatedSessions));
  };

  // Load sessions
  const loadSessions = async () => {
    try {
      const savedSessions = localStorage.getItem('swumarket_fitness_sessions');
      if (savedSessions) {
        const sessions = JSON.parse(savedSessions);
        dispatch({ type: 'SET_SESSIONS', payload: sessions });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load sessions' });
    }
  };

  // Load stats
  const loadStats = async () => {
    try {
      const savedStats = localStorage.getItem('swumarket_fitness_stats');
      if (savedStats) {
        const stats = JSON.parse(savedStats);
        dispatch({ type: 'SET_STATS', payload: stats });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load stats' });
    }
  };

  // Load leaderboard
  const loadLeaderboard = async () => {
    try {
      const leaderboard: FitnessLeaderboard[] = [
        { id: '1', name: 'Sarah Johnson', avatar: '👩', level: 25, points: 5200, streak: 45, rank: 1, isCurrentUser: false },
        { id: '2', name: 'Mike Chen', avatar: '👨', level: 23, points: 4800, streak: 32, rank: 2, isCurrentUser: false },
        { id: '3', name: 'You', avatar: '🏃', level: state.stats.level, points: state.stats.totalPoints, streak: state.stats.currentStreak, rank: 3, isCurrentUser: true },
        { id: '4', name: 'Emma Wilson', avatar: '👩', level: 20, points: 4200, streak: 28, rank: 4, isCurrentUser: false },
        { id: '5', name: 'David Brown', avatar: '👨', level: 19, points: 3900, streak: 25, rank: 5, isCurrentUser: false }
      ];
      dispatch({ type: 'SET_LEADERBOARD', payload: leaderboard });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load leaderboard' });
    }
  };

  // Check level up
  const checkLevelUp = () => {
    const currentLevel = state.stats.level;
    const currentXp = state.stats.xp;
    const xpNeeded = currentLevel * 100;
    
    if (currentXp >= xpNeeded) {
      const newLevel = currentLevel + 1;
      const newXpToNextLevel = newLevel * 100;
      
      dispatch({
        type: 'UPDATE_STATS',
        payload: {
          level: newLevel,
          xpToNextLevel: newXpToNextLevel,
          achievements: [...state.stats.achievements, `Level ${newLevel} reached!`]
        }
      });
      
      // Save to localStorage
      const updatedStats = {
        ...state.stats,
        level: newLevel,
        xpToNextLevel: newXpToNextLevel,
        achievements: [...state.stats.achievements, `Level ${newLevel} reached!`]
      };
      localStorage.setItem('swumarket_fitness_stats', JSON.stringify(updatedStats));
    }
  };

  // Load data on mount
  useEffect(() => {
    loadActivities();
    loadChallenges();
    loadWorkoutPlans();
    loadGames();
    loadSessions();
    loadStats();
    loadLeaderboard();
  }, []);

  const value = {
    state,
    dispatch,
    loadActivities,
    loadChallenges,
    joinChallenge,
    updateChallengeProgress,
    loadWorkoutPlans,
    startWorkout,
    updateWorkoutProgress,
    loadGames,
    unlockGame,
    startActivity,
    completeActivity,
    loadSessions,
    loadStats,
    loadLeaderboard,
    checkLevelUp,
  };

  return (
    <FitnessGamingContext.Provider value={value}>
      {children}
    </FitnessGamingContext.Provider>
  );
};

export const useFitnessGaming = () => {
  const context = useContext(FitnessGamingContext);
  if (!context) {
    throw new Error('useFitnessGaming must be used within a FitnessGamingProvider');
  }
  return context;
};
