import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { PacmanLoader } from 'react-spinners';

const ListAllComments = ({ token }) => {

    const BackEndUrl = "http://localhost:8000"


    const [Comments, setComments] = useState([])
    const [Loading, setLoading] = useState(false)
    const [totalData , setTotalData] = useState(0)

    const fetchComments = async () => {
        setLoading(true)
        try {
            const response = await axios.get(BackEndUrl + '/api/products/list', {
                headers: { token }
            })
            console.log(response.data)
            if (response.data.success) {
                const products = response.data.products

                const extractComments = products.flatMap(product =>
                    product.comments.map(comment => (
                        {
                            productId: product._id,
                            commentId: comment._id,
                            name: comment.user.name,
                            email: comment.user.email,
                            text: comment.text,
                            rating: comment.rating,
                            date: comment.createdAt
                        }
                    )))
                    
                setComments(extractComments)
                setTotalData(extractComments.length)
                console.log("only commenst are extracted", extractComments)
                        console.log(extractComments.date)

            }
        } catch (error) {
            console.error("Error fetching comments:", error)
            toast.error("Error fetching comments")
        } finally {
            setLoading(false)
        }
    }



    const deleteComment = async (productId, commentId) => {
        setLoading(true)
        try {
            const response = await axios.delete(BackEndUrl + `/api/products/deletecomment/${productId}/${commentId}`, {
                headers: token
            })
            if (response.data.success) {
                setComments(prevComments => prevComments.filter(comment => comment.commentId !== commentId))
                toast.success("Review deleted successfully")
            } else {
                toast.error("Error deleting comment")
            }
        } catch (error) {
            console.error("Error deleting comment:", error)
            toast.error("Error deleting comment")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])




    return (
        <div className='px-2 sm:px-5 py-4'>
            <p className='mb-5 border-b-2 p-2 text-lg sm:text-xl font-extrabold'>Review and Ratings: ({ totalData })</p>

            <div className='flex flex-col gap-3'>

                <div className='hidden md:grid grid-cols-[1.5fr_0fr_1fr_1fr] items-center py-2 px-1 border bg-gray-300 dark:bg-rose-950 dark:text-white text-sm font-bold'>
                    <span>Name + Email</span>
                    <span className='col-span-2'>Review & Ratings</span>
                    <span>Date: & Action</span>
                    {/* <span>Action</span> */}
                </div>

                {/* Loader */}
                {Loading ? (
                    <>
                        <div className='w-full h-40 flex items-center justify-center dark:hidden'>
                            <PacmanLoader color='#000' />
                        </div>
                        <div className='w-full h-40 hidden dark:flex items-center justify-center'>
                            <PacmanLoader color='#fff' />
                        </div>
                    </>
                ) : (
                    Comments.map((item, index) => (
                        <>
                            <div
                                key={index}
                                className='flex flex-col md:grid md:grid-cols-[2fr_3fr_1fr_2fr_2fr] items-start md:items-center gap-1 px-2 py-3 border rounded bg-white dark:bg-gray-900 dark:text-white shadow-sm'
                            >
                                <div className='text-xs sm:text-sm'>
                                    <p className='font-bold'>{item.name}</p>
                                    <p className='text-gray-500 dark:text-gray-300'>{item.email}</p>

                                </div>
                                    <p className='text-sm'>{item.text}</p>
                                    <p className='w-10 items-center justify-center inline-block px-2 py-2 border bg-amber-800 text-white'>{item.rating}</p>
                                    <p className='inline-block px-2 py-2 border bg-amber-800 text-white'>{new Date(item.date).toDateString()}</p>
                                



                                <button onClick={() => deleteComment(item.productId, item.commentId)} className="flex items-center justify-center px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 font-semibold text-sm rounded-md transition duration-200 shadow-sm ">
                                    Delete
                                </button>

                            </div>


                        </>
                    ))
                )}
            </div>
        </div>
    )
}

export default ListAllComments