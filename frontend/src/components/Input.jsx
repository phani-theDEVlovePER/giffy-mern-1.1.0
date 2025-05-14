import React from 'react'
import Fields from './Fields'
import MyCarousel from './MyCarousel'

const Input = () => {
    return (
        <section className='min-w-full h-full flex flex-col sm:flex-row relative '>
            {/* crousel */}
            <div className='sm:w-[50%] w-full h-[100%] flex items-center justify-center'>
            {/* the data to carousel or the image slider are mapped from the Array in index.js (in constants folder) */}
                <MyCarousel />
            </div>

            {/* vertical division */}
            <div className='hidden w-1 h-[100%] bg-gray-300 absolute left-1/2 rounded-md top-0'></div>

            {/* input form */}
            <div className='sm:w-[50%] h-full w-full py-4'>
                <Fields />
            </div>
        </section>
    )
}

export default Input