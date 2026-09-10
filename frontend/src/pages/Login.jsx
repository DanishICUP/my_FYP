import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [CurrentState, setCurrentState] = useState("Login")
  const { token, setToken, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // console.log(name, email, password)

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (CurrentState === 'signup') {
      const response = await axios.post(backendUrl + '/api/user/register', {
        name,
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('userToken', response.data.token);
        // console.log(response.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

    } else {
      const response = await axios.post(backendUrl + '/api/user/login', {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('userToken', response.data.token);
        // console.log(response.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }

  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong!";
    toast.error(message);
    console.error(error);
  }
};


  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])


  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] m-auto sm:max-w-96 mt-14 gap-3 text-gray-800 dark:text-white'>

      <div>
        <span className=' text-3xl'><Title text2={CurrentState} /></span>
      </div>

      {CurrentState === "Login" ? "" : <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full max-w-96 px-3 py-2 dark:text-white border border-gray-500 ' placeholder='Enter Your Name' required />}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full max-w-96 px-3 py-2 border dark:text-white border-gray-500 ' placeholder='Enter Your Email' required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full max-w-96 px-3 py-2 border dark:text-white border-gray-500 ' placeholder='Enter Password' required />

      <div className='w-full flex justify-between mt-1 max-w-96'>
        <span onClick={()=> navigate('/forgotPassword')} className='cursor-pointer text-xs sm:text-base  p-1 text-red-400'>Forgot Your Password ?</span>
        {
          CurrentState === "Login"
            ? <p onClick={() => setCurrentState("signup")} className='cursor-pointer text-xs sm:text-base p-1 text-red-400'>Create an account ?</p>
            : <p onClick={() => setCurrentState("Login")} className='cursor-pointer text-xs sm:text-base p-1 text-red-400'>Login</p>
        }


      </div>

      <button type='submit' className='bg-black text-white px-8 py-3 cursor-pointer mt-3 dark:bg-rose-500'>{CurrentState === "Login" ? "Sign-In" : "Sign-Up"}</button>

    </form>
  )
}

export default Login