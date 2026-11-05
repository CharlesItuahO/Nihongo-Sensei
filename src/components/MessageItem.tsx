import React from 'react';
import { RichMessage, RubySegment, WordToken } from '../types/index.ts';
import { useApp } from '../context/AppContext.tsx';
import {
  Volume2,
  VolumeX,
  Turtle,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';

interface MessageItemProps {
  message: RichMessage;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const {
    profile,
    playAudio,
    stopAudio,
    isPlayingAudio,
    playingMessageId,
    currentPlaybackSpeed,
    openWordCard,
    sendMessage,
    isWordSaved,
    saveWord,
  } = useApp();

  const isSensei = message.role === 'sensei';
  const isPlayingThisMessage = isPlayingAudio && playingMessageId === message.id;

  // Split English sentence into clickable words
  const renderClickableEnglish = (text: string) => {
    const tokens = text.split(/(\s+|[.,!?;:"])/);
    return (
      <span className="leading-relaxed">
        {tokens.map((token, idx) => {
          const isWord = /^[a-zA-Z0-9'-]+$/.test(token);
          if (!isWord) return <span key={idx}>{token}</span>;
          return (
            <button
              key={idx}
              onClick={() => openWordCard(token, 'en')}
              className="inline hover:underline decoration-rose-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer text-left"
              title={`Look up "${token}" in Oxford Dictionary`}
            >
              {token}
            </button>
          );
        })}
      </span>
    );
  };

  // Render Japanese with Ruby furigana
  const renderRubyJapanese = (segments?: RubySegment[], fallbackText?: string) => {
    if (!segments || segments.length === 0) {
      return (
        <span className="font-japanese font-medium text-xl sm:text-2xl text-stone-900 dark:text-stone-100">
          {fallbackText}
        </span>
      );
    }

    return (
      <span className="font-japanese font-medium text-xl sm:text-2xl text-stone-900 dark:text-stone-100 leading-loose flex flex-wrap items-baseline gap-x-0.5">
        {segments.map((seg, idx) => {
          const hasFurigana = profile.showFurigana && seg.reading && seg.isKanji;
          return (
            <span
              key={idx}
              onClick={() => openWordCard(seg.text, 'ja')}
              className="hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/70 dark:hover:bg-rose-950/40 rounded px-0.5 transition-colors cursor-pointer inline-block"
              title={`Tap to explore "${seg.text}"`}
            >
              {hasFurigana ? (
                <ruby>
                  {seg.text}
                  <rt className="font-sans text-[11px] font-semibold text-rose-500 dark:text-rose-400 select-none">
                    {seg.reading}
                  </rt>
                </ruby>
              ) : (
                <span>{seg.text}</span>
              )}
            </span>
          );
        })}
      </span>
    );
  };

  // Handle user bubble
  if (!isSensei) {
    return (
      <div className="flex justify-end mb-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="max-w-[85%] sm:max-w-[70%]">
          <div className="bg-rose-500 text-white rounded-2xl rounded-tr-xs px-4 py-3 shadow-sm shadow-rose-200 dark:shadow-none">
            <div className="text-sm sm:text-base font-normal">
              {message.englishInput}
            </div>
          </div>
          <div className="text-[11px] text-stone-400 text-right mt-1 px-1">
            You (English)
          </div>
        </div>
      </div>
    );
  }

  // Handle Sensei rich message
  return (
    <div className="flex gap-3 mb-8 animate-in fade-in slide-in-from-bottom-2">
      {/* Sensei Avatar */}
      <div className="flex-shrink-0">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-sm font-bold text-sm">
          <span className="font-japanese">先生</span>
        </div>
      </div>

      {/* Sensei Message Body */}
      <div className="flex-1 max-w-[92%] sm:max-w-[85%] space-y-4">
        <div className="bg-white dark:bg-stone-800 rounded-3xl rounded-tl-xs p-4 sm:p-6 border border-stone-200/80 dark:border-stone-700/80 shadow-xs space-y-4">
          
          {/* Audio Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100 dark:border-stone-700">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (isPlayingThisMessage && currentPlaybackSpeed === 1.0) {
                    stopAudio();
                  } else {
                    playAudio(message.japanese, 1.0, message.id);
                  }
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                  isPlayingThisMessage && currentPlaybackSpeed >= 0.8
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200'
                }`}
                title="Listen at normal speed"
                aria-label="Play Japanese audio"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingThisMessage && currentPlaybackSpeed >= 0.8 ? 'Playing' : 'Listen'}</span>
              </button>

              <button
                onClick={() => {
                  if (isPlayingThisMessage && currentPlaybackSpeed === 0.6) {
                    stopAudio();
                  } else {
                    playAudio(message.japanese, 0.6, message.id);
                  }
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                  isPlayingThisMessage && currentPlaybackSpeed === 0.6
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-300'
                }`}
                title="Listen slowly at 0.6x speed"
                aria-label="Play slowly at 0.6x speed"
              >
                <Turtle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Slow (0.6x)</span>
              </button>
            </div>

            {/* Audio Waveform Indicator */}
            {isPlayingThisMessage ? (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs">
                <span className="w-1 h-3 bg-rose-500 rounded-full animate-wave-1" />
                <span className="w-1 h-4 bg-rose-500 rounded-full animate-wave-2" />
                <span className="w-1 h-2 bg-rose-500 rounded-full animate-wave-3" />
                <span className="w-1 h-3.5 bg-rose-500 rounded-full animate-wave-4" />
                <span className="ml-1 text-[11px] font-semibold">Speaking...</span>
              </div>
            ) : (
              <div className="text-[11px] text-stone-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Tap any word to explore</span>
              </div>
            )}
          </div>

          {/* Multi-script parallel lines */}
          <div className="space-y-2">
            {/* 1. Japanese sentence with ruby furigana */}
            <div className="py-1">
              {renderRubyJapanese(message.rubySegments, message.japanese)}
            </div>

            {/* 2. Full Kana Reading (toggleable) */}
            {profile.showKanaLine && message.kana && message.kana !== message.japanese && (
              <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-japanese tracking-wide bg-stone-50 dark:bg-stone-900/60 px-3 py-1.5 rounded-xl border border-stone-150 dark:border-stone-800">
                <span className="text-[10px] uppercase font-bold text-stone-400 mr-2 tracking-wider">
                  Kana
                </span>
                {message.kana}
              </div>
            )}

            {/* 3. Romaji line (toggleable) */}
            {profile.showRomaji && message.romaji && (
              <div className="text-xs sm:text-sm font-mono text-stone-600 dark:text-stone-400 tracking-wide px-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 mr-2 tracking-wider">
                  Romaji
                </span>
                {message.romaji}
              </div>
            )}

            {/* 4. English gloss / translation */}
            <div className="text-sm sm:text-base text-stone-800 dark:text-stone-200 font-medium pt-1 px-1 flex items-start gap-2">
              <span className="text-stone-400 select-none">“</span>
              <div className="flex-1">
                {renderClickableEnglish(message.english)}
              </div>
              <span className="text-stone-400 select-none">”</span>
            </div>
          </div>

          {/* Breakdown chips */}
          {message.breakdown && message.breakdown.length > 0 && (
            <div className="pt-2">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 dark:text-stone-500 mb-2 flex items-center justify-between">
                <span>Key Vocabulary & Grammar Breakdown</span>
                <span className="text-[10px] lowercase text-stone-400 font-normal">
                  click token for dictionary
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {message.breakdown.map((token, idx) => {
                  const saved = isWordSaved(token.surface);
                  return (
                    <div
                      key={idx}
                      className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/90 dark:border-stone-700/80 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-xs transition-all text-xs"
                    >
                      <button
                        onClick={() => openWordCard(token.surface, 'ja')}
                        className="text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="font-japanese font-bold text-stone-900 dark:text-stone-100">
                            {token.surface}
                          </span>
                          {token.reading && token.reading !== token.surface && (
                            <span className="text-[10px] text-stone-500 font-japanese">
                              ({token.reading})
                            </span>
                          )}
                          {token.jlpt && (
                            <span className="text-[9px] px-1 py-0.2 rounded font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40">
                              {token.jlpt}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-600 dark:text-stone-400">
                          <span className="italic text-stone-400 mr-1">{token.pos}:</span>
                          {token.meaning}
                        </div>
                      </button>

                      {/* Quick Save Star */}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          if (!saved) {
                            saveWord({
                              word: token.surface,
                              reading: token.reading,
                              romaji: token.romaji,
                              pos: token.pos,
                              definition: token.meaning,
                              jlpt: token.jlpt,
                              source: 'llm',
                              examples: [
                                {
                                  ja: `${token.surface}を練習しましょう。`,
                                  romaji: `${token.romaji} o renshū shimashō.`,
                                  en: `Let's practice "${token.meaning}".`,
                                },
                              ],
                            });
                          }
                        }}
                        className={`p-1 rounded-md transition-colors ${
                          saved
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-stone-300 group-hover:text-stone-500 dark:group-hover:text-stone-400'
                        }`}
                        title={saved ? 'Saved in My Words' : 'Save to My Words'}
                      >
                        {saved ? (
                          <BookmarkCheck className="w-3.5 h-3.5" />
                        ) : (
                          <Bookmark className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Grammar Note */}
          {message.grammarNote && (
            <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 rounded-2xl p-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200/90 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-semibold text-amber-950 dark:text-amber-100 mr-1">
                  Sensei's Tip:
                </span>
                {message.grammarNote}
              </div>
            </div>
          )}

          {/* Sensei's Conversational Follow-up */}
          {message.replyJapanese && (
            <div className="pt-3 border-t border-stone-100 dark:border-stone-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span>Sensei Converses Back:</span>
                </div>
                <button
                  onClick={() => playAudio(message.replyJapanese || '', 1.0)}
                  className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 hover:underline font-medium cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen to reply</span>
                </button>
              </div>

              <div className="bg-stone-50/80 dark:bg-stone-900/70 p-3.5 rounded-2xl border border-stone-200/60 dark:border-stone-800 space-y-1.5">
                <div className="font-japanese text-base sm:text-lg text-stone-900 dark:text-stone-100">
                  {renderRubyJapanese(message.replyRubySegments, message.replyJapanese)}
                </div>
                {profile.showRomaji && message.replyRomaji && (
                  <div className="text-xs font-mono text-stone-500">
                    {message.replyRomaji}
                  </div>
                )}
                <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic">
                  “{message.replyEnglish}”
                </div>
              </div>
            </div>
          )}

          {/* Suggested Reply Prompts */}
          {message.suggestedReplies && message.suggestedReplies.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-stone-400 font-medium">Try saying:</span>
              {message.suggestedReplies.map((replyText, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(replyText)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200/70 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-medium transition-colors shadow-2xs group cursor-pointer"
                >
                  <span>{replyText}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
