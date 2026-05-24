<template>
  <div class="classroom" :class="{ 'minimize-video': minimizeVideo }">
    <!-- LEFT SIDE -->
    <div class="left-pane" :style="{ flex: minimizeVideo ? '1' : '2' }">
      <div class="header-section">
        <h2>Live Classroom</h2>
        <button class="minimize-btn" @click="minimizeVideo" :title="minimizeVideo ? 'Maximize' : 'Minimize'">
          {{ minimizeVideo ? '📺' : '➖' }}
        </button>
      </div>

      <!-- VIDEO GRID -->
      <div class="videos" :class="{ minimized: minimizeVideo }">
        <div class="video-tile">
          <div class="video-label">You</div>
          <video ref="localVideo" autoplay playsinline muted></video>
        </div>

        <div class="video-tile">
          <div class="video-label">Tutor</div>
          <video ref="remoteVideo" autoplay playsinline></video>
        </div>
      </div>

      <!-- WHITEBOARD -->
      <div class="whiteboard-container">
        <div class="whiteboard-header">
          <h3>Whiteboard</h3>

          <div class="whiteboard-tools">
            <label>Color:</label>
            <input type="color" v-model="penColor" />

            <label>Size:</label>
            <input type="range" min="1" max="20" v-model="penSize" />

            <button @click="activatePen">Pen</button>
            <button @click="activateEraser">Eraser</button>
            <button @click="clearWhiteboard">Clear</button>
          </div>
        </div>

        <canvas ref="canvas" class="whiteboard" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"
          @mouseleave="stopDrawing"></canvas>
      </div>

      <!-- RAISE HAND BADGE -->
      <div v-if="handRaised" class="hand-badge">
        ✋ You raised your hand
      </div>

      <!-- ZOOM TOOLBAR -->
      <div class="zoom-toolbar">
        <button @click="toggleMic" :class="{ off: !micOn }" title="Toggle Microphone">
          <span>{{ micOn ? '🎙️' : '🔇' }}</span>
          <p>Mic</p>
        </button>

        <button @click="toggleCamera" :class="{ off: !cameraOn }" title="Toggle Camera">
          <span>{{ cameraOn ? '🎥' : '🚫' }}</span>
          <p>Camera</p>
        </button>

        <button @click="toggleVolume" :class="{ off: !volumeOn }" title="Toggle Speaker">
          <span>{{ volumeOn ? '🔊' : '🔈' }}</span>
          <p>Speaker</p>
        </button>

        <button @click="raiseHand" :class="{ active: handRaised }" title="Raise Hand">
          <span>✋</span>
          <p>Hand</p>
        </button>

        <button @click="startScreenShare" :disabled="isSharingScreen" title="Share Screen">
          <span>🖥️</span>
          <p>Share</p>
        </button>

        <button @click="stopScreenShare" :disabled="!isSharingScreen" title="Stop Sharing">
          <span>⛔</span>
          <p>Stop</p>
        </button>

        <button @click="toggleRecording" title="Toggle Recording">
          <span>{{ isRecording ? '⏹️' : '⏺️' }}</span>
          <p>Record</p>
        </button>
      </div>
    </div>

    <!-- RIGHT SIDE: CHAT -->
    <div class="right-pane" :class="{ minimized: minimizeVideo }">
      <div class="chat-header">
        <h3>Chat</h3>
        <div class="typing-indicator" v-if="typingText">
          {{ typingText }}
        </div>
        <button class="close-btn" @click="minimizeVideo" v-if="minimizeVideo" title="Close">✕</button>
      </div>

      <div class="messages" ref="messagesContainer">
        <div v-for="msg in messages" :key="msg.id" class="message" :class="{ me: msg.sender === userName }">
          <div class="message-content">
            <div class="message-text">
              <span class="sender">{{ msg.sender }}:</span>

              <span v-if="msg.type === 'text'">{{ msg.text }}</span>

              <span v-else-if="msg.type === 'file'">
                <a :href="backendBase + msg.file.url" target="_blank">
                  {{ msg.file.name }}
                </a>
              </span>
            </div>

            <div class="meta">
              <span class="time">{{ formatTime(msg.timestamp) }}</span>

              <span v-if="msg.sender === userName" class="read-status">
                {{ msg.read ? '✓✓' : '✓' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAT INPUT -->
      <div class="chat-input">
        <input v-model="chatMessage" @input="handleTyping" @keyup.enter="sendMessage" type="text"
          placeholder="Type a message..." />

        <input type="file" @change="handleFileSelect" class="file-input" ref="fileInput" />
        <button @click="triggerFileInput" class="file-input-label" title="Attach file">📎</button>

        <button @click="sendMessage" class="send-btn">Send</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { io } from 'socket.io-client';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../store/auth';

const route = useRoute();
const auth = useAuthStore();

const roomId = route.params.sessionId;
const userName = auth.user?.name || 'Unknown';
const userRole = auth.user?.role || 'guest';

const backendBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const localVideo = ref(null);
const remoteVideo = ref(null);
const canvas = ref(null);
const messagesContainer = ref(null);
const fileInput = ref(null);

const socket = io(backendBase);

let pc = null;
let localStream = null;
let screenStream = null;

const isSharingScreen = ref(false);
const isRecording = ref(false);
let recorder = null;
let recordedChunks = [];

const messages = ref([]);
const chatMessage = ref('');
const typingText = ref('');
let typingTimeout = null;

// Whiteboard
let ctx = null;
let drawing = false;
let lastX = 0;
let lastY = 0;

const penColor = ref('#000000');
const penSize = ref(3);

// Zoom controls
const cameraOn = ref(true);
const micOn = ref(true);
const volumeOn = ref(true);
const handRaised = ref(false);
const minimizeVideo = ref(false);

// Utility
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// WebRTC
function createPeerConnection() {
  pc = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  });

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('ice-candidate', { roomId, candidate: event.candidate });
    }
  };

  pc.ontrack = (event) => {
    remoteVideo.value.srcObject = event.streams[0];
  };

  if (localStream) {
    localStream.getTracks().forEach((t) => pc.addTrack(t, localStream));
  }
}

