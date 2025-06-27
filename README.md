# Nasa Mission Frontier App ![In Progress](https://img.shields.io/badge/IN_PROGRESS-C23F84?style=flat-square&labelColor=C23F84&color=C23F84&logoColor=white)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
[![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white)](https://zustand-demo.pmnd.rs/)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![ReactHookForm](https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

A modern web application for exploring habitable exoplanets and managing NASA mission launches. Built in monorepo with a React + Vite with Zustate state management on frontend and an Express + MongoDB on backend.

<img width="480" alt="image" src="https://github.com/user-attachments/assets/47f02b7f-6501-432c-b852-7c5ca1246cd7" />
<img width="480" alt="image" src="https://github.com/user-attachments/assets/52595d6f-88e1-44bf-bc74-17b5ed6bd761" />

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

## 🎮 Core Functionalities

### Planet Explorer

- Browse a curated list of habitable exoplanets
- Data sourced from NASA's Kepler mission

### Mission Launch Management

- Schedule new launches with mission, rocket, date, and planet
- View and abort upcoming launches
- Review history of all past launches

## 🔑 Environment Variables

Create a `.env` file in the `server` directory:

```
MONGO_URL=your_mongodb_connection_string
PORT=8000
SPACEX_API_URL=spacex_api_url
```

- `MONGO_URL`: Your MongoDB connection string (local or cloud)
- `PORT`: (Optional) Port for the backend server (default: 8000)


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

## 📜 Important Scripts

- `pnpm dev` — Start both frontend and backend in development mode
- `pnpm build` — Build frontend and backend for production
- `pnpm start` — Start production servers
- `pnpm test` — Run all tests

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

## 🧪 Testing

Run backend and frontend tests with:

```sh
pnpm test
```
