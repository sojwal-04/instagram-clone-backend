import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser"
import { connect } from "./config/connect.js";

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
// app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
