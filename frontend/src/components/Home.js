import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
// Import useTheme hook - Ensure the path is correct
import { useTheme } from "../ThemeContext";
import {
  FaGamepad, FaDice, FaTimes, FaCircle,
  FaMobileAlt, FaSave, FaCloudUploadAlt, FaUserCheck, FaBan, FaGift // Icons for features
} from "react-icons/fa";
import RedditThreeBox from "./reddit.js";
import { MemoryFlipGame } from "./memoryFlip";
import { RockPaperScissors } from "./rockPaper";
import { Game2048Lite } from "./2048.js";


import AshBg from "../images/ash.gif";
import gokuGif from "../images/goku.gif";
// Game covers for animation


// --- Updated Theme Colors ---
const lightThemeColors = {
  background: "#ffffff", // Pure white background
  text: "#2d3748", // Dark gray text
  textSecondary: "#4a5568", // Medium gray text
  heading: "#1a202c", // Very dark (almost black) heading
  primary: "#4299e1", // Adjusted blue primary
  primaryGradient: "linear-gradient(90deg, #4299e1 0%, #63b3ed 100%)",
  primaryHoverGradient: "linear-gradient(90deg, #63b3ed 0%, #90cdf4 100%)",
  primaryShadow: "rgba(66, 153, 225, 0.3)",
  cardBg: "#ffffff", // White cards
  cardBorder: "#e2e8f0", // Light gray border
  cardShadow: "rgba(0, 0, 0, 0.08)", // Softer shadow
  // GBA Colors (Light Theme - Inspired by classic GBA)
  gbaBody: "#e0e5ec",
  gbaScreenBg: "#2d3748", // Dark screen background
  gbaButtonPrimary: "#a0aec0", // Gray buttons
  gbaButtonSecondary: "#718096",
  gbaDpad: "rgba(74, 85, 104, 0.49)",
  gbaDpadButtons: "rgb(50, 57, 70)",
  gbaText: "#2d3748",
  gbaBorder: "#b8c1cc",
  buttonText: "#ffffff",
  // Mini Game Colors
  miniGameText: "#4299e1",
  miniGameTextSecondary: "#4a5568",
  miniGameBg: "#f7fafc", // Very light gray background
  miniGameBorder: "#e2e8f0",
  miniGameShadow: "rgba(0, 0, 0, 0.06)",
  miniGameSquareBg: "#edf2f7",
  miniGameSquareBorder: "rgba(66, 153, 225, 0.5)",
};

const darkThemeColors = {
  // background: " #121212", // Very dark background
  text: "#e2e8f0", // Light gray text
  textSecondary: "#a0aec0", // Medium gray text
  heading: "#ffffff", // White heading
  primary: "#f56565", // Red primary for dark theme
  primaryGradient: "linear-gradient(90deg, #f56565 0%, #fc8181 100%)",
  primaryHoverGradient: "linear-gradient(90deg, #fc8181 0%, #feb2b2 100%)",
  primaryShadow: "rgba(245, 101, 101, 0.3)",
  cardBg: "#1a202c", // Dark card background
  cardBorder: "#2d3748", // Darker border
  cardShadow: "rgba(0, 0, 0, 0.4)", // Stronger shadow
  // GBA Colors (Dark Theme - Inspired by darker GBA variants)
  gbaBody: "#2d3748",
  gbaScreenBg: "#111827", // Even darker screen
  gbaButtonPrimary: "#718096", // Gray buttons
  gbaButtonSecondary: " #a0aec0",
  gbaDpad: "rgb(161, 163, 165)", // Lighter D-pad
  gbaDpadButtons: "rgb(60, 62, 65)",
  gbaText: "#f7fafc",
  gbaBorder: "#4a5568",
  buttonText: "#ffffff",
  // Mini Game Colors
  miniGameText: "#f56565", // Red text
  miniGameTextSecondary: "#a0aec0",
  miniGameBg: "#1a202c", // Dark background
  miniGameBorder: "#2d3748",
  miniGameShadow: "rgba(0, 0, 0, 0.3)",
  miniGameSquareBg: "#2d3748",
  miniGameSquareBorder: "rgba(245, 101, 101, 0.5)",
};


