import axios from 'axios';
import store from '@/store/index';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});


instance.interceptors.request.use(
  config => {
    const token = store.state.token;
    if (token && !config.url.includes('/api/token/refresh')) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    console.log(error);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch('refreshToken');
        const newToken = store.state.token;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
