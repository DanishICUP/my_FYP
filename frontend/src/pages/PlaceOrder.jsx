import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

  const [method, setmethod] = useState("cod")
  console.log(method)

  const { backendUrl, token, cartItems, setCartItems, products, getCartTotalAmount, deliveryFee } = useContext(ShopContext)
  const navigate = useNavigate()

  const [formData, setformData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    Houseno: '',
    zipCode: '',
    detaileAddress: '',
    phone: ''
  })


  // console.log(formData)

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setformData(data => ({ ...data, [name]: value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      console.log("this is order item", orderItems)
      // console.log(token)

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartTotalAmount() + deliveryFee
      }



      switch (method) {
        case 'cod':

          try {
            const response = await axios.post(backendUrl + '/api/order/cod', orderData, { headers: { token } });
            console.log(response)
            if (response.data.success) {
              setCartItems({})
              navigate('/orders')
              console.log(response)
            }
          } catch (err) {
            toast.error("Stripe payment failed");
            console.error(err);
          }
          break;

        case 'stripe':
          try {
            const StripeResponse = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
            if (StripeResponse.data.success) {
              setCartItems({})
              const { session_url } = StripeResponse.data;
              window.location.replace(session_url);
            } else {
              toast.error("Stripe payment failed");
            }

          } catch (err) {
            toast.error("Stripe payment failed");
            console.error(err);
          }
          break;

        default:
          break;
      }



    } catch (error) {
      console.log(error.message)
      toast.error("order is not placed something went wrong try again", error.message)
    }
  }

  return (
    <form onSubmit={submitHandler} className='flex flex-col justify-between sm:flex-row gap-4 pt-4 sm:pt-14 min-h-[80vh] border-t' >
      <div className='flex flex-col w-full gap-4 sm:w-[480px]'>

        <div className='text-xl sm:text2xl my-3'>
          <Title text1={"Order"} text2={"Information"} />
        </div>
        {/* --------------left side------------------ */}

        <div className='flex gap-3'>
          <input onChange={onChangeHandler} value={formData.firstName} name='firstName' type="text" placeholder='Enter Your FirstName' className='border border-gray-700 px-3 py-2 w-full' required />
          <input onChange={onChangeHandler} value={formData.lastName} name='lastName' type="text" placeholder='Enter Your LastName' className='border border-gray-700 px-3 py-2 w-full' required />
        </div>

        <input onChange={onChangeHandler} value={formData.email} name='email' type="text" placeholder='Enter Email Address' className='border border-gray-700 px-3 py-2 w-full' required />
        <input onChange={onChangeHandler} value={formData.street} name='street' type="text" placeholder='Enter Street No' className='border border-gray-700 px-3 py-2 w-full' required />

        <div className='flex gap-3'>
          <input onChange={onChangeHandler} value={formData.city} name='city' type="text" placeholder='Enter City Name' className='border border-gray-700 px-3 py-2 w-full' required />
          <input onChange={onChangeHandler} value={formData.Houseno} name='Houseno' type="text" placeholder='Enter Your House no' className='border border-gray-700 px-3 py-2 w-full' required />
        </div>

        <div className='flex gap-3'>
          <input onChange={onChangeHandler} value={formData.zipCode} name='zipCode' type="number" placeholder='Enter Zip Code' className='border border-gray-700 px-3 py-2 w-full' required />
          <input onChange={onChangeHandler} value={formData.detaileAddress} name='detaileAddress' type="text" placeholder='Enter Complete Address' className='border border-gray-700 px-3 py-2 w-full' required />
        </div>

        <input onChange={onChangeHandler} value={formData.phone} name='phone' type="number" placeholder='Enter Phone no' className='border border-gray-700 px-3 py-2 w-full' required />

      </div>
      {/*--------------------------- right side--------------------- */}
      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={"Payment"} text2={"Method"} />

          <div className='flex flex-col gap-3 lg:flex-row'>
            <button type='text'>
              <div onClick={() => setmethod("stripe")} className='flex items-center gap-3 cursor-pointer p-4 px-3'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-700" : ""}`}></p>
                <img className='h-7 mx-3' src={assets.stripe_logo} alt="" />
              </div>
            </button>

            {/* <button disabled>
            <div  onClick={() => setmethod("easypaisa")} className='flex items-center gap-3 cursor-pointer p-4 px-3'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "easypaisa" ? "bg-green-700" : ""}`}></p>
              <img className='h-7 mx-3 bg-transparent invert' src={assets.easypaisaicon} alt="" />
            </div>
            </button> */}

            <div onClick={() => setmethod("cod")} className='flex items-center gap-3 cursor-pointer p-4 px-3'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-700" : ""}`}></p>
              <p className='text-gray-700 font-bold text-xl mx-3 dark:text-white'>Cash on Delivery</p>
            </div>
          </div>
        </div>


        <button type='submit' className='bg-black dark:bg-rose-600 text-white w-full py-3 cursor-pointer font-medium'>Place Order</button>



      </div>
    </form>
  )
}

export default PlaceOrder