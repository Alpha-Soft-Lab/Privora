import { Room } from '../models/Room.js';
import { generateCode, isValidCode } from '../utils/code.js';
import { getRoomSize } from '../sockets/signaling.js';
import { env } from '../config/env.js';

export const createRoom = async (req, res, next) => {
  try {
    const type = req.body?.type === 'audio' ? 'audio' : 'video';
    for (let attempt = 0; attempt < 30; attempt += 1) {
      const code = generateCode();
      const exists = await Room.exists({ code });
      if (!exists) {
        await Room.create({ code, type });
        return res.status(201).json({ code, type });
      }
    }
    return res.status(503).json({ message: 'No free room codes right now. Try again shortly.' });
  } catch (error) {
    return next(error);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const { code } = req.params;
    if (!isValidCode(code)) {
      return res.status(400).json({ message: 'Room code must be 4 digits.' });
    }
    const room = await Room.findOne({ code });
    if (!room) {
      return res.status(404).json({ message: 'No room found with that code.' });
    }
    const size = getRoomSize(code);
    return res.json({ code, type: room.type, participants: size, full: size >= env.maxParticipants });
  } catch (error) {
    return next(error);
  }
};
