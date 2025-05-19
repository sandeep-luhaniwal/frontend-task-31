import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-task-31.onrender.com',
});

export default API;
