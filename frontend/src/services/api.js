import axios from "axios";

const API = axios.create({
  baseURL: "https://community-board-backend-bde1.onrender.com/api",
  withCredentials: true
});

export default API;
