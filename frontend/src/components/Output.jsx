import React, { forwardRef, useContext } from 'react'
import { ModalContext } from './InputOuputBundler'
import GiftOut from './GiftOut'
import { useAiStore } from '../store/app.Store'

const Output = ({ dummyAttribute }, ref) => {
  const { openModel, setOpenModel } = useContext(ModalContext)
  const { data } = useAiStore()

  if (!openModel) return null
  if (!data || !Array.isArray(data) || data.length === 0) return null

  return (
    <section ref={ref} className='bgmain h-full min-w-full flex items-center justify-center relative py-7'>
      <p
        onClick={() => setOpenModel(false)}
        className='absolute top-3 right-3 z-10 bg-gray-400 h-6 w-6 rounded-xl flex items-center justify-center text-gray-700 font-[600] text-lg sm:cursor-pointer'
      >X
      </p>
      <div className='h-[90%] w-[90%] glassbg flex items-center overflow-x-scroll py-10 px-5 ss:p-10 scrollbar-hide'> {/* to scroll left or right */}
        <div className='h-[90%] w-[130rem] flex items-center justify-center gap-5'>
          <GiftOut data={data} />
        </div>
      </div>
    </section>
  )
}


export default forwardRef(Output)