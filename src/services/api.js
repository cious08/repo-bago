import axios from 'axios';

const api = axios.create({
    // CHANGE THIS:
    baseURL: 'http://localhost:10000' 
});

export default api;