import React from "react";

export default function KeyboardHints({ onClose }) {
  return (
    <div style={{
      position: "absolute",
      top: 32,
      right: 32,
      background: "rgba(30,30,30,0.97)",
      color: "#fff",
      padding: 24,
      borderRadius: 12,
      boxShadow: "0 4px 24px #0008",
      zIndex: 20,
      minWidth: 260
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: 20 }}>Keyboard Controls</h3>
        <button onClick={onClose} style={{
          background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer"
        }}>×</button>
      </div>
      <ul style={{ margin: "16px 0 0 0", padding: 0, listStyle: "none", lineHeight: 2 }}>
        <li><b>Arrow Keys</b>: D-Pad</li>


        <li><b>Z</b>: A Button</li>
        <li><b>X</b>: B Button</li>
        <li><b>Enter</b>: Start</li>
        <li><b>\</b>: Select</li>
        <li><b>A/S</b>: L / R</li>
        <li><b>P</b>: Pause</li>
        <li><b>F</b>: Fullscreen</li>
      </ul>
    </div>
  );
}
