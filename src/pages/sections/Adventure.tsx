type Screen = "room" | "adventure" | "training" | "shop" | "rewards" | "settings";

const levels = [
  { id: 1, title: "Лесная поляна", emoji: "🌳", stars: 3, unlocked: true, bg: "from-green-300 to-green-500" },
  { id: 2, title: "Речной берег", emoji: "🌊", stars: 2, unlocked: true, bg: "from-sky-300 to-blue-500" },
  { id: 3, title: "Горная тропа", emoji: "⛰️", stars: 1, unlocked: true, bg: "from-stone-300 to-stone-500" },
  { id: 4, title: "Волшебный лес", emoji: "🌙", stars: 0, unlocked: false, bg: "from-purple-300 to-purple-600" },
  { id: 5, title: "Звёздный остров", emoji: "⭐", stars: 0, unlocked: false, bg: "from-yellow-300 to-orange-400" },
  { id: 6, title: "Замок знаний", emoji: "🏰", stars: 0, unlocked: false, bg: "from-teal-300 to-teal-600" },
];

interface AdventureProps {
  onBack: () => void;
  onNavigate?: (screen: Screen) => void;
}

export default function Adventure({ onBack }: AdventureProps) {
  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #a8edea 0%, #fed6e3 100%)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white/80 flex items-center justify-center text-teal-dark font-black text-lg hover:scale-110 active:scale-95 transition-transform shadow-md"
        >
          ←
        </button>
        <h1 className="text-2xl font-black text-teal-dark">🗺️ Приключение</h1>
      </div>

      {/* Path visualization */}
      <div className="flex-1 px-4 py-2 overflow-y-auto">
        <p className="text-teal-dark/70 font-semibold text-sm mb-4 text-center">
          Пройди все уровни и стань чемпионом! 🏆
        </p>

        <div className="grid grid-cols-2 gap-4 pb-6">
          {levels.map((level, i) => (
            <button
              key={level.id}
              disabled={!level.unlocked}
              className={`
                relative rounded-3xl p-4 flex flex-col items-center gap-2 transition-all duration-200
                ${level.unlocked
                  ? "hover:scale-105 active:scale-95 cursor-pointer"
                  : "opacity-60 cursor-not-allowed grayscale"
                }
                bg-gradient-to-br ${level.bg}
                animate-pop-in
              `}
              style={{
                boxShadow: level.unlocked ? "0 6px 0 rgba(0,0,0,0.2)" : "0 3px 0 rgba(0,0,0,0.1)",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {!level.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/20">
                  <span className="text-3xl">🔒</span>
                </div>
              )}
              <span className="text-3xl">{level.emoji}</span>
              <span className="text-white font-black text-sm text-center leading-tight">
                {level.title}
              </span>
              <div className="flex gap-1">
                {[1, 2, 3].map((star) => (
                  <span key={star} className={`text-lg ${star <= level.stars ? "text-yellow-300" : "text-white/30"}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-white/80 text-xs font-semibold">Уровень {level.id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
