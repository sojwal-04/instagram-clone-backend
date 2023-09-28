import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { likePost, unlikePost } from "../controllers/Like.js";

const router = express.Router();

// router.post("/like", isLoggedIn, likePost);
router.post("/like",  likePost);

// router.delete("/unlike", isLoggedIn, unlikePost);
router.delete("/unlike", unlikePost);

export default router;
