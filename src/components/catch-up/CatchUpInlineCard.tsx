import React from 'react';
import { AppState, CatchUpResult } from '../../types';
import { CircleCheck } from 'lucide-react';

interface CatchUpInlineCardProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  catchUpResult: CatchUpResult;
  isMobile?: boolean;
}

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  return `${m} min`;
};

const CatchUpInlineCard: React.FC<CatchUpInlineCardProps> = ({ setAppState, catchUpResult, isMobile }) => {
  const handleOpenPanel = () => {
    setAppState(prev => ({
      ...prev,
      isCatchUpPanelOpen: true,
      selectedCatchUpId: catchUpResult.id,
      mobileSurface: isMobile ? 'catch-up-detail' : prev.mobileSurface
    }));
  };

  return (
    <div 
      className="w-full max-w-full md:max-w-[340px] bg-[var(--bg-panel)] rounded-[7.5px] p-2 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] cursor-pointer hover:bg-[var(--bg-hover)] transition-colors text-left relative"
      onClick={handleOpenPanel}
    >
      <div className="p-1">
        <div className="text-[13px] text-[var(--text-secondary)] mb-1 font-medium truncate">
          Summary of {catchUpResult.voiceNoteIds.length} voice notes ({formatDuration(catchUpResult.totalDurationSeconds)})
        </div>
        
        <div className="text-[14px] text-[var(--text-primary)] mb-2 font-medium leading-snug">
          {catchUpResult.topics.map(t => t.label).join(', ')}
        </div>

        {catchUpResult.questions.length > 0 && (
          <ul className="text-[14px] text-[var(--text-primary)] space-y-2">
            {catchUpResult.questions.map(q => (
              <li key={q.id} className="flex items-start">
                <CircleCheck size={18} className="mr-2 text-[var(--color-wa-green)] flex-shrink-0" />
                <span className="leading-snug">{q.normalizedAsk}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CatchUpInlineCard;
