import React from 'react';
import { SendIcon } from './icons/SendIcon';

interface ChatInputProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ inputValue, onInputChange, onSendMessage, isLoading }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      onSendMessage();
    }
  };

  return (
    <div className="p-4 bg-slate-900 border-t border-slate-700 shadow-xl">
      <div className="flex items-center space-x-3 bg-slate-800 rounded-lg p-1">
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          onKeyPress={handleKeyPress}
          placeholder={isLoading ? "Assistant is typing..." : "Ask about Panasonic products..."}
          className="flex-grow p-3 bg-transparent text-sm text-gray-200 placeholder-gray-500 focus:outline-none rounded-md"
          disabled={isLoading}
        />
        <button
          onClick={onSendMessage}
          disabled={isLoading || !inputValue.trim()}
          className={`p-3 rounded-md transition-colors duration-200 ease-in-out
                      ${isLoading || !inputValue.trim() 
                        ? 'bg-slate-700 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'}
                      text-white`}
          aria-label="Send message"
        >
          <SendIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;