import { defineStore } from 'pinia';
import api from '../services/api';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        sessionId: localStorage.getItem('sessionId') || null,
    }),
    actions: {
        async login(credentials) {
            // Use the shared api instance (has baseURL '/api' configured)
            const res = await api.post('/auth/login', credentials);
            this.token = res.data.token;
            this.user = res.data.user;
            this.sessionId = res.data.sessionId;
            localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('sessionId', this.sessionId);
            api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            return res.data;
        },
        logout() {
            this.token = null;
            this.user = null;
            this.sessionId = null;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('sessionId');

            delete api.defaults.headers.common['Authorization'];
            delete axios.defaults.headers.common['Authorization'];
        },
        getMe() {
            if (!this.token) return;

            // Restore header after page refresh
            api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            api.get('/auth/me')
                .then(res => {
                    this.user = res.data.user;
                    localStorage.setItem('user', JSON.stringify(this.user));
                })
                .catch(() => {
                    this.logout();
                });
        },
        hasRole(roles) {
            if (!this.user) return false;
            return roles.includes(this.user.role);
        },
        hasPermission(permissions) {
            if (!this.user) return false;
            return permissions.every(p => this.user.permissions?.includes(p));
        }
    }
});
