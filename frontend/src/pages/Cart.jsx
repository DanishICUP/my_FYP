import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Cart = () => {

  const { products, cartItems, CurrencySymbole, UpdateQuantity ,getAllCartData } = useContext(ShopContext)
  const [CartData, setCartData] = useState([])
  const [cartEmpty, setCartEmpty] = useState(false)

  const navigate = useNavigate()



  useEffect(() => {
    // console.log("Product Data", products)
    // console.log("CartItem data", cartItems)
    let TempData = []
    let isCartEmpty = false
    if (products.length > 0) {
      for (const items in cartItems) {
        for (const item in cartItems[items]) {

          let qty = cartItems[items][item]

          if (qty > 0) {
            isCartEmpty = true
            TempData.push({
              _id: items,
              size: item,
              quantity: qty
            })
          }
        }
      }
      // console.log("Getting cart Data ",TempData)
      setCartData(TempData)
      setCartEmpty(!isCartEmpty)
    }
  }, [cartItems,getAllCartData,products])

  return (
    <div className='border-t pt-10'>
      <div className='text-3xl mb-3'>
        <Title text1={"Your"} text2={"Cart"} />
      </div>
      <div>
        {
          CartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>

                <div className='flex items-start gap-6'>
                  <img onClick={() => navigate('/collection')} className='w-4 sm:w-20 cursor-pointer' src={productData.image[0]} alt="" />

                  <div>
                    <p className='text-sm sm:text-lg font-medium dark:text-white'>{productData.name}</p>

                    <div className='flex gap-3 items-center pt-3'>
                      <p className='dark:text-white'>{CurrencySymbole} {productData.price}</p>
                    <p className='dark:text-amber-300 text-yellow-900'>category:</p>
                      <p className='px-2 sm:px-3 sm:py-1 bg-slate-200'>{item.size}</p>
                    </div>

                  </div>


                </div>

                <input
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 dark:text-white'
                  type='number'
                  min={1}
                  value={item.quantity}
                  onChange={(e) => e.target.value === "" || e.target.value === 0 ? null : UpdateQuantity(item._id, item.size, Number(e.target.value))} />

                <img onClick={() => {
                  const onConfirm = window.confirm("Are you sure you want to remove this item from your cart?")
                  if (onConfirm) {
                    UpdateQuantity(item._id, item.size, 0)
                  }
                }} className='w-4 sm:w-5 cursor-pointer invert brightness-200' src={assets.bin_icon} alt="" />

              </div>
            )
          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-center mt-5 flex gap-2 '>
            <button
              onClick={() => navigate("/collection") }
              className='bg-black text-white w-full px-4 py-2 cursor-pointer'>
             Continue Shopping
            </button>
            <button
              onClick={() => { cartEmpty ? toast.error("Your cart is empty") : navigate("/placeorder") }}
              className='bg-black text-white w-full px-4 py-2 cursor-pointer'>
             CHECKOUT
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart