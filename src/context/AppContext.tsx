import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  LearnerProfile,
  ConversationSession,
  RichMessage,
  WordCard,
  SavedWord,
  Level,
  Goal,
} from '../types/index.ts';
import { translateLinguistically } from '../services/translator.ts';

const DEFAULT_PROFILE: LearnerProfile = {
  level: 'N5',
  goal: 'travel',
  showRomaji: true,
  showFurigana: true,
  showKanaLine: true,
  autoPlayAudio: true,
  defaultSpeed: 1.0,
  voiceName: 'Kore',
  inputLanguage: 'en',
  theme: 'light',
};

interface AppContextType {
  profile: LearnerProfile;
  updateProfile: (updates: Partial<LearnerProfile>) => void;
  sessions: ConversationSession[];
  activeSessionId: string | null;
  activeSession: ConversationSession | null;
  createNewSession: () => void;
  selectSession: (id: string) => void;
  deleteSession: (id: string) => void;
  messages: RichMessage[];
  sendMessage: (englishText: string) => Promise<void>;
  isLoadingMessage: boolean;
  savedWords: SavedWord[];
  saveWord: (wordCard: WordCard) => void;
  removeWord: (wordStr: string) => void;
  isWordSaved: (wordStr: string) => boolean;
  toggleWordMastered: (wordStr: string) => void;
  activeWordCard: WordCard | null;
  isLoadingWordCard: boolean;
  openWordCard: (word: string, lang?: 'en' | 'ja', context?: string) => Promise<void>;
  closeWordCard: () => void;
  playAudio: (text: string, speedOverride?: number, messageId?: string) => Promise<void>;
  stopAudio: () => void;
  isPlayingAudio: boolean;
  playingMessageId: string | null;
  currentPlaybackSpeed: number;
  currentView: 'chat' | 'saved' | 'dictionary';
  setCurrentView: (view: 'chat' | 'saved' | 'dictionary') => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  completeOnboarding: (level: Level, goal: Goal) => void;
  dictionaryStatus: { oxfordAvailable: boolean; freeDictAvailable: boolean; jishoAvailable: boolean };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'nihongo_sensei_profile_v1',
  SESSIONS: 'nihongo_sensei_sessions_v1',
  ACTIVE_SESSION: 'nihongo_sensei_active_session_v1',
  SAVED_WORDS: 'nihongo_sensei_saved_words_v1',
  ONBOARDED: 'nihongo_sensei_onboarded_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Learner profile state
  const [profile, setProfile] = useState<LearnerProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    try {
      return !localStorage.getItem(STORAGE_KEYS.ONBOARDED);
    } catch {
      return false;
    }
  });

  // Current main view tab
  const [currentView, setCurrentView] = useState<'chat' | 'saved' | 'dictionary'>('chat');

  // Conversations state
  const [sessions, setSessions] = useState<ConversationSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (saved) return JSON.parse(saved);
    } catch {}

    // Initial friendly greeting conversation
    const initialSession: ConversationSession = {
      id: 'session-welcome',
      title: 'First Chat with Sensei',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [
        {
          id: 'msg-welcome',
          role: 'sensei',
          englishInput: 'Hello! Nice to meet you.',
          japanese: 'はじめまして！日本語の勉強を始めましょう。',
          kana: 'はじめまして！にほんごのべんきょうをはじめましょう。',
          romaji: 'Hajimemashite! Nihongo no benkyō o hajimemashō.',
          english: 'Nice to meet you! Let\'s start studying Japanese.',
          rubySegments: [
            { text: '初めまして', reading: 'はじめまして', isKanji: true },
            { text: '！', isKanji: false },
            { text: '日本語', reading: 'にほんご', isKanji: true },
            { text: 'の', isKanji: false },
            { text: '勉強', reading: 'べんきょう', isKanji: true },
            { text: 'を', isKanji: false },
            { text: '始めましょう', reading: 'はじめましょう', isKanji: true },
            { text: '。', isKanji: false },
          ],
          breakdown: [
            { surface: '初めまして', reading: 'はじめまして', romaji: 'hajimemashite', pos: 'phrase', meaning: 'nice to meet you', jlpt: 'N5' },
            { surface: '日本語', reading: 'にほんご', romaji: 'nihongo', pos: 'noun', meaning: 'Japanese language', jlpt: 'N5' },
            { surface: 'の', reading: 'の', romaji: 'no', pos: 'particle', meaning: 'possessive/linking particle (of)' },
            { surface: '勉強', reading: 'べんきょう', romaji: 'benkyou', pos: 'noun', meaning: 'study / learning', jlpt: 'N5' },
            { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'direct object marker' },
            { surface: '始めましょう', reading: 'はじめましょう', romaji: 'hajimemashou', pos: 'verb', meaning: "let's start", jlpt: 'N5' },
          ],
          grammarNote: 'はじめまして (Hajimemashite) is the classic greeting used when meeting someone for the first time. The particle を (o) indicates the object of the verb 始めましょう ("let\'s begin").',
          replyJapanese: '今日はどんなことを言ってみたいですか？カフェで注文してみますか？',
          replyKana: 'きょうはどんなことをいってみたいですか？かふぇでちゅうもんしてみますか？',
          replyRomaji: 'Kyō wa donna koto o itte mitai desu ka? Kafe de chūmon shite mimasu ka?',
          replyEnglish: 'What would you like to say today? Shall we try ordering at a café?',
          suggestedReplies: [
            'I\'d like to order a coffee with milk, please.',
            'Where is the nearest train station?',
            'What is the weather like today?',
          ],
          createdAt: Date.now(),
        },
      ],
    };
    return [initialSession];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
      if (saved) return saved;
    } catch {}
    return 'session-welcome';
  });

  // Saved words (personal vocabulary bank)
  const [savedWords, setSavedWords] = useState<SavedWord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_WORDS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Word card modal state
  const [activeWordCard, setActiveWordCard] = useState<WordCard | null>(null);
  const [isLoadingWordCard, setIsLoadingWordCard] = useState<boolean>(false);

  // Message sending state
  const [isLoadingMessage, setIsLoadingMessage] = useState<boolean>(false);

  // Audio playback state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [currentPlaybackSpeed, setCurrentPlaybackSpeed] = useState<number>(profile.defaultSpeed);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Dictionary provider statuses
  const [dictionaryStatus, setDictionaryStatus] = useState({
    oxfordAvailable: false,
    freeDictAvailable: true,
    jishoAvailable: true,
  });

  // Fetch dictionary status on mount
  useEffect(() => {
    fetch('/api/dictionary/status')
      .then(res => res.json())
      .then(data => {
        setDictionaryStatus({
          oxfordAvailable: Boolean(data.oxfordAvailable),
          freeDictAvailable: true,
          jishoAvailable: true,
        });
      })
      .catch(() => {});
  }, []);

  // Save profile to localStorage
  const updateProfile = (updates: Partial<LearnerProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Sync sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
      if (activeSessionId) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, activeSessionId);
      }
    } catch {}
  }, [sessions, activeSessionId]);

  // Sync saved words to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_WORDS, JSON.stringify(savedWords));
    } catch {}
  }, [savedWords]);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0] || null;
  const messages = activeSession ? activeSession.messages : [];

  // Create a new conversation session
  const createNewSession = () => {
    const newSession: ConversationSession = {
      id: `session-${Date.now()}`,
      title: 'New Conversation',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setCurrentView('chat');
  };

  const selectSession = (id: string) => {
    setActiveSessionId(id);
    setCurrentView('chat');
  };

  const deleteSession = (id: string) => {
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== id);
      if (filtered.length === 0) {
        const fresh: ConversationSession = {
          id: `session-${Date.now()}`,
          title: 'New Conversation',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          messages: [],
        };
        setActiveSessionId(fresh.id);
        return [fresh];
      }
      if (activeSessionId === id) {
        setActiveSessionId(filtered[0].id);
      }
      return filtered;
    });
  };

  // Audio playback handler
  const stopAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    window.speechSynthesis?.cancel();
    setIsPlayingAudio(false);
    setPlayingMessageId(null);
  };

  const playAudio = async (text: string, speedOverride?: number, messageId?: string) => {
    stopAudio();

    const speed = speedOverride !== undefined ? speedOverride : profile.defaultSpeed;
    setCurrentPlaybackSpeed(speed);
    if (messageId) setPlayingMessageId(messageId);
    setIsPlayingAudio(true);

    try {
      // 1. Request audio from server Gemini TTS
      const res = await fetch('/api/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          speed,
          voiceName: profile.voiceName || 'Kore',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audioBase64) {
          const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
          audio.playbackRate = speed;
          currentAudioRef.current = audio;

          audio.onended = () => {
            setIsPlayingAudio(false);
            setPlayingMessageId(null);
          };
          audio.onerror = () => {
            fallbackWebSpeech(text, speed);
          };

          try {
            await audio.play();
            return;
          } catch (playErr) {
            console.warn('Audio play() blocked by browser policy:', playErr);
            fallbackWebSpeech(text, speed);
            return;
          }
        }
      }

      // If server TTS was unavailable, fall back to browser Web Speech API
      fallbackWebSpeech(text, speed);
    } catch {
      fallbackWebSpeech(text, speed);
    }
  };

  const fallbackWebSpeech = (text: string, speed: number) => {
    if (!('speechSynthesis' in window)) {
      setIsPlayingAudio(false);
      setPlayingMessageId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = speed;

    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang.startsWith('ja') || v.lang.includes('JP'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setPlayingMessageId(null);
    };
    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setPlayingMessageId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Send message and get rich teaching response
  const sendMessage = async (englishText: string) => {
    const trimmed = englishText.trim();
    if (!trimmed || isLoadingMessage) return;

    setIsLoadingMessage(true);

    // Optimistically create user message
    const userMessage: RichMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      englishInput: trimmed,
      japanese: '',
      kana: '',
      romaji: '',
      english: trimmed,
      breakdown: [],
      createdAt: Date.now(),
    };

    // Update session title if first user message
    let updatedTitle = activeSession?.title;
    if (activeSession && (activeSession.title === 'New Conversation' || activeSession.messages.length === 0)) {
      updatedTitle = trimmed.length > 28 ? `${trimmed.slice(0, 25)}...` : trimmed;
    }

    setSessions(prev =>
      prev.map(s => {
        if (s.id === (activeSessionId || s.id)) {
          return {
            ...s,
            title: updatedTitle || s.title,
            updatedAt: Date.now(),
            messages: [...s.messages, userMessage],
          };
        }
        return s;
      })
    );

    let senseiData: any = null;

    try {
      // Build conversation history
      const history = (activeSession?.messages || []).slice(-4).map(m => ({
        role: m.role,
        text: m.role === 'user' ? (m.englishInput || '') : m.japanese,
      }));

      const res = await fetch('/api/translate-teach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          englishInput: trimmed,
          level: profile.level,
          goal: profile.goal,
          history,
        }),
      });

      if (res.ok) {
        senseiData = await res.json();
      }
    } catch (netErr) {
      console.warn('Network / API call failed, using linguistic engine fallback:', netErr);
    }

    // If server didn't return data, generate with linguistic translator
    if (!senseiData || !senseiData.japanese) {
      senseiData = translateLinguistically(trimmed, profile.level);
    }

    const senseiMessage: RichMessage = {
      id: `sensei-${Date.now()}`,
      role: 'sensei',
      ...senseiData,
      createdAt: Date.now(),
    };

    setSessions(prev =>
      prev.map(s => {
        if (s.id === (activeSessionId || s.id)) {
          return {
            ...s,
            updatedAt: Date.now(),
            messages: [...s.messages, senseiMessage],
          };
        }
        return s;
      })
    );

    // Auto-play audio safely without throwing
    if (profile.autoPlayAudio && senseiMessage.japanese) {
      try {
        playAudio(senseiMessage.japanese, profile.defaultSpeed, senseiMessage.id).catch(e => {
          console.warn('Autoplay failed or blocked by browser policy:', e);
        });
      } catch (audioErr) {
        console.warn('Audio play error:', audioErr);
      }
    }

    setIsLoadingMessage(false);
  };

  // Word card lookup
  const openWordCard = async (word: string, lang: 'en' | 'ja' = 'ja', context: string = '') => {
    setIsLoadingWordCard(true);
    try {
      const res = await fetch('/api/word/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word,
          lang,
          context,
          level: profile.level,
        }),
      });

      if (res.ok) {
        const card = await res.json();
        setActiveWordCard(card);
      }
    } catch (err) {
      console.error('Word lookup failed:', err);
    } finally {
      setIsLoadingWordCard(false);
    }
  };

  const closeWordCard = () => {
    setActiveWordCard(null);
  };

  // Vocabulary bank actions
  const saveWord = (wordCard: WordCard) => {
    setSavedWords(prev => {
      if (prev.some(w => w.word.toLowerCase() === wordCard.word.toLowerCase())) {
        return prev;
      }
      const newSaved: SavedWord = {
        ...wordCard,
        savedAt: Date.now(),
        reviewCount: 0,
        mastered: false,
      };
      return [newSaved, ...prev];
    });
  };

  const removeWord = (wordStr: string) => {
    setSavedWords(prev => prev.filter(w => w.word.toLowerCase() !== wordStr.toLowerCase()));
  };

  const isWordSaved = (wordStr: string) => {
    return savedWords.some(w => w.word.toLowerCase() === wordStr.toLowerCase());
  };

  const toggleWordMastered = (wordStr: string) => {
    setSavedWords(prev =>
      prev.map(w => {
        if (w.word.toLowerCase() === wordStr.toLowerCase()) {
          return { ...w, mastered: !w.mastered, reviewCount: w.reviewCount + 1 };
        }
        return w;
      })
    );
  };

  // Complete onboarding
  const completeOnboarding = (level: Level, goal: Goal) => {
    // Automatically configure reading aids matching the learner's level
    const isBeginner = level === 'preN5' || level === 'N5';
    const isIntermediate = level === 'N4' || level === 'N3';

    updateProfile({
      level,
      goal,
      showRomaji: isBeginner,
      showFurigana: isBeginner || isIntermediate,
      showKanaLine: isBeginner,
      defaultSpeed: isBeginner ? 0.8 : 1.0,
    });

    try {
      localStorage.setItem(STORAGE_KEYS.ONBOARDED, 'true');
    } catch {}
    setShowOnboarding(false);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        sessions,
        activeSessionId,
        activeSession,
        createNewSession,
        selectSession,
        deleteSession,
        messages,
        sendMessage,
        isLoadingMessage,
        savedWords,
        saveWord,
        removeWord,
        isWordSaved,
        toggleWordMastered,
        activeWordCard,
        isLoadingWordCard,
        openWordCard,
        closeWordCard,
        playAudio,
        stopAudio,
        isPlayingAudio,
        playingMessageId,
        currentPlaybackSpeed,
        currentView,
        setCurrentView,
        showOnboarding,
        setShowOnboarding,
        completeOnboarding,
        dictionaryStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
