import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

import authRoutes from '../server/src/routes/authRoute.js'; // ✅ adjust if needed

const PORT = process.env.PORT || 3008;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

// Deploy logic
const _dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routes are from here...
console.log("Mounting /auth routes");
app.use('/auth', authRoutes);
console.log("Mounted /auth routes");

// Serve static files
app.use(express.static(path.join(_dirname, "/client/dist")));

// Catch-all route for SPA (React)
app.get(/^\/(?!auth).*/, (req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

// ✅ CONNECT TO MONGODB ATLAS (not local)
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`);

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ Failed to connect with DB:", err);
  process.exit(1);
});
