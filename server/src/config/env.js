import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
  mongoUri: process.env.MONGODB_URI,
  clientOrigin: process.env.CLIENT_ORIGIN,
  maxParticipants: Number(process.env.MAX_PARTICIPANTS),
  roomTtlHours: Number(process.env.ROOM_TTL_HOURS),
};
