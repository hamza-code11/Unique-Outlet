import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // ya jahan bhi aap token store karte hain
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired ya invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;