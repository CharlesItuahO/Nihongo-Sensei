import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import type { Level, Goal, RichMessage, WordCard, RubySegment } from '../types/index.ts';
import { lookupEnglishWordInDictionaries, lookupJapaneseWordInJisho } from './dictionary.ts';
import { translateLinguistically } from './translator.ts';

// Server-side initialization with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Cache for generated audio WAV base64
const audioCache = new Map<string, string>();

/**
 * Translate learner's English input into Japanese, explain grammar, and formulate a conversational response
 */
export async function translateAndTeach(params: {
  englishInput: string;
  level: Level;
  goal: Goal;
  history?: Array<{ role: 'user' | 'sensei'; text: string }>;
}): Promise<Omit<RichMessage, 'id' | 'createdAt'>> {
  const { englishInput, level, goal, history = [] } = params;

  const apiKey = process.env.GEMINI_API_KEY;
  const hasKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 5);

  if (!hasKey) {
    return getSmartTeachingFallback(englishInput, level);
  }

  // If the learner asked about a specific English word, check dictionary first
  let dictContext = '';
  try {
    const singleWordMatch = englishInput.trim().match(/^(?:what does\s+['"]?([a-zA-Z-]+)['"]?\s+mean|how do I say\s+['"]?([a-zA-Z-]+)['"]?|([a-zA-Z-]+))$/i);
    const potentialWord = singleWordMatch ? (singleWordMatch[1] || singleWordMatch[2] || singleWordMatch[3]) : null;

    if (potentialWord && potentialWord.length > 2) {
      const dictData = await lookupEnglishWordInDictionaries(potentialWord);
      if (dictData?.definition) {
        dictContext = `\n[DICTIONARY ENTRY for "${potentialWord}"]: Definition: "${dictData.definition}". Part of speech: "${dictData.partOfSpeech}". Source: "${dictData.source}". Incorporate this authoritative meaning.`;
      }
    }
  } catch (e) {
    console.warn('Skipping dictionary pre-lookup:', e);
  }

  const prompt = `Learner Profile:
- Proficiency Level: ${level} (preN5: absolute beginner, N5: beginner, N4: elementary, N3: intermediate, N2: upper-intermediate, N1: advanced)
- Learning Goal: ${goal}
${dictContext}

Recent Conversation History:
${history.slice(-4).map(h => `${h.role === 'user' ? 'Learner (English)' : 'Sensei (Japanese)'}: ${h.text}`).join('\n')}

Learner's English Input:
"${englishInput}"

Perform these tasks:
1. Translate the English input into natural, authentic Japanese appropriate for ${level} level.
2. Provide the complete kana reading and romaji.
3. Provide rubySegments array separating kanji units with their furigana readings.
4. Break down each key word/particle with surface, reading, romaji, pos, meaning, and jlpt level.
5. Provide a warm, insightful grammarNote explaining key particles (like は, を, に, で), verb conjugations, and cultural usage.
6. Provide replyJapanese: a friendly 1-2 sentence conversational reply in Japanese that responds to the learner and asks a follow-up question or suggests the next phrase.
7. Provide replyKana, replyRomaji, replyEnglish, and replyRubySegments for the reply.
8. Provide suggestedReplies: 2-3 natural short English phrases the learner could reply with.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are Nihongo Sensei, a warm, patient, and encouraging AI Japanese teacher.
The learner speaks or types in English.
Your mission is to teach them Japanese through conversation.
Always return strict JSON conforming to the requested schema.
- For preN5/N5: Use polite desu/masu form, gentle explanations, basic high-frequency vocabulary.
- For N4/N3: Incorporate common compound verbs, polite and conversational nuances.
- For N2/N1: Use authentic idiomatic phrases, natural register, and nuanced explanations.
- Never invent readings. For kanji, furnish accurate hiragana furigana in rubySegments.
- Never reply that you don't know an English word. If rare or slang, explain both literal meaning and the closest natural Japanese expression.`,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            japanese: { type: Type.STRING, description: 'Japanese sentence in kanji form' },
            kana: { type: Type.STRING, description: 'Full kana reading' },
            romaji: { type: Type.STRING, description: 'Hepburn romaji transliteration' },
            english: { type: Type.STRING, description: 'Natural English translation' },
            rubySegments: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING, description: 'Kanji or kana token' },
                  reading: { type: Type.STRING, description: 'Furigana in hiragana if kanji' },
                  isKanji: { type: Type.BOOLEAN, description: 'True if token contains kanji requiring furigana' },
                },
                required: ['text'],
              },
            },
            breakdown: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  surface: { type: Type.STRING },
                  reading: { type: Type.STRING },
                  romaji: { type: Type.STRING },
                  pos: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                  jlpt: { type: Type.STRING },
                },
                required: ['surface', 'reading', 'romaji', 'pos', 'meaning'],
              },
            },
            grammarNote: { type: Type.STRING, description: 'Friendly explanation of particles and grammar' },
            replyJapanese: { type: Type.STRING, description: 'Sensei conversational response in Japanese' },
            replyKana: { type: Type.STRING },
            replyRomaji: { type: Type.STRING },
            replyEnglish: { type: Type.STRING },
            replyRubySegments: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  reading: { type: Type.STRING },
                  isKanji: { type: Type.BOOLEAN },
                },
                required: ['text'],
              },
            },
            suggestedReplies: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 to 3 natural English follow-up suggestions for the learner',
            },
          },
          required: [
            'japanese',
            'kana',
            'romaji',
            'english',
            'breakdown',
            'grammarNote',
            'replyJapanese',
            'replyKana',
            'replyRomaji',
            'replyEnglish',
          ],
        },
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);

    return {
      role: 'sensei',
      englishInput,
      japanese: parsed.japanese || 'こんにちは',
      kana: parsed.kana || 'こんにちは',
      romaji: parsed.romaji || 'Konnichiwa',
      english: parsed.english || englishInput,
      rubySegments: parsed.rubySegments || [{ text: parsed.japanese || 'こんにちは', isKanji: false }],
      breakdown: (parsed.breakdown || []).map((b: any) => ({
        ...b,
        jlpt: b.jlpt ? (b.jlpt.toUpperCase() as Level) : undefined,
      })),
      grammarNote: parsed.grammarNote || 'Great sentence! Keep practicing speaking aloud.',
      replyJapanese: parsed.replyJapanese || '次はどうしますか？',
      replyKana: parsed.replyKana || 'つぎはどうしますか？',
      replyRomaji: parsed.replyRomaji || 'Tsugi wa dō shimasu ka?',
      replyEnglish: parsed.replyEnglish || 'What would you like to say next?',
      replyRubySegments: parsed.replyRubySegments,
      suggestedReplies: parsed.suggestedReplies || [
        'How do I say thank you?',
        'Can we practice ordering food?',
        'Tell me more about this phrase',
      ],
    };
  } catch (err) {
    console.error('Error in translateAndTeach, using smart pedagogical fallback:', err);
    return getSmartTeachingFallback(englishInput, level);
  }
}

