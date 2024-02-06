import axios from 'axios';

export const baseUrl = 'http://localhost:3000/api/v1';

export const httpClient = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
});