async function startCall() {
  if (!pc) createPeerConnection();

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  socket.emit('offer', { roomId, offer });
}

// FIXED SCREEN SHARE
async function startScreenShare() {
  if (!pc) createPeerConnection();

  // Ensure local stream exists
  if (!localStream) {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.value.srcObject = localStream;
    localStream.getTracks().forEach((t) => pc.addTrack(t, localStream));
  }

  // Get screen
  screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  const screenTrack = screenStream.getVideoTracks()[0];

  // Ensure video sender exists
  let sender = pc.getSenders().find((s) => s.track?.kind === 'video');
  if (!sender) {
    const dummy = localStream.getVideoTracks()[0];
    sender = pc.addTrack(dummy, localStream);
  }

  await sender.replaceTrack(screenTrack);

  localVideo.value.srcObject = screenStream;
  isSharingScreen.value = true;

  screenTrack.onended = stopScreenShare;
}

async function stopScreenShare() {
  if (!isSharingScreen.value) return;

  screenStream?.getTracks().forEach((t) => t.stop());
  screenStream = null;

  const cameraTrack = localStream?.getVideoTracks()[0];
  const sender = pc.getSenders().find((s) => s.track?.kind === 'video');

  if (sender && cameraTrack) {
    await sender.replaceTrack(cameraTrack);
  }

  localVideo.value.srcObject = localStream;
  isSharingScreen.value = false;
}

// Recording
function toggleRecording() {
  if (!remoteVideo.value?.srcObject) return;

  if (!isRecording.value) {
    recorder = new MediaRecorder(remoteVideo.value.srcObject);
    recordedChunks = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `session-${roomId}.webm`;
      a.click();
      URL.revokeObjectURL(url);
    };

    recorder.start();
    isRecording.value = true;
  } else {
    recorder.stop();
    isRecording.value = false;
  }
}

// Chat
function sendMessage() {
  if (!chatMessage.value.trim()) return;

  const msg = {
    id: generateId(),
    roomId,
    sender: userName,
    type: 'text',
    text: chatMessage.value,
    timestamp: Date.now(),
    read: false
  };

  messages.value.push(msg);
  socket.emit('chat-message', { roomId, message: msg });
  chatMessage.value = '';

  emitReadForAll();
}

function handleTyping() {
  socket.emit('typing', { roomId, userName, isTyping: !!chatMessage.value });

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    socket.emit('typing', { roomId, userName, isTyping: false });
  }, 1500);
}

function triggerFileInput() {
  fileInput.value?.click();
}

function emitReadForAll() {
  const unread = messages.value
    .filter((m) => m.sender !== userName && !m.read)
    .map((m) => m.id);

  if (unread.length) {
    socket.emit('message-read', { roomId, messageIds: unread });
    messages.value.forEach((m) => {
      if (unread.includes(m.id)) m.read = true;
    });
  }
}

