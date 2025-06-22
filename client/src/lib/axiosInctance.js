import axios from 'axios';

export const axiosInstance = axios.create({

    //for production 
    //baseURL: 'http://localhost:3008/auth',

    //for all and global
    baseURL: 'https://portfolio-rkp.onrender.com/auth',
    withCredentials: false
})

/*

-> for development code
const baseURL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3008/auth'
    : 'https://portfolio-rkp.onrender.com/auth';

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: false,
});


*/
