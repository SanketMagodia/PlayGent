import React, { useEffect, useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRom } from "../api/games";
import { GbaContext } from "react-gbajs";
import ReactGbaJs from "react-gbajs";
import MobileControls from "./MobileControls";
import KeyboardHints from "./KeyboardHints";
import { useTheme } from "../ThemeContext";
import FullScreenLoading from "../loadingScreen";

export default function Emulator() {
  const { gameName } = useParams();
  const { play, saveState } = useContext(GbaContext);
  const loadedRom = useRef(null);
  const [showHints, setShowHints] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scale, setScale] = useState(1);
  const containerRef = useRef();
  const canvasContainerRef = useRef();
  const [showMobileControls, setShowMobileControls] = useState(false);
  const uploadInputRef = useRef();

  // Responsive scaling based on container width, keeping 3:2 aspect ratio
  // Responsive scaling based on container width, keeping 3:2 aspect ratio
  useEffect(() => {
    function handleResize() {
      if (canvasContainerRef.current) {
        const container = canvasContainerRef.current;
        const maxWidth = window.innerWidth * 0.7; // 70% of viewport width
        const containerWidth = window.innerWidth > 700 ? 
          Math.min(container.offsetWidth, maxWidth) : 
          container.offsetWidth; // 100% width on mobile
        
        // Calculate height based on 3:2 aspect ratio
        const containerHeight = containerWidth / 1.5;
        
        // Calculate scale based on GBA's native resolution (240x160)
        const widthScale = containerWidth / 240;
        const heightScale = containerHeight / 160;
        
        // Use the smaller scale to prevent distortion
        setScale(Math.min(widthScale, heightScale));
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize(); // initial
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load ROM on mount or game change
  useEffect(() => {
    if (!gameName || loadedRom.current === gameName) return;

    const controller = new AbortController();
    setLoading(true);
    setError("");

    const loadRom = async () => {
      try {
        const arrayBuffer = await fetchRom(gameName, controller.signal);
        play({ newRomBuffer: new Uint8Array(arrayBuffer) });
        loadedRom.current = gameName;
        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Failed to load ROM.");
          setLoading(false);
        }
      }
    };

    loadRom();
    return () => controller.abort();
  }, [gameName, play]);

  // Stop and reset emulator on unmount/navigation away
  useEffect(() => {
    return () => {
      if (window.gba) {
        window.gba.pause();
        window.gba.reset();
        window.gba.rom = null;
        window.gba.save = null;
      }
      loadedRom.current = null;
    };
  }, []);

  // Download state file for cross-device use
  const downloadState = async () => {
    try {
      const state = await saveState();
      const blob = new Blob([JSON.stringify(state)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${gameName}.gbastate`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Download failed.");
    }
  };

  // Upload state file to restore progress
  const uploadState = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const state = JSON.parse(event.target.result);
        fetchRom(gameName).then(arrayBuffer => {
          play({ newRomBuffer: new Uint8Array(arrayBuffer), restoreState: state });
        });
        alert("State loaded!");
      } catch (err) {
        alert("Invalid state file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Fullscreen (use the container, not the canvas)
  const goFullscreen = () => {
    const el = containerRef.current;
    if (el && el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el && el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        // background: "linear-gradient(120deg,#151a29 0%,#232b42 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        padding: "0 8px"
      }}
    >
      {/* Responsive styles for canvas container */}
      <style>{`
  @media (max-width: 700px) {
    .gba-canvas-container {
      width: 100% !important;
      min-width: 240px !important;
      max-width: 100% !important;
    }
  }
`}</style>

      <h2
        style={{
          color: "#fff",
          marginTop: 32,
          fontWeight: 700,
          letterSpacing: 1,
          textShadow: "0 2px 8px #0008",
          fontSize: "clamp(1.1rem, 3vw, 2rem)",
          textAlign: "center",
        }}
      >
        Now Playing: <span style={{ color: "#67e8f9" }}>{gameName}</span>
      </h2>

      <div
        style={{
          margin: "0px 0 16px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: "100%",
          maxWidth: 900, // Increased from 600 to allow wider game screen
        }}
      >
        {/* Emulator Display */}
        <div
          style={{
            background: "#111",
            borderRadius: 22,
            boxShadow: "0 6px 32px #000b",
            padding: 18,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
            maxWidth: 900,
          }}
        >
          {loading && (
            <FullScreenLoading/>
          )}
          {error && (
            <div
              style={{
                color: "#f66",
                fontWeight: 600,
                padding: 24
              }}
            >
              {error}
            </div>
          )}
          <div
  ref={canvasContainerRef}
  className="gba-canvas-container"
  style={{
    width: "70%", // Default to 70% width
    height: "auto", // Height will be determined by aspect ratio
    aspectRatio: "3 / 2",
    background: "#222",
    borderRadius: 12,
    overflow: "hidden",
    border: "2px solid #333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    transition: "all 0.3s"
  }}
>
  <ReactGbaJs
    scale={scale}
    volume={1}
    key={gameName}
    style={{ 
      display: loading ? "none" : "block",
      width: "100%",
      height: "100%",
      imageRendering: "pixelated",
      objectFit: "contain"
    }}
    canvasProps={{ 
      id: "gba-canvas", 
      tabIndex: 0,
      style: { width: '100%', height: '100%' }
    }}
  />
</div>
        </div>

        {/* Mobile Controls below emulator */}
        {showMobileControls && <MobileControls />}

        {/* Controls */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <button style={uiBtn} onClick={downloadState}>
            💾 Download State
          </button>
          <label htmlFor="upload-state" style={{ ...uiBtn, cursor: "pointer" }}>
            📂 Upload State
          </label>
          <input
            type="file"
            accept=".gbastate"
            id="upload-state"
            ref={uploadInputRef}
            onChange={uploadState}
            style={{ display: "none" }}
          />
          <button style={uiBtn} onClick={goFullscreen}>
            ⛶ Fullscreen
          </button>
          <button style={uiBtn} onClick={() => setShowHints((v) => !v)}>
            ⌨️ Keyboard
          </button>
          <button
            style={uiBtn}
            onClick={() => setShowMobileControls((v) => !v)}
          >
            {showMobileControls ? "Hide Touch Controls" : "Show Touch Controls"}
          </button>
        </div>
        <div style={{ color: "#aaa", fontSize: 14, marginTop: 10, textAlign: "center" }}>
          <div>
            <b>Tip:</b> Download your <code>.gbastate</code> file to back up or continue on another device.
            Upload a <code>.gbastate</code> file to restore your progress.
          </div>
          <div>
            The state file is portable and works with this platform.
          </div>
        </div>
      </div>

      {/* Keyboard Hints Overlay */}
      {showHints && <KeyboardHints onClose={() => setShowHints(false)} />}
    </div>
  );
}

// --- Helper styles and functions ---
const uiBtn = {
  background: "linear-gradient(90deg,#67e8f9 0%,#38bdf8 100%)",
  color: "#222",
  border: "none",
  borderRadius: 8,
  padding: "8px 18px",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 2px 8px #2223",
  transition: "background 0.2s"
};
