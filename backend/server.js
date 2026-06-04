import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';
import cors from 'cors';
import multer from 'multer';
import http from 'http';
import { Server } from 'socket.io';
import fs from 'fs';

// Middleware & Utils
import { ensureAdminUser } from './utils/seedAdmin.js';
import { isAdmin } from './middleware/isAdmin.js';
import { requireAuth } from './middleware/auth.js';

// Routes
import authRoutes from './routes/auth.js';
import ratingRoutes from './routes/rating.js';
import chatRoutes from './routes/chat.js';

// Models
import Contact from './models/contact.js';
import Tutor from './models/tutor.js';
import Registration from './models/registration.js';
import ChatMessage from './models/ChatMessage.js';
import User from './models/User.js';

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env
dotenv.config({ path: join(__dirname, '.env') });

const app = express();

/* -------------------------------------------------------
   CLEAN, FIXED, PRODUCTION‑READY CORS FOR RENDER
------------------------------------------------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "https://learnwitheasetutors.onrender.com",
  "https://learnwitheasetutors-frontend.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman, curl, mobile apps
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS blocked: " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.options("*", cors()); // Handle preflight requests for all routes


/* -------------------------------------------------------
   EXPRESS JSON + UPLOADS
------------------------------------------------------- */

app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
const uploadFields = upload.fields([
  { name: 'government_issued_id', maxCount: 1 },
  { name: 'academic_certificates', maxCount: 1 }
]);

/* -------------------------------------------------------
   ROUTES
------------------------------------------------------- */

// Debug route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Tutor routes
app.use('/api/tutors', ratingRoutes);

// Auth & Chat routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Contacts CRUD
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tutors CRUD
app.post('/api/tutors', uploadFields, async (req, res) => {
  try {
    const tutor = new Tutor({
      ...req.body,
      government_issued_id: req.files['government_issued_id'] ? req.files['government_issued_id'][0].path : null,
      academic_certificates: req.files['academic_certificates'] ? req.files['academic_certificates'][0].path : null
    });
    const newTutor = await tutor.save();
    res.status(201).json(newTutor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Registrations CRUD
app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find({});
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/registrations', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    const newRegistration = await registration.save();
    res.status(201).json(newRegistration);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
  const fileURL = `/uploads/${req.file.filename}`;
  res.json({ url: fileURL, filename: req.file.originalname });
});

// Users (admin)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-__v -password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin dashboard
app.get('/api/admin/dashboard', requireAuth, isAdmin, (req, res) => {
  res.json({ message: 'Welcome to admin page' });
});

/* -------------------------------------------------------
   SOCKET.IO
------------------------------------------------------- */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', ({ roomId, userName, role }) => {
    socket.join(roomId);
    socket.data.userName = userName;
    socket.data.role = role;
    socket.to(roomId).emit('user-joined', { userId: socket.id, userName, role });
  });

  socket.on('offer', ({ roomId, offer }) => {
    socket.to(roomId).emit('offer', { offer, from: socket.id });
  });

  socket.on('answer', ({ roomId, answer }) => {
    socket.to(roomId).emit('answer', { answer, from: socket.id });
  });

  socket.on('ice-candidate', ({ roomId, candidate }) => {
    socket.to(roomId).emit('ice-candidate', { candidate, from: socket.id });
  });

  socket.on('chat-message', async ({ roomId, message }) => {
    try {
      await ChatMessage.create(message);
    } catch (e) {
      console.error('Error saving chat message:', e);
    }
    socket.to(roomId).emit('chat-message', message);
  });

  socket.on('typing', ({ roomId, userName, isTyping }) => {
    socket.to(roomId).emit('typing', { userName, isTyping });
  });

  socket.on('message-read', ({ roomId, messageIds }) => {
    socket.to(roomId).emit('message-read', { messageIds });
  });

  socket.on('whiteboard-draw', ({ roomId, line }) => {
    socket.to(roomId).emit('whiteboard-draw', { line });
  });

  socket.on('whiteboard-clear', ({ roomId }) => {
    socket.to(roomId).emit('whiteboard-clear');
  });

  socket.on('file-shared', ({ roomId, file }) => {
    socket.to(roomId).emit('file-shared', { file });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

/* -------------------------------------------------------
   DATABASE + SERVER START
------------------------------------------------------- */

const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.MongoDB_URI ||
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  process.env.DB_URI ||
  process.env.DATABASE_URL;

if (!MONGO_URI) {
  console.error('FATAL: MongoDB URI is not set.');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    try {
      await ensureAdminUser();
    } catch (err) {
      console.error('Error ensuring admin user:', err);
    }

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });