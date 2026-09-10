import React from 'react'
// import { assets } from '../assets/assets'
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useDarkMode } from '../Theme/Theme.jsx';
import {useNavigate} from 'react-router-dom'


const Navbar = ({ setToken }) => {

    const { darkMode, setDarkMode } = useDarkMode()
    const navigate = useNavigate()


    return (
        <div className='flex items-center py-2 px-[4%]'>
            {/* <img className='w-[max(7%,90px)]' src={assets.elogo} alt="" /> */}
            <h3 className="sm:text-4xl text-2xl font-extrabold tracking-wide text-rose-600 group cursor-pointer transition duration-300 transform hover:scale-105 py-5 flex gap-2">
                Quick{' '}
                <span className="text-black group-hover:text-rose-500 drop-shadow-sm transition duration-300 dark:text-white">
                    cart
                </span>
            </h3>

            <div className='flex items-center justify-end w-full gap-5'>


                <div onClick={() => setDarkMode(!darkMode)} className='cursor-pointer   text-xl sm:text-3xl border px-2 py-1 border-green-800'>
                    {darkMode ? <CiLight /> : <MdDarkMode />}
                </div>

                <button onClick={() => setToken("")} className='bg-gray-700 text-white px-5 py-4 sm:px-7 text-xs sm:text-sm cursor-pointer hover:bg-rose-600 transition duration-300 hover:scale-110'>Logout</button>

            </div>

        </div>
    )
}

export default Navbar