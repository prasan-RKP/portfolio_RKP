import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

import authRoutes from '../server/src/routes/authRoute.js'
//import authRoutes from './src/routes/authRoute.js';


const PORT = process.env.PORT || 3008;
const app = express();

// deploy logic
const _dirname = path.resolve()


app.use(express.json({limit: "10mb"}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


// Routes are from here....
console.log("Mounting /auth routes");
app.use('/auth', authRoutes);
console.log("Mounted /auth routes");

// deploy logic
// Serve static files
app.use(express.static(path.join(_dirname, "/client/dist")));

// Catch-all route for SPA (React)
app.get(/^\/(?!auth).*/, (req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});


mongoose.connect("mongodb://127.0.0.1:27017/3D-portfolio")
.then(()=> {
    console.log(`successfully connected to ${mongoose.connection.name}✅`);

    app.listen(PORT, ()=>{
         console.log(`Server is runing`)
    });
})

.catch((err)=>{
    console.log("Failed to connect with DB:", err);
    process.exit(1);
})



