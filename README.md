# Expense Tracker Desktop App

This repo contains a simple desktop expense tracker built with React, Express, SQLite and Electron.
The application allows you to record expenses and credits, maintain running account balances and generate reports.

## Features

- **Login** page for authentication.
- **Add/Update Expense** form for recording credit or debit transactions.
- Running balances for Bank, Chase and Discover accounts along with overall total.
- **Summary** page showing a pie chart of spending grouped by month, mode or type.
- **Reports** page to download monthly PDF reports which also display total credit and debit for the selected month.

## Structure

```
backend/   - Express API and SQLite database
frontend/  - Vite + React application
desktop/   - Electron wrapper
```

## Usage

Run `./setup.sh` with internet access to install dependencies for each folder. Then start the backend and frontend separately:

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
