import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { useTheme } from "../ThemeContext";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// --- GameCard.js ---
import { FaGamepad } from "react-icons/fa";
import { useTheme } from "../ThemeContext";
import { fetchGames } from "../api/games"; // Adjust the import path as necessary
import GameCard from "./GameCard";
const PER_PAGE = 24;

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
    fetchGames({ q, page, per_page: PER_PAGE }).then(data => {
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
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="lds-dual-ring" />
      <style>{`
        .lds-dual-ring {
          display: inline-block;
          width: 64px;
          height: 64px;
        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 46px;
          height: 46px;
          margin: 1px;
          border-radius: 50%;
          border: 6px solid #ff7e1b;
          border-color: #ff7e1b transparent #ff7e1b transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
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
        color: dark ? " #ff7e1b" : " #c2410c",
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
        gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
        gap: 22,
        marginBottom: 28
      }}>
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
        color: dark ? "#fff" : "#c2410c",
        fontSize: 14,
        opacity: 0.7
      }}>
        Showing {games.length} of {total} games
      </div>
    </div>
  );
}



function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return `hsl(${hash % 360},70%,60%)`;
}


