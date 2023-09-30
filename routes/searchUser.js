import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn";
import { searchUser } from "../controllers/searchUser";

const router = express.Router();

router.get("/searchUser", isLoggedIn, searchUser);

export default router;
