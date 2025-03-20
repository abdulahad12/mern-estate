import express from "express";
import { test } from "../controllers/userController.js";

const router = express.Router();

router.get("/sample", test);

export default router;
