import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItems from './ProductItems'

const LatestCollection = () => {

    const { products } = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])


    useEffect(() => {
        setLatestProducts(products.slice(0, 10))
    }, [products])

    // console.log(products)
    return (
        <div className='my-10'>

            <div className='text-center py-8 text-3xl'>
                <Title text1={"NEW"} text2={"ARRIVALS"} />
                <p className='w-3/4 m-auto text-xs sm:text-md lg:text-base text-gray-700 dark:text-gray-200'>Explore our new Arraivals thoughtfully designed to keep you ahead of the trends From fresh arrivals to innovative designs each piece reflects the perfect blend of style quality and uniqueness. Stay updated with what's new and elevate your experience with our newest additions curated just for you</p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    latestProducts.map((item, index) => (
                        <div key={index} >
                            <ProductItems
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                            />
                           
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}

export default LatestCollection