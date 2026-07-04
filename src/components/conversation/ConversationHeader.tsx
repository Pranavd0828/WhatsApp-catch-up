import React from 'react';
import { Chat } from '../../types';
import { Search, MoreVertical, Phone, Video, ArrowLeft } from 'lucide-react';
import { AppState } from '../../types';

interface ConversationHeaderProps {
  chat: Chat;
  isMobile?: boolean;
  setAppState?: React.Dispatch<React.SetStateAction<AppState>>;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({ chat, isMobile, setAppState }) => {
  return (
    <div className="h-16 px-4 py-2.5 flex items-center justify-between bg-[var(--bg-panel)] z-20 border-b border-[var(--border-subtle)]">
      <div className="flex items-center cursor-pointer min-w-0 flex-1 pr-2">
        {isMobile && setAppState && (
          <button 
            aria-label="Back"
            className="mr-2 p-1 -ml-2 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setAppState(prev => ({ ...prev, mobileSurface: 'chat-list' }));
            }}
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#dfe5e7] dark:bg-[#667781] mr-4">
          {chat.avatarUrl ? (
            <img src={chat.avatarUrl} alt={chat.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-semibold">
              {chat.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[16px] text-[var(--text-primary)] font-medium truncate">{chat.name}</span>
          <span className="text-[13px] text-[var(--text-secondary)] mt-0.5 truncate">
            {chat.isGroup ? 'Tap here for group info' : 'click here for contact info'}
          </span>
        </div>
      </div>
      
      <div className="flex gap-2 sm:gap-4 text-[var(--text-secondary)] flex-shrink-0">
        <button aria-label="Video call" className="hover:text-[var(--text-primary)] transition-colors"><Video size={20} strokeWidth={1.5} /></button>
        <button aria-label="Voice call" className="hover:text-[var(--text-primary)] transition-colors"><Phone size={20} strokeWidth={1.5} /></button>
        <div className="w-[1px] h-6 bg-[var(--border-subtle)] mx-0.5 sm:mx-1 self-center"></div>
        <button aria-label="Search" className="hover:text-[var(--text-primary)] transition-colors"><Search size={20} strokeWidth={1.5} /></button>
        <button aria-label="Menu" className="hover:text-[var(--text-primary)] transition-colors"><MoreVertical size={20} strokeWidth={1.5} /></button>
      </div>
    </div>
  );
};

export default ConversationHeader;
