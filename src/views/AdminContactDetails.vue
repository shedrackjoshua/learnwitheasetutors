<template>
    <main class="contact-details">
        <div class="container">
            <div class="header">
                <button @click="goBack" class="btn-back">Back to Admin</button>
                <h2>{{ contact?.full_name }}</h2>
            </div>
            <div v-if="loading" class="loading">Loading contact...</div>
            <div v-else-if="error" class="error">{{ error }}</div>
            <div v-else-if="contact" class="contact-card">
                <div class="contact-info">
                    <strong>Name:</strong>
                    <span>{{ contact.full_name }}</span>
                </div>
                <div class="contact-info">
                    <strong>Email:</strong>
                    <span>{{ contact.email }}</span>
                </div>
                <div class="contact-info">
                    <strong>Programme:</strong>
                    <span>{{ contact.programme }}</span>
                </div>
                <div class="contact-info">
                    <strong>Phone:</strong>
                    <span>{{ contact.phone }}</span>
                </div>
                <div class="contact-info">
                    <strong>Message:</strong>
                    <p class="message-text">{{ contact.message }}</p>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router= useRouter();

const contact = ref(null);
const error = ref('');
const loading = ref(false);

const fetchContact = async () => {
    loading.value = true;
    error.value = '';
    try {
    const contactID = route.params.id;
    // server exposes GET /contacts/:id
    const response = await axios.get(`http://localhost:3000/contacts/${contactID}`)
    contact.value = response.data;
    } catch (err) {
        console.error(`Error fetching contact details:`, err);
        error.value = 'Failed to load contact details, try again later.';
    } finally {
        loading.value = false;
    }
}

const goBack = () => {
    router.push('/admin');
}

onMounted(() => {
    fetchContact()
})
</script>

<style scoped>
.contact-details {
    padding: 20px;
}
.contact-info {
    margin-bottom: 10px;
}
.message-text {
    white-space: pre-wrap;
}
.container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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
.contact-card {
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.loading, .error {
    text-align: center;
    font-size: 1.2rem;
    color: #555;
}

</style>