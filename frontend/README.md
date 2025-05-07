# Frontend - PlayGent 

This directory contains the source code for the React-based frontend of the PlayGent platform. It provides the user interface for Browse, playing, and managing GBA games.

## Overview

The frontend is responsible for:

* Displaying the game library.
* Rendering the GBA emulator within the browser.
* Handling user interactions for game controls, save/load states, and theming.
* Communicating with the `playapi` backend to fetch game ROMs and other necessary data.

## Technology Stack

* **React:** A JavaScript library for building user interfaces.
* **React Router:** For client-side routing and navigation.
* **Context API / State Management:** For managing global application state (e.g., theme, current game).
* **react-gbajs :** The core GBA emulator component integrated into React.
* **Yarn:** For package management.

## Prerequisites

* **Node.js:** (LTS version recommended, e.g., v18.x or v20.x)
* **Yarn:** (Classic or Berry)

## Setup and Installation

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd <repository-name>/frontend
    ```

2.  **Install dependencies using Yarn:**
    ```bash
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    yarn start
    ```
    This will typically start the frontend application on `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:

* `yarn start`: Runs the app in development mode.
* `yarn build`: Builds the app for production to the `build` folder.
* `yarn test`: Launches the test runner in interactive watch mode.
* `yarn eject`: (Use with caution) Removes the single build dependency from your project.

## Project Structure (Example)

frontend/
├── public/
│   └── index.html
│   └── ... (other static assets)
├── src/
│   ├── api
|   |   └── games.js            # API call functions (e.g., to playapi)
│   ├── images/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   ├── App.js           # Main application component
│   ├── index.js         # Entry point
│   ├── ThemeContext.js  # Theme config
|   └── loadingScreen.js # Full screen loading component
| 
├── package.json
└── README.md

## Contribution Guidelines

We welcome contributions to improve the frontend! Here are some areas where you can help:

* **UI Enhancements:** Improving the look and feel, responsiveness, and accessibility.
* **New Features:** Implementing features like advanced search/filter for games, new theme options, or improved mobile controls.
* **Bug Fixes:** Identifying and fixing issues.
* **Component Refactoring:** Improving code quality and maintainability.
* **Performance Optimization:** Ensuring the UI runs smoothly, especially during gameplay.

When contributing:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix (`git checkout -b feature/your-feature-name` or `bugfix/issue-number`).
3.  Make your changes and commit them with clear, descriptive messages.
4.  Push your branch to your fork.
5.  Open a Pull Request to the `main` (or `develop`) branch of the original repository.
6.  Ensure your code adheres to existing coding styles (consider adding a linter/formatter like ESLint/Prettier if not already present).

If you plan to make significant changes, it's a good idea to open an issue first to discuss your ideas.