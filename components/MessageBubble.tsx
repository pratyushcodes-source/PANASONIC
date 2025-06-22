
import React from 'react';
import { ChatMessage, Sender } from '../types';
import { UserIcon } from './icons/UserIcon';
import { BotIcon } from './icons/BotIcon';
import { AlertTriangle, Link as LinkIcon } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === Sender.User;
  const bubbleAlignment = isUser ? 'justify-end' : 'justify-start';
  const bubbleColor = isUser
    ? 'bg-blue-600 text-white'
    : message.error
    ? 'bg-red-700 text-red-100'
    : 'bg-slate-700 text-gray-200';
  
  const formattedTimestamp = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(\bwww\.[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.split(urlRegex).map((part, index) => {
      if (part && (part.startsWith('http') || part.startsWith('www'))) {
        const href = part.startsWith('www') ? `http://${part}` : part;
        return <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 underline">{part}</a>;
      }
      return part;
    });
  };

  return (
    <div className={`flex ${bubbleAlignment} group`}>
      <div className={`flex items-start max-w-xl md:max-w-2xl lg:max-w-3xl space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`mt-1 p-2 rounded-full ${isUser ? 'bg-blue-600' : 'bg-slate-600'} text-white shadow`}>
          {isUser ? <UserIcon className="w-5 h-5" /> : <BotIcon className="w-5 h-5" />}
        </div>
        <div className={`px-4 py-3 rounded-xl shadow-md ${bubbleColor} ${isUser ? 'rounded-br-none' : 'rounded-bl-none'}`}>
          {message.error && (
            <div className="flex items-center text-red-100 mb-1">
              <AlertTriangle size={16} className="mr-2 text-red-300" /> 
              <span className="font-semibold">Error</span>
            </div>
          )}
          <div className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap break-words">
            {renderTextWithLinks(message.text)}
            {message.isStreaming && <span className="inline-block w-1 h-4 bg-gray-400 animate-pulse ml-1"></span>}
          </div>
          <div className={`text-xs mt-2 ${isUser ? 'text-blue-200' : 'text-gray-400'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            {formattedTimestamp}
          </div>
          {message.groundingChunks && message.groundingChunks.length > 0 && (
            <div className="mt-3 pt-2 border-t border-slate-600/50">
              <h4 className="text-xs font-semibold text-gray-400 mb-1.5 flex items-center">
                <LinkIcon size={12} className="mr-1.5 text-gray-500" />
                Sources:
              </h4>
              <ul className="space-y-1">
                {message.groundingChunks.map((chunk, idx) => (
                  chunk.web && chunk.web.uri && (
                    <li key={`${message.id}-source-${idx}`} className="text-xs leading-tight">
                      <a
                        href={chunk.web.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:text-sky-300 hover:underline break-all"
                        title={chunk.web.title || chunk.web.uri}
                      >
                        {chunk.web.title || new URL(chunk.web.uri).hostname}
                      </a>
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
