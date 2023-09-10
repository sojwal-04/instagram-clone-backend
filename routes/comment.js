import express from "express";
import { deleteComment, postComment } from "../controllers/Comment.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post("/", isLoggedIn, postComment);

router.delete("/", isLoggedIn, deleteComment);

export default router;
