import mongoose from 'mongoose'

const registrationSchema = new mongoose.Schema({
    parents_name: {
        type: String,
        required: true
    },
    parents_email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    state_or_province: {
        type: String,
        required: true
    },
    country_or_region: {
        type: String,
        required: true
    },
    children: [
        {
            wards_name: {
                type: String,
                required: true
            },
            gender: {
                type: String,
                required: true,
                enum: ['Male', 'Female', 'Other'] // Restrict to specific values
            },
            students_email: {
                type: String,
                required: false,
                lowercase: true,
            },
            students_grade_or_year: {
                type: String,
                required: true
            },
            tutoring_type: {
                type: String,
                required: true,
                enum: ['Online', 'In-Person', 'Hybrid']
            },
            subject_enrolment: {
                type: String,
                required: true
            },
            tutoring_objective: {
                type: String,
                required: true
            },
            specific_goals: {
                type: String,
                required: true
            },
            availability: {
                type: String,
                required: true
            }
        }
    ],
    register_another_child: {
        type: Boolean,
        required: false
    }
});

export default mongoose.model('Registration', registrationSchema)
