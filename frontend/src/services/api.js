import axios from "axios";

const API = axios.create({
  baseURL: "https://community-board-backend-bde1.onrender.com/api",
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // get token from localStorage
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
