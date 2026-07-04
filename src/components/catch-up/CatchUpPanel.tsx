import React, { useState } from 'react';
import { AppState, CatchUpResult } from '../../types';
import { X, PlayCircle, CircleCheck, Sparkles, PauseCircle, Search, ChevronDown, ChevronRight, Info, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';

interface CatchUpPanelProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  catchUpResult: CatchUpResult;
  isMobile?: boolean;
}

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const CatchUpPanel: React.FC<CatchUpPanelProps> = ({ appState, setAppState, catchUpResult, isMobile }) => {
  const isPlaying = appState.playbackState === 'playing';
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [transcriptSearch, setTranscriptSearch] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [skipGreetings, setSkipGreetings] = useState(true);

  const togglePlaybackSpeed = () => {
    setPlaybackSpeed(prev => prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-panel)] relative">
      {/* Header */}
      <div className="h-[60px] px-6 flex items-center gap-6 bg-[var(--bg-panel-secondary)] text-[var(--text-primary)] sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setAppState(prev => ({ 
            ...prev, 
            isCatchUpPanelOpen: false,
            mobileSurface: isMobile ? 'conversation' : prev.mobileSurface
          }))}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label={isMobile ? "Back" : "Close panel"}
        >
          {isMobile ? <ArrowLeft size={24} /> : <X size={24} />}
        </button>
        <div className="flex items-center gap-2 font-medium">
          <Sparkles size={18} className="text-[var(--color-wa-green)]" />
          <h2 className="text-[16px]">Catch Up</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <h1 className="text-[24px] font-medium text-[var(--text-primary)] mb-2 leading-tight">
          {catchUpResult.headline}
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)] mb-6">
          Based on {catchUpResult.voiceNoteIds.length} voice notes ({Math.round(catchUpResult.totalDurationSeconds / 60)}m total)
        </p>

        {/* Playback Controls */}
        <div className="flex gap-2 mb-8">
          <button 
            onClick={() => setAppState(prev => {
              if (isPlaying) return { ...prev, playbackState: 'paused' };
              
              // If not playing, and no active voice note, start from the first one
              const vns = prev.voiceNotes.filter(v => v.chatId === prev.selectedChatId);
              if (!prev.activeVoiceNoteId && vns.length > 0) {
                return {
                  ...prev,
                  playbackState: 'playing',
                  activeVoiceNoteId: vns[0].id,
                  activeAudioUrl: vns[0].audioUrl || null,
                  activeVoiceNoteStartSeconds: 0,
                  playbackProgressSeconds: 0
                };
              }
              return { ...prev, playbackState: 'playing' };
            })}
            className="flex-1 bg-[var(--color-wa-green)] text-white h-10 rounded-lg flex items-center justify-center font-medium text-[14px] hover:bg-[var(--color-wa-green-dark)] transition-colors shadow-sm"
          >
            {isPlaying ? <PauseCircle size={18} className="mr-2" /> : <PlayCircle size={18} className="mr-2" />}
            {isPlaying ? 'Pause' : 'Play important parts'}
          </button>
          
          <button 
            aria-label="Toggle playback speed"
            onClick={togglePlaybackSpeed}
            className="w-10 h-10 bg-[var(--bg-panel-secondary)] text-[var(--text-primary)] rounded-lg flex items-center justify-center font-medium text-[14px] hover:bg-[var(--bg-hover)] transition-colors"
          >
            {playbackSpeed}x
          </button>
        </div>

        {/* Settings Toggle */}
        <div className="flex items-center justify-between mb-8 px-2">
           <span className="text-[14px] text-[var(--text-primary)]">Skip greetings & silence</span>
           <div 
             aria-label="Toggle skip greetings"
             role="switch"
             aria-checked={skipGreetings}
             className={clsx("w-10 h-6 rounded-full p-1 cursor-pointer transition-colors", skipGreetings ? "bg-[var(--color-wa-green)]" : "bg-[var(--border-subtle)]")}
             onClick={() => setSkipGreetings(!skipGreetings)}
           >
             <div className={clsx("w-4 h-4 bg-white rounded-full transition-transform", skipGreetings ? "translate-x-4" : "translate-x-0")} />
           </div>
        </div>

        {/* Needs your input section */}
        <div className="mb-8">
          <h3 className="text-[14px] font-semibold text-[var(--color-wa-green-dark)] dark:text-[#21C063] mb-3 flex items-center uppercase tracking-wide">
            Needs your input
          </h3>
          <div className="space-y-3">
            {catchUpResult.questions.map(q => {
              const isSelected = appState.selectedQuestionIds.includes(q.id);
              const isAnswered = q.status === 'answered';
              
              return (
                <div 
                  key={q.id}
                  className={clsx(
                    "p-3 rounded-lg transition-colors cursor-pointer",
                    isAnswered ? "opacity-60" :
                    isSelected 
                      ? "bg-[var(--bg-selected)]" 
                      : "hover:bg-[var(--bg-hover)]"
                  )}
                  onClick={() => {
                    if (isAnswered) return;
                    setAppState(prev => {
                      const ids = prev.selectedQuestionIds.includes(q.id)
                        ? prev.selectedQuestionIds.filter(id => id !== q.id)
                        : [...prev.selectedQuestionIds, q.id];
                      return { ...prev, selectedQuestionIds: ids, replyHelperOpen: ids.length > 0 };
                    });
                  }}
                >
                  <div className="flex gap-3">
                    <button aria-label="Play related voice note chunk" className="mt-0.5 text-[var(--text-secondary)]">
                      <PlayCircle size={18} />
                    </button>
                    <div className="flex-1">
                      <p className={clsx("text-[14px] leading-snug mb-2", isAnswered ? "text-[var(--text-secondary)] line-through" : "text-[var(--text-primary)]")}>
                        {q.questionText}
                      </p>
                      {isSelected && !isAnswered && q.suggestedAnswer && (
                        <div className="text-[13px] text-[var(--text-secondary)] border-t border-black/10 dark:border-white/10 pt-2 mt-1">
                          Suggestion: {q.suggestedAnswer}
                        </div>
                      )}
                      {isAnswered && (
                        <div className="text-[12px] text-[var(--color-wa-green)] font-medium mt-1">
                          Answered
                        </div>
                      )}
                    </div>
                    <div className="mt-0.5">
                      <CircleCheck size={18} className={
                        isAnswered ? "text-[var(--color-wa-green)]" :
                        isSelected ? "text-[var(--color-wa-green-dark)] dark:text-[#21C063]" : "text-[var(--border-subtle)]"
                      } />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transcript / Timeline */}
        <div>
          <div 
            role="button"
            aria-expanded={transcriptOpen}
            aria-label="Toggle transcript"
            className="flex items-center justify-between cursor-pointer py-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors"
            onClick={() => setTranscriptOpen(!transcriptOpen)}
          >
            <h3 className="text-[14px] font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
              Transcript
            </h3>
            {transcriptOpen ? <ChevronDown size={18} className="text-[var(--text-secondary)]" /> : <ChevronRight size={18} className="text-[var(--text-secondary)]" />}
          </div>
          
          {transcriptOpen && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-2">
              <div className="relative flex items-center bg-[var(--bg-search)] rounded-lg h-9 px-3 mb-6">
                <Search size={16} className="text-[var(--text-secondary)]" />
                <input 
                  type="text" 
                  placeholder="Search transcript..." 
                  value={transcriptSearch}
                  onChange={(e) => setTranscriptSearch(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-[13px] ml-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
                />
              </div>

              <div className="relative border-l-2 border-[var(--border-subtle)] ml-2.5 pl-6 pb-4 space-y-6">
                {catchUpResult.transcript?.filter(tr => tr.text.toLowerCase().includes(transcriptSearch.toLowerCase())).map((tr) => {
                  // Highlighting logic
                  const isCurrent = appState.playbackProgressSeconds >= tr.startTimeSeconds && appState.playbackProgressSeconds < tr.endTimeSeconds;
                  
                  return (
                    <div key={tr.id} className={clsx("relative transition-opacity", isCurrent ? "opacity-100" : "opacity-70 hover:opacity-100")}>
                      {/* Timeline dot */}
                      <div className={clsx(
                        "absolute -left-[29px] top-1.5 w-2 h-2 rounded-full ring-4 ring-[var(--bg-panel)] transition-colors",
                        isCurrent ? "bg-[var(--color-wa-green)]" : "bg-[var(--text-tertiary)]"
                      )} />
                      
                      <div className="flex gap-2 items-start mb-1 cursor-pointer" onClick={() => setAppState(prev => {
                        const vns = prev.voiceNotes.filter(v => v.chatId === prev.selectedChatId);
                        let targetVn = vns[0];
                        let targetStart = 0;
                        let accum = 0;
                        for (const vn of vns) {
                          if (tr.startTimeSeconds >= accum && tr.startTimeSeconds < accum + vn.durationSeconds) {
                            targetVn = vn;
                            targetStart = accum;
                            break;
                          }
                          accum += vn.durationSeconds;
                        }
                        return {
                          ...prev, 
                          playbackProgressSeconds: tr.startTimeSeconds, 
                          playbackState: 'playing',
                          activeVoiceNoteId: targetVn?.id || prev.activeVoiceNoteId,
                          activeAudioUrl: targetVn?.audioUrl || null,
                          activeVoiceNoteStartSeconds: targetStart
                        };
                      })}>
                        <span className={clsx(
                          "text-[12px] font-mono px-1.5 py-0.5 rounded transition-colors",
                          isCurrent ? "bg-[var(--color-wa-green)] text-white" : "text-[var(--color-wa-green)] bg-[var(--color-wa-bubble-sent-light)] dark:bg-[#005c4b] dark:text-[#d9fdd3]"
                        )}>
                          {formatDuration(tr.startTimeSeconds)}
                        </span>
                        {tr.isDecision && (
                          <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)] mt-[3px]">
                            Decision
                          </span>
                        )}
                      </div>
                      <p className="text-[14px] text-[var(--text-primary)] leading-relaxed">
                        "{tr.text}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* AI Disclaimer */}
        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex gap-3 text-[12px] text-[var(--text-tertiary)] leading-relaxed">
           <Info size={16} className="flex-shrink-0 mt-0.5" />
           <p>
             Catch Up summaries are generated by Meta AI and may not be 100% accurate. 
             Always review the original voice notes for critical information.
           </p>
        </div>

      </div>
    </div>
  );
};

export default CatchUpPanel;
