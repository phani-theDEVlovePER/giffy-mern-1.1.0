import bcryptjs from 'bcryptjs';
import crypto from "crypto";


import { User } from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import {
    sendPasswordResetEmail,
    sendResetPasswordSuccessEmail,
    sendVerificationEmail,
    sendWelcomeEmail
} from '../SMTPs/sendMail.js';

export const signup = async (req, res) => {
    // res.send("signup")
    const { email, password, name } = req.body
    // console.log("from signup controllr", req.body)

    try {
        if (!email, !password, !name) {
            throw new Error("All fields are required")
        }
        const userAlreadyExists = await User.findOne({ email })
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "user already exists" })
        }

        // to hash the password
        const hashedPassword = await bcryptjs.hash(password, 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
        console.log("from authController: ", verificationToken)
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000    //24 hours
        })

        await user.save()

        //jwt
        generateTokenAndSetCookie(res, user._id)

        // sending verification email
        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success: true,
            message: "user created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export const VerifyEmail = async (req, res) => {
    const { code } = req.body
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "invalid verification token" })
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined

        await user.save()
        await sendWelcomeEmail(user.email, user.name)

        res.status(200).json({
            success: true,
            message: "email verified successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }
        const isValidPassword = await bcryptjs.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }
        generateTokenAndSetCookie(res, user._id)
        user.lastLogin = new Date()
        await user.save()
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ success: true, message: "Logged out successfully" })
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        // send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset link sent to your email" });
    } catch (error) {
        console.log("Error in forgotPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" })
        }

        // update password
        const hashedPassword = await bcryptjs.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined
        await user.save()

        // sending Reset Password Success Email
        await sendResetPasswordSuccessEmail(user.email)
        res.status(200).json({ success: true, message: "Password reset successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        console.log("userid", req.userId)
        console.log("user: ", user)
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log("error in checkAuth: ", error)
        res.status(400).json({ success: false, message: error.message })
    }
}