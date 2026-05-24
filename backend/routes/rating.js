import express from 'express';
import Tutor from '../models/Tutor.js';
import { requireRole } from '../middleware/roleCheck.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Simple request logger for this router
router.use((req, res, next) => {
    console.log('[tutors] incoming', req.method, req.originalUrl);
    next();
});

// List all tutors
router.get('/', async (req, res) => {
    try {
        const tutors = await Tutor.find().select('-__v');
        res.json(tutors);
    } catch (err) {
        console.error('[tutors] GET / error', err && err.stack ? err.stack : err);
        res.status(500).json({ message: 'Error fetching tutors', error: err.message });
    }
});

// Get single tutor
router.get('/:id', async (req, res) => {
    try {
        const tutor = await Tutor.findById(req.params.id).select('-__v');
        if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
        res.json(tutor);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tutor', error: err.message });
    }
});

// Child can rate a tutor
router.post('/:id/rate', requireAuth, requireRole('child'), async (req, res) => {
    const { id } = req.params;
    const { score, comment } = req.body;
    try {
        const tutor = await Tutor.findById(id);
        if (!tutor) return res.status(404).json({ message: 'Tutor not found' });

        // prevent multiple ratings by the same child
        const existing = tutor.ratings.find(r => r.childId.toString() === req.user._id.toString());
        if (existing) {
            existing.score = score;
            existing.comment = comment;
        } else {
            tutor.ratings.push({ childId: req.user._id, score, comment });
        }
        await tutor.save();
        // compute average rating if not defined in Schema
        const avg = tutor.ratings.reduce((sum, r) => sum + r.score, 0) / tutor.ratings.length;
        res.json({ message: 'Ratings submitted', averageRating: avg });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting rating', error: error.message });
    }
});

export default router;