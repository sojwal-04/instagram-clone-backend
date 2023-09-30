import express from 'express';
import { profileDetails } from '../controllers/Profile.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const router = express.Router();

router.get("/:username", isLoggedIn, profileDetails);

export default router;