import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;

const connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds (or adjust as needed)
    })
    .then(() => {
      console.log("Connection established");
    })
    .catch((err) => {
      console.log("Error while connecting to DATABASE: ", err);
    });
};

export { connect };
