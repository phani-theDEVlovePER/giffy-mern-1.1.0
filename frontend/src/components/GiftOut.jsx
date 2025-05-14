import React from 'react'
import { gifts } from '../constants'

// here the recommended gifts are mapped through the output (Array) from the AI
const GiftOut = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null
  console.log(data)
  return (
    <>
      {
        data.map((gift, index) => (
          <div
            key={index}
            className='giftOutputBG h-[30rem] w-[25rem] flex flex-col justify-center rounded-xl gap-3 tracking-wide px-8 py-2 text-gray-900'
          >
            <h1 className='font-Lora text-3xl mb-2'>{gift.product_name}</h1>

            <div className='flex gap-2 items-start'>
              <span className='text-blue-950'>Price:</span>
              <h2 className='font-Lora text-lg'> {gift.price}</h2>
            </div>

            <div className='flex gap-2 items-start'>
              <span className='text-blue-950'>Brand:</span>
              <h2 className='font-Lora text-lg'> {gift.brand}</h2>
            </div>

            <div className='flex gap-2 items-start'>
              <span className='text-blue-950'>Description:</span>
              <h2 className='font-Lora text-base'> {gift.description}</h2>
            </div>


            {/* <div className='flex flex-col items-center justify-center m-2 gap-4'>
              <div className='flex gap-2 items-start'>
                <span className='text-blue-950'>Description:</span>
                <h2 className='font-Lora text-sm'> {gift.description}</h2>
              </div>
              <button className='h-[2rem] w-[8rem] bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md flex items-center justify-center font-[600] text-gray-900 cursor-not-allowed'>Buy Now</button>
            </div> */}
          </div>
        ))
      }
    </>
  )
}

export default GiftOut