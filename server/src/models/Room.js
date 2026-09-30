import mongoose from 'mongoose';
import { env } from '../config/env.js';

const roomSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, match: /^\d{4}$/ },
  type: { type: String, enum: ['audio', 'video'], default: 'video' },
  createdAt: { type: Date, default: Date.now, expires: env.roomTtlHours * 3600 },
});

export const Room = mongoose.model('Room', roomSchema);
