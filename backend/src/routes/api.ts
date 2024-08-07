import { Router } from 'express';
import { health } from '../controllers/healthController';

const router = Router();

router.get('/health', health);

// example: send realtime notification via socket
router.post('/notify', (req, res) => {
  try {
    const { room, event, payload } = req.body;
    const io = require('../socket').getIO();
    if (room) io.to(room).emit(event || 'notification', payload || {});
    else io.emit(event || 'notification', payload || {});
    return res.json({ ok: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;