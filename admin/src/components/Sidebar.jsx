import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
// import { FcAdvertising } from "react-icons/fc";
import { IoIosArrowDropdownCircle } from "react-icons/io";



const Sidebar = () => {

  const [showProducts, setShowProducts] = useState(false)
  const [showAdv, setShowAdv] = useState(false)


  return (
    <div className='w-[20%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-2 pt-6 m-5 text-[15px]'>

        {/* add product section start */}

        <button onClick={() => setShowProducts(!showProducts)}
          className='flex items-center justify-center gap-2 border-0 sm:border sm:border-gray-400 px-2 py-3 rounded-lg hover:bg-gray-300 transition duration-300 dark:hover:bg-rose-900'
        >
          <p className='text-sm sm:text-base flex items-center gap-1'>ADD
            <IoIosArrowDropdownCircle className='text-2xl' />
          </p>
        </button>

        <div
          className={`transition-all duration-500 overflow-hidden ease-in-out ${showProducts ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >

          {showProducts && (
            <div className='flex flex-col gap-3'>
              <NavLink to={'/add'} className="flex items-center gap-3 border border-gray-400 px-2 py-3 rounded-md hover:bg-gray-300 transition duration-300 dark:hover:bg-rose-900 ">
                <img className='dark:invert brightness-200' src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add products</p>
              </NavLink>
              <NavLink to={'/list'} className="flex items-center gap-3 border border-gray-400 px-2 py-3 rounded-md hover:bg-gray-300 transition duration-300 dark:hover:bg-rose-900">
                <img className='dark:invert brightness-200' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>List products</p>

              </NavLink>
              <NavLink to={'/order'} className="flex items-center gap-3 border border-gray-400 px-2 py-3 rounded-md hover:bg-gray-300 transition duration-300 dark:hover:bg-rose-900">
                <img className='dark:invert brightness-200' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>Orders</p>
              </NavLink>
              <NavLink to={'/commentslist'} className="flex items-center gap-3 border border-gray-400 px-2 py-3 rounded-md hover:bg-gray-300 transition duration-300 dark:hover:bg-rose-900">
                <img className='dark:invert brightness-200' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>Review And Ratings</p>
              </NavLink>
            </div>
          )}
        </div>
        {/* add product section end */}


        {/* adv section start here  */}

        <button onClick={() => setShowAdv(!showAdv)} className='flex items-center justify-center gap-2 border-0 sm:border sm:border-gray-400 px-2 py-3 rounded-lg hover:bg-gray-300 transition duration-300 dark:hover:bg-rose-900'>
          <p className='text-xs sm:text-base flex items-center gap-1'>ADV
            <IoIosArrowDropdownCircle className='text-2xl' />
          </p>
        </button>


        <div className={`transition-all duration-500 ease-in-out overflow-hidden  ${showAdv ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          {showAdv && (
            <div className='flex flex-col gap-3'>
              <NavLink to={'/addadv'} className="flex items-center gap-3 border border-gray-400 px-2 py-3 rounded-md hover:bg-gray-300 transition duration-300 dark:hover:bg-rose-900 ">
                <img className='dark:invert brightness-200' src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add images</p>
              </NavLink>

              <NavLink to={'/listadv'} className="flex items-center gap-3 border border-gray-400 px-2 py-3 rounded-md hover:bg-gray-300 transition duration-300 dark:hover:bg-rose-900">
                <img className='dark:invert brightness-200' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>List images</p>
              </NavLink>
            </div>

          )}
        </div>

        <div>
          <NavLink to={'/chat'} className="flex items-center gap-3 border border-gray-400 px-2 py-3 rounded-md hover:bg-gray-300 transition duration-300 dark:hover:bg-rose-900">
            <img className='dark:invert brightness-200' src="" alt="" />
            <p className='hidden md:block'>Chat</p>
          </NavLink>
        </div>







      </div>
    </div>
  )
}

export default Sidebar