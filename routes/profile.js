import express from 'express';
import { profileDetails } from '../controllers/Profile.js';

const router = express.Router();

router.get("/:username", profileDetails);

export default router;