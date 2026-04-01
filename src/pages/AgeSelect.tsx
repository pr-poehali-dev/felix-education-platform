import { useState } from "react";

const felixUrl = "https://cdn.poehali.dev/projects/feb7d517-61be-4268-a08e-6633bf1c3a57/bucket/f656c815-c777-43cd-8cb7-d4ffd86a5e6c.png";

const ageGroups = [
  {
    age: "4–5",
    label: "лет",
    emoji: "🌱",
    color: "from-green-400 to-teal",
    bg: "bg-green-400",
    shadow: "shadow-green-300",
    desc: "Самые маленькие",
  },
  {
    age: "6–7",
    label: "лет",
    emoji: "⭐",
    color: "from-teal to-teal-dark",
    bg: "bg-teal",
    shadow: "shadow-teal",
    desc: "Первоклассники",
  },
  {
    age: "8–9",
    label: "лет",
    emoji: "🚀",
    color: "from-purple-400 to-purple",
    bg: "bg-purple-500",
    shadow: "shadow-purple-300",
    desc: "Знатоки",
  },
  {
    age: "10+",
    label: "лет",
    emoji: "🏆",
    color: "from-coral to-coral-dark",
    bg: "bg-coral",
    shadow: "shadow-orange-300",
    desc: "Чемпионы",
  },
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

  const handleSelect = (age: string) => {
    setSelected(age);
    setTimeout(() => onSelect(age), 400);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #b2f0eb 0%, #e0faf8 40%, #c8f0e8 100%)",
      }}
    >
      {/* Decorative background circles */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-30 blur-2xl"
        style={{ background: "#FFD700" }} />
      <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 rounded-full opacity-25 blur-2xl"
        style={{ background: "#9B6DFF" }} />
      <div className="absolute top-[30%] right-[5%] w-40 h-40 rounded-full opacity-20 blur-xl"
        style={{ background: "#FF6B5B" }} />

      {/* Floating sparkles */}
      <Sparkle style={{ top: "12%", left: "8%", animationDelay: "0s" }} />
      <Sparkle style={{ top: "20%", right: "12%", animationDelay: "0.7s" }} />
      <Sparkle style={{ bottom: "25%", left: "15%", animationDelay: "1.4s" }} />
      <Sparkle style={{ bottom: "15%", right: "20%", animationDelay: "0.3s" }} />
      <Sparkle style={{ top: "55%", left: "5%", animationDelay: "1s" }} />
      <Sparkle style={{ top: "40%", right: "6%", animationDelay: "0.5s" }} />

      {/* Felix mascot */}
      <div className="relative mb-4 animate-bounce-soft">
        <img
          src={felixUrl}
          alt="Феликс"
          className="w-48 h-auto drop-shadow-2xl"
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Title */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-dark mb-2"
          style={{ fontFamily: 'Nunito, sans-serif', textShadow: '0 2px 8px rgba(45,196,186,0.2)' }}
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
            className={`
              game-btn relative flex flex-col items-center justify-center py-5 px-4
              bg-white/90 border-4 transition-all duration-300
              ${selected === group.age
                ? "scale-95 border-teal"
                : "border-white hover:border-teal-light"
              }
              animate-pop-in
            `}
            style={{
              animationDelay: `${i * 0.1}s`,
              boxShadow: selected === group.age
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
    </div>
  );
}
