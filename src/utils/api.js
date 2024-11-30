// src/utils/api.js to connect the ui and BE
import axios from "axios";

// Set the base URL for your backend
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update this if using a deployed backend
});

// Automatically attach the token (if exists) to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Assume token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example API calls
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const fetchCart = () => API.get("/cart");
export const addToCart = (data) => API.post("/cart", data);
export const checkout = () => API.post("/cart/checkout");

export default API;
