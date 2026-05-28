<template>
    <div class="rating-form">
        <h3>Rate {{ tutor.name }}</h3>
        <div v-if="message" :class="['message', message.includes('successfully') ? 'success' : 'error']">
            {{ message }}
        </div>
        <form @submit.prevent="submitRating">
            <StarRating v-model="score" :max="5" />

            <label for="comment">Comment</label>
            <textarea id="comment" v-model="comment"></textarea>

            <button type="submit" :disabled="loading">{{ loading ? 'Submitting...' : 'Submit Ratings' }}</button>
        </form>
        <AverageStars v-if="averageRating !== null" :average="averageRating" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import api from '../services/api';
import AverageStars from './AverageStars.vue';
import StarRating from './StarRating.vue';

const props = defineProps({
    tutor: {
        type: Object,
        required: true
    }
})

const score = ref(0);
const comment = ref('');
const averageRating = ref(null);
const loading = ref(false);
const message = ref('');

async function submitRating() {
    loading.value = true;
    message.value = '';
    try {
        // Use shared api service (baseURL '/api') to make request to /api/tutors/:id/rate
        const response = await api.post(`/tutors/${props.tutor._id}/rate`, {
            score: score.value,
            comment: comment.value
        })
        averageRating.value = response.data.averageRating;
        message.value = 'Rating submitted successfully!';
        score.value = 0;
        comment.value = '';
    } catch (err) {
        console.error('Rating error:', err);
        message.value = 'Error submitting rating: ' + (err.response?.data?.message || err.message);
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped>
.rating-form {
    border: 1px solid #ccc;
    padding: 20px;
    margin-top: 20px;
    border-radius: 10px;
    margin: auto;
    max-width: 400px;
    background: #f9f9f9;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.rating-form h3 {
    margin-top: 0;
    color: #1E3A8A;
}

.rating-form label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: #3B82F6;
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

.rating-form textarea {
    width: 100%;
    height: 80px;
    margin-top: 5px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.rating-form textarea:focus {
    border-color: #3B82F6;
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
}

.rating-form button {
    margin-top: 15px;
    padding: 12px 20px;
    background: linear-gradient(135deg, #1E3A8A, #3B82F6);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.rating-form button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.rating-form button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.star-rating span {
    font-size: 2rem;
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;
}

.star-rating span:hover {
    color: #FBBF24;
    transform: scale(1.2);
}

@media (max-width: 500px) {
    .rating-form {
        padding: 15px;
    }

    .rating-form h3 {
        font-size: 1.5rem;
    }

    .rating-form button,
    .rating-form textarea {
        width: 100%;
        padding: 12px;
    }
}
</style>