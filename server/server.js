import http from 'http';
import app from './app.js';
import { env } from './src/config/env.js';
import { connectDb } from './src/config/db.js';
import { attachSignaling } from './src/sockets/signaling.js';

const start = async () => {
  await connectDb();
  const server = http.createServer(app);
  attachSignaling(server);
  server.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
