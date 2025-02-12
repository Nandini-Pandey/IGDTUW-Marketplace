import axios from 'axios';
 
const API = axios.create({ baseURL: 'http://localhost:3000' });

export const signup = (userData) => API.post('/signup', userData);
export const login = (userData) => API.post('/login', userData);
