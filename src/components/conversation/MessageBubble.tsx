import React from 'react';
import { Message } from '../../types';
import clsx from 'clsx';
import { CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isOutgoing = message.direction === 'outgoing';

  return (
    <div className={clsx("flex w-full mb-2", isOutgoing ? "justify-end" : "justify-start")}>
      <div className={clsx(
        "relative max-w-[65%] px-[9px] py-[6px] text-[15px] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]",
        isOutgoing 
          ? "bg-[var(--color-wa-bubble-sent-light)] dark:bg-[var(--color-wa-bubble-sent-dark)] rounded-l-[7.5px] rounded-br-[7.5px] rounded-tr-none" 
          : "bg-[var(--bg-panel)] rounded-r-[7.5px] rounded-bl-[7.5px] rounded-tl-none"
      )}>
        {/* Tail indicator for first message in cluster could be added using ::before but we keep it simple for now */}
        
        <span className="break-words text-[var(--text-primary)]" style={{ lineHeight: '20px' }}>
          {message.text}
        </span>
        
        <div className="float-right -mb-1 ml-3 mt-2 h-[15px] flex items-center">
          <span className="text-[11px] text-[var(--text-secondary)]">
            {message.sentAt}
          </span>
          {isOutgoing && (
            <CheckCheck size={15} className="ml-1 text-[#53bdeb]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
