import { useCallback, useEffect, useRef, useState } from "react";
import { useVoice } from "@/hooks/useVoice";

const ageGroups = [
  {
    age: "4–5",
    label: "лет",
    emoji: "🌱",
    color: "from-green-400 to-teal",
    bg: "bg-green-400",
    shadow: "shadow-green-300",
    desc: "Самые маленькие",
    voiceText: "Четыре, пять лет",
  },
  {
    age: "6–7",
    label: "лет",
    emoji: "⭐",
    color: "from-teal to-teal-dark",
    bg: "bg-teal",
    shadow: "shadow-teal",
    desc: "Первоклассники",
    voiceText: "Шесть, семь лет",
  },
  {
    age: "8–9",
    label: "лет",
    emoji: "🚀",
    color: "from-purple-400 to-purple",
    bg: "bg-purple-500",
    shadow: "shadow-purple-300",
    desc: "Знатоки",
    voiceText: "Восемь, девять лет",
  },
  {
    age: "10+",
    label: "лет",
    emoji: "🏆",
    color: "from-coral to-coral-dark",
    bg: "bg-coral",
    shadow: "shadow-orange-300",
    desc: "Чемпионы",
    voiceText: "Десять и больше лет",
  },
];

// Motivational phrases Felix says when clicked
const motivationalPhrases = [
  "Ты самый умный! Я в тебя верю! 🌟",
  "Вместе мы всему научимся! 🚀",
  "Мяу! Ты просто супер! ⭐",
  "Каждый день — новое открытие! 🎉",
  "Учиться — это весело! Давай начнём! 🎮",
  "Ты мой лучший ученик! 😸",
  "Мурр... Готов к приключениям? 🗺️",
];

const Sparkle = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="absolute text-gold-DEFAULT text-xl pointer-events-none animate-sparkle"
    style={style}
  >
    ✦
  </div>
);

interface AgeSelectProps {
  onSelect: (age: string) => void;
}

