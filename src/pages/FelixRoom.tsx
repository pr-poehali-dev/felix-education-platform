import { useState } from "react";

const roomBgUrl = "/images/room-clean.png";

type Screen =
  | "room"
  | "adventure"
  | "training"
  | "shop"
  | "rewards"
  | "settings";

interface FelixRoomProps {
  age: string;
  gems: number;
  onNavigate: (screen: Screen) => void;
}

export default function FelixRoom({ age, gems, onNavigate }: FelixRoomProps) {
  const [felixTalking, setFelixTalking] = useState(false);
  const [hint, setHint] = useState("Привет! Нажми на предмет в комнате ✨");
  const [speech, setSpeech] = useState("");

  const speeches = [
    "Привет! Чем займёмся сегодня? 😺",
    "Готов к новым знаниям? ⭐",
    "Пойдём в приключение? 🚀",
    "Хочешь потренироваться? 📚",
    "Я очень рад тебя видеть! 💛",
  ];

  const handleFelixClick = () => {
    const randomSpeech = speeches[Math.floor(Math.random() * speeches.length)];
    setSpeech(randomSpeech);
    setFelixTalking(true);
    setHint("Нажми на дверь или книжный шкаф");
    setTimeout(() => {
      setFelixTalking(false);
    }, 2200);
  };

  const soon = (text: string) => {
    setHint(text);
  };

  return (
    <div className="min-h-screen relative overflow-hidden select-none bg-[#dff7f4]">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={roomBgUrl}
          alt="Комната Феликса"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.02) 55%, rgba(0,0,0,0.08) 100%)",
          }}
        />
      </div>

      {/* Top HUD */}
      <div className="relative z-20 flex items-center justify-between px-4 pt-3">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-white text-sm"
          style={{
            background: "rgba(30, 80, 120, 0.72)",
            backdropFilter: "blur(8px)",
            border: "2px solid rgba(100,200,255,0.35)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.22)",
          }}
        >
          <span className="text-xl">💎</span>
          <span className="text-lg font-black text-sky-200">
            {String(gems).padStart(3, "0")}
          </span>
          <button
            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white font-black text-sm"
            onClick={() => onNavigate("shop")}
          >
            +
          </button>
        </div>

        <div
          className="px-3 py-1.5 rounded-2xl text-xs font-bold text-white"
          style={{
            background: "rgba(45, 196, 186, 0.78)",
            backdropFilter: "blur(8px)",
            border: "2px solid rgba(255,255,255,0.3)",
          }}
        >
          {age} лет
        </div>

        <button
          onClick={() => onNavigate("settings")}
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl hover:scale-110 transition-transform"
          style={{
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
            border: "2px solid rgba(255,255,255,0.38)",
          }}
        >
          ⚙️
        </button>
      </div>

      {/* Hint bubble */}
      <div className="relative z-20 flex justify-center mt-3 px-4">
        <div
          className="px-5 py-3 rounded-3xl text-teal-800 font-bold text-sm text-center max-w-md"
          style={{
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
            border: "2px solid rgba(45,196,186,0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          {hint}
        </div>
      </div>

      {/* Felix speech bubble */}
      {felixTalking && (
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2 z-30 px-5 py-3 rounded-3xl text-teal-900 font-bold text-sm max-w-xs text-center bg-white shadow-xl border-2 border-[#2DC4BA] animate-[fadeIn_.2s_ease]">
          {speech}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "12px solid white",
            }}
          />
        </div>
      )}

      {/* Scene overlay */}
      <div className="absolute inset-0 z-10">
        {/* Bookcase -> Training */}
        <button
          onMouseEnter={() => setHint("📚 Книжный шкаф — тренируй любую тему")}
          onMouseLeave={() => setHint("Привет! Нажми на предмет в комнате ✨")}
          onClick={() => onNavigate("training")}
          className="absolute left-[6%] top-[25%] w-[20%] h-[40%] rounded-[28px] hover:bg-white/10 transition"
          aria-label="Тренировка"
        />

        {/* Door -> Adventure */}
        <button
          onMouseEnter={() => setHint("🗺️ Дверь ведёт в миры знаний")}
          onMouseLeave={() => setHint("Привет! Нажми на предмет в комнате ✨")}
          onClick={() => onNavigate("adventure")}
          className="absolute left-[36%] top-[18%] w-[24%] h-[46%] rounded-[32px] hover:bg-white/10 transition"
          aria-label="Приключение"
        />

        {/* Trophy shelf -> Rewards */}
        <button
          onMouseEnter={() => setHint("🏆 Здесь живут награды Феликса")}
          onMouseLeave={() => setHint("Привет! Нажми на предмет в комнате ✨")}
          onClick={() => soon("🏆 Награды скоро станут активными")}
          className="absolute right-[11%] top-[6%] w-[16%] h-[12%] rounded-[22px] hover:bg-white/10 transition"
          aria-label="Награды"
        />

        {/* Achievement board -> Rewards soon */}
        <button
          onMouseEnter={() => setHint("⭐ Доска достижений")}
          onMouseLeave={() => setHint("Привет! Нажми на предмет в комнате ✨")}
          onClick={() => soon("⭐ Достижения скоро появятся")}
          className="absolute right-[22%] top-[28%] w-[14%] h-[16%] rounded-[20px] hover:bg-white/10 transition"
          aria-label="Достижения"
        />

        {/* Wardrobe -> Clothes soon */}
        <button
          onMouseEnter={() => setHint("👕 Гардероб Феликса")}
          onMouseLeave={() => setHint("Привет! Нажми на предмет в комнате ✨")}
          onClick={() => soon("👕 Гардероб скоро откроется")}
          className="absolute right-[4%] top-[22%] w-[21%] h-[44%] rounded-[28px] hover:bg-white/10 transition"
          aria-label="Одежда"
        />

        {/* Chest -> Shop */}
        <button
          onMouseEnter={() => setHint("💎 Сундук — магазин и сокровища")}
          onMouseLeave={() => setHint("Привет! Нажми на предмет в комнате ✨")}
          onClick={() => onNavigate("shop")}
          className="absolute right-[17%] bottom-[12%] w-[18%] h-[18%] rounded-[24px] hover:bg-white/10 transition"
          aria-label="Магазин"
        />
      </div>

      {/* Felix Character — centered on the rug */}
      <div
        className="absolute z-20 flex items-end justify-center"
        style={{ left: "50%", bottom: "6%", transform: "translateX(-50%)" }}
        onMouseEnter={() => setHint("😺 Нажми на кота!")}
        onMouseLeave={() => setHint("Привет! Нажми на предмет в комнате ✨")}
      />
    </div>
  );
}