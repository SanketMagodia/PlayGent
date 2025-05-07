import React , { useEffect, useRef }  from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Library from "./components/Library";
import Emulator from "./components/Emulator";
import { GbaProvider } from "react-gbajs";
import { ThemeProvider } from "./ThemeContext";
import AppFooter from "./components/footer";
import AboutPage from "./components/about";

function NavigationHandler() {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    // If previous path was /emulator/* and current path is not
    if (
      prevPath.current.startsWith("/emulator") &&
      !location.pathname.startsWith("/emulator")
    ) {
      // Optionally: reset emulator state here instead of reload
      window.location.reload();
    }
    prevPath.current = location.pathname;
  }, [location.pathname]);

  return null;
}



function App() {
  return (
    <ThemeProvider>
      <Router>
      <NavigationHandler />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/about" element={<AboutPage />} />
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
