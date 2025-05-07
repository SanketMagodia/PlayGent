# PlayAPI - PlayGent Backend

This directory contains the source code for PlayAPI, the FastAPI-based Python backend for the PlayGent platform. Its primary role is to serve game ROMs and potentially handle other game-related data and logic.

## Overview

PlayAPI provides the necessary backend support for the frontend, including:

* Serving GBA game ROM files.
* Providing a list of available games.
* (Future) Managing user-specific game states or preferences.
* (Future) Handling other game-related metadata or services.

## Technology Stack

* **Python:** (Version 3.8+ recommended)
* **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python based on standard Python type hints.
* **Uvicorn:** An ASGI server, used to run the FastAPI application.
* **UV:** An extremely fast Python package installer and resolver, written in Rust. Used for dependency management and virtual environments.

## Prerequisites

* **Python:** (Version 3.8 or newer)
* **UV:** Installation instructions can be found at [https://github.com/astral-sh/uv](https://github.com/astral-sh/uv)

## Setup and Installation

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd <repository-name>/playapi
    ```

2.  **Create and activate a virtual environment using UV:**
    ```bash
    uv venv
    ```
    This will create a `.venv` directory. Activate it:
    * On macOS and Linux:
        ```bash
        source .venv/bin/activate
        ```
    * On Windows (Git Bash or similar):
        ```bash
        source .venv/Scripts/activate
        ```
    * On Windows (Command Prompt):
        ```bash
        .venv\Scripts\activate.bat
        ```
    * On Windows (PowerShell):
        ```bash
        .venv\Scripts\Activate.ps1
        ```

3.  **Install dependencies using UV:**
    Make sure your virtual environment is activated.
    ```bash
    uv pip install -r requirements.txt
    ```
    (If `requirements.txt` is not present, you might have a `pyproject.toml` if using Poetry or PDM originally, and would use `uv pip install .`) Assuming `requirements.txt` for a typical FastAPI setup.

4.  **Game ROMs:**
    Place your GBA game ROM files (usually `.gba` extension) into a designated directory. For example, create a `roms/` directory within the `playapi` folder and place your ROM files there.
    ```
    playapi/
    ├── roms/
    │   ├── game1.gba
    │   └── game2.gba
    ├── main.py       # FastAPI app instance
    │   
    ├── pyproject.toml
    └── README.md
    ```
    

5.  **Configure Environment Variables (if any):**
    If the application requires environment variables (e.g., for database connections, ROM paths if not hardcoded), create a `.env` file in the `playapi` directory.
    Example `.env`:
    ```
    ROMS_DIRECTORY=./roms
    ```

6.  **Run the development server using Uvicorn:**
    ```bash
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ```
    Replace `app.main:app` with the actual path to your FastAPI application instance if it differs.
    * `app.main`: Refers to the `main.py` file inside an `app` directory.
    * `app`: Refers to the FastAPI instance (e.g., `app = FastAPI()`).
    * `--reload`: Enables auto-reloading when code changes are detected (for development).
    * `--host 0.0.0.0`: Makes the server accessible from your local network.
    * `--port 8000`: Specifies the port to run on.

    The API should now be accessible, typically at `http://localhost:8000/docs` for the Swagger UI and `http://localhost:8000/redoc` for ReDoc.

## API Endpoints (Example)

* **`GET /games`**: Returns a list of available games.
* **`GET /roms/{game_filename}`**: Streams the specified game ROM file.

(These are examples; consult the API documentation or source code for actual endpoints.)

## Contribution Guidelines

Contributions to PlayAPI are highly encouraged! Potential areas include:

* **New Endpoints:** Adding endpoints for new features (e.g., user accounts, game metadata).
* **Performance Optimization:** Improving the speed and efficiency of ROM serving or other operations.
* **Security Enhancements:** Ensuring the API is secure.
* **Database Integration:** Adding database support for persistent data (e.g., user save states if managed server-side).
* **Code Quality:** Refactoring, adding tests, and improving documentation.

When contributing:

1.  Fork the repository.
2.  Create a feature or bugfix branch.
3.  Make your changes. Ensure you add or update tests for your changes.
4.  Format your code (e.g., using Black and Ruff, common in FastAPI projects).
5.  Commit your changes with clear messages.
6.  Push to your fork and open a Pull Request.
7.  If adding new dependencies, update `requirements.txt` (or `pyproject.toml`) accordingly.

If you are planning a significant architectural change or a large new feature, please open an issue to discuss it with the maintainers first.