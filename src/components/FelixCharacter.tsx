import { useEffect, useRef, useState } from "react";

type FelixState = "idle" | "wave" | "talk" | "happy";

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

  const scale = size / 220;

  // Reference colors: gray striped cat, teal collar, gold star, green eyes
  const bodyColor = "#C8C8C8";        // light gray body
  const bellyColor = "#E8E8E8";       // lighter belly/chest
  const stripeColor = "#6B6B6B";      // dark gray stripes
  const earInner = "#FFB8B8";         // pink inner ear
  const noseColor = "#E8825A";        // orange-red nose
  const collarColor = "#2DC4BA";      // teal collar
  const starColor = "#FFD700";        // gold star
  const eyeIris = "#4DB84A";          // green iris
  const eyePupil = "#1a1a1a";         // dark pupil
  const pawPadColor = "#FFB8B8";      // pink paw pads

  const isHappy = state === "happy";
  const isWave = state === "wave";

  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 220 242"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer select-none ${className}`}
      onClick={onClick}
      style={{ overflow: "visible", filter: "drop-shadow(0 10px 28px rgba(45,196,186,0.30))" }}
    >
      {/* ── TAIL ── */}
      <g
        style={{
          transformOrigin: "165px 195px",
          animation: state === "idle" ? "felix-tail 3s ease-in-out infinite" : "none",
        }}
      >
        <path
          d="M162 200 Q190 185 198 160 Q205 135 188 128 Q174 124 170 142 Q163 162 158 175"
          stroke={bodyColor}
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        {/* Tail stripes */}
        <path
          d="M162 200 Q190 185 198 160 Q205 135 188 128 Q174 124 170 142 Q163 162 158 175"
          stroke={stripeColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="10 9"
          fill="none"
          opacity="0.7"
        />
      </g>

      {/* ── BODY ── */}
      <g
        style={{
          transformOrigin: "110px 170px",
          animation:
            state === "idle"
              ? "felix-body-idle 3s ease-in-out infinite"
              : isWave || isHappy
              ? "felix-body-wave 0.5s ease-in-out infinite alternate"
              : "none",
        }}
      >
        {/* Body main */}
        <ellipse cx="110" cy="172" rx="48" ry="44" fill={bodyColor} />
        {/* Belly / chest (lighter) */}
        <ellipse cx="110" cy="178" rx="30" ry="30" fill={bellyColor} />

        {/* Body stripes - left side */}
        <path d="M74 155 Q80 144 87 152" stroke={stripeColor} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.75" />
        <path d="M70 168 Q77 157 84 165" stroke={stripeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
        {/* Body stripes - right side */}
        <path d="M146 155 Q140 144 133 152" stroke={stripeColor} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.75" />
        <path d="M150 168 Q143 157 136 165" stroke={stripeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />

        {/* ── TEAL COLLAR ── */}
        <path
          d="M76 178 Q110 188 144 178"
          stroke={collarColor}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        {/* Collar shine */}
        <path
          d="M78 174 Q110 183 142 174"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* ── GOLD STAR MEDAL ── */}
        <g transform="translate(110, 190)">
          {/* Star shape */}
          <polygon
            points="0,-10 2.9,-4 9.5,-3.1 4.8,1.5 5.9,8.1 0,5 -5.9,8.1 -4.8,1.5 -9.5,-3.1 -2.9,-4"
            fill={starColor}
            stroke="#E6A800"
            strokeWidth="0.8"
          />
          {/* Star shine */}
          <ellipse cx="-2" cy="-5" rx="2" ry="1.5" fill="rgba(255,255,255,0.5)" transform="rotate(-25)" />
        </g>

        {/* ── LEFT ARM (wave or happy = raised) ── */}
        {isHappy ? (
          <g
            style={{
              transformOrigin: "75px 162px",
              animation: "felix-wave-arm 0.45s ease-in-out infinite alternate",
            }}
          >
            <path
              d="M78 165 Q58 140 52 112"
              stroke={bodyColor}
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            {/* Paw */}
            <circle cx="50" cy="108" r="12" fill={bodyColor} />
            <circle cx="43" cy="100" r="6" fill={bodyColor} />
            <circle cx="54" cy="98" r="6" fill={bodyColor} />
            <circle cx="61" cy="104" r="6" fill={bodyColor} />
            {/* Paw pads */}
            <ellipse cx="50" cy="111" rx="5" ry="3.5" fill={pawPadColor} />
            <circle cx="44" cy="106" r="2" fill={pawPadColor} />
            <circle cx="50" cy="104" r="2" fill={pawPadColor} />
            <circle cx="56" cy="106" r="2" fill={pawPadColor} />
          </g>
        ) : (
          <g>
            <path
              d="M78 168 Q64 178 56 192"
              stroke={bodyColor}
              strokeWidth="15"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="53" cy="196" r="11" fill={bodyColor} />
          </g>
        )}

        {/* ── RIGHT ARM (wave = raised, happy = raised) ── */}
        {isWave || isHappy ? (
          <g
            style={{
              transformOrigin: "145px 162px",
              animation: "felix-wave-arm 0.45s ease-in-out infinite alternate",
            }}
          >
            <path
              d="M142 165 Q162 140 168 112"
              stroke={bodyColor}
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            {/* Paw */}
            <circle cx="170" cy="108" r="12" fill={bodyColor} />
            <circle cx="163" cy="100" r="6" fill={bodyColor} />
            <circle cx="174" cy="98" r="6" fill={bodyColor} />
            <circle cx="181" cy="104" r="6" fill={bodyColor} />
            {/* Paw pads */}
            <ellipse cx="170" cy="111" rx="5" ry="3.5" fill={pawPadColor} />
            <circle cx="164" cy="106" r="2" fill={pawPadColor} />
            <circle cx="170" cy="104" r="2" fill={pawPadColor} />
            <circle cx="176" cy="106" r="2" fill={pawPadColor} />
          </g>
        ) : (
          <g>
            <path
              d="M142 168 Q156 178 164 192"
              stroke={bodyColor}
              strokeWidth="15"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="167" cy="196" r="11" fill={bodyColor} />
          </g>
        )}

        {/* ── FEET ── */}
        <ellipse cx="92" cy="212" rx="16" ry="10" fill={bodyColor} />
        <ellipse cx="128" cy="212" rx="16" ry="10" fill={bodyColor} />
        {/* Foot pads */}
        <ellipse cx="92" cy="214" rx="10" ry="6" fill={bellyColor} opacity="0.8" />
        <ellipse cx="128" cy="214" rx="10" ry="6" fill={bellyColor} opacity="0.8" />
        {/* Toe lines */}
        <path d="M86 211 Q92 208 98 211" stroke={stripeColor} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
        <path d="M122 211 Q128 208 134 211" stroke={stripeColor} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />

        {/* ── HEAD ── */}
        <g>
          {/* LEFT EAR */}
          <path d="M72 92 Q60 60 78 52 Q88 64 86 84 Z" fill={bodyColor} />
          <path d="M74 90 Q65 65 79 58 Q86 68 85 83 Z" fill={earInner} opacity="0.8" />
          {/* Ear stripe */}
          <path d="M75 87 Q69 70 76 62" stroke={stripeColor} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

          {/* RIGHT EAR */}
          <path d="M148 92 Q160 60 142 52 Q132 64 134 84 Z" fill={bodyColor} />
          <path d="M146 90 Q155 65 141 58 Q134 68 135 83 Z" fill={earInner} opacity="0.8" />
          {/* Ear stripe */}
          <path d="M145 87 Q151 70 144 62" stroke={stripeColor} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

          {/* HEAD */}
          <ellipse cx="110" cy="105" rx="44" ry="40" fill={bodyColor} />

          {/* Forehead stripes - 3 lines like reference */}
          <path d="M96 72 Q99 65 102 72" stroke={stripeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M108 70 Q110 63 112 70" stroke={stripeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M120 72 Q123 65 126 72" stroke={stripeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />

          {/* Cheek fluff */}
          <ellipse cx="76" cy="112" rx="12" ry="9" fill={bellyColor} opacity="0.55" />
          <ellipse cx="144" cy="112" rx="12" ry="9" fill={bellyColor} opacity="0.55" />

          {/* Side stripes on cheeks */}
          <path d="M68 105 Q74 110 70 116" stroke={stripeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
          <path d="M152 105 Q146 110 150 116" stroke={stripeColor} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />

          {/* ── EYES ── */}
          {isHappy ? (
            // Happy closed eyes (squint/laugh)
            <>
              {/* Left eye closed arc */}
              <path d="M92 98 Q100 110 108 98" stroke={stripeColor} strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {/* Right eye closed arc */}
              <path d="M112 98 Q120 110 128 98" stroke={stripeColor} strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              {/* Left eye */}
              <ellipse cx="96" cy="100" rx="12" ry={blinkOpen ? 12 : 2} fill="white" />
              {blinkOpen && (
                <>
                  <circle cx="96" cy="100" r="8" fill={eyeIris} />
                  <circle cx="96" cy="100" r="4.5" fill={eyePupil} />
                  <circle cx="99" cy="96" r="2.5" fill="white" />
                  <circle cx="92" cy="103" r="1.2" fill="white" opacity="0.6" />
                </>
              )}

              {/* Right eye */}
              <ellipse cx="124" cy="100" rx="12" ry={blinkOpen ? 12 : 2} fill="white" />
              {blinkOpen && (
                <>
                  <circle cx="124" cy="100" r="8" fill={eyeIris} />
                  <circle cx="124" cy="100" r="4.5" fill={eyePupil} />
                  <circle cx="127" cy="96" r="2.5" fill="white" />
                  <circle cx="120" cy="103" r="1.2" fill="white" opacity="0.6" />
                </>
              )}
            </>
          )}

          {/* ── NOSE ── */}
          <path d="M105 118 L110 113 L115 118 Q110 122 105 118 Z" fill={noseColor} />
          {/* Nose shine */}
          <ellipse cx="108" cy="115" rx="2" ry="1.2" fill="rgba(255,255,255,0.6)" />

          {/* Philtrum */}
          <path d="M110 122 L110 126" stroke={stripeColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

          {/* ── MOUTH ── */}
          {isHappy || mouthOpen ? (
            <>
              {/* Open smile with teeth */}
              <path d="M96 126 Q110 140 124 126" fill="#C84040" />
              <path d="M96 126 Q110 138 124 126" fill="#E85050" />
              {/* Teeth */}
              <rect x="104" y="126" width="6" height="5" rx="1" fill="white" />
              <rect x="110" y="126" width="6" height="5" rx="1" fill="white" />
              {/* Tongue */}
              <ellipse cx="110" cy="134" rx="7" ry="5" fill="#FF6B7A" />
            </>
          ) : (
            /* Closed smile */
            <path
              d="M96 126 Q103 132 110 130 Q117 132 124 126"
              stroke={stripeColor}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
          )}

          {/* ── WHISKERS ── */}
          {/* Left whiskers */}
          <line x1="56" y1="112" x2="88" y2="117" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="54" y1="120" x2="87" y2="122" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="58" y1="128" x2="88" y2="126" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Right whiskers */}
          <line x1="164" y1="112" x2="132" y2="117" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="166" y1="120" x2="133" y2="122" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="162" y1="128" x2="132" y2="126" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
