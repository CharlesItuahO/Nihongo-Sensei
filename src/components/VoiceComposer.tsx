import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  Mic,
  MicOff,
  Send,
  Loader2,
  Sparkles,
  Languages,
  AlertCircle,
  X,
  Volume2,
} from 'lucide-react';

export const VoiceComposer: React.FC = () => {
  const { sendMessage, isLoadingMessage, profile, updateProfile } = useApp();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [listeningDuration, setListeningDuration] = useState(0);
  const [transcriptPreview, setTranscriptPreview] = useState('');
  const [micError, setMicError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  const startListening = async () => {
    setMicError(null);
    setTranscriptPreview('');
    setListeningDuration(0);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    let webSpeechStarted = false;

    // 1. Try Browser Web Speech API for instantaneous transcription
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = profile.inputLanguage === 'ja' ? 'ja-JP' : 'en-US';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          if (currentTranscript) {
            setTranscriptPreview(currentTranscript);
            setInputText(currentTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('SpeechRecognition error:', event.error);
          if (event.error === 'not-allowed') {
            setMicError('Microphone permission was denied. Please allow microphone access or type in text mode.');
            stopListening();
          }
        };

        recognition.onend = () => {
          // If ended naturally while still flagged as listening
          if (isListening) {
            // Keep going or finish
          }
        };

        recognition.start();
        recognitionRef.current = recognition;
        webSpeechStarted = true;
      } catch (err) {
        console.warn('Web Speech API failed to initialize:', err);
      }
    }

    // 2. Also record MediaStream audio blob in parallel for server transcription fallback
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = e => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());

        // If Web Speech API didn't pick up text, transcribe via Gemini 3.5 Transcribe
        if (!transcriptPreview && audioChunksRef.current.length > 0) {
          try {
            const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async () => {
              const base64Data = (reader.result as string)?.split(',')[1];
              if (base64Data) {
                const res = await fetch('/api/transcribe', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ base64Audio: base64Data, mimeType }),
                });
                if (res.ok) {
                  const data = await res.json();
                  if (data.text) {
                    setInputText(data.text);
                    handleAutoSubmit(data.text);
                  }
                }
              }
            };
          } catch (e) {
            console.error('Audio blob fallback transcription failed:', e);
          }
        }
      };

      mediaRecorder.start(250);
      setIsListening(true);

      timerRef.current = setInterval(() => {
        setListeningDuration(prev => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error('Microphone access failed:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setMicError('Microphone permission is blocked. Click the lock/camera icon in your address bar to allow mic access, or type your message.');
      } else {
        setMicError('Could not access microphone. Please check your audio input settings.');
      }
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
      mediaRecorderRef.current = null;
    }

    setIsListening(false);
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
      if (inputText.trim()) {
        handleAutoSubmit(inputText);
      }
    } else {
      startListening();
    }
  };

  const handleAutoSubmit = (textToSubmit: string) => {
    const trimmed = textToSubmit.trim();
    if (trimmed) {
      sendMessage(trimmed);
      setInputText('');
      setTranscriptPreview('');
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isListening) {
      stopListening();
    }
    const trimmed = inputText.trim();
    if (trimmed && !isLoadingMessage) {
      sendMessage(trimmed);
      setInputText('');
      setTranscriptPreview('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="sticky bottom-0 z-20 bg-gradient-to-t from-[#FAF8F4] via-[#FAF8F4]/95 to-transparent dark:from-[#171513] dark:via-[#171513]/95 dark:to-transparent pt-3 pb-4 px-4 border-t border-stone-200/60 dark:border-stone-800">
      <div className="max-w-3xl mx-auto space-y-2">
        {/* Permission / Mic Error Banner */}
        {micError && (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <span>{micError}</span>
            </div>
            <button
              onClick={() => setMicError(null)}
              className="p-1 hover:bg-amber-100 dark:hover:bg-amber-900 rounded-lg text-amber-700 dark:text-amber-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Listening State Overlay */}
        {isListening ? (
          <div className="bg-rose-500 text-white rounded-3xl p-4 shadow-lg shadow-rose-200 dark:shadow-none flex flex-col sm:flex-row items-center justify-between gap-3 animate-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-rose-400 animate-ping absolute opacity-75" />
                <div className="w-10 h-10 rounded-full bg-white text-rose-600 flex items-center justify-center relative shadow-sm">
                  <Mic className="w-5 h-5 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="font-semibold text-sm flex items-center gap-2">
                  <span>Listening in {profile.inputLanguage === 'ja' ? 'Japanese' : 'English'}...</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 font-mono">
                    {listeningDuration}s
                  </span>
                </div>
                <div className="text-xs text-rose-100 line-clamp-1 italic max-w-xs sm:max-w-md">
                  {transcriptPreview || 'Speak naturally into your device microphone...'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => {
                  stopListening();
                  setInputText('');
                  setTranscriptPreview('');
                }}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleToggleListening}
                className="px-4 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
              >
                Done Speaking
              </button>
            </div>
          </div>
        ) : (
          /* Normal Dual Composer (Text + Mic) */
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-md p-1.5 sm:p-2 flex items-end gap-2 focus-within:ring-2 focus-within:ring-rose-400 dark:focus-within:ring-rose-600 transition-all"
          >
            {/* Input Language Switcher */}
            <button
              type="button"
              onClick={() =>
                updateProfile({
                  inputLanguage: profile.inputLanguage === 'en' ? 'ja' : 'en',
                })
              }
              className="p-2 sm:px-2.5 sm:py-2 rounded-2xl bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 text-stone-600 dark:text-stone-300 text-xs font-semibold flex items-center gap-1 transition-colors flex-shrink-0"
              title="Toggle input language (English / Japanese)"
            >
              <Languages className="w-3.5 h-3.5 text-rose-500" />
              <span className="uppercase text-[11px] font-bold">
                {profile.inputLanguage}
              </span>
            </button>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoadingMessage}
              placeholder={
                profile.inputLanguage === 'ja'
                  ? '日本語で話す・入力する...'
                  : 'Say or type anything in English (e.g. "Can I have some water?")...'
              }
              className="flex-1 bg-transparent border-0 focus:ring-0 text-stone-900 dark:text-stone-100 text-sm sm:text-base resize-none py-2 px-2 max-h-32 min-h-[40px] placeholder:text-stone-400 outline-none"
            />

            {/* Mic Button (First-class voice trigger) */}
            <button
              type="button"
              onClick={handleToggleListening}
              disabled={isLoadingMessage}
              className="p-2.5 sm:p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 hover:scale-105 active:scale-95 transition-all flex-shrink-0 relative group"
              title="Tap to speak in English"
              aria-label="Start voice recognition"
            >
              <Mic className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <span className="sr-only">Voice Input</span>
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isLoadingMessage}
              className={`p-2.5 sm:p-3 rounded-2xl flex items-center justify-center transition-all flex-shrink-0 ${
                inputText.trim() && !isLoadingMessage
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm shadow-rose-200 dark:shadow-none hover:scale-105 active:scale-95 cursor-pointer'
                  : 'bg-stone-100 dark:bg-stone-700 text-stone-300 dark:text-stone-600 cursor-not-allowed'
              }`}
              title="Send message"
              aria-label="Send message"
            >
              {isLoadingMessage ? (
                <Loader2 className="w-5 h-5 animate-spin text-rose-500" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        )}

        {/* Quick prompt ideas underneath composer */}
        <div className="flex items-center justify-between text-[11px] text-stone-400 px-2">
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
            <span className="font-medium text-stone-500 hidden sm:inline">Try asking:</span>
            {[
              'I\'d like a hot latte, please',
              'Where is the restroom?',
              'What does "serendipity" mean in Japanese?',
            ].map((hint, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputText(hint)}
                className="whitespace-nowrap px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-400 transition-colors"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
