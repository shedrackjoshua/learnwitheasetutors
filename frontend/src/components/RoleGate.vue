<template>
    <div v-if="hasRole(roles)">
        <slot />
    </div>
</template>

<script setup>
import { useAuthStore } from '../store/auth';
import { computed } from 'vue';

const props = defineProps({
    roles: {
        type: Array,
        required: true
    }
});

const authStore = useAuthStore();

const hasRole = (roles) => {
    return authStore.hasRole(roles);
};
</script>