// --- GBA Console Display Component ---
function GbaConsoleDisplay({ theme }) {
  const gbaColors = theme; // Use the main theme object directly for GBA colors



  return (
    <div style={{ // Outer container for positioning/scaling
      width: '100%',
      maxWidth: '450px', // Max width of the GBA
      aspectRatio: '1.6 / 1', // Approximate GBA aspect ratio
      // margin: '20px auto',
      minWidth: '300px',
    }}>
      <div style={{ // Main GBA Body
        width: '100%',
        height: '100%',
        background: gbaColors.gbaBody,
        borderRadius: '15px 15px 25px 25px / 15px 15px 20px 20px', // GBA-like rounding
        border: `1px solid ${gbaColors.gbaBorder}`,
        boxShadow: `0 6px 20px ${gbaColors.cardShadow}, inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.1)`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 20px',
        boxSizing: 'border-box',
        transition: 'background 0.3s ease, border 0.3s ease',
      }}>
        {/* Left Side (D-Pad) */}
        <div style={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ // D-pad cross shape
            width: '60px', height: '60px',
            background: gbaColors.gbaDpad,
            position: 'relative',
            borderRadius: '5px',
            boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.41)',
            transition: 'background 0.3s ease',
          }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '100%', background: gbaColors.gbaDpadButtons, borderRadius: '3px' }}></div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '20px', background: gbaColors.gbaDpadButtons, borderRadius: '3px' }}></div>
            {/* D-pad inner detail */}
          </div>
        </div>

        {/* Center (Screen & Logo) */}
        <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Screen Bezel */}
          <div style={{
            width: '100%',
            height: '130px', // Screen area height
            background: gbaColors.gbaBody, // Match body
            padding: '5px',
            borderRadius: '8px',
            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.3)',
            marginBottom: '8px',
            transition: 'background 0.3s ease',
          }}>
            {/* Actual Screen */}
            <div style={{
              width: '100%',
              height: '140px', // Inner screen height
              background: gbaColors.gbaScreenBg,
              borderRadius: '4px',
              overflow: 'hidden',
              position: 'relative',
              border: `1px solid ${darkThemeColors ? '#111' : '#ccc'}`, // Inner screen border
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.3s ease',
            }}>
              <img
                src={gokuGif}
                alt="Gaming Animation"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: 'block'
                }}
              />
              {/* Screen Glare */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `linear-gradient(160deg, rgba(255,255,255,${darkThemeColors ? '0.05' : '0.15'}) 0%, transparent 50%)`, pointerEvents: 'none', borderRadius: '4px' }} />
            </div>
          </div>
          {/* GBA Logo */}
          <div style={{
            color: gbaColors.gbaText, // Themed text
            fontSize: '10px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            opacity: 0.8,
            transition: 'color 0.3s ease',
          }}>
            GAME BOY ADVANCE
          </div>
        </div>

        {/* Right Side (A, B Buttons) */}
        <div
          style={{
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            marginLeft: "5px"
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '15px',
              transform: 'rotate(-25deg)',
            }}
          >
            {/* B Button */}
            <div
              style={{
                width: 38,
                height: 38,
                background: 'red' || 'radial-gradient(circle at 30% 30%, #7e5bef 0%, #5b4b9e 100%)',
                borderRadius: '50%',
                boxShadow:
                  '0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.2)',
                border: `2px solid ${gbaColors.gbaBorder || '#4a3b7a'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                fontFamily: 'inherit',
              }}
            >
              <span
                style={{
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: 18,
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  fontFamily: 'inherit',
                  userSelect: 'none',
                }}
              >
                B
              </span>
            </div>
            {/* A Button */}
            <div
              style={{
                width: 38,
                height: 38,
                background: "blue" || 'radial-gradient(circle at 30% 30%, #7e5bef 0%, #5b4b9e 100%)',
                borderRadius: '50%',
                boxShadow:
                  '0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.2)',
                border: `2px solid ${gbaColors.gbaBorder || '#4a3b7a'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                fontFamily: 'inherit',
              }}
            >
              <span
                style={{
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: 18,
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  fontFamily: 'inherit',
                  userSelect: 'none',
                }}
              >
                A
              </span>
            </div>
          </div>
        </div>

        {/* Start/Select Buttons (Overlay) */}
        <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '20px' }}>
          <div style={{ width: '25px', height: '10px', background: gbaColors.gbaButtonSecondary, borderRadius: '5px', boxShadow: 'inset 0 0 3px rgba(0,0,0,0.2)', transition: 'background 0.3s ease' }}></div>
          <div style={{ width: '25px', height: '10px', background: gbaColors.gbaButtonSecondary, borderRadius: '5px', boxShadow: 'inset 0 0 3px rgba(0,0,0,0.2)', transition: 'background 0.3s ease' }}></div>
        </div>

        {/* Shoulder Button Indicators (Visual only) */}
        <div style={{ position: 'absolute', top: '-5px', left: '20px', width: '40px', height: '10px', background: gbaColors.gbaButtonSecondary, borderRadius: '5px 5px 0 0', boxShadow: '0 -2px 3px rgba(0,0,0,0.1)', transition: 'background 0.3s ease' }}></div>
        <div style={{ position: 'absolute', top: '-5px', right: '20px', width: '40px', height: '10px', background: gbaColors.gbaButtonSecondary, borderRadius: '5px 5px 0 0', boxShadow: '0 -2px 3px rgba(0,0,0,0.1)', transition: 'background 0.3s ease' }}></div>
      </div>
    </div>
  );
}


