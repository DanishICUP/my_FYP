import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../assets/assets'


const Order = ({ token }) => {

  const BackEndUrl = "http://localhost:8000"
  const [Order, setOrder] = useState([])


  const fetchAllOrders = async () => {

    if (!token) {
      return null
    }
    try {

      const response = await axios.post(BackEndUrl + '/api/order/list', {}, { headers: { token } })
      console.log(response.data)
      if (response.data.success) {
        setOrder(response.data.orders)
      } else {
        toast.error(response.data.message || "Something went wrong")
      }

    } catch (error) {
      toast.error(error.response?.data.message || "Something went wrong")
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(BackEndUrl + '/api/order/orderStatus', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      toast.error(error.response?.data.error || "Error updating status")
    }
  }

  const deleteOrderData = async (id) => {
    const response = await axios.post(BackEndUrl + '/api/order/deleteorder' , {id} , {headers:{token}})
    if (response.data.success) {
      toast.success(response.data.message)
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">

      <div className='flex justify-between'>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Order Details</h1>
        <button className='px-4 py-2 bg-green-600 text-white' onClick={() => fetchAllOrders()}>Refresh</button>
      </div>

      <div className="space-y-4">
        {
          Order.map((order, index) => (
            <div key={index} className='relative grid grid-cols-1 sm:grid-cols-[0.5fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 items-start border-2 border-gray-600 p-4 md:p-8 m-3 md:m-4 text-xs sm:text-lg text-gray-700 dark:text-white rounded-lg shadow-lg bg-gray-50 dark:bg-gray-900'>

              <img className='w-16 h-16 object-cover rounded-full hide' src={assets.parcel_icon} alt="icons" />

              <div className="space-y-1">
                {order.items.map((item, index) => {
                  return <p key={index} className="text-sm text-gray-700 dark:text-gray-300">{item.name} x {item.quantity} x <span className="font-semibold">{item.size}</span></p>
                })}

                <p className='text-xl text-red-500 dark:text-red-500'>User Details</p>
                <div>
                  <p className="text-gray-800 dark:text-gray-200">{order.address.firstName + " " + order.address.lastName}</p>

                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Street no: {order.address.street}</p>
                    <p className="text-gray-600 dark:text-gray-400">{`${order.address.detaileAddress} , ${order.address.city} , ${order.address.zipCode}`}</p>
                  </div>
                  <p className='text-gray-600 dark:text-gray-400'>House no: {order.address.Houseno}</p>
                  <p className="text-gray-600 dark:text-gray-400">{order.address.phone}</p>
                  <p className="text-gray-600 dark:text-gray-400">{order.address.email}</p>
                </div>
                <p className='flex p-3 mt-5 border border-red-900 text-gray-900 dark:text-white'>Status: {order.status}</p>


              </div>

              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">Items: {order.items.length}</p>
                <p className="text-gray-700 dark:text-gray-300">Method: {order.paymentMethod}</p>
                <p className="text-gray-700 dark:text-gray-300">Payment: <span className={`${order.payment ? 'text-green-500' : 'text-red-500'}`}>{order.paymentMethod == "Stripe" ? <span className='text-green-600'>Done</span> : <span className='text-red-600'>pending</span>}</span></p>
                <p className="text-gray-700 dark:text-gray-300">Date: {new Date(order.date).toDateString()}</p>
              </div>

              <p className="font-semibold text-base text-rose-900 dark:text-white">Total Amount: {order.amount}</p>

              <div className="absolute bottom-4 right-4 gap-4">
                <button onClick={() => deleteOrderData(order._id)}  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 hide">delete</button>
              </div>

              <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='pt-2 font-semibold dark:bg-gray-900 dark:text-white border-2 border-gray-600 rounded-md p-2 hide'>
                <option value="order placed">Order Placed</option>
                <option value="packing">Packing</option>
                <option value="shipped">Shipped</option>
                <option value="out of delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Failed">Failed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Processing">Processing</option>
                <option value="Refunded">Refunded</option>
                <option value="Pending Payment">Pending Payment</option>
                <option value="Payment Confirmed">Payment Confirmed</option>
                <option value="Returned">Returned</option>
                <option value="out of stock">Out of Stock</option>
              </select>


            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order
