import React, { useState } from 'react'
import { Loader } from 'lucide-react'
import { useAuthStore } from '../store/app.Store'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmittd] = useState(false)
    const { isLoading, forgotPassword } = useAuthStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await forgotPassword(email)
        setIsSubmittd(true)
    }

    return (
        <section className='min-h-[100vh] min-w-full formbg flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center h-[55vh] min-w-[50vw] glassbg'>
                <h1 className='text-2xl font-bold mb-4 text-gray-300'>Forgot Password</h1>
                {!isSubmitted ? (
                    <form className='flex flex-col items-center justify-center gap-1' onSubmit={handleSubmit}>
                        <p className='pl-2 text-green-500'>Enter your email to receive password reset link.</p>
                        <label className='text-lg text-gray-300'>Email:</label>
                        <input
                            type="email"
                            className='h-8 w-[22rem] outline-none rounded-md border-white font-bold px-2'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <br />
                        <button className='h-8 w-[22rem] border-2 rounded-md text-gray-300' type="submit">
                            {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
                        </button>
                    </form >

                ) : (
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-green-500'>Password reset link sent to your email.</p>
                        <p className='text-gray-500'>If you didn't receive the code, please check your spam folder.</p>
                        <p className='text-gray-500'>Check your inbox and follow the instructions.</p>
                    </div>
                )}
            </div >
        </section>
    )
}

export default ForgotPassword