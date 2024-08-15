import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();
const { signup, login, logout } = authController;

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
