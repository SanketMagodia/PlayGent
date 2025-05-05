// Home.js
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { FaGamepad } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const { dark } = useTheme();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "calc(100vh - 100px)",
      textAlign: "center",
      padding: "0 12px"
    }}>
      <FaGamepad size={60} color={dark ? " #67e8f9" : " #2563eb"} style={{ marginBottom: 18 }} />
      <h1 style={{
        fontSize: "clamp(2rem, 6vw, 3rem)",
        fontWeight: 900,
        marginBottom: 10,
        color: dark ? "#67e8f9" : "#2563eb",
        letterSpacing: 1
      }}>
        Welcome to PlayQuest!
      </h1>
      <p style={{
        fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
        color: dark ? "#e0e7ff" : "#334155",
        maxWidth: 600,
        margin: "0 auto 30px"
      }}>
        <b>PlayQuest</b> is the ultimate platform for Game Boy Advance lovers.<br />
        Enjoy your favorite GBA games right in your browser, save your progress, and continue on any device.<br />
        <span style={{ color: "#fbbf24" }}>No downloads. No ads. Just pure retro gaming fun!</span>
      </p>
      <button
        onClick={() => navigate("/library")}
        style={{
          background: "linear-gradient(90deg,#67e8f9 0%,#38bdf8 100%)",
          color: "#222",
          border: "none",
          borderRadius: 12,
          fontSize: "clamp(1.1rem, 4vw, 1.5rem)",
          fontWeight: 700,
          padding: "14px 36px",
          cursor: "pointer",
          boxShadow: "0 4px 24px #38bdf880",
          marginTop: 12,
          transition: "background 0.2s"
        }}
      >
        🎮 Explore Games
      </button>
    </div>
  );
}
