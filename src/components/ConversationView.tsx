import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { MessageItem } from './MessageItem.tsx';
import { VoiceComposer } from './VoiceComposer.tsx';
import { Sparkles, MessageSquare, Mic, Volume2 } from 'lucide-react';

export const ConversationView: React.FC = () => {
  const { messages, isLoadingMessage, profile, sendMessage } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoadingMessage]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#FAF8F4] dark:bg-[#171513] transition-colors">
      {/* Scrollable Message Thread */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-4xl w-full mx-auto space-y-2">
        {messages.length === 0 ? (
          /* Empty / New Conversation Welcome State */
          <div className="py-12 px-4 text-center space-y-6 max-w-md mx-auto animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md mx-auto">
              <span className="font-japanese font-bold text-2xl">先生</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                Ready to speak Japanese?
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                Speak or type naturally in <strong className="text-stone-700 dark:text-stone-300">English</strong>. Sensei translates into natural Japanese, pronounces it, breaks down every particle, and converses right back.
              </p>
            </div>

            <div className="space-y-2 text-left pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 text-center">
                Try saying one of these:
              </div>
              {[
                'I would like a matcha tea and some water, please.',
                'Where can I catch the bullet train to Kyoto?',
                'Can I take a photo here?',
                'What is delicious to eat around here?',
              ].map((starter, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(starter)}
                  className="w-full p-3 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-rose-300 dark:hover:border-rose-700 text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200 hover:text-rose-600 transition-all text-left shadow-2xs group"
                >
                  <span className="text-rose-500 font-bold mr-2 group-hover:translate-x-0.5 inline-block transition-transform">
                    “
                  </span>
                  {starter}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map(message => (
            <MessageItem key={message.id} message={message} />
          ))
        )}

        {/* Loading Sensei Thinking State */}
        {isLoadingMessage && (
          <div className="flex gap-3 mb-6 animate-in fade-in">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-xs font-bold text-sm flex-shrink-0">
              <span className="font-japanese">先生</span>
            </div>
            <div className="bg-white dark:bg-stone-800 rounded-3xl rounded-tl-xs p-4 sm:p-5 border border-stone-200/80 dark:border-stone-700/80 shadow-xs flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-bounce" />
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-xs text-stone-500 font-medium">
                Sensei is translating, creating furigana, and preparing audio...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Docked Voice & Text Composer */}
      <VoiceComposer />
    </div>
  );
};
