<template>
    <div class="w-full h-full flex flex-col">
        <div class="tabs flex gap-2 mb-3">
            <button :class="tab === 'chat' ? 'tab-active' : 'tab'" @click="tab = 'chat'">Chat</button>
            <button :class="tab === 'participants' ? 'tab-active' : 'tab'"
                @click="tab = 'participants'">Participants</button>
            <button :class="tab === 'files' ? 'tab-active' : 'tab'" @click="tab = 'files'">Files</button>
        </div>

        <div class="flex-1 overflow-auto bg-white/80 rounded-lg p-3 shadow-inner">
            <div v-if="tab === 'chat'" class="chat-list space-y-3">
                <div v-for="m in messages" :key="m.id || m._id" class="message-item">
                    <div class="text-sm font-semibold">{{ m.sender }}</div>
                    <div class="text-sm text-gray-700">{{ m.text || (m.file && m.file.name) }}</div>
                    <div class="text-xs text-gray-400">{{ new Date(m.timestamp).toLocaleTimeString() }}</div>
                </div>
            </div>

            <div v-if="tab === 'participants'" class="participants space-y-2">
                <div v-for="p in participants" :key="p.id"
                    class="flex items-center justify-between p-2 bg-white rounded">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div>{{ p.name }}</div>
                    </div>
                    <div class="text-sm text-gray-500">{{ p.role }}</div>
                </div>
            </div>

            <div v-if="tab === 'files'" class="files space-y-2">
                <div v-for="f in files" :key="f.url" class="p-2 bg-white rounded">
                    <a :href="f.url" target="_blank" class="text-blue-600">{{ f.name }}</a>
                </div>
            </div>
        </div>

        <div class="mt-3 flex gap-2">
            <input v-model="outgoing" placeholder="Type a message" class="flex-1 p-2 rounded-md border" />
            <button @click="send" class="px-4 py-2 bg-sky-600 text-white rounded-md">Send</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({ messages: Array, participants: Array, files: Array });
const emit = defineEmits(['send']);
const tab = ref('chat');
const outgoing = ref('');

function send() {
    if (!outgoing.value.trim()) return;
    emit('send', outgoing.value);
    outgoing.value = '';
}
</script>

<style scoped>
.tab {
    padding: 0.5rem 0.75rem;
    background: rgba(15, 23, 42, 0.04);
    border-radius: 9999px;
}

.tab-active {
    padding: 0.5rem 0.75rem;
    background: #2563eb;
    color: white;
    border-radius: 9999px;
}

.message-item {
    background: rgba(2, 6, 23, 0.04);
    padding: 0.5rem;
    border-radius: 8px;
}
</style>
