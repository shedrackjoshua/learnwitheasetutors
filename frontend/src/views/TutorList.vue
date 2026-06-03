<template>
    <div class="tutor-container">
        <h2>Available Tutors</h2>
        <div v-for="tutor in tutors" :key="tutor._id" class="tutor-card">
            <h3>{{ tutor.name }} - {{ tutor.subject }}</h3>
            <TutorRating :tutor="tutor" />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import TutorRating from '../components/TutorRating.vue';

const tutors = ref([]);

onMounted(async () => {
    try {
        // use the shared api instance (base '/api') so Vite dev proxy forwards to backend
        const res = await api.get('/tutors');
        if (Array.isArray(res.data)) {
            tutors.value = res.data;
        } else {
            console.warn('Unexpected /tutors response, expected array:', res.data);
            tutors.value = [];
        }
    } catch (err) {
        console.error('Failed to fetch tutors:', err);
        tutors.value = [];
    }
});
</script>
<style scoped>
.tutor-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.tutor-card {
    border: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
}
</style>