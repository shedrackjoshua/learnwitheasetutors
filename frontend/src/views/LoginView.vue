<template>
    <main class="login-wrapper">
        <h2>Login Page</h2>
        <!-- Login Form-->
        <section>
            <form @submit.prevent="handleLogin" class="login-form">
                <input type="text" v-model="form.login" placeholder="Email or Username" required>
                <input type="password" v-model="form.password" placeholder="Password" required>
                <button type="submit" :disabled="loading" class="btn-loading">
                    {{ loading ? 'Loading...' : 'Login' }}
                </button>
            </form>
        </section>
    </main>
</template>
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
    login: '',
    password: ''
})

const loading = ref(false);
const message = ref('');

const handleLogin = async () => {
    loading.value = true;
    message.value = '';
    try {
        const res = await authStore.login(form.value);
        message.value = 'Login successful!';

        // Session Redirection Logic
        if (res?.sessionId) {
            router.push({
                name: 'Classroom',
                params: { sessionId: res.sessionId }
            });
            return;
        }

        const role = authStore.user?.role;
        if (role === 'admin') {
            router.push('/admin');
        } else if (role === 'tutor') {
            router.push('/tutor');
        } else if (role === 'parents') {
            router.push('/parentsdashboard');
        } else {
            router.push('/');
        }
    } catch (err) {
        console.error('Login error:', err);
        message.value = err.response?.data?.message || err.message || 'Login failed, try again.';
    } finally {
        loading.value = false;
    }
};

const handleLogout = () => {
    authStore.logout();
    message.value = 'Logged out successfully.';
    // Redirect to home page after logout
    setTimeout(() => {
        router.push('/');
    }, 2000);
}

</script>

<style scoped>
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

.login-form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 20px auto;
}

.login-form input {
    margin-bottom: 5px;
    padding: 8px;
    font-size: 16px;
    color: #1e3a8a;
    background-color: #f8faff;
    border-bottom: 2px solid #1e3a8a;
    outline: none;
    border-radius: 6px;
}

.login-form input:focus {
    border-bottom-color: #2563eb;
}

.btn-loading {
    padding: 0.7rem;
    font-size: 16px;
    cursor: pointer;
    text-decoration: underline;
    border: 2px solid #1e3a8a;
    background: #007bff;
    margin-bottom: 1.5rem;
}

.btn-loading:hover {
    background-color: #ccc;
    color: #1a0303;
}

.profile-layout {
    display: flex;
    gap: 20px;
    height: 100vh;
}

.side-bar {
    width: 200px;
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
}

.main-content {
    flex: 1;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
}

.login-wrapper {
    min-height: 50vh;
    width: 100%;
    /* update path */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: whitesmoke;
    position: relative;
    padding-top: 60px;

    /* Mobile fixes */
    -webkit-background-size: cover;
    background-attachment: fixed;
}
</style>