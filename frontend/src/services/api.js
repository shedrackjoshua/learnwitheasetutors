import axios from 'axios';

const api = axios.create({
  // Use VITE_API_BASE_URL when provided by environment; fall back to '/api' so dev proxy works
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

// Attach token to every request
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Classroom endpoints
export async function getTurnCredentials() {
  const res = await api.get("/classroom/turn-credentials");
  return res.data;
}

export async function joinClassroom(classroomId, userId) {
  const res = await api.post("/classroom/join", { classroomId, userId });
  return res.data;
}

export async function leaveClassroom(classroomId, userId) {
  const res = await api.post("/classroom/leave", { classroomId, userId });
  return res.data;
}

export default api;