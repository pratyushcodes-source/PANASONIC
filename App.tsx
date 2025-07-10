import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage, Sender, GroundingChunk } from './types';
import { initChat, sendMessageToGemini } from './services/geminiService';
import { Chat, GroundingMetadata } from '@google/genai';
import ChatInput from './components/ChatInput';
import MessageBubble from './components/MessageBubble';
import Header from './components/Header';
import LoadingIndicator from './components/LoadingIndicator';
import SuggestedQuestions from './components/SuggestedQuestions';
import { searchSimilarQuestions } from './scripts/searchSimilarQuestions';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestionsList: string[] = [
    "Latest Panasonic TV models in India?",
    "Troubleshoot Panasonic washing machine",
    "Reviews for Panasonic ACs",
    "Warranty for Panasonic microwaves?",
    "Compare Lumix S5II and S5IIX",
    "Panasonic refrigerator features",
  ];

  const fallbackSuggestions = [
    "How to register a Panasonic product?",
    "Where to find product manuals?",
    "Panasonic washing machine not draining",
    "Resetting a microwave oven",
    "Panasonic refrigerator troubleshooting"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const session = initChat();
      setChatSession(session);
      setMessages([
        {
          id: Date.now().toString(),
          text: "Hello! I'm your Panasonic Self-Help Assistant for India. How can I help you today with your Panasonic products, or would you like me to find some reviews? You can also pick one of the suggestions below.",
          sender: Sender.Bot,
          timestamp: new Date(),
        },
      ]);
      setSuggestedQuestions(suggestedQuestionsList);
    } catch (e: any) {
      console.error("Failed to initialize chat:", e);
      setError("Failed to initialize chat. Please check your API key and refresh.");
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    console.log("✅ handleSendMessage triggered with:", messageText || inputValue);
    if (!textToSend.trim() || isLoading || !chatSession) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: textToSend,
      sender: Sender.User,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    console.log("Calling searchSimilarQuestions with:", textToSend);

    searchSimilarQuestions(textToSend)
      .then((results) => {
        console.log("searchSimilarQuestions result:", results);

        if (results && results.length > 0) {
          setSuggestedQuestions(results.slice(0, 5));
        } else {
          setSuggestedQuestions(fallbackSuggestions);
        }
      })
      .catch((err) => {
        console.error("Suggestion fetch error:", err);
        setSuggestedQuestions(fallbackSuggestions);
      });

    if (!messageText) {
      setInputValue('');
    }
    setIsLoading(true);
    setError(null);

    const botMessageId = (Date.now() + 1).toString();
    const botPlaceholderMessage: ChatMessage = {
      id: botMessageId,
      text: '',
      sender: Sender.Bot,
      timestamp: new Date(),
      isStreaming: true,
      groundingChunks: [],
    };
    setMessages((prevMessages) => [...prevMessages, botPlaceholderMessage]);

    try {
      await sendMessageToGemini(chatSession, textToSend, (chunkText, chunkGroundingMetadata?: GroundingMetadata) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) => {
            if (msg.id === botMessageId) {
              const newText = msg.text + chunkText;
              let updatedGroundingChunks = msg.groundingChunks || [];

              if (chunkGroundingMetadata?.groundingChunks && chunkGroundingMetadata.groundingChunks.length > 0) {
                const existingUris = new Set(updatedGroundingChunks.map(gc => gc.web?.uri).filter(Boolean));
                const newChunksToAdd = chunkGroundingMetadata.groundingChunks.filter(
                  newChunk => newChunk.web?.uri && !existingUris.has(newChunk.web.uri)
                );
                if (newChunksToAdd.length > 0) {
                  updatedGroundingChunks = [...updatedGroundingChunks, ...newChunksToAdd];
                }
              }
              return { ...msg, text: newText, groundingChunks: updatedGroundingChunks };
            }
            return msg;
          })
        );
      });

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === botMessageId ? { ...msg, isStreaming: false, timestamp: new Date() } : msg
        )
      );

    } catch (e: any) {
      console.error('Error sending message to Gemini:', e);
      const errorMessageText = e.message || "Sorry, I encountered an error. Please try again.";
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === botMessageId ? { ...msg, text: errorMessageText, isStreaming: false, sender: Sender.Bot, error: true } : msg
        )
      );
      setError(errorMessageText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestionClick = async (question: string) => {
    if (isLoading) return;
    await handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Header />

      {chatSession && messages.length > 0 && !isLoading && suggestedQuestions.length > 0 && (
  <SuggestedQuestions
    key={messages.length} // 🔑 Force re-render when a new message is added
    questions={suggestedQuestions}
    onQuestionClick={handleSuggestedQuestionClick}
  />
)}


      <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-800/50 backdrop-blur-sm shadow-inner">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && messages[messages.length - 1]?.sender === Sender.User && (
          <div className="flex justify-start pl-2 pt-2">
            <LoadingIndicator />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && !messages.some(msg => msg.error && msg.text.includes(error)) && (
        <div className="p-3 bg-red-600 text-white text-center text-xs font-medium shadow-lg">
          Error: {error}
        </div>
      )}
      <ChatInput
        inputValue={inputValue}
        onInputChange={(e) => setInputValue(e.target.value)}
        onSendMessage={() => handleSendMessage()}
        isLoading={isLoading || !chatSession}
      />
    </div>
  );
};

export default App;
