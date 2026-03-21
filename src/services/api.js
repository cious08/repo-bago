import axios from 'axios';

const api = axios.create({
    // FIXED: Changed from 10000 to 3000
    baseURL: 'http://localhost:3000' 
});

export default api;