// src/api.js

import axios from "axios";
import { jwtDecode } from "jwt-decode";

export function getJwtPayload(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return {};
  }
}


export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const { exp } = getJwtPayload(token);
  const now = Date.now() / 1000;
  return exp && exp > now;
};

// Create shared Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

// Attach token to headers
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

// Handle 401 Unauthorized globally
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;