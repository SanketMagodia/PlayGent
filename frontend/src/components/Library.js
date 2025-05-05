// Library.js
import React, { useEffect, useState } from "react";
import { fetchGames } from "../api/games";
import GameCard from "./GameCard";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import FullScreenLoading from "../loadingScreen";

export default function Library() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { dark } = useTheme();

  useEffect(() => {
    fetchGames().then(data => {
      setGames(data.games);
      setLoading(false);
    });
  }, []);

  const handlePlay = (gameName) => {
    navigate(`/emulator/${encodeURIComponent(gameName)}`);
  };

  if (loading) return <FullScreenLoading />;

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 8px" }}>
      <h2 style={{
        fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
        fontWeight: 800,
        color: dark ? "#67e8f9" : "#2563eb",
        marginBottom: 24
      }}>
        Game Library
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 18
      }}>
        {games.map(game => (
          <GameCard key={game} game={game} onPlay={() => handlePlay(game)} />
        ))}
      </div>
    </div>
  );
}
