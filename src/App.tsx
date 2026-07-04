import React, { useState, useEffect } from 'react';
import AppShell from './components/shell/AppShell';
import MobileAppShell from './components/shell/MobileAppShell';
import { useMediaQuery } from './hooks/useMediaQuery';
import type { AppState } from './types';
import { mockChats } from './data/chats';
import { mockMessages, mockVoiceNotes } from './data/messages';
import { mockCatchUps } from './data/catchUps';

function App() {
  const [appState, setAppState] = useState<AppState>({
    activeSection: 'chats',
    selectedChatId: null,
    selectedCatchUpId: null,
    isCatchUpPanelOpen: false,
    activeChatFilter: 'all',
    composerText: '',
    replyHelperOpen: false,
    selectedQuestionIds: [],
    playbackState: 'stopped',
    playbackProgressSeconds: 0,
    activeVoiceNoteId: null,
    activeAudioUrl: null,
    activeVoiceNoteStartSeconds: 0,
    theme: 'system',
    mobileSurface: 'chat-list',
    chats: mockChats,
    messages: mockMessages,
    voiceNotes: mockVoiceNotes,
    catchUps: mockCatchUps
  });

  
  // Centralized Playback Engine
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    // Handle time updates from real audio
    const handleTimeUpdate = () => {
      setAppState(prev => {
        if (prev.playbackState === 'playing' && prev.activeVoiceNoteId) {
          const chatVNs = prev.voiceNotes.filter(v => v.chatId === prev.selectedChatId);
          const currentVn = chatVNs.find(v => v.id === prev.activeVoiceNoteId);
          
          if (currentVn && audio.duration && isFinite(audio.duration)) {
            // scale the progress to the mock duration
            const progressRatio = audio.currentTime / audio.duration;
            const simulatedLocalTime = progressRatio * currentVn.durationSeconds;
            return {
              ...prev,
              playbackProgressSeconds: prev.activeVoiceNoteStartSeconds + simulatedLocalTime
            };
          }
          return {
            ...prev,
            playbackProgressSeconds: prev.activeVoiceNoteStartSeconds + audio.currentTime
          };
        }
        return prev;
      });
    };

    // Handle audio ending
    const handleEnded = () => {
      setAppState(prev => {
        // Find next voice note in the cluster
        if (!prev.selectedChatId) return { ...prev, playbackState: 'stopped' };
        
        const chatVNs = prev.voiceNotes.filter(v => v.chatId === prev.selectedChatId);
        const currentIndex = chatVNs.findIndex(v => v.id === prev.activeVoiceNoteId);
        
        if (currentIndex !== -1 && currentIndex < chatVNs.length - 1) {
          const nextVn = chatVNs[currentIndex + 1];
          const newStartSeconds = prev.activeVoiceNoteStartSeconds + chatVNs[currentIndex].durationSeconds;
          return {
            ...prev,
            activeVoiceNoteId: nextVn.id,
            activeAudioUrl: nextVn.audioUrl || null,
            activeVoiceNoteStartSeconds: newStartSeconds,
            playbackProgressSeconds: newStartSeconds
          };
        }
        return { ...prev, playbackState: 'stopped' };
      });
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Sync audio src and play/pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (appState.playbackState === 'playing') {
      if (appState.activeAudioUrl) {
        // If src changed, load it
        if (!audio.src.endsWith(appState.activeAudioUrl)) {
          audio.src = appState.activeAudioUrl;
          
          const chatVNs = appState.voiceNotes.filter(v => v.chatId === appState.selectedChatId);
          const currentVn = chatVNs.find(v => v.id === appState.activeVoiceNoteId);
          
          if (currentVn && currentVn.durationSeconds > 0) {
            // Calculate scaled offset in case user clicked middle of waveform
            const simulatedLocalTime = appState.playbackProgressSeconds - appState.activeVoiceNoteStartSeconds;
            const progressRatio = simulatedLocalTime / currentVn.durationSeconds;
            
            // We can't set currentTime if duration isn't loaded, so we listen for loadedmetadata
            const onLoadedMetadata = () => {
              if (isFinite(audio.duration)) {
                audio.currentTime = Math.max(0, progressRatio * audio.duration);
              }
              audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            };
            audio.addEventListener('loadedmetadata', onLoadedMetadata);
          }
        }
        audio.play().catch(err => {
          console.warn("Audio play rejected:", err);
          // Fall back to simulation by clearing activeAudioUrl
          setAppState(prev => ({ ...prev, activeAudioUrl: null }));
        });
      } else {
        // Paused real audio, switching to simulation
        audio.pause();
      }
    } else {
      audio.pause();
    }
  }, [appState.playbackState, appState.activeAudioUrl, appState.activeVoiceNoteId, appState.playbackProgressSeconds, appState.activeVoiceNoteStartSeconds, appState.voiceNotes, appState.selectedChatId]);

  // Simulation fallback for voice notes without audioUrl
  useEffect(() => {
    let interval: number;
    if (appState.playbackState === 'playing' && !appState.activeAudioUrl) {
      interval = window.setInterval(() => {
        setAppState(prev => {
          const chatVNs = prev.voiceNotes.filter(v => v.chatId === prev.selectedChatId);
          const currentIndex = chatVNs.findIndex(v => v.id === prev.activeVoiceNoteId);
          const currentVn = chatVNs[currentIndex];
          
          if (!currentVn) {
            return { ...prev, playbackState: 'stopped', playbackProgressSeconds: 0 };
          }

          const newProgress = prev.playbackProgressSeconds + 1;
          const currentVnEnd = prev.activeVoiceNoteStartSeconds + currentVn.durationSeconds;

          // Cross boundary to next voice note?
          if (newProgress >= currentVnEnd) {
            if (currentIndex < chatVNs.length - 1) {
              const nextVn = chatVNs[currentIndex + 1];
              return {
                ...prev,
                activeVoiceNoteId: nextVn.id,
                activeAudioUrl: nextVn.audioUrl || null,
                activeVoiceNoteStartSeconds: currentVnEnd,
                playbackProgressSeconds: currentVnEnd
              };
            }
            // Reached end of cluster
            return { ...prev, playbackState: 'stopped', playbackProgressSeconds: 0 };
          }
          
          return { ...prev, playbackProgressSeconds: newProgress };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [appState.playbackState, appState.activeAudioUrl]);


  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className="w-full h-screen overflow-hidden bg-[var(--bg-app)] text-[var(--text-primary)]">
      {isMobile ? (
        <MobileAppShell appState={appState} setAppState={setAppState} />
      ) : (
        <AppShell appState={appState} setAppState={setAppState} />
      )}
    </div>
  );
}

export default App;
