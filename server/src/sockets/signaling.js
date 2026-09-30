import { WebSocketServer } from 'ws';
import { randomUUID } from 'crypto';
import { Room } from '../models/Room.js';
import { isValidCode } from '../utils/code.js';
import { env } from '../config/env.js';

const rooms = new Map();

const send = (socket, payload) => {
  if (socket.readyState === socket.OPEN) {
    socket.send(JSON.stringify(payload));
  }
};

const reject = (socket, reason) => {
  send(socket, { type: 'error', reason });
  socket.close();
};

export const getRoomSize = (code) => (rooms.get(code) ? rooms.get(code).size : 0);

const leaveRoom = (code, id) => {
  const peers = rooms.get(code);
  if (!peers || !peers.has(id)) return;
  peers.delete(id);
  peers.forEach((peer) => send(peer, { type: 'peer-left', id }));
  if (peers.size === 0) rooms.delete(code);
};

const handleMessage = (code, id, raw) => {
  let message;
  try {
    message = JSON.parse(raw);
  } catch {
    return;
  }
  if (message.type !== 'signal') return;
  const target = rooms.get(code)?.get(message.to);
  if (target) {
    send(target, { type: 'signal', from: id, data: message.data });
  }
};

export const attachSignaling = (server) => {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', async (socket, req) => {
    const params = new URL(req.url, 'http://localhost').searchParams;
    const code = params.get('room');

    if (!isValidCode(code)) return reject(socket, 'invalid');

    const exists = await Room.exists({ code });
    if (!exists) return reject(socket, 'not-found');

    const peers = rooms.get(code) || new Map();
    if (peers.size >= env.maxParticipants) return reject(socket, 'full');

    const id = randomUUID();
    const existing = [...peers.keys()];
    peers.set(id, socket);
    rooms.set(code, peers);

    socket.isAlive = true;
    socket.on('pong', () => {
      socket.isAlive = true;
    });
    socket.on('message', (raw) => handleMessage(code, id, raw.toString()));
    socket.on('close', () => leaveRoom(code, id));
    socket.on('error', () => leaveRoom(code, id));

    send(socket, { type: 'joined', id, peers: existing });
    existing.forEach((peerId) => send(peers.get(peerId), { type: 'peer-joined', id }));
  });

  const heartbeat = setInterval(() => {
    wss.clients.forEach((socket) => {
      if (socket.isAlive === false) return socket.terminate();
      socket.isAlive = false;
      socket.ping();
    });
  }, 30000);

  wss.on('close', () => clearInterval(heartbeat));
};
