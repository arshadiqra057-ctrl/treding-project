import axios from 'axios';

// Prefer environment-based configuration, fall back to local dev API
const baseURL =
    process.env.REACT_APP_API_BASE_URL ||
    'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
