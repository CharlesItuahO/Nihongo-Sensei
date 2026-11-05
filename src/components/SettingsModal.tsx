import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  X,
  Sliders,
  Volume2,
  Eye,
  Languages,
  Trash2,
  Moon,
  Sun,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { Level, Goal } from '../types/index.ts';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    profile,
    updateProfile,
    sessions,
    selectSession,
    deleteSession,
    createNewSession,
    setShowOnboarding,
  } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-xl max-h-[85vh] bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden animate-in zoom-in-95 z-10">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50/60 dark:bg-stone-800/60">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-rose-500" />
            <h2 className="font-bold text-lg text-stone-900 dark:text-stone-100">
              Settings & Learning Preferences
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-6 text-sm">
          
          {/* Level & Goal Section */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-stone-400">
              Proficiency & Goal
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  JLPT Level Target
                </label>
                <select
                  value={profile.level}
                  onChange={e => updateProfile({ level: e.target.value as Level })}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium outline-none focus:ring-2 focus:ring-rose-400"
                >
                  <option value="preN5">Pre-N5 (Zero Japanese / Romaji)</option>
                  <option value="N5">JLPT N5 (Beginner)</option>
                  <option value="N4">JLPT N4 (Elementary)</option>
                  <option value="N3">JLPT N3 (Intermediate)</option>
                  <option value="N2">JLPT N2 (Upper Intermediate)</option>
                  <option value="N1">JLPT N1 (Advanced Native)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  Learning Motivation
                </label>
                <select
                  value={profile.goal}
                  onChange={e => updateProfile({ goal: e.target.value as Goal })}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium outline-none focus:ring-2 focus:ring-rose-400"
                >
                  <option value="travel">Travel & Dining in Japan</option>
                  <option value="anime">Anime, Manga & Pop Culture</option>
                  <option value="fun">Casual Fun & Everyday Conversation</option>
                  <option value="work">Business, Work & Living</option>
                  <option value="exam">JLPT Exams</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                setShowOnboarding(true);
              }}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-medium inline-block"
            >
              Re-run 30-second onboarding quiz →
            </button>
          </div>

          {/* Reading Aids */}
          <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
            <h3 className="text-xs uppercase tracking-wider font-bold text-stone-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Reading Aids
            </h3>

            <div className="space-y-2 bg-stone-50 dark:bg-stone-850 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    Furigana (Ruby Kana above Kanji)
                  </span>
                  <p className="text-[11px] text-stone-500">
                    Displays small hiragana reading above every kanji character
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={profile.showFurigana}
                  onChange={e => updateProfile({ showFurigana: e.target.checked })}
                  className="w-4 h-4 accent-rose-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-stone-200/60 dark:border-stone-700/60">
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    Romaji Transliteration
                  </span>
                  <p className="text-[11px] text-stone-500">
                    Displays Latin alphabet pronunciation for beginners
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={profile.showRomaji}
                  onChange={e => updateProfile({ showRomaji: e.target.checked })}
                  className="w-4 h-4 accent-rose-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-stone-200/60 dark:border-stone-700/60">
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    Parallel Full Kana Reading
                  </span>
                  <p className="text-[11px] text-stone-500">
                    Shows complete hiragana/katakana sentence
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={profile.showKanaLine}
                  onChange={e => updateProfile({ showKanaLine: e.target.checked })}
                  className="w-4 h-4 accent-rose-500 rounded"
                />
              </label>
            </div>
          </div>

          {/* Audio Defaults */}
          <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
            <h3 className="text-xs uppercase tracking-wider font-bold text-stone-400 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5" /> Speech & Audio
            </h3>

            <div className="space-y-3 bg-stone-50 dark:bg-stone-850 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    Auto-play Voice Responses
                  </span>
                  <p className="text-[11px] text-stone-500">
                    Sensei automatically pronounces Japanese sentences aloud
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={profile.autoPlayAudio}
                  onChange={e => updateProfile({ autoPlayAudio: e.target.checked })}
                  className="w-4 h-4 accent-rose-500 rounded"
                />
              </label>

              <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    Default Audio Speed
                  </span>
                  <p className="text-[11px] text-stone-500">
                    Beginners often prefer 0.8x or 0.6x
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[0.6, 0.8, 1.0, 1.2].map(s => (
                    <button
                      key={s}
                      onClick={() => updateProfile({ defaultSpeed: s as any })}
                      className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        profile.defaultSpeed === s
                          ? 'bg-rose-500 text-white'
                          : 'bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    TTS Voice Profile
                  </span>
                  <p className="text-[11px] text-stone-500">
                    Natural neural Japanese voice
                  </p>
                </div>
                <select
                  value={profile.voiceName}
                  onChange={e => updateProfile({ voiceName: e.target.value })}
                  className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-medium"
                >
                  <option value="Kore">Kore (Warm Female Sensei)</option>
                  <option value="Puck">Puck (Friendly Male Sensei)</option>
                  <option value="Zephyr">Zephyr (Calm & Gentle)</option>
                  <option value="Charon">Charon (Deep & Steady)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Conversation History Manager */}
          <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-wider font-bold text-stone-400">
                Conversation Threads ({sessions.length})
              </h3>
              <button
                onClick={() => {
                  createNewSession();
                  onClose();
                }}
                className="text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline"
              >
                + New Chat
              </button>
            </div>

            <div className="max-h-40 overflow-y-auto space-y-1.5 divide-y divide-stone-100 dark:divide-stone-800">
              {sessions.map(s => (
                <div
                  key={s.id}
                  className="pt-1.5 flex items-center justify-between gap-2 hover:bg-stone-50 dark:hover:bg-stone-800/50 p-2 rounded-xl transition-colors"
                >
                  <button
                    onClick={() => {
                      selectSession(s.id);
                      onClose();
                    }}
                    className="flex-1 text-left"
                  >
                    <div className="font-medium text-stone-900 dark:text-stone-100 text-xs truncate max-w-xs">
                      {s.title}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      {s.messages.length} messages • {new Date(s.updatedAt).toLocaleDateString()}
                    </div>
                  </button>

                  <button
                    onClick={() => deleteSession(s.id)}
                    className="p-1 text-stone-300 hover:text-rose-500 transition-colors"
                    title="Delete conversation"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
