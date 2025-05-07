import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { useTheme } from "../ThemeContext";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// --- GameCard.js ---
import { useTheme } from "../ThemeContext";
import { fetchGames } from "../api/games"; // Adjust the import path as necessary
import GameCard from "./GameCard";
import FullScreenLoading from "../loadingScreen"
const PER_PAGE = 12;

export default function Library() {
  const [games, setGames] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const navigate = useNavigate();
  const { dark } = useTheme();
  const searchRef = useRef();

  useEffect(() => {
    setLoading(true);
    
    // Add a minimum delay of 2 seconds
    const minDelay = new Promise(resolve => setTimeout(resolve, 1000));
    
    // Fetch games data
    const fetchData = fetchGames({ q, page, per_page: PER_PAGE });
    
    // Wait for both the delay and data fetch to complete
    Promise.all([minDelay, fetchData]).then(([_, data]) => {
      setGames(data.games);
      setTotal(data.total);
      setPages(data.pages);
      setLoading(false);
    });
  }, [q, page]);

  const handlePlay = (gameName) => {
    navigate(`/emulator/${encodeURIComponent(gameName)}`);
  };

  const handleSearch = e => {
    e.preventDefault();
    setPage(1);
    setQ(search.trim());
  };

  if (loading) return (
    <FullScreenLoading />
  );

  return (
    <div style={{
      maxWidth: 1100,
      margin: "0px auto",
      padding: "0 8px",
      fontFamily: "inherit"
    }}>
      <h2 style={{
        fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
        fontWeight: 800,
        color:  (dark ? " #c2410c" : " #2563eb"),
        marginBottom: 18,
        letterSpacing: 1,
        textShadow: dark ? "0 2px 8px #0008" : "0 2px 8px #fff8"
      }}>
        Game Library
      </h2>
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 30,
          maxWidth: 400,
          width: "100%",
          background: dark ? " #232b42" : " #fff7ed",
          borderRadius: 10,
          boxShadow: "0 2px 12px #ff7e1b22",
          padding: "6px 12px"
        }}
      >
        <FaSearch color={dark ? "#ff7e1b" : "#c2410c"} size={18} />
        <input
          ref={searchRef}
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: 18,
            color: dark ? "#fff" : "#c2410c",
            padding: "6px 0",
            fontWeight: 600
          }}
        />
        {q && (
          <button
            type="button"
            onClick={() => { setQ(""); setSearch(""); setPage(1); searchRef.current.focus(); }}
            style={{
              background: "none",
              border: "none",
              color: "#ff7e1b",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              padding: "0 6px"
            }}
          >✕</button>
        )}
      </form>
      {/* Game Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
        gap: 22,
        marginBottom: 28,
        width: "100%",
        justifyItems: "center", // Center items horizontally
        justifyContent: "center", // Center the entire grid
        gridAutoRows: "1fr", // Make all rows the same height
      }}>
        <style>{`
          @media (min-width: 1100px) {
            .game-grid {
              grid-template-columns: repeat(4, 250px); /* Force 4 columns on wide screens */
            }
          }
          @media (min-width: 800px) and (max-width: 1099px) {
            .game-grid {
              grid-template-columns: repeat(3, 250px); /* 3 columns on medium screens */
            }
          }
          @media (min-width: 500px) and (max-width: 799px) {
            .game-grid {
              grid-template-columns: repeat(2, 250px); /* 2 columns on smaller screens */
            }
          }
          @media (max-width: 499px) {
            .game-grid {
              grid-template-columns: repeat(1, 250px); /* 1 column on mobile */
            }
          }
        `}</style>
        {games.length === 0 ? (
          <div style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            color: dark ? "#fff" : "#c2410c",
            fontWeight: 700,
            fontSize: 20,
            opacity: 0.7
          }}>
            No games found.
          </div>
        ) : (
          games.map(game => (
            <GameCard key={game} game={game} onPlay={() => handlePlay(game)} />
          ))
        )}
      </div>
      {/* Pagination */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 18,
        marginTop: 8
      }}>
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          style={{
            background: "none",
            border: "none",
            color: page <= 1 ? "#ccc" : "#ff7e1b",
            fontSize: 22,
            cursor: page <= 1 ? "default" : "pointer",
            padding: 4
          }}
          aria-label="Previous page"
        >
          <FaChevronLeft />
        </button>
        <span style={{
          color: dark ? "#ff7e1b" : "#c2410c",
          fontWeight: 700,
          fontSize: 18
        }}>
          Page {page} / {pages}
        </span>
        <button
          disabled={page >= pages}
          onClick={() => setPage(page + 1)}
          style={{
            background: "none",
            border: "none",
            color: page >= pages ? "#ccc" : "#ff7e1b",
            fontSize: 22,
            cursor: page >= pages ? "default" : "pointer",
            padding: 4
          }}
          aria-label="Next page"
        >
          <FaChevronRight />
        </button>
      </div>
      <div style={{
        textAlign: "center",
        marginTop: 10,
        marginBottom: 20,
        color: dark ? "#fff" : "#c2410c",
        fontSize: 14,
        opacity: 0.7
      }}>
        Showing {games.length} of {total} games
      </div>
    </div>
  );
}





