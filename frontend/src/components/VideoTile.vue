<template>
    <div class="relative bg-black rounded-lg overflow-hidden shadow-lg">
        <video ref="videoEl" :autoplay="true" playsinline :muted="muted"
            class="w-full h-48 md:h-60 object-cover bg-gray-900" />

        <div class="absolute left-3 top-3 bg-black/50 text-white text-sm px-2 py-1 rounded-md">
            {{ label }}
        </div>

        <div class="absolute right-3 top-3 flex gap-2">
            <button @click="$emit('pin')" class="p-1 bg-white/20 rounded-md text-white hover:bg-white/30">
                <!-- pin icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 8h2a2 2 0 012 2v2m0 0l-7 7-7-7m14 0V6a2 2 0 00-2-2h-6" />
                </svg>
            </button>
            <button @click="$emit('minimize')" class="p-1 bg-white/20 rounded-md text-white hover:bg-white/30">
                <!-- minimize icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
            </button>
        </div>

        <div class="p-2 bg-white/10 text-xs text-white/90 flex justify-between items-center">
            <div class="truncate">{{ name }}</div>
            <div class="flex items-center gap-2">
                <span class="text-emerald-400">●</span>
                <span class="text-white/80">{{ status }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    name: { type: String, default: 'Participant' },
    label: { type: String, default: 'User' },
    muted: { type: Boolean, default: false },
    status: { type: String, default: 'Connected' }
});

const videoEl = ref(null);

onMounted(() => {
    // placeholder: parent should attach media stream to the videoEl
});
</script>

<style scoped>
/* optional scoped styles if needed */
</style>
