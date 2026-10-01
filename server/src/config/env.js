import 'dotenv/config';

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env variable: ${name}`);
  return value;
};

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: required('MONGODB_URI'),
  clientOrigin: required('CLIENT_ORIGIN').replace(/\/+$/, ''),
  maxParticipants: Number(process.env.MAX_PARTICIPANTS) || 2,
  roomTtlHours: Number(process.env.ROOM_TTL_HOURS) || 24,
};