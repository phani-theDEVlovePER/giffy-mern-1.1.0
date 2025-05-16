import { Loader } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/app.Store'

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef([])
    const navigate = useNavigate()

    const { verifyEmail, resendVerificationEmail, user, isLoading, error } = useAuthStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const verificationCode = code.join("")
        try {
            await verifyEmail(verificationCode)
            navigate("/")
            toast.success("Email verified successfully!")
        } catch (error) {
            console.error("Error verifying email:", error)
            alert(error.response.data.message || "Error verifying email")
        }
    }

    const handleResendOTP = async () => {
        try {
            await resendVerificationEmail(user.email)
            toast.success("Verification code resent successfully!")
        } catch (error) {
            console.error("Error resending OTP:", error)
            toast.error(error.response?.data?.message || "Error resending OTP")
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen formbg'>
            <form className='flex flex-col items-center justify-center glassbg p-4' onSubmit={handleSubmit}>
                <h1 className='text-2xl font-bold mb-4'>Email Verification</h1>
                <p className='text-lg mb-4 text-gray-400'>Please enter the verification code sent to your email.</p>
                <p className='text-lg mb-4 text-gray-400'>If you didn't receive the code, please check your spam folder.</p>
                <div className='flex space-x-2'>
                    {code.map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={code[index]}
                            onChange={(e) => {
                                const newCode = [...code]
                                newCode[index] = e.target.value
                                setCode(newCode)
                                if (e.target.value && index < 5) {
                                    inputRefs.current[index + 1].focus()
                                }
                            }}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className='border-2 w-10 h-10 text-center text-xl'
                        />
                    ))}
                </div>
                <br />
                <button className='h-8 w-[15rem] outline-dashed rounded-md border-white font-bold px-2 bg-blue-500 text-white' type='submit'>
                    {isLoading ? <Loader className='animate-spin mx-auto' /> : "Verify"}
                </button>
                {error && <p className='text-red-500 font-bold mt-2'>{error}</p>}
                <br />
                <button
                    type="button"
                    onClick={handleResendOTP}
                    className='h-8 w-[15rem] outline-dashed rounded-md border-white font-bold px-2 bg-gray-300'
                >
                    Resend OTP
                </button>
            </form>
        </div>
    )
}

export default EmailVerificationPage