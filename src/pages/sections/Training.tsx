import { useState } from "react";

type Screen = "room" | "adventure" | "training" | "shop" | "rewards" | "settings";

const categories = [
  { id: "math", emoji: "🔢", title: "Математика", color: "#FF8C42", bg: "linear-gradient(135deg, #FF8C42, #FF6B1A)", desc: "Числа и задачки" },
  { id: "letters", emoji: "🔤", title: "Буквы", color: "#3DCC6A", bg: "linear-gradient(135deg, #3DCC6A, #20AA50)", desc: "Читаем и пишем" },
  { id: "world", emoji: "🌍", title: "Мир вокруг", color: "#2DC4BA", bg: "linear-gradient(135deg, #2DC4BA, #1A9990)", desc: "Природа и наука" },
  { id: "logic", emoji: "🧩", title: "Логика", color: "#9B6DFF", bg: "linear-gradient(135deg, #9B6DFF, #7040E6)", desc: "Думаем и решаем" },
  { id: "english", emoji: "🇬🇧", title: "Английский", color: "#FF6B5B", bg: "linear-gradient(135deg, #FF6B5B, #E64A3A)", desc: "Hello world!" },
  { id: "art", emoji: "🎨", title: "Творчество", color: "#FFD700", bg: "linear-gradient(135deg, #FFD700, #FFA500)", desc: "Рисуем и лепим" },
];

// Simple math quiz question
const questions = [
  { q: "Сколько будет 2 + 3?", answer: "5", options: ["4", "5", "6", "7"] },
  { q: "Сколько будет 4 + 2?", answer: "6", options: ["5", "6", "7", "8"] },
  { q: "Сколько будет 7 - 3?", answer: "4", options: ["3", "4", "5", "6"] },
  { q: "Сколько будет 3 × 2?", answer: "6", options: ["5", "6", "7", "8"] },
];

interface TrainingProps {
  onBack: () => void;
  onNavigate?: (screen: Screen) => void;
  onEarnGems?: (amount: number) => void;
}

export default function Training({ onBack, onEarnGems }: TrainingProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[questionIdx];

  const handleAnswer = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    const isCorrect = opt === q.answer;
    setCorrect(isCorrect);
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (questionIdx + 1 < questions.length) {
        setQuestionIdx((i) => i + 1);
        setSelected(null);
        setCorrect(null);
      } else {
        setFinished(true);
        if (onEarnGems) onEarnGems(score + (isCorrect ? 1 : 0));
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setActiveCategory(null);
    setQuestionIdx(0);
    setSelected(null);
    setCorrect(null);
    setScore(0);
    setFinished(false);
  };

  // Category selection
  if (!activeCategory) {
    return (
      <div className="min-h-screen flex flex-col"
        style={{ background: "linear-gradient(160deg, #d0f4de 0%, #e8f5e9 100%)" }}
      >
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-white/80 flex items-center justify-center text-teal-dark font-black text-lg hover:scale-110 active:scale-95 transition-transform shadow-md"
          >
            ←
          </button>
          <h1 className="text-2xl font-black text-teal-dark">💪 Тренировка</h1>
        </div>

        <div className="flex-1 px-4 py-2 overflow-y-auto">
          <p className="text-teal-dark/70 font-semibold text-sm mb-4 text-center">
            Выбери предмет для тренировки!
          </p>
          <div className="grid grid-cols-2 gap-4 pb-6">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="rounded-3xl p-4 flex flex-col items-center gap-2 text-white transition-all duration-200 hover:scale-105 active:scale-95 animate-pop-in"
                style={{
                  background: cat.bg,
                  boxShadow: `0 6px 0 ${cat.color}88`,
                  animationDelay: `${i * 0.07}s`,
                }}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="font-black text-sm">{cat.title}</span>
                <span className="text-xs text-white/80">{cat.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Quiz finished
  if (finished) {
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "linear-gradient(160deg, #d0f4de 0%, #e8f5e9 100%)" }}
      >
        <div className="text-center animate-pop-in">
          <div className="text-6xl mb-4">{pct >= 75 ? "🎉" : pct >= 50 ? "👍" : "💪"}</div>
          <h2 className="text-3xl font-black text-teal-dark mb-2">
            {pct >= 75 ? "Отлично!" : pct >= 50 ? "Хорошо!" : "Продолжай!"}
          </h2>
          <p className="text-teal-dark/70 font-semibold mb-2">
            Правильных ответов: {score} из {total}
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-2xl">💎</span>
            <span className="text-xl font-black text-teal-dark">+{score} кристалла!</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={resetQuiz}
              className="game-btn px-6 py-3 text-white font-black rounded-2xl"
              style={{ background: "linear-gradient(135deg, #2DC4BA, #1A9990)" }}
            >
              Ещё раз! 🔄
            </button>
            <button
              onClick={onBack}
              className="game-btn px-6 py-3 text-white font-black rounded-2xl"
              style={{ background: "linear-gradient(135deg, #9B6DFF, #7040E6)" }}
            >
              В комнату 🏠
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz active
  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #d0f4de 0%, #e8f5e9 100%)" }}
    >
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={resetQuiz}
          className="w-10 h-10 rounded-2xl bg-white/80 flex items-center justify-center text-teal-dark font-black text-lg hover:scale-110 active:scale-95 transition-transform shadow-md"
        >
          ←
        </button>
        <h1 className="text-2xl font-black text-teal-dark">
          {categories.find(c => c.id === activeCategory)?.emoji} Математика
        </h1>
        <div className="ml-auto text-sm font-bold text-teal-dark/70">
          {questionIdx + 1}/{questions.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 mb-4">
        <div className="h-3 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((questionIdx) / questions.length) * 100}%`,
              background: "linear-gradient(90deg, #2DC4BA, #FFD700)",
            }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Question card */}
        <div
          className="w-full max-w-sm rounded-3xl p-6 mb-6 text-center animate-fade-in-scale"
          style={{
            background: "white",
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          }}
        >
          <div className="text-4xl mb-3">🤔</div>
          <p className="text-xl font-black text-teal-dark">{q.q}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {q.options.map((opt) => {
            let bg = "linear-gradient(135deg, #2DC4BA, #1A9990)";
            if (selected) {
              if (opt === q.answer) bg = "linear-gradient(135deg, #3DCC6A, #20AA50)";
              else if (opt === selected && !correct) bg = "linear-gradient(135deg, #FF6B5B, #E64A3A)";
              else bg = "linear-gradient(135deg, #aaa, #888)";
            }
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={!!selected}
                className="game-btn py-4 text-xl font-black text-white rounded-2xl transition-all"
                style={{ background: bg }}
              >
                {opt}
                {selected && opt === q.answer && " ✓"}
                {selected && opt === selected && !correct && " ✗"}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
