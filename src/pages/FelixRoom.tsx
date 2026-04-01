import { useState } from "react";

const roomBgUrl = "https://cdn.poehali.dev/projects/feb7d517-61be-4268-a08e-6633bf1c3a57/bucket/a89d0fae-917e-420a-a044-04000f54c32f.png";
const felixUrl = "https://cdn.poehali.dev/projects/feb7d517-61be-4268-a08e-6633bf1c3a57/bucket/f656c815-c777-43cd-8cb7-d4ffd86a5e6c.png";

type Screen = "room" | "adventure" | "training" | "shop" | "rewards" | "settings";

const navItems = [
  {
    id: "adventure" as Screen,
    emoji: "🗺️",
    label: "Приключение",
    color: "#FF8C42",
    shadow: "#CC6422",
    bg: "linear-gradient(135deg, #FF8C42, #FF6B1A)",
  },
  {
    id: "training" as Screen,
    emoji: "💪",
    label: "Тренировка",
    color: "#3DCC6A",
    shadow: "#2BAA54",
    bg: "linear-gradient(135deg, #3DCC6A, #20AA50)",
  },
  {
    id: "shop" as Screen,
    emoji: "🛍️",
    label: "Магазин",
    color: "#9B6DFF",
    shadow: "#7040E6",
    bg: "linear-gradient(135deg, #9B6DFF, #7040E6)",
  },
  {
    id: "rewards" as Screen,
    emoji: "🏆",
    label: "Награды",
    color: "#FFD700",
    shadow: "#CC9900",
    bg: "linear-gradient(135deg, #FFD700, #FFA500)",
  },
];

interface FelixRoomProps {
  age: string;
  gems: number;
  onNavigate: (screen: Screen) => void;
}

export default function FelixRoom({ age, gems, onNavigate }: FelixRoomProps) {
  const [felixTalking, setFelixTalking] = useState(false);
  const [speech, setSpeech] = useState("");

  const speeches = [
    "Привет! Я так рад тебя видеть! 😺",
    "Сегодня мы узнаем что-то новое! ⭐",
    "Ты молодец! Продолжай учиться! 🎉",
    "Готов к приключению? Пошли! 🚀",
    "Мяу! Давай поиграем! 🎮",
  ];

  const handleFelixClick = () => {
    const randomSpeech = speeches[Math.floor(Math.random() * speeches.length)];
    setSpeech(randomSpeech);
    setFelixTalking(true);
    setTimeout(() => setFelixTalking(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden select-none">
      {/* Room background */}
      <div className="absolute inset-0">
        <img
          src={roomBgUrl}
          alt="Комната Феликса"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better UI readability */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.4) 100%)" }}
        />
      </div>

      {/* Top HUD */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-3 pb-2">
        {/* Gems counter */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-white text-sm"
          style={{
            background: "rgba(30, 80, 120, 0.75)",
            backdropFilter: "blur(8px)",
            border: "2px solid rgba(100,200,255,0.4)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <span className="text-xl animate-float">💎</span>
          <span className="text-lg font-black text-sky-200">{String(gems).padStart(3, "0")}</span>
          <button
            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white font-black text-sm"
            onClick={() => onNavigate("shop")}
          >
            +
          </button>
        </div>

        {/* Age badge */}
        <div
          className="px-3 py-1.5 rounded-2xl text-xs font-bold text-white"
          style={{
            background: "rgba(45, 196, 186, 0.8)",
            backdropFilter: "blur(8px)",
            border: "2px solid rgba(255,255,255,0.3)",
          }}
        >
          {age} лет
        </div>

        {/* Settings */}
        <button
          onClick={() => onNavigate("settings")}
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl hover:scale-110 transition-transform"
          style={{
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
            border: "2px solid rgba(255,255,255,0.4)",
          }}
        >
          ⚙️
        </button>
      </div>

      {/* Felix speech bubble */}
      {felixTalking && (
        <div className="relative z-20 mx-auto mt-2 px-5 py-3 rounded-3xl text-teal-dark font-bold text-sm max-w-xs text-center animate-pop-in"
          style={{
            background: "white",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            border: "3px solid #2DC4BA",
          }}
        >
          {speech}
          {/* Speech bubble tail */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "12px solid white",
            }}
          />
        </div>
      )}

      {/* Spacer to push nav to bottom */}
      <div className="flex-1" />

      {/* Bottom navigation */}
      <div className="relative z-10 px-4 pb-5">
        <div
          className="rounded-3xl p-4"
          style={{
            background: "rgba(10, 40, 70, 0.6)",
            backdropFilter: "blur(16px)",
            border: "2px solid rgba(100,200,255,0.2)",
            boxShadow: "0 -4px 30px rgba(0,0,0,0.3)",
          }}
        >
          {/* Felix clickable area at top of nav */}
          <div className="flex justify-center mb-3">
            <button
              onClick={handleFelixClick}
              className="relative hover:scale-105 active:scale-95 transition-transform"
            >
              <div className="text-center">
                <span className="text-xs text-white/60 font-semibold block mb-1">
                  Нажми на Феликса!
                </span>
                <div className="text-4xl animate-bounce-soft">😺</div>
              </div>
            </button>
          </div>

          {/* Nav grid */}
          <div className="grid grid-cols-4 gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="room-nav-btn text-white"
                style={{
                  background: item.bg,
                  boxShadow: `0 5px 0 ${item.shadow}`,
                }}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-xs font-bold leading-tight text-center">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
