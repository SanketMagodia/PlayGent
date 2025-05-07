import React, { useState } from "react";
import { FaRegClone } from "react-icons/fa";

const EMOJIS = ["🍒", "🍋", "🍉", "🍇", "🍊", "🍓"];
const shuffled = () => {
  const arr = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
  return arr.map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
};
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
    
export function MemoryFlipGame({ theme }) {
  const [cards, setCards] = useState(shuffled());
  const [flipped, setFlipped] = useState([]);
  const [won, setWon] = useState(false);
  const styles = getMiniGameStyles(theme);

  const onFlip = idx => {
    if (cards[idx].flipped || cards[idx].matched || flipped.length === 2) return;
    const newCards = cards.map((c, i) => i === idx ? { ...c, flipped: true } : c);
    const newFlipped = [...flipped, idx];
    setCards(newCards);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setTimeout(() => {
        const [a, b] = newFlipped;
        if (newCards[a].emoji === newCards[b].emoji) {
          const matched = newCards.map((c, i) =>
            i === a || i === b ? { ...c, matched: true } : c
          );
          setCards(matched);
          if (matched.every(c => c.matched)) setWon(true);
        } else {
          setCards(newCards.map((c, i) =>
            i === a || i === b ? { ...c, flipped: false } : c
          ));
        }
        setFlipped([]);
      }, 700);
    }
  };

  const reset = () => {
    setCards(shuffled());
    setFlipped([]);
    setWon(false);
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}><FaRegClone style={{ marginRight: 6 }} /> Memory</div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 28px)",
        gap: 5,
        justifyContent: "center"
      }}>
        {cards.map((card, i) => (
          <button
            key={card.id}
            onClick={() => onFlip(i)}
            disabled={card.flipped || card.matched || flipped.length === 2}
            style={{
              ...styles.squareButton,
              color: card.matched ? theme.primary : theme.text,
              background: card.flipped || card.matched ? styles.squareButton.background : theme.miniGameSquareBg,
              cursor: card.flipped || card.matched ? "default" : "pointer",
            }}
            onMouseOver={e => { if (!card.flipped && !card.matched) e.currentTarget.style.background = theme === lightThemeColors ? '#dde3ea' : '#3a3e4f'; }}
            onMouseOut={e => { if (!card.flipped && !card.matched) e.currentTarget.style.background = styles.squareButton.background; }}
          >
            {card.flipped || card.matched ? card.emoji : "?"}
          </button>
        ))}
      </div>
      <div style={{ margin: "8px 0", minHeight: 20, color: theme.textSecondary }}>
        {won ? <span style={{ color: theme.heading, fontWeight: 'bold' }}>You win! 🎉</span> : null}
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
