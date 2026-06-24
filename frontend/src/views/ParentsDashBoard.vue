<template>
    <main class="parent-dashboard">
        <h2>Welcome, {{ parent.parents_name }}</h2>

        <section class="info-card">
            <h3>Your Information</h3>
            <p><strong>Email:</strong> {{ parent.parents_email }}</p>
            <p><strong>Phone:</strong> {{ parent.phone }}</p>
            <p><strong>Location:</strong> {{ parent.state_or_province }}, {{ parent.country_or_region }}</p>
        </section>

        <section class="info-card">
            <h3>Your Children</h3>
            <div v-for="child in parent.children" :key="child.wards_name" class="child-card">
                <p><strong>Name:</strong> {{ child.wards_name }}</p>
                <p><strong>Grade:</strong> {{ child.students_grade_or_year }}</p>
                <p><strong>Subject:</strong> {{ child.subject_enrolment }}</p>
                <p><strong>Objective:</strong> {{ child.tutoring_objective }}</p>
            </div>
        </section>

        <section class="info-card" v-if="parent.referralCode">
            <h3>Your Referral Link</h3>
            <code>{{ referralLink }}</code>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();
const parent = ref(authStore.user || {});
const referralLink = ref('');

onMounted(() => {
    if (parent.value.referralCode) {
        referralLink.value =
            `http://www.learnwitheasetutors.com/register?ref=${parent.value.referralCode}`;
    }
});
</script>

<style scoped>
.parent-dashboard {
    padding: 2rem;
    max-width: 900px;
    margin: auto;
    background: #f3f4f6;
    /* light gray background */
    min-height: 100vh;
    /* ensures background shows on mobile */
}

/* Headline */
.parent-dashboard h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1E3A8A;
    /* blue-800 */
    margin-bottom: 1.5rem;
    text-align: center;
}

/* Info Cards */
.info-card {
    background: white;
    padding: 1.75rem;
    border-radius: 14px;
    margin-bottom: 1.75rem;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.info-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

/* Card Titles */
.info-card h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1E3A8A;
    margin-bottom: 1rem;
}

/* Child Cards */
.child-card {
    background: #f8faff;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    border-left: 4px solid #2563EB;
    /* blue accent */
}

/* Referral Link */
code {
    display: block;
    background: #eef2ff;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #1E3A8A;
    word-break: break-all;
}

/* Mobile Improvements */
@media (max-width: 768px) {
    .parent-dashboard {
        padding: 1.25rem;
        background: #f3f4f6;
        min-height: 100vh;
        /* ensures background always shows */
    }

    .info-card {
        padding: 1.25rem;
    }

    .parent-dashboard h2 {
        font-size: 1.5rem;
    }
}
</style>