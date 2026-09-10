import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Order = () => {
  const { backendUrl, token, CurrencySymbole } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const [timeLeft, setTimeLeft] = useState(null)

  const navigate = useNavigate()

  const loadOrderData = async () => {
    try {
      if (!token) return

      const response = await axios.post(
        backendUrl + '/api/order/userorder',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        let orderDataArray = []
        response.data.order.forEach((orders) => {
          orders.items.forEach((item) => {
            item['status'] = orders.status
            item['paymentMethod'] = orders.paymentMethod
            item['payment'] = orders.payment
            item['date'] = orders.date
            item['orderId'] = orders._id
            orderDataArray.push(item)
          })
        })

        orderDataArray.reverse()
        console.log(orderDataArray)
        setOrderData(orderDataArray)

        if (orderDataArray.length > 0) {
          const latestOrderTime = new Date(orderDataArray[0].date).getTime()
          const now = new Date().getTime()
          const diff = latestOrderTime + 5 * 60 * 1000 - now

          setTimeLeft(diff > 0 ? diff : 0)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (orderId, status) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/userOrderStatus',
        { orderId, status },
        { headers: { token } }
      )
      if (response.data.success) {
        await loadOrderData()
        if (status === "Cancelled") {
          setTimeLeft(null)
        }
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data.message || "Error updating status")
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])


  useEffect(() => {
    if (timeLeft === null) return

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(interval)
          return 0
        }
        return prevTime - 1000
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft])


  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
    const seconds = String(totalSeconds % 60).padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={"MY"} text2={"ORDER"} />
      </div>

      {timeLeft !== null && timeLeft > 0 && (
        <div className="text-center text-red-600 text-xl font-semibold my-4">
          Cancel Option Expires In: {formatTime(timeLeft)}
        </div>
      )}

      <div>
        {
          orderData.map((item, index) => {
            const orderTime = new Date(item.date).getTime()
            const currentTime = new Date().getTime()
            const diff = currentTime - orderTime
            const timeLimit = 10 * 60 * 1000
            const isCancelable = diff <= timeLimit && item.status !== "Cancelled"


            return (
              <div key={index} className='py-4 border-b border-t flex flex-col sm:flex-row text-gray-700 md:items-center md:justify-between gap-4 mt-8 dark:text-white'>

                <div className='flex items-start gap-6 text-sm'>
                  <img onClick={() => navigate('/collection')} className='w-16 md:w-20 cursor-pointer' src={item.image[0]} alt="" />

                  <div>
                    <p className='sm:text-base font-medium'>{item.name}</p>
                    <div className='flex items-center gap-3 mt-1 text-gray-600'>
                      <p className='text-lg dark:text-white'>{CurrencySymbole}{item.price}</p>
                      <p className='text-black dark:text-white'>Quantity: {item.quantity}</p>
                      <p className='text-black dark:text-white'>Category : {item.size}</p>
                    </div>
                    <p className='mt-1'>Date : <span>{new Date(item.date).toDateString()}</span></p>
                    <p className='mt-1'>PaymentMethod : <span>{item.paymentMethod}</span></p>
                  </div>
                </div>

                <div className='md:w-1/2 flex justify-between'>
                  <div className='flex items-center gap-2'>
                    <p className='min-w-2 h-2 rounded bg-green-600'></p>
                    <p className='text-sm md:text-base'>{item.status}</p>
                  </div>

                  <button
                    disabled={!isCancelable}
                    onClick={() => isCancelable && statusHandler(item.orderId, "Cancelled")}
                    className={`text-sm border px-5 py-3 font-medium cursor-pointer ${!isCancelable ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {item.status === "Cancelled" ? "Cancelled" : "Cancel Order"}
                  </button>

                  <button onClick={loadOrderData} className='text-sm border px-5 py-3 font-medium cursor-pointer'>Track Order</button>
                </div>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Order
