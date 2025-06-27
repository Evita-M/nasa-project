# Nasa Mission Frontier &nbsp; _In Progress_

React Vite Zustand React-Hook-Form TypeScript TailwindCSS Prettier ESLint Express REST API MongoDB pnpm Monorepo

A modern web application for exploring habitable exoplanets and managing NASA mission launches. Built with a React + Vite frontend and an Express + MongoDB backend, organized as a pnpm monorepo.

<!-- image or demo gif here -->

---

## ✨ Features

- View a list of habitable exoplanets (from NASA Kepler data)
- Schedule new space mission launches to selected planets
- View upcoming launches and abort them if needed
- View history of all past launches
- REST API for planets and launches
- Modern UI with Zustand state management and Tailwind CSS
- Monorepo structure for easy development and deployment
- Form handling and validation with React-Hook-Form
- Type-safe codebase with TypeScript
- Comprehensive test coverage for backend and frontend

---

## 🎮 Core Functionalities

### 🪐 Planet Explorer

- Browse a curated list of habitable exoplanets
- Data sourced from NASA's Kepler mission

### 🚀 Mission Launch Management

- Schedule new launches with mission, rocket, date, and planet
- View and abort upcoming launches
- Review history of all past launches

---

## 🔑 Environment Variables

Create a `.env` file in the `server` directory:

```
MONGO_URL=your_mongodb_connection_string
PORT=8000
SPACEX_API_URL=spacex_api_url
```

- `MONGO_URL`: Your MongoDB connection string (local or cloud)
- `PORT`: (Optional) Port for the backend server (default: 8000)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm package manager

### Installation

Clone the repository:

```sh
git clone <your-repo-url>
cd nasa-project
```

Install dependencies:

```sh
pnpm install
```

Set up environment variables as above.

### Run the app locally:

```sh
pnpm dev
```

- Client: http://localhost:3000
- API server: http://localhost:8000

---

## 📜 Important Scripts

- `pnpm dev` — Start both frontend and backend in development mode
- `pnpm build` — Build frontend and backend for production
- `pnpm start` — Start production servers
- `pnpm test` — Run all tests

---

## 📁 Project Structure

```
nasa-project/
├── client/         # React + Vite frontend
│   └── src/
│       ├── pages/          # Main pages: Launch, Upcoming, History
│       ├── components/     # Shared UI components
│       ├── store/          # Zustand stores for state management
│       ├── forms/          # Form logic and validation
│       ├── api/            # API integration
│       └── ...             # Other app logic
├── server/         # Express + MongoDB backend
│   ├── src/
│   │   ├── routes/         # API route handlers for /planets and /launches
│   │   ├── models/         # Data models and MongoDB logic
│   │   ├── middlewares/    # Express middlewares
│   │   └── ...             # Other backend logic
│   └── data/kepler_data.csv # NASA Kepler exoplanet data
├── pnpm-workspace.yaml     # Monorepo workspace config
└── package.json            # Root scripts and config
```

---

## 🧪 Testing

Run backend and frontend tests with:

```sh
pnpm test
```

---
