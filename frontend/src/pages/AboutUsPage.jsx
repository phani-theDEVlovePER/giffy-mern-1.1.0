import React from 'react'
import Navbar from '../components/Navbar'

const AboutUsPage = () => {
    return (
        <section className='pagebg min-h-full min-w-full flex flex-col gap-[1rem] sm:gap-[4rem]'>
            <Navbar />
            <br />
            <div className='flex flex-col items-center justify-center min-h-[60vh] xs:min-w-[50vw] min-w-[100vw] p-2 text-center'>
                <h1 className='text-2xl font-bold mb-4'>Our Vision</h1>
                <p className='text-lg font-medium'>We envision a world where technology is accessible to everyone.</p>
                <p className='text-lg font-medium'>We strive to make our products user-friendly and efficient.</p>
                <br />
                <br />
                <h1 className='text-2xl font-bold mb-4'>Our Values</h1>
                <p className='text-lg font-medium'>Integrity: We believe in being honest and transparent in our work.</p>
                <p className='text-lg font-medium'>Innovation: We are committed to continuous improvement and creativity.</p>
                <p className='text-lg font-medium'>Collaboration: We value teamwork and open communication.</p>
                <p className='text-lg font-medium'>Customer Focus: We prioritize our users' needs and feedback.</p>
                <p className='text-lg font-medium'>Excellence: We strive for the highest quality in everything we do.</p>
            </div>
        </section>
    )
}

export default AboutUsPage