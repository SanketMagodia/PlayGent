import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Library from "./components/Library";
import Emulator from "./components/Emulator";
import { GbaProvider } from "react-gbajs";
import { ThemeProvider } from "./ThemeContext";
import AppFooter from "./components/footer";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route
            path="/emulator/:gameName"
            element={
              <GbaProvider>
                <Emulator />
              </GbaProvider>
            }
          />
        </Routes>
        <AppFooter />
      </Router>
    </ThemeProvider>
  );
}

export default App;
