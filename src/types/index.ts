export type Level = 'preN5' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type Goal = 'travel' | 'anime' | 'work' | 'exam' | 'fun';

export interface RubySegment {
  text: string;
  reading?: string; // furigana kana if kanji
  isKanji?: boolean;
}

export interface WordToken {
  surface: string;             // as it appears in the sentence
  reading: string;             // full kana reading
  romaji: string;              // Latin transliteration
  pos: string;                 // part of speech (noun, verb, particle, etc.)
  meaning: string;             // English definition
  jlpt?: Level;                // e.g. 'N5'
  rubySegments?: RubySegment[];
}

export interface ConjugationForm {
  form: string;                // e.g. "Polite (masu)", "Te-form", "Negative (nai)"
  value: string;               // e.g. "飲みます"
  romaji: string;              // e.g. "nomimasu"
  explanation: string;         // e.g. "Used for polite present/future actions"
}

export interface ExampleSentence {
  ja: string;
  kana?: string;
  romaji: string;
  en: string;
}

export interface WordCard {
  word: string;
  reading: string;
  romaji: string;
  pos: string;
  definition: string;
  jlpt?: Level;
  source: 'oxford' | 'freedict' | 'jisho' | 'llm';
  rubySegments?: RubySegment[];
  conjugation?: ConjugationForm[];
  examples: ExampleSentence[];
  notes?: string;
  nuance?: string;
  englishEquivalents?: string[];
}

export interface RichMessage {
  id: string;
  role: 'user' | 'sensei';
  englishInput?: string;        // what the user said/typed (English)
  japanese: string;            // kanji sentence
  kana: string;                // full kana reading
  romaji: string;              // romaji
  english: string;             // English translation gloss
  rubySegments?: RubySegment[];
  breakdown: WordToken[];
  grammarNote?: string;
  audioBase64?: string;
  audioUrl?: string;           // playable audio
  replyJapanese?: string;      // conversational follow-up in Japanese
  replyKana?: string;
  replyRomaji?: string;
  replyEnglish?: string;
  replyRubySegments?: RubySegment[];
  replyBreakdown?: WordToken[];
  suggestedReplies?: string[]; // 2-3 quick phrases the user can say back
  createdAt: number;
}

export interface LearnerProfile {
  level: Level;
  goal: Goal;
  showRomaji: boolean;
  showFurigana: boolean;
  showKanaLine: boolean;
  autoPlayAudio: boolean;
  defaultSpeed: 0.6 | 0.8 | 1.0 | 1.2;
  voiceName: string;
  inputLanguage: 'en' | 'ja';
  theme: 'light' | 'dark';
}

export interface SavedWord extends WordCard {
  savedAt: number;
  reviewCount: number;
  mastered: boolean;
}

export interface ConversationSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: RichMessage[];
}
