import express from "express";
import { registerController } from "../controller/auth/registerController.js";
import { loginContoller } from "../controller/auth/loginController.js";
import { logoutController } from "../controller/auth/logoutController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { refreshController } from "../controller/auth/refresh.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginContoller);
router.post("/logout", logoutController);
router.post("/refresh", authMiddleware, refreshController);

export default router;
