import express from "express"
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, VerifyEmail } from "../controllers/auth.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
import { heart } from "../controllers/gemini.controller.js"
    
const router = express.Router()

router.get("/auth/check-auth", verifyToken, checkAuth)

router.post("/auth/signup", signup)
router.post("/auth/login", login)
router.post("/auth/logout", logout)

router.post("/auth/verify-email", VerifyEmail)
router.post("/auth/forgot-password", forgotPassword)
router.post("/auth/reset-password/:token", resetPassword)

router.post("/heart", heart)

export default router