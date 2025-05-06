import { FaEnvelope, FaGithub, FaTwitter, FaHome, FaGamepad, FaInfoCircle } from "react-icons/fa";
import { useTheme } from "../ThemeContext";

export default function AppFooter() {
  const { dark, theme } = useTheme();

  return (
    <footer
      style={{
        width: "100%",
        background: dark
          ? "linear-gradient(120deg,rgba(20,22,30,0.98) 0%,rgba(35,43,66,0.98) 100%)"
          : "linear-gradient(120deg,#f7fafc 0%,#e0e7ff 100%)",
        color: dark ? "#e0e7ef" : "#232b42",
        padding: "36px 0 18px 0",
        // borderTop: `2px solid ${theme?.gbaBorder || "#232b42"}`,
        // marginTop: 40,
        boxShadow: dark
          ? "0 -2px 24px #000a"
          : "0 -2px 24px #cbd5e122",
        fontSize: 16,
        letterSpacing: 0.2,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 32,
        padding: "0 24px",
      }}>
        {/* Brand & tagline */}
        <div style={{ flex: "1 1 180px", minWidth: 180 }}>
          <div style={{
            display: "flex", alignItems: "center",
            fontWeight: 900, fontSize: 22,
            color: theme?.gbaAccent || "#67e8f9", letterSpacing: 1
          }}>
            <FaGamepad style={{ marginRight: 10 }} /> PlayGent
          </div>
          <div style={{ fontSize: 13, color: dark ? "#aaa" : "#555", marginTop: 6 }}>
            Your open-source retro gaming hub. Play, save, and relive your favorites!
          </div>
        </div>
        {/* Links */}
        <div style={{ flex: "1 1 120px", minWidth: 120 }}>
          <div style={{
            fontWeight: 700, fontSize: 15, marginBottom: 8,
            color: theme?.gbaAccent || "#67e8f9"
          }}>Links</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 2 }}>
            <li><a href="/" style={footerLink(dark)}><FaHome style={iconStyle} /> Home</a></li>
            <li><a href="/library" style={footerLink(dark)}><FaGamepad style={iconStyle} /> Library</a></li>
            <li><a href="/about" style={footerLink(dark)}><FaInfoCircle style={iconStyle} /> About</a></li>
          </ul>
        </div>
        {/* Contact & Social */}
        <div style={{ flex: "1 1 180px", minWidth: 180 }}>
          <div style={{
            fontWeight: 700, fontSize: 15, marginBottom: 8,
            color: theme?.gbaAccent || "#67e8f9"
          }}>Contact</div>
          <div style={{ marginBottom: 8 }}>
            <a href="mailto:magodiasanket@gmail.com" style={{
              ...footerLink(dark), fontWeight: 600
            }}>
              <FaEnvelope style={iconStyle} /> magodiasanket@gmail.com
            </a>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
            <a href="https://github.com/SanketMagodia/PlayGent" style={footerIconLink(theme)} title="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            {/* Add more socials as needed */}
          </div>
        </div>
      </div>
      {/* Bottom row */}
      <div style={{
        textAlign: "center",
        color: dark ? "#888" : "#666",
        fontSize: 13,
        marginTop: 30,
        letterSpacing: 0.2
      }}>
        © {new Date().getFullYear()} PlayGent · Made with <span style={{ color: "#f87171" }}>♥</span> for retro gamers · <a href="mailto:contact@playgent.app" style={{ color: theme?.gbaAccent || "#67e8f9", textDecoration: "underline" }}>Contact Us</a>
      </div>
    </footer>
  );
}

const footerLink = (dark) => ({
  color: dark ? "#e0e7ef" : "#232b42",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 15,
  transition: "color 0.2s",
  marginBottom: 2,
  opacity: 0.92,
  fontWeight: 500,
});

const footerIconLink = (theme) => ({
  color: theme?.gbaAccent || "#67e8f9",
  fontSize: 22,
  textDecoration: "none",
  transition: "color 0.2s",
  opacity: 0.88,
});
const iconStyle = { marginRight: 6, opacity: 0.8 };

// Usage: <AppFooter />
