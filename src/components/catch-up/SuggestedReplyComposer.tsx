import React, { useEffect, useState } from 'react';
import { AppState } from '../../types';

import { Sparkles, X } from 'lucide-react';
import clsx from 'clsx';

interface SuggestedReplyComposerProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  isMobile?: boolean;
}

const SuggestedReplyComposer: React.FC<SuggestedReplyComposerProps> = ({ appState, setAppState, isMobile }) => {
  const [selectedMode, setSelectedMode] = useState<'detailed' | 'short' | 'warm' | 'point_by_point'>('detailed');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');

  const activeCatchUp = appState.catchUps.find(c => c.id === appState.selectedCatchUpId);
  const activeQuestionIds = appState.selectedQuestionIds;

  useEffect(() => {
    if (activeCatchUp && activeQuestionIds.length > 0) {
      setIsGenerating(true);
      // Simulate Gemini API streaming/generation delay
      const timer = setTimeout(() => {
        // Simple mock: just take the suggested answers for selected questions and join them
        const suggestions = activeQuestionIds.map(id => {
          const q = activeCatchUp.questions.find(q => q.id === id);
          return q?.suggestedAnswer || `Regarding ${q?.normalizedAsk.toLowerCase()}, ...`;
        });
        
        let prefix = "Hey Ellie, ";
        if (selectedMode === 'short') prefix = "Hey, ";
        if (selectedMode === 'warm') prefix = "Hi Ellie! Thanks for all the updates. ";
        
        setGeneratedText(prefix + suggestions.join(' '));
        setIsGenerating(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeQuestionIds, selectedMode, activeCatchUp]);

  if (!activeCatchUp || activeQuestionIds.length === 0) return null;

  return (
    <div className={clsx(
      "bg-[var(--bg-panel)] overflow-hidden flex flex-col",
      isMobile ? "w-full" : "mx-4 mb-3 rounded-xl border border-[var(--border-subtle)] shadow-lg"
    )}>
      {/* Header */}
      <div className="bg-[var(--bg-panel-secondary)] px-4 py-2 flex items-center justify-between border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[var(--color-wa-green)]" />
          <span className="text-[13px] font-medium text-[var(--text-primary)]">Drafting reply...</span>
          <span className="text-[12px] text-[var(--text-secondary)] ml-2">
            Answering {activeQuestionIds.length} question{activeQuestionIds.length > 1 ? 's' : ''}
          </span>
        </div>
        <button 
          onClick={() => setAppState(prev => ({ ...prev, replyHelperOpen: false, selectedQuestionIds: [] }))}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 bg-[var(--bg-panel)]">
        {isGenerating ? (
          <div className="h-20 flex items-center justify-center">
             <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-[var(--color-wa-green)] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[var(--color-wa-green)] animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 rounded-full bg-[var(--color-wa-green)] animate-bounce" style={{ animationDelay: '0.2s' }} />
             </div>
          </div>
        ) : (
          <textarea 
            value={generatedText}
            onChange={(e) => setGeneratedText(e.target.value)}
            className="w-full h-24 bg-transparent border-none outline-none resize-none text-[15px] text-[var(--text-primary)] leading-relaxed"
          />
        )}
      </div>

      {/* Footer / Modes */}
      <div className="px-4 py-3 bg-[var(--bg-panel)] border-t border-[var(--border-subtle)] flex flex-wrap gap-y-3 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {(['detailed', 'short', 'warm', 'point_by_point'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={clsx(
                "px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors whitespace-nowrap",
                selectedMode === mode 
                  ? "bg-[var(--color-wa-bubble-sent-light)] text-[var(--color-wa-green-dark)] dark:bg-[#005c4b] dark:text-[#d9fdd3]" 
                  : "bg-[var(--bg-panel-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
              )}
            >
              {mode === 'point_by_point' ? 'Point-by-point' : mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button 
            className="px-4 py-1.5 rounded-full text-[13px] font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
            onClick={() => setAppState(prev => ({ ...prev, replyHelperOpen: false, selectedQuestionIds: [] }))}
          >
            Discard
          </button>
          <button 
            className="px-4 py-1.5 rounded-full text-[13px] font-medium bg-[var(--color-wa-green)] text-white hover:bg-[var(--color-wa-green-dark)] transition-colors"
            onClick={() => {
              setAppState(prev => ({ 
                ...prev, 
                composerText: generatedText, 
                replyHelperOpen: false
              }));
            }}
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestedReplyComposer;
