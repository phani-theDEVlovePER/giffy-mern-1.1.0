import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/app.Store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';

const ContactUsPage = () => {
    const [message, setMessage] = useState('');
    const { userMessageController, isLoading, user, error } = useAuthStore();
    const navigate = useNavigate()

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user) {
            await userMessageController(user.email, user.name, message);
            toast.success("Mail sent successfully!")
        } else {
            navigate('/login')
        }

        setMessage(''); // Reset the text box
    };

    return (
        <section className='pagebg h-full min-w-full flex flex-col gap-[1rem] sm:gap-[4rem]'>
            <Navbar />
            <div className='flex flex-col items-center justify-center h-auto xs:min-w-[50vw] min-w-[100vw] p-8'>
                <h1 className='text-2xl font-bold mb-4'>Contact Us</h1>
                <p className='text-lg font-medium mb-4'>We would love to hear from you! Please leave your message below:</p>
                <form
                    className='flex flex-col gap-4 w-full max-w-[400px]'
                    onSubmit={handleSubmit}
                >
                    <textarea
                        name='message'
                        placeholder='Your Message'
                        value={message}
                        onChange={handleChange}
                        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                        rows='5'
                        cols='40'
                        style={{ resize: 'none' }}
                        required
                    ></textarea>
                    <button
                        type='submit'
                        className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'
                    >
                        {isLoading ? <Loader className='animate-spin mx-auto' /> : "Submit"}
                    </button>
                    {error && <p className='text-red-500 font-bold mt-2'>{error}</p>}

                </form>
            </div>
        </section>
    );
};

export default ContactUsPage;