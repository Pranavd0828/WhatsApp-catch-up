import React from 'react';
import { Lock } from 'lucide-react';

const StartupScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[var(--bg-panel-secondary)] border-b-[6px] border-[var(--color-wa-green)] relative h-full">
      <div className="max-w-[460px] text-center flex flex-col items-center">
        {/* Abstract laptop graphic similar to WhatsApp Web */}
        <div className="mb-8 opacity-60">
          <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="30" width="230" height="135" rx="8" fill="transparent" stroke="var(--border-subtle)" strokeWidth="6"/>
            <rect x="35" y="40" width="210" height="115" rx="4" fill="var(--bg-app)" />
            <path d="M10 170 H270 C275.5 170 280 174.5 280 180 V185 C280 187.8 277.8 190 275 190 H5 C2.2 190 0 187.8 0 185 V180 C0 174.5 4.5 170 10 170 Z" fill="var(--border-subtle)" />
            <path d="M110 170 L115 180 H165 L170 170 Z" fill="var(--bg-app)" />
            {/* Some generic UI blobs on screen */}
            <rect x="50" y="55" width="40" height="10" rx="3" fill="var(--border-subtle)" opacity="0.5" />
            <rect x="50" y="75" width="120" height="8" rx="2" fill="var(--border-subtle)" opacity="0.3" />
            <rect x="50" y="95" width="90" height="8" rx="2" fill="var(--border-subtle)" opacity="0.3" />
            
            <circle cx="220" cy="60" r="12" fill="var(--color-wa-green)" opacity="0.8" />
            <circle cx="220" cy="60" r="4" fill="white" />
          </svg>
        </div>
      </div>
      <h1 className="text-[32px] font-light text-[var(--text-primary)] mb-4">WhatsApp for Web</h1>
      <p className="text-[14px] text-[var(--text-secondary)] mb-8 text-center max-w-[400px] leading-relaxed">
        Send and receive messages without keeping your phone online.<br/>
        Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
      </p>
      
      <div className="mt-auto mb-10 flex items-center gap-1.5 text-[12px] text-[var(--text-secondary)]">
        <Lock size={12} />
        <span>End-to-end encrypted</span>
      </div>
    </div>
  );
};

export default StartupScreen;
