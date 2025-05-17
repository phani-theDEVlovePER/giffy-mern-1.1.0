import express from "express"

import {
    checkAuth,
    forgotPassword,
    getAllUsers,
    login,
    logout,
    resendVerificationEmail,
    resetPassword,
    signup,
    updateUserVerification,
    userMessageController,
    VerifyEmail
} from "../controllers/auth.controller.js"

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

router.post("/auth/resend-verification-email", resendVerificationEmail);
router.get("/auth/users", getAllUsers);
// Route to update isVerified state
router.put("/auth/users/update-verification", updateUserVerification);

router.post("/auth/users/contact-us", userMessageController);

router.post("/heart", heart)

export default router