import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;

const connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection established");
    })
    .catch((err) => {
      console.log("Error while connecting to DATABASE: ", err);
    });
};

export { connect };
