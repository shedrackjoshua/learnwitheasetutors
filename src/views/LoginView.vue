<template>
    <main class="container">
        <h2>Login Page</h2>
        <!-- Login Form-->
         <section>
            <form @submit.prevent="handleLogin" class="login-form">
                <input type="email" v-model="form.email" placeholder="Email" required>
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
    email: '',
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
            router.push('/parents');
        } else {
            router.push('/');
        }       
    } catch (err) {
        console.error('Login error:', err);
        message.value = err.response?.data?.message || 'Login failed, try again.';
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
.login-form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
}
.login-form input {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
}
.btn-loading {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
}
.profile-layout {
    display: flex;
    gap: 20px;
}
.side-bar {
    width: 200px;
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
}
.main-content {
    flex: 1;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
}

</style>