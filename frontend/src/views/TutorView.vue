<template>
    <div class="tutor">
        <section class="tutor-title">
            <div class="tutor-container">
                <h1>Become a Tutor</h1>
                <p>Join our team of passionate educators and make a difference in students' lives.</p>
            </div>
        </section>
        <section class="tutor-form-container">
            <div class="tutor-form-section">
                <h2>Apply to Become a Tutor</h2>
                <p>We are always looking for passionate educators to join our team. Fill out the form below to apply.
                </p>
                <form @submit.prevent="submitForm" class="tutor-form">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" v-model="form.name" id="name" placeholder="Enter Full Name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" v-model="form.email" id="email" placeholder="Enter Email" required>
                    </div>
                    <div class="form-group">
                        <label for="gender">Gender</label>
                        <select name="gender" id="gender" v-model="form.gender" placeholder="Select Gender" required>
                            <option value="male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" v-model="form.phone" id="phone" placeholder="Enter Phone Number" required>
                    </div>
                    <div class="form-group">
                        <label for="date_of_birth">DoB</label>
                        <input type="date" v-model="form.date_of_birth" id="date_of_birth" placeholder="Enter DoB"
                            required>
                    </div>
                    <div class="form-group">
                        <label for="location">Location</label>
                        <input type="text" v-model="form.location" id="location" placeholder="Enter Your Location"
                            required>
                    </div>
                    <div class="form-group">
                        <label for="subjects_taught">Choose Subjects Taught</label>
                        <div class="checkbox-group">
                            <label class="checkbox-label">
                                <input type="checkbox" v-model="form.subjects_taught" value="Maths">
                                <span>Maths</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" v-model="form.subjects_taught" value="English">
                                <span>English</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" v-model="form.subjects_taught" value="Science">
                                <span>Science</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" v-model="form.subjects_taught" value="Business & Economics">
                                <span>Business & Economics</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" v-model="form.subjects_taught" value="Arts & Humanities">
                                <span>Arts & Humanities</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" v-model="form.subjects_taught" value="Computer Science">
                                <span>Computer Science</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="years_of_experience">Years Of Experience</label>
                        <input type="text" v-model="form.years_of_experience" id="years_of_experience"
                            placeholder="Enter Years Of Experience" required>
                    </div>
                    <div class="form-group">
                        <label for="highest_qualification">Highest Qualification</label>
                        <input type="text" v-model="form.highest_qualification" id="highest_qualification"
                            placeholder="Enter Qualification" required>
                    </div>
                    <div class="form-group">
                        <label for="references">Reference</label>
                        <textarea name="references" id="references" v-model="form.references" rows="4"
                            placeholder="Enter Reference" required></textarea>
                    </div>

                    <!--Multiple File Uploads -->
                    <div class="form-group">
                        <label for="government_issued_id">Government Issued ID</label>
                        <input type="file" @change="handleGovernmentIssuedIdUpload" id="government_issued_id" required>
                    </div>
                    <div class="form-group">
                        <label for="academic_certificates">Academic Certificates</label>
                        <input type="file" @change="handleAcademicCertificatesUpload" id="academic_certificates"
                            required>
                    </div>
                    <button type="submit" :disabled="isSubmitting" class="submit-btn">
                        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                    </button>
                    <div v-if="submitMessage" class="success-message">
                        {{ submitMessage }}
                    </div>
                    <div v-if="submitError" class="error-message">
                        {{ submitError }}
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>
ue
<script setup>
import { ref } from 'vue';
import api from '../services/api';

const form = ref({
    name: '',
    email: '',
    gender: '',
    phone: '',
    date_of_birth: '',
    location: '',
    subjects_taught: [],
    years_of_experience: '',
    highest_qualification: '',
    references: ''
});

const government_issued_id = ref(null);
const academic_certificates = ref(null);

const isSubmitting = ref(false);
const submitMessage = ref('');
const submitError = ref('');

const handleAcademicCertificatesUpload = (event) => {
    academic_certificates.value = event.target.files[0];
};

const handleGovernmentIssuedIdUpload = (event) => {
    government_issued_id.value = event.target.files[0];
};

