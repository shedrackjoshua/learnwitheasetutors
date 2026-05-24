import express from 'express';
import ChatMessage from '../models/ChatMessage.js';

const router = express.Router();

// Get chat history for a room
router.get('/:roomId', async (req, res) => {
  try {
    const messages = await ChatMessage.find({ roomId: req.params.roomId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (e) {
    console.error('Error fetching chat history:', e);
    res.status(500).json({ message: 'Failed to fetch chat history' });
  }
});

export default router;