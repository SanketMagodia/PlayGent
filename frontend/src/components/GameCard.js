// GameCard.js
import { FaGamepad } from "react-icons/fa";
import { useTheme } from "../ThemeContext";

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return `hsl(${hash % 360},70%,60%)`;
}

export default function GameCard({ game, onPlay }) {
  const { dark } = useTheme();
  const bg = stringToColor(game);

  return (
    <div style={{
      background: dark
        ? `linear-gradient(135deg,${bg} 0%,#232b42 100%)`
        : `linear-gradient(135deg,${bg} 0%,#e0e7ff 100%)`,
      borderRadius: 16,
      boxShadow: "0 4px 24px #0002",
      padding: "24px 8px 18px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: 130,
      transition: "background 0.2s"
    }}>
      <FaGamepad size={30} color={dark ? "#fff" : "#2563eb"} style={{ marginBottom: 10 }} />
      <div style={{
        fontWeight: 800,
        fontSize: "clamp(1rem, 3vw, 1.2rem)",
        color: dark ? "#fff" : "#222",
        textAlign: "center",
        marginBottom: 12,
        wordBreak: "break-word"
      }}>
        {game}
      </div>
      <button
        onClick={onPlay}
        style={{
          background: "linear-gradient(90deg,#67e8f9 0%,#38bdf8 100%)",
          color: "#222",
          border: "none",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
          padding: "7px 20px",
          cursor: "pointer",
          boxShadow: "0 2px 8px #38bdf880",
          transition: "background 0.2s"
        }}
      >
        ▶ Play
      </button>
    </div>
  );
}
