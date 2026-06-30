# Snake Game

A simple web-based Snake game built with React and Vite for the frontend, and Express for a minimal backend API. This project demonstrates a playable Snake game experience in the browser, including movement controls, food collection, score tracking, and game over detection.

## Project Overview

- **Frontend:** React + Vite application that renders the Snake game board, manages game state, and handles keyboard input.
- **Backend:** Express server with CORS enabled, providing a basic API endpoint for future expansion.
- **Game logic:** Includes snake movement, food spawning, collision detection (walls and self), scoring, and restart functionality.

## Key Files and Structure

- `backend/server.js` - Express server that runs on `http://localhost:3001` and returns a status message.
- `frontend/package.json` - Frontend dependencies and scripts for development, build, linting, and preview.
- `frontend/src/App.jsx` - Main game component with board rendering, snake movement logic, and controls.
- `frontend/src/main.jsx` - React application entry point.
- `frontend/src/App.css` - Game styles for the board, snake, food, and user interface.
- `frontend/index.html` - Application HTML template.
- `frontend/vite.config.js` - Vite configuration.
- `frontend/eslint.config.js` - ESLint configuration for the frontend.

## Features

- Arrow key controls for snake movement
- Score display and game over message
- Random food generation avoiding the snake body
- Board boundary collision detection
- Snake self-collision detection
- Restart and play again support

## Tech Stack

- React 19
- Vite 4+
- Express 5
- CORS middleware
- ESLint for frontend code quality

## Setup and Run

### Frontend

1. Open a terminal in `frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the URL shown by Vite, usually `http://localhost:5173`

### Backend

1. Open a terminal in `backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. The backend runs at `http://localhost:3001`

## Why This Project Matters

This project is a strong demonstration of building an interactive browser game with modern web tools. It combines frontend game logic with a simple backend server, making it a good example for learning React state handling, game mechanics, and full-stack structure.

## Future Improvements

- Add sound effects and animations
- Store best scores locally or with a backend database
- Add touch controls for mobile devices
- Add levels, speed increase, or obstacles
- Expand backend API for score tracking or multiplayer support
