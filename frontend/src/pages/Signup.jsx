import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/app.Store';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate()

  const { signup, error, isLoading } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, name)
      navigate("/verify-email")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <section className='min-h-[100vh] formbg flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center h-[75vh] min-w-[50vw] glassbg'>
        <h1 className='text-2xl font-bold text-gray-300 mb-4'>Signup</h1>

        <form className='flex flex-col gap-1 items-center justify-center' onSubmit={handleSubmit}>
          <label className='text-lg font-semibold text-gray-300'>Email:</label>
          <input
            type="email"
            className='h-8 w-[22rem] outline-none rounded-md border-white font-bold px-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <br />

          <label className='text-lg font-semibold text-gray-300'>Password:</label>
          <input
            type="password"
            className='h-8 w-[22rem] outline-none rounded-md border-white font-bold px-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br />

          <label className='text-lg font-semibold text-gray-300'>Name:</label>
          <input
            type="text"
            className='h-8 w-[22rem] outline-none rounded-md border-white font-bold px-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <br />

          <button className='h-8 w-[22rem] outline-dashed rounded-md border-white font-bold px-2 text-gray-300' type="submit">
            {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "signup"}
          </button>
          <br />
          <p className='text-gray-300 text-sm'>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
          {error && <p className='text-red-500 font-bold mt-2'>{error}</p>}
        </form>

        <div className='flex flex-col items-center justify-center'>
          <p className='text-gray-300'>Already have an account?</p>
          <Link to="/login" className='text-blue-500'>Login</Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;