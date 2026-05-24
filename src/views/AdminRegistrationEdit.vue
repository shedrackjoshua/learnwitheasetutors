<template>
    <main class="registration-edit">
        <div class="header">
            <div class="container">
                <button @click="goBack" class="btn-back">Back to Admin</button>
                <h2>Edit Registration Details</h2>
            </div>
            <div v-if="loading" class="loading">Loading Registration Details...</div>
            <div v-if="error" class="error">{{ error }}</div>
            <form v-else @submit.prevent="updateRegistration" class="edit-form">
                <div class="form-group">
                    <input type="text" id="parents_name" v-model="form.parents_name" placeholder="Enter Parent's Name">
                </div>
                <div class="form-group">
                    <input type="text" id="parents_email" v-model="form.parents_email" placeholder="Enter Parent's Email">
                </div>
                <div class="form-group">
                    <input type="tel" id="phone" v-model="form.phone" placeholder="Enter Phone Number">
                </div>
                <div class="form-group">
                    <input type="text" id="country_or_region" v-model="form.country_or_region" placeholder="Enter Country or Region">
                </div>
                <div class="form-group">
                    <label for="children">Children (comma separated names)</label>
                    <input type="text" id="children" v-model="form.childrenString" placeholder="Enter Children's Names">    
                </div>
                <div class="form-action">
                    <button type="button" @click="goBack" class="btn-cancel">Cancel</button>
                    <button type="submit" :disabled="isSubmitting" class="btn-submit">
                        {{ isSubmitting ? 'Updating...' : 'Update Registration' }}
                    </button>
                </div>
                <div v-if="submitMessage" class="success">{{ submitMessage }}</div>
                <div v-if="submitError" class="error">{{ submitError }}</div>
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
    parents_name: '',
    parents_email: '',
    phone: '',
    country_or_region: '',
    children: []
})

const fetchRegistration = async () => {
    loading.value = true;
    error.value = '';
    try {
        const registrationID = route.params.id;
        // server exposes GET /registraions/:id
        const response = await axios.get(`http://localhost:3000/registrations/${registrationID}`)
        form.value = response.data || {};
    } catch (err) {
        console.error(`Error fetching registration details:`, err);
        error.value = 'Failed to load registration details, try again later.';
    } finally {
        loading.value = false;
    }
}

const updateRegistration = async () => {
    isSubmitting.value = true;
    submitMessage.value = '';
    submitError.value = '';
    try {
        const registrationID = route.params.id;
        const response = await axios.put(`http://localhost:3000/registrations/${registrationID}`, form.value);
        submitMessage.value = 'Registration updated successfully!';
        // Redirect to registration details page after successful update
        setTimeout(() => {
            router.push(`/admin/registration/${registrationID}/details`);
        }, 3000);
    } catch (err) {
        console.error(`Error updating registration:`, err);
        submitError.value = 'Failed to update registration, try again later.';
    } finally {
        isSubmitting.value = false;
    }
}

const goBack = () => {
    router.push('/admin');
}
onMounted(() => {
    fetchRegistration();
});
</script>

<style scoped>
.registration-edit {
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
}
.header {
    margin-bottom: 20px;
}
.btn-back {
    background-color: transparent;
    border: none;
    color: #007BFF;
    cursor: pointer;
    font-size: 1rem;
    margin-bottom: 10px;
}
.btn-back:hover {
    text-decoration: underline;
}
.edit-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.form-group {
    margin-bottom: 15px;
}
.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.form-action {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
.btn-cancel {
    background-color: #6b7280;
    color: white;
    border: none;
    padding: 8px 16px;
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
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}
.btn-submit:hover {
    background-color: #2563eb;
}
.success {
    color: #28a745;
    margin-top: 15px;
}
.error {
    color: #dc3545;
    margin-top: 15px;
}
.container {
    max-width: 600px;
    margin: 0 auto;
}
</style>