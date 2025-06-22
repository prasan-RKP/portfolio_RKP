import axios from 'axios';

export const axiosInstance = axios.create({

    //for production 
    //baseURL: 'http://localhost:3008/auth',

    //for all and global
    baseURL: 'https://portfolio-rkp.onrender.com',
    withCredentials: false
})