import React, { useState } from "react";
import { FaThLarge } from "react-icons/fa";
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

function slide(row) {
  let arr = row.filter(n => n);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] && arr[i] === arr[i + 1]) {
      arr[i] *= 2;
      arr[i + 1] = 0;
    }
  }
  arr = arr.filter(n => n);
  while (arr.length < 4) arr.push(0);
  return arr;
}

function randomEmpty(grid) {
  const empty = [];
  grid.forEach((row, i) => row.forEach((n, j) => { if (!n) empty.push([i, j]); }));
  if (empty.length === 0) return grid;
  const [i, j] = empty[Math.floor(Math.random() * empty.length)];
  const val = Math.random() < 0.9 ? 2 : 4;
  const newGrid = grid.map(row => [...row]);
  newGrid[i][j] = val;
  return newGrid;
}

export function Game2048Lite({ theme }) {
  const [grid, setGrid] = useState(() => randomEmpty(randomEmpty(Array(4).fill().map(() => Array(4).fill(0)))));
  const [won, setWon] = useState(false);
  const styles = getMiniGameStyles(theme);

  const move = dir => {
    let newGrid = grid.map(row => [...row]);
    let moved = false;
    if (dir === "left") {
      newGrid = newGrid.map(row => {
        const slid = slide(row);
        if (slid.join() !== row.join()) moved = true;
        return slid;
      });
    } else if (dir === "right") {
      newGrid = newGrid.map(row => {
        const rev = [...row].reverse();
        const slid = slide(rev).reverse();
        if (slid.join() !== row.join()) moved = true;
        return slid;
      });
    } else if (dir === "up") {
      for (let j = 0; j < 4; j++) {
        let col = [grid[0][j], grid[1][j], grid[2][j], grid[3][j]];
        const slid = slide(col);
        for (let i = 0; i < 4; i++) {
          if (grid[i][j] !== slid[i]) moved = true;
          newGrid[i][j] = slid[i];
        }
      }
    } else if (dir === "down") {
      for (let j = 0; j < 4; j++) {
        let col = [grid[0][j], grid[1][j], grid[2][j], grid[3][j]].reverse();
        const slid = slide(col).reverse();
        for (let i = 0; i < 4; i++) {
          if (grid[i][j] !== slid[i]) moved = true;
          newGrid[i][j] = slid[i];
        }
      }
    }
    if (moved) {
      const withNew = randomEmpty(newGrid);
      setGrid(withNew);
      if (withNew.flat().includes(2048)) setWon(true);
    }
  };

  const reset = () => {
    setGrid(randomEmpty(randomEmpty(Array(4).fill().map(() => Array(4).fill(0)))));
    setWon(false);
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}><FaThLarge style={{ marginRight: 6 }} /> 2048 Lite</div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 3,
        marginBottom: 8,
        background: "#232b42",
        borderRadius: 8,
        padding: 3
      }}>
        {grid.flat().map((n, i) => (
          <div key={i} style={{
            width: 28, height: 28,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: n ? theme.primary : theme.miniGameSquareBg,
            color: n > 0 ? "#fff" : theme.primary,
            fontWeight: 800,
            fontSize: 15,
            borderRadius: 4,
            transition: "background 0.2s"
          }}>{n || ""}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 5, justifyContent: "center", marginBottom: 6 }}>
        <button onClick={() => move("up")} style={styles.button}>↑</button>
        <button onClick={() => move("left")} style={styles.button}>←</button>
        <button onClick={() => move("down")} style={styles.button}>↓</button>
        <button onClick={() => move("right")} style={styles.button}>→</button>
      </div>
      <div style={{ minHeight: 22, color: theme.heading }}>
        {won ? "You made 2048! 🎉" : ""}
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
