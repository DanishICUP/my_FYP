import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import { motion } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import RelatedProducts from '../components/RelatedProducts';
import { useNavigate } from 'react-router-dom';
import ReviewAndRating from '../components/ReviewAndRating';

const Products = () => {

  const { productId } = useParams()
  const { products, CurrencySymbole, addToCart } = useContext(ShopContext)
  const [ProductData, setProductData] = useState(false)
  const [image, setimage] = useState('');
  const [size, setsize] = useState('');
  const [isBlink, setIsBlink] = useState(false)
  const ReviewRef = useRef(null)
  const [reviewInfo, setReviewInfo] = useState({
    count: 0,
    latestReview: null
  })

  const navigate = useNavigate()


  const fetchData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setimage(item.image[0])
        console.log(item)
        return null
      }
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [productId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlink(true);
      setTimeout(() => setIsBlink(false), 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   console.log(fetchData())
  // }, [productId, Products])

  const scrollToReview = () => {
    ReviewRef.current?.scrollIntoView({ behavior: 'smooth' })
  }


  return ProductData ? (
    <div className='border-t-2 pt-12 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data  */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* product images  */}
        <div className=' flex-1 gap-2 flex flex-col-reverse sm:flex-row'>
          {/* side images  */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              ProductData.image.map((item, index) => (
                <img onClick={() => setimage(item)} key={index} src={item} alt="" className='w-[28%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer overflow-hidden' />
              ))
            }
          </div>

          {/* main image  */}
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
          
        </div>


        {/* product info  */}

        <div className='flex-1'>
          <p className='font-medium text-2xl mt-3'>{ProductData.name}</p>

          <div className='flex items-center gap-2 mt-3'>
            <img src={assets.star_icon} alt="" />
            <p className='pl-2 '>({reviewInfo.count}+)</p>
            <p onClick={scrollToReview} className='text-red-700 underline cursor-pointer text-2xl'>Review && Ratings</p>
          </div>

          {reviewInfo.latestReview && (
            <div className='mt-6 p-5 border border-green-200 dark:border-green-700 rounded-lg shadow-md bg-white dark:bg-gray-900 transition-all duration-300'>

              <div className='flex gap-3 items-center'>
              <p className='w-2 h-2 rounded-full bg-green-600'></p>
              <p className="text-xs text-red-500 dark:text-gray-400 ">just added a review</p>
              </div>

              <p className='text-lg font-semibold text-gray-800 dark:text-white '>name: {reviewInfo.latestReview.user.name}</p>
              <p className='italic border-l-4 border-green-500 pl-3 text-md'>Review: {reviewInfo.latestReview.text}</p>
              <p className='italic border-l-4 border-green-500 pl-3 text-md'>rating:
                ({reviewInfo.latestReview.rating})</p>
            </div>
          )}

          <p className=' text-3xl font-medium mt-5 '>{CurrencySymbole} {ProductData.price}</p>
          <p className=' mt-3 md:w-4/5'>{ProductData.description}</p>

          <div className='flex flex-col gap-2 my-8'>
            <p className='text-2xl'>Select Category</p>
            <div className='flex flex-wrap gap-2 w-full'>
              {ProductData.sizes.map((item, index) => (
                <button onClick={() => setsize(item)} className={`px-4 py-3 border bg-gray-200 dark:bg-gray-900 dark:text-white cursor-pointer ${item === size ? "bg-orange-500 text-black dark:bg-orange-500 dark:text-black" : ""}`} key={index}>{item}</button>
              ))}
            </div>
          </div>

          <div className='flex gap-4 m-auto items-center'>
            <motion.button
              onClick={() => addToCart(ProductData._id, size)}
              className="px-8 py-3 border border-blue-600 bg-blue-600 text-white text-sm active:bg-blue-800 cursor-pointer font-medium rounded-sm shadow-lg"
              animate={
                isBlink
                  ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 1, 1],
                  }
                  : {}
              }
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              Add to Cart
            </motion.button>



            <button onClick={() => navigate('/placeorder')} className={`px-8 py-3 border bg-red-800 text-white text-sm active:bg-gray-700 cursor-pointer font-medium transition-opacity duration-500 rounded-sm `}>BUY NOW</button>

          </div>
          <hr className='mt-8 sm:w-3/4' />

          <div className='flex flex-col gap-1 text-gray-600 dark:text-white mt-3'>
            <p>100% orignal product</p>
            <p>Cash on delevery is avaliable on this product</p>
            <p>Easy exchange poloicy</p>
          </div>
        </div>

              
      </div>
       <Link to={'/chat'} className='border px-5 py-2 '>chat with admin</Link>
      <div ref={ReviewRef}>
        <ReviewAndRating postId={ProductData._id} ReviewData={setReviewInfo} />

      </div>
      


      {/* review and description box */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-4 p-2 text-sm'>Description</b>
          <p className='border px-4 py-2 text-sm'>(122)</p>
        </div>
        <div className='flex flex-col border text-sm gap-6 px-6 py-6 text-gray-400'>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas molestias quos, consequuntur facere ex nostrum quibusdam magni modi aliquam veritatis similique veniam perferendis expedita dolorum numquam illo. Expedita sint, beatae asperiores porro quisquam voluptates dolorem ipsa sapiente nobis omnis quidem doloribus nesciunt, praesentium qui distinctio libero! Iure accusamus beatae odit!</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores nemo nisi repudiandae non vel eius atque necessitatibus deleniti cupiditate, possimus earum ducimus, ipsum sunt excepturi commodi tempore perspiciatis soluta!
          </p>
        </div>
      </div>


      {/* display related products  */}
      <div>
        <RelatedProducts category={ProductData.category} subCategory={ProductData.subCategory} />
      </div>


    </div>
  ) : <div className=' opacity-0'></div>

}

export default Products