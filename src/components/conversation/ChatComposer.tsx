import React from 'react';
import { AppState } from '../../types';
import { Smile, Paperclip, Mic, Send } from 'lucide-react';
import SuggestedReplyComposer from '../catch-up/SuggestedReplyComposer';

interface ChatComposerProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  isMobile?: boolean;
}

const ChatComposer: React.FC<ChatComposerProps> = ({ appState, setAppState, isMobile }) => {
  const handleSend = () => {
    if (!appState.composerText.trim() || !appState.selectedChatId) return;

    setAppState(prev => {
      // Create new message
      const newMessage = {
        id: `msg-${Date.now()}`,
        chatId: prev.selectedChatId!,
        senderId: 'me',
        senderName: 'Me',
        direction: 'outgoing' as const,
        type: 'text' as const,
        text: prev.composerText,
        sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Mark questions as answered if any were selected
      const updatedCatchUps = prev.catchUps.map(c => {
        if (c.id === prev.selectedCatchUpId) {
          return {
            ...c,
            questions: c.questions.map(q => 
              prev.selectedQuestionIds.includes(q.id) 
                ? { ...q, status: 'answered' as const } 
                : q
            )
          };
        }
        return c;
      });

      return {
        ...prev,
        messages: [...prev.messages, newMessage],
        catchUps: updatedCatchUps,
        composerText: '',
        selectedQuestionIds: [],
        replyHelperOpen: false
      };
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col z-20">
      {appState.replyHelperOpen && !isMobile && (
        <SuggestedReplyComposer appState={appState} setAppState={setAppState} />
      )}
      <div className={`min-h-[62px] px-4 py-2.5 flex items-center bg-[var(--bg-panel-secondary)] border-t border-[var(--border-subtle)] ${isMobile ? 'pb-[max(env(safe-area-inset-bottom,10px),10px)]' : ''}`}>
        <div className="flex gap-4 text-[var(--text-secondary)] mr-4">
          <button aria-label="Emoji" className="hover:text-[var(--text-primary)] transition-colors"><Smile size={24} strokeWidth={1.5} /></button>
          <button aria-label="Attach" className="hover:text-[var(--text-primary)] transition-colors"><Paperclip size={24} strokeWidth={1.5} /></button>
        </div>
        
        <div className="flex-1 bg-[var(--bg-panel)] rounded-lg min-h-[40px] flex items-center px-4 shadow-sm">
          <input 
            type="text" 
            placeholder="Type a message" 
            value={appState.composerText}
            onChange={(e) => setAppState(prev => ({ ...prev, composerText: e.target.value }))}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none text-[15px] text-[var(--text-primary)] placeholder-[var(--text-secondary)] py-2"
          />
        </div>
        
        <button 
          aria-label={appState.composerText.length > 0 ? "Send message" : "Voice message"}
          onClick={handleSend}
          className="ml-4 text-[var(--text-secondary)] flex items-center justify-center w-10 h-10 rounded-full hover:bg-[var(--bg-hover)] cursor-pointer"
        >
          {appState.composerText.length > 0 ? (
            <Send size={24} className="text-[var(--color-wa-green)]" fill="currentColor" />
          ) : (
            <Mic size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatComposer;
