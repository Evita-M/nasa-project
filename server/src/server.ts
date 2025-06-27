import http from 'http';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import path from 'path';

import routeInit from './routes/index';

import { loadPlanetsData } from './models/planets.model';
import { mongoConnect } from './services/mongo';
import { loadLaunchData } from './models/launches.models';

dotenv.config();

const app = express();

const whitelist = ['http://localhost:3000', 'http://localhost:8000'];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/v1', routeInit());

app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Fallback for all other routes (SPA support)
app.get('/{*splat}', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();

export default app;
