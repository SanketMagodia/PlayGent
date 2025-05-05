// Navbar.js
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { FaGamepad, FaSun, FaMoon, FaBars } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      // background: dark ? " #1e263b" : " #e0e7ff",
      // boxShadow: "0 2px 12px #0001",
      position: "sticky",
      top: 0,
      zIndex: 20
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 18px",
        maxWidth: 1200,
        margin: "0 auto"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <FaGamepad size={26} color={dark ? "#67e8f9" : "#2563eb"} />
          <span style={{
            fontWeight: 900,
            fontSize: 22,
            letterSpacing: 1,
            color: dark ? " #67e8f9" : " #2563eb"
          }}>
            PlayQuest
          </span>
        </div>
        {/* Hamburger for mobile */}
        <button
          onClick={() => setOpen(o => !o)}
          className="nav-hamburger"
          style={{
            background: "none", border: "none", display: "none", fontSize: 26,
            color: dark ? "#67e8f9" : "#2563eb", cursor: "pointer"
          }}
          aria-label="Menu"
        >
          <FaBars />
        </button>
        <div className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" label="Home" active={location.pathname === "/"} />
          <NavLink to="/library" label="Library" active={location.pathname.startsWith("/library")} />
          <button
            aria-label="Switch Theme"
            onClick={toggle}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 22,
              marginLeft: 10,
              color: dark ? "#fbbf24" : "#2563eb"
            }}
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
      {/* Responsive styles */}
      <style>{`
        .nav-links {
          display: flex;
          align-items: center;
          gap: 22px;
        }
        @media (max-width: 700px) {
          .nav-links {
            position: absolute;
            top: 56px; right: 0; left: 0;
            background: ${dark ? "#1e263b" : "#e0e7ff"};
            flex-direction: column;
            gap: 0;
            display: none;
            box-shadow: 0 8px 24px #0002;
          }
          .nav-links.open {
            display: flex;
          }
          .nav-hamburger {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}

function NavLink({ to, label, active }) {
  return (
    <Link to={to} style={{
      color: active ? "#67e8f9" : "#64748b",
      fontWeight: active ? 700 : 500,
      fontSize: 18,
      textDecoration: "none",
      borderBottom: active ? "2px solid #67e8f9" : "2px solid transparent",
      padding: "8px 0",
      transition: "color 0.2s"
    }}>
      {label}
    </Link>
  );
}
