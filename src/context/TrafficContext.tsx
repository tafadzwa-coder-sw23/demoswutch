import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Traffic System Types
export interface TrafficZone {
  id: string;
  name: string;
  type: 'green' | 'black' | 'yellow' | 'construction';
  severity: 'low' | 'medium' | 'high' | 'critical';
  coordinates: {
    lat: number;
    lng: number;
    radius: number; // in meters
  };
  description: string;
  reason: string;
  startTime: string;
  endTime?: string;
  isActive: boolean;
  reportedBy: 'user' | 'system' | 'police' | 'traffic-authority';
  reporterName?: string;
  verificationStatus: 'unverified' | 'verified' | 'false-report';
  affectedRoutes: string[];
  alternativeRoutes: string[];
  estimatedDelay: number; // in minutes
  lastUpdated: string;
}

export interface TrafficReport {
  id: string;
  zoneId?: string;
  type: 'accident' | 'roadblock' | 'construction' | 'heavy-traffic' | 'police-checkpoint' | 'fuel-shortage' | 'protest' | 'weather';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportedBy: string; // user ID or system
  reporterName: string;
  timestamp: string;
  isVerified: boolean;
  verifiedBy?: string;
  verificationCount: number;
  upvotes: number;
  downvotes: number;
  userVoted?: 'up' | 'down';
  images?: string[];
  estimatedClearTime?: string;
  status: 'active' | 'clearing' | 'cleared' | 'false-report';
}

export interface Route {
  id: string;
  name: string;
  startLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  endLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  waypoints: Array<{
    lat: number;
    lng: number;
    address: string;
  }>;
  distance: number; // in km
  estimatedTime: number; // in minutes
  actualTime?: number; // in minutes
  trafficScore: number; // 0-100, higher is better
  safetyScore: number; // 0-100, higher is safer
  fuelCost: number;
  tollCost: number;
  roadQuality: 'excellent' | 'good' | 'fair' | 'poor';
  avoidanceZones: string[]; // zone IDs to avoid
  isRecommended: boolean;
  lastUpdated: string;
}

export interface AIRouteRecommendation {
  id: string;
  requestId: string;
  routes: Route[];
  bestRoute: string; // route ID
  reasoning: string;
  confidence: number; // 0-100
  factors: {
    traffic: number;
    safety: number;
    distance: number;
    cost: number;
    time: number;
  };
  alternatives: Array<{
    routeId: string;
    reason: string;
    tradeoff: string;
  }>;
  warnings: string[];
  tips: string[];
  generatedAt: string;
  validUntil: string;
}

export interface UserPreferences {
  avoidTolls: boolean;
  avoidHighways: boolean;
  preferSafetyOverSpeed: boolean;
  maxDetourTime: number; // minutes
  fuelEfficiencyPriority: 'low' | 'medium' | 'high';
  avoidedZoneTypes: Array<'black' | 'construction' | 'police-checkpoint'>;
  preferredRouteTypes: Array<'fastest' | 'shortest' | 'safest' | 'most-fuel-efficient'>;
  notificationSettings: {
    newTrafficReports: boolean;
    routeUpdates: boolean;
    emergencyAlerts: boolean;
    weeklyTrafficSummary: boolean;
  };
}

interface TrafficState {
  trafficZones: TrafficZone[];
  trafficReports: TrafficReport[];
  routes: Route[];
  aiRecommendations: AIRouteRecommendation[];
  userPreferences: UserPreferences;
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
    timestamp: string;
  };
  activeRoute?: Route;
  nearbyZones: TrafficZone[];
  recentReports: TrafficReport[];
  isLoading: boolean;
  error: string | null;
}

type TrafficAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TRAFFIC_ZONES'; payload: TrafficZone[] }
  | { type: 'ADD_TRAFFIC_ZONE'; payload: TrafficZone }
  | { type: 'UPDATE_TRAFFIC_ZONE'; payload: TrafficZone }
  | { type: 'DELETE_TRAFFIC_ZONE'; payload: string }
  | { type: 'SET_TRAFFIC_REPORTS'; payload: TrafficReport[] }
  | { type: 'ADD_TRAFFIC_REPORT'; payload: TrafficReport }
  | { type: 'UPDATE_TRAFFIC_REPORT'; payload: TrafficReport }
  | { type: 'VOTE_TRAFFIC_REPORT'; payload: { id: string; vote: 'up' | 'down' } }
  | { type: 'SET_ROUTES'; payload: Route[] }
  | { type: 'ADD_ROUTE'; payload: Route }
  | { type: 'SET_ACTIVE_ROUTE'; payload: Route }
  | { type: 'SET_AI_RECOMMENDATIONS'; payload: AIRouteRecommendation[] }
  | { type: 'ADD_AI_RECOMMENDATION'; payload: AIRouteRecommendation }
  | { type: 'SET_USER_PREFERENCES'; payload: UserPreferences }
  | { type: 'UPDATE_USER_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'SET_CURRENT_LOCATION'; payload: any }
  | { type: 'SET_NEARBY_ZONES'; payload: TrafficZone[] }
  | { type: 'SET_RECENT_REPORTS'; payload: TrafficReport[] };

const initialState: TrafficState = {
  trafficZones: [],
  trafficReports: [],
  routes: [],
  aiRecommendations: [],
  userPreferences: {
    avoidTolls: false,
    avoidHighways: false,
    preferSafetyOverSpeed: true,
    maxDetourTime: 15,
    fuelEfficiencyPriority: 'medium',
    avoidedZoneTypes: ['black'],
    preferredRouteTypes: ['safest', 'fastest'],
    notificationSettings: {
      newTrafficReports: true,
      routeUpdates: true,
      emergencyAlerts: true,
      weeklyTrafficSummary: false
    }
  },
  nearbyZones: [],
  recentReports: [],
  isLoading: false,
  error: null,
};

const trafficReducer = (state: TrafficState, action: TrafficAction): TrafficState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_TRAFFIC_ZONES':
      return { ...state, trafficZones: action.payload };
    case 'ADD_TRAFFIC_ZONE':
      return { ...state, trafficZones: [action.payload, ...state.trafficZones] };
    case 'UPDATE_TRAFFIC_ZONE':
      return {
        ...state,
        trafficZones: state.trafficZones.map(zone =>
          zone.id === action.payload.id ? action.payload : zone
        )
      };
    case 'DELETE_TRAFFIC_ZONE':
      return {
        ...state,
        trafficZones: state.trafficZones.filter(zone => zone.id !== action.payload)
      };
    case 'SET_TRAFFIC_REPORTS':
      return { ...state, trafficReports: action.payload };
    case 'ADD_TRAFFIC_REPORT':
      return { ...state, trafficReports: [action.payload, ...state.trafficReports] };
    case 'UPDATE_TRAFFIC_REPORT':
      return {
        ...state,
        trafficReports: state.trafficReports.map(report =>
          report.id === action.payload.id ? action.payload : report
        )
      };
    case 'VOTE_TRAFFIC_REPORT':
      return {
        ...state,
        trafficReports: state.trafficReports.map(report =>
          report.id === action.payload.id
            ? {
                ...report,
                upvotes: action.payload.vote === 'up' ? report.upvotes + 1 : report.upvotes,
                downvotes: action.payload.vote === 'down' ? report.downvotes + 1 : report.downvotes,
                userVoted: action.payload.vote
              }
            : report
        )
      };
    case 'SET_ROUTES':
      return { ...state, routes: action.payload };
    case 'ADD_ROUTE':
      return { ...state, routes: [action.payload, ...state.routes] };
    case 'SET_ACTIVE_ROUTE':
      return { ...state, activeRoute: action.payload };
    case 'SET_AI_RECOMMENDATIONS':
      return { ...state, aiRecommendations: action.payload };
    case 'ADD_AI_RECOMMENDATION':
      return { ...state, aiRecommendations: [action.payload, ...state.aiRecommendations] };
    case 'SET_USER_PREFERENCES':
      return { ...state, userPreferences: action.payload };
    case 'UPDATE_USER_PREFERENCES':
      return { ...state, userPreferences: { ...state.userPreferences, ...action.payload } };
    case 'SET_CURRENT_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'SET_NEARBY_ZONES':
      return { ...state, nearbyZones: action.payload };
    case 'SET_RECENT_REPORTS':
      return { ...state, recentReports: action.payload };
    default:
      return state;
  }
};

