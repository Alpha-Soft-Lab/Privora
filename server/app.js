import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import roomRoutes from './src/routes/room.routes.js';
import { env } from './src/config/env.js';

const app = express();
const distPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist');

app.use(cors({ origin: env.clientOrigin }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/rooms', roomRoutes);

if (env.nodeEnv === 'production') {
  app.use(express.static(distPath));
  app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

export default app;
