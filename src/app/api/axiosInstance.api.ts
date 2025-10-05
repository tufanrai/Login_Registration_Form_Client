import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://server-hgse.onrender.com/api"
});