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
import crypto from 'crypto';
import classroomRoutes from './routes/classroomRoutes.js';

// Middleware & Utils
import { ensureAdminUser } from './utils/seedAdmin.js';
import { isAdmin } from './middleware/isAdmin.js';
import { requireAuth } from './middleware/auth.js';

// Routes
import authRoutes from './routes/auth.js';
import ratingRoutes from './routes/rating.js';
import chatRoutes from './routes/chat.js';
import assignmentRoutes from './routes/assignment.js';

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
dotenv.config();

const app = express();

/* -------------------------------------------------------
   CLEAN, FIXED, PRODUCTION‑READY CORS FOR RENDER
------------------------------------------------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "https://learnwitheasetutors.com",
  "https://www.learnwitheasetutors.com",
  "https://learnwitheasetutors.vercel.app",
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

// Preflight requests are handled by the CORS middleware above.

/* -------------------------------------------------------
   EXPRESS JSON + UPLOADS
------------------------------------------------------- */

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.use('/api/assignments', assignmentRoutes);
app.use("/api/classroom", classroomRoutes);

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

// Get single contact by ID
app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.put('/api/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
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

app.get('/api/tutors', async (req, res) => {
  try {
    const tutors = await Tutor.find({});
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/tutors/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.json(tutor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/tutors/:id', uploadFields, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      government_issued_id: req.files['government_issued_id'] ? req.files['government_issued_id'][0].path : undefined,
      academic_certificates: req.files['academic_certificates'] ? req.files['academic_certificates'][0].path : undefined
    };
    const tutor = await Tutor.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.json(tutor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/tutors/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndDelete(req.params.id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.json({ message: 'Tutor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
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


// POST /api/registrations
app.post('/api/registrations', async (req, res) => {
  try {
    const referralCode = crypto.randomBytes(4).toString('hex');

    const registration = new Registration({
      ...req.body,
      referralCode,
      referralCount: 0,
      referredBy: req.body.referredBy || null
    });

    const newRegistration = await registration.save();

    const referralLink = `http://www.learnwitheasetutors.com/register?ref=${referralCode}`;

    res.status(201).json({
      ...newRegistration.toObject(),
      referralLink
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.put('/api/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Cannot delete regisration' });
    }
    res.json({ message: 'Registration deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
  const fileURL = `/uploads/${req.file.filename}`;
  // return 'name' to match frontend expectation (res.data.name)
  res.json({ url: fileURL, name: req.file.originalname });
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
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Socket.io CORS blocked: " + origin));
    },
    methods: ["GET", "POST"],
    credentials: true
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

  socket.on('child-ready', ({ roomId, userName }) => {
    // Relay child-ready to other sockets in the room (tutors)
    socket.to(roomId).emit('child-ready', { userId: socket.id, userName });
  });

  socket.on('answer', ({ roomId, answer }) => {
    socket.to(roomId).emit('answer', { answer, from: socket.id });
  });

  // Ensure chat messages are relayed to the room and logged
  socket.on('chat-message', ({ roomId, message }) => {
    if (!message) {
      console.warn('chat-message received with no message payload');
      return;
    }
    console.log('chat-message from', socket.data.userName || socket.id, 'to room', roomId);
    socket.to(roomId).emit('chat-message', message);
  });

  // Ensure raise-hand is relayed and logged
  socket.on('raise-hand', ({ roomId, userName, raised }) => {
    console.log('raise-hand', userName, 'raised=', raised, 'in', roomId);
    socket.to(roomId).emit('raise-hand', { userName, raised });
  });

  // Relay screen-share start/stop so clients can update UI (hide video grid / show full screen)
  socket.on('screen-share-start', ({ roomId, userName }) => {
    const role = socket.data.role || 'participant';
    console.log('screen-share-start', userName, 'role=', role, 'in', roomId);
    socket.to(roomId).emit('screen-share-start', { userName, role });
  });

  socket.on('screen-share-stop', ({ roomId, userName }) => {
    const role = socket.data.role || 'participant';
    console.log('screen-share-stop', userName, 'role=', role, 'in', roomId);
    socket.to(roomId).emit('screen-share-stop', { userName, role });
  });

  socket.on('ice-candidate', ({ roomId, candidate }) => {
    socket.to(roomId).emit('ice-candidate', { candidate, from: socket.id });
  });

  socket.on('file-shared', ({ roomId, message }) => {
    if (!message.sender) {
      console.warn("File message missing sender, rejecting:", message);
      return;
    }
    try {
      // Optional: save file message to DB if you want persistence
      // await ChatMessage.create(message);
    } catch (e) {
      console.error('Error saving file message:', e);
    }
    socket.to(roomId).emit('file-shared', message);
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

// Normalize and validate the MongoDB URI
const mongoUriRaw = MONGO_URI;
let mongoUriTrimmed = String(mongoUriRaw ?? '').trim();

// If an injector set the literal string 'null', try to read the original value from the .env file directly
if (!mongoUriTrimmed || mongoUriTrimmed.toLowerCase() === 'null') {
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const parsed = dotenv.parse(envContent);
      const fallback = parsed.MongoDB_URI || parsed.MONGODB_URI || parsed.MONGO_URI || parsed.DB_URI || parsed.DATABASE_URL;
      if (fallback) {
        mongoUriTrimmed = String(fallback).trim();
        console.log('NOTICE: Using Mongo URI from .env as fallback (masked).');
      }
    }
  } catch (e) {
    // ignore parsing errors here; handled by subsequent checks
  }
}

// Masked debug (do not print credentials)
const maskedDebug = mongoUriTrimmed
  ? (mongoUriTrimmed.length > 40 ? mongoUriTrimmed.slice(0, 30) + '...' + mongoUriTrimmed.slice(-7) : mongoUriTrimmed)
  : '<empty>';
console.log('DEBUG MONGO_URI =', JSON.stringify(maskedDebug));

if (!mongoUriTrimmed || mongoUriTrimmed.toLowerCase() === 'null') {
  // In production we must exit. In local development allow the server to start without MongoDB
  if (process.env.NODE_ENV === 'production') {
    console.error('FATAL: MongoDB URI is missing or set to the literal string "null". Please correct your injector or .env file. Value read (masked):', maskedDebug);
    process.exit(1);
  } else {
    console.warn('WARNING: MongoDB URI is missing. Starting server without DB for local development.');
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (no DB connected - development fallback)`);
    });
  }
}
else {
  if (!/^mongodb(\+srv)?:\/\//.test(mongoUriTrimmed)) {
    console.error('FATAL: MongoDB URI appears malformed (must start with mongodb:// or mongodb+srv://). Value read (masked):', maskedDebug);
    process.exit(1);
  }

  mongoose.connect(mongoUriTrimmed)
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
}