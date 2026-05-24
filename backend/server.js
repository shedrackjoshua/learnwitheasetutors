import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import multer from 'multer';
import http from 'http';
import { Server } from 'socket.io';
import { ensureAdminUser } from './utils/seedAdmin.js';
import { isAdmin } from './middleware/isAdmin.js';
import { requireAuth } from './middleware/auth.js';

import authRoutes from './routes/auth.js';
import ratingRoutes from './routes/rating.js';
import chatRoutes from './routes/chat.js';
import ChatMessage from './models/ChatMessage.js';
import { url } from 'inspector';


// Load .env relative to this file so env vars are available regardless of working directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Debug route to verify server is working
app.get('/debug', (req, res) => {
  res.json({ message: 'Server is running' });
});

// mount tutors routes (public read access is allowed)
app.use('/tutors', ratingRoutes);
// Also mount tutors under /api/tutors to support frontend dev proxy (Vite -> /api)
app.use('/api/tutors', ratingRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
})

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

app.use('/uploads', express.static(join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, join(__dirname, 'uploads')),
  filename: (req, file, cb)  => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  const fileURL = `/uploads/${req.file.filename}`;
  res.json({
    url: fileURL,
    filename: req.file.originalname,
  })
});

// HTTP server + Socket.IO //
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// socket io classroom features
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', ({ roomId, userName, role }) => {
    socket.join(roomId);
    socket.data.userName = userName;
    socket.data.role = role;
    socket.to(roomId).emit('user-joined', { userId: socket.id, userName, role });
  })
  // WebRTC signaling
  socket.on('offer', ({ roomId, offer }) => {
    socket.to(roomId).emit('offer', { offer, from: socket.id });
  });

  socket.on('answer', ({ roomId, answer }) => {
    socket.to(roomId).emit('answer', { answer, from: socket.id });
  });

  socket.on('ice-candidate', ({ roomId, candidate }) => {
    socket.to(roomId).emit('ice-candidate', { candidate, from: socket.id });
  });

  //chat with persistense
  socket.on('chat-message', async ({ roomId, message }) => {
    try {
      await ChatMessage.create(message);
    } catch (e) {
      console.error('Error saving chat message:', e);
    }
    socket.to(roomId).emit('chat-message', message);
  });

  //Typing indicators
  socket.on('typing', ({ roomId, userName, isTyping }) => {
    socket.to(roomId).emit('typing', { userName, isTyping });
  });

  // Read Receipts
  socket.on('message-read', ({ roomId, messageIds }) => {
    socket.to(roomId).emit('message-read', { messageIds });
  });

  // Whiteboard Drawings
  socket.on('whiteboard-draw', ({ roomId, line }) => {
    socket.to(roomId).emit('whiteboard-draw', { line });
  });

  // Clear whiteboard
  socket.on('whiteboard-clear', ({ roomId}) => {
    socket.to(roomId).emit('whiteboard-clear');
  });

  // File sharing broadcast
  socket.on('file-shared', ({ roomId, file }) => {
    socket.to(roomId).emit('file-shared', { file });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


const PORT = process.env.PORT || 5000;
// Support multiple env var name variants (legacy casing and common names)
const MONGO_URI = process.env.MongoDB_URI || process.env.MONGODB_URI || process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('FATAL: MongoDB URI is not set. Please set MongoDB_URI or MONGODB_URI in backend/.env');
  process.exit(1);
}

app.get('/admin/dashboard', requireAuth, isAdmin, (req, res) => {
  res.json({ message: 'Welcome to admin page' });
})

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await ensureAdminUser(); // Ensure admin user exists on startup
  })
  .catch((err) => {
    console.error('MongoDB connection error', err && err.stack ? err.stack : err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
