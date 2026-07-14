<template>
    <div
        class="w-full bg-slate-800/80 backdrop-blur-md py-3 px-4 rounded-t-2xl shadow-lg flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
            <button @click="$emit('toggle-mic')" class="control-btn" :class="{ active: micOn }">
                <!-- mic icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 00-1 1v6a1 1 0 102 0V3a1 1 0 00-1-1z" />
                    <path
                        d="M5 8a4 4 0 008 0V7a1 1 0 112 0v1a6 6 0 01-5 5.917V17h2a1 1 0 110 2H6a1 1 0 110-2h2v-3.083A6 6 0 016 8V7a1 1 0 112 0v1z" />
                </svg>
            </button>

            <button @click="$emit('toggle-video')" class="control-btn" :class="{ active: camOn }">
                <!-- video icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
                </svg>
            </button>

            <button @click="$emit('share-screen')" class="control-btn">
                <!-- screen share -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M4 3a2 2 0 00-2 2v7a2 2 0 002 2h3v2H5a1 1 0 100 2h10a1 1 0 100-2h-2v-2h3a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
                </svg>
            </button>

            <button @click="$emit('whiteboard')" class="control-btn">
                <!-- whiteboard -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12V3H4z" />
                </svg>
            </button>
        </div>

        <div class="flex items-center gap-3">
            <button @click="$emit('end')"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold">End</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({ micOn: Boolean, camOn: Boolean });
</script>

<style scoped>
.control-btn {
    background: rgba(255, 255, 255, 0.06);
    border-radius: 9999px;
    padding: 0.6rem;
    color: white;
}

.control-btn.active {
    background: rgba(96, 165, 250, 0.25);
}
</style>
