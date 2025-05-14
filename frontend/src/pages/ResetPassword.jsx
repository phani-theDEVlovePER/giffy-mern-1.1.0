import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { useAuthStore } from '../store/app.Store'

const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { resetPassword, isLoading, error, message } = useAuthStore()

    const { token } = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }

        try {
            await resetPassword(token, password)
            toast.success("Password reset successfully🤩 Redirecting to Login page...")
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        } catch (error) {
            console.error("Error resetting password:", error)
            toast.error(error.message || "Error resetting password. Please try again.")
        }

    }

    return (
        <section className='min-h-[100vh] min-w-full formbg flex items-center justify-center'>

            {error && <p className='text-red-500'>{error}</p>}
            {message && <p className='text-green-500'>{message}</p>}

            <div className='flex flex-col items-center justify-center h-[55vh] min-w-[50vw] glassbg'>
                <h1 className='text-2xl font-bold mb-4'>Reset Password</h1>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <label className='text-lg'>New Password:</label>
                    <input
                        type="password"
                        className='h-8 w-[22rem] outline-none rounded-md border-white font-bold px-2'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New Password"
                    />
                    <br />
                    <label className='text-lg'>Confirm Password:</label>
                    <input
                        type="password"
                        className='h-8 w-[22rem] outline-none rounded-md border-white font-bold px-2'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                    />
                    <br />
                    <button className='border-2 rounded-md' type="submit">
                        {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Reset Password"}
                    </button>
                </form >
                <br />
                <p className='text-gray-400'>If you didn't receive the code, please check your spam folder.</p>
            </div>
        </section>
    )
}

export default ResetPassword