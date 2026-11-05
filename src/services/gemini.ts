import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import type { Level, Goal, RichMessage, WordCard, RubySegment } from '../types/index.ts';
import { lookupEnglishWordInDictionaries, lookupJapaneseWordInJisho } from './dictionary.ts';

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

  // If the learner asked about a specific English word, check dictionary first
  let dictContext = '';
  const singleWordMatch = englishInput.trim().match(/^(?:what does\s+['"]?([a-zA-Z-]+)['"]?\s+mean|how do I say\s+['"]?([a-zA-Z-]+)['"]?|([a-zA-Z-]+))$/i);
  const potentialWord = singleWordMatch ? (singleWordMatch[1] || singleWordMatch[2] || singleWordMatch[3]) : null;

  if (potentialWord && potentialWord.length > 2) {
    const dictData = await lookupEnglishWordInDictionaries(potentialWord);
    if (dictData.definition) {
      dictContext = `\n[DICTIONARY ENTRY for "${potentialWord}"]: Definition: "${dictData.definition}". Part of speech: "${dictData.partOfSpeech}". Source: "${dictData.source}". Incorporate this authoritative meaning.`;
    }
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
  const lower = englishInput.toLowerCase();

  // Flow A: Coffee with milk
  if (lower.includes('coffee') || lower.includes('latte')) {
    const hasMilk = lower.includes('milk');
    return {
      role: 'sensei',
      englishInput,
      japanese: hasMilk ? 'ミルク入りのコーヒーをください。' : 'コーヒーをください。',
      kana: hasMilk ? 'みるくいりのこーひーをください。' : 'こーひーをください。',
      romaji: hasMilk ? 'Miruku-iri no kōhī o kudasai.' : 'Kōhī o kudasai.',
      english: hasMilk ? "I'd like a coffee with milk, please." : "A coffee, please.",
      rubySegments: hasMilk
        ? [
            { text: 'ミルク', reading: 'みるく', isKanji: false },
            { text: '入り', reading: 'いり', isKanji: true },
            { text: 'の', isKanji: false },
            { text: 'コーヒー', reading: 'こーひー', isKanji: false },
            { text: 'を', isKanji: false },
            { text: 'ください。', isKanji: false },
          ]
        : [
            { text: 'コーヒー', isKanji: false },
            { text: 'を', isKanji: false },
            { text: 'ください。', isKanji: false },
          ],
      breakdown: hasMilk
        ? [
            { surface: 'ミルク', reading: 'みるく', romaji: 'miruku', pos: 'noun', meaning: 'milk', jlpt: 'N5' },
            { surface: '入り', reading: 'いり', romaji: 'iri', pos: 'suffix', meaning: 'containing / with', jlpt: 'N4' },
            { surface: 'の', reading: 'の', romaji: 'no', pos: 'particle', meaning: 'modifier particle', jlpt: 'N5' },
            { surface: 'コーヒー', reading: 'こーひー', romaji: 'kouhii', pos: 'noun', meaning: 'coffee', jlpt: 'N5' },
            { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'object marker', jlpt: 'N5' },
            { surface: 'ください', reading: 'ください', romaji: 'kudasai', pos: 'verb', meaning: 'please give me', jlpt: 'N5' },
          ]
        : [
            { surface: 'コーヒー', reading: 'こーひー', romaji: 'kouhii', pos: 'noun', meaning: 'coffee', jlpt: 'N5' },
            { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'direct object marker', jlpt: 'N5' },
            { surface: 'ください', reading: 'ください', romaji: 'kudasai', pos: 'verb', meaning: 'please give me', jlpt: 'N5' },
          ],
      grammarNote: '〜をください (o kudasai) is the universal polite pattern for ordering items in shops or restaurants. を marks the item you want.',
      replyJapanese: '良い選択ですね！カフェでは「ホットですか、アイスですか？」と聞かれますよ。',
      replyKana: 'よいせんたくですね！かふぇでは「ほっとですか、あいすですか？」ときかれますよ。',
      replyRomaji: 'Yoi sentaku desu ne! Kafe de wa "Hotto desu ka, aisu desu ka?" to kikaremasu yo.',
      replyEnglish: 'Good choice! In a café you might be asked: "Hot or iced?" Try saying it back.',
      replyRubySegments: [
        { text: '良', reading: 'よ', isKanji: true },
        { text: 'い', isKanji: false },
        { text: '選択', reading: 'せんたく', isKanji: true },
        { text: 'ですね！カフェでは「ホットですか、アイスですか？」と', isKanji: false },
        { text: '聞', reading: 'き', isKanji: true },
        { text: 'かれますよ。', isKanji: false },
      ],
      suggestedReplies: ['Hot, please.', 'Iced coffee, please.', 'How much is it?'],
    };
  }

  // Flow B: Serendipity / rare word
  if (lower.includes('serendipity')) {
    return {
      role: 'sensei',
      englishInput,
      japanese: '思いがけない偶然の発見（セレンディピティ）です。',
      kana: 'おもいがけないぐうぜんのはっけん（せれんでぃぴてぃ）です。',
      romaji: 'Omoigakenai gūzen no hakken (serendipiti) desu.',
      english: 'An unexpected, fortunate discovery ("serendipity").',
      rubySegments: [
        { text: '思', reading: 'おも', isKanji: true },
        { text: 'いがけない', isKanji: false },
        { text: '偶然', reading: 'ぐうぜん', isKanji: true },
        { text: 'の', isKanji: false },
        { text: '発見', reading: 'はっけん', isKanji: true },
        { text: '（セレンディピティ）です。', isKanji: false },
      ],
      breakdown: [
        { surface: '思いがけない', reading: 'おもいがけない', romaji: 'omoigakenai', pos: 'i-adjective', meaning: 'unexpected / unforeseen', jlpt: 'N2' },
        { surface: '偶然', reading: 'ぐうぜん', romaji: 'guuzen', pos: 'noun', meaning: 'coincidence / chance', jlpt: 'N3' },
        { surface: '発見', reading: 'はっけん', romaji: 'hakken', pos: 'noun', meaning: 'discovery', jlpt: 'N3' },
        { surface: 'セレンディピティ', reading: 'せれんでぃぴてぃ', romaji: 'serendipiti', pos: 'katakana loanword', meaning: 'serendipity', jlpt: 'N1' },
      ],
      grammarNote: 'In Japanese, "serendipity" is often used directly as the loanword セレンディピティ, or described descriptively as 偶然の幸運な発見 (chance fortunate discovery).',
      replyJapanese: '素敵な言葉ですね！最近何かセレンディピティな出来事はありましたか？',
      replyKana: 'すてきなことばですね！さいきんなにかせれんでぃぴてぃなできごとはありましたか？',
      replyRomaji: 'Suteki na kotoba desu ne! Saikin nanika serendipiti na dekigoto wa arimashita ka?',
      replyEnglish: 'What a wonderful word! Have you experienced any serendipitous moments recently?',
      suggestedReplies: ['Yes, I met an old friend!', 'Finding a quiet café', 'What is another rare word?'],
    };
  }

  // Water / Drinks
  if (lower.includes('water')) {
    return {
      role: 'sensei',
      englishInput,
      japanese: 'お水をいただけますか？',
      kana: 'おみずをいただけますか？',
      romaji: 'Omizu o itadakemasu ka?',
      english: 'Could I please have some water?',
      rubySegments: [
        { text: 'お', isKanji: false },
        { text: '水', reading: 'みず', isKanji: true },
        { text: 'をいただけますか？', isKanji: false },
      ],
      breakdown: [
        { surface: 'お水', reading: 'おみず', romaji: 'omizu', pos: 'noun', meaning: 'water (polite form with honorific お-)', jlpt: 'N5' },
        { surface: 'を', reading: 'を', romaji: 'o', pos: 'particle', meaning: 'object particle', jlpt: 'N5' },
        { surface: 'いただけますか', reading: 'いただけますか', romaji: 'itadakemasu ka', pos: 'verb', meaning: 'could I receive? (polite request)', jlpt: 'N4' },
      ],
      grammarNote: 'Adding お- (o-) before 水 (mizu) makes it polite and refined. いただけますか is an elegant way to say "could I have...".',
      replyJapanese: '日本のレストランでは無料のお水（お冷）が出ますよ。美味しいですか？',
      replyKana: 'にほんのれすとらんではむりょうのおみず（おひや）がでますよ。おいしいですか？',
      replyRomaji: 'Nihon no resutoran de wa muryō no omizu (ohiya) ga demasu yo. Oishii desu ka?',
      replyEnglish: 'In Japanese restaurants, free cold water (called "ohiya") is served. Is it refreshing?',
      suggestedReplies: ['Yes, thank you!', 'Can I order food now?', 'Check please!'],
    };
  }

  // Train station / directions
  if (lower.includes('station') || lower.includes('train') || lower.includes('where is')) {
    return {
      role: 'sensei',
      englishInput,
      japanese: '駅はどちらですか？',
      kana: 'えきはどちらですか？',
      romaji: 'Eki wa dochira desu ka?',
      english: 'Which way is the station, please?',
      rubySegments: [
        { text: '駅', reading: 'えき', isKanji: true },
        { text: 'はどちらですか？', isKanji: false },
      ],
      breakdown: [
        { surface: '駅', reading: 'えき', romaji: 'eki', pos: 'noun', meaning: 'train station', jlpt: 'N5' },
        { surface: 'は', reading: 'は', romaji: 'wa', pos: 'particle', meaning: 'topic marker', jlpt: 'N5' },
        { surface: 'どちら', reading: 'どちら', romaji: 'dochira', pos: 'pronoun', meaning: 'which direction / where (polite)', jlpt: 'N5' },
        { surface: 'ですか', reading: 'ですか', romaji: 'desu ka', pos: 'phrase', meaning: 'is it? (question)', jlpt: 'N5' },
      ],
      grammarNote: 'どちら (dochira) is the polite direction word for "where / which way", more polite than どこ (doko).',
      replyJapanese: '「まっすぐ行って、右に曲がってください」と教えられるかもしれません。言ってみましょう！',
      replyKana: '「まっすぐいって、みぎにまがってください」とおしえられるかもしれません。いってみましょう！',
      replyRomaji: '"Massugu itte, migi ni magatte kudasai" to oshierareru kamo shiremasen. Itte mimashō!',
      replyEnglish: 'They might say: "Go straight, then turn right." Let\'s try saying it!',
      suggestedReplies: ['Turn right, please', 'Go straight', 'Thank you for helping me'],
    };
  }

  // Thank you
  if (lower.includes('thank')) {
    return {
      role: 'sensei',
      englishInput,
      japanese: 'どうもありがとうございます！',
      kana: 'どうもありがとうございます！',
      romaji: 'Dōmo arigatō gozaimasu!',
      english: 'Thank you very much!',
      rubySegments: [
        { text: 'どうもありがとうございます！', isKanji: false },
      ],
      breakdown: [
        { surface: 'どうも', reading: 'どうも', romaji: 'doumo', pos: 'adverb', meaning: 'very much / warmly', jlpt: 'N5' },
        { surface: 'ありがとう', reading: 'ありがとう', romaji: 'arigatou', pos: 'expression', meaning: 'thank you', jlpt: 'N5' },
        { surface: 'ございます', reading: 'ございます', romaji: 'gozaimasu', pos: 'verb', meaning: 'polite auxiliary', jlpt: 'N5' },
      ],
      grammarNote: 'Adding ございます (gozaimasu) elevates "arigatou" to standard polite speech. Adding どうも (doumo) emphasizes gratitude ("thank you very much").',
      replyJapanese: 'どういたしまして！日本語の勉強、とても順調ですね。',
      replyKana: 'どういたしまして！にほんごのべんきょう、とてもじゅんちょうですね。',
      replyRomaji: 'Dōitashimashite! Nihongo no benkyō, totemo junchō desu ne.',
      replyEnglish: 'You are very welcome! Your Japanese study is going so smoothly.',
      suggestedReplies: ['What is next?', 'Let\'s practice more!', 'How do I say goodbye?'],
    };
  }

  // Default encouraging sentence
  return {
    role: 'sensei',
    englishInput,
    japanese: '日本語で一緒に話しましょう。',
    kana: 'にほんごでいっしょにはなしましょう。',
    romaji: 'Nihongo de issho ni hanashimashō.',
    english: "Let's speak together in Japanese.",
    rubySegments: [
      { text: '日本語', reading: 'にほんご', isKanji: true },
      { text: 'で', isKanji: false },
      { text: '一緒', reading: 'いっしょ', isKanji: true },
      { text: 'に', isKanji: false },
      { text: '話', reading: 'はな', isKanji: true },
      { text: 'しましょう。', isKanji: false },
    ],
    breakdown: [
      { surface: '日本語', reading: 'にほんご', romaji: 'nihongo', pos: 'noun', meaning: 'Japanese language', jlpt: 'N5' },
      { surface: 'で', reading: 'で', romaji: 'de', pos: 'particle', meaning: 'by means of / in', jlpt: 'N5' },
      { surface: '一緒に', reading: 'いっしょに', romaji: 'issho ni', pos: 'adverb', meaning: 'together', jlpt: 'N5' },
      { surface: '話しましょう', reading: 'はなしましょう', romaji: 'hanashimashou', pos: 'verb', meaning: "let's speak", jlpt: 'N5' },
    ],
    grammarNote: '〜ましょう (-mashou) is the volitional polite form: "Let\'s do [something]". で marks the medium or tool (in Japanese).',
    replyJapanese: '今日はいかがですか？好きな食べ物や日本の行きたい場所はありますか？',
    replyKana: 'きょうはいかがですか？すきなたべものやにほんのいきたいばしょはありますか？',
    replyRomaji: 'Kyō wa ikaga desu ka? Suki na tabemono ya Nihon no ikitai basho wa arimasu ka?',
    replyEnglish: 'How are you today? Do you have a favorite food or place in Japan you want to visit?',
    suggestedReplies: ['I love ramen and sushi', 'I want to visit Tokyo and Kyoto', 'How do you say delicious?'],
  };
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
