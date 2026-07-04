import { Message, VoiceNote } from '../types';

export const mockMessages: Message[] = [
  { id: 'msg-1', chatId: 'chat-1', senderId: 'me', senderName: 'Me', direction: 'outgoing', type: 'text', text: 'Hey Ellie, any updates on the wedding planning?', sentAt: '10:00 AM' },
  { id: 'msg-2', chatId: 'chat-2', senderId: 'eddie', senderName: 'Eddie', direction: 'incoming', type: 'text', text: 'Check out these designs when you get a chance.', sentAt: 'Yesterday' },
  { id: 'msg-3', chatId: 'chat-3', senderId: 'me', senderName: 'Me', direction: 'outgoing', type: 'text', text: 'Can everyone do Sunday?', sentAt: 'Tuesday' },
  { id: 'msg-4', chatId: 'chat-4', senderId: 'alex', senderName: 'Alex', direction: 'incoming', type: 'text', text: 'Standup notes attached.', sentAt: 'Monday' },
  { id: 'msg-5', chatId: 'chat-5', senderId: 'vendor', senderName: 'Vendor', direction: 'incoming', type: 'text', text: 'Invoice is ready.', sentAt: '09/14/2026' },
  { id: 'msg-6', chatId: 'chat-6', senderId: 'friend', senderName: 'Friend', direction: 'incoming', type: 'text', text: 'Did you see that game?!', sentAt: '09/12/2026' },
  { id: 'msg-7', chatId: 'chat-7', senderId: 'contact7', senderName: 'John', direction: 'incoming', type: 'text', text: 'Quick question for you.', sentAt: '09/10/2026' },
  { id: 'msg-8', chatId: 'chat-8', senderId: 'me', senderName: 'Me', direction: 'outgoing', type: 'text', text: 'Okay, sounds good.', sentAt: '09/08/2026' }
];

