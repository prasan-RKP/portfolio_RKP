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


// checkout in morning 

// new code 
"scripts": {
  "build": "npm install --legacy-peer-deps && npm install --prefix client --legacy-peer-deps && npm run build --prefix client",
  "start": "node server/index.js",
  "dev": "concurrently \"npm run server\" \"npm run client\"",
  "server": "nodemon server/index.js",
  "client": "npm run dev --prefix client"
}

// old code 
"build":  "npm install --legacy-peer-deps && npm install --prefix client --legacy-peer-deps && npm run build --prefix client",
    "start": "node server/index.js",
    "dev": "nodemon server/index.js"

*/
