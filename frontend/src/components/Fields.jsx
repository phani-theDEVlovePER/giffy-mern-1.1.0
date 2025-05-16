import React, { useContext, useEffect, useState } from 'react'
import { Loader } from 'lucide-react';

import { ModalContext } from './InputOuputBundler'
import { useAiStore } from '../store/app.Store';
// import { useAiStore } from '../store/aiStore'

const Fields = () => {

  // data from input will be passes to AI as an Array of objects with desired values.
  const { openModel, setOpenModel } = useContext(ModalContext)

  const [inputarr, setInputarr] = useState([])
  const [inputdata, setInputdata] = useState({
    relationship: "",
    age: "",
    occasion: "",
    interests: "",
    budget: ""
  })

  const { heart, data, isLoading } = useAiStore()

  const changeHandle = (e) => {
    setInputdata({
      ...inputdata,
      [e.target.name]: e.target.value
    })
  }


  let { relationship, age, occasion, interests, budget } = inputdata;

  function btnclickhandle() {
    setInputarr([...inputarr, { relationship, age, occasion, interests, budget }])
  }

  const MyPromptGenerator = (data) => {
    const lastIndex = data.length - 1
    const MyPrompt = `Can you suggest 6 thoughtful, creative, and relevant gift ideas for my ${data[lastIndex].age}-year-old ${data[lastIndex].relationship} who loves ${data[lastIndex].interests}? The gift should be suitable for ${data[lastIndex].occasion} and fit within a budget of ₹${data[lastIndex].budget}. Please provide the description in 30 words, and also provide the gift ideas in the following format: [ { id: 1, product_name: , price: , brand: , description:  },]`
    return MyPrompt
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add current inputdata to inputarr before calling heart
    const updatedInputArr = [...inputarr, { relationship, age, occasion, interests, budget }];
    setInputarr(updatedInputArr);
    try {
      await heart(MyPromptGenerator(updatedInputArr))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      setOpenModel(true)
    }
  }, [data, setOpenModel])

  return (
    <div className='min-w-full flex flex-col items-center justify-center gap-8 h-full'>
      <h1 className='font-[600] text-3xl text-gray-600 pointer-events-none tracking-wider'>Gift Details</h1>

      <form onSubmit={handleSubmit}
        className='w-full flex flex-col items-center justify-center gap-5 sm:gap-4 lg:gap-8 h-full'
      >

        {/* Relationship */}
        <div className='inputBox w-[75%] relative'>
          <input type='text' autoComplete='off' name='relationship' value={inputdata.relationship} onChange={changeHandle} required="required"
            className='w-full p-2 border-gray-400 border-2 rounded-md outline-none text-lg duration-500'
          />
          <span className='absolute left-0 p-3 pointer-events-none text-sm uppercase duration-500 font-[500] text-gray-500'>Relation</span>
        </div>

        {/* age */}
        <div className='inputBox w-[75%] relative'>
          <input type='number' autoComplete='off' name='age' value={inputdata.age} onChange={changeHandle} required="required"
            className='w-full p-2 border-gray-400 border-2 rounded-md outline-none text-lg duration-500'
          />
          <span className='absolute left-0 p-3 pointer-events-none text-sm uppercase duration-500 font-[500] text-gray-500'>Age</span>
        </div>

        {/* Occasion */}
        <div className='inputBox w-[75%] relative'>
          <input type='text' autoComplete='off' name='occasion' value={inputdata.occasion} onChange={changeHandle} required="required"
            className='w-full p-2 border-gray-400 border-2 rounded-md outline-none text-lg duration-500'
          />
          <span className='absolute left-0 p-3 pointer-events-none text-sm uppercase duration-500 font-[500] text-gray-500'>Occasion</span>
        </div>

        {/* interests */}
        <div className='inputBox w-[75%] relative'>
          <input type='text' autoComplete='off' name='interests' value={inputdata.interests} onChange={changeHandle} required="required"
            className='w-full p-2 border-gray-400 border-2 rounded-md outline-none text-lg duration-500'
          />
          <span className='absolute left-0 p-3 pointer-events-none text-sm uppercase duration-500 font-[500] text-gray-500'>Interests</span>
        </div>

        {/* Budget */}
        <div className='inputBox w-[75%] relative'>
          <input type='number' autoComplete='off' name='budget' value={inputdata.budget} onChange={changeHandle} required="required"
            className='w-full p-2 border-gray-400 border-2 rounded-md outline-none text-lg duration-500'
          />
          <span className='absolute left-0 p-3 pointer-events-none text-sm uppercase duration-500 font-[500] text-gray-500'>Budget</span>
        </div>

        {isLoading ? (
          <div className='h-11 w-[75%] rounded-lg text-gray-800 bg-blue-200 font-[500] tracking-wide text-lg cursor-wait flex items-center justify-center'>
            <Loader className='animate-spin mx-auto cursor-wait' size={24} />
          </div>
        ) : (
          <button onClick={btnclickhandle} className='myButton2 h-11 w-[75%] rounded-lg text-white font-[500] tracking-wide text-lg cursor-default sm:cursor-pointer'>Get Gift Suggestions</button>
        )}


      </form>
    </div>
  )
}

export default Fields