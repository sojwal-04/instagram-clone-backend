import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { likePost, unlikePost } from "../controllers/Like.js";

const router = express.Router();

router.post("/", isLoggedIn, likePost);

router.delete("/", isLoggedIn, unlikePost);

export default router;
