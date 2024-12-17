import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '36fdaebac0d35030cc4401e678abaa57';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export default api;
