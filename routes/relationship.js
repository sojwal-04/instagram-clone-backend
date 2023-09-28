import express from "express";
import {
  getRelationship,
  follow,
  unfollow,
} from "../controllers/Relationship.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

// router.get('/fetchRelationship', isLoggedIn, getRelationship);
router.get("/fetchRelationship", getRelationship);

// router.post("/follow", isLoggedIn, follow);
router.post("/follow", follow);

// router.delete("/unfollow", isLoggedIn, unfollow);
router.delete("/unfollow", unfollow);

export default router;