async function handleFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post(`${backendBase}/api/upload`, formData);

  const msg = {
    id: generateId(),
    roomId,
    sender: userName,
    type: 'file',
    file: { url: res.data.url, name: res.data.name },
    timestamp: Date.now(),
    read: false
  };

  messages.value.push(msg);
  socket.emit('file-shared', { roomId, file: msg });

  emitReadForAll();
  e.target.value = '';
}

// Whiteboard
function resizeCanvas() {
  const rect = canvas.value.getBoundingClientRect();
  canvas.value.width = rect.width;
  canvas.value.height = rect.height;
}

function startDrawing(e) {
  drawing = true;
  const rect = canvas.value.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
}

function draw(e) {
  if (!drawing) return;

  const rect = canvas.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const line = {
    x1: lastX,
    y1: lastY,
    x2: x,
    y2: y,
    color: penColor.value,
    size: Number(penSize.value)
  };

  drawLine(line);
  socket.emit('whiteboard-draw', { roomId, line });

  lastX = x;
  lastY = y;
}

function stopDrawing() {
  drawing = false;
}

function drawLine(line) {
  ctx.strokeStyle = line.color;
  ctx.lineWidth = line.size;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(line.x1, line.y1);
  ctx.lineTo(line.x2, line.y2);
  ctx.stroke();
}

function clearWhiteboard() {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  socket.emit('whiteboard-clear', { roomId });
}

function activateEraser() {
  penColor.value = '#ffffff';
  penSize.value = 20;
}

function activatePen() {
  penColor.value = '#000000';
  penSize.value = 3;
}

// Zoom controls
function toggleCamera() {
  const track = localStream?.getVideoTracks()[0];
  if (!track) return;
  track.enabled = !track.enabled;
  cameraOn.value = track.enabled;
}

function toggleMic() {
  const track = localStream?.getAudioTracks()[0];
  if (!track) return;
  track.enabled = !track.enabled;
  micOn.value = track.enabled;
}

function toggleVolume() {
  volumeOn.value = !volumeOn.value;
  remoteVideo.value.muted = !volumeOn.value;
}

function raiseHand() {
  handRaised.value = !handRaised.value;
  socket.emit('raise-hand', {
    roomId,
    userName,
    raised: handRaised.value
  });
}

// Auto-scroll chat
watch(messages, async () => {
  await nextTick();
  messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
});

// Lifecycle
onMounted(async () => {
  try {
    // Init whiteboard
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    ctx = canvas.value.getContext('2d');

    // Check if roomId is available
    if (!roomId) {
      console.warn('No session ID provided. Classroom features will be limited.');
      return;
    }

    // Camera/mic only for tutor/child
    if (['tutor', 'child'].includes(userRole)) {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.value.srcObject = localStream;
      } catch (err) {
        console.warn('Camera/mic access denied:', err);
      }
    }

    // Load chat history
    try {
      const historyRes = await axios.get(`${backendBase}/api/chat/${roomId}`);
      messages.value = historyRes.data || [];
    } catch (err) {
      console.warn('Could not load chat history:', err);
    }

    // Join room
    socket.emit('join-room', { roomId, userName });

    // WebRTC signaling
    socket.on('offer', async ({ offer }) => {
      if (!pc) createPeerConnection();
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('answer', { roomId, answer });
    });

    socket.on('answer', async ({ answer }) => {
      await pc?.setRemoteDescription(answer);
    });

    socket.on('ice-candidate', async ({ candidate }) => {
      await pc?.addIceCandidate(candidate);
    });

    // Chat
    socket.on('chat-message', (msg) => {
      messages.value.push(msg);
      emitReadForAll();
    });

    socket.on('typing', ({ userName: other, isTyping }) => {
      typingText.value = isTyping ? `${other} is typing...` : '';
    });

    socket.on('message-read', ({ messageIds }) => {
      messages.value.forEach((m) => {
        if (messageIds.includes(m.id) && m.sender === userName) m.read = true;
      });
    });

    // Whiteboard sync
    socket.on('whiteboard-draw', ({ line }) => drawLine(line));
    socket.on('whiteboard-clear', () => ctx.clearRect(0, 0, canvas.value.width, canvas.value.height));

    // File sharing
    socket.on('file-shared', ({ file }) => {
      messages.value.push(file);
      emitReadForAll();
    });

    // Raise hand
    socket.on('raise-hand', ({ userName: user, raised }) => {
      console.log(`${user} raised hand: ${raised}`);
    });

    // Auto-start call for tutor/child
    if (['tutor', 'child'].includes(userRole)) startCall();
  } catch (err) {
    console.error('Error mounting classroom:', err);
  }
});

onBeforeUnmount(() => {
  socket.disconnect();
  pc?.close();
  localStream?.getTracks().forEach((t) => t.stop());
  screenStream?.getTracks().forEach((t) => t.stop());
  window.removeEventListener('resize', resizeCanvas);
});
</script>
<style scoped>
/* GLOBAL RESET */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  color: #333;
}

/* MAIN LAYOUT */
.classroom {
  display: flex;
  height: 150vh;
  gap: 1.5rem;
  padding: 1.5rem;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.classroom.minimize-video {
  gap: 0;
}

/* HEADER SECTION */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.header-section h2 {
  margin: 0;
  font-size: 1.8rem;
  color: white;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.minimize-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.minimize-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* LEFT PANE */
.left-pane {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}

.left-pane.minimize-video {
  flex: 0.3;
}

/* RIGHT PANE (CHAT) */
.right-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 20px;
  padding: 1.2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.right-pane.minimized {
  display: none;
}

/* VIDEO SECTION */
.videos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  flex-shrink: 0;
}

.videos.minimized {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  height: auto;
}

.video-tile {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.video-tile:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.video-label {
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 10;
  backdrop-filter: blur(10px);
}

video {
  width: 100%;
  height: 240px;
  background: #000;
  border-radius: 16px;
  object-fit: cover;
  display: block;
}

.videos.minimized video {
  height: 120px;
}

/* WHITEBOARD */
.whiteboard-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 20px;
  padding: 1.2rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 2px solid rgba(102, 126, 234, 0.1);
}

.whiteboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.whiteboard-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #333;
}

.whiteboard-tools {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  flex-wrap: wrap;
}

.whiteboard-tools label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
}

.whiteboard-tools input[type="color"] {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.whiteboard-tools input[type="range"] {
  width: 80px;
}

.whiteboard-tools button {
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.whiteboard-tools button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.whiteboard {
  flex: 1;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  background: white;
  cursor: crosshair;
  min-height: 300px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* RAISE HAND BADGE */
.hand-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  font-weight: 700;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  z-index: 20;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

/* ZOOM TOOLBAR - MODERN DESIGN */
.zoom-toolbar {
  position: relative;
  background: rgba(30, 30, 30, 0.95);
  padding: 1rem 1.5rem;
  border-radius: 20px;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 50;
  max-width: 100%;
  margin-top: auto;
}

.zoom-toolbar button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  padding: 0;
  position: relative;
}

.zoom-toolbar button span {
  font-size: 1.5rem;
  display: block;
}

.zoom-toolbar button p {
  margin: 0.25rem 0 0 0;
  font-size: 0.7rem;
  opacity: 0.8;
  font-weight: 600;
}

.zoom-toolbar button:hover {
  background: rgba(96, 165, 250, 0.3);
  border-color: rgba(96, 165, 250, 0.5);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(96, 165, 250, 0.3);
}

.zoom-toolbar button.off {
  background: rgba(255, 77, 77, 0.2);
  border-color: rgba(255, 77, 77, 0.5);
  color: #ff6b6b;
}

.zoom-toolbar button.off:hover {
  background: rgba(255, 77, 77, 0.3);
  box-shadow: 0 8px 24px rgba(255, 77, 77, 0.3);
}

.zoom-toolbar button.active {
  background: rgba(74, 144, 226, 0.3);
  border-color: rgba(74, 144, 226, 0.7);
  color: #60a5fa;
}

.zoom-toolbar button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.zoom-toolbar button:disabled:hover {
  transform: none;
  box-shadow: none;
}

/* CHAT HEADER */
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
  gap: 1rem;
}

.chat-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #333;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  color: #999;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.25rem 0.5rem;
}

.close-btn:hover {
  color: #333;
  transform: scale(1.2);
}

.typing-indicator {
  font-size: 0.85rem;
  color: #888;
  font-style: italic;
  animation: typing 1.5s infinite;
}

@keyframes typing {

  0%,
  100% {
    opacity: 0.6;
  }

  50% {
    opacity: 1;
  }
}

/* CHAT MESSAGES */
.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.messages::-webkit-scrollbar {
  width: 6px;
}

.messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.messages::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.messages::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.message {
  display: flex;
  justify-content: flex-start;
  animation: slideIn 0.3s ease-out;
}

