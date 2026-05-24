const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    subjects_taught: {
        type: String,
        required: true
    },
    years_of_experience: {
        type: String,
        required: true
    },
    highest_qualification: {
        type: String,
        required: true
    },
    government_issued_id: {
        // This can be a URL or a file path to the uploaded ID
        type: String,
        required: true
    },
    academic_certificates: {
        // This can be a URL or a file path to the uploaded certificate
        type: String,
        required: true
    },
    references: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tutor', tutorSchema);      
