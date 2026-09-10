import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

import { PacmanLoader } from 'react-spinners';


const AddAdv = ({ token }) => {

  const BackEndUrl = "http://localhost:8000"

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {

      const formData = new FormData()

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)


      const response = await axios.post(BackEndUrl + '/api/adv/add', formData, {
        headers: { token }
      })
      console.log(response)
      if (response.data.success) {
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        toast.success(response.data.message)
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


  return (
    <form onSubmit={handleSubmit}>
      <h1 className='flex flex-col text-md font-extrabold border-b-2 p-2'>Add Images</h1>

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
  )
}

export default AddAdv