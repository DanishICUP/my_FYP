import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { Link, Navigate, NavLink } from 'react-router-dom'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { ShopContext } from '../context/ShopContext.jsx';
import { useDarkMode } from '../ThemeContext/Theme.jsx'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {

    const { darkMode, setDarkMode } = useDarkMode()
    const [visible, setVisible] = useState(false)
    const { setShowSearch, GetCartCount, handleLogout, token, AuthUserData } = useContext(ShopContext)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()


    console.log(AuthUserData)



    // const toggleMenu = () => {
    //     setOpen(!open)
    // }

    // const handleLogout = () => {
    //     localStorage.removeItem('userToken')
    //     setToken('')
    //     setCartItems({})
    //     toast.success("Logout Successfully !")
    //     setTimeout(() => navigate('/login'), 1000)
    // }

    return (

        <div className='flex items-center justify-between py-6 sm:h-[13vh] h-[10vh] font-medium p-3  bg-gray-50 border-b-2 dark:bg-gray-900 dark:text-white '>
            {/* left side menu start here  */}
            <div className='flex items-center justify-center'>
            <Link to={'/'}> <img src={assets.elogo} className={`w-14 h-14 sm:w-16 sm:h-16 object-contain dark:bg-transparent  ${darkMode ? "invert brightness-200" : ""}`} alt="" /></Link>
            <p onClick={()=> navigate('/')} className='cursor-pointer sm:font-extrabold text-sm sm:text-2xl bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent 
             transition-all duration-500 hover:from-purple-500 hover:to-cyan-500 '>QUICK CART</p>
            </div>
            <ul className=' hidden sm:flex gap-5 text-sm text-gray-800'>
                <NavLink to='/' className='flex flex-col items-center gap-1 dark:text-white'>
                    <p>HOME</p>
                    <hr className='w-2/4 h-[1.5px] border-none bg-gray-800 hidden dark:bg-white ' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1 dark:text-white'>
                    <p>LATEST COLLECTIONS</p>
                    <hr className='w-2/4 h-[1.5px] border-none bg-gray-800 hidden dark:bg-white' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1 dark:text-white'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 h-[1.5px] border-none bg-gray-800 hidden dark:bg-white' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1 dark:text-white'>
                    <p>CONTACT US</p>
                    <hr className='w-2/4 h-[1.5px] border-none bg-gray-800 hidden dark:bg-white' />
                </NavLink>
            </ul>
            {/* left side menu end here  */}

            <div className='hidden md:block'>
                <div className='flex items-center gap-2'>
                    <span className='inline-block w-5 h-5 rounded-full bg-green-600'></span>
                    <h1 className='text-yellow-700'>Welcome: {AuthUserData.name}</h1>
                </div>
            </div>


            {/* right side menu */}
            <div className='flex items-center gap-5 '>

                <div onClick={() => setDarkMode(!darkMode)} className='items-center cursor-pointer'>
                    {darkMode ? <MdLightMode /> : <MdDarkMode />}
                </div>


                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className={`w-5 cursor-pointer ${darkMode ? "invert brightness-200" : ""}`} alt="" />

                <div className='group relative'>
                    <Link to={'/login'}><img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className={`w-5 cursor-pointer ${darkMode ? "invert brightness-200" : ""}`} alt="" /></Link>

                    {/* dropdown  */}
                    {
                        token &&
                        <div className={`dropdown-menu right-0 pt-3 absolute z-50 ${open ? 'block' : 'hidden'} group-hover:block `}>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-600 rounded dark:bg-gray-900 dark:text-white'>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black dark:hover:text-white'>My Orders</p>
                                <p className='cursor-pointer hover:text-black dark:hover:text-white'>Verify Email</p>
                                <p onClick={handleLogout} className='cursor-pointer hover:text-black dark:hover:text-white'>Logout</p>
                            </div>
                        </div>
                    }
                </div>

                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className={`w-5 min-w-5 ${darkMode ? "invert brightness-200" : ""}`} alt="" />
                    <p className=' absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white dark:bg-white dark:text-black aspect-square text-[10px] rounded-full'>{GetCartCount()}</p>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} className={`w-5 cursor-pointer sm:hidden ${darkMode ? "invert brightness-200" : ""}`} alt="" />
                {/* right side menu end here  */}

            </div>

            {/* side menu for mobile screen   */}
            <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-50 dark:bg-gray-900 dark:text-white ${visible ? "w-full" : "w-0"}`}>

                <div onClick={() => setVisible(false)} className='flex flex-col text-gray-800  cursor-pointer'>
                    <div className='flex items-center gap-4 p-3'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p className='text-gray-700'>Exit</p>
                    </div>

                    <NavLink onClick={() => setVisible(false)} className="px-4 py-2 pl-6 border-b text-center dark:text-white" to="/">HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="px-4 py-2 pl-6 border-b text-center dark:text-white" to="/collection">LATEST COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="px-4 py-2 pl-6 border-b text-center dark:text-white" to="/about">ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="px-4 py-2 pl-6 border-b text-center dark:text-white" to="/contact">CONTACT</NavLink>

                </div>
            </div>


        </div>
    )
}

export default Navbar