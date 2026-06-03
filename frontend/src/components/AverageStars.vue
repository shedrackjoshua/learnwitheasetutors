<template>
    <div class="average-stars">
        <span v-for="star in 5" :key="star" class="star" 
            :class="starClass(star)" 
            @click="setRating(star)">
            &#9733;
        </span>
        <transition name="fade">
            <span class="numeric" :key="average.toFixed(1)">
                ({{ average.toFixed(1) }})
            </span>
        </transition>
    </div>
</template>
<script setup>
const props = defineProps({
    average: {
        type: Number,
        required: true
    }   
})

function starClass(star) {
    const fullStars = Math.floor(props.average);
    const hasHalfStar = props.average - fullStars >= 0.5;

    if (star <= fullStars) {
        return 'filled';
    } else if (star === fullStars + 1 && hasHalfStar) {
        return 'half-filled';
    } else {
        return '';
    }
}
</script>

<style scoped>
.average-stars {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: #FFD700; /* Gold color for stars */
}
.star {
    cursor: pointer;
    transition: color 0.3s ease;
    position: relative;
}
.star.filled {
    color: #FFD700; /* Fully filled star */
}
.star.half-filled {
    color: #FFD700; /* Half-filled star */
    background: linear-gradient(90deg, #FFD700 50%, #ccc 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.numeric {
    margin-left: 0.5rem;
    font-size: 1rem;
    color: #555;
}
.star:hover {
}
.star.filled:hover {
    color: #FFA500; /* Darker gold on hover for filled stars */
}
.star.half-filled::before {
    content: '★';
    position: absolute;
    left: 0;
    width: 50%;
    overflow: hidden;
    color: #FFD700; /* Gold color for half-filled star */
}
/* Fade transition for the numeric rating */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

</style>