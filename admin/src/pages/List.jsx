import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
import { assets } from '../assets/assets';

import { PacmanLoader } from 'react-spinners';

const List = ({ token }) => {

  const BackEndUrl = "http://localhost:8000"

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [showUpdatePage, setShowUpdatePage] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null);



  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [price, setprice] = useState('')
  const [category, setcategory] = useState('Men')
  // const [subcategory, setsubcategory] = useState('Topwear')
  const [sizes, setsize] = useState([])
  const [bestseller, setbestseller] = useState(true)
  const [deliveryFee, setDeliverFee] = useState(0)


  const FetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(BackEndUrl + '/api/products/list')
      if (response.data.success) {
        setList(response.data.products)
        console.log(response.data)

      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }


  const removeProduct = async (id) => {
    try {
      const response = await axios.post(BackEndUrl + '/api/products/remove', { id }, {
        headers: { token }
      })
      if (response.data.success) {
        toast.success(response.data.message)
        await FetchData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error("Something went wrong")
    }
  }

  const handleSubmit = async (e, id) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('id', selectedProductId)
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      // formData.append('subcategory', subcategory)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('bestseller', bestseller)
      formData.append('deliveryFee', deliveryFee)

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)


      const response = await axios.post(BackEndUrl + '/api/products/update', formData, {
        headers: {
          token
        }
      })
      if (response.data.success) {
        toast.success("Product Update successfully")
        setShowUpdatePage(false)
        FetchData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    FetchData()
  }, [token])



  const categorySizes = {
    "Men": ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    "Women": ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    "Kids": ['XS', 'S', 'M', 'L'],
    "Fashion": ['XS', 'S', 'M', 'L', 'XL'],
    "Shoes": ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
    "Bags": ['Black', 'Brown', 'White', 'Gray', 'Navy Blue', 'Olive Green', 'Maroon', 'Red', "Pink", 'Purple', 'Yellow', 'Blue'],
    "Watches": ['Black', 'Silver', 'Gold', 'Rose Gold', 'White', 'Blue', 'Brown', 'Gray', 'Green', 'Navy Blue'],
    "Kids": [
      'XS (0-1 year): (size: 2-4)',
      'S (1-3 years): (size: 4-7)',
      'M (4-7 years): (size: 8-10)',
      'L (8-12 years): (size: 11-13)'
    ],
    "Electronics": ['Black', 'White', 'Gray', 'Silver', 'Blue', 'Red', 'Green', 'Gold', 'Rose Gold']
  };



  return (
    <>
      <p className='mb-5 border-b-2 text-xl font-extrabold'>All Products List</p>
      <div className='flex flex-col gap-3'>

        <div className=' dark:bg-rose-950 dark:text-white  hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center py-2 px-1 border bg-gray-300'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product Rows */}
        {loading ? <div className='w-full h-40 flex items-center justify-center'><PacmanLoader /></div> :
          list.map((item, index) => (
            <div
              key={index}
              className='grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-2 items-start md:items-center px-2 py-3 border rounded-md shadow-sm text-sm bg-white dark:bg-zinc-800'
            >
              {/* Image */}
              <img className='w-20 h-20 object-cover rounded' src={item.image[0]} alt={item.name} />

              {/* Name & Description */}
              <div>
                <p className='font-bold'>{item.name}</p>
                <p className='text-xs text-gray-500 dark:text-gray-300 line-clamp-2'>{item.description}</p>
              </div>

              {/* Category & Subcategory */}
              <div>
                <p className='capitalize'>{item.category}</p>
                <p className='text-xs text-gray-500 dark:text-gray-300'>{item.subcategory}</p>
              </div>

              {/* Price & Sizes */}
              <div className='gap-2'>
                <p className='font-medium'>Rs. {item.price}</p>
                <p className='text-xs text-gray-500 dark:text-gray-300'>Sizes: {item.sizes.join(', ')}</p>
                <p className='text-sm text-gray-500 dark:text-gray-300'>delivery: {item?.deliveryFee || "NA"}</p>
              </div>



              {/* update page setup start  */}
              {showUpdatePage &&
                <div className='fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center px-2'>
                  <div className='relative bg-gray-300 p-4 sm:p-5 rounded-md w-full max-w-3xl shadow-lg flex flex-col items-center justify-center '>
                    <button
                      className='absolute top-2 right-2 text-xl text-red-600 font-bold hover:text-red-800 cursor-pointer'
                      onClick={() => setShowUpdatePage(false)}
                    >
                      ✖
                    </button>

                    <form onSubmit={handleSubmit}>
                      <div className='flex flex-col justify-start gap-3 w-full'>
                        <p className='text-md font-extrabold'>Upload Images</p>

                        {/* images section start here  */}
                        <div className='flex gap-3'>

                          <label htmlFor="image1">
                            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} className='w-24 h-24 object-contain' alt="" />
                            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
                          </label>

                          <label htmlFor="image2">
                            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} className='w-24 h-24 object-contain' alt="" />
                            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
                          </label>

                          <label htmlFor="image3">
                            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} className='w-24 h-24 object-contain' alt="" />
                            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
                          </label>

                          <label htmlFor="image4">
                            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} className='w-24 h-24 object-contain' alt="" />
                            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
                          </label>

                        </div>

                        {/* images section end here  */}
                      </div>

                      <div className='w-full mt-4'>
                        <p className='mb-2 font-extrabold'>Product Name</p>
                        <input
                          className='w-full max-w-[500px] px-3 py-2 rounded-md outline-pink-400 border border-gray-200' type="text" placeholder='Enter Product Name'
                          required
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                        />
                      </div>

                      <div className='w-full mt-4'>
                        <p className='mb-2 font-extrabold'>Product Description</p>
                        <input
                          className='w-full max-w-[500px] px-3 py-2 rounded-md outline-pink-400 border border-gray-200' type="text" placeholder='Enter Product Description'
                          required
                          value={description}
                          onChange={(e) => setdescription(e.target.value)}
                        />
                      </div>

                      {/* category and subcategory section start */}
                      <div className='flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-8 w-full mt-4'>
                        <div>
                          <p className='mb-2 font-extrabold'>product Category</p>
                          <select onChange={(e) => setcategory(e.target.value)} className='max-w-full sm:max-w-[400px] px-3 py-2 dark:bg-gray-900 dark:text-white' required>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Watches">Watches</option>
                            <option value="Bags">Bags</option>
                            <option value="Home">Home</option>
                          </select>
                        </div>

                        {/* <div>
                          <p className='mb-2 font-extrabold'>product SubCategory</p>
                          <select onChange={(e) => setsubcategory(e.target.value)} className='max-w-full sm:max-w-[400px] px-3 py-2 dark:bg-gray-900 dark:text-white' required>
                            <option value="Topwear">Topwear</option>
                            <option value="BottomWear">BottomWear</option>
                            <option value="winterWear">winterWear</option>
                          </select>
                        </div> */}

                        <div>
                          <p className='mb-3 font-extrabold'>Product Price</p>
                          <input type="number"
                            onChange={(e) => setprice(e.target.value)}
                            value={price}
                            placeholder='Price of product'
                            className='w-full px-3 py-2 sm:w-[120px]'
                            required />
                        </div>
                      </div>

                      <div className='flex flex-col mb-2'>
                        <label className='mb-2 mt-3 font-extrabold' htmlFor="deliveryFee">DeliveryFee</label>
                        <input className='w-full px-3 py-2 sm:w-[120px] border border-gray-200 outline-0' type="number" id='deliveryFee' value={deliveryFee} onChange={(e) => setDeliverFee(e.target.value)} required />
                      </div>

                      {/* category and subcategory section end */}

                      {/* sizes section start */}
                      {/* <div className='mt-4'>
                        <p className=' mb-2 font-extrabold'>Product sizes</p>
                        <div className='flex gap-3'>  

                          <div onClick={() => setsize(prev => prev.includes('S') ? prev.filter(item => item !== 'S') : [...prev, 'S'])}>
                            <p className={`${sizes.includes('S') ? "bg-pink-300 dark:bg-amber-300 dark:text-black px-3 py-1 cursor-pointer" : "bg-gray-200 dark:bg-rose-900 dark:text-white px-3 py-1 cursor-pointer"}`}>S</p>
                          </div>

                          <div onClick={() => setsize(prev => prev.includes('XS') ? prev.filter(item => item !== 'XS') : [...prev, 'XS'])}>
                            <p className={`${sizes.includes('XS') ? "bg-pink-300 dark:bg-amber-300 dark:text-black px-3 py-1 cursor-pointer" : "bg-gray-200 dark:bg-rose-900 dark:text-white px-3 py-1 cursor-pointer"}`}>XS</p>
                          </div>

                          <div onClick={() => setsize(prev => prev.includes('M') ? prev.filter(item => item !== 'M') : [...prev, 'M'])}>
                            <p className={`${sizes.includes('M') ? "bg-pink-300 px-3 py-1 dark:bg-amber-300 dark:text-black" : "bg-gray-200 dark:bg-rose-900 dark:text-white px-3 py-1 cursor-pointer"}`}>M</p>
                          </div>

                          <div onClick={() => setsize(prev => prev.includes('L') ? prev.filter(item => item !== 'L') : [...prev, 'L'])}>
                            <p className={`${sizes.includes('L') ? "bg-pink-300 px-3 py-1 dark:bg-amber-300 dark:text-black" : "bg-gray-200 dark:bg-rose-900 dark:text-white px-3 py-1 cursor-pointer"}`}>L</p>
                          </div>

                          <div onClick={() => setsize(prev => prev.includes('XL') ? prev.filter(item => item !== 'XL') : [...prev, 'XL'])}>
                            <p className={`${sizes.includes('XL') ? "bg-pink-300 px-3 py-1 dark:bg-amber-300 dark:text-black" : "bg-gray-200 dark:bg-rose-900 dark:text-white px-3 py-1 cursor-pointer"}`}>XL</p>
                          </div>

                          <div onClick={() => setsize(prev => prev.includes('XXL') ? prev.filter(item => item !== 'XXL') : [...prev, 'XXL'])}>
                            <p className={`${sizes.includes('XXL') ? "bg-pink-300 px-3 py-1 dark:bg-amber-300 dark:text-black" : "bg-gray-200 dark:bg-rose-900 dark:text-white px-3 py-1 cursor-pointer"}`}>XXl</p>
                          </div>

                          <div onClick={() => setsize(prev => prev.includes('XXXL') ? prev.filter(item => item !== 'XXXL') : [...prev, 'XXXL'])}>
                            <p className={`${sizes.includes('XXXL') ? "bg-pink-300 px-3 py-1 dark:bg-amber-300 dark:text-black" : "bg-gray-200 dark:bg-rose-900 dark:text-white px-3 py-1 cursor-pointer"}`}>XXXl</p>
                          </div>

                        </div>
                      </div> */}
                      {categorySizes[category] && (
                        <div className='mt-4'>
                          <p className='mb-2 font-extrabold'>Product sizes</p>
                          <div className='flex gap-2 flex-wrap w-full'>
                            {categorySizes[category].map((size) => (
                              <div key={size} onClick={() => setsize(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
                                <p className={`${sizes.includes(size)
                                  ? "bg-pink-300 dark:bg-amber-300 dark:text-black"
                                  : "bg-gray-200 dark:bg-rose-900 dark:text-white"} px-3 py-1 cursor-pointer`}>
                                  {size}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* sizes section end */}

                      <div className='flex gap-3 mt-3'>
                        <input onChange={() => setbestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
                        <label className='font-extrabold cursor-pointer' htmlFor="bestseller">Add to bestSeller</label>
                      </div>


                      {loading ? (
                        <>
                          {/* Black spinner for light mode */}
                          <div className="mt-5 dark:hidden">
                            <PacmanLoader color="#000" size={40} />
                          </div>

                          {/* White spinner for dark mode */}
                          <div className="mt-5 hidden dark:block">
                            <PacmanLoader color="#fff" size={40} />
                          </div>
                        </>
                      ) : (
                        <button type='submit' className='bg-black text-white px-8 py-3 cursor-pointer mt-5 dark:bg-rose-950'>
                          Submit
                        </button>
                      )}

                    </form>


                  </div>
                </div>
              }
              {/* update page setup end */}




              {/* Action */}
              <div className='w-full md:text-center sm:items-center sm:justify-center flex gap-3 mt-5 sm:mt-0'>
                <button
                  onClick={() => removeProduct(item._id)}
                  className='text-red-600 hover:underline font-bold cursor-pointer '
                >
                  <RiDeleteBin5Fill />
                </button>
                <button onClick={() => {
                  setShowUpdatePage(true);
                  setname(item.name);
                  setdescription(item.description);
                  setprice(item.price);
                  setcategory(item.category);
                  // setsubcategory(item.subcategory);
                  setsize(item.sizes);
                  setSelectedProductId(item._id);
                }}>
                  <GrDocumentUpdate className="text-xl text-blue-600 hover:text-blue-800 cursor-pointer" />
                </button>

              </div>
            </div>
          ))
        }

      </div>
    </>

  )
}

export default List