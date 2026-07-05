import React from 'react';
import { VoiceNote, AppState } from '../../types';
import clsx from 'clsx';
import { Play, Pause } from 'lucide-react';


interface VoiceNoteBubbleProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  voiceNote: VoiceNote;
  isFirst: boolean;
  isLast: boolean;
  showAvatar: boolean;
  accumulatedStartSeconds: number; // to figure out where this VN starts in the cluster
}

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const getVoiceNoteAvatarUrl = (senderId: string) => {
  if (senderId === 'ellie') return '/avatars/ellie.svg';
  return `https://i.pravatar.cc/150?u=${senderId}`;
};

const VoiceNoteBubble: React.FC<VoiceNoteBubbleProps> = ({ appState, setAppState, voiceNote, isFirst, isLast, showAvatar, accumulatedStartSeconds }) => {
  const isOutgoing = voiceNote.direction === 'outgoing';
  
  // Calculate if this specific voice note is currently playing
  const vnStart = accumulatedStartSeconds;
  const vnEnd = accumulatedStartSeconds + voiceNote.durationSeconds;
  const hasStartedPlayback = appState.playbackProgressSeconds > 0 || appState.playbackState === 'playing';
  const isCurrentVn = hasStartedPlayback && appState.playbackProgressSeconds >= vnStart && appState.playbackProgressSeconds < vnEnd;
  const isPlaying = appState.playbackState === 'playing' && isCurrentVn;
  
  // Local progress (0 to 1) for this voice note
  let progress = 0;
  if (appState.playbackProgressSeconds >= vnEnd) {
    progress = 1; // already played
  } else if (isCurrentVn) {
    progress = (appState.playbackProgressSeconds - vnStart) / voiceNote.durationSeconds;
  }

  const handlePlayToggle = () => {
    if (isPlaying) {
      setAppState(prev => ({ ...prev, playbackState: 'paused' }));
    } else {
      setAppState(prev => ({ 
        ...prev, 
        playbackState: 'playing',
        activeVoiceNoteId: voiceNote.id,
        activeAudioUrl: voiceNote.audioUrl || null,
        activeVoiceNoteStartSeconds: vnStart,
        // If we were already playing THIS voice note and paused, keep progress. Otherwise, reset to start of this note.
        playbackProgressSeconds: isCurrentVn ? prev.playbackProgressSeconds : vnStart
      }));
    }
  };

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newProgress = vnStart + (clickPercentage * voiceNote.durationSeconds);
    
    setAppState(prev => ({ 
      ...prev, 
      playbackProgressSeconds: newProgress,
      activeVoiceNoteId: voiceNote.id,
      activeAudioUrl: voiceNote.audioUrl || null,
      activeVoiceNoteStartSeconds: vnStart,
      playbackState: 'playing' // Optional: auto-play on seek
    }));
  };

  return (
    <div className={clsx("flex w-full mb-[2px]", isOutgoing ? "justify-end" : "justify-start", isLast ? "mb-2" : "")}>
      {showAvatar && !isOutgoing && (
        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 mt-auto bg-[#dfe5e7] flex-shrink-0">
          <img src={getVoiceNoteAvatarUrl(voiceNote.senderId)} alt={voiceNote.senderName} />
        </div>
      )}
      {!showAvatar && !isOutgoing && <div className="w-10 flex-shrink-0" />}

      <div className={clsx(
        "relative w-full max-w-[calc(100%-40px)] md:max-w-[340px] px-3 py-2 flex items-center shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] transition-colors",
        isOutgoing 
          ? "bg-[var(--color-wa-bubble-sent-light)] dark:bg-[var(--color-wa-bubble-sent-dark)]" 
          : "bg-[var(--bg-panel)]",
        isCurrentVn ? "ring-2 ring-[var(--color-wa-green)] ring-inset" : "",
        isOutgoing ? (
          isFirst && isLast ? "rounded-[12px] rounded-tr-none" :
          isFirst ? "rounded-[12px] rounded-tr-none rounded-br-[4px]" :
          isLast ? "rounded-[12px] rounded-tr-[4px]" :
          "rounded-[12px] rounded-tr-[4px] rounded-br-[4px]"
        ) : (
          isFirst && isLast ? "rounded-[12px] rounded-tl-none" :
          isFirst ? "rounded-[12px] rounded-tl-none rounded-bl-[4px]" :
          isLast ? "rounded-[12px] rounded-tl-[4px]" :
          "rounded-[12px] rounded-tl-[4px] rounded-bl-[4px]"
        )
      )}>
        {/* Play Button */}
        <button 
          aria-label={isPlaying ? "Pause voice note" : "Play voice note"}
          onClick={handlePlayToggle}
          className={clsx(
            "w-[34px] h-[34px] rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer mr-3 transition-colors hover:opacity-80",
            isOutgoing ? "text-[var(--color-wa-green-dark)] dark:text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
          )}
        >
          {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-1" />}
        </button>

        {/* Waveform Visualization */}
        <div className="flex-1 flex flex-col justify-center h-full gap-1">
          <div 
            className="flex items-center gap-[2px] h-6 w-full cursor-pointer group"
            onClick={handleWaveformClick}
          >
            {voiceNote.waveform.map((val, idx) => {
              const barThreshold = idx / voiceNote.waveform.length;
              const isPlayed = progress > barThreshold;
              
              return (
                <div 
                  key={idx}
                  className={clsx(
                    "flex-1 max-w-[3px] rounded-full transition-colors",
                    isPlayed 
                      ? (isOutgoing ? "bg-[#359074] dark:bg-[var(--color-wa-green)]" : "bg-[var(--color-wa-green)]")
                      : (isOutgoing ? "bg-[#61b899] dark:bg-[#348d79]" : "bg-[#b1b8bb] dark:bg-[#5b6368] group-hover:bg-[#9aa0a3]")
                  )}
                  style={{ height: `${Math.max(15, val)}%` }}
                />
              )
            })}
          </div>

          <div className="flex justify-between items-center text-[11px] text-[var(--text-secondary)] font-medium">
            <span className={isCurrentVn ? "text-[var(--color-wa-green)]" : ""}>
              {isCurrentVn ? formatDuration(appState.playbackProgressSeconds - vnStart) : formatDuration(voiceNote.durationSeconds)}
            </span>
            <span>{voiceNote.sentAt}</span>
          </div>
        </div>
        
        {/* Avatar within Bubble (iOS style for outgoing) */}
        {isOutgoing && (
          <div className="ml-3 flex flex-col justify-end">
             <div className="w-[34px] h-[34px] rounded-full overflow-hidden flex-shrink-0 bg-white">
                <img src={getVoiceNoteAvatarUrl(voiceNote.senderId)} alt={voiceNote.senderName} className="opacity-90" />
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceNoteBubble;
