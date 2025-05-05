import os
from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
# --- Configuration ---
ROMS_DIRECTORY = "roms" # Directory where your .gba files are stored
# --- ---

app = FastAPI()

# --- CORS Middleware ---
# Allows the React frontend (running on a different port) to communicate with the backend.
# Adjust origins as needed for production.
origins = [
    "http://localhost:3000", # Default React dev server port
    "http://localhost:5173", # Default Vite dev server port
    # Add other origins if necessary
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
    expose_headers=["*"]
)
# --- ---

# --- Helper Function ---
def get_available_roms() -> List[str]:
    """Scans the ROMS_DIRECTORY for .gba files."""
    rom_files = []
    if not os.path.isdir(ROMS_DIRECTORY):
        print(f"Warning: ROMs directory '{ROMS_DIRECTORY}' not found.")
        return []
    try:
        for filename in os.listdir(ROMS_DIRECTORY):
            if filename.lower().endswith(".gba"):
                rom_files.append(filename)
    except Exception as e:
        print(f"Error scanning ROMs directory: {e}")
        return []
    return rom_files

@app.get("/api/games")
def list_games(
    q: Optional[str] = Query(None, description="Search query"),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(24, ge=1, le=100, description="Games per page"),
):
    """
    Returns a paginated, optionally filtered list of GBA game filenames.
    """
    games = get_available_roms()
    # Apply search filter if present
    if q:
        games = [g for g in games if q.lower() in g.lower()]
    total = len(games)
    start = (page - 1) * per_page
    end = start + per_page
    games_page = games[start:end]
    pages = (total + per_page - 1) // per_page
    return JSONResponse({
        "games": games_page,
        "total": total,
        "page": page,
        "per_page": per_page,
        "pages": pages,
    })

@app.get("/api/roms/{game_name}")
async def get_rom(game_name: str):
    """Serves the specified GBA ROM file."""
    available_roms = get_available_roms()

    # Basic security: Validate the requested game name exists
    if game_name not in available_roms:
        raise HTTPException(status_code=404, detail="Game not found")

    file_path = os.path.join(ROMS_DIRECTORY, game_name)

    # Double-check file existence before serving
    if not os.path.isfile(file_path):
        print(f"Error: File '{file_path}' not found despite being listed.")
        raise HTTPException(status_code=500, detail="Internal server error: ROM file missing")

    # Return the file as a response
    # Use 'application/octet-stream' for binary files like ROMs
    response = FileResponse(
        path=file_path,
        media_type='application/octet-stream',
        filename=game_name,
        headers={'Access-Control-Allow-Origin': 'http://localhost:3000'}
    )
    return response
# --- ---

# --- Run Instruction (for development) ---
# Run this from the 'backend' directory using: uvicorn main:app --reload