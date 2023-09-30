import express from "express";
import { deleteComment, postComment } from "../controllers/Comment.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post("/postComment", isLoggedIn, postComment);

router.delete("/deleteComment", isLoggedIn, deleteComment);

export default router;
