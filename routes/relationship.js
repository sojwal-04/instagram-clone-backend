import express from "express";
import {
  getRelationship,
  follow,
  unfollow,
} from "../controllers/Relationship.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.get('/fetchRelationship', isLoggedIn, getRelationship);

router.post("/follow", isLoggedIn, follow);

router.delete("/unfollow", isLoggedIn, unfollow);

export default router;