const TrafficContext = createContext<{
  state: TrafficState;
  dispatch: React.Dispatch<TrafficAction>;
  // Actions
  loadTrafficZones: () => Promise<void>;
  addTrafficZone: (zone: Omit<TrafficZone, 'id' | 'lastUpdated'>) => Promise<void>;
  updateTrafficZone: (zone: TrafficZone) => Promise<void>;
  deleteTrafficZone: (id: string) => Promise<void>;
  loadTrafficReports: () => Promise<void>;
  addTrafficReport: (report: Omit<TrafficReport, 'id' | 'timestamp' | 'verificationCount' | 'upvotes' | 'downvotes'>) => Promise<void>;
  updateTrafficReport: (report: TrafficReport) => Promise<void>;
  voteTrafficReport: (id: string, vote: 'up' | 'down') => Promise<void>;
  verifyTrafficReport: (id: string) => Promise<void>;
  loadRoutes: () => Promise<void>;
  calculateRoute: (start: any, end: any, preferences?: Partial<UserPreferences>) => Promise<void>;
  getAIRecommendation: (start: any, end: any) => Promise<void>;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  getCurrentLocation: () => Promise<void>;
  getNearbyZones: () => Promise<void>;
  getRecentReports: () => Promise<void>;
  reportTraffic: (type: string, location: any, description: string, severity: string) => Promise<void>;
} | null>(null);

