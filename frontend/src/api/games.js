const API_URL = "http://localhost:8000/api";

export async function fetchGames() {
  const res = await fetch(`${API_URL}/games`);
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
}

export async function fetchRom(gameName, signal) {
    const res = await fetch(`${API_URL}/roms/${encodeURIComponent(gameName)}`, {
      signal
    });
    if (!res.ok) throw new Error("Failed to fetch ROM");
    return res.arrayBuffer();
  }
