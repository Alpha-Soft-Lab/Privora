import { randomInt } from 'crypto';

export const generateCode = () => String(randomInt(0, 10000)).padStart(4, '0');

export const isValidCode = (code) => /^\d{4}$/.test(code || '');
