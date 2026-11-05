import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  translateAndTeach,
  synthesizeJapaneseSpeech,
  transcribeAudio,
  lookupWordDeep,
} from './src/services/gemini.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  // Body parsing for JSON and audio base64 payloads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // API Route: Translate English and generate structured Japanese lesson + conversational reply
  app.post('/api/translate-teach', async (req: Request, res: Response) => {
    try {
      const { englishInput, level = 'N5', goal = 'travel', history = [] } = req.body;
      if (!englishInput || typeof englishInput !== 'string') {
        res.status(400).json({ error: 'englishInput is required' });
        return;
      }

      const result = await translateAndTeach({
        englishInput,
        level,
        goal,
        history,
      });

      res.json(result);
    } catch (err: any) {
      console.error('API /api/translate-teach error:', err);
      res.status(500).json({ error: err.message || 'Internal teaching error' });
    }
  });

  // API Route: Synthesize Japanese speech
  app.post('/api/synthesize', async (req: Request, res: Response) => {
    try {
      const { text, speed = 1.0, voiceName = 'Kore' } = req.body;
      if (!text || typeof text !== 'string') {
        res.status(400).json({ error: 'text is required' });
        return;
      }

      const audioBase64 = await synthesizeJapaneseSpeech({
        text,
        speed: Number(speed) || 1.0,
        voiceName,
      });

      if (!audioBase64) {
        res.status(502).json({ error: 'Unable to synthesize audio' });
        return;
      }

      res.json({
        audioBase64,
        mimeType: 'audio/wav',
      });
    } catch (err: any) {
      console.error('API /api/synthesize error:', err);
      res.status(500).json({ error: err.message || 'Synthesis error' });
    }
  });

  // API Route: Transcribe audio to text
  app.post('/api/transcribe', async (req: Request, res: Response) => {
    try {
      const { base64Audio, mimeType = 'audio/webm' } = req.body;
      if (!base64Audio || typeof base64Audio !== 'string') {
        res.status(400).json({ error: 'base64Audio is required' });
        return;
      }

      const text = await transcribeAudio({
        base64Audio,
        mimeType,
      });

      res.json({ text });
    } catch (err: any) {
      console.error('API /api/transcribe error:', err);
      res.status(500).json({ error: err.message || 'Transcription error' });
    }
  });

  // API Route: Word Card lookup (Oxford / FreeDict / Jisho / LLM deep lookup)
  app.post('/api/word/lookup', async (req: Request, res: Response) => {
    try {
      const { word, lang, context, level } = req.body;
      if (!word || typeof word !== 'string') {
        res.status(400).json({ error: 'word is required' });
        return;
      }

      const wordCard = await lookupWordDeep({
        word,
        lang,
        context,
        level,
      });

      res.json(wordCard);
    } catch (err: any) {
      console.error('API /api/word/lookup error:', err);
      res.status(500).json({ error: err.message || 'Lookup error' });
    }
  });

  // API Route: Check dictionary providers status
  app.get('/api/dictionary/status', (_req: Request, res: Response) => {
    const hasOxford = Boolean(process.env.OXFORD_APP_ID && process.env.OXFORD_APP_KEY);
    res.json({
      oxfordAvailable: hasOxford,
      freeDictAvailable: true,
      jishoAvailable: true,
      geminiAvailable: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', name: 'Nihongo Sensei API' });
  });

  // Mount Vite or static files
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nihongo Sensei server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
