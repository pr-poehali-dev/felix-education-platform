type Screen = "room" | "adventure" | "training" | "shop" | "rewards" | "settings";

const badges = [
  { id: 1, emoji: "🥇", title: "Первый урок", desc: "Прошёл первое задание", earned: true },
  { id: 2, emoji: "🔢", title: "Математик", desc: "10 задач решено", earned: true },
  { id: 3, emoji: "📚", title: "Книголюб", desc: "Прочитал 5 историй", earned: true },
  { id: 4, emoji: "⭐", title: "Звезда класса", desc: "50 правильных ответов", earned: false },
  { id: 5, emoji: "🚀", title: "Исследователь", desc: "Посетил все локации", earned: false },
  { id: 6, emoji: "🏆", title: "Чемпион", desc: "100% в любом тесте", earned: false },
  { id: 7, emoji: "🌈", title: "Радужный", desc: "7 дней подряд", earned: false },
  { id: 8, emoji: "💎", title: "Коллекционер", desc: "Собрал 500 кристаллов", earned: false },
];

const stats = [
  { label: "Уроков пройдено", value: "12", emoji: "📖" },
  { label: "Кристаллов собрано", value: "87", emoji: "💎" },
  { label: "Дней подряд", value: "3", emoji: "🔥" },
  { label: "Звёзд получено", value: "24", emoji: "⭐" },
];

interface RewardsProps {
  onBack: () => void;
  onNavigate?: (screen: Screen) => void;
}

export default function Rewards({ onBack }: RewardsProps) {
  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #fff8d6 0%, #ffe8a3 100%)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white/80 flex items-center justify-center font-black text-lg text-yellow-700 hover:scale-110 active:scale-95 transition-transform shadow-md"
        >
          ←
        </button>
        <h1 className="text-2xl font-black text-yellow-700">🏆 Награды</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl p-4 text-center bg-white shadow-md"
              style={{ border: "3px solid #FFD700" }}
            >
              <div className="text-2xl mb-1">{s.emoji}</div>
              <div className="text-2xl font-black text-yellow-700">{s.value}</div>
              <div className="text-xs text-yellow-600/70 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-3xl p-4 mb-6 shadow-md" style={{ border: "3px solid #FFD700" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-black text-yellow-700 text-sm">Уровень 3</span>
            <span className="text-xs text-yellow-600/70 font-semibold">87 / 150 XP</span>
          </div>
          <div className="h-4 bg-yellow-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: "58%",
                background: "linear-gradient(90deg, #FFD700, #FF8C42)",
              }}
            />
          </div>
          <p className="text-xs text-yellow-600/70 mt-1 text-right font-semibold">До уровня 4: 63 XP</p>
        </div>

        {/* Badges */}
        <h2 className="text-lg font-black text-yellow-700 mb-3">Достижения</h2>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge, i) => (
            <div
              key={badge.id}
              className={`rounded-3xl p-4 flex flex-col items-center gap-2 text-center bg-white animate-pop-in ${!badge.earned ? "opacity-50 grayscale" : ""}`}
              style={{
                boxShadow: badge.earned ? "0 4px 0 #FFD70088" : "0 2px 0 rgba(0,0,0,0.08)",
                border: badge.earned ? "3px solid #FFD700" : "3px solid #e5e7eb",
                animationDelay: `${i * 0.07}s`,
              }}
            >
              <span className="text-4xl">{badge.emoji}</span>
              <span className="font-black text-sm text-yellow-700">{badge.title}</span>
              <span className="text-xs text-yellow-600/70">{badge.desc}</span>
              {badge.earned ? (
                <span className="text-xs font-bold text-green-500 bg-green-100 px-2 py-0.5 rounded-full">
                  ✓ Получено
                </span>
              ) : (
                <span className="text-xs font-bold text-gray-400">🔒 Заблокировано</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
