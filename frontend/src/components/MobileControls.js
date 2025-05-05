import React from "react";

// Helper to trigger key events on window for react-gbajs
const triggerKey = (key, type = "keydown") => {
  const event = new KeyboardEvent(type, {
    key,
    code: key.length === 1 ? key.toUpperCase() : key,
    keyCode: keyToKeyCode(key),
    bubbles: true
  });
  window.dispatchEvent(event);
};

// Map key names to keyCodes for compatibility
function keyToKeyCode(key) {
  switch (key) {
    case "ArrowUp": return 38;
    case "ArrowDown": return 40;
    case "ArrowLeft": return 37;
    case "ArrowRight": return 39;
    case "z": return 90;
    case "x": return 88;
    case "Enter": return 13;
    case "\\": return 220;
    case "a": return 65;
    case "s": return 83;
    case "p": return 80;
    case "f": return 70;
    default: return 0;
  }
}

// Button styles
const dpadBtn = {
  width: 48,
  height: 48,
  borderRadius: 12,
  fontSize: 28,
  border: "2px solid #334155",
  background: "linear-gradient(145deg,#e0e7ff 60%,#cbd5e1 100%)",
  color: "#334155",
  boxShadow: "0 2px 8px #0001",
  margin: 0,
  touchAction: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none"
};

const actionBtn = (label) => ({
  width: 56,
  height: 56,
  borderRadius: "50%",
  fontSize: 26,
  border: "none",
  background: label === "A" ? "radial-gradient(circle,#67e8f9 60%,#38bdf8 100%)" : "radial-gradient(circle,#fbbf24 60%,#f59e42 100%)",
  color: "#fff",
  fontWeight: 900,
  boxShadow: "0 2px 12px #0002",
  margin: 0,
  touchAction: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none"
});

const shoulderBtn = (label) => ({
  width: 46,
  height: 32,
  borderRadius: 10,
  fontSize: 15,
  border: "2px solid #64748b",
  background: "linear-gradient(145deg,#e0e7ff 60%,#cbd5e1 100%)",
  color: "#334155",
  fontWeight: 700,
  boxShadow: "0 1px 4px #0001",
  margin: 0,
  touchAction: "none",
  userSelect: "none"
});

const smallBtn = {
  minWidth: 48,               // Ensures enough space for "Select"
  height: 38,
  borderRadius: 10,
  fontSize: 15,
  border: "1.5px solid #64748b",
  background: "linear-gradient(145deg,#e0e7ff 60%,#cbd5e1 100%)",
  color: "#334155",
  fontWeight: 700,
  boxShadow: "0 1px 4px #0001",
  margin: 0,
  padding: "0 16px",          // Horizontal padding for longer text
  touchAction: "none",
  userSelect: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center"
};

// Helper for touch/mouse support
const pressHandlers = (key) => ({
  onTouchStart: (e) => { e.preventDefault(); triggerKey(key, "keydown"); },
  onTouchEnd: (e) => { e.preventDefault(); triggerKey(key, "keyup"); },
  onMouseDown: (e) => { e.preventDefault(); triggerKey(key, "keydown"); },
  onMouseUp: (e) => { e.preventDefault(); triggerKey(key, "keyup"); },
  onMouseLeave: (e) => { e.preventDefault(); triggerKey(key, "keyup"); }
});

export default function MobileControls() {
  return (
    <div style={{
      width: "100%",
      maxWidth: 600,
      margin: "32px auto 0",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: 18,
      pointerEvents: "auto",
      zIndex: 10,
      padding: "0 12px 40px 12px",
      position: "relative"
    }}>
      {/* D-Pad */}
      <div style={{
        display: "grid",
        gridTemplateRows: "repeat(3, 48px)",
        gridTemplateColumns: "repeat(3, 48px)",
        gap: 6,
        width: 162,
        height: 162,
        position: "relative"
      }}>
        <div />
        <button style={dpadBtn} {...pressHandlers("ArrowUp")}>▲</button>
        <div />
        <button style={dpadBtn} {...pressHandlers("ArrowLeft")}>◀</button>
        <div />
        <button style={dpadBtn} {...pressHandlers("ArrowRight")}>▶</button>
        <div />
        <button style={dpadBtn} {...pressHandlers("ArrowDown")}>▼</button>
        <div />
      </div>

      {/* Shoulder Buttons */}
      <div style={{
        position: "absolute",
        top: -38,
        left: 8,
        right: 8,
        display: "flex",
        justifyContent: "space-between",
        zIndex: 12
      }}>
        <button style={shoulderBtn("L")} {...pressHandlers("a")}>L</button>
        <button style={shoulderBtn("R")} {...pressHandlers("s")}>R</button>
      </div>

      {/* Action Buttons (A/B) */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 18,
        marginRight: 8
      }}>
        <button style={actionBtn("A")} {...pressHandlers("z")}>A</button>
        <button style={actionBtn("B")} {...pressHandlers("x")}>B</button>
      </div>

      {/* Start/Select */}
      <div style={{
        position: "absolute",
        left: "50%",
        bottom: -24,
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "row",
        gap: 18,
        zIndex: 11,
        padding: "0 12px 40px 12px"
      }}>
        <button style={smallBtn} {...pressHandlers("Enter")}>Start</button>
        <button style={smallBtn} {...pressHandlers("\\")}>Select</button>
      </div>

      

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 700px) {
          div[style*="maxWidth: 600px"] {
            flex-direction: column !important;
            align-items: center !important;
            gap: 12px !important;
            padding: 0 2vw !important;
          }
          div[style*="gridTemplateRows"] {
            width: 120px !important;
            height: 120px !important;
            grid-template-rows: repeat(3, 34px) !important;
            grid-template-columns: repeat(3, 34px) !important;
          }
          div[style*="top: -38px"] {
            top: -28px !important;
          }
          div[style*="bottom: -24px"] {
            bottom: -18px !important;
          }
          div[style*="bottom: -60px"] {
            bottom: -38px !important;
          }
        }
        @media (max-width: 400px) {
          div[style*="maxWidth: 600px"] {
            gap: 6px !important;
          }
        }
      `}</style>
    </div>
  );
}
