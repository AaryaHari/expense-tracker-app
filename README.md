# Expense Tracker Desktop App

This repo contains a minimal example of a desktop expense tracker built with React, Express, SQLite and Electron.

## Structure

```
backend/   - Express API and SQLite database
frontend/  - Vite + React application
desktop/   - Electron wrapper
```

## Usage

Because the environment does not allow installing dependencies automatically, you must run `npm install` in each folder with internet access enabled. Then start the backend and frontend separately:

```
cd backend && npm start
cd frontend && npm run dev
```

In another terminal, launch the Electron wrapper:

```
cd desktop && npm start
```

The app will be available in the Electron window.

This is only a basic template demonstrating API routes, React pages, and PDF generation. More polish and error handling is needed for production use.
