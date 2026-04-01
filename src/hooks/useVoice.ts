import { useCallback, useEffect, useRef, useState } from "react";

interface UseVoiceOptions {
  enabled?: boolean;
  rate?: number;
  pitch?: number;
  volume?: number;
}

interface UseVoiceReturn {
  speak: (text: string, onEnd?: () => void) => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
  enabled: boolean;
  toggle: () => void;
}

// Pick the best Russian voice available
function pickRussianVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  // Prefer child-like / female Russian voices
  const priority = [
    voices.find((v) => v.lang.startsWith("ru") && /milena|alena|anna|oksana|google русский/i.test(v.name)),
    voices.find((v) => v.lang.startsWith("ru") && v.name.toLowerCase().includes("female")),
    voices.find((v) => v.lang.startsWith("ru")),
    voices.find((v) => v.lang === "ru-RU"),
  ];
  return priority.find(Boolean) ?? null;
}

export function useVoice(options: UseVoiceOptions = {}): UseVoiceReturn {
  const { rate = 0.9, pitch = 1.4, volume = 1 } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [enabled, setEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("felix_voice_enabled");
      return saved !== null ? saved === "true" : true;
    } catch {
      return true;
    }
  });
  const [isSupported] = useState(() => "speechSynthesis" in window);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load voices (async in Chrome)
  useEffect(() => {
    if (!isSupported) return;
    const load = () => {
      const voices = window.speechSynthesis.getVoices();
      voiceRef.current = pickRussianVoice(voices);
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
    };
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!isSupported || !enabled) {
        onEnd?.();
        return;
      }
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "ru-RU";
      utter.rate = rate;
      utter.pitch = pitch;
      utter.volume = volume;
      if (voiceRef.current) utter.voice = voiceRef.current;

      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => {
        setIsSpeaking(false);
        onEnd?.();
      };
      utter.onerror = () => {
        setIsSpeaking(false);
        onEnd?.();
      };

      utteranceRef.current = utter;
      window.speechSynthesis.speak(utter);
    },
    [isSupported, enabled, rate, pitch, volume]
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("felix_voice_enabled", String(next));
      } catch {
        // ignore
      }
      if (!next) {
        window.speechSynthesis?.cancel();
        setIsSpeaking(false);
      }
      return next;
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  return { speak, stop, isSpeaking, isSupported, enabled, toggle };
}
