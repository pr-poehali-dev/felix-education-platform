import { useState } from "react";

type Screen = "room" | "adventure" | "training" | "shop" | "rewards" | "settings";

interface SettingsProps {
  onBack: () => void;
  onNavigate?: (screen: Screen) => void;
  age: string;
  onChangeAge: () => void;
}

export default function Settings({ onBack, age, onChangeAge }: SettingsProps) {
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(true);
  const [notifications, setNotifications] = useState(false);

  const Toggle = ({
    value,
    onChange,
    label,
    emoji,
  }: {
    value: boolean;
    onChange: (v: boolean) => void;
    label: string;
    emoji: string;
  }) => (
    <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm"
      style={{ border: "2px solid #e0f7f5" }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{emoji}</span>
        <span className="font-bold text-teal-dark text-sm">{label}</span>
      </div>
      <button
        onClick={() => onChange(!value)}
        className="relative w-12 h-6 rounded-full transition-all duration-200"
        style={{ background: value ? "#2DC4BA" : "#ccc" }}
      >
        <div
          className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200"
          style={{ left: value ? "26px" : "2px" }}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #e0faf8 0%, #c8f0e8 100%)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white/80 flex items-center justify-center text-teal-dark font-black text-lg hover:scale-110 active:scale-95 transition-transform shadow-md"
        >
          ←
        </button>
        <h1 className="text-2xl font-black text-teal-dark">⚙️ Настройки</h1>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {/* Profile */}
        <div
          className="rounded-3xl p-5 mb-5 bg-white text-center shadow-md"
          style={{ border: "3px solid #2DC4BA" }}
        >
          <div className="text-5xl mb-2 animate-bounce-soft">😺</div>
          <h2 className="text-lg font-black text-teal-dark">Феликс и ты</h2>
          <p className="text-sm text-teal-dark/60 font-semibold mb-3">Возраст: {age} лет</p>
          <button
            onClick={onChangeAge}
            className="game-btn px-5 py-2 text-sm font-black text-white rounded-2xl"
            style={{ background: "linear-gradient(135deg, #2DC4BA, #1A9990)" }}
          >
            Изменить возраст
          </button>
        </div>

        {/* Sound settings */}
        <h2 className="text-base font-black text-teal-dark mb-3">Звук</h2>
        <div className="flex flex-col gap-3 mb-5">
          <Toggle value={sound} onChange={setSound} label="Звуковые эффекты" emoji="🔊" />
          <Toggle value={music} onChange={setMusic} label="Музыка" emoji="🎵" />
          <Toggle value={notifications} onChange={setNotifications} label="Уведомления" emoji="🔔" />
        </div>

        {/* About */}
        <h2 className="text-base font-black text-teal-dark mb-3">О приложении</h2>
        <div
          className="rounded-2xl p-4 bg-white shadow-sm"
          style={{ border: "2px solid #e0f7f5" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📱</span>
            <div>
              <p className="font-black text-teal-dark text-sm">Феликс — кот знаний</p>
              <p className="text-xs text-teal-dark/60">Версия 1.0.0</p>
            </div>
          </div>
          <p className="text-xs text-teal-dark/50 leading-relaxed">
            Образовательная игра для детей 4–12 лет. Учись весело вместе с Феликсом!
          </p>
        </div>

        {/* Reset */}
        <div className="mt-6">
          <button
            className="w-full game-btn py-3 font-black text-white rounded-2xl"
            style={{ background: "linear-gradient(135deg, #FF6B5B, #E64A3A)" }}
            onClick={() => {
              if (confirm("Сбросить весь прогресс?")) {
                onChangeAge();
              }
            }}
          >
            🗑️ Сбросить прогресс
          </button>
        </div>
      </div>
    </div>
  );
}