/**
 * High-fidelity pedagogical fallback matching the prompt's primary user flows (Flow A, B, C)
 */
function getSmartTeachingFallback(englishInput: string, level: Level): Omit<RichMessage, 'id' | 'createdAt'> {
  return translateLinguistically(englishInput, level);
}

/**
 * Synthesize Japanese speech using Gemini 3.8 Flash Lite TTS
 */
export async function synthesizeJapaneseSpeech(params: {
  text: string;
  speed?: number;
  voiceName?: string;
}): Promise<string | null> {
  const { text, speed = 1.0, voiceName = 'Kore' } = params;
  const cleanText = text.trim();
  if (!cleanText) return null;

  const cacheKey = `${cleanText}:${speed}:${voiceName}`;
  if (audioCache.has(cacheKey)) {
    return audioCache.get(cacheKey)!;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const hasKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 5);
  if (!hasKey) {
    return null;
  }

  try {
    const styleInstruction = speed < 0.8
      ? 'Speak clearly, slowly and gently in natural Japanese as a patient teacher.'
      : 'Speak naturally, warmly and expressively in native Japanese.';

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                style: styleInstruction,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: voiceName || 'Kore', // 'Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'
            },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      audioCache.set(cacheKey, base64Audio);
      return base64Audio;
    }
  } catch (err) {
    console.warn('Gemini TTS synthesis failed or unavailable:', err);
  }

  return null;
}

/**
 * Transcribe recorded audio with Gemini 3.5 Transcribe
 */
export async function transcribeAudio(params: {
  base64Audio: string;
  mimeType: string;
}): Promise<string> {
  const { base64Audio, mimeType } = params;

  try {
    const audioPart = {
      inlineData: {
        mimeType: mimeType || 'audio/webm',
        data: base64Audio,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          audioPart,
          {
            text: 'Transcribe this spoken audio accurately. The speaker is likely speaking in English (or occasionally Japanese). Output ONLY the transcribed words with punctuation, without any extra commentary or quotation marks.',
          },
        ],
      },
    });

    return (response.text || '').trim();
  } catch (err) {
    console.error('Audio transcription failed:', err);
    throw err;
  }
}

/**
 * Deep Word Card lookup for any English or Japanese token
 */
export async function lookupWordDeep(params: {
  word: string;
  lang?: 'en' | 'ja';
  context?: string;
  level?: Level;
}): Promise<WordCard> {
  const { word, lang = 'ja', context = '', level = 'N5' } = params;
  const cleanWord = word.trim();

  // 1. If English, look up dictionary first
  let dictSummary = '';
  let initialSource: 'oxford' | 'freedict' | 'jisho' | 'llm' = 'llm';
  let enDictData: any = null;
  let jaDictData: any = null;

  if (lang === 'en' || /^[a-zA-Z\s'-]+$/.test(cleanWord)) {
    const enDict = await lookupEnglishWordInDictionaries(cleanWord);
    enDictData = enDict;
    if (enDict.definition) {
      initialSource = enDict.source;
      dictSummary = `English definition: "${enDict.definition}" (Part of speech: ${enDict.partOfSpeech}, Source: ${enDict.source}).`;
    }
  } else {
    const jaDict = await lookupJapaneseWordInJisho(cleanWord);
    jaDictData = jaDict;
    if (jaDict) {
      initialSource = jaDict.source;
      dictSummary = `Japanese Jisho entry: Reading: "${jaDict.reading}", Definitions: ${jaDict.definitions.slice(0, 3).join(', ')}, JLPT: ${jaDict.jlpt || 'N/A'}.`;
    }
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const hasKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 5);

  if (!hasKey) {
    const def = enDictData?.definition || jaDictData?.definitions?.[0] || 'Definition retrieved from lexicon.';
    const pos = enDictData?.partOfSpeech || jaDictData?.pos || 'noun';
    const reading = jaDictData?.reading || cleanWord;
    const examples = (enDictData?.examples || []).slice(0, 2).map((ex: string) => ({
      ja: `「${cleanWord}」の例です。`,
      romaji: `"${cleanWord}" no rei desu.`,
      en: ex,
    }));
    const conjugations = generateFallbackConjugations(cleanWord, pos);

    return {
      word: cleanWord,
      reading,
      romaji: cleanWord,
      pos,
      definition: def,
      jlpt: (jaDictData?.jlpt as Level) || level || 'N5',
      source: initialSource,
      rubySegments: [{ text: cleanWord, reading, isKanji: /[\u4e00-\u9faf]/.test(cleanWord) }],
      conjugation: conjugations,
      examples: examples.length > 0 ? examples : [
        { ja: `${cleanWord}を使います。`, romaji: `${cleanWord} o tsukaimasu.`, en: `Using "${cleanWord}".` },
      ],
    };
  }

  // 2. Query Gemini 3.8 Flash for deep morphological breakdown, furigana, conjugation, and examples
  const prompt = `Perform a comprehensive linguistic lookup for the word: "${cleanWord}".
Context in sentence: "${context}"
Language target: ${lang === 'en' ? 'English word to Japanese learner equivalents' : 'Japanese word for English-speaking learner'}
Target JLPT Level: ${level}
${dictSummary}

Provide:
1. Canonical word representation and hiragana reading
2. Hepburn romaji
3. Exact part of speech (e.g. "Godan verb", "Ichidan verb", "i-adjective", "na-adjective", "Noun", "Particle")
4. Clear primary definition in English
5. JLPT level classification (preN5, N5, N4, N3, N2, or N1)
6. rubySegments for furigana over kanji
7. If the word is a verb or adjective: complete conjugation table with form name, conjugated value, romaji, and usage explanation (masu, te, ta, nai, potential, conditional, passive, causative, volitional)
8. 2 to 3 practical example sentences with kanji (ja), kana, romaji, and english translation
9. Nuance and cultural usage notes`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert Japanese lexicographer and teacher. Return strict JSON word card details. Never return "I don't know that word". If rare, slang, or an English loanword, provide accurate katakana loanword + native Japanese equivalents.`,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            reading: { type: Type.STRING },
            romaji: { type: Type.STRING },
            pos: { type: Type.STRING },
            definition: { type: Type.STRING },
            jlpt: { type: Type.STRING },
            nuance: { type: Type.STRING },
            englishEquivalents: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            rubySegments: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  reading: { type: Type.STRING },
                  isKanji: { type: Type.BOOLEAN },
                },
                required: ['text'],
              },
            },
            conjugation: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  form: { type: Type.STRING },
                  value: { type: Type.STRING },
                  romaji: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                },
                required: ['form', 'value', 'romaji', 'explanation'],
              },
            },
            examples: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  ja: { type: Type.STRING },
                  kana: { type: Type.STRING },
                  romaji: { type: Type.STRING },
                  en: { type: Type.STRING },
                },
                required: ['ja', 'romaji', 'en'],
              },
            },
            notes: { type: Type.STRING },
          },
          required: ['word', 'reading', 'romaji', 'pos', 'definition', 'examples'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return {
      word: parsed.word || cleanWord,
      reading: parsed.reading || cleanWord,
      romaji: parsed.romaji || cleanWord,
      pos: parsed.pos || (enDictData?.partOfSpeech || 'noun'),
      definition: parsed.definition || (enDictData?.definition || 'Word definition'),
      jlpt: parsed.jlpt ? (parsed.jlpt.toUpperCase() as Level) : undefined,
      source: initialSource,
      nuance: parsed.nuance,
      englishEquivalents: parsed.englishEquivalents,
      rubySegments: parsed.rubySegments || [{ text: parsed.word || cleanWord, isKanji: false }],
      conjugation: parsed.conjugation,
      examples: parsed.examples || [
        { ja: `${cleanWord}を使います。`, romaji: `${cleanWord} o tsukaimasu.`, en: `Using "${cleanWord}".` },
      ],
      notes: parsed.notes,
    };
  } catch (err) {
    console.error('Error in lookupWordDeep, using dictionary fallback:', err);
    const def = enDictData?.definition || jaDictData?.definitions?.[0] || 'Definition retrieved from lexicon.';
    const pos = enDictData?.partOfSpeech || jaDictData?.pos || 'word';
    const reading = jaDictData?.reading || cleanWord;
    const examples = (enDictData?.examples || []).slice(0, 2).map((ex: string) => ({
      ja: `「${cleanWord}」の例です。`,
      romaji: `"${cleanWord}" no rei desu.`,
      en: ex,
    }));

    const conjugations = generateFallbackConjugations(cleanWord, pos);

    return {
      word: cleanWord,
      reading,
      romaji: cleanWord,
      pos,
      definition: def,
      jlpt: (jaDictData?.jlpt as Level) || undefined,
      source: initialSource,
      rubySegments: [{ text: cleanWord, reading, isKanji: /[\u4e00-\u9faf]/.test(cleanWord) }],
      conjugation: conjugations,
      examples: examples.length > 0 ? examples : [
        { ja: `${cleanWord}です。`, romaji: `${cleanWord} desu.`, en: `It is ${cleanWord}.` },
      ],
    };
  }
}

function generateFallbackConjugations(word: string, pos: string) {
  if (word === '飲む' || word === 'のむ') {
    return [
      { form: 'Present / Plain', value: '飲む', romaji: 'nomu', explanation: 'Dictionary form (casual present/future)' },
      { form: 'Polite (masu)', value: '飲みます', romaji: 'nomimasu', explanation: 'Standard polite present/future' },
      { form: 'Te-form', value: '飲んで', romaji: 'nonde', explanation: 'Connecting actions / requesting with kudasai' },
      { form: 'Past (ta)', value: '飲んだ', romaji: 'nonda', explanation: 'Plain past action' },
      { form: 'Negative (nai)', value: '飲まない', romaji: 'nomanai', explanation: 'Plain negative ("not drink")' },
      { form: 'Potential', value: '飲める', romaji: 'nomeru', explanation: 'Ability ("can drink")' },
      { form: 'Conditional (ba)', value: '飲めば', romaji: 'nomeba', explanation: 'Hypothetical ("if you drink")' },
      { form: 'Volitional', value: '飲もう', romaji: 'nomou', explanation: 'Casual invitation ("let\'s drink")' },
    ];
  }
  if (word === '食べる' || word === 'たべる') {
    return [
      { form: 'Present / Plain', value: '食べる', romaji: 'taberu', explanation: 'Dictionary form' },
      { form: 'Polite (masu)', value: '食べます', romaji: 'tabemasu', explanation: 'Standard polite' },
      { form: 'Te-form', value: '食べて', romaji: 'tabete', explanation: 'Connecting / requesting' },
      { form: 'Past (ta)', value: '食べた', romaji: 'tabeta', explanation: 'Past action' },
      { form: 'Negative (nai)', value: '食べない', romaji: 'tabenai', explanation: 'Negative' },
      { form: 'Potential', value: '食べられる', romaji: 'taberareru', explanation: 'Ability ("can eat")' },
      { form: 'Conditional (ba)', value: '食べれば', romaji: 'tabereba', explanation: 'Hypothetical' },
      { form: 'Volitional', value: '食べよう', romaji: 'tabeyou', explanation: 'Let\'s eat' },
    ];
  }
  if (word === '行く' || word === 'いく') {
    return [
      { form: 'Present / Plain', value: '行く', romaji: 'iku', explanation: 'Dictionary form' },
      { form: 'Polite (masu)', value: '行きます', romaji: 'ikimasu', explanation: 'Polite present' },
      { form: 'Te-form', value: '行って', romaji: 'itte', explanation: 'Connecting / please go' },
      { form: 'Past (ta)', value: '行った', romaji: 'itta', explanation: 'Past went' },
      { form: 'Negative (nai)', value: '行かない', romaji: 'ikanai', explanation: 'Do not go' },
      { form: 'Potential', value: '行ける', romaji: 'ikeru', explanation: 'Can go' },
      { form: 'Conditional (ba)', value: '行けば', romaji: 'ikeba', explanation: 'If you go' },
      { form: 'Volitional', value: '行こう', romaji: 'ikou', explanation: 'Let\'s go' },
    ];
  }
  return undefined;
}
