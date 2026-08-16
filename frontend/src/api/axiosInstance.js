import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3200/api", // backend API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;