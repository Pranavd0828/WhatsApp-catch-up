import React from 'react';
import { AppState, Chat } from '../../types';
import { Mic, CheckCheck } from 'lucide-react';
import clsx from 'clsx';

interface ChatRowProps {
  chat: Chat;
  appState: AppState;
  isSelected: boolean;
  onClick: () => void;
}

const ChatRow: React.FC<ChatRowProps> = ({ chat, appState, isSelected, onClick }) => {
  // Find latest message for this chat
  const chatMessages = appState.messages.filter(m => m.chatId === chat.id);
  const chatVoiceNotes = appState.voiceNotes.filter(v => v.chatId === chat.id);
  // Basic mock logic to determine preview text
  // In reality, this would sort by sentAt and pick the latest, but for mock purposes:
  let previewContent = null;

  if (chatVoiceNotes.length > 0) {
    previewContent = (
      <span className="flex items-center truncate text-[var(--text-secondary)]">
        <Mic size={15} className="mr-1.5 flex-shrink-0" />
        <span className="truncate">Voice message</span>
      </span>
    );
  } else if (chatMessages.length > 0) {
    const lastMsg = chatMessages[chatMessages.length - 1];
    previewContent = (
      <span className="flex items-center truncate">
        {lastMsg.direction === 'outgoing' && (
          <CheckCheck size={16} className="mr-1 text-[#53bdeb] flex-shrink-0" />
        )}
        <span className="truncate">{lastMsg.text}</span>
      </span>
    );
  } else {
    // Default fallback
    previewContent = (
      <span className="flex items-center truncate">
        <span className="truncate text-[var(--text-tertiary)]">Tap to start chatting</span>
      </span>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={clsx(
        "flex items-center h-[72px] px-3 cursor-pointer transition-colors group relative",
        isSelected 
          ? "bg-[var(--bg-selected)] hover:bg-[var(--bg-selected)]" 
          : "hover:bg-[var(--bg-hover)]"
      )}
    >
      {/* Avatar */}
      <div className="w-[49px] h-[49px] rounded-full overflow-hidden flex-shrink-0 bg-[#dfe5e7] dark:bg-[#667781] mr-3">
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
        
        {/* Top Row */}
        <div className="flex justify-between items-baseline mb-[2px]">
          <span className="text-[16px] text-[var(--text-primary)] font-medium truncate pr-2">
            {chat.name}
          </span>
          <span className={clsx(
            "text-xs whitespace-nowrap",
            chat.unreadCount > 0 ? "text-[var(--color-wa-green)] font-medium" : "text-[var(--text-secondary)]"
          )}>
            {chat.lastMessageAt}
          </span>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-between items-center text-[14px]">
          <div className="flex items-center text-[var(--text-secondary)] truncate">
            {previewContent}
          </div>

          {/* Badges */}
          <div className="flex gap-1 items-center ml-2 flex-shrink-0">
            {chat.unreadCount > 0 && (
              <div className="bg-[var(--color-wa-green)] text-white text-[12px] font-semibold w-5 h-5 flex items-center justify-center rounded-full ml-1">
                {chat.unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRow;
