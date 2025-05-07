import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// Ensure the path to ThemeContext is correct
import { useTheme } from "../ThemeContext";
import { FaGamepad, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

// --- Theme Colors (Copied from Home component for context - use your actual ThemeContext values) ---
const lightThemeColors = {
  background: " #ffffff", text: "#2d3748", textSecondary: "#4a5568", heading: "#1a202c",
  primary: "#4299e1", primaryGradient: "linear-gradient(90deg, #4299e1 0%, #63b3ed 100%)",
  primaryHoverGradient: "linear-gradient(90deg, #63b3ed 0%, #90cdf4 100%)", primaryShadow: "rgba(66, 153, 225, 0.3)",
  cardBg: "#ffffff", cardBorder: "#e2e8f0", cardShadow: "rgba(0, 0, 0, 0.09)", buttonText: "#ffffff",
  // Add nav-specific theme colors if needed, otherwise use defaults
  navBackground: "rgba(180, 193, 206, 0.8)", // Lighter semi-transparent white
  navShadow: "rgba(45, 55, 72, 0)", // Softer shadow for light theme
  navMobileBg: "rgba(248, 250, 252, 0.98)",
};
const darkThemeColors = {
  background: "#121212", text: "#e2e8f0", textSecondary: "#a0aec0", heading: "#ffffff",
  primary: "#f56565", primaryGradient: "linear-gradient(90deg, #f56565 0%, #fc8181 100%)",
  primaryHoverGradient: "linear-gradient(90deg, #fc8181 0%, #feb2b2 100%)", primaryShadow: "rgba(245, 101, 101, 0.3)",
  cardBg: "#1a202c", cardBorder: "#2d3748", cardShadow: "rgba(0, 0, 0, 0.4)", buttonText: "#ffffff",
   // Add nav-specific theme colors if needed
  navBackground: "rgba(26, 32, 44, 0.85)", // Dark semi-transparent
  navShadow: "rgba(0, 0, 0, 0.3)", // Darker shadow
  navMobileBg: "rgba(26, 32, 44, 0.98)",
};
// --- End Theme Colors ---


// Define theme-based styles for the Navbar
const getNavbarStyles = (theme, dark) => ({
  nav: {
    background: theme.navBackground, // Use specific nav background
    backdropFilter: "blur(12px)", // Slightly more blur
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: `0 4px 20px ${theme.navShadow}`, // Adjusted shadow
    position: "sticky",
    top: 0,
    zIndex: 50,
    width: '100%',
    transition: 'background 0.3s ease, box-shadow 0.3s ease',
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 25px", // Increased padding for thickness
    maxWidth: 1200,
    margin: "0 auto"
  },
  brandLink: {
     display: "flex",
     alignItems: "center",
     gap: 12, // Increased gap slightly
     textDecoration: 'none',
  },
  brandIcon: {
    color: theme.primary,
    fontSize: 30, // Slightly larger icon
    filter: `drop-shadow(0 2px 4px ${theme.primaryShadow})`, // Enhanced shadow
    transition: 'color 0.3s ease, transform 0.2s ease',
  },
  brandName: {
    fontFamily: "'Press Start 2P', cursive", // Retro font
    fontWeight: 400, // Press Start 2P is typically not bolded
    fontSize: 18, // Adjust size for pixel font legibility
    letterSpacing: 1, // Adjust spacing if needed
    color: theme.heading,
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
    textShadow: `1px 1px 0px ${dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'}`, // Subtle pixel shadow
    // Add class for hover animation
  },
  hamburgerButton: {
    background: "none", border: "none", display: "none",
    fontSize: 26, // Larger hamburger icon
    color: theme.text, cursor: "pointer", padding: '8px', // Easier to click
    zIndex: 52, transition: 'color 0.3s ease',
  },
  navLinksContainer: {
     display: 'flex', alignItems: 'center', gap: '30px', // Increased gap
     transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s ease', // Smoother animation
  },
  themeToggleButton: {
    background: "none", border: "none", cursor: "pointer",
    fontSize: 22, marginLeft: 15, padding: '8px', // Easier to click
    color: dark ? "#fbbf24" : "#4a5568", // Specific icon colors
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'color 0.3s ease, transform 0.2s ease',
  },
  // Styles for individual NavLink component
  navLinkBase: {
     fontFamily: "'VT323', monospace", // Optional: Another retro font for links
     fontWeight: 500,
     fontSize: 18, // Slightly larger links
     textDecoration: "none",
     padding: "10px 5px", // Increased vertical padding
     position: 'relative',
     color: theme.textSecondary,
     transition: "color 0.2s ease",
     overflow: 'hidden', // Contain pseudo-elements
  },
  navLinkActive: {
     color: theme.primary,
     fontWeight: 700,
  },
  // Underline Animation (Revised) - Slide in effect
  navLinkUnderline: {
      content: '""', position: 'absolute', bottom: '5px', // Positioned slightly higher
      left: '-100%', // Start off-screen left
      width: '100%', height: '3px', // Thicker underline
      background: `linear-gradient(90deg, ${theme.primary} 50%, transparent 50%)`, // Gradient for potential effect
      backgroundSize: '200% 100%',
      transition: 'left 0.3s ease-out, background-position 0.4s ease', // Animate left position
      borderRadius: '1px',
  },
   navLinkUnderlineActive: {
      left: '0%', // Slide in to position 0
      backgroundPosition: '-100% 0', // Example for gradient animation if used
   },
   // Optional: Add a subtle background highlight on hover for links
   navLinkHoverBg: {
       position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
       background: dark ? 'rgba(255, 126, 27, 0.1)' : 'rgba(52, 152, 219, 0.1)',
       opacity: 0,
       transition: 'opacity 0.2s ease',
       zIndex: -1,
       borderRadius: '4px',
   }
});

// --- NavLink Component ---
function NavLink({ to, label, active, styles, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const linkStyle = {
      ...styles.navLinkBase,
      ...(active ? styles.navLinkActive : {}),
  };
   const underlineStyle = {
      ...styles.navLinkUnderline,
      ...(active || isHovered ? styles.navLinkUnderlineActive : {}), // Activate on hover too
   };
    const hoverBgStyle = {
        ...styles.navLinkHoverBg,
        opacity: isHovered ? 1 : 0, // Show background on hover
    };

  return (
    <Link
        to={to}
        style={linkStyle}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <span style={hoverBgStyle}></span> {/* Hover background element */}
      {label}
      <span style={underlineStyle}></span> {/* Underline element */}
    </Link>
  );
}


// --- Main Navbar Component ---
export default function Navbar() {
  const { dark, toggle } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const theme = dark ? darkThemeColors : lightThemeColors;
  const styles = getNavbarStyles(theme, dark);

  useEffect(() => { setIsOpen(false); }, [location]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isOpen]);

  return (
    // Add Google Font links in your main index.html or dynamically load them
    // <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet">
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Brand Logo/Name */}
        <Link to="/" style={styles.brandLink} aria-label="PlayGent Home" className="brand-link-animated">
          <FaGamepad style={styles.brandIcon} className="brand-icon-animated" />
          <span style={styles.brandName} className="brand-name-animated">
             PlayGent
          </span>
        </Link>

        {/* Hamburger Button (Mobile) */}
        <button
          onClick={() => setIsOpen(o => !o)}
          className="nav-hamburger"
          style={styles.hamburgerButton}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links & Theme Toggle */}
        <div
           className={`nav-links-container ${isOpen ? "open" : ""}`}
           style={styles.navLinksContainer}
        >
          <NavLink to="/" label="Home" active={location.pathname === "/"} styles={styles} onClick={() => setIsOpen(false)} />
          <NavLink to="/library" label="Library" active={location.pathname.startsWith("/library") || location.pathname.startsWith("/emulator")} styles={styles} onClick={() => setIsOpen(false)} />
          <NavLink to="/about" label="About" active={location.pathname === "/about"} styles={styles} onClick={() => setIsOpen(false)} />
          <button
            aria-label="Toggle theme"
            onClick={toggle}
            style={styles.themeToggleButton}
            className="theme-toggle-button-animated" // Class for hover effect
          >
            {dark ? <FaSun color="#fbbf24" /> : <FaMoon />}
          </button>
        </div>
      </div>

      {/* Responsive styles & Animations */}
      <style>{`
        /* Import Fonts (Ideally do this in index.html <head>) */
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

        .nav-hamburger { display: none; }
        .nav-links-container { /* Base styles applied via inline */ }

        /* Brand Hover Animations */
        .brand-link-animated:hover .brand-icon-animated {
            transform: rotate(-15deg) scale(1.1); /* Tilt icon */
        }
        .brand-link-animated:hover .brand-name-animated {
            color: ${theme.primary}; /* Change color on hover */
            text-shadow: 0 0 8px ${theme.primaryShadow}, 1px 1px 0px ${dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'}; /* Add glow */
        }

         /* Theme Toggle Button Hover */
        .theme-toggle-button-animated:hover {
            transform: scale(1.15) rotate(${dark ? '15deg' : '-15deg'}); /* Scale and rotate icon */
        }


        /* Mobile Menu Styles */
        @media (max-width: 768px) {
          body {
            overflow-x: hidden; /* Prevent horizontal scroll */
          }
          .nav-hamburger { display: block !important; }
          .nav-links-container {
            position: fixed; top: 0; right: 0; /* Change left to right */
            width: 100%; height: 100vh;
            background: ${theme.navMobileBg}; /* Use specific mobile bg */
            backdrop-filter: blur(8px); WebkitBackdropFilter: blur(8px);
            flex-direction: column; align-items: center; justify-content: center;
            gap: 35px; /* Increased gap */
            padding: 60px 20px 20px;
            transform: translateX(100%); opacity: 0;
            pointer-events: none; z-index: 51;
            /* Use the same transition as base style */
            transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s ease;
            overscroll-behavior: contain; /* Prevent scroll chaining */
            touch-action: none; /* Disable touch scrolling when menu is open */
          }
          .nav-links-container.open {
            transform: translateX(0); opacity: 1; pointer-events: auto;
          }
          /* Mobile Link Styles */
          .nav-links-container a {
             font-size: 1.6rem; /* Larger font */
             padding: 15px 0; width: 80%; text-align: center;
             font-family: 'VT323', monospace; /* Apply retro font here too */
          }
          /* Mobile Theme Toggle */
           .nav-links-container button {
              margin-top: 25px; font-size: 2rem; /* Larger toggle */
           }
           /* Hide underline animation on mobile links if desired */
           .nav-links-container a span[style*="transform"] {
              display: none;
           }
        }
      `}</style>
    </nav>
  );
}