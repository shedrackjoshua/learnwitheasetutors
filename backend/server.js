
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
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

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env
dotenv.config({ path: join(__dirname, '.env') });

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://learnwitheasetutors-frontend.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());
// Ensure uploads directory exists
const uploadsDir = join(__dirname, 'uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory at', uploadsDir);
  }
} catch (err) {
  console.error('Failed to create uploads directory:', err);
}

// Multer storage config
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

// Debug route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Tutor routes (rating + CRUD)
app.use('/tutors', ratingRoutes);
app.use('/api/tutors', ratingRoutes);

// Auth & Chat routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Contacts CRUD
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.put('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.delete('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mirror contacts under /api for frontend compatibility
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

app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tutors CRUD
app.post('/tutors', uploadFields, async (req, res) => {
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
app.get('/tutors/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
    res.json(tutor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.put('/tutors/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
    res.json(tutor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.delete('/tutors/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndDelete(req.params.id);
    if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
    res.json({ message: 'Tutor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Registrations CRUD
app.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find({});
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post('/registrations', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    const newRegistration = await registration.save();
    res.status(201).json(newRegistration);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.get('/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    res.json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.put('/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    res.json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.delete('/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    res.json({ message: 'Registration deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mirror registrations under /api for frontend compatibility
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

app.get('/api/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    res.json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    res.json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    res.json({ message: 'Registration deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
  const fileURL = `/uploads/${req.file.filename}`;
  res.json({ url: fileURL, filename: req.file.originalname });
});

// Users endpoints (used by admin frontend)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-__v -password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-__v -password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin dashboard
app.get('/admin/dashboard', requireAuth, isAdmin, (req, res) => {
  res.json({ message: 'Welcome to admin page' });
});

// HTTP server + Socket.IO
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


// Connect to MongoDB and start server
const PORT  = process.env.PORT || 5000;

// Accept multiple common env var names (legacy and different casings)
const MONGO_URI = process.env.MongoDB_URI || process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DB_URI || process.env.DATABASE_URL;
if (!MONGO_URI) {
  console.error('FATAL: MongoDB URI is not set. Please set MongoDB_URI or MONGODB_URI or MONGO_URI in backend/.env');
  process.exit(1);
}

// Mongoose 6+ and modern MongoDB drivers ignore old connection options.
// Pass only the URI and let mongoose use sensible defaults for the driver.
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      // Ensure the global admin account exists
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
  

