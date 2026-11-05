import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  Search,
  BookOpen,
  Sparkles,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Check,
  ArrowRight,
  ShieldCheck,
  Layers,
  HelpCircle,
} from 'lucide-react';

const SUGGESTED_LOOKUPS = [
  { word: 'serendipity', type: 'English concept' },
  { word: 'omotenashi', type: 'Japanese cultural' },
  { word: 'wanderlust', type: 'English emotion' },
  { word: 'komorebi', type: 'Untranslatable JA' },
  { word: 'procrastination', type: 'English verb' },
  { word: 'mottainai', type: 'Japanese philosophy' },
];

export const DictionarySearchView: React.FC = () => {
  const { openWordCard, playAudio, dictionaryStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;

    // Open Word Card modal
    openWordCard(term, /^[a-zA-Z\s'-]+$/.test(term) ? 'en' : 'ja');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Universal English & Japanese Lexicon</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          "Knows Every Word"
        </h1>
        <p className="text-sm sm:text-base text-stone-500 max-w-lg mx-auto">
          Backed by the Oxford English Dictionary, FreeDict, and JMdict. Type any rare word, slang, or technical phrase — Sensei translates and explains it with authentic nuance.
        </p>
      </div>

      {/* Main Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="bg-white dark:bg-stone-800 rounded-3xl border-2 border-stone-200 dark:border-stone-700 p-2 shadow-lg flex items-center gap-2 focus-within:border-rose-400 dark:focus-within:border-rose-600 transition-all">
          <div className="p-3 text-stone-400">
            <Search className="w-6 h-6 text-rose-500" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Type any English or Japanese word (e.g. serendipity, coffee, 走る)..."
            className="flex-1 bg-transparent border-0 text-base sm:text-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 outline-none"
          />
          <button
            type="submit"
            disabled={!searchTerm.trim()}
            className="px-5 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 disabled:bg-stone-200 dark:disabled:bg-stone-700 text-white font-semibold text-sm transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
          >
            Explore
          </button>
        </div>
      </form>

      {/* Quick Discovery Chips */}
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 flex items-center justify-between">
          <span>Popular & Interesting Words to Explore</span>
          <span className="text-[11px] font-normal text-stone-400">Tap to look up</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {SUGGESTED_LOOKUPS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchTerm(item.word);
                openWordCard(item.word, /^[a-zA-Z\s'-]+$/.test(item.word) ? 'en' : 'ja');
              }}
              className="p-3 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-rose-400 dark:hover:border-rose-700 text-left transition-all group shadow-2xs"
            >
              <div className="font-semibold text-sm text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 flex items-center justify-between">
                <span>{item.word}</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                {item.type}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dictionary Authority & Sources Banner */}
      <div className="bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 rounded-3xl p-5 space-y-3 text-xs text-stone-600 dark:text-stone-300">
        <div className="flex items-center gap-2 font-bold text-stone-800 dark:text-stone-200 text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Integrated Lexical Sources</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
            <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center justify-between">
              <span>Oxford Dictionaries</span>
              <span className={`w-2 h-2 rounded-full ${dictionaryStatus.oxfordAvailable ? 'bg-emerald-500' : 'bg-amber-400'}`} />
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              {dictionaryStatus.oxfordAvailable
                ? 'Active via Oxford API credentials.'
                : 'Free Dictionary API & WordNet fallback active.'}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
            <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center justify-between">
              <span>Jisho & JMdict</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Authoritative Japanese kanji, readings, and JLPT classifications.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
            <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center justify-between">
              <span>Gemini Teacher</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Conjugation matrices, furigana ruby segmentation, and contextual nuance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
