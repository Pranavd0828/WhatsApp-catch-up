import React from 'react';
import { AppState } from '../../types';
import NavigationRail from './NavigationRail';
import ChatList from '../chat-list/ChatList';
import ConversationView from '../conversation/ConversationView';
import CatchUpPanel from '../catch-up/CatchUpPanel';

interface AppShellProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AppShell: React.FC<AppShellProps> = ({ appState, setAppState }) => {
  return (
    <div className="flex w-full h-full">
      <NavigationRail appState={appState} setAppState={setAppState} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <ChatList 
          appState={appState} 
          setAppState={setAppState} 
        />
        
        <div className={`flex-1 flex flex-col relative transition-all duration-300 ease-out min-w-0`}>
          <ConversationView 
            appState={appState} 
            setAppState={setAppState} 
            chatId={appState.selectedChatId}
          />
        </div>
        
        {appState.isCatchUpPanelOpen && appState.selectedCatchUpId && (
          <div className="w-[420px] max-w-[420px] flex-shrink-0 border-l border-[var(--border-subtle)] bg-[var(--bg-panel)] overflow-y-auto">
            <CatchUpPanel 
              appState={appState} 
              setAppState={setAppState} 
              catchUpResult={appState.catchUps.find(c => c.id === appState.selectedCatchUpId)!} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppShell;
