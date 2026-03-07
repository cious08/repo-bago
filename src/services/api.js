import axios from 'axios';

const api = axios.create({
    // Replace this with YOUR actual Render URL
    baseURL: 'https://mental-health-backend-ox4q.onrender.com' 
});

export default api;