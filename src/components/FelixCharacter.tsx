import { useEffect, useRef, useState } from "react";

type FelixState = "idle" | "wave" | "talk";

interface FelixCharacterProps {
  state?: FelixState;
  onClick?: () => void;
  size?: number;
  className?: string;
}

export default function FelixCharacter({
  state = "idle",
  onClick,
  size = 200,
  className = "",
}: FelixCharacterProps) {
  const [blinkOpen, setBlinkOpen] = useState(true);
  const [mouthOpen, setMouthOpen] = useState(false);
  const blinkRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mouthRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Blink logic
  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 2000 + Math.random() * 3000;
      blinkRef.current = setTimeout(() => {
        setBlinkOpen(false);
        setTimeout(() => {
          setBlinkOpen(true);
          scheduleBlink();
        }, 150);
      }, delay);
    };
    scheduleBlink();
    return () => {
      if (blinkRef.current) clearTimeout(blinkRef.current);
    };
  }, []);

  // Mouth animation when talking
  useEffect(() => {
    if (state === "talk") {
      mouthRef.current = setInterval(() => {
        setMouthOpen((v) => !v);
      }, 180);
    } else {
      if (mouthRef.current) clearInterval(mouthRef.current);
      setMouthOpen(false);
    }
    return () => {
      if (mouthRef.current) clearInterval(mouthRef.current);
    };
  }, [state]);

  const scale = size / 200;

  // Colors
  const bodyColor = "#F4A742";
  const bellyColor = "#FDE8C0";
  const stripeColor = "#E8863A";
  const earInner = "#FF8FAB";
  const noseColor = "#FF6B6B";
  const eyeColor = "#3A2510";
  const whiskerColor = "#8B6914";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer select-none ${className}`}
      onClick={onClick}
      style={{ overflow: "visible", filter: "drop-shadow(0 8px 24px rgba(45,196,186,0.25))" }}
    >
      {/* ── TAIL ── */}
      <g
        style={{
          transformOrigin: "140px 170px",
          animation: state === "idle" ? "felix-tail 3s ease-in-out infinite" : "none",
        }}
      >
        <path
          d="M140 170 Q175 155 185 130 Q195 105 175 100 Q160 98 155 115 Q148 135 140 145"
          stroke={bodyColor}
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M140 170 Q175 155 185 130 Q195 105 175 100 Q160 98 155 115 Q148 135 140 145"
          stroke={stripeColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="12 10"
          fill="none"
        />
      </g>

      {/* ── BODY ── */}
      <g
        style={{
          transformOrigin: "100px 140px",
          animation:
            state === "idle"
              ? "felix-body-idle 3s ease-in-out infinite"
              : state === "wave"
              ? "felix-body-wave 0.5s ease-in-out infinite alternate"
              : "none",
        }}
      >
        {/* Body main */}
        <ellipse cx="100" cy="148" rx="42" ry="38" fill={bodyColor} />
        {/* Belly */}
        <ellipse cx="100" cy="152" rx="26" ry="26" fill={bellyColor} />
        {/* Body stripes */}
        <path d="M72 130 Q78 122 84 130" stroke={stripeColor} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M116 130 Q122 122 128 130" stroke={stripeColor} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />

        {/* ── WAVE ARM (right) ── */}
        {state === "wave" ? (
          <g
            style={{
              transformOrigin: "130px 140px",
              animation: "felix-wave-arm 0.45s ease-in-out infinite alternate",
            }}
          >
            {/* Upper arm */}
            <path
              d="M128 138 Q148 118 155 95"
              stroke={bodyColor}
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            {/* Paw */}
            <circle cx="157" cy="90" r="12" fill={bodyColor} />
            <circle cx="150" cy="82" r="6" fill={bodyColor} />
            <circle cx="162" cy="80" r="6" fill={bodyColor} />
            <circle cx="168" cy="88" r="6" fill={bodyColor} />
            {/* Paw pads */}
            <ellipse cx="157" cy="93" rx="5" ry="3.5" fill={bellyColor} />
            <circle cx="151" cy="88" r="2" fill={bellyColor} />
            <circle cx="157" cy="86" r="2" fill={bellyColor} />
            <circle cx="163" cy="88" r="2" fill={bellyColor} />
          </g>
        ) : (
          /* Idle right arm */
          <g>
            <path
              d="M128 148 Q142 155 148 165"
              stroke={bodyColor}
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="150" cy="169" r="10" fill={bodyColor} />
          </g>
        )}

        {/* Left arm */}
        <path
          d="M72 148 Q58 155 52 165"
          stroke={bodyColor}
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="50" cy="169" r="10" fill={bodyColor} />

        {/* Feet */}
        <ellipse cx="82" cy="183" rx="14" ry="9" fill={bodyColor} />
        <ellipse cx="118" cy="183" rx="14" ry="9" fill={bodyColor} />
        <ellipse cx="82" cy="185" rx="9" ry="5" fill={bellyColor} />
        <ellipse cx="118" cy="185" rx="9" ry="5" fill={bellyColor} />

        {/* ── HEAD ── */}
        <g>
          {/* Left ear */}
          <path d="M65 72 Q55 45 72 38 Q80 50 78 68 Z" fill={bodyColor} />
          <path d="M67 70 Q60 50 73 45 Q78 54 77 67 Z" fill={earInner} />
          {/* Left ear stripe */}
          <path d="M68 68 Q63 55 70 50" stroke={stripeColor} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

          {/* Right ear */}
          <path d="M135 72 Q145 45 128 38 Q120 50 122 68 Z" fill={bodyColor} />
          <path d="M133 70 Q140 50 127 45 Q122 54 123 67 Z" fill={earInner} />
          <path d="M132 68 Q137 55 130 50" stroke={stripeColor} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

          {/* Head */}
          <ellipse cx="100" cy="85" rx="38" ry="35" fill={bodyColor} />

          {/* Forehead stripes */}
          <path d="M88 57 Q91 52 94 57" stroke={stripeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M100 55 Q100 49 100 55" stroke={stripeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M106 57 Q109 52 112 57" stroke={stripeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />

          {/* Cheek fur circles */}
          <circle cx="70" cy="90" r="10" fill={bellyColor} opacity="0.5" />
          <circle cx="130" cy="90" r="10" fill={bellyColor} opacity="0.5" />

          {/* ── EYES ── */}
          {/* Left eye */}
          <ellipse cx="83" cy="82" rx="10" ry={blinkOpen ? 10 : 2} fill="white" />
          {blinkOpen && (
            <>
              <circle cx="83" cy="82" r="6.5" fill={eyeColor} />
              <circle cx="83" cy="82" r="3.5" fill="#1a0d04" />
              <circle cx="86" cy="79" r="2" fill="white" />
              <circle cx="80" cy="85" r="1" fill="white" opacity="0.6" />
            </>
          )}

          {/* Right eye */}
          <ellipse cx="117" cy="82" rx="10" ry={blinkOpen ? 10 : 2} fill="white" />
          {blinkOpen && (
            <>
              <circle cx="117" cy="82" r="6.5" fill={eyeColor} />
              <circle cx="117" cy="82" r="3.5" fill="#1a0d04" />
              <circle cx="120" cy="79" r="2" fill="white" />
              <circle cx="114" cy="85" r="1" fill="white" opacity="0.6" />
            </>
          )}

          {/* ── NOSE ── */}
          <ellipse cx="100" cy="96" rx="5" ry="3.5" fill={noseColor} />
          {/* Nose shine */}
          <ellipse cx="98.5" cy="94.5" rx="1.5" ry="1" fill="white" opacity="0.7" />

          {/* Philtrum */}
          <path d="M100 99 L100 103" stroke={stripeColor} strokeWidth="1.5" strokeLinecap="round" />

          {/* ── MOUTH ── */}
          {mouthOpen ? (
            <>
              <path d="M88 103 Q100 118 112 103" fill="#C0392B" />
              <path d="M90 103 Q100 115 110 103 Q100 110 90 103Z" fill="#E74C3C" />
              {/* Tongue */}
              <ellipse cx="100" cy="112" rx="7" ry="4" fill="#E91E63" />
              {/* Teeth */}
              <rect x="95" y="103" width="6" height="4" rx="1" fill="white" />
            </>
          ) : (
            <path
              d="M88 103 Q94 110 100 108 Q106 110 112 103"
              stroke={stripeColor}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* ── WHISKERS ── */}
          {/* Left whiskers */}
          <line x1="62" y1="91" x2="82" y2="93" stroke={whiskerColor} strokeWidth="1.2" opacity="0.6" />
          <line x1="60" y1="95" x2="81" y2="96" stroke={whiskerColor} strokeWidth="1.2" opacity="0.6" />
          <line x1="62" y1="99" x2="82" y2="99" stroke={whiskerColor} strokeWidth="1.2" opacity="0.6" />
          {/* Right whiskers */}
          <line x1="118" y1="93" x2="138" y2="91" stroke={whiskerColor} strokeWidth="1.2" opacity="0.6" />
          <line x1="119" y1="96" x2="140" y2="95" stroke={whiskerColor} strokeWidth="1.2" opacity="0.6" />
          <line x1="118" y1="99" x2="138" y2="99" stroke={whiskerColor} strokeWidth="1.2" opacity="0.6" />
        </g>
      </g>

      {/* ── CSS ANIMATIONS ── */}
      <style>{`
        @keyframes felix-body-idle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-4px) rotate(0.5deg); }
          75% { transform: translateY(-2px) rotate(-0.5deg); }
        }
        @keyframes felix-body-wave {
          0% { transform: translateY(0px) rotate(-1deg); }
          100% { transform: translateY(-3px) rotate(1deg); }
        }
        @keyframes felix-wave-arm {
          0% { transform: rotate(-20deg) translateY(0px); }
          100% { transform: rotate(20deg) translateY(-8px); }
        }
        @keyframes felix-tail {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
      `}</style>
    </svg>
  );
}
