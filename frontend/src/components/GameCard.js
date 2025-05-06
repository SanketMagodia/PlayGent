import React from "react";
import { FaGamepad } from "react-icons/fa"; // Kept for now, can be removed if not desired
import { useTheme } from "../ThemeContext"; // Adjust path as needed

// Helper function to pick a color from a palette based on a string.
// You can use this to dynamically set 'cartridgeColor' for the border.
// e.g., const cartridgeColor = stringToAccent(game);
function stringToAccent(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Palette of dark, vibrant colors
  const palette = [
    "#b91c1c", // dark red
    "#059669", // emerald
    "#d97706", // dark orange
    "#047857", // dark green
    "#1d4ed8", // dark blue
    "#7c3aed", // dark violet
    "#be185d", // dark pink
    "#ea580c", // burnt orange
    "#a21caf", // fuchsia / deep purple
    "#0e7490", // dark cyan
  ];
  return palette[Math.abs(hash) % palette.length];
}

// Helper functions for button hover (can be moved to a utils file)
function lightenColor(hex, percent) {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    r = Math.min(255, r + Math.floor((255 - r) * (percent / 100)));
    g = Math.min(255, g + Math.floor((255 - g) * (percent / 100)));
    b = Math.min(255, b + Math.floor((255 - b) * (percent / 100)));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function darkenColor(hex, percent) {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    r = Math.max(0, r - Math.floor(r * (percent / 100)));
    g = Math.max(0, g - Math.floor(g * (percent / 100)));
    b = Math.max(0, b - Math.floor(b * (percent / 100)));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default function GameCard({ game, onPlay }) {
  const { dark } = useTheme();

  // Use a color for the border. You can make this dynamic with stringToAccent(game)
  const cartridgeBorderColor = stringToAccent(game); // Using your original 'border' prop color (emerald)
                                          // Or, for dynamic colors: const cartridgeBorderColor = stringToAccent(game);
  const accentColor = "#b91c1c"; // Using your original 'accent' prop color (dark red) for button/icon

  // GBA cartridges have a characteristic shape, often with an indent on the top edge.
  // Replicating that perfectly with just CSS borders and transparent background is complex.
  // This version aims for a recognizable wide shape with rounded corners.
  // The "top" edge typically had the label indent.

  return (
    <div
      style={{
        backgroundColor: "transparent",
        border: `5px solid ${cartridgeBorderColor}`, // Prominent, colorful border
        // GBA cart: wide. Top edge (long) often has indent. Sides (short) slightly curved. Bottom (long) contacts.
        // For simplicity: Rounded corners, slightly different for top vs bottom if desired.
        // Top-left, Top-right, Bottom-right, Bottom-left
        borderRadius: "10px 10px 6px 6px", // Rounder top edge, flatter bottom edge
        width: "220px", // Adjust for desired size
        aspectRatio: "1.65 / 1", // GBA carts are wider than tall (e.g., approx 60mm wide, 37mm tall for label area)
        padding: "15px", // Inner spacing from the border
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between", // Pushes button to bottom if there's enough vertical space
        position: "relative",
        cursor: "pointer",
        outline: "none",
        transition: "box-shadow 0.2s, transform 0.18s, border-color 0.2s",
        userSelect: "none",
        boxShadow: dark // Subtle shadow to lift the border off the page
          ? `0 4px 12px ${cartridgeBorderColor}33, 0 2px 6px #00000055`
          : `0 4px 12px ${cartridgeBorderColor}22, 0 2px 6px #00000022`,
      }}
      tabIndex={0}
      onClick={onPlay}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onPlay();
      }}
      aria-label={`Play ${game}`}
      className="game-card"
    >
      {/* Content: Game Name and Start Button */}
      {/* Optional: Gamepad icon if you still want it */}
      <FaGamepad
        size={28} // Smaller icon
        color={dark ? "#a0aec0" : "#4a5568"} // Muted color, as border is the main color
        style={{
          marginBottom: 8, // Reduced margin
          opacity: 0.7,
        }}
      />

      <div
        style={{
          fontWeight: "bold", // Retro fonts often look good bold
          fontSize: "clamp(0.8rem, 3vw, 0.4rem)", // Adjust size to fit well
          color: dark ? "#e2e8f0" : "#2d3748", // Ensure good contrast against page background
          textAlign: "center",
          fontFamily: "'Press Start 2P', monospace, sans-serif", // Retro pixel font
          lineHeight: 1.3,
          wordBreak: "break-word", // Should be less of an issue with wider aspect
          padding: "0 5px",
          marginBottom: "12px", // Space between name and button
           // Ensure text doesn't overflow too much, GBA labels were concise
          maxHeight: '2.6em', // Approx 2 lines
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {game}
      </div>

      <button
        tabIndex={-1}
        style={{
          background: accentColor, // Using the accent color for the button
          color: "#ffffff",
          border: `1px solid ${dark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.3)"}`,
          borderRadius: "5px", // Slightly rounded retro button
          fontWeight: "bold",
          fontSize: "clamp(0.8rem, 4vw, 0.9rem)",
          padding: "7px 20px",
          cursor: "pointer",
          boxShadow: `0 2px 4px rgba(0,0,0,0.25), inset 0 1px 1px ${dark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.25)"}`,
          transition: "background 0.2s, transform 0.1s",
          letterSpacing: 0.8,
          textTransform: "uppercase",
          fontFamily: "'VT323', monospace, sans-serif", // Retro font for button
          outline: "none",
          // alignSelf: "center", // Already centered by parent's alignItems
          // marginTop: "auto", // Pushed by justifyContent on parent
        }}
        onClick={(e) => {
          e.stopPropagation();
          onPlay();
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        Start
      </button>

      {/* Hover/Focus Styles & Font Import */}
      <style>{`
        /* Ideally, import Google Fonts in your main index.html <head>:
          <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet">
        */
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');
        
        .game-card:hover, .game-card:focus-visible {
          transform: translateY(-2px) scale(1.02);
          border-color: ${lightenColor(cartridgeBorderColor, 20)}; /* Lighten border on hover */
          box-shadow: 0 6px 18px ${cartridgeBorderColor}44, 0 3px 8px #00000044;
          outline: none; 
        }
        .game-card:focus-visible { /* Visible focus style */
            /* Example: a thicker, brighter border or a distinct outline */
            border-width: 5px; /* Keep consistent */
            box-shadow: 0 0 0 2.5px transparent, 0 0 0 4.5px ${accentColor}; /* Focus ring using accent */
        }
        .game-card:active {
          transform: scale(0.98) translateY(0px);
          box-shadow: 0 2px 8px ${cartridgeBorderColor}33, 0 1px 4px #00000033;
        }

        .game-card button:hover {
            background: ${dark ? lightenColor(accentColor, 10) : darkenColor(accentColor, 10)};
            transform: scale(1.05);
            box-shadow: 0 3px 6px rgba(0,0,0,0.3), inset 0 1px 1px ${dark ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.3)"};
        }
      `}</style>
    </div>
  );
}