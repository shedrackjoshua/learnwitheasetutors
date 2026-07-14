<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="bg-white w-full max-w-5xl h-[80vh] rounded-lg overflow-hidden shadow-2xl flex flex-col">
            <div class="p-3 flex items-center justify-between border-b">
                <div class="flex items-center gap-3">
                    <h3 class="text-lg font-semibold">Whiteboard</h3>
                    <div class="text-sm text-gray-500">Live drawing</div>
                </div>
                <div class="flex items-center gap-2">
                    <button @click="$emit('close')" class="px-3 py-1 bg-gray-100 rounded">Close</button>
                </div>
            </div>

            <div class="flex-1 relative">
                <canvas ref="canvas" class="w-full h-full bg-white"></canvas>
            </div>

            <div class="p-3 border-t flex gap-3">
                <button @click="$emit('tool', 'pen')" class="px-3 py-2 bg-sky-600 text-white rounded">Pen</button>
                <button @click="$emit('tool', 'eraser')" class="px-3 py-2 bg-gray-200 rounded">Eraser</button>
                <button @click="$emit('clear')" class="px-3 py-2 bg-red-50 rounded">Clear</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const canvas = ref(null);
onMounted(() => {
    // placeholder: parent can attach drawing logic and sync
});
</script>

<style scoped>
/* Minimal styles; parent can supply richer behavior */
</style>
