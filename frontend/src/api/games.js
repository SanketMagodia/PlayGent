const API_URL = "http://localhost:8000/api";

// export async function fetchGames() {
//   const res = await fetch(`${API_URL}/games`);
//   if (!res.ok) throw new Error("Failed to fetch games");
//   return res.json();
// }
// Helper: fetch games from FastAPI
export async function fetchGames({ q = "", page = 1, per_page = 24 }) {
  const res = await fetch(
    `${API_URL}/games?q=${encodeURIComponent(q)}&page=${page}&per_page=${per_page}`
  );
  return await res.json();
}
export async function fetchRom(gameName, signal) {
    const res = await fetch(`${API_URL}/roms/${encodeURIComponent(gameName)}`, {
      signal
    });
    if (!res.ok) throw new Error("Failed to fetch ROM");
    return res.arrayBuffer();
  }
