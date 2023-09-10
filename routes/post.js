import express from "express";
import { createPost, deletePost, fetchPosts } from "../controllers/Post.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post("/post", createPost);

// router.get("/", isLoggedIn, fetchPosts);

// router.delete("/delete", isLoggedIn, deletePost);

export default router;
