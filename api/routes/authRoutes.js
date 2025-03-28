import express from "express";
import { signin, signup, googleLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", googleLogin);

export default router;
