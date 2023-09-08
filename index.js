import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import { connect } from "./config/connect.js";

dotenv.config();
connect();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/api/v1/", auth);

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
