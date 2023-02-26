import axios, { Axios } from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const publicAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 6000,
});

const privateAxios = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    timeout: 6000,
});


export { publicAxios, privateAxios }