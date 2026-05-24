import { Router } from 'express';
import { requireAcess, requirePermissions } from '../middleware/access';

const router = Router();

//Admin route only
router.get('/admin', requireAcess('admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome, admin!' });
})

//Tutor route or admin routes
router.get('/tutor_or_admin', requireAcess('tutor', 'admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome, tutor and admin!' });
});

//Parents only routes 
router.get('/parents', requireAcess('parent'), (req, res) => {
    res.status(200).json({ message: 'Welcome, parent!' });
});

//Route with specific permissions
router.get('/manage_tutors', requirePermissions('manage_tutors'), (req, res) => {
    res.status(200).json({ message: 'You have permission to manage tutors!' });
});

