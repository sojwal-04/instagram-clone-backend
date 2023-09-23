import express from "express";
import { follow, unfollow } from "../controllers/Relationship";
import isLoggedIn from "../middlewares/isLoggedIn";

const router = express.Router();

router.post("/follow", isLoggedIn, follow);

router.delete("/unfollow", isLoggedIn, unfollow);

export default router;