export default function AgeSelect({ onSelect }: AgeSelectProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [catState, setCatState] = useState<"idle" | "wave" | "talk">("wave");
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [hasGreeted, setHasGreeted] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { speak, isSpeaking, enabled, toggle, isSupported } = useVoice({
    rate: 0.85,
    pitch: 1.5, // Higher pitch = childlike voice
    volume: 1,
  });

  // Greeting sequence on mount: wave → greet → idle
  useEffect(() => {
    // Wave for 1.5 seconds then speak greeting
    const waveTimer = setTimeout(() => {
      setCatState("talk");
      setSpeechBubble("Привет! Я Феликс! Сколько тебе лет? 😺");
      speak("Привет! Я Феликс! Сколько тебе лет?", () => {
        setCatState("idle");
        speechTimerRef.current = setTimeout(() => {
          setSpeechBubble(null);
          setHasGreeted(true);
        }, 800);
      });
    }, 1500);

    return () => {
      clearTimeout(waveTimer);
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync cat talk state with isSpeaking
  useEffect(() => {
    if (isSpeaking && catState !== "wave") {
      setCatState("talk");
    }
  }, [isSpeaking, catState]);

  const handleSelect = (age: string) => {
    setSelected(age);
    setTimeout(() => onSelect(age), 400);
  };

  const handleAgeHover = useCallback(
    (voiceText: string, ageLabel: string) => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = setTimeout(() => {
        setSpeechBubble(ageLabel + "! Отличный выбор! 😺");
        setCatState("talk");
        speak(voiceText, () => {
          setCatState("idle");
          speechTimerRef.current = setTimeout(() => setSpeechBubble(null), 600);
        });
      }, 250); // Small delay to avoid accidental triggers
    },
    [speak]
  );

  const handleAgeLeave = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  }, []);

  const handleFelixClick = useCallback(() => {
    if (isSpeaking) return;
    const phrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
    setSpeechBubble(phrase);
    setCatState("talk");
    const cleanPhrase = phrase.replace(/[\u{1F300}-\u{1FFFF}]/gu, "").trim();
    speak(cleanPhrase, () => {
      setCatState("idle");
      speechTimerRef.current = setTimeout(() => setSpeechBubble(null), 800);
    });
  }, [isSpeaking, speak]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #b2f0eb 0%, #e0faf8 40%, #c8f0e8 100%)",
      }}
    >
      {/* Decorative background circles */}
      <div
        className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-30 blur-2xl"
        style={{ background: "#FFD700" }}
      />
      <div
        className="absolute bottom-[-60px] right-[-60px] w-64 h-64 rounded-full opacity-25 blur-2xl"
        style={{ background: "#9B6DFF" }}
      />
      <div
        className="absolute top-[30%] right-[5%] w-40 h-40 rounded-full opacity-20 blur-xl"
        style={{ background: "#FF6B5B" }}
      />

      {/* Floating sparkles */}
      <Sparkle style={{ top: "12%", left: "8%", animationDelay: "0s" }} />
      <Sparkle style={{ top: "20%", right: "12%", animationDelay: "0.7s" }} />
      <Sparkle style={{ bottom: "25%", left: "15%", animationDelay: "1.4s" }} />
      <Sparkle style={{ bottom: "15%", right: "20%", animationDelay: "0.3s" }} />
      <Sparkle style={{ top: "55%", left: "5%", animationDelay: "1s" }} />
      <Sparkle style={{ top: "40%", right: "6%", animationDelay: "0.5s" }} />

      {/* Sound toggle button */}
      {isSupported && (
        <button
          onClick={toggle}
          className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all hover:scale-110 active:scale-95"
          style={{
            background: enabled
              ? "rgba(45,196,186,0.85)"
              : "rgba(150,150,150,0.6)",
            boxShadow: enabled
              ? "0 4px 16px rgba(45,196,186,0.5)"
              : "0 2px 8px rgba(0,0,0,0.2)",
            border: "2px solid rgba(255,255,255,0.5)",
            backdropFilter: "blur(8px)",
          }}
          title={enabled ? "Выключить звук" : "Включить звук"}
        >
          {enabled ? "🔊" : "🔇"}
        </button>
      )}

      {/* Felix + speech bubble area */}
      <div className="relative flex flex-col items-center mb-2">
        {/* Speech bubble */}
        {speechBubble && (
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-10 animate-pop-in"
            style={{ minWidth: 220, maxWidth: 280 }}
          >
            <div
              className="px-5 py-3 rounded-3xl text-teal-dark font-bold text-sm text-center relative"
              style={{
                background: "white",
                boxShadow: "0 6px 24px rgba(45,196,186,0.25)",
                border: "3px solid #2DC4BA",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              {speechBubble}
              {/* Bubble tail */}
              <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-[14px] w-0 h-0"
                style={{
                  borderLeft: "12px solid transparent",
                  borderRight: "12px solid transparent",
                  borderTop: "14px solid white",
                  filter: "drop-shadow(0 3px 0 #2DC4BA)",
                }}
              />
            </div>
          </div>
        )}

        {/* Animated cat emoji */}
        <div
          className="relative cursor-pointer select-none"
          style={{
            fontSize: 130,
            lineHeight: 1,
            animation:
              catState === "idle"
                ? "felix-float 3s ease-in-out infinite"
                : catState === "wave"
                ? "felix-float-wave 0.6s ease-in-out infinite alternate"
                : "none",
            filter: catState === "talk" ? "drop-shadow(0 0 18px rgba(45,196,186,0.7))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
            transition: "filter 0.3s ease",
          }}
          onClick={handleFelixClick}
          role="button"
          aria-label="Феликс"
        >
          {catState === "wave" ? "🐱" : catState === "talk" ? "😸" : "😺"}
          {/* Glow ring when talking */}
          {catState === "talk" && (
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(45,196,186,0.18) 0%, transparent 70%)",
                animation: "felix-glow 0.4s ease-in-out infinite alternate",
              }}
            />
          )}
        </div>

        {/* Click hint */}
        {hasGreeted && !isSpeaking && (
          <p
            className="text-xs text-teal-dark/50 font-semibold mt-1 animate-fade-in-scale"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Нажми на меня! 🐾
          </p>
        )}
      </div>

      {/* Title */}
      <div className="text-center mb-6 px-4">
        <h1
          className="text-3xl md:text-4xl font-extrabold text-teal-dark mb-2"
          style={{
            fontFamily: "Nunito, sans-serif",
            textShadow: "0 2px 8px rgba(45,196,186,0.2)",
          }}
        >
          Привет! Я Феликс! 😺
        </h1>
        <p className="text-lg text-teal-dark/80 font-semibold">
          Сколько тебе лет?
        </p>
      </div>

      {/* Age buttons */}
      <div className="grid grid-cols-2 gap-4 px-6 w-full max-w-md">
        {ageGroups.map((group, i) => (
          <button
            key={group.age}
            onClick={() => handleSelect(group.age)}
            onMouseEnter={() => handleAgeHover(group.voiceText, `${group.age} ${group.label}`)}
            onMouseLeave={handleAgeLeave}
            onFocus={() => handleAgeHover(group.voiceText, `${group.age} ${group.label}`)}
            onBlur={handleAgeLeave}
            // Touch support
            onTouchStart={() => handleAgeHover(group.voiceText, `${group.age} ${group.label}`)}
            className={`
              game-btn relative flex flex-col items-center justify-center py-5 px-4
              bg-white/90 border-4 transition-all duration-300
              ${
                selected === group.age
                  ? "scale-95 border-teal"
                  : "border-white hover:border-teal-light hover:scale-105"
              }
              animate-pop-in
            `}
            style={{
              animationDelay: `${i * 0.1}s`,
              boxShadow:
                selected === group.age
                  ? "0 4px 0 rgba(45,196,186,0.4)"
                  : "0 6px 0 rgba(0,0,0,0.1)",
            }}
          >
            <span className="text-3xl mb-1">{group.emoji}</span>
            <span className="text-3xl font-black text-teal-dark">{group.age}</span>
            <span className="text-sm text-teal-dark/70 font-semibold">{group.label}</span>
            <span className="text-xs text-gray-400 mt-1">{group.desc}</span>
          </button>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="mt-8 flex gap-3 items-center opacity-60">
        <span className="text-2xl animate-float">⭐</span>
        <span className="text-xl animate-float-delay">💎</span>
        <span className="text-2xl animate-float-delay2">⭐</span>
      </div>

      {/* Global animation styles */}
      <style>{`
        @keyframes felix-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes felix-float-wave {
          0% { transform: translateY(-2px) rotate(-1deg); }
          100% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes felix-glow {
          0% { opacity: 0.5; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}