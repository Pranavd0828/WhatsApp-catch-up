import React from 'react';
import { AppState } from '../../types';
import ChatList from '../chat-list/ChatList';
import ConversationView from '../conversation/ConversationView';
import CatchUpPanel from '../catch-up/CatchUpPanel';
import SuggestedReplyComposer from '../catch-up/SuggestedReplyComposer';

interface MobileAppShellProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const MobileAppShell: React.FC<MobileAppShellProps> = ({ appState, setAppState }) => {
  return (
    <div className="relative w-full h-[100dvh] bg-[var(--bg-app)] flex flex-col overflow-hidden">
      
      {/* 1. Chat List Surface */}
      {appState.mobileSurface === 'chat-list' && (
        <div className="flex-1 w-full h-full flex flex-col overflow-hidden">
          <ChatList appState={appState} setAppState={setAppState} isMobile={true} />
        </div>
      )}

      {/* 2. Global Catch Up Surface */}
      {appState.mobileSurface === 'global-catch-up' && (
        <div className="flex-1 w-full h-full flex flex-col overflow-hidden">
          <ChatList appState={appState} setAppState={setAppState} isMobile={true} forceFilter="catch-up" />
        </div>
      )}

      {/* 3. Conversation Surface */}
      {appState.mobileSurface === 'conversation' && (
        <div className="flex-1 w-full h-full flex flex-col overflow-hidden">
          <ConversationView 
            appState={appState} 
            setAppState={setAppState} 
            chatId={appState.selectedChatId}
            isMobile={true}
          />
        </div>
      )}

      {/* 4. Catch-Up Detail Surface (Full Screen) */}
      {appState.mobileSurface === 'catch-up-detail' && appState.selectedCatchUpId && (
        <div className="fixed inset-0 z-40 bg-[var(--bg-panel)] flex flex-col overflow-hidden animate-in slide-in-from-right">
          <CatchUpPanel 
            appState={appState} 
            setAppState={setAppState} 
            catchUpResult={appState.catchUps.find(c => c.id === appState.selectedCatchUpId)!} 
            isMobile={true}
          />
        </div>
      )}

      {/* Mobile Reply Helper Bottom Sheet */}
      {appState.replyHelperOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-50 transition-opacity" 
            onClick={() => setAppState(prev => ({ ...prev, replyHelperOpen: false }))}
          />
          {/* Sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-panel)] rounded-t-2xl shadow-2xl pb-[env(safe-area-inset-bottom)] flex flex-col max-h-[75dvh] animate-in slide-in-from-bottom">
             <SuggestedReplyComposer appState={appState} setAppState={setAppState} isMobile={true} />
          </div>
        </>
      )}
    </div>
  );
};

export default MobileAppShell;
