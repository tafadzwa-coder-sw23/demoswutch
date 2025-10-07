import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Anonymous Groups Types
export interface AnonymousGroup {
  id: string;
  name: string;
  description: string;
  category: 'church' | 'community' | 'support' | 'hobby' | 'study' | 'charity' | 'other';
  type: 'public' | 'private' | 'invite-only';
  memberCount: number;
  maxMembers?: number;
  location?: string;
  meetingSchedule?: string;
  tags: string[];
  isJoined: boolean;
  joinedAt?: string;
  anonymityLevel: 'low' | 'medium' | 'high'; // How anonymous members are
  createdAt: string;
  lastActivity: string;
  rules: string[];
  moderators: number; // Count only for privacy
}

export interface GroupMessage {
  id: string;
  groupId: string;
  senderId: string; // Anonymous ID
  senderAlias: string; // Anonymous name like "Member #123"
  content: string;
  type: 'text' | 'image' | 'poll' | 'announcement' | 'prayer-request' | 'event';
  timestamp: string;
  isAnonymous: boolean;
  reactions: {
    emoji: string;
    count: number;
    userReacted: boolean;
  }[];
  replies?: GroupMessage[];
}

export interface GroupEvent {
  id: string;
  groupId: string;
  title: string;
  description: string;
  type: 'meeting' | 'service' | 'study' | 'social' | 'charity' | 'other';
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  virtualLink?: string;
  attendees: number;
  isAttending: boolean;
  isAnonymous: boolean; // Whether attendance is anonymous
  createdBy: string; // Anonymous ID
}

export interface PrayerRequest {
  id: string;
  groupId: string;
  title: string;
  description: string;
  category: 'health' | 'family' | 'work' | 'spiritual' | 'community' | 'other';
  isAnonymous: boolean;
  requesterId: string; // Anonymous ID
  requesterAlias: string;
  prayerCount: number;
  userPrayed: boolean;
  timestamp: string;
  status: 'active' | 'answered' | 'closed';
  updates: {
    id: string;
    content: string;
    timestamp: string;
  }[];
}

export interface GroupPoll {
  id: string;
  groupId: string;
  question: string;
  options: {
    id: string;
    text: string;
    votes: number;
    userVoted: boolean;
  }[];
  createdBy: string; // Anonymous ID
  createdAt: string;
  expiresAt: string;
  isAnonymous: boolean;
  totalVotes: number;
}

interface AnonymousGroupsState {
  groups: AnonymousGroup[];
  joinedGroups: AnonymousGroup[];
  messages: Record<string, GroupMessage[]>; // groupId -> messages
  events: GroupEvent[];
  prayerRequests: PrayerRequest[];
  polls: GroupPoll[];
  userAnonymousId: string;
  userAlias: string;
  isLoading: boolean;
  error: string | null;
}

type AnonymousGroupsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_GROUPS'; payload: AnonymousGroup[] }
  | { type: 'SET_JOINED_GROUPS'; payload: AnonymousGroup[] }
  | { type: 'JOIN_GROUP'; payload: string }
  | { type: 'LEAVE_GROUP'; payload: string }
  | { type: 'SET_MESSAGES'; payload: { groupId: string; messages: GroupMessage[] } }
  | { type: 'ADD_MESSAGE'; payload: GroupMessage }
  | { type: 'ADD_REACTION'; payload: { messageId: string; emoji: string } }
  | { type: 'SET_EVENTS'; payload: GroupEvent[] }
  | { type: 'ADD_EVENT'; payload: GroupEvent }
  | { type: 'ATTEND_EVENT'; payload: string }
  | { type: 'SET_PRAYER_REQUESTS'; payload: PrayerRequest[] }
  | { type: 'ADD_PRAYER_REQUEST'; payload: PrayerRequest }
  | { type: 'PRAY_FOR_REQUEST'; payload: string }
  | { type: 'SET_POLLS'; payload: GroupPoll[] }
  | { type: 'ADD_POLL'; payload: GroupPoll }
  | { type: 'VOTE_POLL'; payload: { pollId: string; optionId: string } }
  | { type: 'SET_USER_ANONYMOUS_ID'; payload: string }
  | { type: 'SET_USER_ALIAS'; payload: string };

const initialState: AnonymousGroupsState = {
  groups: [],
  joinedGroups: [],
  messages: {},
  events: [],
  prayerRequests: [],
  polls: [],
  userAnonymousId: '',
  userAlias: '',
  isLoading: false,
  error: null,
};

