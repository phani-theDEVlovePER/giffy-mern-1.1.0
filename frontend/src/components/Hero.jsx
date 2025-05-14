import React from 'react'
import { gifts } from '../assets'

const Hero = () => {

    const buttonClick = () => {
        alert("please submit the details down below.")
    }
    return (
        <section className='h-full min-w-full sm:flex'>

            {/* h1 h3 btn */}
            <div className='min-w-full sm:min-w-[40%] p-9 flex justify-center gap-[0.5rem] sm:gap-4 flex-col'>
                <h1 className='text-3xl md:text-4xl  lg:text-6xl font-poppins font-[800] text-gray-800 sm:leading-relaxed md:leading-relaxed lg:leading-[4.5rem]'>Finding a gift for someone you care.</h1>
                <h3 className='text-base md:text-lg lg:text-xl text-gray-500 font-[600] font-[Poppins]'>Make your family and friends feel special.</h3>
                <button
                    onClick={buttonClick}
                    className='w-[8rem] h-[2.5rem] lg:text-lg rounded-md bg-red-200 cursor-default sm:cursor-pointer'>
                    Explore now
                </button>
            </div>

            {/* img */}
            <div className='md:min-w-[60%] min-w-full sm:min-w-[60%] flex justify-center items-center rounded-lg p-4 sm:pr-8'>
                <img src={gifts} alt='gifts'
                    className='w-[80rem] rounded-2xl'
                />
            </div>
        </section>
    )
}

export default Hero