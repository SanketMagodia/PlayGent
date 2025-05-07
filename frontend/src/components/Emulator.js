import React, { useEffect, useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRom } from "../api/games";
import { GbaContext } from "react-gbajs";
import ReactGbaJs from "react-gbajs";
import MobileControls from "./MobileControls";
import KeyboardHints from "./KeyboardHints";
import FullScreenLoading from "../loadingScreen";

export default function Emulator() {
  const { gameName } = useParams();
  const { play, saveState } = useContext(GbaContext);
  const loadedRom = useRef(null);
  const [showHints, setShowHints] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null); // Main component container
  const canvasContainerRef = useRef(null);
  const fullscreenHostRef = useRef(null); // New ref for the element that will go fullscreen
  const [showMobileControls, setShowMobileControls] = useState(false);
  const uploadInputRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 700;
    setShowMobileControls(isMobile);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (canvasContainerRef.current && !document.fullscreenElement) { // Only apply custom scaling when not fullscreen
        const container = canvasContainerRef.current;
        const maxWidth = window.innerWidth * 0.8;
        const containerWidth = window.innerWidth > 700 ?
          Math.min(container.offsetWidth, maxWidth) :
          container.offsetWidth;

        const containerHeight = containerWidth / 1.5;
        const widthScale = containerWidth / 240;
        const heightScale = containerHeight / 160;
        setScale(Math.min(widthScale, heightScale));
      } else if (document.fullscreenElement) {
        // In fullscreen, ReactGbaJs with 100% width/height and object-fit:contain
        // will handle scaling. We can reset our custom scale or set it to a sensible default.
        // Or, let ReactGbaJs handle it entirely via its parent's dimensions.
        // For simplicity, we might not need to change `scale` here if CSS handles fullscreen sizing well.
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [isFullscreen]); // Re-evaluate on fullscreen change too

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

  const goFullscreen = () => {
    const el = fullscreenHostRef.current; // Target the new host element
    if (!el) return;

    if (!document.fullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      // setIsFullscreen(true); // This will be handled by the event listener
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      // setIsFullscreen(false); // Handled by listener
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      if (containerRef.current) {
        if (isCurrentlyFullscreen) {
          containerRef.current.classList.add('emulator-body-fullscreen-active');
        } else {
          containerRef.current.classList.remove('emulator-body-fullscreen-active');
        }
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      if (containerRef.current) { // Cleanup class on unmount
        containerRef.current.classList.remove('emulator-body-fullscreen-active');
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="emulator-page-container" // Added a class for easier targeting
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", // Changed from "center" to "flex-start" for title
        position: "relative",
        padding: "0 8px"
      }}
    >
      <style>{`
        /* Styles for when the specific fullscreen host is active */
        .fullscreen-host-element:-webkit-full-screen {
          background: black !important;
          width: 100vw !important;
          height: 100vh !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important; /* Center canvas if it doesn't fill height */
          align-items: center !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .fullscreen-host-element:fullscreen {
          background: black !important;
          width: 100vw !important;
          height: 100vh !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: center !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        /* Canvas container within our fullscreen host */
        .fullscreen-host-element:-webkit-full-screen .gba-canvas-container {
          width: 100% !important; /* Allow it to be flexible within the host */
          /* height is determined by aspect ratio and parent height */
          max-width: 100vw !important;
          max-height: 100vh !important; /* Ensure it fits viewport height */
          background: black !important;
          border: none !important;
          border-radius: 0 !important;
          flex-grow: 1; /* Allow canvas container to take up space */
          display: flex; /* To center the canvas itself if ReactGbaJs doesn't fill */
          align-items: center;
          justify-content: center;
        }
        .fullscreen-host-element:fullscreen .gba-canvas-container {
          width: 100% !important;
          max-width: 100vw !important;
          max-height: 100vh !important;
          background: black !important;
          border: none !important;
          border-radius: 0 !important;
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Mobile controls wrapper within our fullscreen host */
        .fullscreen-host-element:-webkit-full-screen .mobile-controls-fullscreen-wrapper {
          display: block !important; /* Ensure it's shown if showMobileControls is true */
          width: 100%;
          position: absolute; /* Position over the canvas at the bottom */
          bottom: 0;
          left: 0;
          z-index: 100; /* Make sure it's on top */
          /* Add any specific styling for mobile controls in fullscreen */
        }
        .fullscreen-host-element:fullscreen .mobile-controls-fullscreen-wrapper {
          display: block !important;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 100;
        }

        /* Hide other page elements when emulator-body-fullscreen-active is on the containerRef */
        .emulator-body-fullscreen-active .page-element-to-hide {
          display: none !important;
        }
        
        /* Responsive styles for canvas container (normal view) */
        @media (max-width: 700px) {
          .gba-canvas-container {
            width: 100% !important;
            min-width: 240px !important; /* GBA native width */
            max-width: 100% !important;
          }
        }
      `}</style>

      <h2
        className="page-element-to-hide" // Class to hide in fullscreen
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
        style={{ // This is the main content wrapper below the title
          margin: "0px 0 16px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: "100%",
          maxWidth: 1000,
        }}
      >
        {/* Emulator Display and Mobile Controls Host for Fullscreen */}
        <div
          ref={fullscreenHostRef}
          className="fullscreen-host-element" // Class for specific fullscreen styling
          style={{
            background: isFullscreen ? "black" : "#111", // Dynamic background
            borderRadius: isFullscreen ? 0 : 22,
            boxShadow: isFullscreen ? "none" : "0 6px 32px #000b",
            padding: isFullscreen ? 0 : 18,
            display: "flex", // Using flex to manage children
            flexDirection: "column", // Stack canvas and controls
            justifyContent: "center",
            alignItems: "center",
            position: "relative", // For absolute positioning of mobile controls in fullscreen
            width: "100%",
            maxWidth: 1000, // Max width in normal mode
            // height will be auto or defined by children / fullscreen
          }}
        >
          {loading && !isFullscreen && <FullScreenLoading />}
          {error && !isFullscreen && (
            <div style={{ color: "#f66", fontWeight: 600, padding: 24 }}>
              {error}
            </div>
          )}
          <div
            ref={canvasContainerRef}
            className="gba-canvas-container"
            style={{
              width: "100%", 
              height: "auto",
              aspectRatio: "3 / 2",
              background: "#222",
              borderRadius: 12,
              overflow: "hidden",
              border: "2px solid #333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto", // Center in normal view
              transition: "all 0.3s"
              // Fullscreen styles will override via CSS
            }}
          >
            <ReactGbaJs
              scale={scale} // Scale primarily for non-fullscreen
              volume={1}
              key={gameName}
              style={{
                display: loading ? "none" : "block",
                width: "100%", // Fill the .gba-canvas-container
                height: "100%", // Fill the .gba-canvas-container
                imageRendering: "pixelated",
                objectFit: "contain", // Important for aspect ratio
              }}
              canvasProps={{
                id: "gba-canvas",
                tabIndex: 0,
                style: { width: '100%', height: '100%' }
              }}
            />
          </div>

          {/* Mobile Controls - wrapped for fullscreen styling */}
          {showMobileControls && (
            <div className="mobile-controls-fullscreen-wrapper">
              <MobileControls />
            </div>
          )}
        </div>


        {/* Main Controls (buttons) - to be hidden in fullscreen */}
        <div
          className="page-element-to-hide" // Class to hide in fullscreen
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
            {isFullscreen ? "Exit Fullscreen" : "⛶ Fullscreen"}
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

        {/* Tips - to be hidden in fullscreen */}
        <div
          className="page-element-to-hide" // Class to hide in fullscreen
          style={{ color: "#aaa", fontSize: 14, marginTop: 10, textAlign: "center" }}
        >
          <div>
            <b>Tip:</b> Download your <code>.gbastate</code> file to back up or continue on another device.
            Upload a <code>.gbastate</code> file to restore your progress.
          </div>
          <div>
            The state file is portable and works with this platform.
          </div>
        </div>
      </div>

      {/* Keyboard Hints Overlay - will be hidden by page-element-to-hide if its parent gets it */}
      {/* Or, add the class directly if it's outside the flow */}
      {showHints && <div className="page-element-to-hide"><KeyboardHints onClose={() => setShowHints(false)} /></div>}
    </div>
  );
}

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