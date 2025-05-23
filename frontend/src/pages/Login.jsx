import { Loader } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/app.Store'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error, user } = useAuthStore()
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)

    // Redirect to verify-email if the user is not verified
    if (user && !user.isVerified) {
      navigate('/verify-email')
    } else {
      navigate('/') // Redirect to the home page or dashboard
    }
  }
  return (
    <section className='min-h-[100vh] min-w-full formbg flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center h-[60vh] xs:min-w-[50vw] min-w-[100vw] glassbg p-2'>
        <h1 className='text-2xl font-bold mb-4 text-gray-300'>Login</h1>

        <form className='flex flex-col gap-1 items-center justify-center' onSubmit={handleSubmit}>
          <label className='text-lg font-semibold text-gray-300'>email:</label>
          <input
            type="email"
            className='h-8 w-[15rem] outline-none rounded-md border-white font-bold px-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <br />

          <label className='text-lg font-semibold text-gray-300'>Password:</label>
          <input
            type="password"
            className='h-8 w-[15rem] outline-none rounded-md border-white font-bold px-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br />

          <button className='h-8 w-[15rem] outline-dashed rounded-md border-white text-gray-300 font-bold px-2' type="submit">
            {isLoading ? <Loader className='animate-spin mx-auto' /> : "Login"}
          </button>

          <Link to="/forgot-password" className='text-blue-500'>Forgot Password?</Link>
          {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}
        </form>
        <br />
        <div className='flex flex-col items-center justify-center'>
          <p className='text-gray-300'>Don't have an account?</p>
          <Link to="/signup" className='text-blue-500'>Signup</Link>
        </div>
      </div>
    </section>
  )
}

export default Login