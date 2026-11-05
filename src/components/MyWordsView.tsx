import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  Bookmark,
  Volume2,
  Trash2,
  CheckCircle,
  RotateCw,
  Search,
  Filter,
  Sparkles,
  Layers,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { SavedWord, Level } from '../types/index.ts';

export const MyWordsView: React.FC = () => {
  const {
    savedWords,
    removeWord,
    toggleWordMastered,
    playAudio,
    openWordCard,
    setCurrentView,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJlpt, setSelectedJlpt] = useState<string>('all');
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewCardIndex, setReviewCardIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  // Filter words
  const filteredWords = savedWords.filter(word => {
    const matchesSearch =
      word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.romaji.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesJlpt = selectedJlpt === 'all' || word.jlpt === selectedJlpt;

    return matchesSearch && matchesJlpt;
  });

  const activeReviewWord: SavedWord | undefined = filteredWords[reviewCardIndex];

  const handleNextReview = () => {
    setRevealed(false);
    setReviewCardIndex(prev => (prev + 1) % filteredWords.length);
  };

  const handlePrevReview = () => {
    setRevealed(false);
    setReviewCardIndex(prev => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-stone-800 p-5 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
              My Words Journal
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
              {savedWords.length} saved
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Review the vocabulary and phrases you collected from your conversations with Sensei.
          </p>
        </div>

        {savedWords.length > 0 && (
          <button
            onClick={() => {
              setIsReviewMode(prev => !prev);
              setRevealed(false);
              setReviewCardIndex(0);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer ${
              isReviewMode
                ? 'bg-rose-500 text-white'
                : 'bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 text-stone-800 dark:text-stone-200'
            }`}
          >
            <RotateCw className="w-4 h-4" />
            <span>{isReviewMode ? 'Exit Flashcard Mode' : 'Practice Flashcards'}</span>
          </button>
        )}
      </div>

      {/* Review Flashcard Mode */}
      {isReviewMode && activeReviewWord && (
        <div className="bg-gradient-to-b from-stone-50 to-white dark:from-stone-800 dark:to-stone-850 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-lg space-y-6 animate-in zoom-in-95">
          <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
            <span>Card {reviewCardIndex + 1} of {filteredWords.length}</span>
            <div className="flex items-center gap-2">
              {activeReviewWord.jlpt && (
                <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-xs">
                  {activeReviewWord.jlpt}
                </span>
              )}
              <span className="capitalize">{activeReviewWord.pos}</span>
            </div>
          </div>

          <div className="text-center py-6 space-y-3">
            <div className="font-japanese font-bold text-4xl sm:text-5xl text-stone-900 dark:text-stone-100">
              {activeReviewWord.word}
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => playAudio(activeReviewWord.reading || activeReviewWord.word, 1.0)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 font-semibold text-xs hover:scale-105 transition-transform"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen</span>
              </button>

              <button
                onClick={() => setRevealed(prev => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-xs hover:bg-stone-200 transition-colors"
              >
                {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{revealed ? 'Hide Answer' : 'Reveal Meaning'}</span>
              </button>
            </div>

            {revealed && (
              <div className="pt-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                <div className="text-sm font-semibold text-stone-500 font-japanese">
                  {activeReviewWord.reading} • [{activeReviewWord.romaji}]
                </div>
                <div className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  {activeReviewWord.definition}
                </div>
                {activeReviewWord.examples?.[0] && (
                  <div className="pt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-900/60 p-3 rounded-2xl max-w-md mx-auto">
                    <p className="font-japanese font-semibold">{activeReviewWord.examples[0].ja}</p>
                    <p className="italic text-stone-500">{activeReviewWord.examples[0].en}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-700">
            <button
              onClick={handlePrevReview}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 text-stone-700 dark:text-stone-300"
            >
              Previous
            </button>

            <button
              onClick={() => toggleWordMastered(activeReviewWord.word)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold ${
                activeReviewWord.mastered
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{activeReviewWord.mastered ? 'Mastered!' : 'Mark as Mastered'}</span>
            </button>

            <button
              onClick={handleNextReview}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white"
            >
              Next Card
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search saved words by English or Japanese..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 text-stone-900 dark:text-stone-100"
          />
        </div>

        {/* JLPT Filter */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
          {['all', 'N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setSelectedJlpt(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors uppercase ${
                selectedJlpt === lvl
                  ? 'bg-rose-500 text-white'
                  : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Word Grid / List */}
      {filteredWords.length === 0 ? (
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-10 border border-stone-200 dark:border-stone-700 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-500 mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">
            {savedWords.length === 0 ? 'No Saved Words Yet' : 'No Words Found'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
            {savedWords.length === 0
              ? 'When chatting with Sensei, tap the bookmark icon on any breakdown chip or word card to save it here!'
              : 'Try searching with a different keyword or removing the JLPT filter.'}
          </p>
          {savedWords.length === 0 && (
            <button
              onClick={() => setCurrentView('chat')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
            >
              <span>Back to Conversation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredWords.map((word, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-stone-800 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 hover:border-rose-300 dark:hover:border-rose-800 shadow-2xs hover:shadow-xs transition-all space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <button
                      onClick={() => openWordCard(word.word, 'ja')}
                      className="font-japanese font-bold text-xl text-stone-900 dark:text-stone-100 hover:text-rose-500 transition-colors text-left"
                    >
                      {word.word}
                    </button>
                    <div className="text-xs text-stone-400 font-mono">
                      {word.reading} [{word.romaji}]
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => playAudio(word.reading || word.word, 1.0)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                      title="Pronounce word"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => removeWord(word.word)}
                      className="p-1.5 rounded-lg text-stone-300 hover:text-rose-600 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                      title="Remove from saved words"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-stone-700 dark:text-stone-300 font-medium mt-1 line-clamp-2">
                  {word.definition}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-700 text-xs">
                <div className="flex items-center gap-1.5">
                  {word.jlpt && (
                    <span className="px-1.5 py-0.2 rounded font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px]">
                      {word.jlpt}
                    </span>
                  )}
                  <span className="text-[10px] text-stone-400 capitalize">
                    {word.pos}
                  </span>
                </div>

                <button
                  onClick={() => toggleWordMastered(word.word)}
                  className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-lg transition-colors ${
                    word.mastered
                      ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950'
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{word.mastered ? 'Mastered' : 'Practice'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
