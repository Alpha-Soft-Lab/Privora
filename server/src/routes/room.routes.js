import { Router } from 'express';
import { createRoom, getRoom } from '../controllers/room.controller.js';

const router = Router();

router.post('/', createRoom);
router.get('/:code', getRoom);

export default router;
