import React, { useEffect, useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'
import { MyCarouselData } from '../constants'

// the data to carousel or the image slider are mapped from the Array in index.js (in constants folder)

const MyCarousel = () => {

    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? MyCarouselData.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
    const nextSlide = () => {
        const isLastSlide = currentIndex === MyCarouselData.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }
    useEffect(() => {
        const intervalId = setInterval(nextSlide, 5000);

        return () => clearInterval(intervalId);
    }, [currentIndex]);

    return (
        <div className='min-w-full m-auto py-16 px-4 flex flex-col items-center justify-center relative group'>
            <div style={{ backgroundImage: `url(${MyCarouselData[currentIndex].image})` }} className='min-w-[100%] rounded-2xl bg-center bg-cover duration-500 aspect-[4/3]'></div>

            {/* left arrow */}
            <div className='opacity-50 group-hover:opacity-100 absolute top-[50%] -translate-x-0 translate-y-[-88%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white sm:cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} className='w-[1rem] h-[1rem]' />
            </div>

            {/* right arrow */}
            <div className='opacity-50 group-hover:opacity-100 absolute top-[50%] -translate-x-0 translate-y-[-88%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white sm:cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} className='w-[1rem] h-[1rem]' />
            </div>

            {/* dots */}
            <div className='flex items-center top-4 justify-center py-2'>
                {
                    MyCarouselData.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className={`text-2xl text-gray-400 sm:cursor-pointer duration-300 ${slideIndex === currentIndex && 'text-gray-800'}`}
                        >
                            <RxDotFilled />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyCarousel