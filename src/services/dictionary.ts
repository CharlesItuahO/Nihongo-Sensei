import type { WordCard } from '../types/index.ts';

interface OxfordResponse {
  results?: Array<{
    id: string;
    lexicalEntries?: Array<{
      lexicalCategory?: { text: string };
      entries?: Array<{
        senses?: Array<{
          definitions?: string[];
          shortDefinitions?: string[];
          examples?: Array<{ text: string }>;
        }>;
      }>;
    }>;
  }>;
}

interface FreeDictResponseItem {
  word: string;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
    }>;
  }>;
}

interface JishoWordItem {
  slug: string;
  is_common: boolean;
  jlpt: string[];
  japanese: Array<{
    word?: string;
    reading?: string;
  }>;
  senses: Array<{
    english_definitions: string[];
    parts_of_speech: string[];
  }>;
}

interface JishoResponse {
  data: JishoWordItem[];
}

// In-memory cache for dictionary lookups
const dictionaryCache = new Map<string, any>();

/**
 * Look up an English word in Oxford Dictionaries API with fallback to Free Dictionary API
 */
export async function lookupEnglishWordInDictionaries(word: string): Promise<{
  definition: string;
  partOfSpeech: string;
  senses: string[];
  examples: string[];
  source: 'oxford' | 'freedict' | 'llm';
}> {
  const cleanWord = word.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (!cleanWord) {
    return {
      definition: 'Word not provided',
      partOfSpeech: 'noun',
      senses: [],
      examples: [],
      source: 'llm',
    };
  }

  const cacheKey = `en:${cleanWord}`;
  if (dictionaryCache.has(cacheKey)) {
    return dictionaryCache.get(cacheKey);
  }

  const appId = process.env.OXFORD_APP_ID;
  const appKey = process.env.OXFORD_APP_KEY;

  // 1. Try Oxford Dictionaries API if configured
  if (appId && appKey) {
    try {
      const oxfordUrl = `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${encodeURIComponent(cleanWord)}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(oxfordUrl, {
        headers: {
          app_id: appId,
          app_key: appKey,
          Accept: 'application/json',
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = (await res.json()) as OxfordResponse;
        const firstResult = data.results?.[0];
        const firstLex = firstResult?.lexicalEntries?.[0];
        const pos = firstLex?.lexicalCategory?.text?.toLowerCase() || 'word';
        const senses = firstLex?.entries?.[0]?.senses || [];
        const definitions = senses.map(s => s.definitions?.[0] || s.shortDefinitions?.[0]).filter(Boolean) as string[];
        const examples = senses.flatMap(s => (s.examples || []).map(e => e.text)).filter(Boolean);

        if (definitions.length > 0) {
          const result = {
            definition: definitions[0],
            partOfSpeech: pos,
            senses: definitions.slice(0, 4),
            examples: examples.slice(0, 3),
            source: 'oxford' as const,
          };
          dictionaryCache.set(cacheKey, result);
          return result;
        }
      }
    } catch (err) {
      console.warn('Oxford API lookup failed, falling back:', err);
    }
  }

  // 2. Fallback to Free Dictionary API
  try {
    const freeDictUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(freeDictUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = (await res.json()) as FreeDictResponseItem[];
      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];
        const firstMeaning = item.meanings[0];
        const pos = firstMeaning?.partOfSpeech || 'word';
        const definitions = item.meanings.flatMap(m => m.definitions.map(d => d.definition));
        const examples = item.meanings.flatMap(m => m.definitions.map(d => d.example).filter(Boolean) as string[]);

        if (definitions.length > 0) {
          const result = {
            definition: definitions[0],
            partOfSpeech: pos,
            senses: definitions.slice(0, 4),
            examples: examples.slice(0, 3),
            source: 'freedict' as const,
          };
          dictionaryCache.set(cacheKey, result);
          return result;
        }
      }
    }
  } catch (err) {
    console.warn('Free Dictionary API lookup failed, falling back:', err);
  }

  // Default fallback indicator
  const fallback = {
    definition: '',
    partOfSpeech: 'word',
    senses: [],
    examples: [],
    source: 'llm' as const,
  };
  return fallback;
}

/**
 * Look up a Japanese word in Jisho API (JMdict/Kanjidic)
 */
export async function lookupJapaneseWordInJisho(keyword: string): Promise<{
  word: string;
  reading: string;
  pos: string;
  definitions: string[];
  jlpt?: string;
  isCommon: boolean;
  source: 'jisho' | 'llm';
} | null> {
  const cleanKeyword = keyword.trim();
  if (!cleanKeyword) return null;

  const cacheKey = `ja:${cleanKeyword}`;
  if (dictionaryCache.has(cacheKey)) {
    return dictionaryCache.get(cacheKey);
  }

  try {
    const jishoUrl = `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(cleanKeyword)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(jishoUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NihongoSensei/1.0; JapaneseLearningBot)',
        Accept: 'application/json',
      },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = (await res.json()) as JishoResponse;
      if (data.data && data.data.length > 0) {
        const match = data.data[0];
        const firstJa = match.japanese?.[0];
        const word = firstJa?.word || cleanKeyword;
        const reading = firstJa?.reading || cleanKeyword;
        const pos = match.senses?.[0]?.parts_of_speech?.join(', ') || 'noun';
        const definitions = match.senses?.[0]?.english_definitions || [];
        const jlptRaw = match.jlpt?.[0]; // e.g. "jlpt-n5"
        const jlpt = jlptRaw ? jlptRaw.replace('jlpt-', '').toUpperCase() : undefined;

        const result = {
          word,
          reading,
          pos,
          definitions,
          jlpt,
          isCommon: match.is_common,
          source: 'jisho' as const,
        };
        dictionaryCache.set(cacheKey, result);
        return result;
      }
    }
  } catch (err) {
    console.warn('Jisho API lookup failed:', err);
  }

  return null;
}
