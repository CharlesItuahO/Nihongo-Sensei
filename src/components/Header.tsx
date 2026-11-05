import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  MessageSquare,
  BookOpen,
  Search,
  Settings,
  PlusCircle,
  Eye,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { Level } from '../types/index.ts';

const LEVEL_LABELS: Record<Level, string> = {
  preN5: 'Pre-N5 (Zero)',
  N5: 'JLPT N5 (Beginner)',
  N4: 'JLPT N4 (Elementary)',
  N3: 'JLPT N3 (Intermediate)',
  N2: 'JLPT N2 (Upper)',
  N1: 'JLPT N1 (Advanced)',
};

export const Header: React.FC<{ onOpenSettings: () => void }> = ({ onOpenSettings }) => {
  const {
    profile,
    updateProfile,
    createNewSession,
    savedWords,
    currentView,
    setCurrentView,
  } = useApp();

  const [showAidsMenu, setShowAidsMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F4]/90 dark:bg-[#171513]/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('chat')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-rose-400 flex items-center justify-center text-white shadow-sm shadow-rose-200 dark:shadow-none group-hover:scale-105 transition-transform">
              <span className="font-japanese font-bold text-lg">日</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-stone-900 dark:text-stone-100 tracking-tight text-base sm:text-lg">
                  Nihongo Sensei
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-medium border border-rose-200/60 dark:border-rose-900/40">
                  日本語
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 hidden sm:block leading-none">
                Voice-First Japanese Tutor
              </p>
            </div>
          </button>
        </div>

        {/* Center Nav Tabs */}
        <nav className="flex items-center gap-1 bg-stone-100/80 dark:bg-stone-800/80 p-1 rounded-xl text-xs sm:text-sm font-medium">
          <button
            onClick={() => setCurrentView('chat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'chat'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-rose-500" />
            <span>Talk</span>
          </button>

          <button
            onClick={() => setCurrentView('saved')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all relative ${
              currentView === 'saved'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>My Words</span>
            {savedWords.length > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                {savedWords.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentView('dictionary')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'dictionary'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Search className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Dictionary</span>
            <span className="sm:hidden">Dict</span>
          </button>
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {/* Reading Aids Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowAidsMenu(prev => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                showAidsMenu
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 text-rose-700 dark:text-rose-300'
                  : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700'
              }`}
              title="Toggle reading aids (Romaji, Furigana, Audio)"
              aria-label="Reading aids menu"
            >
              <Layers className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden md:inline">Aids</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {showAidsMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowAidsMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 p-3 z-50 text-xs animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 dark:border-stone-700">
                    <span className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-rose-500" /> Reading Aids
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {LEVEL_LABELS[profile.level].split(' ')[0]}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Furigana Toggle */}
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div>
                        <div className="font-medium text-stone-800 dark:text-stone-200">Furigana (Ruby)</div>
                        <div className="text-[11px] text-stone-500">Kana pronunciation above kanji</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.showFurigana}
                        onChange={e => updateProfile({ showFurigana: e.target.checked })}
                        className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                      />
                    </label>

                    {/* Romaji Toggle */}
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div>
                        <div className="font-medium text-stone-800 dark:text-stone-200">Romaji line</div>
                        <div className="text-[11px] text-stone-500">Latin script for beginners</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.showRomaji}
                        onChange={e => updateProfile({ showRomaji: e.target.checked })}
                        className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                      />
                    </label>

                    {/* Full Kana Line */}
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div>
                        <div className="font-medium text-stone-800 dark:text-stone-200">Full Kana line</div>
                        <div className="text-[11px] text-stone-500">All hiragana/katakana sentence</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.showKanaLine}
                        onChange={e => updateProfile({ showKanaLine: e.target.checked })}
                        className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                      />
                    </label>

                    {/* Auto-play Audio */}
                    <div className="pt-2 border-t border-stone-100 dark:border-stone-700">
                      <label className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-1.5">
                          {profile.autoPlayAudio ? (
                            <Volume2 className="w-3.5 h-3.5 text-rose-500" />
                          ) : (
                            <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                          )}
                          <div>
                            <div className="font-medium text-stone-800 dark:text-stone-200">Auto-play Voice</div>
                            <div className="text-[11px] text-stone-500">Speak Japanese responses aloud</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={profile.autoPlayAudio}
                          onChange={e => updateProfile({ autoPlayAudio: e.target.checked })}
                          className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                        />
                      </label>
                    </div>

                    {/* Speed selector */}
                    <div className="pt-2 border-t border-stone-100 dark:border-stone-700 flex items-center justify-between">
                      <span className="font-medium text-stone-700 dark:text-stone-300">Default Speed</span>
                      <div className="flex items-center gap-1">
                        {[0.6, 0.8, 1.0, 1.2].map(speed => (
                          <button
                            key={speed}
                            onClick={() => updateProfile({ defaultSpeed: speed as any })}
                            className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                              profile.defaultSpeed === speed
                                ? 'bg-rose-500 text-white'
                                : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* New Chat Button */}
          <button
            onClick={createNewSession}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            title="Start a new conversation"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Chat</span>
          </button>

          {/* Settings Modal Toggle */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Settings & Profile"
            aria-label="Open settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
