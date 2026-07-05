import React from 'react';
import { AppState } from '../../types';
import { MessageCircle, Settings, Users, CircleDashed, MessageSquareShare, Sparkles, type LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface NavigationRailProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const NavigationRail: React.FC<NavigationRailProps> = ({ appState, setAppState }) => {
  const handleSelect = (section: AppState['activeSection']) => {
    setAppState(prev => ({ ...prev, activeSection: section }));
  };

  const NavItem = ({ section, icon: Icon, tooltip }: { section: AppState['activeSection'], icon: LucideIcon, tooltip: string }) => {
    const isActive = appState.activeSection === section;
    const isCatchUpActive = isActive && section === 'catch-up';
    return (
      <button 
        onClick={() => handleSelect(section)}
        className="w-12 h-12 flex items-center justify-center rounded-full transition-colors relative group mx-auto mb-2
                   hover:bg-[var(--bg-hover)]"
        title={tooltip}
        aria-label={tooltip}
        aria-current={isActive ? "page" : undefined}
      >
        {isActive && (
          <span className="absolute left-[-8px] top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-[var(--color-wa-green)]" />
        )}
        <div className={clsx(
          "flex items-center justify-center w-10 h-10 rounded-full transition-all",
          isCatchUpActive
            ? "bg-[rgba(0,168,132,0.16)] text-[var(--color-wa-green)] ring-2 ring-[var(--color-wa-green)] ring-offset-2 ring-offset-[var(--bg-panel-secondary)]"
            : isActive
              ? "bg-[var(--bg-selected)] text-[var(--text-primary)]"
              : "text-[var(--text-secondary)]"
        )}>
          <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
        </div>
      </button>
    );
  };

  return (
    <div className="w-[64px] min-w-[64px] h-full flex flex-col justify-between items-center py-4 bg-[var(--bg-panel-secondary)] border-r border-[var(--border-subtle)]">
      <div className="flex flex-col gap-2 w-full">
        <NavItem section="chats" icon={MessageCircle} tooltip="Chats" />
        <NavItem section="status" icon={CircleDashed} tooltip="Status" />
        <NavItem section="channels" icon={MessageSquareShare} tooltip="Channels" />
        <NavItem section="communities" icon={Users} tooltip="Communities" />
        <NavItem section="catch-up" icon={Sparkles} tooltip="Catch Up" />
      </div>
      
      <div className="flex flex-col gap-2 w-full">
        <NavItem section="settings" icon={Settings} tooltip="Settings" />
        <button className="w-10 h-10 rounded-full overflow-hidden mx-auto mt-2 cursor-pointer">
          <img src="https://i.pravatar.cc/150?u=me" alt="Profile" className="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  );
};

export default NavigationRail;
