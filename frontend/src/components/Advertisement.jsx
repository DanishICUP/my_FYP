import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




const Advertisement = () => {

    const [imagesList, setImagesList] = useState([])
    const { backendUrl } = useContext(ShopContext)

    const navigate = useNavigate()

    const getImages = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/adv/get')
            console.log(response)
            if (response.data.success) {
                setImagesList(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    useEffect(() => {
        getImages()
    }, [])


    // const images = [
    //     imagesList.map((item, index) => (
    //         item.images.map((imageUrl, index) => (

    //     ))
    //     ))
    // ];

    // aspect ratio 
    // height = 1280 * (9 / 16)
    //    = 1280 * 0.5625
    //    = 720 pixels

    return (
        <div className="w-full aspect-[16/5] overflow-hidden dark:bg-gray-900 dark:text-white mt-10">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="w-full h-full"
            >
                {imagesList.map((item) =>
                    item.images.map((src, index) => (
                       
                            <SwiperSlide key={index}>
                                <img
                                    src={src}
                                    onClick={() => navigate('/collection')}
                                    alt={`Advertisement ${index + 1}`}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </SwiperSlide>
                      
                    ))
                )}
            </Swiper>
        </div>
    );

};

export default Advertisement;
