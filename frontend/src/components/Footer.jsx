import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useDarkMode } from '../ThemeContext/Theme'


const Footer = () => {

    const { darkMode } = useDarkMode()

    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 my-7 mt-20 text-sm dark:bg-gray-900 dark:text-white '>
                <div className='flex flex-row gap-2 sm:flex-col'>
                    <div className='flex items-center'>
                        <Link to={'/'}> <img src={assets.elogo} className={`w-14 h-14 sm:w-16 sm:h-16 object-contain dark:bg-transparent  ${darkMode ? "invert brightness-200" : ""}`} alt="" /></Link>
                        <p className='cursor-pointer sm:font-extrabold text-sm sm:text-2xl bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent 
             transition-all duration-500 hover:from-purple-500 hover:to-cyan-500 '>QUICK CART</p>
                    </div>
                    <p className='w-full md:w-2/3 text-gray-700 dark:text-white'>
                        Welcome to Quick Cart Shope Your One-Stop Shop for Everything You Need!
                        At Quick Cart Shope, we make shopping easy, convenient, and enjoyable. Whether you're looking for the latest fashion trends, high-quality electronics, home essentials, or beauty products, we have it all in one place.

                        We believe in providing top-quality products at the best prices, so you always get value for your money. Our user-friendly website makes it easy to browse, choose, and order your favorite items with just a few clicks.
                    </p>
                </div>

                <div className='flex flex-row sm:flex-row justify-between gap-10 sm:gap-20'>

                    <div>
                        <p className='text-xl font-medium mb-5'>COMPANY</p>
                        <ul className='flex flex-col gap-1 text-gray-950 dark:text-white'>
                            <Link to={'/'}><li>HOME</li></Link>
                            <Link to={'/about'}><li>ABOUT</li></Link>
                            <Link to={'/cart'}><li>DELIVERY</li></Link>
                            <Link><li>PRIVACY POLIOCY</li></Link>
                        </ul>
                    </div>

                    <div>
                        <p className='text-xl font-medium mb-4'>Get in Touch</p>
                        <ul className='flex flex-col gap-1 text-gray-950 dark:text-white'>
                            <li>+92318-845242-6</li>
                            <li>danishicp99@gmail.com</li>
                        </ul>
                    </div>

                </div>



            </div>

            <div>
                <hr />
                <p className='my-5 text-center text-gray-800 dark:text-white'>copyWrite 2025 all Right QuickCart.com</p>
            </div>
        </div>
    )
}

export default Footer