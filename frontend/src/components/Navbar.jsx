import React, { useState } from 'react'
import { logo, menu } from '../assets'
import '../myStyles.css'
import { useAuthStore } from '../store/app.Store'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)

    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            {/* for mobile device */}
            {/* start */}
            <div className='sm:hidden h-[4rem] w-full z-20'>
                <div className='min-w-full h-[4rem] flex items-center justify-between pl-4 pr-4'>
                    <img src={logo} alt='LOGO' className='w-[4rem]' />
                    <div className='flex gap-2'>
                        <button
                            className={`w-[2.2rem] h-[2.2rem] rounded-full bg-blue-400 hover:bg-blue-600 flex items-center justify-center font-bold text-white text-lg cursor-pointer transition-transform duration-500 ${profileOpen ? 'rotate-[360deg]' : ''}`}
                            onClick={() => setProfileOpen(!profileOpen)}
                        >
                            {profileOpen ? 'X' : user.name.charAt(0).toUpperCase()}
                        </button>

                        <img src={menu} alt='menu' className='w-[2rem]'
                            onClick={() => setNav(!nav)}
                        />
                    </div>
                </div>

                {profileOpen && (
                    <div className='absolute right-4 top-[4.5rem] w-[12rem] bg-white shadow-lg rounded-md p-4'>
                        <p className='font-bold truncate'>{user.name}</p>
                        <p className='text-gray-600 break-words text-sm'>{user.email}</p>
                        <button
                            className='mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600'
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}

                <ul className={nav ? 'flex flex-col justify-center items-end gap-4 font-[500] p-5 myFonts sm:hidden overflow-hidden h-[10rem] ease-in-out duration-500 border-t-4 absolute right-0 min-w-full bg-gray-100 ' : 'h-0 ease-in-out duration-500 flex flex-col justify-center items-end overflow-hidden absolute right-0 min-w-full bg-gray-100 '}>
                    {/* <li className='bg-gray-100 hover:bg-gray-300 w-[8rem] rounded-md h-[3rem] pl-2'>Home</li>
                    <li className='bg-gray-100 hover:bg-gray-300 w-[8rem] rounded-md h-[3rem] pl-2'>About Us</li>
                    <li className='bg-gray-100 hover:bg-gray-300 w-[8rem] rounded-md h-[3rem] pl-2 mb-6'>Contact Us</li> */}

                    <NavLink
                        to="/"
                        className='bg-gray-100 hover:bg-gray-300 w-[8rem] rounded-md h-[3rem] pl-2'
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about-us"
                        className='bg-gray-100 hover:bg-gray-300 w-[8rem] rounded-md h-[3rem] pl-2'
                    >
                        About Us
                    </NavLink>
                    <NavLink
                        to="/contact-us"
                        className='bg-gray-100 hover:bg-gray-300 w-[8rem] rounded-md h-[3rem] pl-2'
                    >
                        Contact Us
                    </NavLink>
                </ul>
            </div>
            {/* end */}

            {/* for pc */}
            <div className='min-w-full h-[4rem]  hidden sm:flex items-center justify-between pl-4 pr-4 sticky top-0 z-10 bg-gray-50'>
                <img src={logo} alt='CHIRPN' className='w-[4rem] cursor-pointer' />
                <ul className='flex items-center gap-6 myFonts font-[600] h-full'>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'listItem cursor-not-allowed active' : 'listItem cursor-pointer'
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about-us"
                        className={({ isActive }) =>
                            isActive ? 'listItem cursor-not-allowed active' : 'listItem cursor-pointer'
                        }
                    >
                        About Us
                    </NavLink>
                    <NavLink
                        to="/contact-us"
                        className={({ isActive }) =>
                            isActive ? 'listItem cursor-not-allowed active' : 'listItem cursor-pointer'
                        }
                    >
                        Contact Us
                    </NavLink>
                </ul>
                <div className='relative'>
                    <button
                        className={`w-[2.5rem] h-[2.5rem] rounded-full bg-blue-400 hover:bg-blue-600 flex items-center justify-center font-bold text-white text-lg cursor-pointer transition-transform duration-500 ${profileOpen ? 'rotate-[360deg]' : ''}`}
                        onClick={() => setProfileOpen(!profileOpen)}
                    >
                        {profileOpen ? 'X' : user.name.charAt(0).toUpperCase()}
                    </button>
                    {profileOpen && (
                        <div className='absolute right-0 mt-2 w-[12rem] bg-white shadow-lg rounded-md p-4'>
                            <p className='font-bold truncate'>{user.name}</p>
                            <p className='text-gray-600 break-words'>{user.email}</p>
                            <button
                                className='mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600'
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* end */}
        </>
    )
}

export default Navbar