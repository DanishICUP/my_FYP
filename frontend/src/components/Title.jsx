import React from 'react'

const Title = ({text1,text2}) => {


  return (
    <div className='inline-flex items-center gap-2 mb-2 '>
       <p className='w-5 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
        <p className='text-gray-400 text-[30px] sm:text-3xl'>{text1} <span className='text-gray-500 font-medium'>{text2}</span></p>
        <p className='w-5 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
    </div>
  )
}

export default Title