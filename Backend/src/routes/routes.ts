import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/auth.Middlewares";

const router = Router();
const authController = new AuthController();

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));

router.use(authMiddleware);
router.get("/profile", (req, res) => authController.getProfile(req, res));

export default router;