export const mockVoiceNotes: VoiceNote[] = [
  // Ellie (chat-1) - 7 VNs, 1080s total
  { id: 'vn-1', chatId: 'chat-1', senderId: 'ellie', senderName: 'Ellie', direction: 'incoming', durationSeconds: 150, audioUrl: '/audio/ellie-vn-1.wav', sentAt: '10:42 AM', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-1' },
  { id: 'vn-2', chatId: 'chat-1', senderId: 'ellie', senderName: 'Ellie', direction: 'incoming', durationSeconds: 150, audioUrl: '/audio/ellie-vn-2.wav', sentAt: '10:44 AM', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-1' },
  { id: 'vn-3', chatId: 'chat-1', senderId: 'ellie', senderName: 'Ellie', direction: 'incoming', durationSeconds: 150, audioUrl: '/audio/ellie-vn-3.wav', sentAt: '10:47 AM', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-1' },
  { id: 'vn-4', chatId: 'chat-1', senderId: 'ellie', senderName: 'Ellie', direction: 'incoming', durationSeconds: 150, audioUrl: '/audio/ellie-vn-4.wav', sentAt: '10:50 AM', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-1' },
  { id: 'vn-5', chatId: 'chat-1', senderId: 'ellie', senderName: 'Ellie', direction: 'incoming', durationSeconds: 150, audioUrl: '/audio/ellie-vn-5.wav', sentAt: '10:53 AM', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-1' },
  { id: 'vn-6', chatId: 'chat-1', senderId: 'ellie', senderName: 'Ellie', direction: 'incoming', durationSeconds: 150, audioUrl: '/audio/ellie-vn-6.wav', sentAt: '10:56 AM', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-1' },
  { id: 'vn-7', chatId: 'chat-1', senderId: 'ellie', senderName: 'Ellie', direction: 'incoming', durationSeconds: 180, audioUrl: '/audio/ellie-vn-7.wav', sentAt: '10:59 AM', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-1' },

  // Eddie (chat-2) - 3 VNs, 300s total
  { id: 'vn-8', chatId: 'chat-2', senderId: 'eddie', senderName: 'Eddie', direction: 'incoming', durationSeconds: 100, sentAt: 'Yesterday', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-2' },
  { id: 'vn-9', chatId: 'chat-2', senderId: 'eddie', senderName: 'Eddie', direction: 'incoming', durationSeconds: 100, sentAt: 'Yesterday', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-2' },
  { id: 'vn-10', chatId: 'chat-2', senderId: 'eddie', senderName: 'Eddie', direction: 'incoming', durationSeconds: 100, sentAt: 'Yesterday', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-2' },

  // Family Group (chat-3) - 5 VNs, 720s total
  { id: 'vn-11', chatId: 'chat-3', senderId: 'mom', senderName: 'Mom', direction: 'incoming', durationSeconds: 144, sentAt: 'Tuesday', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-3' },
  { id: 'vn-12', chatId: 'chat-3', senderId: 'dad', senderName: 'Dad', direction: 'incoming', durationSeconds: 144, sentAt: 'Tuesday', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-3' },
  { id: 'vn-13', chatId: 'chat-3', senderId: 'mom', senderName: 'Mom', direction: 'incoming', durationSeconds: 144, sentAt: 'Tuesday', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-3' },
  { id: 'vn-14', chatId: 'chat-3', senderId: 'sister', senderName: 'Sister', direction: 'incoming', durationSeconds: 144, sentAt: 'Tuesday', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-3' },
  { id: 'vn-15', chatId: 'chat-3', senderId: 'mom', senderName: 'Mom', direction: 'incoming', durationSeconds: 144, sentAt: 'Tuesday', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-3' },

  // Work PM Group (chat-4) - 4 VNs, 540s total
  { id: 'vn-16', chatId: 'chat-4', senderId: 'alex', senderName: 'Alex', direction: 'incoming', durationSeconds: 135, sentAt: 'Monday', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-4' },
  { id: 'vn-17', chatId: 'chat-4', senderId: 'sarah', senderName: 'Sarah', direction: 'incoming', durationSeconds: 135, sentAt: 'Monday', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-4' },
  { id: 'vn-18', chatId: 'chat-4', senderId: 'alex', senderName: 'Alex', direction: 'incoming', durationSeconds: 135, sentAt: 'Monday', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-4' },
  { id: 'vn-19', chatId: 'chat-4', senderId: 'david', senderName: 'David', direction: 'incoming', durationSeconds: 135, sentAt: 'Monday', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-4' },

  // Vendor (chat-5) - 2 VNs, 240s total
  { id: 'vn-20', chatId: 'chat-5', senderId: 'vendor', senderName: 'Vendor', direction: 'incoming', durationSeconds: 120, sentAt: '09/14/2026', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-5' },
  { id: 'vn-21', chatId: 'chat-5', senderId: 'vendor', senderName: 'Vendor', direction: 'incoming', durationSeconds: 120, sentAt: '09/14/2026', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-5' },

  // Friend Chat (chat-6) - 6 VNs, 900s total
  { id: 'vn-22', chatId: 'chat-6', senderId: 'friend', senderName: 'Friend', direction: 'incoming', durationSeconds: 150, sentAt: '09/12/2026', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-6' },
  { id: 'vn-23', chatId: 'chat-6', senderId: 'friend', senderName: 'Friend', direction: 'incoming', durationSeconds: 150, sentAt: '09/12/2026', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-6' },
  { id: 'vn-24', chatId: 'chat-6', senderId: 'friend', senderName: 'Friend', direction: 'incoming', durationSeconds: 150, sentAt: '09/12/2026', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-6' },
  { id: 'vn-25', chatId: 'chat-6', senderId: 'friend', senderName: 'Friend', direction: 'incoming', durationSeconds: 150, sentAt: '09/12/2026', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-6' },
  { id: 'vn-26', chatId: 'chat-6', senderId: 'friend', senderName: 'Friend', direction: 'incoming', durationSeconds: 150, sentAt: '09/12/2026', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-6' },
  { id: 'vn-27', chatId: 'chat-6', senderId: 'friend', senderName: 'Friend', direction: 'incoming', durationSeconds: 150, sentAt: '09/12/2026', waveform: Array.from({ length: 40 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-6' },

  // Short Voice Note (chat-7) - 1 VN, 12s total
  { id: 'vn-28', chatId: 'chat-7', senderId: 'contact7', senderName: 'John', direction: 'incoming', durationSeconds: 12, sentAt: '09/10/2026', waveform: Array.from({ length: 20 }, () => Math.random() * 80 + 20), isPlayed: false, playbackProgressSeconds: 0, clusterId: 'cluster-7' }
];
