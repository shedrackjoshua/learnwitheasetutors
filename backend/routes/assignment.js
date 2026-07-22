import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST /api/assign-tutor
router.post('/assign-tutor', async (req, res) => {
  try {
    const { childId, tutorId } = req.body;

    if (!childId || !tutorId) {
      return res.status(400).json({ error: "childId and tutorId are required" });
    }

    // Update child → set assignedTutor
    await User.updateOne(
      { _id: childId },
      { $set: { assignedTutor: tutorId } }
    );

    // Update tutor → add child to assignedChildren
    await User.updateOne(
      { _id: tutorId },
      { $addToSet: { assignedChildren: childId } } // avoids duplicates
    );

    res.json({ message: "Tutor assigned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;