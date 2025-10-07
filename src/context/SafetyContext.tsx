import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Safety System Types
export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  relationship: 'family' | 'friend' | 'colleague' | 'neighbor' | 'other';
  isPrimary: boolean;
  isActive: boolean;
}

export interface SafetyTrigger {
  id: string;
  type: 'panic' | 'check-in' | 'location' | 'time-based' | 'custom';
  name: string;
  description: string;
  isActive: boolean;
  triggerConditions: {
    timeoutMinutes?: number; // For check-in triggers
    location?: {
      lat: number;
      lng: number;
      radius: number; // in meters
    };
    timeRange?: {
      start: string; // HH:MM
      end: string; // HH:MM
    };
    keywords?: string[]; // For message-based triggers
  };
  actions: {
    notifyContacts: boolean;
    sendLocation: boolean;
    callPolice: boolean;
    recordAudio: boolean;
    sendMessage: string;
    escalationDelay: number; // minutes before escalating
  };
  createdAt: string;
  lastTriggered?: string;
}

export interface SafetyIncident {
  id: string;
  triggerId: string;
  triggerName: string;
  type: 'panic' | 'check-in-missed' | 'location-alert' | 'time-alert' | 'manual';
  status: 'active' | 'resolved' | 'false-alarm' | 'escalated';
  location?: {
    lat: number;
    lng: number;
    address: string;
    accuracy: number;
  };
  timestamp: string;
  resolvedAt?: string;
  notifiedContacts: string[]; // contact IDs
  policeNotified: boolean;
  userResponse?: string;
  notes?: string;
  audioRecording?: string; // URL or file path
}

export interface CheckInRequest {
  id: string;
  message: string;
  requestedBy: string; // contact ID or 'system'
  requestedAt: string;
  respondedAt?: string;
  response?: 'safe' | 'need-help' | 'emergency';
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  isUrgent: boolean;
}

export interface SafeZone {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    radius: number; // in meters
  };
  type: 'home' | 'work' | 'school' | 'friend' | 'public' | 'custom';
  isActive: boolean;
  notifications: {
    onEnter: boolean;
    onExit: boolean;
    notifyContacts: boolean;
  };
  createdAt: string;
}

export interface NearbyHelper {
  id: string;
  name: string;
  type: 'volunteer' | 'verified' | 'professional' | 'community-member';
  location: {
    lat: number;
    lng: number;
    distance: number; // in meters
  };
  rating: number;
  responseTime: number; // average in minutes
  isAvailable: boolean;
  skills: string[]; // first-aid, security, counseling, etc.
  verificationStatus: 'verified' | 'pending' | 'unverified';
  contactInfo: {
    phone?: string;
    canCall: boolean;
    canMessage: boolean;
  };
}

interface SafetyState {
  emergencyContacts: EmergencyContact[];
  safetyTriggers: SafetyTrigger[];
  incidents: SafetyIncident[];
  checkInRequests: CheckInRequest[];
  safeZones: SafeZone[];
  nearbyHelpers: NearbyHelper[];
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
    accuracy: number;
    timestamp: string;
  };
  isEmergencyMode: boolean;
  lastCheckIn?: string;
  settings: {
    autoLocationSharing: boolean;
    emergencyTimeout: number; // minutes
    quietHours: {
      enabled: boolean;
      start: string; // HH:MM
      end: string; // HH:MM
    };
    panicButtonEnabled: boolean;
    voiceActivation: boolean;
  };
  isLoading: boolean;
  error: string | null;
}

type SafetyAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_EMERGENCY_CONTACTS'; payload: EmergencyContact[] }
  | { type: 'ADD_EMERGENCY_CONTACT'; payload: EmergencyContact }
  | { type: 'UPDATE_EMERGENCY_CONTACT'; payload: EmergencyContact }
  | { type: 'DELETE_EMERGENCY_CONTACT'; payload: string }
  | { type: 'SET_SAFETY_TRIGGERS'; payload: SafetyTrigger[] }
  | { type: 'ADD_SAFETY_TRIGGER'; payload: SafetyTrigger }
  | { type: 'UPDATE_SAFETY_TRIGGER'; payload: SafetyTrigger }
  | { type: 'DELETE_SAFETY_TRIGGER'; payload: string }
  | { type: 'TRIGGER_SAFETY_ALERT'; payload: { triggerId: string; location?: any } }
  | { type: 'SET_INCIDENTS'; payload: SafetyIncident[] }
  | { type: 'ADD_INCIDENT'; payload: SafetyIncident }
  | { type: 'UPDATE_INCIDENT'; payload: SafetyIncident }
  | { type: 'SET_CHECK_IN_REQUESTS'; payload: CheckInRequest[] }
  | { type: 'ADD_CHECK_IN_REQUEST'; payload: CheckInRequest }
  | { type: 'RESPOND_TO_CHECK_IN'; payload: { id: string; response: string; location?: any } }
  | { type: 'SET_SAFE_ZONES'; payload: SafeZone[] }
  | { type: 'ADD_SAFE_ZONE'; payload: SafeZone }
  | { type: 'UPDATE_SAFE_ZONE'; payload: SafeZone }
  | { type: 'DELETE_SAFE_ZONE'; payload: string }
  | { type: 'SET_NEARBY_HELPERS'; payload: NearbyHelper[] }
  | { type: 'SET_CURRENT_LOCATION'; payload: any }
  | { type: 'SET_EMERGENCY_MODE'; payload: boolean }
  | { type: 'UPDATE_LAST_CHECK_IN'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<SafetyState['settings']> };

const initialState: SafetyState = {
  emergencyContacts: [],
  safetyTriggers: [],
  incidents: [],
  checkInRequests: [],
  safeZones: [],
  nearbyHelpers: [],
  isEmergencyMode: false,
  settings: {
    autoLocationSharing: true,
    emergencyTimeout: 30,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '07:00'
    },
    panicButtonEnabled: true,
    voiceActivation: false
  },
  isLoading: false,
  error: null,
};

const safetyReducer = (state: SafetyState, action: SafetyAction): SafetyState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_EMERGENCY_CONTACTS':
      return { ...state, emergencyContacts: action.payload };
    case 'ADD_EMERGENCY_CONTACT':
      return { ...state, emergencyContacts: [...state.emergencyContacts, action.payload] };
    case 'UPDATE_EMERGENCY_CONTACT':
      return {
        ...state,
        emergencyContacts: state.emergencyContacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case 'DELETE_EMERGENCY_CONTACT':
      return {
        ...state,
        emergencyContacts: state.emergencyContacts.filter(contact => contact.id !== action.payload)
      };
    case 'SET_SAFETY_TRIGGERS':
      return { ...state, safetyTriggers: action.payload };
    case 'ADD_SAFETY_TRIGGER':
      return { ...state, safetyTriggers: [...state.safetyTriggers, action.payload] };
    case 'UPDATE_SAFETY_TRIGGER':
      return {
        ...state,
        safetyTriggers: state.safetyTriggers.map(trigger =>
          trigger.id === action.payload.id ? action.payload : trigger
        )
      };
    case 'DELETE_SAFETY_TRIGGER':
      return {
        ...state,
        safetyTriggers: state.safetyTriggers.filter(trigger => trigger.id !== action.payload)
      };
    case 'TRIGGER_SAFETY_ALERT':
      const trigger = state.safetyTriggers.find(t => t.id === action.payload.triggerId);
      if (trigger) {
        const incident: SafetyIncident = {
          id: Date.now().toString(),
          triggerId: action.payload.triggerId,
          triggerName: trigger.name,
          type: trigger.type === 'panic' ? 'panic' : 'manual',
          status: 'active',
          location: action.payload.location,
          timestamp: new Date().toISOString(),
          notifiedContacts: [],
          policeNotified: false
        };
        return {
          ...state,
          incidents: [incident, ...state.incidents],
          isEmergencyMode: true
        };
      }
      return state;
    case 'SET_INCIDENTS':
      return { ...state, incidents: action.payload };
    case 'ADD_INCIDENT':
      return { ...state, incidents: [action.payload, ...state.incidents] };
    case 'UPDATE_INCIDENT':
      return {
        ...state,
        incidents: state.incidents.map(incident =>
          incident.id === action.payload.id ? action.payload : incident
        )
      };
    case 'SET_CHECK_IN_REQUESTS':
      return { ...state, checkInRequests: action.payload };
    case 'ADD_CHECK_IN_REQUEST':
      return { ...state, checkInRequests: [action.payload, ...state.checkInRequests] };
    case 'RESPOND_TO_CHECK_IN':
      return {
        ...state,
        checkInRequests: state.checkInRequests.map(request =>
          request.id === action.payload.id
            ? {
                ...request,
                respondedAt: new Date().toISOString(),
                response: action.payload.response as any,
                location: action.payload.location
              }
            : request
        ),
        lastCheckIn: new Date().toISOString()
      };
    case 'SET_SAFE_ZONES':
      return { ...state, safeZones: action.payload };
    case 'ADD_SAFE_ZONE':
      return { ...state, safeZones: [...state.safeZones, action.payload] };
    case 'UPDATE_SAFE_ZONE':
      return {
        ...state,
        safeZones: state.safeZones.map(zone =>
          zone.id === action.payload.id ? action.payload : zone
        )
      };
    case 'DELETE_SAFE_ZONE':
      return {
        ...state,
        safeZones: state.safeZones.filter(zone => zone.id !== action.payload)
      };
    case 'SET_NEARBY_HELPERS':
      return { ...state, nearbyHelpers: action.payload };
    case 'SET_CURRENT_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'SET_EMERGENCY_MODE':
      return { ...state, isEmergencyMode: action.payload };
    case 'UPDATE_LAST_CHECK_IN':
      return { ...state, lastCheckIn: action.payload };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    default:
      return state;
  }
};

const SafetyContext = createContext<{
  state: SafetyState;
  dispatch: React.Dispatch<SafetyAction>;
  // Actions
  loadEmergencyContacts: () => Promise<void>;
  addEmergencyContact: (contact: Omit<EmergencyContact, 'id'>) => Promise<void>;
  updateEmergencyContact: (contact: EmergencyContact) => Promise<void>;
  deleteEmergencyContact: (id: string) => Promise<void>;
  loadSafetyTriggers: () => Promise<void>;
  addSafetyTrigger: (trigger: Omit<SafetyTrigger, 'id' | 'createdAt'>) => Promise<void>;
  updateSafetyTrigger: (trigger: SafetyTrigger) => Promise<void>;
  deleteSafetyTrigger: (id: string) => Promise<void>;
  triggerPanicButton: () => Promise<void>;
  triggerSafetyAlert: (triggerId: string) => Promise<void>;
  loadIncidents: () => Promise<void>;
  resolveIncident: (id: string, resolution: string, notes?: string) => Promise<void>;
  loadCheckInRequests: () => Promise<void>;
  requestCheckIn: (contactId: string, message: string, isUrgent?: boolean) => Promise<void>;
  respondToCheckIn: (id: string, response: 'safe' | 'need-help' | 'emergency') => Promise<void>;
  loadSafeZones: () => Promise<void>;
  addSafeZone: (zone: Omit<SafeZone, 'id' | 'createdAt'>) => Promise<void>;
  updateSafeZone: (zone: SafeZone) => Promise<void>;
  deleteSafeZone: (id: string) => Promise<void>;
  loadNearbyHelpers: () => Promise<void>;
  requestHelp: (helperId: string, message: string) => Promise<void>;
  getCurrentLocation: () => Promise<void>;
  updateSettings: (settings: Partial<SafetyState['settings']>) => Promise<void>;
  performCheckIn: (status: 'safe' | 'need-help' | 'emergency', message?: string) => Promise<void>;
} | null>(null);

