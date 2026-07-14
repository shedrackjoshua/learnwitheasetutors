<template>
    <div class="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 p-6">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Main area (videos + whiteboard) -->
                <div class="lg:col-span-2 flex flex-col gap-4">
                    <div class="bg-white rounded-lg p-4 shadow-md flex flex-col gap-4">
                        <div class="flex gap-4">
                            <div class="flex-1">
                                <div class="primary-video bg-gray-900 rounded-lg overflow-hidden h-64 md:h-96">
                                    <!-- large primary video placeholder -->
                                    <div class="w-full h-full flex items-center justify-center text-white text-xl">
                                        Primary Video</div>
                                </div>
                            </div>
                            <div class="w-2/5 grid grid-cols-2 gap-3">
                                <VideoTile v-for="i in 4" :key="i" :name="`User ${i}`" :label="`P${i}`" />
                            </div>
                        </div>

                        <div class="flex items-center justify-center">
                            <ControlBar @toggle-mic="micOn = !micOn" @toggle-video="camOn = !camOn"
                                @whiteboard="openWhiteboard = true" @end="endSession" :micOn="micOn" :camOn="camOn" />
                        </div>
                    </div>

                    <div class="bg-white rounded-lg p-4 shadow-md">
                        <div class="flex items-center justify-between mb-3">
                            <h3 class="text-lg font-semibold">Session Notes</h3>
                            <div class="text-sm text-gray-500">Auto-saved</div>
                        </div>
                        <div class="p-3 bg-gray-50 rounded h-40 overflow-auto">Notes area...</div>
                    </div>
                </div>

                <!-- Right panel -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg p-4 shadow-md h-full flex flex-col">
                        <ChatPanel :messages="messages" :participants="participants" :files="files" @send="onSend" />
                    </div>
                </div>
            </div>
        </div>

        <WhiteboardModal v-if="openWhiteboard" @close="openWhiteboard = false" @tool="onTool" @clear="onClear" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import VideoTile from '../components/VideoTile.vue';
import ControlBar from '../components/ControlBar.vue';
import ChatPanel from '../components/ChatPanel.vue';
import WhiteboardModal from '../components/WhiteboardModal.vue';

const messages = ref([]);
const participants = ref([{ id: 1, name: 'Tutor', role: 'tutor' }, { id: 2, name: 'Student', role: 'student' }]);
const files = ref([]);
const micOn = ref(true);
const camOn = ref(true);
const openWhiteboard = ref(false);

function onSend(text) {
    messages.value.push({ id: Date.now().toString(36), sender: 'You', text, timestamp: Date.now() });
}

function endSession() {
    // placeholder: end session flow
    alert('Session ended');
}

function onTool(tool) {
    console.debug('whiteboard tool', tool);
}

function onClear() {
    console.debug('whiteboard clear');
}
</script>

<style scoped>
.primary-video {
    background: linear-gradient(90deg, rgba(2, 6, 23, 1) 0%, rgba(15, 23, 42, 1) 100%);
}
</style>
