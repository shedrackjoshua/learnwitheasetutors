<template>
    <div class="tutor-details">
        <div class="container">
            <div class="header">
                <button @click="goBack" class="btn-back">Back To Admin</button>
                <h2>{{ tutor?.name }}</h2>
            </div>
            <div v-if="loading" class="loading">Loading {{ tutor?.name }}'s details...</div>
            <div v-else-if="error" class="error">{{ error }}</div>
            <div v-else-if="tutor" class="tutor-card">
                <div class="tutor-info">
                    <strong>Name:</strong>
                    <span>{{ tutor.name }}</span>
                </div>
                <div class="tutor-info">
                    <strong>Email:</strong>
                    <span>{{ tutor.email }}</span>
                </div>
                <div class="tutor-info">
                    <strong>Phone:</strong>
                    <span>{{ tutor.phone }}</span>
                </div>
                <div class="tutor-info">
                    <strong>Subject's Taught:</strong>
                    <span>{{ tutor.subjects_taught }}</span>
                </div>
                <div class="tutor-info">
                    <strong>Years of Experience:</strong>
                    <span>{{ tutor.years_of_experience }}</span>
                </div>
            </div>    
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const tutor = ref(null);
const loading = ref(false);
const error = ref('');

// Fetch tutor details on mount
const fetchTutor = async () => {
    loading.value = true;
    error.value = '';
    try {
        const tutorID = route.params.id
        const response = await axios.get(`http://localhost:3000/tutors/${tutorID}`);
        tutor.value = response.data;
    } catch (err) {
        console.error(`Error fetching tutor details:`, err);
        error.value = 'Failed to load tutor details, please try again later.';
    } finally {
        loading.value = false;
    }
}

const goBack = () => {
    router.push('/admin');
}

onMounted(() => {
    fetchTutor();
})
</script>

<style scoped>
.tutor-details {
    padding: 2rem;
}
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
}
.btn-back {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.btn-back:hover {
    background-color: #2563eb;
}
.tutor-card {
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.tutor-info {
    margin-bottom: 1rem;
}
.tutor-info strong {
    display: block;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

</style>