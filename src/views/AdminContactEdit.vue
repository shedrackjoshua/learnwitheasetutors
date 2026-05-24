<template>
    <main class="contact-edit">
        <div class="container">
            <div class="header">
                <button @click="goBack" class="btn-back">Back to Admin</button>
                <h2>Edit Contact</h2>
            </div>
            <div v-if="loading" class="loading">Loading Contact Details...</div>
            <div v-else-if="error" class="error">{{ error }}</div>
            <form v-else @submit.prevent="updateContact" class="edit-form">
                <div class="form-group">
                    <input type="text" id="full_name" v-model="form.full_name" placeholder="Enter Full Name">
                </div>
                <div class="form-group">
                    <input type="text" id="email" v-model="form.email" placeholder="Enter Email">
                </div>
                <div class="form-group">
                    <input type="text" id="programme" v-model="form.programme" placeholder="Enter Programme" >
                </div>
                <div class="form-group">
                    <input type="tel" id="phone" v-model="form.phone" placeholder="Enter Phone Number">
                </div>
                <div class="form-group">
                    <textarea name="message" id="message" v-model="form.message" rows="6" placeholder="Enter Message"></textarea>
                </div>
                <div class="form-action">
                    <button type="button" @click="goBack" class="btn-cancel">Cancel</button>
                    <button type="submit" :disabled="isSubmitting" class="btn-submit">
                        {{ isSubmitting ? 'Updating...' : 'Update Contact' }}
                    </button>
                </div>
                <div v-if="submitMessage" class="success-message">{{ submitMessage }}</div>
                <div v-if="submitError" class="error-message">{{ submitError }}</div>
            </form>
        </div>
    </main>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const error = ref('');
const isSubmitting = ref(false);
const submitMessage = ref('');
const submitError = ref('');

const form = ref({
    full_name: '',
    email: '',
    programme: '',
    phone: '',
    message: ''
});

const fetchContact = async () => {
    loading.value = true;
    error.value = '';
    try {
        const contactID = route.params.id;
        // server exposes GET /contact/:id
        const response = await axios.get(`http://localhost:3000/contacts/${contactID}`);
        form.value = response.data || {};
    } catch (err) {
        console.error(`Error fetching contact details:`, err);
        error.value = 'Failed to load contact details, try again later.';
    } finally {
        loading.value = false;
    }
}

const updateContact = async () => {
    isSubmitting.value = true;
    submitMessage.value = '';
    submitError.value = '';
    try {
        const contactID = route.params.id;
        const response = await axios.put(`http://localhost:3000/contacts/${contactID}`, form.value);
        submitMessage.value = 'Contact updated successfully!';
        // Redirect to contact details page after successful update
        setTimeout(() => {
            router.push(`/admin/contact/${contactID}/details`);
        }, 3000);
    } catch (err) {
        console.error(`Error updating contact:`, err);
        submitError.value = 'Failed to update contact, try again later.';
    } finally {
        isSubmitting.value = false;
    }
}

const goBack = () => {
    router.push('/admin');
}

onMounted(() => {
    fetchContact();
})
</script>

<style scoped>
.contact-edit {
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
}
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}
.btn-back {
    background-color: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.btn-back:hover {
    background-color: #2563eb;
}
.edit-form {
    max-width: 600px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.form-group {
    margin-bottom: 1rem;
}
.form-group input, .form-group textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.form-action {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}
.btn-cancel {
    background-color: #6b7280;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}
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
.container {
    max-width: 600px;
    margin: 0 auto;
}

</style>