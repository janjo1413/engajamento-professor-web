import axios from 'axios';

const api = axios.create({
  baseURL: 'https://engajamento-cw2b.onrender.com',
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
