import React from 'react';
import { Chat, CatchUpResult } from '../../types';
import { Mic } from 'lucide-react';
import clsx from 'clsx';

interface CatchUpGlobalRowProps {
  chat: Chat;
  catchUpResult: CatchUpResult;
  isSelected: boolean;
  onClick: () => void;
}

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  return `${m} min`;
};

const CatchUpGlobalRow: React.FC<CatchUpGlobalRowProps> = ({ chat, catchUpResult, isSelected, onClick }) => {
  const importantTopic = catchUpResult.topics.find(t => t.importance === 'high') || catchUpResult.topics[0];

  return (
    <div 
      onClick={onClick}
      className={clsx(
        "flex items-center h-[96px] px-3 cursor-pointer transition-colors group relative",
        isSelected 
          ? "bg-[var(--bg-selected)] hover:bg-[var(--bg-selected)]" 
          : "hover:bg-[var(--bg-hover)]"
      )}
    >
      {/* Avatar */}
      <div className="w-[49px] h-[49px] rounded-full overflow-hidden flex-shrink-0 bg-[#dfe5e7] dark:bg-[#667781] mr-3 self-start mt-3">
        {chat.avatarUrl ? (
          <img src={chat.avatarUrl} alt={chat.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white font-semibold">
            {chat.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center h-full border-b border-[var(--border-subtle)] py-3 pr-2 group-last:border-none">
        
        {/* Top Row: Name and Duration */}
        <div className="flex justify-between items-baseline mb-[2px]">
          <span className="text-[16px] text-[var(--text-primary)] font-medium truncate pr-2">
            {chat.name}
          </span>
          <span className="text-xs text-[var(--color-wa-green)] font-medium whitespace-nowrap">
            {formatDuration(catchUpResult.totalDurationSeconds)} total
          </span>
        </div>

        {/* Second Row: Audio count & Questions */}
        <div className="flex justify-between items-center text-[13px] mb-1">
          <div className="flex items-center text-[var(--text-secondary)]">
            <Mic size={14} className="mr-1" />
            <span>{catchUpResult.voiceNoteIds.length} voice notes</span>
          </div>
          {catchUpResult.questions.length > 0 && (
            <div className="text-[#00a884] font-medium">
              {catchUpResult.questions.length} question{catchUpResult.questions.length > 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Third Row: Topic Summary */}
        <div className="text-[13px] text-[var(--text-primary)] truncate opacity-90">
          <span className="font-semibold mr-1">Topic:</span> 
          {importantTopic?.label || 'General update'}
        </div>
      </div>
    </div>
  );
};

export default CatchUpGlobalRow;
