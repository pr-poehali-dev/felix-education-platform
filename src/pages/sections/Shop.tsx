import { useState } from "react";

type Screen = "room" | "adventure" | "training" | "shop" | "rewards" | "settings";

const shopItems = [
  { id: 1, emoji: "🎩", title: "Волшебная шляпа", price: 50, category: "hat", owned: false },
  { id: 2, emoji: "🌈", title: "Радужный шарф", price: 30, category: "accessory", owned: false },
  { id: 3, emoji: "⚡", title: "Суперсила", price: 80, category: "power", owned: false },
  { id: 4, emoji: "🎸", title: "Гитара знаний", price: 100, category: "toy", owned: false },
  { id: 5, emoji: "🔭", title: "Телескоп", price: 60, category: "toy", owned: true },
  { id: 6, emoji: "🧪", title: "Набор химика", price: 75, category: "toy", owned: false },
  { id: 7, emoji: "🦋", title: "Крылья бабочки", price: 45, category: "accessory", owned: false },
  { id: 8, emoji: "🎯", title: "Меткий глаз", price: 90, category: "power", owned: false },
];

interface ShopProps {
  onBack: () => void;
  onNavigate?: (screen: Screen) => void;
  gems: number;
  onBuy?: (price: number) => void;
}

export default function Shop({ onBack, gems, onBuy }: ShopProps) {
  const [owned, setOwned] = useState<number[]>([5]);
  const [notification, setNotification] = useState<string | null>(null);

  const handleBuy = (item: typeof shopItems[0]) => {
    if (owned.includes(item.id)) return;
    if (gems < item.price) {
      setNotification("Недостаточно 💎 кристаллов!");
      setTimeout(() => setNotification(null), 2000);
      return;
    }
    setOwned((prev) => [...prev, item.id]);
    if (onBuy) onBuy(item.price);
    setNotification(`${item.emoji} ${item.title} куплено!`);
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #e8d5ff 0%, #f0e8ff 100%)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white/80 flex items-center justify-center text-purple-700 font-black text-lg hover:scale-110 active:scale-95 transition-transform shadow-md"
        >
          ←
        </button>
        <h1 className="text-2xl font-black text-purple-700">🛍️ Магазин</h1>
        <div className="ml-auto flex items-center gap-1 bg-white/80 rounded-2xl px-3 py-1.5 shadow">
          <span className="text-lg">💎</span>
          <span className="font-black text-purple-700">{gems}</span>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="mx-4 mb-2 bg-white rounded-2xl px-4 py-3 text-center font-bold text-purple-700 animate-pop-in shadow-lg border-2 border-purple-200">
          {notification}
        </div>
      )}

      <p className="text-center text-purple-600/70 font-semibold text-sm mb-3">
        Трать кристаллы на крутые вещи! ✨
      </p>

      {/* Items grid */}
      <div className="flex-1 px-4 overflow-y-auto pb-6">
        <div className="grid grid-cols-2 gap-4">
          {shopItems.map((item, i) => {
            const isOwned = owned.includes(item.id);
            const canAfford = gems >= item.price;
            return (
              <button
                key={item.id}
                onClick={() => handleBuy(item)}
                disabled={isOwned}
                className={`
                  rounded-3xl p-4 flex flex-col items-center gap-2 text-center
                  transition-all duration-200 animate-pop-in
                  ${isOwned ? "opacity-80" : canAfford ? "hover:scale-105 active:scale-95" : "opacity-60"}
                  bg-white
                `}
                style={{
                  boxShadow: isOwned
                    ? "0 4px 0 #9B6DFF88"
                    : canAfford
                    ? "0 6px 0 #9B6DFF66"
                    : "0 3px 0 rgba(0,0,0,0.1)",
                  animationDelay: `${i * 0.07}s`,
                  border: isOwned ? "3px solid #9B6DFF" : "3px solid transparent",
                }}
              >
                <span className="text-4xl">{item.emoji}</span>
                <span className="font-black text-sm text-purple-700">{item.title}</span>
                {isOwned ? (
                  <span className="text-xs font-bold text-green-500 bg-green-100 px-2 py-0.5 rounded-full">
                    ✓ Куплено
                  </span>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-sm">💎</span>
                    <span className={`text-sm font-black ${canAfford ? "text-teal-dark" : "text-red-400"}`}>
                      {item.price}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
