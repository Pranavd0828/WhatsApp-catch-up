import React from 'react';
import { AppState, VoiceNote, CatchUpResult } from '../../types';
import VoiceNoteBubble from './VoiceNoteBubble';
import CatchUpInlineCard from '../catch-up/CatchUpInlineCard';

import clsx from 'clsx';

interface VoiceNoteClusterProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  voiceNotes: VoiceNote[];
  catchUpResult?: CatchUpResult;
  isMobile?: boolean;
}

const VoiceNoteCluster: React.FC<VoiceNoteClusterProps> = ({ appState, setAppState, voiceNotes, catchUpResult, isMobile }) => {
  let accumulated = 0;
  
  return (
    <div className="flex flex-col w-full">
      {voiceNotes.map((vn, index) => {
        const startSecs = accumulated;
        accumulated += vn.durationSeconds;
        
        return (
          <VoiceNoteBubble 
            key={vn.id} 
            appState={appState}
            setAppState={setAppState}
            voiceNote={vn} 
            isFirst={index === 0} 
            isLast={index === voiceNotes.length - 1} 
            showAvatar={index === voiceNotes.length - 1} 
            accumulatedStartSeconds={startSecs}
          />
        );
      })}
      
      {catchUpResult && (
        <div className={clsx("mt-2", !isMobile && "ml-10")}>
          <CatchUpInlineCard 
            appState={appState}
            setAppState={setAppState}
            catchUpResult={catchUpResult} 
            isMobile={isMobile}
          />
        </div>
      )}
    </div>
  );
};

export default VoiceNoteCluster;
