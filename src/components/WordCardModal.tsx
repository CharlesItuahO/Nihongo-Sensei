import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  X,
  Volume2,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Loader2,
  Tag,
  Layers,
} from 'lucide-react';

export const WordCardModal: React.FC = () => {
  const {
    activeWordCard,
    isLoadingWordCard,
    closeWordCard,
    saveWord,
    removeWord,
    isWordSaved,
    playAudio,
    profile,
  } = useApp();

  if (!activeWordCard && !isLoadingWordCard) return null;

  const isSaved = activeWordCard ? isWordSaved(activeWordCard.word) : false;

  const getSourceBadge = (src?: string) => {
    switch (src) {
      case 'oxford':
        return { label: 'Oxford Dictionaries (OUP)', color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900' };
      case 'freedict':
        return { label: 'Free Dictionary API', color: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-900' };
      case 'jisho':
        return { label: 'Jisho (JMdict/Kanjidic)', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900' };
      default:
        return { label: 'Nihongo Sensei Lexicon', color: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-900' };
    }
  };

  const badge = getSourceBadge(activeWordCard?.source);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="fixed inset-0"
        onClick={closeWordCard}
        aria-hidden="true"
      />

      <div className="relative w-full sm:max-w-xl max-h-[88vh] sm:max-h-[85vh] bg-white dark:bg-stone-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 z-10">
        
        {/* Loading Spinner State */}
        {isLoadingWordCard && !activeWordCard && (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-stone-500">
            <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
            <p className="text-sm font-medium">Consulting dictionary & grammar tables...</p>
          </div>
        )}

        {activeWordCard && (
          <>
            {/* Modal Header */}
            <div className="p-5 pb-4 border-b border-stone-100 dark:border-stone-800 flex items-start justify-between gap-4 bg-stone-50/60 dark:bg-stone-800/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-japanese font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
                    {activeWordCard.word}
                  </h2>

                  {/* Play audio */}
                  <button
                    onClick={() => playAudio(activeWordCard.reading || activeWordCard.word, 1.0)}
                    className="p-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/80 hover:bg-rose-200 dark:hover:bg-rose-900 text-rose-600 dark:text-rose-400 transition-colors"
                    title="Pronounce word"
                    aria-label="Listen to word"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Slow audio */}
                  <button
                    onClick={() => playAudio(activeWordCard.reading || activeWordCard.word, 0.6)}
                    className="px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/80 hover:bg-amber-100 text-amber-700 dark:text-amber-400 text-xs font-semibold"
                    title="Listen slowly (0.6x)"
                  >
                    0.6x
                  </button>

                  {/* JLPT Badge */}
                  {activeWordCard.jlpt && (
                    <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                      {activeWordCard.jlpt}
                    </span>
                  )}

                  {/* Part of Speech */}
                  <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-stone-200/80 dark:bg-stone-700 text-stone-700 dark:text-stone-300 capitalize">
                    {activeWordCard.pos}
                  </span>
                </div>

                {/* Kana Reading & Romaji */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500">
                  {activeWordCard.reading && activeWordCard.reading !== activeWordCard.word && (
                    <span className="font-japanese text-stone-700 dark:text-stone-300 font-semibold">
                      {activeWordCard.reading}
                    </span>
                  )}
                  {activeWordCard.romaji && (
                    <span className="font-mono text-stone-500">
                      [{activeWordCard.romaji}]
                    </span>
                  )}
                </div>
              </div>

              {/* Top Action Buttons (Save + Close) */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    if (isSaved) {
                      removeWord(activeWordCard.word);
                    } else {
                      saveWord(activeWordCard);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSaved
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 hover:bg-rose-100'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save Word</span>
                    </>
                  )}
                </button>

                <button
                  onClick={closeWordCard}
                  className="p-1.5 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                  aria-label="Close word card"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Word Details Body */}
            <div className="p-5 overflow-y-auto space-y-5 text-stone-800 dark:text-stone-200 text-sm">
              
              {/* Primary Definition */}
              <div className="space-y-1.5">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-400">
                  Definition & Meaning
                </div>
                <div className="text-base font-medium text-stone-900 dark:text-stone-100 leading-snug">
                  {activeWordCard.definition}
                </div>
                {activeWordCard.nuance && (
                  <div className="text-xs text-stone-500 italic pt-1">
                    Nuance: {activeWordCard.nuance}
                  </div>
                )}
              </div>

              {/* English loanword / translation equivalents */}
              {activeWordCard.englishEquivalents && activeWordCard.englishEquivalents.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-400">
                    Equivalent Japanese Expressions
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeWordCard.englishEquivalents.map((eq, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-japanese font-medium text-stone-800 dark:text-stone-200"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Conjugation Table (Verbs & Adjectives) */}
              {activeWordCard.conjugation && activeWordCard.conjugation.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-stone-400">
                    <span>Conjugation Forms</span>
                    <span className="text-[10px] lowercase text-stone-400 font-normal">
                      tap form to pronounce
                    </span>
                  </div>
                  <div className="border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden divide-y divide-stone-100 dark:divide-stone-800 text-xs">
                    {activeWordCard.conjugation.map((conj, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                      >
                        <div className="w-1/3">
                          <span className="font-semibold text-stone-700 dark:text-stone-300">
                            {conj.form}
                          </span>
                          <div className="text-[10px] text-stone-400">
                            {conj.explanation}
                          </div>
                        </div>

                        <div className="w-2/3 flex items-center justify-end gap-2">
                          <div className="text-right">
                            <span className="font-japanese font-bold text-stone-900 dark:text-stone-100 text-sm">
                              {conj.value}
                            </span>
                            <div className="text-[11px] font-mono text-stone-400">
                              {conj.romaji}
                            </div>
                          </div>
                          <button
                            onClick={() => playAudio(conj.value, 1.0)}
                            className="p-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 hover:text-stone-700 transition-colors"
                            title={`Listen to ${conj.form}`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Example Sentences */}
              {activeWordCard.examples && activeWordCard.examples.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-400">
                    Example Sentences
                  </div>
                  <div className="space-y-2">
                    {activeWordCard.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/60 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-japanese font-semibold text-sm text-stone-900 dark:text-stone-100">
                            {ex.ja}
                          </span>
                          <button
                            onClick={() => playAudio(ex.ja, 1.0)}
                            className="p-1 rounded hover:bg-rose-100 dark:hover:bg-rose-950 text-rose-500 transition-colors"
                            title="Listen to example"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {ex.romaji && (
                          <div className="font-mono text-[11px] text-stone-500">
                            {ex.romaji}
                          </div>
                        )}
                        <div className="text-stone-700 dark:text-stone-300 font-medium pt-0.5">
                          {ex.en}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lexical Source Note */}
              <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>Authority Source:</span>
                </span>
                <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${badge.color}`}>
                  {badge.label}
                </span>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
};