// --- Dice Mini-game --- (Code remains the same, uses themed styles)
function DiceJackpot({ theme }) { /* ... same code as previous version ... */
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState(null);
  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      const val = Math.floor(Math.random() * 6) + 1;
      setResult(val);
      setRolling(false);
    }, 800);
  };
  const styles = getMiniGameStyles(theme); // Get themed styles
  return (
    <div style={styles.card}>
      <div style={styles.title}><FaDice style={{ marginRight: '6px' }} /> Dice Roll</div>
      <div style={{ fontSize: 'clamp(2rem, 6vw, 2.5rem)', minHeight: 45, margin: "10px 0", color: theme.heading, fontWeight: 'bold' }}>
        {rolling ? "..." : result ? result : "?"}
      </div>
      <button
        onClick={rollDice}
        disabled={rolling}
        style={styles.button}
        onMouseOver={(e) => e.currentTarget.style.background = styles.buttonHover.background}
        onMouseOut={(e) => e.currentTarget.style.background = styles.button.background}
      >
        {rolling ? "Rolling..." : "Roll"}
      </button>
    </div>
  );
}

// --- Tic Tac Toe Mini-game --- (Code remains the same, uses themed styles)
function TicTacToe({ theme }) { /* ... same code as previous version ... */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  }
  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }
  const styles = getMiniGameStyles(theme); // Get themed styles
  return (
    <div style={styles.card}>
      <div style={styles.title}><FaTimes style={{ marginRight: '3px' }} /><FaCircle style={{ marginRight: '6px' }} /> TicTacToe</div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 32px)",
        gap: 4,
        margin: "10px auto"
      }}>
        {squares.map((val, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{
              ...styles.squareButton, // Use themed square button style
              color: val === "X" ? theme.primary : theme.text, // Themed colors for X and O
              cursor: val || winner ? "default" : "pointer",
            }}
            disabled={!!val || !!winner}
            // Inline hover for simplicity, could be moved to styles object
            onMouseOver={(e) => { if (!val && !winner) e.currentTarget.style.background = theme === lightThemeColors ? '#dde3ea' : '#3a3e4f'; }}
            onMouseOut={(e) => { if (!val && !winner) e.currentTarget.style.background = styles.squareButton.background; }}
            onMouseDown={(e) => { if (!val && !winner) e.currentTarget.style.transform = 'scale(0.95)'; }}
            onMouseUp={(e) => { if (!val && !winner) e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {val}
          </button>
        ))}
      </div>
      <div style={{ margin: "6px 0", minHeight: 20, fontSize: '0.9rem', color: theme.textSecondary }}>
        {winner
          ? <span style={{ color: theme.heading, fontWeight: 'bold' }}>{winner === "draw" ? "It's a Draw!" : `Winner: ${winner}`}</span>
          : <span>{xIsNext ? "X" : "O"}'s turn</span>
        }
      </div>
      <button
        onClick={reset}
        style={{ ...styles.button, fontSize: 13, padding: '3px 12px' }}
        onMouseOver={(e) => e.currentTarget.style.background = styles.buttonHover.background}
        onMouseOut={(e) => e.currentTarget.style.background = styles.button.background}
      >
        Reset
      </button>
    </div>
  );
}

// --- Helper function (no changes needed) ---
function calculateWinner(sq) { /* ... same code as before ... */
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
  }
  if (sq.every(Boolean)) return "draw";
  return null;
}


// --- Generate Themed Styles for Mini-Games --- (Code remains the same)
const getMiniGameStyles = (theme) => ({ /* ... same code as previous version ... */
  card: {
    background: theme.miniGameBg,
    borderRadius: 16,
    padding: "16px",
    boxShadow: `0 5px 20px ${theme.cardShadow}, 0 1px 3px ${theme.primaryShadow}`,
    color: theme.miniGameText,
    fontWeight: 700,
    textAlign: "center",
    minWidth: 130,
    maxWidth: 150,
    margin: "8px",
    border: `1px solid ${theme.miniGameBorder}`,
    flexShrink: 0,
    transition: 'background 0.3s ease, box-shadow 0.3s ease', // Add transition
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: theme.miniGameText, // Use primary text color for mini-game title
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    background: theme.primaryGradient,
    color: theme.buttonText,
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 14,
    padding: "6px 16px",
    cursor: "pointer",
    boxShadow: `0 3px 10px ${theme.primaryShadow}`,
    transition: "background 0.3s ease, transform 0.1s ease",
    marginTop: 8,
  },
  buttonHover: { // Define hover state separately
    background: theme.primaryHoverGradient,
  },
  squareButton: { // Style for TicTacToe squares
    width: 32, height: 32,
    fontSize: 20,
    fontWeight: 800,
    borderRadius: 6,
    border: `2px solid ${theme.miniGameSquareBorder}`,
    background: theme.miniGameSquareBg,
    // color will be set inline based on X/O
    transition: "background 0.2s, transform 0.1s",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
  }
});