export const TrafficProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(trafficReducer, initialState);

  // Load traffic zones
  const loadTrafficZones = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Mock traffic zones
      const zones: TrafficZone[] = [
        {
          id: '1',
          name: 'Harare CBD Roadblock',
          type: 'black',
          severity: 'high',
          coordinates: {
            lat: -17.8252,
            lng: 31.0335,
            radius: 500
          },
          description: 'Police roadblock causing major delays',
          reason: 'Police checkpoint for document verification',
          startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          reportedBy: 'user',
          reporterName: 'John D.',
          verificationStatus: 'verified',
          affectedRoutes: ['Samora Machel Ave', 'Julius Nyerere Way'],
          alternativeRoutes: ['Leopold Takawira St', 'Robert Mugabe Rd'],
          estimatedDelay: 25,
          lastUpdated: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Borrowdale Road Construction',
          type: 'yellow',
          severity: 'medium',
          coordinates: {
            lat: -17.7892,
            lng: 31.0522,
            radius: 300
          },
          description: 'Road construction causing lane closures',
          reason: 'Road maintenance and resurfacing',
          startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          reportedBy: 'traffic-authority',
          verificationStatus: 'verified',
          affectedRoutes: ['Borrowdale Road'],
          alternativeRoutes: ['Enterprise Road', 'Arcturus Road'],
          estimatedDelay: 10,
          lastUpdated: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Avondale Clear Zone',
          type: 'green',
          severity: 'low',
          coordinates: {
            lat: -17.8092,
            lng: 31.0422,
            radius: 800
          },
          description: 'Free-flowing traffic, no incidents',
          reason: 'Normal traffic conditions',
          startTime: new Date().toISOString(),
          isActive: true,
          reportedBy: 'system',
          verificationStatus: 'verified',
          affectedRoutes: ['King George Road', 'Josiah Tongogara Ave'],
          alternativeRoutes: [],
          estimatedDelay: 0,
          lastUpdated: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Airport Road Fuel Queue',
          type: 'black',
          severity: 'critical',
          coordinates: {
            lat: -17.9318,
            lng: 31.0928,
            radius: 1000
          },
          description: 'Long fuel queues blocking traffic',
          reason: 'Fuel shortage causing massive queues',
          startTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          reportedBy: 'user',
          reporterName: 'Traffic Reporter',
          verificationStatus: 'verified',
          affectedRoutes: ['Airport Road', 'Seke Road'],
          alternativeRoutes: ['Chitungwiza Road', 'Willowvale Road'],
          estimatedDelay: 45,
          lastUpdated: new Date().toISOString()
        }
      ];
      dispatch({ type: 'SET_TRAFFIC_ZONES', payload: zones });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load traffic zones' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Add traffic zone
  const addTrafficZone = async (zoneData: Omit<TrafficZone, 'id' | 'lastUpdated'>) => {
    const zone: TrafficZone = {
      ...zoneData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString()
    };
    dispatch({ type: 'ADD_TRAFFIC_ZONE', payload: zone });
  };

  // Update traffic zone
  const updateTrafficZone = async (zone: TrafficZone) => {
    const updatedZone = { ...zone, lastUpdated: new Date().toISOString() };
    dispatch({ type: 'UPDATE_TRAFFIC_ZONE', payload: updatedZone });
  };

  // Delete traffic zone
  const deleteTrafficZone = async (id: string) => {
    dispatch({ type: 'DELETE_TRAFFIC_ZONE', payload: id });
  };

  // Load traffic reports
  const loadTrafficReports = async () => {
    try {
      // Mock traffic reports
      const reports: TrafficReport[] = [
        {
          id: '1',
          type: 'accident',
          location: {
            lat: -17.8352,
            lng: 31.0435,
            address: 'Corner of Samora Machel Ave & Julius Nyerere Way'
          },
          description: 'Minor fender bender blocking left lane',
          severity: 'medium',
          reportedBy: 'user123',
          reporterName: 'Sarah M.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          isVerified: true,
          verifiedBy: 'traffic_admin',
          verificationCount: 3,
          upvotes: 12,
          downvotes: 1,
          estimatedClearTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
          status: 'active'
        },
        {
          id: '2',
          type: 'police-checkpoint',
          location: {
            lat: -17.8152,
            lng: 31.0235,
            address: 'Robert Mugabe Road near TM Hypermarket'
          },
          description: 'Police checkpoint checking licenses and registration',
          severity: 'low',
          reportedBy: 'user456',
          reporterName: 'Mike T.',
          timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
          isVerified: true,
          verificationCount: 5,
          upvotes: 8,
          downvotes: 0,
          status: 'active'
        },
        {
          id: '3',
          type: 'fuel-shortage',
          location: {
            lat: -17.9218,
            lng: 31.0828,
            address: 'Puma Fuel Station - Seke Road'
          },
          description: 'Long fuel queue extending onto main road',
          severity: 'high',
          reportedBy: 'user789',
          reporterName: 'John K.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isVerified: true,
          verificationCount: 8,
          upvotes: 15,
          downvotes: 2,
          status: 'active'
        }
      ];
      dispatch({ type: 'SET_TRAFFIC_REPORTS', payload: reports });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load traffic reports' });
    }
  };

  // Add traffic report
  const addTrafficReport = async (reportData: Omit<TrafficReport, 'id' | 'timestamp' | 'verificationCount' | 'upvotes' | 'downvotes'>) => {
    const report: TrafficReport = {
      ...reportData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      verificationCount: 0,
      upvotes: 0,
      downvotes: 0
    };
    dispatch({ type: 'ADD_TRAFFIC_REPORT', payload: report });
  };

  // Update traffic report
  const updateTrafficReport = async (report: TrafficReport) => {
    dispatch({ type: 'UPDATE_TRAFFIC_REPORT', payload: report });
  };

  // Vote on traffic report
  const voteTrafficReport = async (id: string, vote: 'up' | 'down') => {
    dispatch({ type: 'VOTE_TRAFFIC_REPORT', payload: { id, vote } });
  };

  // Verify traffic report
  const verifyTrafficReport = async (id: string) => {
    const report = state.trafficReports.find(r => r.id === id);
    if (report) {
      const updatedReport = {
        ...report,
        isVerified: true,
        verificationCount: report.verificationCount + 1
      };
      dispatch({ type: 'UPDATE_TRAFFIC_REPORT', payload: updatedReport });
    }
  };

  // Load routes
  const loadRoutes = async () => {
    try {
      // Mock routes
      const routes: Route[] = [
        {
          id: '1',
          name: 'CBD to Borrowdale (Main Route)',
          startLocation: {
            lat: -17.8252,
            lng: 31.0335,
            address: 'Harare CBD'
          },
          endLocation: {
            lat: -17.7892,
            lng: 31.0522,
            address: 'Borrowdale Shopping Centre'
          },
          waypoints: [],
          distance: 12.5,
          estimatedTime: 25,
          actualTime: 35,
          trafficScore: 45,
          safetyScore: 85,
          fuelCost: 2.50,
          tollCost: 0,
          roadQuality: 'good',
          avoidanceZones: ['1'],
          isRecommended: false,
          lastUpdated: new Date().toISOString()
        },
        {
          id: '2',
          name: 'CBD to Borrowdale (Alternative)',
          startLocation: {
            lat: -17.8252,
            lng: 31.0335,
            address: 'Harare CBD'
          },
          endLocation: {
            lat: -17.7892,
            lng: 31.0522,
            address: 'Borrowdale Shopping Centre'
          },
          waypoints: [
            {
              lat: -17.8092,
              lng: 31.0422,
              address: 'Avondale'
            }
          ],
          distance: 14.2,
          estimatedTime: 22,
          actualTime: 22,
          trafficScore: 85,
          safetyScore: 90,
          fuelCost: 2.85,
          tollCost: 0,
          roadQuality: 'excellent',
          avoidanceZones: [],
          isRecommended: true,
          lastUpdated: new Date().toISOString()
        }
      ];
      dispatch({ type: 'SET_ROUTES', payload: routes });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load routes' });
    }
  };

  // Calculate route
  const calculateRoute = async (start: any, end: any, preferences?: Partial<UserPreferences>) => {
    // In a real app, this would call a routing API
    await loadRoutes();
  };

  // Get AI recommendation
  const getAIRecommendation = async (start: any, end: any) => {
    try {
      const recommendation: AIRouteRecommendation = {
        id: Date.now().toString(),
        requestId: 'req_' + Date.now(),
        routes: state.routes,
        bestRoute: '2',
        reasoning: 'Route 2 avoids the police roadblock in CBD and construction on Borrowdale Road, saving 13 minutes despite being slightly longer.',
        confidence: 92,
        factors: {
          traffic: 85,
          safety: 90,
          distance: 75,
          cost: 80,
          time: 88
        },
        alternatives: [
          {
            routeId: '1',
            reason: 'Shortest distance',
            tradeoff: 'Adds 13 minutes due to roadblock'
          }
        ],
        warnings: [
          'Police roadblock active on Samora Machel Ave',
          'Construction delays on Borrowdale Road'
        ],
        tips: [
          'Consider leaving 10 minutes earlier than usual',
          'Keep documents ready for potential checkpoints'
        ],
        generatedAt: new Date().toISOString(),
        validUntil: new Date(Date.now() + 30 * 60 * 1000).toISOString()
      };
      dispatch({ type: 'ADD_AI_RECOMMENDATION', payload: recommendation });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to generate AI recommendation' });
    }
  };

  // Update user preferences
  const updateUserPreferences = async (preferences: Partial<UserPreferences>) => {
    dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: preferences });
    
    // Save to localStorage
    const updatedPreferences = { ...state.userPreferences, ...preferences };
    localStorage.setItem('swumarket_traffic_preferences', JSON.stringify(updatedPreferences));
  };

  // Get current location
  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: 'Current Location',
          timestamp: new Date().toISOString()
        };
        
        dispatch({ type: 'SET_CURRENT_LOCATION', payload: location });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to get current location' });
      }
    }
  };

  // Get nearby zones
  const getNearbyZones = async () => {
    // Filter zones within 5km of current location
    const nearby = state.trafficZones.filter(zone => zone.isActive);
    dispatch({ type: 'SET_NEARBY_ZONES', payload: nearby });
  };

  // Get recent reports
  const getRecentReports = async () => {
    // Get reports from last 24 hours
    const recent = state.trafficReports.filter(report => {
      const reportTime = new Date(report.timestamp);
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return reportTime > dayAgo && report.status === 'active';
    });
    dispatch({ type: 'SET_RECENT_REPORTS', payload: recent });
  };

  // Report traffic
  const reportTraffic = async (type: string, location: any, description: string, severity: string) => {
    await addTrafficReport({
      type: type as any,
      location,
      description,
      severity: severity as any,
      reportedBy: 'current_user',
      reporterName: 'You',
      isVerified: false,
      status: 'active'
    });
  };

  // Load data on mount
  useEffect(() => {
    loadTrafficZones();
    loadTrafficReports();
    loadRoutes();
    getCurrentLocation();
    
    // Load user preferences
    const savedPreferences = localStorage.getItem('swumarket_traffic_preferences');
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      dispatch({ type: 'SET_USER_PREFERENCES', payload: preferences });
    }
  }, []);

  // Update nearby zones when location or zones change
  useEffect(() => {
    if (state.currentLocation && state.trafficZones.length > 0) {
      getNearbyZones();
    }
  }, [state.currentLocation, state.trafficZones]);

  // Update recent reports when reports change
  useEffect(() => {
    if (state.trafficReports.length > 0) {
      getRecentReports();
    }
  }, [state.trafficReports]);

  const value = {
    state,
    dispatch,
    loadTrafficZones,
    addTrafficZone,
    updateTrafficZone,
    deleteTrafficZone,
    loadTrafficReports,
    addTrafficReport,
    updateTrafficReport,
    voteTrafficReport,
    verifyTrafficReport,
    loadRoutes,
    calculateRoute,
    getAIRecommendation,
    updateUserPreferences,
    getCurrentLocation,
    getNearbyZones,
    getRecentReports,
    reportTraffic,
  };

  return (
    <TrafficContext.Provider value={value}>
      {children}
    </TrafficContext.Provider>
  );
};

export const useTraffic = () => {
  const context = useContext(TrafficContext);
  if (!context) {
    throw new Error('useTraffic must be used within a TrafficProvider');
  }
  return context;
};
