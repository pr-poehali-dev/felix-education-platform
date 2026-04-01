import { useState } from "react";
import AgeSelect from "./AgeSelect";
import FelixRoom from "./FelixRoom";
import Adventure from "./sections/Adventure";
import Training from "./sections/Training";
import Shop from "./sections/Shop";
import Rewards from "./sections/Rewards";
import Settings from "./sections/Settings";

type Screen = "age" | "room" | "adventure" | "training" | "shop" | "rewards" | "settings";

const STORAGE_KEY = "felix_game_state";

interface GameState {
  age: string;
  gems: number;
  screen: Screen;
}

const defaultState: GameState = {
  age: "",
  gems: 87,
  screen: "age",
};

export default function Index() {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as GameState;
    } catch (_) {
      // ignore
    }
    return defaultState;
  });

  const { age, gems, screen } = state;

  const updateState = (partial: Partial<GameState>) => {
    setState((prev) => {
      const next = { ...prev, ...partial };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (_) {
        // ignore
      }
      return next;
    });
  };

  const navigate = (s: Screen) => updateState({ screen: s });

  const handleAgeSelect = (selectedAge: string) => {
    updateState({ age: selectedAge, screen: "room" });
  };

  const handleEarnGems = (amount: number) => {
    updateState({ gems: gems + amount });
  };

  const handleBuy = (price: number) => {
    updateState({ gems: Math.max(0, gems - price) });
  };

  const handleChangeAge = () => {
    updateState({ age: "", screen: "age", gems: defaultState.gems });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {
      // ignore
    }
  };

  // Show age select if no age
  if (!age || screen === "age") {
    return <AgeSelect onSelect={handleAgeSelect} />;
  }

  if (screen === "adventure") {
    return <Adventure onBack={() => navigate("room")} />;
  }

  if (screen === "training") {
    return (
      <Training
        onBack={() => navigate("room")}
        onEarnGems={handleEarnGems}
      />
    );
  }

  if (screen === "shop") {
    return (
      <Shop
        onBack={() => navigate("room")}
        gems={gems}
        onBuy={handleBuy}
      />
    );
  }

  if (screen === "rewards") {
    return <Rewards onBack={() => navigate("room")} />;
  }

  if (screen === "settings") {
    return (
      <Settings
        onBack={() => navigate("room")}
        age={age}
        onChangeAge={handleChangeAge}
      />
    );
  }

  // Default: Felix's room
  return (
    <FelixRoom
      age={age}
      gems={gems}
      onNavigate={(s) => navigate(s as Screen)}
    />
  );
}