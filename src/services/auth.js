import api from './api';

export const signup = async (payload) => {
    try {
        const response = await api.post('/auth/signup', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const login = async (payload) => {
    const response = await api.post('/auth/login', payload);
    return response.data;
};

export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
}

export const logout = async () => {
    localStorage.removeItem('token');
}
