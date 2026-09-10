import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const ReviewAndRating = ({ postId , ReviewData}) => {

    const { token, backendUrl } = useContext(ShopContext)
    // console.log(token)

    const [userReview, setUserReview] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const handleSubmitReview = async () => {
        if (!userReview || userRating === 0) {
            toast.error("Please enter both star rating and message. Thank you");
            return;
        }

        try {
            const response = await axios.post(backendUrl + `/api/products/comment/${postId}`, { text: userReview, rating: userRating },
                { headers: { token } });
            if (response.data.success) {
                const newComment = response.data.product.comments.slice(-1)[0];
                setReviews([newComment, ...reviews]);
                setUserReview('');
                setUserRating(0);
                toast.success("Review submitted successfully");
            } else {
                toast.error("something went wrong", response.data.message)
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error?.response?.data?.message || "Failed to submit review");
        }
    };

    const getAllReviwes = async () => {
        try {
            const response = await axios.get(backendUrl + `/api/products/getcomment/${postId}`)
            if (response.data.success) {
                console.log(response.data)
                const commentsData = response.data.comments
                setReviews(commentsData)
                ReviewData({
                    count: commentsData.length,
                    latestReview: commentsData[0] || null,
                })
            }
        } catch (error) {
             console.error(error.message);
        }
    }
    const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

    useEffect(() => {
        console.log(reviews)
        getAllReviwes()
    }, [userReview])

    return (
        <div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Write Review & Ratings</h3>

                <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star, i) => (
                        <img
                            key={i}
                            src={star <= userRating ? assets.star_icon : assets.star_dull_icon}
                            alt=""
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => setUserRating(star)}
                        />
                    ))}
                </div>

                <textarea
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    rows={4}
                    className="w-full border rounded-sm p-2 text-sm"
                    placeholder="Write your thoughts here..."
                    style={{ resize: 'none' }}
                ></textarea>

                <button
                    onClick={handleSubmitReview}
                    className="mt-2 bg-green-600 text-white px-4 py-2 text-sm rounded-sm hover:bg-green-700"
                >
                    Submit Review
                </button>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                {reviews.length === 0 ? (
                    <p className="text-gray-500 text-sm">No reviews yet.</p>
                ) : (
                    <>
                        {displayedReviews.map((review) => (
                            <div key={review._id} className="border p-4 mb-4 rounded-sm">
                                <div className="flex gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star, i) => (
                                        <img
                                            key={i}
                                            src={star <= review.rating ? assets.star_icon : assets.star_dull_icon}
                                            alt=""
                                            className="w-5 h-5"
                                        />
                                    ))}
                                </div>
                                <p className='text-red-800 dark:text-yellow-700 my-3 underline text-2xl'>{review.user.name}</p>
                                <p className="text-sm text-gray-700 dark:text-white">{review.text}</p>
                            </div>
                        ))}

                        {reviews.length > 2 && (
                            <div
                                className="cursor-pointer text-blue-600 text-sm underline mt-2"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? <button className='px-3 py-2 bg-rose-700 text-white'>Hide</button> : <button className='px-3 py-2 bg-rose-700 text-white'>Show</button>}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ReviewAndRating;
