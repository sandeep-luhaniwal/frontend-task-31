import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-task-31.onrender.com/api/auth", // Or your deployed backend
});

export default API;
