export type MobileSurface = 'chat-list' | 'conversation' | 'catch-up-detail' | 'global-catch-up';

export type AppState = {
  activeSection: 'chats' | 'status' | 'channels' | 'communities' | 'catch-up' | 'settings';
  selectedChatId: string | null;
  selectedCatchUpId: string | null;
  isCatchUpPanelOpen: boolean;
  activeChatFilter: 'all' | 'unread' | 'favorites' | 'groups' | 'catch-up';
  composerText: string;
  replyHelperOpen: boolean;
  selectedQuestionIds: string[];
  playbackState: 'stopped' | 'playing' | 'paused';
  playbackProgressSeconds: number;
  activeVoiceNoteId: string | null;
  activeAudioUrl: string | null;
  activeVoiceNoteStartSeconds: number;
  theme: 'light' | 'dark' | 'system';
  
  mobileSurface: MobileSurface;
  previousMobileSurface?: MobileSurface;
  
  chats: Chat[];
  messages: Message[];
  voiceNotes: VoiceNote[];
  catchUps: CatchUpResult[];
};

export type Chat = {
  id: string;
  name: string;
  avatarUrl?: string;
  isGroup: boolean;
  participants?: string[];
  lastMessageAt: string;
  unreadCount: number;
  isMuted: boolean;
  isPinned: boolean;
  isFavorite: boolean;
  hasCatchUp: boolean;
  catchUpStatus?: 'ready' | 'generating' | 'failed';
};

export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  direction: 'incoming' | 'outgoing';
  type: 'text' | 'voice_note';
  text?: string;
  sentAt: string;
};

export type VoiceNote = {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  direction: 'incoming' | 'outgoing';
  durationSeconds: number;
  audioUrl?: string;
  sentAt: string;
  waveform: number[];
  isPlayed: boolean;
  playbackProgressSeconds: number;
  clusterId?: string;
};

export type CatchUpTopic = {
  id: string;
  label: string;
  summary: string;
  startTimeSeconds: number;
  endTimeSeconds: number;
  importance: 'low' | 'medium' | 'high';
};

export type CatchUpQuestion = {
  id: string;
  questionText: string;
  normalizedAsk: string;
  directedAtUser: boolean;
  startTimeSeconds: number;
  endTimeSeconds: number;
  suggestedAnswer?: string;
  status: 'open' | 'answered' | 'dismissed';
  confidence: number;
};

export type CatchUpDecision = {
  id: string;
  decisionText: string;
  startTimeSeconds: number;
  endTimeSeconds: number;
  confidence: number;
};

export type CatchUpTone = {
  label: 'excited' | 'stressed' | 'casual' | 'urgent' | 'happy' | 'concerned' | 'frustrated';
  evidence: string;
  confidence: number;
};

export type CatchUpUpdate = {
  id: string;
  updateText: string;
};

export type AudioSegment = {
  id: string;
  startTimeSeconds: number;
  endTimeSeconds: number;
};

export type SuggestedReply = {
  id: string;
  mode: 'short' | 'detailed' | 'warm' | 'point_by_point';
  text: string;
  coversQuestionIds: string[];
};

export type TranscriptSegment = {
  id: string;
  startTimeSeconds: number;
  endTimeSeconds: number;
  text: string;
  isQuestion?: boolean;
  isDecision?: boolean;
};

export type CatchUpResult = {
  id: string;
  chatId: string;
  senderName: string;
  voiceNoteIds: string[];
  totalDurationSeconds: number;
  generatedAt: string;
  status: 'ready' | 'generating' | 'failed';
  headline: string;
  topics: CatchUpTopic[];
  questions: CatchUpQuestion[];
  decisions: CatchUpDecision[];
  updates: CatchUpUpdate[];
  tone: CatchUpTone[];
  importantSegments: AudioSegment[];
  suggestedReplies: SuggestedReply[];
  transcript?: TranscriptSegment[];
  confidence: number;
};
