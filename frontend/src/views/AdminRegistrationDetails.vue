<template>
    <main class="registration-details">
        <div class="container">
            <div class="header">
                <button @click="goBack" class="btn-back">Back to Admin</button>
                <h2>{{ registration?.parents_name }}</h2>
            </div>
            <div v-if="loading" class="loading">Loading Registration Details...</div>
            <div v-if="error" class="error">{{ error }}</div>
            <div v-else-if="registration" class="registration-card">
                <div class="detail-row">
                    <strong>Parent's Name:</strong>
                    <span>{{ registration.parents_name }}</span>
                </div>
                <div class="detail-row">
                    <strong>Parent's Email:</strong>
                    <span>{{ registration.parents_email }}</span>
                </div>
                <div class="detail-row">
                    <strong>Phone Number:</strong>
                    <span>{{ registration.phone }}</span>
                </div>
                <div class="detail-row">
                    <strong>Country/Region:</strong>
                    <span>{{ registration.country_or_region }}</span>
                </div>
                <div class="detail-row">
                    <strong>Children:</strong>
                    <span>
                        {{Array.isArray(registration.children) ? registration.children.map(child =>
                            child.wards_name).join(', ') : 'N/A' }}
                    </span>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../services/api';

const route = useRoute();
const router = useRouter();

const registration = ref(null);
const loading = ref(false);
const error = ref('');

// Fetch all users (optional, controlled)
const fetchUsers = async () => {
    try {
        const response = await api.get('/users');
        console.log('Users:', response.data);
    } catch (err) {
        console.error('Error fetching users:', err);
    }
};

const fetchRegistration = async () => {
    loading.value = true;
    error.value = '';

    try {
        const registrationID = route.params.id;
        const response = await api.get(`/registrations/${registrationID}`);
        registration.value = response.data;
    } catch (err) {
        console.error('Error fetching registration details:', err);
        error.value = 'Failed to load registration details, try again later.';
    } finally {
        loading.value = false;
    }
};

const goBack = () => {
    router.push('/admin');
};

onMounted(() => {
    fetchRegistration();
    fetchUsers(); // optional, runs once on mount
});
</script>

<style scoped>
.registration-details {
    padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.btn-back {
    padding: 8px 16px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-back:hover {
    background-color: #0056b3;
}

.loading {
    font-size: 1.2em;
    color: #555;
}

.error {
    color: red;
    font-size: 1.2em;
}

.registration-card {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.detail-row {
    margin-bottom: 10px;
}

.detail-row strong {
    display: block;
    font-weight: 600;
    margin-bottom: 4px;
}

.container {
    max-width: 600px;
    margin: 0 auto;
}
</style>