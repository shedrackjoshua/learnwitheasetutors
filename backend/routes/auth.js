import { Router } from 'express';
import crypto from 'crypto';
import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';
import { requireAuth } from '../middleware/auth.js';
import Session from '../models/Session.js';

const router = Router();

// Register new user
router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'username, email, password, and role are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const newUser = new User({ username, email, password, role });
    await newUser.save();
    const token = signToken(newUser._id, newUser.role, newUser.Permissions);
    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role, permissions: newUser.Permissions } });
  } catch (err) {
    console.error('Signup error:', err && err.stack ? err.stack : err);
    if (err && err.code === 11000) {
      return res.status(409).json({ message: 'Duplicate key error', detail: err.keyValue });
    }
    res.status(500).json({ message: err?.message || 'Server error' });
  }
});

// Login a user (accepts email OR username OR a single 'login' field)
router.post('/login', async (req, res) => {
  const { email, username, login, password } = req.body;
  try {
    if (!password || !(email || username || login)) {
      return res.status(400).json({ message: 'Provide email or username (or login) and password' });
    }

    // Build a query that allows flexible identifiers
    let query = {};
    if (email) query = { email };
    else if (username) query = { username };
    else query = { $or: [{ email: login }, { username: login }] };

    const user = await User.findOne(query);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    

    let session = null;
    // Tutor login
    if (user.role === 'tutor') {
      session = await Session.findOne({ tutorId: user._id, active: true });
      if (!session) {
        session = await Session.create({
          sessionId: crypto.randomUUID(),
          tutorId: user._id,
          active: true
        });
      }
    }

    // Child login

    else if (user.role === 'child') {
      // Find session where child is already assigned
      session = await Session.findOne({ childId: user._id, active: true });

      if (!session) {
        // Find child's tutor
        const tutor = await User.findById(user.assignedTutor);
        if (!tutor) {
          return res.status(400).json({ error: 'Child has no assigned tutor' });
        }
        // Find tutor's active session
        session = await Session.findOne({ tutorId: tutor._id, active: true });

        // if tutor has no active session, create one
        if (!session) {
          session = await Session.create({
            sessionId: crypto.randomUUID(),
            tutorId: tutor._id,
            childId: user._id,
            active: true
          });
        } else if (!session.childId) {
          session.childId = user._id;
          await session.save();
        }
      }
    }
    // Parent/admin login no classroom
    else {
      const token = signToken(user._id, user.role, user.Permissions);
      return res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          permissions: user.Permissions
        },
          sessionId: null
      })
    }
    // Generate token AFTER session logic
    const token = signToken(user._id, user.role, user.Permissions);

    //Return user + sessionId
    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        permissions: user.Permissions
      },
      sessionId: session?.sessionId || null
    });
  } catch (err) {
    console.error('Login error:', err && err.stack ? err.stack : err);
    res.status(500).json({ message: err?.message || 'Server error' });
  }
});

// stateless logout route (handled on client side by removing login token)
router.post('/logout', requireAuth, (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

// get current user info
router.get('/me', requireAuth, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;