const submitForm = async () => {
    isSubmitting.value = true;
    submitMessage.value = '';
    submitError.value = '';

    const formData = new FormData();

    for (const key in form.value) {
        if (Array.isArray(form.value[key])) {
            formData.append(key, form.value[key].join(', '));
        } else if (form.value[key]) {
            formData.append(key, form.value[key]);
        }
    }

    if (government_issued_id.value) {
        formData.append('government_issued_id', government_issued_id.value);
    }

    if (academic_certificates.value) {
        formData.append('academic_certificates', academic_certificates.value);
    }

    try {
        const response = await api.post('/tutors', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.status === 201) {
            submitMessage.value = 'Your application was submitted successfully!';

            form.value = {
                name: '',
                email: '',
                gender: '',
                phone: '',
                date_of_birth: '',
                location: '',
                subjects_taught: [],
                years_of_experience: '',
                highest_qualification: '',
                references: ''
            };

            government_issued_id.value = null;
            academic_certificates.value = null;
        } else {
            submitError.value = 'Failed to submit application.';
        }
    } catch (error) {
        console.error('Form submission error:', error);
        submitError.value =
            error.response?.data?.message ||
            'An error occurred while submitting the application. Please try again.';
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
/* Global Styles */
* {
    box-sizing: border-box;
}

/* Base */
.tutor {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #1f2937;
    background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
    min-height: 100vh;
}

/* Title Banner */
.tutor-title {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 4rem 2rem;
    text-align: center;
    color: white;
    animation: slideDown 0.6s ease-out;
}

.tutor-title h1 {
    font-size: 3rem;
    margin: 0 0 1rem 0;
    font-weight: 800;
    letter-spacing: -1px;
}

.tutor-title p {
    font-size: 1.1rem;
    margin: 0;
    opacity: 0.95;
    font-weight: 300;
}

/* Form Container */
.tutor-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 1rem;
    min-height: calc(100vh - 250px);
}

/* Form Section - Main Card with Glassmorphism */
.tutor-form-section {
    position: relative;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 24px;
    padding: 2.5rem;
    max-width: 700px;
    width: 100%;
    box-shadow:
        0 8px 32px rgba(31, 41, 55, 0.1),
        inset 0 1px 1px rgba(255, 255, 255, 0.5);
    animation: fadeInUp 0.7s ease-out;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Hover Effect on Form Card */
.tutor-form-section:hover {
    transform: translateY(-8px);
    box-shadow:
        0 20px 48px rgba(102, 126, 234, 0.2),
        inset 0 1px 1px rgba(255, 255, 255, 0.5);
    border-color: rgba(102, 126, 234, 0.2);
}

/* Form Headings */
.tutor-form-section h2 {
    margin: 0 0 0.5rem 0;
    color: #1e3a8a;
    font-size: 1.8rem;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.tutor-form-section p {
    color: #6b7280;
    font-size: 0.95rem;
    margin: 0 0 2rem 0;
    font-weight: 400;
    line-height: 1.6;
}

/* Form Groups */
.form-group {
    margin-bottom: 1.3rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.6rem;
    font-weight: 600;
    color: #1f2937;
    font-size: 0.95rem;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.9rem 1.2rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 0.95rem;
    font-family: inherit;
    background: rgba(255, 255, 255, 0.6);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    color: #1f2937;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: #9ca3af;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.95);
    box-shadow:
        0 0 0 4px rgba(102, 126, 234, 0.1),
        inset 0 1px 2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
}

.form-group input[type="file"] {
    padding: 0.8rem;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    cursor: pointer;
}

.form-group input[type="file"]:hover {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
}

.form-group textarea {
    resize: vertical;
    min-height: 100px;
}

/* Checkbox Group */
.checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 0.8rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 400;
    color: #1f2937;
    cursor: pointer;
    transition: color 0.2s ease;
}

.checkbox-label:hover {
    color: #667eea;
}

.checkbox-label input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #667eea;
}

/* Submit Button */
.submit-btn {
    width: 100%;
    padding: 1.1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
    margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
}

.submit-btn:active:not(:disabled) {
    transform: translateY(-1px);
}

.submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

/* Feedback Messages */
.success-message {
    color: #16a34a;
    background: rgba(22, 163, 74, 0.1);
    border-left: 4px solid #16a34a;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1.5rem;
    font-weight: 500;
    animation: slideIn 0.4s ease-out;
}

.error-message {
    color: #dc2626;
    background: rgba(220, 38, 38, 0.1);
    border-left: 4px solid #dc2626;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1.5rem;
    font-weight: 500;
    animation: slideIn 0.4s ease-out;
}

/* Animations */
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Responsive Design */
@media (max-width: 1024px) {
    .tutor-title {
        padding: 3rem 1.5rem;
    }

    .tutor-title h1 {
        font-size: 2.5rem;
    }

    .tutor-form-section {
        padding: 2rem;
    }
}

@media (max-width: 768px) {
    .tutor-title {
        padding: 2.5rem 1rem;
    }

    .tutor-title h1 {
        font-size: 2rem;
    }

    .tutor-title p {
        font-size: 1rem;
    }

    .tutor-form-container {
        padding: 2rem 1rem;
    }

    .tutor-form-section {
        padding: 1.8rem;
        border-radius: 20px;
    }

    .tutor-form-section h2 {
        font-size: 1.5rem;
    }

    .form-group {
        margin-bottom: 1.1rem;
    }
}

@media (max-width: 480px) {
    .tutor-title {
        padding: 2rem 1rem;
    }

    .tutor-title h1 {
        font-size: 1.5rem;
    }

    .tutor-title p {
        font-size: 0.9rem;
    }

    .tutor-form-container {
        padding: 1.5rem 0.75rem;
    }

    .tutor-form-section {
        padding: 1.5rem;
        border-radius: 18px;
    }

    .tutor-form-section h2 {
        font-size: 1.2rem;
    }

    .tutor-form-section p {
        font-size: 0.85rem;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        padding: 0.8rem 1rem;
        font-size: 0.9rem;
    }

    .form-group label {
        font-size: 0.9rem;
    }

    .submit-btn {
        padding: 0.9rem;
        font-size: 0.95rem;
    }
}
</style>