import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Level, Goal } from '../types/index.ts';
import {
  Sparkles,
  CheckCircle2,
  Plane,
  Tv,
  Briefcase,
  GraduationCap,
  Smile,
  ArrowRight,
} from 'lucide-react';

const LEVEL_OPTIONS: Array<{
  id: Level;
  title: string;
  sub: string;
  description: string;
}> = [
  {
    id: 'preN5',
    title: 'Absolute Beginner',
    sub: 'Pre-N5',
    description: 'Zero Japanese knowledge. Show Romaji everywhere, slow audio, gentle explanations.',
  },
  {
    id: 'N5',
    title: 'Beginner',
    sub: 'JLPT N5',
    description: 'Know hiragana/katakana or basic greetings. Furigana + Romaji enabled.',
  },
  {
    id: 'N4',
    title: 'Elementary',
    sub: 'JLPT N4',
    description: 'Can understand everyday basic conversations. Furigana over kanji.',
  },
  {
    id: 'N3',
    title: 'Intermediate',
    sub: 'JLPT N3',
    description: 'Looking to expand vocabulary, nuance, and conversational grammar.',
  },
  {
    id: 'N2',
    title: 'Upper Intermediate',
    sub: 'JLPT N2',
    description: 'Comfortable with kanji and natural speech. Keen on nuance and idioms.',
  },
  {
    id: 'N1',
    title: 'Advanced',
    sub: 'JLPT N1',
    description: 'Native speed, keigo nuances, advanced literature, and specialized vocabulary.',
  },
];

const GOAL_OPTIONS: Array<{
  id: Goal;
  title: string;
  icon: React.ReactNode;
}> = [
  { id: 'travel', title: 'Travel & Dining in Japan', icon: <Plane className="w-4 h-4 text-rose-500" /> },
  { id: 'anime', title: 'Anime, Manga & Pop Culture', icon: <Tv className="w-4 h-4 text-purple-500" /> },
  { id: 'fun', title: 'Casual Fun & Hobby', icon: <Smile className="w-4 h-4 text-amber-500" /> },
  { id: 'work', title: 'Work, Business & Living', icon: <Briefcase className="w-4 h-4 text-blue-500" /> },
  { id: 'exam', title: 'JLPT Exam Preparation', icon: <GraduationCap className="w-4 h-4 text-emerald-500" /> },
];

export const OnboardingModal: React.FC = () => {
  const { showOnboarding, completeOnboarding } = useApp();
  const [selectedLevel, setSelectedLevel] = useState<Level>('N5');
  const [selectedGoal, setSelectedGoal] = useState<Goal>('travel');
  const [step, setStep] = useState<1 | 2>(1);

  if (!showOnboarding) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-tr from-rose-500 via-rose-500 to-amber-500 text-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-white/20">
              30-Second Setup • Step {step} of 2
            </span>
            <span className="text-xl font-japanese font-bold">先生</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            {step === 1 ? 'How much Japanese do you know?' : 'Why are you learning Japanese?'}
          </h2>
          <p className="text-xs sm:text-sm text-rose-100">
            {step === 1
              ? 'Sensei will automatically adjust furigana, romaji, speech speed, and vocabulary.'
              : 'Sensei will personalize conversational scenarios to what you love.'}
          </p>
        </div>

        {/* Step 1: Level Picker */}
        {step === 1 && (
          <div className="p-6 space-y-2.5 max-h-[60vh] overflow-y-auto">
            {LEVEL_OPTIONS.map(opt => {
              const isSelected = selectedLevel === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedLevel(opt.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 ring-1 ring-rose-500'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-850'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                        {opt.title}
                      </span>
                      <span className="text-xs px-2 py-0.2 rounded-md font-semibold bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300">
                        {opt.sub}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {opt.description}
                    </p>
                  </div>
                  <div className="mt-1">
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-rose-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-stone-300 dark:border-stone-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Step 2: Goal Picker */}
        {step === 2 && (
          <div className="p-6 space-y-2.5">
            {GOAL_OPTIONS.map(opt => {
              const isSelected = selectedGoal === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedGoal(opt.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 ring-1 ring-rose-500'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800">
                      {opt.icon}
                    </div>
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {opt.title}
                    </span>
                  </div>
                  <div>
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-rose-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-stone-300 dark:border-stone-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/60">
          {step === 2 ? (
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={() => {
              if (step === 1) {
                setStep(2);
              } else {
                completeOnboarding(selectedLevel, selectedGoal);
              }
            }}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-rose-200 dark:shadow-none transition-all active:scale-95 cursor-pointer"
          >
            <span>{step === 1 ? 'Next: Choose Goal' : 'Start Talking with Sensei'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