.message.me {
  justify-content: flex-end;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-content {
  max-width: 85%;
}

.message-text {
  padding: 0.8rem 1.2rem;
  border-radius: 14px;
  background: #f1f1f1;
  line-height: 1.45;
  font-size: 0.95rem;
  word-wrap: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.message-text:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.message.me .message-text {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.sender {
  font-weight: 700;
  margin-right: 0.5rem;
  opacity: 0.9;
}

.message-text a {
  color: inherit;
  text-decoration: underline;
  font-weight: 600;
}

.meta {
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.3rem;
  margin-left: 0.5rem;
}

.message.me .meta {
  color: rgba(255, 255, 255, 0.7);
  margin-left: auto;
  margin-right: 0.5rem;
}

.time {
  margin-right: 0.5rem;
}

.read-status {
  font-weight: 600;
}

/* CHAT INPUT */
.chat-input {
  display: flex;
  gap: 0.6rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 14px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.chat-input:focus-within {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.chat-input input[type="text"] {
  flex: 1;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  outline: none;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  font-family: inherit;
}

.chat-input input[type="text"]:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.chat-input input[type="text"]::placeholder {
  color: #999;
}

.file-input-label {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.8rem;
  border-radius: 8px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  color: #667eea;
  flex-shrink: 0;
}

.file-input-label:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: scale(1.1);
  border-color: rgba(102, 126, 234, 0.5);
}

.file-input-label:active {
  transform: scale(0.95);
}

.file-input {
  display: none;
}

.send-btn {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-weight: 700;
  font-size: 0.95rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.send-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.send-btn:active {
  transform: translateY(0);
}

/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
  .classroom {
    padding: 1rem;
    gap: 1rem;
  }

  .zoom-toolbar {
    gap: 0.8rem;
    padding: 0.8rem 1rem;
  }

  .zoom-toolbar button {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }

  .videos {
    gap: 0.8rem;
  }

  video {
    height: 200px;
  }
}

@media (max-width: 768px) {
  .classroom {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    padding: 1rem;
    gap: 1rem;
  }

  .classroom.minimize-video {
    flex-direction: row;
  }

  .left-pane {
    flex: 1;
    height: auto;
    min-height: 300px;
  }

  .left-pane.minimize-video {
    flex: 0.2;
    min-height: auto;
  }

  .right-pane {
    flex: 1;
    min-height: 400px;
    max-height: 600px;
  }

  .right-pane.minimized {
    display: flex;
  }

  .videos {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .videos.minimized {
    grid-template-columns: 1fr;
  }

  video {
    height: 180px;
  }

  .videos.minimized video {
    height: 100px;
  }

  .zoom-toolbar {
    position: relative;
    gap: 0.6rem;
    padding: 0.8rem 1rem;
    max-width: 100%;
    margin-top: auto;
  }

  .zoom-toolbar button {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }

  .zoom-toolbar button p {
    font-size: 0.65rem;
  }

  .chat-input {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .chat-input input[type="text"] {
    flex: 1 1 100%;
    min-width: 0;
  }

  .file-input-label,
  .send-btn {
    flex: 1;
  }

  .messages {
    gap: 0.6rem;
  }

  .message-content {
    max-width: 95%;
  }

  .message-text {
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
  }

  .header-section h2 {
    font-size: 1.4rem;
  }

  .chat-header h3 {
    font-size: 1.1rem;
  }

  .whiteboard-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .whiteboard-tools {
    width: 100%;
    overflow-x: auto;
  }
}

@media (max-width: 480px) {
  .classroom {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .header-section h2 {
    font-size: 1.2rem;
  }

  .minimize-btn {
    width: 35px;
    height: 35px;
    font-size: 1.1rem;
  }

  .left-pane {
    min-height: 250px;
  }

  .right-pane {
    min-height: 350px;
    padding: 0.8rem;
    border-radius: 16px;
  }

  video {
    height: 150px;
  }

  .videos.minimized video {
    height: 80px;
  }

  .zoom-toolbar {
    gap: 0.5rem;
    padding: 0.6rem 0.8rem;
    top: 0.75rem;
  }

  .zoom-toolbar button {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .zoom-toolbar button span {
    font-size: 1.2rem;
  }

  .zoom-toolbar button p {
    font-size: 0.6rem;
  }

  .chat-header {
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .chat-header h3 {
    font-size: 1rem;
  }

  .messages {
    margin-bottom: 0.25rem;
    gap: 0.5rem;
  }

  .message-text {
    padding: 0.6rem 0.9rem;
    font-size: 0.85rem;
    border-radius: 10px;
  }

  .meta {
    font-size: 0.7rem;
  }

  .chat-input {
    padding: 0.75rem;
    gap: 0.5rem;
    border-radius: 10px;
  }

  .chat-input input[type="text"] {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }

  .file-input-label {
    font-size: 1.1rem;
  }

  .send-btn {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  .whiteboard {
    min-height: 200px;
  }

  .whiteboard-tools button {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
}
</style>