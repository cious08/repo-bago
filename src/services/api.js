import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mental-health-api-2-2tt3.onrender.com'
});

export default api;