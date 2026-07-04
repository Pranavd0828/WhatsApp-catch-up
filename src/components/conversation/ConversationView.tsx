import React, { useEffect, useRef } from 'react';
import { AppState } from '../../types';
import ConversationHeader from './ConversationHeader';
import ChatComposer from './ChatComposer';
import VoiceNoteCluster from './VoiceNoteCluster';
import MessageBubble from './MessageBubble';
import StartupScreen from '../shell/StartupScreen';

interface ConversationViewProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  chatId: string | null;
  isMobile?: boolean;
}

const ConversationView: React.FC<ConversationViewProps> = ({ appState, setAppState, chatId, isMobile }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chatCatchUp = chatId ? appState.catchUps.find(c => c.chatId === chatId) : undefined;

  useEffect(() => {
    if (chatId && messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  }, [chatId, chatCatchUp]);

  if (!chatId) {
    return <StartupScreen />;
  }

  const chat = appState.chats.find(c => c.id === chatId)!;
  const chatMessages = appState.messages.filter(m => m.chatId === chatId);
  const chatVoiceNotes = appState.voiceNotes.filter(v => v.chatId === chatId);

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[var(--bg-conversation)]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.85] dark:opacity-[0.04] pointer-events-none mix-blend-multiply dark:mix-blend-screen" style={{
        backgroundImage: 'var(--bg-chat-tile)',
        backgroundRepeat: 'repeat',
        backgroundSize: '412px auto'
      }} />

      <ConversationHeader chat={chat} isMobile={isMobile} setAppState={setAppState} />

      <div className="flex-1 overflow-y-auto px-[6%] pt-8 pb-4 z-10 flex flex-col">
        {chatMessages.length === 0 && chatVoiceNotes.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
             <div className="bg-[var(--bg-panel-secondary)] text-[var(--text-secondary)] px-4 py-2 rounded-lg text-sm text-center">
                Send a message to start chatting with {chat.name}
             </div>
          </div>
        ) : (
          <>
            <div className="w-full flex justify-center mb-6">
              <div className="bg-[var(--bg-panel)] px-3 py-1 rounded-lg shadow-sm text-xs text-[var(--text-secondary)]">
                TODAY
              </div>
            </div>

            {/* Render text messages */}
            {chatMessages.map(msg => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Render voice notes if any */}
            {chatVoiceNotes.length > 0 && (
              <>
                <div className="mt-8 mb-2 w-full flex justify-center">
                  <span className="text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-panel-secondary)] px-3 py-1 rounded-full shadow-sm">
                    {chatVoiceNotes.length} voice notes · {Math.round(chatVoiceNotes.reduce((acc, curr) => acc + curr.durationSeconds, 0) / 60)} min total
                  </span>
                </div>

                <VoiceNoteCluster 
                  appState={appState}
                  setAppState={setAppState}
                  voiceNotes={chatVoiceNotes}
                  catchUpResult={chatCatchUp}
                  isMobile={isMobile}
                />
              </>
            )}
            
            <div ref={messagesEndRef} className="h-[1px]" />
          </>
        )}
      </div>

      <ChatComposer appState={appState} setAppState={setAppState} isMobile={isMobile} />
    </div>
  );
};

export default ConversationView;
