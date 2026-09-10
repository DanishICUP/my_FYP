import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify';


const Login = ({ setToken }) => {

    const BackEndUrl = "http://localhost:8000"


    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)



    const OnSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const resposne = await axios.post(`${BackEndUrl}/api/user/admin`, {
                email, password
            })
            console.log(resposne)
            if (resposne.data.success) {
                setToken(resposne.data.token)
            } else {
                toast.error(error.data.message || "invalid credentials")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || "invalid credentials")
        }
    }


    return (
        <div className='flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-no-repeat bg-center ' style={{ backgroundImage: `url(${assets.admin_login})` }}>
            <div className='bg-white/30 px-8 py-7 rounded-lg mx-w-md shadow-lg bg-clip-padding backdrop-blur-md bg-opacity-0'>
                <h1 className='text-2xl text-center font-bold mb-10 hover:text-rose-800 transition duration-300 text-gray-950'>Admin panel</h1>
                <form onSubmit={OnSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-md text-gray-700 mb-3'>Email Address</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 outline-none border border-gray-800 hover:border-rose-800 transition duration-300 bg-gray-700 text-white' type="email" placeholder='your@email.com' required />
                    </div>

                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-md text-gray-700 mb-3'>Password</p>
                        <div className='relative'>
                            <input onChange={(e) => setpassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 outline-none border border-gray-800  hover:border-rose-800 transition duration-300 bg-gray-700 text-white' type={showPassword ? "text" : "password"} placeholder='Enter Your Password' required />
                            <span className=' absolute right-3 top-3 text-yellow-600 text-xl cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>

                    <button className='mt-3 w-full bg-black text-white py-3 px-4 rounded-lg cursor-pointer' type="submit">Login</button>

                </form>
            </div>
        </div>
    )
}

export default Login