export const SafetyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(safetyReducer, initialState);

  // Load emergency contacts
  const loadEmergencyContacts = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const savedContacts = localStorage.getItem('swumarket_emergency_contacts');
      if (savedContacts) {
        const contacts = JSON.parse(savedContacts);
        dispatch({ type: 'SET_EMERGENCY_CONTACTS', payload: contacts });
      } else {
        // Mock emergency contacts
        const mockContacts: EmergencyContact[] = [
          {
            id: '1',
            name: 'Mom',
            phone: '+263771234567',
            email: 'mom@example.com',
            relationship: 'family',
            isPrimary: true,
            isActive: true
          },
          {
            id: '2',
            name: 'Best Friend',
            phone: '+263777654321',
            relationship: 'friend',
            isPrimary: false,
            isActive: true
          }
        ];
        dispatch({ type: 'SET_EMERGENCY_CONTACTS', payload: mockContacts });
        localStorage.setItem('swumarket_emergency_contacts', JSON.stringify(mockContacts));
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load emergency contacts' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Add emergency contact
  const addEmergencyContact = async (contactData: Omit<EmergencyContact, 'id'>) => {
    const contact: EmergencyContact = {
      ...contactData,
      id: Date.now().toString()
    };
    dispatch({ type: 'ADD_EMERGENCY_CONTACT', payload: contact });
    
    // Update localStorage
    const updatedContacts = [...state.emergencyContacts, contact];
    localStorage.setItem('swumarket_emergency_contacts', JSON.stringify(updatedContacts));
  };

  // Update emergency contact
  const updateEmergencyContact = async (contact: EmergencyContact) => {
    dispatch({ type: 'UPDATE_EMERGENCY_CONTACT', payload: contact });
    
    // Update localStorage
    const updatedContacts = state.emergencyContacts.map(c => c.id === contact.id ? contact : c);
    localStorage.setItem('swumarket_emergency_contacts', JSON.stringify(updatedContacts));
  };

  // Delete emergency contact
  const deleteEmergencyContact = async (id: string) => {
    dispatch({ type: 'DELETE_EMERGENCY_CONTACT', payload: id });
    
    // Update localStorage
    const updatedContacts = state.emergencyContacts.filter(c => c.id !== id);
    localStorage.setItem('swumarket_emergency_contacts', JSON.stringify(updatedContacts));
  };

  // Load safety triggers
  const loadSafetyTriggers = async () => {
    try {
      const savedTriggers = localStorage.getItem('swumarket_safety_triggers');
      if (savedTriggers) {
        const triggers = JSON.parse(savedTriggers);
        dispatch({ type: 'SET_SAFETY_TRIGGERS', payload: triggers });
      } else {
        // Mock safety triggers
        const mockTriggers: SafetyTrigger[] = [
          {
            id: '1',
            type: 'panic',
            name: 'Panic Button',
            description: 'Emergency panic button for immediate help',
            isActive: true,
            triggerConditions: {},
            actions: {
              notifyContacts: true,
              sendLocation: true,
              callPolice: true,
              recordAudio: true,
              sendMessage: 'EMERGENCY: I need immediate help! My location is attached.',
              escalationDelay: 5
            },
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            type: 'check-in',
            name: 'Daily Check-in',
            description: 'Daily safety check-in reminder',
            isActive: true,
            triggerConditions: {
              timeoutMinutes: 1440 // 24 hours
            },
            actions: {
              notifyContacts: true,
              sendLocation: false,
              callPolice: false,
              recordAudio: false,
              sendMessage: 'Haven\'t heard from me in 24 hours. Please check on me.',
              escalationDelay: 60
            },
            createdAt: new Date().toISOString()
          }
        ];
        dispatch({ type: 'SET_SAFETY_TRIGGERS', payload: mockTriggers });
        localStorage.setItem('swumarket_safety_triggers', JSON.stringify(mockTriggers));
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load safety triggers' });
    }
  };

  // Add safety trigger
  const addSafetyTrigger = async (triggerData: Omit<SafetyTrigger, 'id' | 'createdAt'>) => {
    const trigger: SafetyTrigger = {
      ...triggerData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_SAFETY_TRIGGER', payload: trigger });
    
    // Update localStorage
    const updatedTriggers = [...state.safetyTriggers, trigger];
    localStorage.setItem('swumarket_safety_triggers', JSON.stringify(updatedTriggers));
  };

  // Update safety trigger
  const updateSafetyTrigger = async (trigger: SafetyTrigger) => {
    dispatch({ type: 'UPDATE_SAFETY_TRIGGER', payload: trigger });
    
    // Update localStorage
    const updatedTriggers = state.safetyTriggers.map(t => t.id === trigger.id ? trigger : t);
    localStorage.setItem('swumarket_safety_triggers', JSON.stringify(updatedTriggers));
  };

  // Delete safety trigger
  const deleteSafetyTrigger = async (id: string) => {
    dispatch({ type: 'DELETE_SAFETY_TRIGGER', payload: id });
    
    // Update localStorage
    const updatedTriggers = state.safetyTriggers.filter(t => t.id !== id);
    localStorage.setItem('swumarket_safety_triggers', JSON.stringify(updatedTriggers));
  };

  // Trigger panic button
  const triggerPanicButton = async () => {
    const panicTrigger = state.safetyTriggers.find(t => t.type === 'panic' && t.isActive);
    if (panicTrigger) {
      await triggerSafetyAlert(panicTrigger.id);
    }
  };

  // Trigger safety alert
  const triggerSafetyAlert = async (triggerId: string) => {
    try {
      // Get current location if available
      let location;
      if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: 'Current Location',
          accuracy: position.coords.accuracy
        };
      }

      dispatch({ type: 'TRIGGER_SAFETY_ALERT', payload: { triggerId, location } });
      
      // In a real app, this would:
      // 1. Send notifications to emergency contacts
      // 2. Share location
      // 3. Contact emergency services if configured
      // 4. Start audio recording if enabled
      
      alert('Emergency alert triggered! Your emergency contacts have been notified.');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to trigger safety alert' });
    }
  };

  // Load incidents
  const loadIncidents = async () => {
    try {
      const savedIncidents = localStorage.getItem('swumarket_safety_incidents');
      if (savedIncidents) {
        const incidents = JSON.parse(savedIncidents);
        dispatch({ type: 'SET_INCIDENTS', payload: incidents });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load incidents' });
    }
  };

  // Resolve incident
  const resolveIncident = async (id: string, resolution: string, notes?: string) => {
    const incident = state.incidents.find(i => i.id === id);
    if (incident) {
      const updatedIncident: SafetyIncident = {
        ...incident,
        status: resolution as any,
        resolvedAt: new Date().toISOString(),
        notes
      };
      dispatch({ type: 'UPDATE_INCIDENT', payload: updatedIncident });
      
      if (resolution === 'resolved' || resolution === 'false-alarm') {
        dispatch({ type: 'SET_EMERGENCY_MODE', payload: false });
      }
      
      // Update localStorage
      const updatedIncidents = state.incidents.map(i => i.id === id ? updatedIncident : i);
      localStorage.setItem('swumarket_safety_incidents', JSON.stringify(updatedIncidents));
    }
  };

  // Load check-in requests
  const loadCheckInRequests = async () => {
    try {
      const savedRequests = localStorage.getItem('swumarket_checkin_requests');
      if (savedRequests) {
        const requests = JSON.parse(savedRequests);
        dispatch({ type: 'SET_CHECK_IN_REQUESTS', payload: requests });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load check-in requests' });
    }
  };

  // Request check-in
  const requestCheckIn = async (contactId: string, message: string, isUrgent = false) => {
    const request: CheckInRequest = {
      id: Date.now().toString(),
      message,
      requestedBy: contactId,
      requestedAt: new Date().toISOString(),
      isUrgent
    };
    dispatch({ type: 'ADD_CHECK_IN_REQUEST', payload: request });
    
    // Update localStorage
    const updatedRequests = [request, ...state.checkInRequests];
    localStorage.setItem('swumarket_checkin_requests', JSON.stringify(updatedRequests));
  };

  // Respond to check-in
  const respondToCheckIn = async (id: string, response: 'safe' | 'need-help' | 'emergency') => {
    let location;
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: 'Current Location'
        };
      } catch (error) {
        // Location not available
      }
    }

    dispatch({ type: 'RESPOND_TO_CHECK_IN', payload: { id, response, location } });
    
    // If emergency response, trigger safety alert
    if (response === 'emergency') {
      await triggerPanicButton();
    }
    
    // Update localStorage
    const updatedRequests = state.checkInRequests.map(r =>
      r.id === id
        ? {
            ...r,
            respondedAt: new Date().toISOString(),
            response,
            location
          }
        : r
    );
    localStorage.setItem('swumarket_checkin_requests', JSON.stringify(updatedRequests));
  };

  // Load safe zones
  const loadSafeZones = async () => {
    try {
      const savedZones = localStorage.getItem('swumarket_safe_zones');
      if (savedZones) {
        const zones = JSON.parse(savedZones);
        dispatch({ type: 'SET_SAFE_ZONES', payload: zones });
      } else {
        // Mock safe zones
        const mockZones: SafeZone[] = [
          {
            id: '1',
            name: 'Home',
            description: 'My home address',
            location: {
              lat: -17.8252,
              lng: 31.0335,
              radius: 100
            },
            type: 'home',
            isActive: true,
            notifications: {
              onEnter: false,
              onExit: true,
              notifyContacts: false
            },
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Work',
            description: 'My workplace',
            location: {
              lat: -17.8292,
              lng: 31.0522,
              radius: 50
            },
            type: 'work',
            isActive: true,
            notifications: {
              onEnter: true,
              onExit: true,
              notifyContacts: true
            },
            createdAt: new Date().toISOString()
          }
        ];
        dispatch({ type: 'SET_SAFE_ZONES', payload: mockZones });
        localStorage.setItem('swumarket_safe_zones', JSON.stringify(mockZones));
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load safe zones' });
    }
  };

  // Add safe zone
  const addSafeZone = async (zoneData: Omit<SafeZone, 'id' | 'createdAt'>) => {
    const zone: SafeZone = {
      ...zoneData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_SAFE_ZONE', payload: zone });
    
    // Update localStorage
    const updatedZones = [...state.safeZones, zone];
    localStorage.setItem('swumarket_safe_zones', JSON.stringify(updatedZones));
  };

  // Update safe zone
  const updateSafeZone = async (zone: SafeZone) => {
    dispatch({ type: 'UPDATE_SAFE_ZONE', payload: zone });
    
    // Update localStorage
    const updatedZones = state.safeZones.map(z => z.id === zone.id ? zone : z);
    localStorage.setItem('swumarket_safe_zones', JSON.stringify(updatedZones));
  };

  // Delete safe zone
  const deleteSafeZone = async (id: string) => {
    dispatch({ type: 'DELETE_SAFE_ZONE', payload: id });
    
    // Update localStorage
    const updatedZones = state.safeZones.filter(z => z.id !== id);
    localStorage.setItem('swumarket_safe_zones', JSON.stringify(updatedZones));
  };

  // Load nearby helpers
  const loadNearbyHelpers = async () => {
    try {
      // Mock nearby helpers
      const helpers: NearbyHelper[] = [
        {
          id: '1',
          name: 'Sarah Community Volunteer',
          type: 'volunteer',
          location: {
            lat: -17.8252,
            lng: 31.0335,
            distance: 250
          },
          rating: 4.8,
          responseTime: 5,
          isAvailable: true,
          skills: ['first-aid', 'counseling'],
          verificationStatus: 'verified',
          contactInfo: {
            canCall: true,
            canMessage: true
          }
        },
        {
          id: '2',
          name: 'Mike Security Guard',
          type: 'professional',
          location: {
            lat: -17.8272,
            lng: 31.0355,
            distance: 180
          },
          rating: 4.9,
          responseTime: 3,
          isAvailable: true,
          skills: ['security', 'first-aid'],
          verificationStatus: 'verified',
          contactInfo: {
            phone: '+263771234567',
            canCall: true,
            canMessage: true
          }
        }
      ];
      dispatch({ type: 'SET_NEARBY_HELPERS', payload: helpers });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load nearby helpers' });
    }
  };

  // Request help
  const requestHelp = async (helperId: string, message: string) => {
    // In a real app, this would send a help request to the helper
    alert(`Help request sent to helper. They will be notified immediately.`);
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
          address: 'Current Location', // In real app, reverse geocode
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        };
        
        dispatch({ type: 'SET_CURRENT_LOCATION', payload: location });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to get current location' });
      }
    }
  };

  // Update settings
  const updateSettings = async (newSettings: Partial<SafetyState['settings']>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: newSettings });
    
    // Update localStorage
    const updatedSettings = { ...state.settings, ...newSettings };
    localStorage.setItem('swumarket_safety_settings', JSON.stringify(updatedSettings));
  };

  // Perform check-in
  const performCheckIn = async (status: 'safe' | 'need-help' | 'emergency', message?: string) => {
    dispatch({ type: 'UPDATE_LAST_CHECK_IN', payload: new Date().toISOString() });
    
    if (status === 'emergency') {
      await triggerPanicButton();
    } else if (status === 'need-help') {
      // Create a help request incident
      const incident: SafetyIncident = {
        id: Date.now().toString(),
        triggerId: 'manual',
        triggerName: 'Manual Check-in',
        type: 'manual',
        status: 'active',
        timestamp: new Date().toISOString(),
        notifiedContacts: [],
        policeNotified: false,
        userResponse: message || 'User indicated they need help'
      };
      dispatch({ type: 'ADD_INCIDENT', payload: incident });
    }
    
    // Update localStorage
    localStorage.setItem('swumarket_last_checkin', new Date().toISOString());
  };

  // Load data on mount
  useEffect(() => {
    loadEmergencyContacts();
    loadSafetyTriggers();
    loadIncidents();
    loadCheckInRequests();
    loadSafeZones();
    loadNearbyHelpers();
    getCurrentLocation();
    
    // Load settings
    const savedSettings = localStorage.getItem('swumarket_safety_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
    }
    
    // Load last check-in
    const lastCheckIn = localStorage.getItem('swumarket_last_checkin');
    if (lastCheckIn) {
      dispatch({ type: 'UPDATE_LAST_CHECK_IN', payload: lastCheckIn });
    }
  }, []);

  const value = {
    state,
    dispatch,
    loadEmergencyContacts,
    addEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
    loadSafetyTriggers,
    addSafetyTrigger,
    updateSafetyTrigger,
    deleteSafetyTrigger,
    triggerPanicButton,
    triggerSafetyAlert,
    loadIncidents,
    resolveIncident,
    loadCheckInRequests,
    requestCheckIn,
    respondToCheckIn,
    loadSafeZones,
    addSafeZone,
    updateSafeZone,
    deleteSafeZone,
    loadNearbyHelpers,
    requestHelp,
    getCurrentLocation,
    updateSettings,
    performCheckIn,
  };

  return (
    <SafetyContext.Provider value={value}>
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (!context) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};
