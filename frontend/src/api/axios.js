import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Gracefully redirect to login with query param so login page could show toast
      window.location.href = '/login?expired=true';
    }
    return Promise.reject(error);
  }
);

export default api;