const anonymousGroupsReducer = (state: AnonymousGroupsState, action: AnonymousGroupsAction): AnonymousGroupsState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_GROUPS':
      return { ...state, groups: action.payload };
    case 'SET_JOINED_GROUPS':
      return { ...state, joinedGroups: action.payload };
    case 'JOIN_GROUP':
      return {
        ...state,
        groups: state.groups.map(group =>
          group.id === action.payload 
            ? { ...group, isJoined: true, memberCount: group.memberCount + 1, joinedAt: new Date().toISOString() }
            : group
        ),
        joinedGroups: [
          ...state.joinedGroups,
          { ...state.groups.find(g => g.id === action.payload)!, isJoined: true, joinedAt: new Date().toISOString() }
        ]
      };
    case 'LEAVE_GROUP':
      return {
        ...state,
        groups: state.groups.map(group =>
          group.id === action.payload 
            ? { ...group, isJoined: false, memberCount: Math.max(0, group.memberCount - 1) }
            : group
        ),
        joinedGroups: state.joinedGroups.filter(group => group.id !== action.payload)
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.groupId]: action.payload.messages
        }
      };
    case 'ADD_MESSAGE':
      const groupId = action.payload.groupId;
      return {
        ...state,
        messages: {
          ...state.messages,
          [groupId]: [...(state.messages[groupId] || []), action.payload]
        }
      };
    case 'ADD_REACTION':
      return {
        ...state,
        messages: Object.fromEntries(
          Object.entries(state.messages).map(([gId, msgs]) => [
            gId,
            msgs.map(msg =>
              msg.id === action.payload.messageId
                ? {
                    ...msg,
                    reactions: msg.reactions.map(r =>
                      r.emoji === action.payload.emoji
                        ? { ...r, count: r.count + 1, userReacted: true }
                        : r
                    )
                  }
                : msg
            )
          ])
        )
      };
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'ATTEND_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload
            ? { ...event, isAttending: true, attendees: event.attendees + 1 }
            : event
        )
      };
    case 'SET_PRAYER_REQUESTS':
      return { ...state, prayerRequests: action.payload };
    case 'ADD_PRAYER_REQUEST':
      return { ...state, prayerRequests: [action.payload, ...state.prayerRequests] };
    case 'PRAY_FOR_REQUEST':
      return {
        ...state,
        prayerRequests: state.prayerRequests.map(request =>
          request.id === action.payload
            ? { ...request, userPrayed: true, prayerCount: request.prayerCount + 1 }
            : request
        )
      };
    case 'SET_POLLS':
      return { ...state, polls: action.payload };
    case 'ADD_POLL':
      return { ...state, polls: [action.payload, ...state.polls] };
    case 'VOTE_POLL':
      return {
        ...state,
        polls: state.polls.map(poll =>
          poll.id === action.payload.pollId
            ? {
                ...poll,
                options: poll.options.map(option =>
                  option.id === action.payload.optionId
                    ? { ...option, votes: option.votes + 1, userVoted: true }
                    : option
                ),
                totalVotes: poll.totalVotes + 1
              }
            : poll
        )
      };
    case 'SET_USER_ANONYMOUS_ID':
      return { ...state, userAnonymousId: action.payload };
    case 'SET_USER_ALIAS':
      return { ...state, userAlias: action.payload };
    default:
      return state;
  }
};

const AnonymousGroupsContext = createContext<{
  state: AnonymousGroupsState;
  dispatch: React.Dispatch<AnonymousGroupsAction>;
  // Actions
  loadGroups: () => Promise<void>;
  loadJoinedGroups: () => Promise<void>;
  joinGroup: (groupId: string) => Promise<void>;
  leaveGroup: (groupId: string) => Promise<void>;
  loadMessages: (groupId: string) => Promise<void>;
  sendMessage: (groupId: string, content: string, type?: string, isAnonymous?: boolean) => Promise<void>;
  addReaction: (messageId: string, emoji: string) => Promise<void>;
  loadEvents: (groupId?: string) => Promise<void>;
  createEvent: (event: Omit<GroupEvent, 'id' | 'attendees' | 'isAttending' | 'createdBy'>) => Promise<void>;
  attendEvent: (eventId: string) => Promise<void>;
  loadPrayerRequests: (groupId?: string) => Promise<void>;
  createPrayerRequest: (request: Omit<PrayerRequest, 'id' | 'prayerCount' | 'userPrayed' | 'timestamp' | 'requesterId' | 'requesterAlias' | 'updates'>) => Promise<void>;
  prayForRequest: (requestId: string) => Promise<void>;
  loadPolls: (groupId?: string) => Promise<void>;
  createPoll: (poll: Omit<GroupPoll, 'id' | 'createdBy' | 'createdAt' | 'totalVotes'>) => Promise<void>;
  votePoll: (pollId: string, optionId: string) => Promise<void>;
  generateAnonymousId: () => string;
  generateAnonymousAlias: () => string;
} | null>(null);

