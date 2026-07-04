import React from 'react';
import { AppState } from '../../types';
import ChatRow from './ChatRow';
import CatchUpGlobalRow from './CatchUpGlobalRow';
import { Search, MessageSquarePlus, MoreVertical } from 'lucide-react';
import clsx from 'clsx';

interface ChatListProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  isMobile?: boolean;
  forceFilter?: 'catch-up';
}

const ChatList: React.FC<ChatListProps> = ({ appState, setAppState, isMobile, forceFilter }) => {
  const isGlobalCatchUp = appState.activeSection === 'catch-up' || forceFilter === 'catch-up';

  const chatsToRender = appState.chats.filter(chat => {
    if (isGlobalCatchUp) {
      return chat.hasCatchUp;
    }
    
    if (appState.activeChatFilter === 'all') return true;
    if (appState.activeChatFilter === 'unread') return chat.unreadCount > 0;
    if (appState.activeChatFilter === 'favorites') return chat.isFavorite;
    if (appState.activeChatFilter === 'groups') return chat.isGroup;
    if (appState.activeChatFilter === 'catch-up') return chat.hasCatchUp;
    return true;
  });

  const FilterChip = ({ filter, label }: { filter: AppState['activeChatFilter'], label: string }) => {
    const isActive = appState.activeChatFilter === filter;
    return (
      <button 
        onClick={() => {
          if (isMobile && filter === 'catch-up') {
            setAppState(prev => ({ ...prev, activeChatFilter: filter, mobileSurface: 'global-catch-up' }));
          } else {
            setAppState(prev => ({ ...prev, activeChatFilter: filter }));
          }
        }}
        className={clsx(
          "px-2.5 py-1 rounded-full text-[13px] font-medium transition-colors flex-shrink-0",
          isActive 
            ? "bg-[var(--color-wa-bubble-sent-light)] text-[#005c4b] dark:bg-[var(--color-wa-bubble-sent-dark)] dark:text-[var(--text-inverse)]"
            : "bg-[var(--bg-panel-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <div className={clsx("flex-shrink-0 h-full flex flex-col bg-[var(--bg-panel)] border-r border-[var(--border-subtle)]", isMobile ? "w-full" : "w-[400px]")}>
      {/* Header */}
      <div className="h-16 px-4 py-2.5 flex items-center justify-between bg-[var(--bg-panel)]">
        {isGlobalCatchUp ? (
          <h1 className="text-[22px] font-semibold text-[var(--text-primary)]">Catch Up</h1>
        ) : (
          <h1 className="text-[22px] font-semibold text-[var(--text-primary)]">Chats</h1>
        )}
        <div className="flex gap-2 text-[var(--text-secondary)]">
          {!isGlobalCatchUp && <button aria-label="New chat" className="p-2 rounded-full hover:bg-[var(--bg-hover)] transition-colors"><MessageSquarePlus size={20} /></button>}
          <button aria-label="Menu" className="p-2 rounded-full hover:bg-[var(--bg-hover)] transition-colors"><MoreVertical size={20} /></button>
        </div>
      </div>
      
      {/* Search or Subtitle */}
      <div className="px-3 py-2">
        {isGlobalCatchUp ? (
          <div className="text-[14px] text-[var(--text-secondary)] px-2 pb-2">
            Voice notes that need attention
          </div>
        ) : (
          <div className="relative flex items-center bg-[var(--bg-search)] rounded-lg h-9 px-3">
            <Search size={18} className="text-[var(--text-secondary)]" />
            <input 
              type="text" 
              placeholder="Search or start a new chat" 
              className="w-full bg-transparent border-none outline-none text-sm ml-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
            />
          </div>
        )}
      </div>

      {/* Filters (only for normal chat view) */}
      {!isGlobalCatchUp && (
        <div className="px-3 py-2 flex gap-1.5 overflow-x-auto border-b border-[var(--border-subtle)] scrollbar-hide">
          <FilterChip filter="all" label="All" />
          <FilterChip filter="unread" label="Unread" />
          <FilterChip filter="favorites" label="Favorites" />
          <FilterChip filter="catch-up" label="Catch Up" />
          <FilterChip filter="groups" label="Groups" />
        </div>
      )}

      {/* Chat Rows */}
      <div className="flex-1 overflow-y-auto">
        {chatsToRender.length > 0 ? (
          chatsToRender.map(chat => {
            const isSelected = appState.selectedChatId === chat.id;
            const handleSelect = () => {
              setAppState(prev => ({ 
                ...prev, 
                selectedChatId: chat.id,
                // if in global view, maybe also open the right panel automatically for this chat?
                isCatchUpPanelOpen: isGlobalCatchUp && !isMobile ? true : false,
                selectedCatchUpId: isGlobalCatchUp ? appState.catchUps.find(c => c.chatId === chat.id)?.id || null : prev.selectedCatchUpId,
                mobileSurface: isMobile ? 'conversation' : prev.mobileSurface
              }));
            };

            if (isGlobalCatchUp) {
              const catchUpRes = appState.catchUps.find(c => c.chatId === chat.id);
              if (!catchUpRes) return null; // Should not happen given hasCatchUp filter, but safe
              
              return (
                <CatchUpGlobalRow 
                  key={chat.id}
                  chat={chat}
                  catchUpResult={catchUpRes}
                  isSelected={isSelected}
                  onClick={handleSelect}
                />
              );
            }

            return (
              <ChatRow 
                key={chat.id} 
                chat={chat}
                appState={appState}
                isSelected={isSelected}
                onClick={handleSelect}
              />
            );
          })
        ) : (
          <div className="p-6 text-center text-[var(--text-secondary)] text-sm">
            {appState.activeChatFilter === 'catch-up' || isGlobalCatchUp
              ? 'No voice notes to catch up on'
              : 'No chats found'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
