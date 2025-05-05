import { FaGamepad } from "react-icons/fa";
import { useTheme } from "../ThemeContext";

// Palette of dark, vibrant colors (dark orange, red, green, blue, violet, etc)
function stringToAccent(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const palette = [
    "#d97706", // dark orange
    "#b91c1c", // dark red
    "#047857", // dark green
    "#1d4ed8", // dark blue
    "#7c3aed", // dark violet
    "#be185d", // dark pink
    "#059669", // emerald
    "#ea580c", // burnt orange
    "#a21caf", // deep purple
    "#0e7490", // cyan
  ];
  return palette[Math.abs(hash) % palette.length];
}

export default function GameCard({ game, onPlay }) {
  const { dark } = useTheme();
  const accent = stringToAccent(game);

  return (
    <div
      style={{
        background: "transparent",
        borderRadius: 22,
        boxShadow: dark
          ? `0 4px 32px ${accent}33, 0 2px 8px #0008`
          : `0 4px 32px ${accent}22, 0 2px 8px #b6c6e822`,
        padding: "28px 14px 22px",
        minHeight: 200,
        minWidth: 160,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // This makes the button stick to the bottom
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        border: `3.5px solid ${accent}`,
        outline: "none",
        transition: "box-shadow 0.2s, transform 0.18s, border 0.2s",
        userSelect: "none"
      }}
      tabIndex={0}
      onClick={onPlay}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") onPlay();
      }}
      aria-label={`Play ${game}`}
      className="game-card"
    >
      {/* Optional: subtle glassy overlay */}
      <div style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        borderRadius: 22,
        background: dark
          ? "linear-gradient(120deg,rgba(255,255,255,0.03) 0%,rgba(0,0,0,0.12) 100%)"
          : "linear-gradient(120deg,rgba(255,255,255,0.10) 0%,rgba(0,0,0,0.03) 100%)",
        zIndex: 1,
      }}/>
      <div style={{zIndex: 2, width: "100%", flex: 1, display: "flex", flexDirection: "column", alignItems: "center"}}>
        <FaGamepad
          size={40}
          color={accent}
          style={{
            marginBottom: 12,
            filter: `drop-shadow(0 2px 10px ${accent}66)`,
          }}
        />
        <div
          style={{
            fontWeight: 800,
            fontSize: "clamp(1.1rem, 3vw, 1.22rem)",
            color: dark ? "#fff" : "#181c2a",
            textAlign: "center",
            marginBottom: 14,
            wordBreak: "break-word",
            letterSpacing: 0.5,
            textShadow: dark ? "0 2px 8px #0008" : "0 2px 8px #fff6",
            lineHeight: 1.2,
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {game}
        </div>
      </div>
      <button
        tabIndex={-1}
        style={{
          background: `linear-gradient(90deg, ${accent} 0%, #181c2a 100%)`,
          color: "#fff",
          border: "none",
          borderRadius: 999,
          fontWeight: 700,
          fontSize: "clamp(0.98rem, 2vw, 1.09rem)",
          padding: "9px 26px",
          cursor: "pointer",
          boxShadow: `0 2px 8px ${accent}44`,
          transition: "background 0.2s, transform 0.15s",
          letterSpacing: 1,
          textShadow: "0 2px 8px #0002",
          outline: "none",
          zIndex: 2,
          alignSelf: "stretch", // Makes button fill width if you want, or remove for auto
          marginTop: "auto",
        }}
        onClick={e => {
          e.stopPropagation();
          onPlay();
        }}
        onKeyDown={e => e.stopPropagation()}
      >
        ▶ Play
      </button>
      <style>{`
        .game-card:hover, .game-card:focus {
          transform: translateY(-2px) scale(1.025);
          box-shadow: 0 8px 32px ${accent}55, 0 2px 12px #0008;
          border-color: #fff;
        }
        .game-card:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