export const AnonymousGroupsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(anonymousGroupsReducer, initialState);

  // Generate anonymous ID
  const generateAnonymousId = () => {
    return 'anon_' + Math.random().toString(36).substr(2, 9);
  };

  // Generate anonymous alias
  const generateAnonymousAlias = () => {
    const adjectives = ['Faithful', 'Hopeful', 'Peaceful', 'Joyful', 'Blessed', 'Grateful', 'Loving', 'Kind'];
    const nouns = ['Believer', 'Seeker', 'Friend', 'Member', 'Soul', 'Heart', 'Spirit', 'Light'];
    const number = Math.floor(Math.random() * 999) + 1;
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]} #${number}`;
  };

  // Load groups
  const loadGroups = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Mock groups data
      const groups: AnonymousGroup[] = [
        {
          id: '1',
          name: 'St. Mary\'s Community',
          description: 'A supportive community for spiritual growth and fellowship',
          category: 'church',
          type: 'public',
          memberCount: 245,
          location: 'Harare, Zimbabwe',
          meetingSchedule: 'Sundays 9:00 AM',
          tags: ['prayer', 'fellowship', 'community', 'support'],
          isJoined: false,
          anonymityLevel: 'medium',
          createdAt: '2024-01-01T00:00:00Z',
          lastActivity: new Date().toISOString(),
          rules: [
            'Respect all members',
            'Keep discussions appropriate',
            'Maintain confidentiality',
            'Be supportive and encouraging'
          ],
          moderators: 3
        },
        {
          id: '2',
          name: 'Anonymous Support Circle',
          description: 'Safe space for sharing struggles and finding support',
          category: 'support',
          type: 'private',
          memberCount: 89,
          tags: ['support', 'anonymous', 'healing', 'encouragement'],
          isJoined: false,
          anonymityLevel: 'high',
          createdAt: '2024-01-15T00:00:00Z',
          lastActivity: new Date().toISOString(),
          rules: [
            'Complete anonymity required',
            'No personal information sharing',
            'Respectful communication only',
            'Confidentiality is paramount'
          ],
          moderators: 2
        },
        {
          id: '3',
          name: 'Community Garden Project',
          description: 'Working together to create sustainable community gardens',
          category: 'community',
          type: 'public',
          memberCount: 156,
          maxMembers: 200,
          location: 'Various locations in Harare',
          tags: ['gardening', 'sustainability', 'community', 'environment'],
          isJoined: false,
          anonymityLevel: 'low',
          createdAt: '2024-02-01T00:00:00Z',
          lastActivity: new Date().toISOString(),
          rules: [
            'Participate actively in projects',
            'Share resources when possible',
            'Respect the environment',
            'Help newcomers learn'
          ],
          moderators: 4
        },
        {
          id: '4',
          name: 'Bible Study Fellowship',
          description: 'Deep dive into scripture with fellow believers',
          category: 'study',
          type: 'invite-only',
          memberCount: 67,
          maxMembers: 100,
          meetingSchedule: 'Wednesdays 7:00 PM',
          tags: ['bible', 'study', 'scripture', 'learning'],
          isJoined: false,
          anonymityLevel: 'low',
          createdAt: '2024-01-20T00:00:00Z',
          lastActivity: new Date().toISOString(),
          rules: [
            'Come prepared with questions',
            'Respect different interpretations',
            'Maintain regular attendance',
            'Keep discussions focused on scripture'
          ],
          moderators: 2
        },
        {
          id: '5',
          name: 'Charity Coordination Hub',
          description: 'Organizing community charity efforts and volunteer work',
          category: 'charity',
          type: 'public',
          memberCount: 312,
          tags: ['charity', 'volunteering', 'community service', 'helping'],
          isJoined: false,
          anonymityLevel: 'medium',
          createdAt: '2024-01-10T00:00:00Z',
          lastActivity: new Date().toISOString(),
          rules: [
            'Verify charity organizations',
            'Be transparent about fund usage',
            'Coordinate to avoid duplication',
            'Share success stories'
          ],
          moderators: 5
        }
      ];
      dispatch({ type: 'SET_GROUPS', payload: groups });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load groups' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Load joined groups
  const loadJoinedGroups = async () => {
    try {
      const savedGroups = localStorage.getItem('swumarket_joined_groups');
      if (savedGroups) {
        const groups = JSON.parse(savedGroups);
        dispatch({ type: 'SET_JOINED_GROUPS', payload: groups });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load joined groups' });
    }
  };

  // Join group
  const joinGroup = async (groupId: string) => {
    dispatch({ type: 'JOIN_GROUP', payload: groupId });
    
    // Update localStorage
    const updatedJoinedGroups = [...state.joinedGroups, state.groups.find(g => g.id === groupId)!];
    localStorage.setItem('swumarket_joined_groups', JSON.stringify(updatedJoinedGroups));
  };

  // Leave group
  const leaveGroup = async (groupId: string) => {
    dispatch({ type: 'LEAVE_GROUP', payload: groupId });
    
    // Update localStorage
    const updatedJoinedGroups = state.joinedGroups.filter(g => g.id !== groupId);
    localStorage.setItem('swumarket_joined_groups', JSON.stringify(updatedJoinedGroups));
  };

  // Load messages
  const loadMessages = async (groupId: string) => {
    try {
      // Mock messages
      const messages: GroupMessage[] = [
        {
          id: '1',
          groupId,
          senderId: 'anon_123',
          senderAlias: 'Faithful Friend #123',
          content: 'Welcome everyone to our community! Let\'s support each other.',
          type: 'announcement',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isAnonymous: true,
          reactions: [
            { emoji: '🙏', count: 5, userReacted: false },
            { emoji: '❤️', count: 3, userReacted: false }
          ]
        },
        {
          id: '2',
          groupId,
          senderId: 'anon_456',
          senderAlias: 'Hopeful Heart #456',
          content: 'Please keep my family in your prayers during this difficult time.',
          type: 'prayer-request',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          isAnonymous: true,
          reactions: [
            { emoji: '🙏', count: 12, userReacted: false },
            { emoji: '❤️', count: 8, userReacted: false }
          ]
        }
      ];
      dispatch({ type: 'SET_MESSAGES', payload: { groupId, messages } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load messages' });
    }
  };

  // Send message
  const sendMessage = async (groupId: string, content: string, type = 'text', isAnonymous = true) => {
    const message: GroupMessage = {
      id: Date.now().toString(),
      groupId,
      senderId: state.userAnonymousId,
      senderAlias: state.userAlias,
      content,
      type: type as any,
      timestamp: new Date().toISOString(),
      isAnonymous,
      reactions: []
    };
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  };

  // Add reaction
  const addReaction = async (messageId: string, emoji: string) => {
    dispatch({ type: 'ADD_REACTION', payload: { messageId, emoji } });
  };

  // Load events
  const loadEvents = async (groupId?: string) => {
    try {
      // Mock events
      const events: GroupEvent[] = [
        {
          id: '1',
          groupId: groupId || '1',
          title: 'Sunday Service',
          description: 'Weekly worship service with communion',
          type: 'service',
          date: '2024-01-14',
          time: '09:00',
          location: 'Main Chapel',
          isVirtual: false,
          attendees: 45,
          isAttending: false,
          isAnonymous: false,
          createdBy: 'anon_mod1'
        },
        {
          id: '2',
          groupId: groupId || '1',
          title: 'Community Garden Workday',
          description: 'Help plant and maintain our community garden',
          type: 'social',
          date: '2024-01-20',
          time: '08:00',
          location: 'Community Garden Site',
          isVirtual: false,
          attendees: 23,
          isAttending: false,
          isAnonymous: true,
          createdBy: 'anon_789'
        }
      ];
      dispatch({ type: 'SET_EVENTS', payload: events });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load events' });
    }
  };

  // Create event
  const createEvent = async (eventData: Omit<GroupEvent, 'id' | 'attendees' | 'isAttending' | 'createdBy'>) => {
    const event: GroupEvent = {
      ...eventData,
      id: Date.now().toString(),
      attendees: 0,
      isAttending: false,
      createdBy: state.userAnonymousId
    };
    dispatch({ type: 'ADD_EVENT', payload: event });
  };

  // Attend event
  const attendEvent = async (eventId: string) => {
    dispatch({ type: 'ATTEND_EVENT', payload: eventId });
  };

  // Load prayer requests
  const loadPrayerRequests = async (groupId?: string) => {
    try {
      // Mock prayer requests
      const requests: PrayerRequest[] = [
        {
          id: '1',
          groupId: groupId || '1',
          title: 'Healing for my mother',
          description: 'Please pray for my mother who is in the hospital',
          category: 'health',
          isAnonymous: true,
          requesterId: 'anon_456',
          requesterAlias: 'Hopeful Heart #456',
          prayerCount: 25,
          userPrayed: false,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          status: 'active',
          updates: []
        },
        {
          id: '2',
          groupId: groupId || '1',
          title: 'Job search guidance',
          description: 'Seeking prayers for wisdom in my job search',
          category: 'work',
          isAnonymous: true,
          requesterId: 'anon_789',
          requesterAlias: 'Faithful Seeker #789',
          prayerCount: 18,
          userPrayed: false,
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          status: 'active',
          updates: []
        }
      ];
      dispatch({ type: 'SET_PRAYER_REQUESTS', payload: requests });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load prayer requests' });
    }
  };

  // Create prayer request
  const createPrayerRequest = async (requestData: Omit<PrayerRequest, 'id' | 'prayerCount' | 'userPrayed' | 'timestamp' | 'requesterId' | 'requesterAlias' | 'updates'>) => {
    const request: PrayerRequest = {
      ...requestData,
      id: Date.now().toString(),
      prayerCount: 0,
      userPrayed: false,
      timestamp: new Date().toISOString(),
      requesterId: state.userAnonymousId,
      requesterAlias: state.userAlias,
      updates: []
    };
    dispatch({ type: 'ADD_PRAYER_REQUEST', payload: request });
  };

  // Pray for request
  const prayForRequest = async (requestId: string) => {
    dispatch({ type: 'PRAY_FOR_REQUEST', payload: requestId });
  };

  // Load polls
  const loadPolls = async (groupId?: string) => {
    try {
      // Mock polls
      const polls: GroupPoll[] = [
        {
          id: '1',
          groupId: groupId || '1',
          question: 'What time works best for our weekly Bible study?',
          options: [
            { id: '1', text: 'Wednesday 7:00 PM', votes: 12, userVoted: false },
            { id: '2', text: 'Thursday 7:00 PM', votes: 8, userVoted: false },
            { id: '3', text: 'Saturday 10:00 AM', votes: 15, userVoted: false }
          ],
          createdBy: 'anon_mod1',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          isAnonymous: true,
          totalVotes: 35
        }
      ];
      dispatch({ type: 'SET_POLLS', payload: polls });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load polls' });
    }
  };

  // Create poll
  const createPoll = async (pollData: Omit<GroupPoll, 'id' | 'createdBy' | 'createdAt' | 'totalVotes'>) => {
    const poll: GroupPoll = {
      ...pollData,
      id: Date.now().toString(),
      createdBy: state.userAnonymousId,
      createdAt: new Date().toISOString(),
      totalVotes: 0
    };
    dispatch({ type: 'ADD_POLL', payload: poll });
  };

  // Vote poll
  const votePoll = async (pollId: string, optionId: string) => {
    dispatch({ type: 'VOTE_POLL', payload: { pollId, optionId } });
  };

  // Initialize user anonymous identity
  useEffect(() => {
    let anonymousId = localStorage.getItem('swumarket_anonymous_id');
    let alias = localStorage.getItem('swumarket_anonymous_alias');
    
    if (!anonymousId) {
      anonymousId = generateAnonymousId();
      localStorage.setItem('swumarket_anonymous_id', anonymousId);
    }
    
    if (!alias) {
      alias = generateAnonymousAlias();
      localStorage.setItem('swumarket_anonymous_alias', alias);
    }
    
    dispatch({ type: 'SET_USER_ANONYMOUS_ID', payload: anonymousId });
    dispatch({ type: 'SET_USER_ALIAS', payload: alias });
  }, []);

  // Load data on mount
  useEffect(() => {
    loadGroups();
    loadJoinedGroups();
  }, []);

  const value = {
    state,
    dispatch,
    loadGroups,
    loadJoinedGroups,
    joinGroup,
    leaveGroup,
    loadMessages,
    sendMessage,
    addReaction,
    loadEvents,
    createEvent,
    attendEvent,
    loadPrayerRequests,
    createPrayerRequest,
    prayForRequest,
    loadPolls,
    createPoll,
    votePoll,
    generateAnonymousId,
    generateAnonymousAlias,
  };

  return (
    <AnonymousGroupsContext.Provider value={value}>
      {children}
    </AnonymousGroupsContext.Provider>
  );
};

export const useAnonymousGroups = () => {
  const context = useContext(AnonymousGroupsContext);
  if (!context) {
    throw new Error('useAnonymousGroups must be used within an AnonymousGroupsProvider');
  }
  return context;
};
