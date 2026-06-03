<template>
    <main class="tutor-edit">
        <div class="container">
            <div class="header">
                <button @click="goBack" class="btn-back">Back to admin</button>
                <h2>Edit Tutor Details</h2>
            </div>
            <div v-if="loading" class="loading">Loading tutor details...</div>
            <div v-else-if="error" class="error">{{ error }}</div>
            <form @submit.prevent="updateTutor" class="edit-tutor">
                <div class="form-group">
                    <input type="text" id="name" v-model="form.name" placeholder="Enter Name">
                </div>
                <div class="form-group">
                    <input type="text" id="email" v-model="form.email" placeholder="Enter Email">
                </div>
                <div class="form-group">
                    <input type="tel" id="phone" v-model="form.phone" placeholder="Enter Phone Number">
                </div>
                <div class="form-group">
                    <label for="subjects_taught">Subjects Taught</label>
                    <input type="radio" id="maths" v-model="form.subjects_taught" value="Maths">Maths
                    <input type="radio" id="english" v-model="form.subjects_taught" value="English">English
                    <input type="radio" id="biology" v-model="form.subjects_taught" value="Biology">Biology
                </div>
                <div class="form-group">
                    <input type="text" id="years_of_experience" v-model="form.years_of_experience"
                        placeholder="Enter Years of Experience">
                </div>
                <div class="form-group">
                    <button type="button" @click="goBack" class="btn-cancel">Cancel</button>
                    <button type="submit" :disabled="isSubmitting" class="btn-submit">
                        {{ isSubmitting ? 'Updating...' : 'Update Tutor' }}
                    </button>
                </div>
                <div v-if="submitMessage" class="success-message">{{ submitMessage }}</div>
                <div v-else-if="submitError" class="error-message">{{ submitError }}</div>
            </form>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../services/api';

const route = useRoute();
const router = useRouter();

const form = ref({
    name: '',
    email: '',
    phone: '',
    subjects_taught: '',
    years_of_experience: ''
});

const loading = ref(false);
const error = ref('');

const isSubmitting = ref(false);
const submitMessage = ref('');
const submitError = ref('');

// Fetch all users (optional, controlled)
const fetchUsers = async () => {
    try {
        const response = await api.get('/users');
        console.log('Users:', response.data);
    } catch (err) {
        console.error('Error fetching users:', err);
    }
};

const fetchTutor = async () => {
    loading.value = true;
    error.value = '';

    try {
        const tutorID = route.params.id;
        const response = await api.get(`/tutors/${tutorID}`);
        Object.assign(form.value, response.data || {});
    } catch (err) {
        console.error('Error fetching tutor details:', err);
        error.value = 'Failed to load tutor details, try again later.';
    } finally {
        loading.value = false;
    }
};

const updateTutor = async () => {
    isSubmitting.value = true;
    submitMessage.value = '';
    submitError.value = '';

    try {
        const tutorID = route.params.id;
        await api.put(`/tutors/${tutorID}`, form.value);

        submitMessage.value = 'Tutor updated successfully!';

        // Redirect to tutor details page after successful update
        setTimeout(() => {
            router.push(`/admin/tutor/${tutorID}/details`);
        }, 3000);
    } catch (err) {
        console.error('Error updating tutor:', err);
        submitError.value = 'Failed to update tutor, try again later.';
    } finally {
        isSubmitting.value = false;
    }
};

const goBack = () => {
    router.push('/admin');
};

onMounted(() => {
    fetchTutor();
    fetchUsers(); // optional, runs once on mount
});
</script>

<style scoped>
.tutor-edit {
    padding: 2rem;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.edit-tutor {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn-back,
.btn-cancel {
    background-color: #6b7280;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

.btn-back:hover,
.btn-cancel:hover {
    background-color: #4b5563;
}

.btn-submit {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

.btn-submit:hover {
    background-color: #2563eb;
}

.success-message {
    color: #28a745;
    margin-top: 1rem;
}

.error-message {
    color: #dc3545;
    margin-top: 1rem;
}
</style>