<template>
    <div class="signup-page">
        <main class="container">
            <div class="header">
                <div class="header-content">
                    <h2>Signup Page</h2>
                    <p>Create an account to access our tutoring services.</p>
                    <div v-if="message" :class="['message', message.includes('successful') ? 'success' : 'error']">
                        {{ message }}
                    </div>
                    <form @submit.prevent="handleSignup">
                        <div class="form-group">
                            <input type="text" v-model="username" placeholder="Username" required>
                        </div>
                        <div class="form-group">
                            <input type="email" v-model="email" placeholder="Email" required>
                        </div>
                        <div class="form-group">
                            <input type="password" v-model="password" placeholder="Password" required>
                        </div>
                        <div class="form-group">
                            <select id="role" v-model="role" required>
                                <option value="" disabled>Select Role</option>
                                <option value="tutor">Tutor</option>
                                <option value="parents">Parent</option>
                                <option value="child">Child</option>
                            </select>
                            <button type="submit" class="btn-submit" :disabled="loading">
                                {{ loading ? 'Signing up...' : 'Sign Up' }}
                            </button>
                        </div>
                    </form>

                </div>

            </div>

        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signup } from '../services/auth';
import api from '../services/api';

const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const role = ref(null);
const loading = ref(false);
const message = ref('');

const handleSignup = async () => {
    loading.value = true;
    message.value = '';

    try {
        await signup({
            username: username.value,
            email: email.value,
            password: password.value,
            role: role.value
        });

        message.value = 'Signup successful! Please log in.';

        setTimeout(() => {
            router.push('/login');
        }, 1000);
    } catch (err) {
        console.error('Signup error:', err);
        message.value = err.response?.data?.message || err.message || 'Signup failed, try again.';
    } finally {
        loading.value = false;
    }
};
</script>
<style scoped>
.signup-page {
    background-image: url('/Banner3.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.message {
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
    font-weight: 500;
}

.message.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.message.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.btn-submit {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-submit:hover {
    background-color: #0056b3;
}

.header-content {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    color: #1e3a8a;
    font-weight: 600;
    font-size: 1.8rem;
    letter-spacing: -0.5px;
    margin-bottom: 1rem;
    margin-top: 2rem;
    text-transform: capitalize;
}
</style>