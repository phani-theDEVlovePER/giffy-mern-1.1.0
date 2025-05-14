import { Loader } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/app.Store'

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef([])
    const navigate = useNavigate()

    const { verifyEmail, isLoading, error } = useAuthStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const verificationCode = code.join("")
        console.log("Verification Code:", verificationCode)
        try {
            await verifyEmail(verificationCode)
            navigate("/")
            toast.success("Email verified successfully!")
        } catch (error) {
            console.error("Error verifying email:", error)
            alert(error.response.data.message || "Error verifying email")
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen formbg'>
            <form className='flex flex-col items-center justify-center glassbg' onSubmit={handleSubmit}>
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
                <br/>
                <button className='h-8 w-[15rem] outline-dashed rounded-md border-white font-bold px-2' type='submit'>
                    {isLoading ? <Loader className='animate-spin mx-auto' /> : "Verify"}
                </button>
                {error && <p className='text-red-500 font-bold mt-2'>{error}</p>}
            </form>
        </div>
    )
}

export default EmailVerificationPage