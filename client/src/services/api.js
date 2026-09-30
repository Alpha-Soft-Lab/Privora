import { API_URL } from '../utils/constants.js';

const request = async (path, options) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.message || 'Request failed. Check your connection and try again.');
  }
  return body;
};

export const createRoom = (type) =>
  request('/rooms', { method: 'POST', body: JSON.stringify({ type }) });

export const findRoom = (code) => request(`/rooms/${code}`);
