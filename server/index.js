const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists for multer
const uploadsDir = path.join(__dirname, 'uploads');
try {
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
        console.log('Created uploads directory at', uploadsDir);
    }
} catch (err) {
    console.error('Failed to create uploads directory:', err);
}

//multer storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    }
});
const upload = multer({ storage });
const uploadFields = upload.fields([
    { name: 'government_issued_id', maxCount: 1 },
    { name: 'academic_certificates', maxCount: 1 }
]);

//connect to MongoDB
mongoose.connect('mongodb+srv://Joshua:Marine234@nodetutorial.wexlxdy.mongodb.net/Learwitheasetutors').then(() => {
    console.log('Connected to Mongodb');
}).catch ((err) => {
    console.error('Error connecting to MongoDB:', err);
})

// Import models 
const Contact = require('./models/contact');
const Tutor = require('./models/tutor');
const Registration = require('./models/registration');

app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find({});
        console.log(contacts);
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message })
    };
});

app.post('/contacts', async (req, res) => {
    const contact = new Contact({
        full_name: req.body.full_name,
        email: req.body.email,
        programme: req.body.programme,
        phone: req.body.phone,
        message: req.body.message
    });

    try {
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/contacts/:id', async (req, res) => {
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

app.get('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' })
        }
        res.json(contact)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

app.put('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found'})
        }
        res.json(contact)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Tutor routes
app.get('/tutors', async (req, res) => {
    try {
        const tutors = await Tutor.find({});
        res.json(tutors)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/tutors', uploadFields, async (req, res) => {
    const tutor = new Tutor({
        name: req.body.name,
        email:  req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        date_of_birth: req.body.date_of_birth,
        location: req.body.location,
        subjects_taught: req.body.subjects_taught,
        years_of_experience: req.body.years_of_experience,
        highest_qualification: req.body.highest_qualification,
        government_issued_id: req.files['government_issued_id'] ? req.files['government_issued_id'][0].path : null, // Assuming you are using multer for file uploads
        academic_certificates: req.files['academic_certificates'] ? req.files['academic_certificates'][0].path : null, // Assuming you're using multer for file uploads
        references: req.body.references
    });
    try {
        const newTutor = await tutor.save();
        res.status(201).json(newTutor)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/tutors/:id', async (req, res) => { 
    try{
        const tutor = await Tutor.findByIdAndDelete(req.params.id)
        if (!tutor) {
            res.status(404).json({ message: 'Tutor not found'})
        }
        res.json({ message: 'Tutor deleted successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

app.get('/tutors/:id', async (req, res) => {
    try {
        const tutor = await Tutor.findById(req.params.id)
        if (!tutor) {
            res.status(404).json({ message: 'Tutor cannot be found' })
        }
        res.json(tutor)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/tutors/:id', async (req, res) => {
    try {
        const tutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!tutor) {
            res.status(404).json({ message: 'Tutor not found' })
        }
        res.json(tutor)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Registration routes

app.get('/registrations', async (req, res) => {
    try {
        const registrations = await Registration.find({});
        res.json(registrations)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.post('/registrations', async (req, res) => {
    const registration = new Registration({
        parents_name: req.body.parents_name,
        parents_email: req.body.parents_email,
        phone: req.body.phone,
        state_or_province: req.body.state_or_province,
        country_or_region: req.body.country_or_region,
        children: req.body.children, // Assuming children is an array of child objects in the request body     
        register_another_child: req.body.register_another_child
    });

    try {
        const newRegistration = await registration.save();
        res.status(201).json(newRegistration);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/registrations/:id', async (req, res) => {
    try {
        const registration = await Registration.findByIdAndDelete(req.params.id);
        if (!registration) {
            res.status(404).json({ message: 'Registration not found' });
        }
        res.status(200).json({ message: 'Registration deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/registrations/:id', async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);
        if (!registration) {
            res.status(404).json({ message: 'Registration not found'});
        }
        res.json(registration);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/registrations/:id', async (req, res) => {
    try {
        const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!registration) {
            res.status(404).json({ message: 'Registration not found' });
        }
        res.json(registration)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/about', (req, res) => {
    res.send('This is about page');
});

app.get('/contact', (req, res) => {
    res.send('This is contact page');
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

// Global error handler (last middleware) — logs and returns a 500
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ message: err.message || 'Internal Server Error' });
});
