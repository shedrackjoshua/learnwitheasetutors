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
    max-width: 800px;
    margin: auto;
}

.info-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.child-card {
    background: #f8faff;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
}
</style>