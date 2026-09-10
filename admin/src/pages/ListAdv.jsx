import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';


import { PacmanLoader } from 'react-spinners';

const ListAdv = ({ token }) => {

  const BackEndUrl = "http://localhost:8000"

  const [imageList, setimageList] = useState([])
  const [loading, setLoading] = useState(false)

  const [showUpdatePage, setShowUpdatePage] = useState(false)


  const [GetIdForUpdate, setGetIdForUpdate] = useState("")
  // console.log(GetIdForDelete)


  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)



  // console.log(GetIdForDelete)
  // const imageList = new Array(11).fill(assets.parcel_icon);


  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(BackEndUrl + '/api/adv/get')
      if (response.data.success) {
        setimageList(response.data.data)
        console.log(response.data)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }


  const removeImages = async (id, imageurl) => {
    try {
      const response = await axios.post(BackEndUrl + '/api/adv/remove', { id, imageurl }, {
        headers: { token }
      })
      if (response.data.success) {
        toast.success(response.data.message)
        console.log("images deleted", response)
        await fetchData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    image1 && formData.append("image1", image1)
    image2 && formData.append("image2", image2)
    image3 && formData.append("image3", image3)
    image4 && formData.append("image4", image4)
    formData.append("id", GetIdForUpdate)

    try {
      const response = await axios.post(BackEndUrl + '/api/adv/update', formData, {
        headers: { token }
      })
      if (response.data.success) {
        toast.success(response.data.message)
        console.log("images updated", response)
        setShowUpdatePage(false)
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        await fetchData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="p-4 max-w-6xl mx-auto overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2 dark:text-white">
        List of All Images
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {imageList.map((item, index) =>  (
        
          item.images.map((imageurl, i) => (
            <div
              key={`${index}-${i}`}
              className="bg-white dark:bg-zinc-800 p-4 rounded shadow hover:shadow-lg transition duration-300"
            >
              
              <p>{`${index}-${i}`}</p>
              
              <img
                src={imageurl}
                alt={`image ${index}-${i}`}
                className="w-full h-48 object-contain rounded"
              />

        
              {/* update page start here  */}

              {
                showUpdatePage &&
                <div className='fixed top-0 left-0 w-full h-full bg-opacity-50 z-50 flex items-center justify-center'>
                  <div className='relative bg-white/30 dark:bg-gray-800 p-5 rounded-md w-[80%] sm:w-[40%] h-[40%] shadow-lg flex flex-col items-center justify-center bg-clip-padding backdrop-blur-xs bg-opacity-0'>
                    <button
                      className='absolute top-2 right-2 text-xl text-red-600 font-bold hover:text-red-800 cursor-pointer'
                      onClick={() => setShowUpdatePage(false)}
                    >
                      ✖
                    </button>

                    <form onSubmit={handleSubmit}>
                      <h1 className='flex flex-col text-md font-extrabold border-b-2 p-2'>Update Single or Bulk</h1>

                      <div className='flex gap-3 mt-5'>

                        <label htmlFor="image1">
                          <img className='w-20 h-20 object-contain' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                          <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
                        </label>

                        <label htmlFor="image2">
                          <img className='w-20 h-20 object-contain' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                          <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
                        </label>

                        <label htmlFor="image3">
                          <img className='w-20 h-20 object-contain' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                          <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
                        </label>

                        <label htmlFor="image4">
                          <img className='w-20 h-20 object-contain' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                          <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
                        </label>

                      </div>

                      {
                        loading ?
                          <>
                            <div className="mt-5 dark:hidden">
                              <PacmanLoader color="#000" size={40} />
                            </div>

                            <div className="mt-5 hidden dark:block">
                              <PacmanLoader color="#fff" size={40} />
                            </div>
                          </>
                          : <button className='mt-10 mb-5 px-8 py-2 border bg-gray-900 cursor-pointer rounded-sm text-white font-extrabold' type='submit'>Submit</button>
                      }


                    </form>
                  </div>
                </div>

              }
              

              {/* update page end here  */}

              <div className='flex items-center justify-center mt-5 gap-2'>
                <button onClick={() => removeImages(item._id, imageurl)} className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                  Delete
                </button>
                <button onClick={() => {
                  setShowUpdatePage(true)
                  setGetIdForUpdate(item._id)
                }} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  Update
                </button>
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default ListAdv;
