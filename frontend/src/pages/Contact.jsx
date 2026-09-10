import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsLatterBox from '../components/NewsLatterBox'
import {useNavigate} from 'react-router-dom'


const Contact = () => {

  const navigate = useNavigate()


  return (
    <div className='dark:text-white'>

      <div className='text-center text-2xl pt-4 mt-5 '>
        <Title text1={"CONTACT"} text2={"US"}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-6 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6 dark:text-white'>
          <p className='text-xl font-semibold text-gray-800 dark:text-white'>OUR SHOP</p>
          <p className='text-gray-500 dark:text-white'>Peshawae paksitan <br /> Darra adam khel Bazar Kohat</p>
          <p>Email: danishicp99@gmail.com</p>
          <p>Contact No: 03319191636</p>
          <p>SHOP Address: Dara Adam khel</p>
          <p>FREE DEV:IVERY </p>

          <button onClick={() => navigate('/collection')} className='px-8 py-3 border border-gray-800 hover:bg-black hover:text-white transition-all duration-500 dark:hover:bg-rose-500 cursor-pointer'>Explore Bussniess</button>
        </div>
      </div>

      <NewsLatterBox/>
    </div>
  )
}

export default Contact