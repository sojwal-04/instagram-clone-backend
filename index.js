import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./config/connect.js";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import likeRoutes from "./routes/like.js";
import commentRoutes from "./routes/comment.js";

dotenv.config();
connect();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

// //middlewares
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/like", likeRoutes);
app.use("/api/v1/comments", commentRoutes);

app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
