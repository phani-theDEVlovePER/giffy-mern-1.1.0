import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE
} from "./emailTemplates.js"
import { transporter } from "./sendMail.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const response = await transporter.sendMail({
            from: '"Giffy Tech" <ramcharan.education.4u@gmail.com>',
            to: email,
            subject: "verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
    } catch (error) {
        throw new Error(`Error sending Verification email: $(error)`)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    try {
        const company_name = "Giffy Tech";
        const response = await transporter.sendMail({
            from: '"Giffy Tech" <ramcharan.education.4u@gmail.com>',
            to: email,
            subject: `Welcome to ${company_name}!`,
            html: WELCOME_EMAIL_TEMPLATE
                .replace("{user_name}", name)
                .replace("{companyName}", company_name)
        })
    } catch (error) {
        throw new Error(`Error sending welcome email: ${error}`)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const response = await transporter.sendMail({
            from: '"Giffy Tech" <ramcharan.education.4u@gmail.com>',
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
        })
    } catch (error) {
        throw new Error(`Error sending password reset email: ${error}`)
    }
}


export const sendResetPasswordSuccessEmail = async (email) => {
    try {
        const response = await transporter.sendMail({
            from: '"Giffy Tech" <ramcharan.education.4u@gmail.com>',
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE
        })
        console.log("Password reset email sent successfully", response)
    } catch (error) {
        console.log("Error sending password reset success email", error)
        throw new Error(`error sending password reset success email: ${error} `)
    }
}