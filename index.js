import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./config/connect.js";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import likeRoutes from "./routes/like.js";
import commentRoutes from "./routes/comment.js";
import relationshipRoutes from "./routes/relationship.js";
import profileRoutes from "./routes/profile.js";

import path from 'path';

dotenv.config();
connect();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend's origin
  credentials: true, // Allow sending cookies and authentication headers
};

// Allow requests from a specific origin
app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/likes", likeRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/relationships", relationshipRoutes);
app.use("/api/v1/profile", profileRoutes);

app.use(express.static(path.join(process.cwd(), 'public')));

// Catch-all route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
