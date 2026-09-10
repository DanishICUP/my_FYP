import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAdv from './pages/AddAdv'
import ListAdv from './pages/ListAdv'
import ListAllComments from './pages/ListAllComments'
import Chat from './components/Chat'



// export const BackendUrl = import.meta.env.VITE_BACKEND_URL
// export const currencySyambol = "Pkr"


const App = () => {

  // const [token, setToken] = useState("123")

  const [token, setToken] = useState(localStorage.getItem("AdminToken") ? localStorage.getItem("AdminToken") : "")


  useEffect(() => {
    localStorage.setItem("AdminToken", token)
  }, [token])


  return (
    <div className='bg-gray-50 min-h-screen dark:bg-gray-900 dark:text-white'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />

            <div className='w-[70%] mx-auto ml-[max(5vw , 25px)] my-8 text-gray text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token}/>} />
                <Route path='/list' element={<List token={token}/>} />
                <Route path='/order' element={<Order token={token}/>} />
                <Route path='/addadv' element={<AddAdv token={token}/>} />
                <Route path='/listadv' element={<ListAdv token={token}/>} />
                <Route path='/commentslist' element={<ListAllComments token={token}/>} />
                <Route path='/chat' element={<Chat token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App