// --- Feature Card Component ---
function FeatureCard({ icon, title, description, theme }) {
  return (
    <div style={{
      background: theme.cardBg,
      borderRadius: '12px',
      padding: '25px',
      textAlign: 'center',
      border: `1px solid ${theme.cardBorder}`,
      boxShadow: `0 4px 15px ${theme.cardShadow}`,
      transition: 'background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
    }}>
      <div style={{
        color: theme.primary,
        fontSize: '2.5rem', // Larger icon
        marginBottom: '10px',
        lineHeight: 1, // Prevent extra space
      }}>
        {icon}
      </div>
      <h3 style={{
        color: theme.heading,
        fontSize: '1.1rem',
        fontWeight: 700,
        margin: '0 0 5px 0',
        transition: 'color 0.3s ease',
      }}>
        {title}
      </h3>
      <p style={{
        color: theme.textSecondary,
        fontSize: '0.9rem',
        lineHeight: 1.6,
        margin: 0,
        transition: 'color 0.3s ease',
      }}>
        {description}
      </p>
    </div>
  );
}


// --- Main Home Component ---
export default function Home() {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const theme = dark ? darkThemeColors : lightThemeColors;

  // Feature list
  const features = [
    { icon: <FaGift />, title: "Free Games", description: "Access a library of classic GBA titles completely free." },
    { icon: <FaBan />, title: "No Ads", description: "Enjoy uninterrupted gameplay without annoying advertisements." },
    { icon: <FaMobileAlt />, title: "Mobile Support", description: "Play on the go! Fully responsive on phones and tablets." },
    { icon: <FaSave />, title: "Save/Load State", description: "Never lose progress. Save and load your game anytime." },
    { icon: <FaCloudUploadAlt />, title: "Cloud Saves (Coming Soon)", description: "Sync your saves across devices seamlessly." },
    { icon: <FaUserCheck />, title: "Local Gameplay", description: "Play games locally on your browser, no streaming" },
  ];

  return (
    // Main container
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: theme.background,
        color: theme.text,
        padding: "80px 20px 10px", // Increased top padding (account for sticky nav)
        boxSizing: "border-box",
        transition: 'background 0.3s ease',
        position: 'relative', // Needed for absolute positioned elements like theme toggle
      }}
    >
      
      

      {/* Global Styles & Animations */}
      <style>{`
        /* Float Animation */
    

         /* Section Base Styles */
        .home-section {
            width: 100%;
            max-width: 1100px; /* Consistent max-width */
            margin: 40px auto; /* Vertical spacing between sections */
            padding: 20px 0;
            position: relative; /* For z-index stacking if needed */
            z-index: 2;
         }

         /* Hero Section Layout */
         .hero-section {
            display: flex;
            flex-direction: column; /* Mobile first */
            align-items: center;
            text-align: center;
            gap: 30px;
            margin-top: 0; /* Less margin for the first section */
         }
         .hero-content {
             max-width: 600px; /* Limit text width */
         }

         /* Features Section Layout */
         .features-grid {
             display: grid;
             grid-template-columns: 1fr; /* Mobile: single column */
             gap: 25px;
             margin-top: 20px;
         }

         /* Mini Games Section Layout */
         .mini-games-section {
             text-align: center;
         }
         .mini-games-container {
             display: flex;
             flex-direction: row;
             gap: 16px;
             margin-top: 20px;
             flex-wrap: wrap;
             justify-content: center;
             width: 100%;
         }

         /* Section Heading Style */
         .section-heading {
             font-size: clamp(1.8rem, 5vw, 2.5rem);
             font-weight: 800;
             color: ${theme.heading};
             margin-bottom: 30px;
             text-align: center;
             position: relative;
             padding-bottom: 10px;
             transition: color 0.3s ease;
         }
         /* Underline effect for heading */
         .section-heading::after {
             content: '';
             position: absolute;
             bottom: 0;
             left: 50%;
             transform: translateX(-50%);
             width: 60px;
             height: 3px;
             background: ${theme.primary};
             border-radius: 2px;
             transition: background 0.3s ease;
         }


         /* Desktop Layout Adjustments */
         @media (min-width: 950px) {
             .hero-section {
                 flex-direction: row; /* Side-by-side */
                 text-align: left;
                 justify-content: space-between;
                 gap: 50px;
             }
             .hero-content {
                 align-items: flex-start;
                 text-align: left;
             }
             .features-grid {
                 grid-template-columns: repeat(3, 1fr); /* 3 columns on desktop */
             }
         }

         /* Main CTA Button Hover */
         .cta-button:hover {
             background: ${theme.primaryHoverGradient} !important;
             box-shadow: 0 6px 28px ${theme.primaryShadow} !important;
             transform: translateY(-2px);
         }
         .cta-button:active {
             transform: translateY(0px);
             box-shadow: 0 3px 15px ${theme.primaryShadow} !important;
         }

         /* Theme Toggle Button Style */
         .theme-toggle-button {
            background: ${theme.cardBg};
            color: ${theme.text};
            border: 1px solid ${theme.cardBorder};
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 8px ${theme.cardShadow};
            transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
         }
         .theme-toggle-button:hover {
            background: ${dark ? '#2d3748' : '#e2e8f0'}; /* Subtle hover */
         }
      `}</style>

      {/* --- Hero Section --- */}
      <section className="home-section hero-section" >
        {/* Left side (GBA Display) */}
        <div style={{ width: '100%', maxWidth: '450px', flexShrink: 0 }}> {/* Container for GBA */}
          <GbaConsoleDisplay theme={theme} />
        </div>
        {/* Right side (Content) */}
        <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Align center on mobile */}
          <FaGamepad
            size={50} // Slightly smaller
            color={theme.primary}
            style={{ marginBottom: 15, filter: `drop-shadow(0 4px 12px ${theme.primaryShadow})`, transition: 'color 0.3s ease' }}
          />
          <h1 style={{
            fontSize: "clamp(2.2rem, 6vw, 3.2rem)", // Adjusted size
            fontWeight: 800, marginBottom: 15,
            color: theme.heading, letterSpacing: 0.5,
            textShadow: `0 2px 10px ${dark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)'}`,
            transition: 'color 0.3s ease',
          }}>
            Welcome to PlayGent!
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 2.5vw, 1.15rem)", // Adjusted size
            color: theme.textSecondary, maxWidth: '500px',
            lineHeight: 1.6, marginBottom: 25,
            transition: 'color 0.3s ease',
          }}>
            Your instant portal to the GBA classics you love. No downloads, no hassle – just pure retro gaming fun, right in your browser.
          </p>
          <button
            className="cta-button"
            onClick={() => navigate("/library")}
            style={{
              background: theme.primaryGradient, color: theme.buttonText,
              border: "none", borderRadius: 10,
              fontSize: "clamp(1rem, 3vw, 1.1rem)", fontWeight: 600,
              padding: "14px 35px", cursor: "pointer",
              boxShadow: `0 5px 20px ${theme.primaryShadow}`, marginTop: 0,
              transition: "background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
              letterSpacing: 0.5,
              textShadow: `0 1px 3px ${dark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
            }}
          >
            Explore Games
          </button>
        </div>

      </section>
      {/* --- Gaming Animation Section --- */}
<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '40px 0', // Add spacing between sections
}}>
  <img
    src={AshBg}
    alt="Gaming Animation"
    style={{
      width: "clamp(200px, 30vw, 400px)", // Adjust size as needed
      height: "auto",
      objectFit: "contain",
      filter: "blur(1px)",
      borderRadius: "12px",
      transition: "opacity 0.3s",
    }}
  />
</div>
      {/* --- Reddit Section --- */}
      <h2 className="section-heading">Community</h2>
      <RedditThreeBox />

      {/* --- Features Section --- */}
      <section className="home-section features-section">
        <h2 className="section-heading">Why PlayGent?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              theme={theme}
            />
          ))}
        </div>
      </section>


      {/* --- Mini Games Section --- */}
      <section className="home-section mini-games-section">
        <h2 className="section-heading">Quick Fun</h2>
        <div className="mini-games-container">
          <DiceJackpot theme={theme} />
          <TicTacToe theme={theme} />
          <MemoryFlipGame theme={theme} />
          <RockPaperScissors theme={theme} />
          <Game2048Lite theme={theme} />
          {/* Add more mini-games if desired */}
        </div>
      </section>

    </div> // End Main container
  );
}