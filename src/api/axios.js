import axios from "axios";

const configuredBaseURL = import.meta.env.VITE_API_URL;
const localDevBaseURL = `${window.location.protocol}//${window.location.hostname === "127.0.0.1" ? "localhost" : window.location.hostname}:5000/api`;

const API = axios.create({
  baseURL: import.meta.env.DEV ? localDevBaseURL : configuredBaseURL,
  timeout: 15000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
