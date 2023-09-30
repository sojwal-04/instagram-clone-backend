import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { fetchLike, likePost, unlikePost } from "../controllers/Like.js";

const router = express.Router();

router.get("/getLike", isLoggedIn, fetchLike);

router.post("/like", isLoggedIn, likePost);

router.delete("/unlike", isLoggedIn, unlikePost);

export default router;
