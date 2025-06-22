// import axios from 'axios';

// export const axiosInstance = axios.create({

//     //for production 
//     baseURL: 'http://localhost:3008/auth',

//     //for all and global
//     //baseURL: 'https://portfolio-rkp.onrender.com/auth',
//     withCredentials: false
// })


import axios from 'axios';

// Dynamically choose the baseURL depending on environment
const baseURL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3008/auth'
    : 'https://portfolio-rkp.onrender.com/auth';

    console.log("Current Mode:", import.meta.env.MODE);
console.log("Base URL:", baseURL);

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: false, // Set to true if you're using cookies
});
