import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/private-calls',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  maxParticipants: Number(process.env.MAX_PARTICIPANTS) || 2,
  roomTtlHours: Number(process.env.ROOM_TTL_HOURS) || 24,
};
