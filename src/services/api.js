import axios from 'axios';

const api = axios.create({
    // Replace this with YOUR actual Render URL
    baseURL: 'https://mental-health-api-2-2tt3.onrender.com/api' 
});

export default api;