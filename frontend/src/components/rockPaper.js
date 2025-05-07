import React, { useState } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
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
  const lightThemeColors = {
    miniGameText: "#4299e1",
    miniGameTextSecondary: "#4a5568",
    miniGameBg: "#f7fafc", // Very light gray background
    miniGameBorder: "#e2e8f0",
    miniGameShadow: "rgba(0, 0, 0, 0.06)",
    miniGameSquareBg: "#edf2f7",
    miniGameSquareBorder: "rgba(66, 153, 225, 0.5)",
    };
  
const choices = [
  { icon: <FaHandRock />, name: "Rock" },
  { icon: <FaHandPaper />, name: "Paper" },
  { icon: <FaHandScissors />, name: "Scissors" }
];

function getResult(player, cpu) {
  if (player === cpu) return "Draw!";
  if (
    (player === 0 && cpu === 2) ||
    (player === 1 && cpu === 0) ||
    (player === 2 && cpu === 1)
  ) return "You win!";
  return "CPU wins!";
}

export function RockPaperScissors({ theme }) {
  const [player, setPlayer] = useState(null);
  const [cpu, setCpu] = useState(null);
  const [result, setResult] = useState("");
  const styles = getMiniGameStyles(theme);

  const play = idx => {
    const cpuChoice = Math.floor(Math.random() * 3);
    setPlayer(idx);
    setCpu(cpuChoice);
    setResult(getResult(idx, cpuChoice));
  };

  const reset = () => {
    setPlayer(null);
    setCpu(null);
    setResult("");
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>✊✋✌️ Rock Paper Scissors</div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 8 }}>
        {choices.map((c, i) => (
          <button
            key={c.name}
            onClick={() => play(i)}
            style={{
              ...styles.squareButton,
              width: 36, height: 36, fontSize: 20,
              color: theme.primary,
              background: theme.miniGameSquareBg,
              cursor: "pointer"
            }}
            onMouseOver={e => e.currentTarget.style.background = theme === lightThemeColors ? '#dde3ea' : '#3a3e4f'}
            onMouseOut={e => e.currentTarget.style.background = styles.squareButton.background}
          >{c.icon}</button>
        ))}
      </div>
      <div style={{ fontSize: 16, margin: "8px 0", minHeight: 24, color: theme.textSecondary }}>
        {player !== null && cpu !== null && (
          <>
            You: {choices[player].icon} vs CPU: {choices[cpu].icon}
            <br />
            <span style={{ color: theme.heading, fontWeight: 'bold' }}>{result}</span>
          </>
        )}
      </div>
      <button
        onClick={reset}
        style={styles.button}
        onMouseOver={e => e.currentTarget.style.background = styles.buttonHover.background}
        onMouseOut={e => e.currentTarget.style.background = styles.button.background}
      >
        Reset
      </button>
    </div>
  );
}
