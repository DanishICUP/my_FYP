// import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Products from './pages/Products'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify'
import ForgotPassword from './pages/ForgotPassword'
import { ConnectWs } from './ws'
import Chat from './components/chat'

const App = () => {

  // useEffect(() => {
  //   ConnectWs
  // })


  return (
    <div className='px-1 sm:px-[3vw] md:px-[4vw] lg:px-[5vw] dark:bg-gray-900 dark:text-white transition-all ease-in-out duration-500'>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Navbar />
      <SearchBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Products />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/orders' element={<Order />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/chat' element={<Chat/>} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App